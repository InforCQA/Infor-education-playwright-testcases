import { chromium } from 'playwright';
import path from 'path';

class BaseClass {
  static page;
  static browser;
  static context;
  static playwright;

  static async globalSetup() {
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext({ viewport: { width: 1280, height: 672 } });
    this.page = await this.context.newPage();
  }

  static async globalTeardown() {
    await this.context.close();
    await this.browser.close();
  }

  static async getLocator(selector) {
    return this.page.locator(selector);
  }

  static async getDynamicElement(webElement, ...strVar) {
    const finalLocator = strVar.reduce((s, v) => s.replace('%s', v), webElement);
    const locator = this.page.locator(finalLocator);
    return locator;
  }


  static async isElementPresent(locator) {
    try {
      return await locator.isVisible();
    } catch (e) {
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
    await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
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
    if (await iframe.locator(finalLocator).isVisible())
      return true;
    else
      return false;
  }

  static async getElementWithIframe(iframe, element) {
    return iframe.locator(element);
  }

  static async getDynamicElementWithIframe(iframe, element, ...strVar) {
    let finalLocator = strVar.reduce((s, v) => s.replace('%s', v), element);
    let webElement = iframe.locator(finalLocator);
    return webElement;
  }

static async type(locator, value) {
  await locator.clear();   
  await locator.click();   
  await locator.fill(value); 
}

}

export default BaseClass;
