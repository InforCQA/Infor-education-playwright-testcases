import {expect } from '@playwright/test';
import InforOsCommonPage from '../pages/InforOsCommonPage.js';
import BaseClass from '../../testBase/BaseClass.js';
import DocumentManagementPage from '../../commons/pages/DocumentManagementPage.js';
import workSpacePage from '../../commons/pages/WorkSpacePage.js';
import WorkSpaces_Id from '../constants/elementIds/WorkSpaces_Id.js';
import WorkSpaces_Lbl from '../constants/elementLbls/WorkSpaces_Lbl.js';
import OSConfirmationMessages from '../constants/OSConfirmationMessages.js';

const loginData=JSON.parse(JSON.stringify(require("../../commons/data/productCredentials.json")));

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
        
        await expect(actionMsg).toContainText(message);

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

    static async addWidgetsInOS(widgetName){
        const workSpacePg = new workSpacePage();
        
        await (await this.getDynamicElement(workSpacePg.workspaceBtn, WorkSpaces_Lbl.ALL)).click();
        await this.type(await this.getDynamicElement(workSpacePg.textFld, WorkSpaces_Id.WORKSPACE_SEARCH), widgetName);
        await (await this.getDynamicElement(workSpacePg.addWidget, widgetName)).click();
        
        //Verify the widget is added
        await InforOsCommon.validateConfirmationMessage(await this.getLocator(workSpacePg.popupMsg), await this.getLocator(workSpacePg.btnClose), OSConfirmationMessages.ADDED_WIDGET.replace('%s', widgetName));
   
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

    static async toolbarIcons(locator) {
        await locator.hover();
        await locator.click({ delay: 1000 });
    }
}
export default InforOsCommon;