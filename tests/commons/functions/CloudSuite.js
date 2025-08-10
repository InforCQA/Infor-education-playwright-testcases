
import Homepages from '../pages/CommonPage.js';
import BaseClass from '../../testBase/BaseClass.js';
import Commons from  '../constants/Commons.js';
import ElementAttributes from '../constants/ElementAttributes.js';
import { expect } from '@playwright/test';
import { log } from 'console';
import { getLoggerForTestClass } from '../../../utils/logger.js';
const { getCurrentLogger } = require('../../../utils/logContext.js');

/* --------------------------------------------------------
	 * Objective : Login to Cloudsuite
* --------------------------------------------------------*/
class CloudSuite extends BaseClass {

    static async login(url, username, password) {
        const homePg = new Homepages();

        await this.page.goto(url);
        await homePg.username().click();
        await homePg.username().fill(username);
        await homePg.password().click();
        await homePg.password().fill(password);
        await homePg.submit().click();
    }
    
    static async navigateToApplication(appName) {
        const homePg = new Homepages();
        
        console.log("navigation to LN");
        
        let element = null;
        await this.pause(9);
        const appTitle = (await homePg.appNameTitle().textContent())?.trim();
        if (!(appTitle.includes(appName))) {
            await homePg.menuBar().click();
            if (!await this.isDynamicElementPresent(homePg.appNameV2, appName)) {
                element = await this.getDynamicElement(homePg.seeMore, Commons.APPLICATIONS);
                await element.click({ force: true });
            }
            element = await this.getDynamicElement(homePg.appNameV2, appName);
            await element.click();
        }
    }

    static async closeActiveWorkspace() {

        const homePg = new Homepages();

        await this.forceClick(await this.getLocator(homePg.closeSelectedToolbar));
    }

    static async collapseContextApps() {

            const homePg = new Homepages();

			if (await this.isElementPresent(await homePg.btnV2ContextApps())) {
				// Collapse context apps if it is expanded
				if (await (await (await homePg.btnV2ContextApps()).getAttribute(ElementAttributes.CLASS))?.includes(Commons.IS_ACTIVE)) {
					await (await homePg.btnV2ContextApps()).click();
				}

				// Verify that context apps is collapsed
				expect(await (await homePg.btnV2ContextApps()).getAttribute(ElementAttributes.CLASS)).not.toBe(Commons.IS_ACTIVE);
			}
		}

}

export default CloudSuite;