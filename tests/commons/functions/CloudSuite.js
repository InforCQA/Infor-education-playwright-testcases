
import Homepages from '../pages/CommonPage.js';
import BaseClass from '../../testBase/BaseClass.js';
import Commons from  '../constants/Commons.js';
import { setBrowserZoom, testWithZoomExtension } from "playwright-zoom";

/* --------------------------------------------------------
	 * Objective : Login to Cloudsuite
* --------------------------------------------------------*/
class CloudSuite extends BaseClass {

    static async login(username, password) {
        const homePg = new Homepages();

        await this.page.goto("https://mingle-portal.inforcloudsuite.com/v2/EDUGDENA031_AX2");
        await homePg.username().click();
        await homePg.username().fill(username);
        await homePg.password().click();
        await homePg.password().fill(password);
        await homePg.submit().click();
    }
    
    static async navigateToApplication(appName) {
        const homePg = new Homepages();

        let element = null;
        await this.pause(9);
        await homePg.menuBar().click();
        if (!await this.isDynamicElementPresent(homePg.appNameV2, appName)) {
            element = await this.getDynamicElement(homePg.seeMore, Commons.APPLICATIONS);
            await element.click({ force: true });
        }
        element = await this.getDynamicElement(homePg.appNameV2, appName);
        await element.click();
    }

    static async closeActiveWorkspace() {

        const homePg = new Homepages();

        await this.forceClick(await this.getLocator(homePg.closeSelectedToolbar));
    }
}

export default CloudSuite;