import InforOsCommonPage from '../pages/InforOsCommonPage.js';
import BaseClass from '../../testBase/BaseClass.js';

class InforOsCommon extends BaseClass
{
    static async selectTab(tabName){

        // Intializing the page
        const commonPg = new InforOsCommonPage();

        if (!this.isDynamicElementPresent(currentTab, tabName)) {
            await this.forceClick(await this.getLocator(commonPg.pageOSTitle));

            await (await this.getDynamicElement(commonPg.selectMainTab, tabName)).hover();

            await (await this.getDynamicElement(commonPg.selectMainTab, tabName)).click();
        }
    }

    static async expandContextApps(toggleMenu, toggleMenuBtn){

        // Expand context apps if it is collapsed
        if(!this.isElementPresent(toggleMenu)){
            this.forceClick(toggleMenuBtn);
        }
        
        // Verify that context apps is expanded
        await expect(toggleMenu).toBeVisible();
    }

    static async courseMenuNavigation(iframe, menuFolders, menu, ...subMenus) {

        if (iframe) {
            await this.getDynamicElementWithIframe(iframe, menuFolders, menu).click();
        } else {
            await this.getDynamicElement(menuFolders, menu).click();
        }

        for (let i = 0; i < subMenus.length; i++) {
            if (iframe) {
                await this.getDynamicElementWithIframe(iframe, menuFolders, menu).click();
            } else {
                await this.getDynamicElement(menuFolders, menu).click();
            }
        }
    }

    static async validateConfirmationMessage(actionMsg, btnClose, message){

        await expect(actionMsg).toHaveText(message);

        await (await this.getLocator(btnClose)).click();
    }

    static async collapseCourseMenuNavigation(iframe, menuFolders, menu) {
        let element = null;
        if (iframe) {
            element = await this.getDynamicElementWithIframe(iframe, menuFolders, menu).click();
        } else {
            element = await this.getDynamicElement(menuFolders, menu).click();
        }

        if (this.isElementPresent(element)) {
            element.click();
        }

        await expect(element).toBeHidden();
    }
}

export default InforOsCommon;