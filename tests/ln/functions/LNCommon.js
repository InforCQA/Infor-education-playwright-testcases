import BaseClass from "../../testBase/BaseClass";
import LNPage from "../pages/LNPage";
import {expect} from '@playwright/test';
import ElementAttributes from "../../commons/constants/ElementAttributes";
import LNCommons from "../constants/LNCommons";

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
        } catch (e) {
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

    /*---------------------------------------------------
     * Objective 	: Select header tab in LN
     *--------------------------------------------------*/
    static async selectHeaderTab(tabName, sessionCode) {

        // Intializing the page
        const lnPg = new LNPage();

        // Used try catch method to select tabs
        try {

            await lnPg.selectHeaderTab(tabName, sessionCode).hover();
            await lnPg.selectHeaderTab(tabName, sessionCode).click();
        } catch (error) {

            // Expand more tab options
            const moreBtn = await lnPg.moreHeaderBtn(sessionCode);
            const classAttr = await moreBtn.getAttribute(ElementAttributes.CLASS);

            // Expand more tab options
            if (!classAttr.includes(LNCommons.IS_ACTIVE)) {
                await moreBtn.click();
            }

            await (await lnPg.selectTabInMore(tabName)).click();
        }
    }

    /*-----------------------------------------------
     * Objective 	: Select grid tab in LN
     *--------------------------------------------------*/
    static async selectGridTab(tabName, sessionCode) {

        // Intializing the page
        const lnPg = new LNPage();

        // Used try catch method to select tabs
        try {
            
    
            await lnPg.selectFooterTab(tabName, sessionCode).hover();
            await lnPg.selectFooterTab(tabName, sessionCode).click({ force: true });
            await this.page.waitForTimeout(3000);
        } catch (error) {
            // Expand more tab options
            const moreBtn = await lnPg.moreGridBtn(sessionCode);
            const classAttr = await moreBtn.getAttribute(ElementAttributes.CLASS);

            if (!classAttr.includes(LNCommons.IS_ACTIVE)) {
                await moreBtn.click({ force: true });
            }

            await lnPg.selectTabInMore(tabName).click();
        }
    }

    /*--------------------------------------------------------------------
     * Objective 	: Verifying the column header
     *-------------------------------------------------------------------*/
    static async verifyColumnHeader(sessionCode, label) {
        const lnPg = new LNPage();

        const headers = await lnPg.gridHeader(sessionCode).elementHandles(); // Assuming it returns Locator list

        let actualLabel = "";

        for (const header of headers) {
            let labels = "";
            const liElements = await header.$$('li');

            if (liElements.length > 1) {
                // Remove 'style' attributes via JS
                for (const li of liElements) {
                    await li.evaluate(el => el.removeAttribute('style'));
                }

                const innerHTML = await header.innerHTML();
                const labelParts = innerHTML.split('</li>');

                for (let i = 0; i < labelParts.length; i++) {
                    if (labelParts[i].includes('&nbsp;')) {
                        labelParts[i] = labelParts[i].replaceAll('&nbsp;', ' ');
                        labels += labelParts[i];
                    }
                }

                labels += labelParts[labelParts.length - 1];
                labels = labels.replaceAll('<li>', '');

            } else if (liElements.length === 1) {
                labels = (await liElements[0].innerHTML()).trim();
            }

            if (labels.trim().toLowerCase() === label.trim().toLowerCase()) {
                actualLabel = labels.trim();
                break;
            }
        }

        expect(actualLabel.toLowerCase()).toBe(label.trim().toLowerCase());
    }

    /*------------------------------------------------------------------------------------
     * Objective 	: Click and select a value from dropdown in filter field and verify
     *-------------------------------------------------------------------------------------*/
    static async clickAndSelectDropdownFieldGridFilter(elementId, listItem, label, sessionCode) {

        // Intializing the page
        const lnPg = new LNPage();

        // Verifying the label
        await this.verifyColumnHeader(sessionCode, label); // Assuming this is implemented

        // Wait for the dropdown to be clickable
        await lnPg.drpValueGridFilter(elementId).waitFor();

        // Using condition to verify the list item is already selected or not
        const currentValue = await lnPg.dropdownValueField(elementId).innerText();
        if (currentValue.trim() !== listItem) {
            await lnPg.drpValueGridFilter(elementId).click();

            // Verifying whether dropdown field is in active or not
            for (let count = 0; count < 4; count++) {
                const classAttr = await lnPg.dropdownStsValue(elementId).getAttribute('class');
                if (!classAttr.includes('is-active')) {
                    await lnPg.drpValueGridFilter(elementId).click();
                } else {
                    break;
                }
            }

            // Hover and click on the desired list item
            const itemToSelect = lnPg.selectListItem(listItem);
            await itemToSelect.hover();
            await itemToSelect.waitFor({ state: 'visible', timeout: 1000 });
            await itemToSelect.click();
        }

        // Verifying the value
        const finalValue = await lnPg.dropdownValueField(elementId).innerText();
        expect(finalValue.trim()).toBe(listItem);
    }

    /* ---------------------------------------------------------
     * Objective : To select required row from the grid 
     * ---------------------------------------------------------*/
    static async selectRequiredRecord(sessionCode, columnName, elementId, value) {

        // Intializing the page
        const commonPg = new LNPage();

        // Step 1: Verify column header
        await this.verifyColumnHeader(sessionCode, columnName);

        // Step 2: Fetch all grid cell elements
        const records = await commonPg.gridCell(sessionCode, elementId, sessionCode, elementId).elementHandles();

        let rowNo = -1;
        let isRecordFound = false;

        // Step 3: Search through each record
        for (let i = 0; i < records.length; i++) {
            const label = (await records[i].innerText()).trim();
            const inputValue = await records[i].getAttribute(ElementAttributes.VALUE);
            const fetchedValue = inputValue !== null ? inputValue : label;

            if (fetchedValue.toLowerCase() === value.toLowerCase()) {
                rowNo = i;
                isRecordFound = true;
                break;
            }
        }

        // Step 4: Assert record is found
        expect(isRecordFound).toBeTruthy();

        // Step 5: Check if checkbox is not already selected
        const checkbox = commonPg.selectRequiredRecord(sessionCode, String(rowNo));
        const classAttr = await checkbox.getAttribute(ElementAttributes.CLASS);
        if (!classAttr.includes('checked')) {
            await checkbox.click();
        }

        return rowNo;
    }

	/*----------------------------------------------------------------------
	 * Objective 	: Click drilldown button for required record
	 *----------------------------------------------------------------------*/
    static async drilldownRequiredRecord(sessionCode, recordNum) {

        // Intializing the page
        const lnPg = new LNPage();

        const drilldownBtn = lnPg.drilldownRequiredRecord(sessionCode, recordNum);

        // Wait until it's visible and enabled (similar to ExpectedConditions.elementToBeClickable)
        await drilldownBtn.waitFor({ state: 'visible', timeout: 1000 });
        await drilldownBtn.click();
    }

    /*------------------------------------------------------------------------------------------------
	 * Objective 	: Navigate to LN References and select required menu option - label
	 *-----------------------------------------------------------------------------------------------*/
    static async navigateToLNReferences(sessionCode, ...menuOptions) {

        // Intializing the page   
        const lnPg = new LNPage();

        // Using if condition if references is under overflow button
        const isRefMenuVisible = await this.isElementPresent(await lnPg.referenceMenuItem(sessionCode));

        if (!isRefMenuVisible) {
            await lnPg.moreButton(sessionCode).click();
            await lnPg.referenceOverflow(sessionCode).click();
            await this.pause(2000);
        } else {
            await lnPg.referenceMenuItem(sessionCode).click();
        }


        // Using loop to click on multiple navigations
        for (const menuOption of menuOptions) {
            await lnPg.referenceMenuOption(menuOption, sessionCode).hover();
            await lnPg.referenceMenuOption(menuOption, sessionCode).click();
        }
    }

    /*---------------------------------------------------------------------------------
    * Objective 	: To verify the dialog window session tab
    *--------------------------------------------------------------------------------*/
    static async verifyDialogBoxWindow(tabName) {

        // Intializing the page
        const lnPg = new LNPage();

        // Verifying the dialog window Tab
        expect(await this.isElementPresent(await lnPg.dialogWindowTab(tabName))).toBeTruthy();
    }

	/*---------------------------------------------------------------------------------
	 * Objective 	: Type for one , double, triple field (trigger input and decorator)
	 *---------------------------------------------------------------------------------*/
    static async getTextField(label, elementId, sessionCode) {

        // Intializing the page
        const lnPg = new LNPage();

        return await lnPg.textLabel(label, elementId, sessionCode);
    }

    /*---------------------------------------------------------------------------------
	 * Objective 	: Type for data cell element
	 *---------------------------------------------------------------------------------*/
    static async getDataCell(label, elementId, sessionCode) {

        // Initializing the page
        const lnPg = new LNPage();

        // Verifying the label
        await this.verifyColumnHeader(sessionCode, label);

        // Returning the data cell element
        return await lnPg.textForDataCell(elementId, sessionCode);
    }

    /*------------------------------------------------------------------------------
	 * Objective : To Retrieve the grid value based on Column name
	 * @param row: Pass the row value dynamically from selectRequiredRecord() method
	 * -----------------------------------------------------------------------------*/
    static async getRequiredValueFromTheGrid(sessionCode, columnName, elementId, rowNum, page) {

        // Initializing the page
        const lnPg = new LNPage(page);

        // Verify the column header (you should define this function)
        await LNCommon.verifyColumnHeader(sessionCode, columnName);

        // Get the target row element
        const target = await lnPg.gridCell(sessionCode, elementId).nth(rowNum);

        let fetchedValue = null;
        const labelText = await target.textContent();
        const inputValue = await target.getAttribute(ElementAttributes.VALUE);

        if (inputValue !== null && inputValue !== undefined) {
            fetchedValue = inputValue;
        } else {
            fetchedValue = labelText?.trim();
        }

        return fetchedValue;
    }

}

export default LNCommon;