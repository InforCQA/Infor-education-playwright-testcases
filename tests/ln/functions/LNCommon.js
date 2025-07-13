import BaseClass from "../../testBase/BaseClass";
import LNPage from "../pages/LNPage";
import {expect} from '@playwright/test';
import ElementAttributes from "../../commons/constants/ElementAttributes";

class LNCommon extends BaseClass {

    /*----------------------------------------------------------------------------
	 * Objective 	: Navigate to LN required session through left page navigation
	 *-------------------------------------------------------------------------------*/
    static async navigateToLNModule(module, ...subModules) {

        // Intializing the page
        const lnPg = new LNPage();

        // Using condition to verify whether it is displaying or not
        if (await this.isElementPresent(await lnPg.inforMainModules(module))) {
            await lnPg.inforMainModules(module).click();

            // Using loop to navigate to expand and use multiple sub modules
            for (let i = 0; i < subModules.length; i++) {

                const subModule = subModules[i];
                if (!(i == subModules.length - 1)) {
                    await lnPg.inforLNSubModule(subModule, i + 2).waitFor({ state: 'visible' });
                    await lnPg.inforLNSubModule(subModule, i + 2).hover();
                    await lnPg.inforLNSubModule(subModule, i + 2).click();
                } else {
                    await lnPg.inforLNSubModuleEnd(subModule, i + 2).waitFor({ state: 'visible' });
                    await lnPg.inforLNSubModuleEnd(subModule, i + 2).hover();
                    await lnPg.inforLNSubModuleEnd(subModule, i + 2).click();
                }
            }
        }
    }

    /*---------------------------------------------------------------------------------
	 * Objective 	: To verify the session tab
	 *--------------------------------------------------------------------------------*/
    static async verifySessionTab(tabName) {

        // Intializing the page
        const lnPg = new LNPage();

        expect(await this.isElementPresent(await lnPg.currentActiveTab(tabName.toLowerCase()))).toBeTruthy();
    }

    /*------------------------------------------------------------------
	 * Objective 	: Click and select a value from dropdown and verify
	 *-------------------------------------------------------------------*/
    static async clickAndSelectDropdownField(label, elementId, listItem) {

        // Intializing the page
        const lnPg = new LNPage();

        await lnPg.clickDropdownLabel(label, elementId).click();
        await lnPg.selectListItem(listItem).click();

        const drpValue = (await lnPg.dropdownValueLabel(label, elementId).textContent())?.trim();
        expect(drpValue).toBe(listItem);
    }

    /*------------------------------------------------------------------
	 * Objective 	: Click on the required main menu item
	 *-------------------------------------------------------------------*/
    static async clickTextMenuItem(sessionCode, id, label) {

        // Intializing the page
        const lnPg = new LNPage();

        try {
           await lnPg.textMenu(sessionCode, id, label).click();
        } catch(e) {
           await lnPg.moreButton(sessionCode).click();
           await lnPg.textMenuOverflow(sessionCode, id, label).click();
        }
    }

    /*----------------------------------------------------------------------------
	 * Objective 	: Collapse the LN left pane Navigation opened
	 *-------------------------------------------------------------------------------*/
    static async collapseLNModule(module) {

        // Intializing the page
        const lnPg = new LNPage();

        await lnPg.inforMainModules(module).click({ button: 'right' });
        await lnPg.collapseAll().click();

        // Verifying whether module is collapsed or not
        await expect(await lnPg.inforMainModules(module)).toHaveAttribute(ElementAttributes.ARIA_EXPANDED, 'false');
    }
}

export default LNCommon;