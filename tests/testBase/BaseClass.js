import { chromium } from 'playwright';
import path from 'path' 
const playwright = require('playwright');
import { expect } from '@playwright/test';
import { attachLogToReport, createLoggerForTest } from '../../utils/logger';
import {test} from '@playwright/test';
import fs from 'fs';

export let log;
export let logFiles;


class BaseClass {
  static page;
  static browser;
  static context;
  static playwright;

  static async globalSetup() {

    const extPath = `${process.cwd()}/node_modules/playwright-zoom/dist/lib/zoom-extension`;

    this.context = await chromium.launchPersistentContext('', {
      headless: false,
      screenshot: 'only-on-failure',
      video: 'retain-on-failure',
      args: [
        `--disable-extensions-except=${extPath}`,
        `--load-extension=${extPath}`
      ],
    });

    const pages = await this.context.pages();
    await this.context.clearCookies();

    this.page = await this.context.pages()[0];

    // log.info('Global setup completed.');
  }

  static describeTest(testName, callback) {

    test.describe.configure({ mode: 'serial' });

    this.initLogger(testName);
    
    test.describe(() => {
        callback();
    });

  }

  static async globalTeardown() {
    await this.context.close();
    await this.browser.close();
  }

  static async getLocator(selector) {
    return await this.page.locator(selector);
  }

  static async getDynamicElement(webElement, ...strVar) {


    const finalLocator = await strVar.reduce((s, v) => s.replace('%s', v), webElement);
    const locator = await this.page.locator(finalLocator);

    return locator;
  }

  static async getLocators(selector) {

    try {
      return selector;
    } catch (e) {

      console.error(e.stack);
    }
  }

  static async isElementPresent(locator) {
    try {

      await expect(async () => {

        await locator.waitFor({ timeout: 500 });

      }).toPass({ timeout: 90000 });

      return true
    } catch (e) {
      if (e instanceof playwright.errors.TimeoutError) {

        return false;
      }
      return false;
    }
  }

  static async forceClick(locator) {
      await locator.click({ force: true });
  }


  static async selectFromDropdown(locator, valueOrLabel) {
    
    await locator.selectOption({ label: valueOrLabel });
  }


  static async takeScreenshot(name = 'screenshot') {
    const filePath = path.join(process.cwd(), `${name}.png`);
    await this.page.screenshot({ path: filePath });
  }

  static async pause(seconds) {

    await expect(async () => {
      await (await this.page).waitForTimeout(seconds * 1000);
    }).toPass({ timeout: 60000 });

  }

  static async isDynamicElementPresent(webElement, ...strVar) {
    let finalLocator = strVar.reduce((s, v) => s.replace('%s', v), webElement);
    if (await this.page.locator(finalLocator).isVisible())
      return true;
    else
      return false;
  }

  static async isDynamicElementPresentWithIframe(iframe, webElement, ...strVar) {
    let finalLocator = strVar.reduce((s, v) => s.replace('%s', v), webElement);

    if (await (await iframe.locator(finalLocator)).isVisible())
      return true;
    else
      return false;
  }

  static async getElementWithIframe(iframe, element) {
    return await iframe.locator(element);
  }

  static async getDynamicElementWithIframe(iframe, element, ...strVar) {
    let finalLocator = strVar.reduce((s, v) => s.replace('%s', v), element);
    return await iframe.locator(finalLocator);
  }

  static async type(locator, value) {

       await locator.fill(value);
  }

  static async selectValueFromDropdown(locator, value) {

    await locator.click();
    await value.click();
  }

  // In your base class (e.g., basePage.js)
  waitForLocator = async (frame, xpath, timeout = 90000) => {
    const locator = frame.locator(xpath);

    try {
      await locator.waitFor({ state: 'attached', timeout });
      return locator;
    } catch (error) {
      throw new Error(`Unable to find locator ${xpath}\nOriginal error: ${error.message}`);
    }
  };

  static async initLogger(testClassName) {

    const { logger, logFile } = createLoggerForTest(testClassName);
    log = logger;
    logFiles = logFile;

    // Automatically attach log after each test
    test.afterEach(async ({ }, testInfo) => {
      attachLogToReport(testClassName, testInfo, logFiles);

    });
  }
  
  static async screenshot(name) {
    const screenshotsDir = path.join(process.cwd(), 'screenshots');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    const filePath = path.join(screenshotsDir, `${name}-${Date.now()}.png`);

    await test.step(`Capture screenshot: ${name}`, async () => {
      await this.page.screenshot({ path: filePath });
      await test.info().attach(name, {
        path: filePath,
        contentType: 'image/png',
      });

      // Log to the same Winston logger
      log.info(`Screenshot : ${name}`);
    });
  }

  static async afterAll() {

    test.afterAll(async () => {
      console.log("close");
      await this.context.close();
      await this.browser.close();
      await BaseClass.page.close();
    });
    
  }

}

export default BaseClass;
