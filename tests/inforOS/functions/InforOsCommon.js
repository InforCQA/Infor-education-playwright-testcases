import {expect } from '@playwright/test';
import InforOsCommonPage from '../pages/InforOsCommonPage.js';
import BaseClass from '../../testBase/BaseClass.js';
import DocumentManagementPage from '../../commons/pages/DocumentManagementPage.js';

const loginData=JSON.parse(JSON.stringify(require("../../commons/data/productCredentials.json")));
import {expect } from '@playwright/test';

class InforOsCommon extends BaseClass
{
    static async selectTab(tabName){

        // Intializing the page
        const commonPg = new InforOsCommonPage();

        if (!(await this.isDynamicElementPresent(commonPg.currentTab, tabName))) {
            await this.forceClick(await this.getLocator(commonPg.pageOSTitle));

            await (await this.getDynamicElement(commonPg.selectMainTab, tabName)).hover();

            await (await this.getDynamicElement(commonPg.selectMainTab, tabName)).click();
        }
    }

    static async expandContextApps(toggleMenu, toggleMenuBtn){

        // Expand context apps if it is collapsed
        if(! await this.isElementPresent(toggleMenu)){
            await toggleMenuBtn.hover();
            await toggleMenuBtn.click();
        }
        
        // Verify that context apps is expanded
        await expect(toggleMenu).toBeVisible();
    }

    static async courseMenuNavigation(iframe, menuFolders, menu, ...subMenus) {

        try {
            let element = null;

            if (iframe) {
               element = await this.getDynamicElementWithIframe(iframe, menuFolders, menu);
            } else {
               element = await this.getDynamicElement(menuFolders, menu);
            }

            // Click the main menu
            await element.click();

            // Click through submenus
            for (const sub of subMenus) {
                if (iframe) {
                    element = await this.getDynamicElementWithIframe(iframe, menuFolders, sub);
                } else {
                  element = await this.getDynamicElement(menuFolders, sub);
                }
                await element.click();
            }
        }
        catch (e) {
            console.error('Error occurred:', e);
            throw e;
        }
    }

    static async validateConfirmationMessage(actionMsg, btnClose, message){
    
       const webElement=await actionMsg;
        
        await expect(webElement).toBeVisible({ timeout: 10000 });
        await expect(webElement).toContainText(message);

        await btnClose.click();
    }

    static async collapseCourseMenuNavigation(iframe, menuFolders, menu) {

            let element = null;

            if (iframe) {
                element = await this.getDynamicElementWithIframe(iframe, menuFolders, menu);
            } else {
                element = await this.getDynamicElement(menuFolders, menu);
            }

            if (await this.isElementPresent(element)) {
                await element.click();
            }

            await expect(element).toBeHidden();
        }

    static async getCompany() {
        const id= loginData.inforAdminWorkspaceUsername;
        const userId= id.match(/\d{2}$/);
        return userId;
    }

    static async selectSubTab(selectTab, tabName,iframe) {

        let element = null;

        if (iframe) {
            element = await this.getDynamicElementWithIframe(iframe, selectTab, tabName);
        }
        else {
            element = await this.getDynamicElement(selectTab, tabName);
        }

        await element.waitFor({ state: 'visible', timeout: 5000 });
        await element.click();
    }

    static async getTextField(webInputField, lbl, id, iframe) {
        if (iframe) {
            return await this.getDynamicElementWithIframe(iframe, webInputField, lbl, id);
        }
        else {
            return await this.getDynamicElement(webInputField, lbl, id);
        }
    }

    static async toolbarIconsInDocManagement(toolbarMenus, uniqueId) {
        const docPg = new DocumentManagementPage();
        const iframe = docPg.iframe();

        await (await this.getDynamicElementWithIframe(iframe, docPg.menuItems, toolbarMenus.toLowerCase(), uniqueId)).click();
    }

    static async selectCheckbox(checkbox, lbl, id, iframe) {
        let element = null;

        if (iframe) {
            element = await this.getDelementynamicElementWithIframe(iframe, checkbox, lbl, id);
        }
        else {
            element = await this.getDynamicElement(checkbox, lbl, id);
        }

        if (!element.isChecked()) {
            await element.check();
        }

        // Verify that check box is selected
        await expect(element).toBeChecked();
    }
}
export default InforOsCommon;