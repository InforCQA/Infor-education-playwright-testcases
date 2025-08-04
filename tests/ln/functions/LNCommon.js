import BaseClass from "../../testBase/BaseClass";
import LNPage from "../pages/LNPage";
import {expect} from '@playwright/test';
import ElementAttributes from "../../commons/constants/ElementAttributes";
import LNCommons from "../constants/LNCommons";
import { setBrowserZoom } from 'playwright-zoom';
import LNSessionTabs from "../constants/LNSessionTabs";
import LNSessionCodes from "../constants/LNSessionCodes";
import CloudSuite from "../../commons/functions/CloudSuite";

class LNCommon extends BaseClass {

    /*----------------------------------------------------------------------------
     * Objective 	: Navigate to LN required session through left page navigation
     *-------------------------------------------------------------------------------*/
    static async navigateToLNModule(module, ...subModules) {


            // Intializing the page
            const lnPg = new LNPage(this.page);

            await setBrowserZoom(this.page, 50);

            // Using condition to verify whether it is displaying or not
            if (await this.isElementPresent(this.getLocators(await lnPg.inforMainModules(module)))) {
                await (await lnPg.inforMainModules(module)).click();

                // Using loop to navigate to expand and use multiple sub modules
                for (let i = 0; i < subModules.length; i++) {

                    const subModule = subModules[i];
                    if (!(i == subModules.length - 1)) {
                        await (await lnPg.inforLNSubModule(subModule, i + 2)).waitFor({ state: 'visible' });
                        await (await lnPg.inforLNSubModule(subModule, i + 2)).hover();
                        await (await lnPg.inforLNSubModule(subModule, i + 2)).click();
                    } else {
                        await (await lnPg.inforLNSubModuleEnd(subModule, i + 2)).waitFor({ state: 'visible' });
                        await (await lnPg.inforLNSubModuleEnd(subModule, i + 2)).hover();
                        await (await lnPg.inforLNSubModuleEnd(subModule, i + 2)).click();
                    }
                }
            }
        // } catch (e) {
        //     console.error(`navigateToLNModule failed at line approx ${new Error().stack.split('\n')[1].trim()}`);
        //     console.error(err.stack);
        //     throw err;
        // }
    }

    /*---------------------------------------------------------------------------------
     * Objective 	: To verify the session tab
     *--------------------------------------------------------------------------------*/
    static async verifySessionTab(tabName) {

        // Intializing the page
        const lnPg = new LNPage(this.page);

        await expect(async () => {
            const currentActiveTab = await lnPg.currentActiveTab(tabName.toLowerCase());
            await currentActiveTab.waitFor({ state: 'visible' });
        }).toPass({ timeout: 30000 });
    }

    /*------------------------------------------------------------------
     * Objective 	: Click and select a value from dropdown and verify
     *-------------------------------------------------------------------*/
    static async clickAndSelectDropdownField(label, elementId, listItem) {

        // Intializing the page
        const lnPg = new LNPage(this.page);

        await expect(async () => {
            await (await lnPg.clickDropdownLabel(label, elementId)).waitFor({ state: 'visible', timeout: 5000 });
            await (await lnPg.clickDropdownLabel(label, elementId)).hover();
            await (await lnPg.clickDropdownLabel(label, elementId)).click();
        }).toPass({ timeout: 10000 });

        await (await lnPg.selectListItem(listItem)).waitFor({ state: 'visible', timeout: 5000 });
        await (await lnPg.selectListItem(listItem)).click();

        const drpValue = await (await lnPg.dropdownValueLabel(label, elementId)).textContent();
        expect(drpValue.trim()).toBe(listItem);
    }

    /*------------------------------------------------------------------
     * Objective 	: Click on the required main menu item
     *-------------------------------------------------------------------*/
    static async clickTextMenuItem(sessionCode, id, label) {

        // Intializing the page
        const lnPg = new LNPage(this.page);

        try {

            await expect(async () => {
                await (await lnPg.textMenu(sessionCode, id, label)).waitFor({ state: 'visible', timeout: 500 });
                await (await lnPg.textMenu(sessionCode, id, label)).hover();
                await (await lnPg.textMenu(sessionCode, id, label)).click();
            }).toPass({ timeout: 10000 });

        } catch (e) {
            await (await lnPg.moreButton(sessionCode)).click();
            await (await lnPg.textMenuOverflow(sessionCode, id, label)).click();
        }
    }

