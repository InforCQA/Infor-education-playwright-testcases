import { chromium } from 'playwright';
import path from 'path' 
const playwright = require('playwright');
import { expect } from '@playwright/test';

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

    const pages = this.context.pages();
    
    this.page = this.context.pages()[0];
  }

  static async globalTeardown() {
    await this.context.close();
    await this.browser.close();
  }

  static async getLocator(selector) {
    return await this.page.locator(selector);
  }

  static async getDynamicElement(webElement, ...strVar) {
    
    
    const finalLocator = strVar.reduce((s, v) => s.replace('%s', v), webElement);
    const locator = await this.page.locator(finalLocator);

    return locator;
  }


  static async isElementPresent(locator) {
    try {
        
      await expect(async () => {
        await locator.waitFor({
          state: 'visible'
        });
      }).toPass({ timeout: 15000 });
    
      return true
    } catch (e) {
      if (e instanceof playwright.errors.TimeoutError) {
        return false;
      }
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
      await this.page.waitForTimeout(seconds * 1000);
    }).toPass({ timeout: 10000 });
    
  }



  static async isDynamicElementPresent(webElement, ...strVar) {
    let finalLocator = strVar.reduce((s, v) => s.replace('%s', v), webElement);
    if (await this.page.locator(finalLocator).isVisible())
      return true;
    else
      return false;
  }

  static async isDynamicElementPresentWithIframe(iframe,webElement, ...strVar) {
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

      await locator.click({ clickCount: 3 });
      await locator.press('Backspace');
      await locator.type(value);
  }

  static async selectValueFromDropdown(locator, value) {

    await locator.click();
    await value.click();
  }

}

export default BaseClass;
