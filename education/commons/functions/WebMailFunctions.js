import { expect } from "allure-playwright";
import FSMWindows from "../../fsm/fsm_financialsDifferencesToLawson/constants/FSMWindows";
import BaseClass, { log } from "../../testBase/BaseClass";
import Commons from "../constants/Commons";
import ProductNames from "../constants/ProductNames";
import Homepages from "../pages/CommonPage";
import WebMailPage from "../pages/WebMailPage";
import CloudSuite from "./CloudSuite";
const loginCnt = JSON.parse(JSON.stringify(require("../../commons/context/LoginContext.json"))); 

class WebMailFunctions extends BaseClass {

    /*-----------------------------------------------------------------
	 * Objective : Review the Web Mail Subject
	 * ----------------------------------------------------------------*/
    static async reviewWebMailSubject(username, password, emailSubject) {

        const homePg = new Homepages(this.page);
        const webmailPg = new WebMailPage(this.page);

        log.info("INFO : =========>>>>> Review the Web Mail Subject started <<<<<=========");

        // Navigate to Homepages
        await CloudSuite.navigateToApplication(ProductNames.HOMEPAGES);

        if (loginCnt.BASE_URL.includes(Commons.V2)) {
            expect(
                await this.isElementPresent(await homePg.widgetTitleV2(
                    Commons.USEFUL_LINKS))).toBeTruthy();

            await (await webmailPg.usefulLinksMenuV2(Commons.WEBMAIL)).click();

        } else {
            expect(
                await this.isElementPresent(await homePg.widgetTitle(
                    Commons.USEFUL_LINKS))).toBeTruthy();

            await (
                await webmailPg.usefulLinksMenu(Commons.WEBMAIL)).click();
        }

        // Switch to WebMail tab
        await this.switchToWindow(FSMWindows.INFOR_DEMO_WEBMAIL);

        // Login to WebMail
        await (await webmailPg.login()).waitFor();
        await this.type(await webmailPg.login(), username);
        await this.type(await webmailPg.password(), password);
        await (await webmailPg.signIn()).click({force:true});

        // Wait for logout button (login success)
        await expect(await webmailPg.logout()).toBeVisible();

        // Search for email
        await this.type(await webmailPg.search(),
            emailSubject);
         await this.page.keyboard.press('Enter');

        // Verify email received
        await expect(await webmailPg.emailSubject(emailSubject)).toBeVisible();

        // Open email
        await (await webmailPg.emailSubject(emailSubject)).click();

        await this.screenshot("Review the Web Mail Subject");

        // Logout
        await (await webmailPg.logout()).click();

        // Close webmail tab and return
        await this.page.close();
        await this.switchToWindow(ProductNames.HOMEPAGES);

        log.info("INFO : =========>>>>> Review the Web Mail Subject successful <<<<<=========");
    }

}

export default WebMailFunctions