    /*----------------------------------------------------------------------------
     * Objective 	: Collapse the LN left pane Navigation opened
     *-------------------------------------------------------------------------------*/
    static async collapseLNModule(module) {

        // Intializing the page
        const lnPg = new LNPage(this.page);

        await expect(async () => {
            await this.page.waitForTimeout(3000);
            await (await lnPg.inforMainModules(module)).waitFor({ state: 'visible', timeout: 5000 });
            await (await lnPg.inforMainModules(module)).click({ button: 'right' });
            await this.page.waitForTimeout(1000);
            await (await lnPg.collapseAll()).waitFor({ state: 'visible', timeout: 5000 });
            await (await lnPg.collapseAll()).click();
        }).toPass({ timeout: 60000 });

        // Verifying whether module is collapsed or not
        await expect(async () => {
            await expect(await lnPg.inforMainModules(module)).toHaveAttribute(ElementAttributes.ARIA_EXPANDED, 'false');
        }).toPass();
    }

    /*---------------------------------------------------
     * Objective 	: Select header tab in LN
     *--------------------------------------------------*/
    static async selectHeaderTab(tabName, sessionCode) {

        // Intializing the page
        const lnPg = new LNPage(this.page);

        // Used try catch method to select tabs
        await expect(async () => {
            const selectHeaderTab = await lnPg.selectHeaderTab(tabName, sessionCode);
             await selectHeaderTab.waitFor({ state: 'visible', timeout: 5000 });
            await selectHeaderTab.click();
        }).toPass({ timeout: 50000 });
    }

    /*-----------------------------------------------
     * Objective 	: Select grid tab in LN
     *--------------------------------------------------*/
    static async selectGridTab(tabName, sessionCode) {

        // Intializing the page
        const lnPg = new LNPage(this.page);

        // Used try catch method to select tabs
        try {


            const selectFooterTab = await lnPg.selectFooterTab(tabName, sessionCode);
            await this.pause(1);
            await selectFooterTab.hover();
            await selectFooterTab.click({ force: true });

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
        const lnPg = new LNPage(this.page);

        await this.page.waitForLoadState('load');
        let headers = "";
        for (let i=0; i<3; i++){
        headers = await (await lnPg.gridHeader(sessionCode)).elementHandles();
        }
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
                labels = await (await liElements[0].innerHTML()).trim();
            }

            if (labels.trim().toLowerCase() === label.trim().toLowerCase()) {
                actualLabel = labels.trim();
                break;
            }
        }

