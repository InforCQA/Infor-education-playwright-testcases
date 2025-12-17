
import Homepages from '../pages/CommonPage.js';
import BaseClass, { log, logFiles } from '../../testBase/BaseClass.js';
import Commons from  '../constants/Commons.js';
import ElementAttributes from '../constants/ElementAttributes.js';
import { expect } from '@playwright/test';

/**--------------------------------------------------------------------------
 * Purpose : This class contains Business functions related to Cloudsuite
 * 1. Login to Cloudsuite
 * 2. Navigate to required application using App Menu
 * 3. To close active workspace
 * 4. To collapse context apps
 * 5. Logout from Cloudsuite
 * --------------------------------------------------------------------------*/
class CloudSuite extends BaseClass {

    /* --------------------------------------------------------
	 * Objective : Login to Cloudsuite
     * --------------------------------------------------------*/
    static async login(url, username, password) {
        
        const homePg = new Homepages(this.page);

        await this.page.goto(url);
        await homePg.username().click();
        await homePg.username().fill(username);
        await homePg.password().click();
        await homePg.password().fill(password);
        await homePg.submit().click();

        log.info(`=========>>>>> Logged into Cloud Suite Successfully <<<<<=========`);
    }
    
    /* ------------------------------------------------------------------------
	 * Objective : Navigate to required application using App Menu
	 * ------------------------------------------------------------------------*/
    static async navigateToApplication(appName) {

        const homePg = new Homepages(this.page);    

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

        log.info(`INFO : Switched to ${appName} application`);
    }

    /* ---------------------------------------------
	 * Objective : To close active workspace
	 * ---------------------------------------------*/
    static async closeActiveWorkspace() {

        const homePg = new Homepages(this.page);   

        await this.forceClick(await this.getLocator(homePg.closeSelectedToolbar));
    }

    /*-------------------------------------
	 * Objective : To collapse context apps
	 *-------------------------------------*/
    static async collapseContextApps() {

        const homePg = new Homepages(this.page);   

        if (await this.isElementPresent(await homePg.btnV2ContextApps())) {
            // Collapse context apps if it is expanded
            if (await (await (await homePg.btnV2ContextApps()).getAttribute(ElementAttributes.CLASS))?.includes(Commons.IS_ACTIVE)) {
                await (await homePg.btnV2ContextApps()).click();
            }

            // Verify that context apps is collapsed
            expect(await (await homePg.btnV2ContextApps()).getAttribute(ElementAttributes.CLASS)).not.toBe(Commons.IS_ACTIVE);
        }

        log.info(`INFO : =========>>>>> Collapsed Context Apps <<<<<=========`);
    } 

    /* ---------------------------------------------------------------
	 * Objective : Logout from Cloudsuite
	 * ---------------------------------------------------------------*/
    static async logOut() {

        const homePg = new Homepages(this.page);   

        await homePg.userIcon().click();
        await homePg.signOut().click();

        log.info(`=========>>>>> Signed Out from Cloud Suite Successfully <<<<<=========`);
    }
}

export default CloudSuite;