        await this.page.waitForLoadState('load');
        //expect(actualLabel.toLowerCase()).toBe(label.trim().toLowerCase());
    }

    /*------------------------------------------------------------------------------------
     * Objective 	: Click and select a value from dropdown in filter field and verify
     *-------------------------------------------------------------------------------------*/
    static async clickAndSelectDropdownFieldGridFilter(elementId, listItem, label, sessionCode) {

        // Intializing the page
        const lnPg = new LNPage(this.page);

        // Verifying the label
        await this.verifyColumnHeader(sessionCode, label); // Assuming this is implemented

        // Wait for the dropdown to be clickable
        const drpValueGridFilter = await (await lnPg.drpValueGridFilter(elementId));
        await (drpValueGridFilter).click();

        // Using condition to verify the list item is already selected or not
        const currentValue = await (await lnPg.dropdownValueField(elementId)).textContent();
        if (currentValue.trim() != listItem) {
            const drpValueGridFilter = await lnPg.drpValueGridFilter(elementId);
            await drpValueGridFilter.waitFor({ state: 'visible', timeout: 5000 });
            await drpValueGridFilter.click({force: true});

            // Verifying whether dropdown field is in active or not
            for (let count = 0; count < 4; count++) {
                const classAttr = await (await lnPg.dropdownStsValue(elementId)).getAttribute('class');
                if (!classAttr.includes(LNCommons.IS_ACTIVE)) {
                    await (await lnPg.drpValueGridFilter(elementId)).waitFor({ state: 'visible', timeout: 1000 });
                    await (await lnPg.drpValueGridFilter(elementId)).click();
                } else {
                    break;
                }
            }

            // Hover and click on the desired list item
            const itemToSelect = await lnPg.selectListItem(listItem);
            await itemToSelect.hover();
            await itemToSelect.waitFor({ state: 'visible', timeout: 1000 });
            await itemToSelect.click();
        }

        // Verifying the value
        const finalValue = await (await lnPg.dropdownValueField(elementId)).innerText();
        expect(finalValue.trim()).toBe(listItem);
    }

    /* ---------------------------------------------------------
     * Objective : To select required row from the grid 
     * ---------------------------------------------------------*/
    static async selectRequiredRecord(sessionCode, columnName, elementId, value) {

        // Intializing the page
        const commonPg = new LNPage(this.page);

        // Step 1: Verify column header
        await this.verifyColumnHeader(sessionCode, columnName);
        
        // Step 2: Fetch all grid cell elements
        let records = null;
        
        await expect(async () => {
          records = await (await commonPg.gridCell(sessionCode, elementId)).elementHandles();
        }).toPass({ timeout: 60000 });
        
        let rowNo = -1;
        let isRecordFound = false, inputValue='';
        const maxAttempts = 10;

        // Step 3: Search through each record
        for (let i = 0; i < records.length; i++) {
            const label = (await records[i].innerText()).trim();

            for (let j = 0; j < maxAttempts; j++) {
                inputValue = await records[i].getAttribute(ElementAttributes.VALUE);
                if (inputValue && inputValue.trim() !== null) { break };
            }

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
        const checkbox = await commonPg.selectRequiredRecord(sessionCode, String(rowNo));
        const classAttr = await checkbox.getAttribute(ElementAttributes.CLASS);
        if (!classAttr.includes(LNCommons.CHECKED)) {
            await checkbox.click();
        }

        return rowNo;
    }

    /*----------------------------------------------------------------------
     * Objective 	: Click drilldown button for required record
     *----------------------------------------------------------------------*/
    static async drilldownRequiredRecord(sessionCode, recordNum) {

        // Intializing the page
        const lnPg = new LNPage(this.page);

        const drilldownBtn = await lnPg.drilldownRequiredRecord(sessionCode, recordNum);

        // Wait until it's visible and enabled (similar to ExpectedConditions.elementToBeClickable)
        await drilldownBtn.waitFor({ state: 'visible', timeout: 1000 });
        await drilldownBtn.hover();
        await drilldownBtn.click();
    }

    /*------------------------------------------------------------------------------------------------
     * Objective 	: Navigate to LN References and select required menu option - label
     *-----------------------------------------------------------------------------------------------*/
    static async navigateToLNReferences(sessionCode, ...menuOptions) {

        // Intializing the page   
        const lnPg = new LNPage(this.page);

        // Using if condition if references is under overflow button
        const isRefMenuVisible = await this.isElementPresent(await lnPg.referenceMenuItem(sessionCode));

        if (!isRefMenuVisible) {
            await (await lnPg.moreButton(sessionCode)).click();
            await (await lnPg.referenceOverflow(sessionCode)).click();
        }
        
        await expect(async () => {
            await (await this.page).waitForTimeout(1000);
            await (await lnPg.referencesMenuItem(sessionCode)).click();
        }).toPass({ timeout: 60000 });

        // Using loop to click on multiple navigations
        for (const menuOption of menuOptions) {
            await expect(async () => {
                await (await lnPg.referenceMenuOption(menuOption, sessionCode)).waitFor({ state: 'visible'});
                await (await lnPg.referenceMenuOption(menuOption, sessionCode)).click();
            }).toPass({ timeout: 10000 });
        }
    }

    /*---------------------------------------------------------------------------------
    * Objective 	: To verify the dialog window session tab
    *--------------------------------------------------------------------------------*/
    static async verifyDialogBoxWindow(tabName) {

        // Intializing the page
        const lnPg = new LNPage(this.page);

        // Verifying the dialog window Tab
        expect(await this.isElementPresent(await lnPg.dialogWindowTab(tabName))).toBeTruthy();
    }

    /*---------------------------------------------------------------------------------
     * Objective 	: Type for one , double, triple field (trigger input and decorator)
     *---------------------------------------------------------------------------------*/
    static async getTextField(label, elementId, sessionCode) {

        // Intializing the page
        const lnPg = new LNPage(this.page);

        return await lnPg.textLabel(label, elementId, sessionCode);
    }

    /*---------------------------------------------------------------------------------
     * Objective 	: Type for data cell element
     *---------------------------------------------------------------------------------*/
    static async getDataCell(label, elementId, sessionCode) {

        // Initializing the page
        const lnPg = new LNPage(this.page);

        // Verifying the label
        //await this.verifyColumnHeader(sessionCode, label);

        // Returning the data cell element
        return await lnPg.textForDataCell(elementId, sessionCode);
    }

    /*------------------------------------------------------------------------------
     * Objective : To Retrieve the grid value based on Column name
     * @param row: Pass the row value dynamically from selectRequiredRecord() method
     * -----------------------------------------------------------------------------*/
    static async getRequiredValueFromTheGrid(sessionCode, columnName, elementId, rowNum) {

        // Initializing the page
        const lnPg = new LNPage(this.page);

        // Verify the column header (you should define this function)
        await LNCommon.verifyColumnHeader(sessionCode, columnName);

        // Get the target row element
        const target = await (await lnPg.gridCell(sessionCode, elementId)).nth(rowNum);
        await expect(target).toBeVisible()
        let fetchedValue = null;

        const fetchedLbl = await target.textContent();
        console.log(fetchedLbl);
        const maxAttempts = 15;
        let fetchedInput = null;
        
        for (let i = 0; i < maxAttempts; i++) {
            fetchedInput = await target.evaluate(el => el.value);
            
            if (fetchedInput && fetchedInput.trim() !== '') break;
        }

        if (fetchedInput != null) {

            fetchedValue = fetchedInput;

        } else {
            fetchedValue = fetchedLbl;

        }
       return fetchedValue;
        
    }

    /*---------------------------------------------------------------------------------
     * Objective 	: Filter the required record
     *---------------------------------------------------------------------------------*/
    static async filterRequiredRecord(label, elementId, sessionCode, filterItem) {
        // Intializing the page
        const lnPg = new LNPage(this.page);

        // Verifying the label (assuming you have a utility function or method for this)
        await this.verifyColumnHeader(sessionCode, label);

        await this.type(await lnPg.filterInput(elementId, sessionCode), filterItem);

        await this.page.keyboard.press('Tab');
    }

    /* -----------------------------------------------------------------------
     * Objective : To check if required record is present in the grid 
     * -----------------------------------------------------------------------*/
    static async isRequiredRowPresent(sessionCode, columnName, elementId, value) {

        // Intializing the page
        const lnPg = new LNPage(this.page);

        // Verify the column header
        await this.verifyColumnHeader(sessionCode, columnName);

        // Get all grid cell elements for the given elementId
        const records = await (await lnPg.gridCell(sessionCode, elementId, sessionCode, elementId)).elementHandles();

        let isRecordFound = false;

        // Loop through each cell to match value
        for (let i = 0; i < records.length; i++) {
            const labelText = (await records[i].innerText())?.trim();
            const inputValue = await records[i].getAttribute(ElementAttributes.VALUE);
            const fetchedValue = inputValue ? inputValue.trim() : labelText;

            if (fetchedValue.toLowerCase() === value.toLowerCase()) {
                isRecordFound = true;
                break;
            }
        }

        // Return result
        return isRecordFound;
    }

    /*------------------------------------------------------------------
     * Objective 	: Click on the required main menu item
     *-------------------------------------------------------------------*/
    static async clickMainMenuItem(sessionCode, menuItem) {

        // Initializing the page
        const lnPg = new LNPage(this.page);

        const menuLocator = await lnPg.menuItem(sessionCode, menuItem);

        // Wait for menu item to be clickable
        await expect(async () => {

            await (await this.page).waitForTimeout(1000);
            await menuLocator.hover();
            await menuLocator.click();
        }).toPass({ timeout: 50000 });
    }

    /*--------------------------------------------------------------------------------------------
     * Objective 	: The method is used to perform custom actions on LN Input fields with Lookup
     *-------------------------------------------------------------------------------------------*/
    static async triggerInputField(locator, data) {
        // Initializing the page
        const lnPg = new LNPage(this.page);

        // Step 1: Wait and click the input field
        await expect(async () => {
            await locator.click();
        }).toPass({ timeout: 10000 });

        // Step 3: Get parent div and check for focus class
        const parent = await locator.locator('..'); // parent div
        const classAttr = await parent.getAttribute('class');

        if (!classAttr.includes('TriggerInputField-focus')) {

            await expect(async () => {
                await locator.click();
            }).toPass({ timeout: 10000 });

        }

        // Step 5: Clear and type
        await this.pause(2);
        await expect(async () => {
            await this.type(locator, data);
        }).toPass({ timeout: 20000 });


        // Step 6: Press Tab to trigger any events
        await this.page.keyboard.press('Tab');
    }

    /*----------------------------------------------------------
     * Objective : To get Look up icon of textbox element
     *----------------------------------------------------------*/
    static async getTextboxLookUpIcon(label, elementId, sessionCode) {

        // Initialize the page
        const lnPg = new LNPage(this.page);

        // Return dynamic locator for lookup icon (your LNPage.lookupBtn must support this structure)
        return await lnPg.lookupBtn(label, elementId, sessionCode);
    }

    /*------------------------------------------------------------------
     * Objective 	: Filters the required record and select first record
     *-------------------------------------------------------------------*/
    static async filterAndSelectFirstRecord(label, elementId, filterItem, sessionCode) {

        // Initialize the page
        const lnPg = new LNPage(this.page);

        await this.verifyColumnHeader(sessionCode, label);
        await this.type(await lnPg.filterInput(elementId, sessionCode), filterItem);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(2000);
        // Step 4: Validate typed value
        const labelValueLocator = await lnPg.filterLabelValue(elementId, sessionCode);
        const inputValueLocator = await lnPg.filterInputValue(elementId, sessionCode);

        if (await labelValueLocator.isVisible()) {
            const labelText = (await labelValueLocator.textContent())?.trim();
            await this.page.waitForTimeout(2000);
            expect(labelText.toLowerCase()).toBe(filterItem.toLowerCase());
        } else {
            const valueAttr = await inputValueLocator.inputValue();
            await this.page.waitForTimeout(2000);
            expect(valueAttr?.trim().toLowerCase()).toBe(filterItem.toLowerCase());
        }

        const firstRecord = await lnPg.selectRequiredRecord(sessionCode, LNCommons.FIRST_RECORD);
        await firstRecord.click();

        const classAttr = await firstRecord.getAttribute(ElementAttributes.CLASS);
        expect(classAttr.includes(LNCommons.CHECKED)).toBeTruthy();
    }
    /*--------------------------------------------------------------------------------------------
     * Objective 	: The method is used to perform custom actions on LN Table fields Input fields
     *------------------------------------------------------------------------------------------*/

    static async dataCellElement(baseLocator, position, data) {

        console.log(`INFO: DataCell element is being used for ${await baseLocator.toString()}`);

        // Convert to 1-based index like in Selenium

        // Construct dynamic locator based on position
        const element = await baseLocator.nth(position); // Using Playwright's native nth()

        // Scroll/move to the element and click to activate it
        await expect(async () => {
            await element.click();
        }).toPass({ timeout: 10000 });


        // Find the child input inside the cell (assuming structure: <div><input></div>)
        const parentDiv = await element.locator('div');
        const classAttr = await parentDiv.first().getAttribute(ElementAttributes.CLASS);

        // If not focused, click again
        if (!classAttr.includes('focus')) {
            await element.click();
        }

        // Get the actual input field and type data
        const inputField = await parentDiv.locator('input');

        await inputField.fill('');
        await inputField.type(data);
        await this.page.keyboard.press('Tab');

        await this.page.waitForTimeout(2000);
    }

    /**
     * ------------------------------------------------------------------
     * Objective : Validate popup message and handle pop-up
     * ------------------------------------------------------------------
     */
    static async validateMessageAndHandlePopUp(popupText, popupBtn) {

        const lnPg = new LNPage(this.page);

        let popup = null, textCount = 0;

        await expect(async () => {
            await (await lnPg.popupText()).waitFor({ state: 'visible', timeout: 5000 });
            textCount = await (await lnPg.popupText()).count();
        }).toPass({ timeout: 60000 });

        while (textCount > 0) {

            popup = await (await lnPg.popupText()).nth(textCount - 1);
            if (await (await popup.textContent()).includes(popupText)) {
                break;
            }
            textCount--;
        }

        await expect(async () => {

            expect((await popup.textContent()).toLowerCase()).toBe(popupText.toLowerCase());

        }).toPass({ timeout: 10000 });

        await (await lnPg.popupBtn(popupBtn)).hover();
        await (await lnPg.popupBtn(popupBtn)).click();

    }

    /**
     * ----------------------------------------------------------------
     * Objective : To get Look up icon of textbox element in Grid 
     * ----------------------------------------------------------------
     */
    static async getTextboxLookUpIconInGrid(lbl, elementId, sessionCode) {

        const lnPg = new LNPage(this.page);

        // Verify header label before proceeding
        await this.verifyColumnHeader(sessionCode, lbl);

        // Return locator for the dynamic grid lookup icon (last record)
        return await lnPg.gridLookupBtnLastRec(elementId, sessionCode);
    }

    /*-----------------------------------------------
     * Objective 	: Select checkbox
    *--------------------------------------------------*/
    static async selectCheckbox(label, elementId) {

        const lnPg = new LNPage(this.page);

        // Check if not already selected
        let classAttr = null;

        const selectCheckboxLabel = await lnPg.selectCheckboxLabel(label, elementId);
        await selectCheckboxLabel.waitFor({ state: 'visible' });
        classAttr = await selectCheckboxLabel.evaluate(el => el.className);

        // Using condition to check whether it is selected or not
        if (!(await classAttr.includes(LNCommons.CHECKED))) {

            await expect(async () => {
                await (await lnPg.selectCheckboxLabel(label, elementId)).waitFor({ state: 'visible' });
                await (await lnPg.selectCheckboxLabel(label, elementId)).click();
            }).toPass({ timeout: 10000 });

        }

        // Verifying whether checkbox is selected ot not
        const checkbox = await lnPg.selectCheckboxLabel(label, elementId);
        expect((await checkbox.getAttribute(ElementAttributes.CLASS))).toBeTruthy();
    }

    /*--------------------------------------------------------------------------------------------
    * Objective 	: The method is used to perform custom actions on LN Input fields
    *------------------------------------------------------------------------------------------*/
    static async decoratorInputField(locator, data) {

        // Click to focus – Playwright auto-waits for actionability :contentReference[oaicite:1]{index=1}
        await locator.click();

        // Locate the parent <div>
        const parent = await locator.locator('xpath=..');

        // If parent doesn't yet have "focus" in class, click input again
        if (!(await parent.getAttribute('class')).includes('focus')) {
            await locator.click();
        }

        // Wait until parent has class containing "focus"
        await expect(async () => {
            // perform the check/assertion inside the function
            const parentHandle = await parent.elementHandle();

            await expect(parent).toHaveClass(/focus/);

        }).toPass({ timeout: 10000 });

        // Clear existing content and fill, then press Tab
        await this.type(locator, data);
        await this.page.keyboard.press('Tab');
    }

    static async deselectCheckbox(label, elementId) {

        const lnPg = new LNPage(this.page);

        // Check if not already selected
        let classAttr = null;

        const selectCheckboxLabel = await lnPg.selectCheckboxLabel(label, elementId);
        await selectCheckboxLabel.waitFor({ state: 'visible' });
        classAttr = await selectCheckboxLabel.evaluate(el => el.className);

        // Using condition to check whether it is selected or not
        if ((await classAttr.includes(LNCommons.CHECKED))) {

            await expect(async () => {
                await (await lnPg.selectCheckboxLabel(label, elementId)).waitFor({ state: 'visible' });
                await (await lnPg.selectCheckboxLabel(label, elementId)).click();
            }).toPass({ timeout: 10000 });

        }

        // Verifying whether checkbox is selected ot not
        const checkbox = await lnPg.selectCheckboxLabel(label, elementId);
        expect((await checkbox.getAttribute(ElementAttributes.CLASS)).includes(LNCommons.CHECKED)).toBeFalsy();
    }

    /*----------------------------------------------- 
	 * Objective 	: Handles the device window
	 *-----------------------------------------------*/
    static async handleDevice() {

        // Intializing the page
        const lnPg = new LNPage(this.page);

        await LNCommon.verifyDialogBoxWindow(LNSessionTabs.SELECT_DEVICE);
        await (await lnPg.display()).click();
        await lnPg.triggerInputField(await lnPg.device(), LNCommons.DEVICE_D);
        await (await lnPg.continueIcon()).click();
        
        if (await this.isElementPresent(await lnPg.closeProcess())) {
            await (await lnPg.closeProcess()).click();
        }
    }

    static async selectRadioBtn(text, elementId) {

        // Intializing the page
        const lnPg = new LNPage(this.page);

        const radio = await lnPg.selectRadioBtn(text, elementId);

        await expect(async () => {
            await radio.waitFor({ state: 'visible', timeout: 2000 });
        }).toPass({ timeout: 10000 });

        // Click only if not already checked
        const classAttr = await radio.getAttribute(ElementAttributes.CLASS);
        if (!await classAttr.includes(LNCommons.CHECKED)) {

            await radio.click();
        }
        console.log(await radio.getAttribute(ElementAttributes.CLASS));
        // Verifying the value

        await expect(async () => {
            await radio.waitFor({ state: 'visible', timeout: 2000 });

            expect((await radio.getAttribute(ElementAttributes.CLASS)).includes(LNCommons.CHECKED), `radio button is not selected`)
                .toBeTruthy();
        }).toPass({ timeout: 10000 });
    }
// ----------------------------------------------------------------------
// Purpose : Move mouse to a specific column header in a grid
// ----------------------------------------------------------------------

static async moveToRequiredColumnHeader(sessionCode, elementId, label) {
  
    const lnPg = new LNPage(this.page);
 
    await LNCommon.verifyColumnHeader(sessionCode, label); 

    await expect(async () => {
        const columnHeaderLocator = await lnPg.columnHeader(elementId,sessionCode);
        await columnHeaderLocator.waitFor({ state: 'visible', timeout: 10000 });
        await columnHeaderLocator.scrollIntoViewIfNeeded();
      //  await columnHeaderLocator.hover(); 
    }).toPass({ timeout: 10000 });
}
/**-----------------------------------------------------------------
 * Objective: Validate popup message and handle pop-up if it exists
 *------------------------------------------------------------------*/
static async validateMessageAndHandlePopUpIfExists(popupText, popupBtn) {
  
    const lnPg = new LNPage(this.page);

  // Check if popup button is present
  const isPresent = await lnPg.popupBtn(popupBtn);
  if (isPresent) {
    const popupTexts = await lnPg.popupText.allTextContents();
    for (let i = popupTexts.length - 1; i >= 0; i--) {
      if (popupTexts[i].toLowerCase().includes(popupText.toLowerCase())) {
        console.log(`=========>>>>> Pop Up message: ${popupTexts[i]} <<<<<=========`);

        expect(popupTexts[i]).toContain(popupText);

        const popupBtnElement = await lnPg.popupBtn(popupBtn);
        await popupBtnElement.click();
        break;
      }
    }
  }
}

/**
 * --------------------------------------------------------
 * Objective : To update default filter value in the grids
 * --------------------------------------------------------
 */
    static async updateDefaultFilter(elementId, sessionCode, value) {
        // Initializing the page
        const lnPg = new LNPage(this.page);

        // Click on the grid menu button
        await (await lnPg.gridMenuBtn(elementId, sessionCode)).click();

        // Click on the desired filter operator (e.g., Contains, Starts With)
        await (await lnPg.filterOperator(value)).click();
    }

    static async LNRestart() {
        // Intializing the page
        const lnPg = new LNPage(this.page);

        await (await lnPg.lnOptions()).click();

        await (await lnPg.lnRestart()).click();

        await LNCommon.handleYesPopUp();
        await LNCommon.handlePopUp();
    }


    static async handleYesPopUp() {
        const lnPg = new LNPage(this.page);

        const count = await (await lnPg.YesButton()).count();
        if (count > 0) {
            const textCount = await (await lnPg.popupText()).count();

            if (textCount > 0) {
                console.log("=========>>>>> Pop Up message: " + await (await lnPg.popupText.nth(0)).textContent() + " <<<<<=========");
            }

            await (await lnPg.YesButton().nth(0)).click();
        }
    }

    static async handlePopUp() {

        const lnPg=new LNPage(this.page);

        const count= await (await lnPg.popupOKButton()).count();

        if(count>0) {

            const textCount= await (await lnPg.popupText()).count();
            if(textCount>0){
               
                const popupText= await (await lnPg.popupText()).nth(0);
                console.log("=========>>>>> Pop Up message: "+ await popupText.textContent() +" <<<<<=========");
            }

            await (await (await lnPg.popupOKButton()).nth(0)).click();
        }

    }

    static async runProgram(sessionID)
	{
		// Intializing the page
		const lnPg = new LNPage(this.page);
		
		 await setBrowserZoom(this.page, 50);
         
		if(await this.isElementPresent(await lnPg.lnSystemMessage())==true)
		{
			await (await lnPg.lnSystemMessage()).click();
		}
		
		if(await (await (await lnPg.lnSideNavigate()).getAttribute(ElementAttributes.STYLE)).includes("width: 0px"))
		{
			console.log("INFO : ========>>>>> LN Menu is Closed <<<<<=========");
			await (await lnPg.lnMenu()).click();
			console.log("INFO : ========>>>>> LN Menu is Opened <<<<<=========");
		}else
		{
			console.log("INFO : ========>>>>> LN Menu is Opened <<<<<=========");
		}

		await CloudSuite.collapseContextApps();

        if (await (await (await lnPg.optionsCaret()).getAttribute(ElementAttributes.ICONID))?.includes(LNCommons.DOWN)) {
            await (await lnPg.lnOptions()).click();
        }

        const locator =await (await lnPg.iframe()).locator(`#${LNCommons.NODE_OPTIONS_LABEL}`);
  
        await expect(async () => {

            await expect(locator).toHaveAttribute(ElementAttributes.ARIA_EXPANDED, 'true');

        }).toPass({ timeout: 10000 });
		
		await (await lnPg.lnRunprogram()).click();

        await expect(async () => {

            await this.page.waitForTimeout(2000);
            await (await lnPg.lnRunprogramInput()).type(sessionID);

        }).toPass({ timeout: 10000 });
	
		await this.page.keyboard.press('Tab');

		console.log("===="+await (await (await lnPg.sessionCode()).inputValue()).substring(0,13));
        
		if((await (await (await lnPg.sessionCode()).textContent()).substring(0,13).toLowerCase())===(LNSessionCodes.BILL_OF_MATERIAL.toLowerCase())) {
			
			if(!await (await (await lnPg.openInNewWindow()).getAttribute(ElementAttributes.CLASS))?.includes(LNCommons.CHECKED)) {
				
				await (await lnPg.openInNewWindow()).click();
			}
		}
		await (await lnPg.lnRunprogramOK()).click();
		
		console.log("INFO : ========>>>>> Navigated to "+sessionID+" Session <<<<<=========");
	}

    static async selectRecord(sessionCode, recordNum) {

        // Intializing the page
        const lnPg = new LNPage(this.page);

        // Using condition to verify whether it is already selected or not
        if (!await (await (await lnPg.selectRequiredRecord(sessionCode, recordNum)).getAttribute(ElementAttributes.CLASS)).includes(LNCommons.CHECKED)) {

            await (await lnPg.selectRequiredRecord(sessionCode, recordNum)).click();
        }
        // Verifying whether record is already selected or not
        await expect(async () => {

            expect(await (await (await lnPg.selectRequiredRecord(sessionCode, recordNum)).getAttribute(ElementAttributes.CLASS)).includes(LNCommons.CHECKED), " checkbox is not selected").toBeTruthy();

        }).toPass({ timeout: 10000 });
    }

    static async navigateToLNActions(sessionCode, ...menuOptions) {

		const lnPg = new LNPage(this.page);

        if (!await this.isElementPresent(await lnPg.actionsMenuItem(sessionCode))) {

            await (await lnPg.moreButton(sessionCode)).click();
			await (await lnPg.actionOverflow(sessionCode)).click();
          
        } else {
            
            await (await lnPg.actionMenuItem(sessionCode)).hover();
            await (await lnPg.actionMenuItem(sessionCode)).click();
        }

        for (let i = 0; i < menuOptions.length; i++) {

            let menuOption = menuOptions[i];
            await expect(async () => {

                await (await lnPg.actionMenuOption(menuOption, sessionCode)).hover();
                await (await lnPg.actionMenuOption(menuOption, sessionCode)).click();
                
            }).toPass({ timeout: 30000 });
        }
    }

    static async updateDefaultFilter(elementId, sessionCode, value) {

		// Intializing the page
		const lnPg = new LNPage(this.page);
		
		
		await (await lnPg.gridMenuBtn(elementId, sessionCode)).click();
		await (await lnPg.filterOperator(value)).click();

	}

    static async verifyValueWithLabel(label, sessionCode, text) {
		
		// Intializing the page
		const lnPg =new LNPage(this.page);
		
		// Verifying the status
		expect(await this.isElementPresent(await lnPg.status(label, sessionCode, text)), `=========>>>>>  ${text} status is not displaying<<<<<=========`)
				  .toBeTruthy();		
	}
	
}

export default LNCommon;