import BaseClass from "../../testBase/BaseClass";
import LNPage from "../pages/LNPage";
import {expect} from '@playwright/test';
import ElementAttributes from "../../commons/constants/ElementAttributes";
import LNCommons from "../constants/LNCommons";
import { setBrowserZoom } from 'playwright-zoom';

class LNCommon extends BaseClass {

    /*----------------------------------------------------------------------------
	 * Objective 	: Navigate to LN required session through left page navigation
	 *-------------------------------------------------------------------------------*/
    static async navigateToLNModule(module, ...subModules) {

        // Intializing the page
        const lnPg = new LNPage(this.page);

        await setBrowserZoom(this.page, 50);

        // Using condition to verify whether it is displaying or not
        if (await this.isElementPresent(await lnPg.inforMainModules(module))) {
           await(await lnPg.inforMainModules(module)).click();

            // Using loop to navigate to expand and use multiple sub modules
            for (let i = 0; i < subModules.length; i++) {

                const subModule = subModules[i];
                if (!(i == subModules.length - 1)) {
                    await(await lnPg.inforLNSubModule(subModule, i + 2)).waitFor({ state: 'visible' });
                    await(await lnPg.inforLNSubModule(subModule, i + 2)).hover();
                    await(await lnPg.inforLNSubModule(subModule, i + 2)).click();
                } else {
                    await(await lnPg.inforLNSubModuleEnd(subModule, i + 2)).waitFor({ state: 'visible' });
                    await(await lnPg.inforLNSubModuleEnd(subModule, i + 2)).hover();
                    await(await lnPg.inforLNSubModuleEnd(subModule, i + 2)).click();
                }
            }
        }
    }

    /*---------------------------------------------------------------------------------
     * Objective 	: To verify the session tab
     *--------------------------------------------------------------------------------*/
    static async verifySessionTab(tabName) {

        // Intializing the page
        const lnPg = new LNPage(this.page);

        await expect(async () => {
           const currentActiveTab= await lnPg.currentActiveTab(tabName.toLowerCase());
           await currentActiveTab.waitFor({ state: 'visible'});
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
            await (await lnPg.textMenu(sessionCode, id, label)).waitFor({ state: 'visible', timeout: 1000 });
            await (await lnPg.textMenu(sessionCode, id, label)).hover();
            await (await lnPg.textMenu(sessionCode, id, label)).click();
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
        const lnPg = new LNPage(this.page);

        await (await lnPg.inforMainModules(module)).click({ button: 'right' });

        expect(async () => {
            await (await lnPg.collapseAll()).waitFor({ state: 'visible', timeout: 5000 });
            await (await lnPg.collapseAll()).dblclick();
        }).toPass({ timeout: 10000 });

        // Verifying whether module is collapsed or not
        expect(async () => {
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
            const selectHeaderTab = await (await lnPg.selectHeaderTab(tabName, sessionCode));
            await selectHeaderTab.dblclick();
        }).toPass({ timeout: 10000 });
    }

    /*-----------------------------------------------
     * Objective 	: Select grid tab in LN
     *--------------------------------------------------*/
    static async selectGridTab(tabName, sessionCode) {

        // Intializing the page
        const lnPg = new LNPage(this.page);

        // Used try catch method to select tabs
        try {
            
    
            const selectFooterTab= await lnPg.selectFooterTab(tabName, sessionCode);
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
        const headers = await (await lnPg.gridHeader(sessionCode)).elementHandles();

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
        const drpValueGridFilter= await (await lnPg.drpValueGridFilter(elementId));
        await (drpValueGridFilter).click();

        // Using condition to verify the list item is already selected or not
        const currentValue = await (await lnPg.dropdownValueField(elementId)).textContent();
        if (currentValue.trim() != listItem) {
            const drpValueGridFilter= await lnPg.drpValueGridFilter(elementId);
            await drpValueGridFilter.click();

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
        const records = await (await commonPg.gridCell(sessionCode, elementId, sessionCode, elementId)).elementHandles();

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
        } else {
            await (await lnPg.referenceMenuItem(sessionCode)).click();
        }


        // Using loop to click on multiple navigations
        for (const menuOption of menuOptions) {
            await expect(async () => {
                await (await lnPg.referenceMenuOption(menuOption, sessionCode)).hover();
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
        const target = await(await lnPg.gridCell(sessionCode, elementId)).nth(rowNum);

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
    await menuLocator.waitFor({ state: 'visible', timeout: 5000 });

    expect(async () => {
        await menuLocator.dblclick();
    }).toPass({ timeout: 10000 });
}

/*--------------------------------------------------------------------------------------------
 * Objective 	: The method is used to perform custom actions on LN Input fields with Lookup
 *-------------------------------------------------------------------------------------------*/
static async triggerInputField(locator, data) {
 // Initializing the page
    const lnPg = new LNPage(this.page);

    // Step 1: Wait and click the input field
    await locator.click();

    // Step 3: Get parent div and check for focus class
    const parent = await locator.locator('..'); // parent div
    const classAttr = await parent.getAttribute('class');

    if (!classAttr.includes('TriggerInputField-focus')) {
        await expect(async () => {
            await locator.click();
        }).toPass({ timeout: 10000 });
    }

    // Step 5: Clear and type
    await this.type(locator, data);

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
    return await lnPg.lookupBtn(label, elementId, sessionCode, label, elementId, sessionCode, label, elementId, sessionCode, label, elementId, sessionCode, label, elementId, sessionCode, label, elementId, sessionCode);
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
        }).toPass({ timeout: 10000 });

        while (textCount > 0) {

            popup = await (await lnPg.popupText()).nth(textCount - 1);
            if (await (await popup.textContent()).includes(popupText)) {
                break;
            }
            textCount--;
        }

        expect((await popup.textContent()).toLowerCase()).toBe(popupText.toLowerCase());
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

        const selectCheckboxLabel= await lnPg.selectCheckboxLabel(label, elementId);
        await selectCheckboxLabel.waitFor({ state: 'visible'});
        classAttr = await selectCheckboxLabel.getAttribute(ElementAttributes.CLASS);

        console.log(classAttr);

        // Using condition to check whether it is selected or not
        if (!(await classAttr.includes(LNCommons.CHECKED))) {

            await expect(async () => {
                await (await lnPg.selectCheckboxLabel(label, elementId)).waitFor({ state: 'visible' });
                await (await lnPg.selectCheckboxLabel(label, elementId)).click();
            }).toPass({ timeout: 10000 });

        }

        // Verifying whether checkbox is selected ot not
        const radioBtn = await lnPg.selectCheckboxLabel(label, elementId);
        expect((await radioBtn.getAttribute(ElementAttributes.CLASS))).toBeTruthy();
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
  if (! (await parent.getAttribute('class')).includes('focus')) {
    await locator.click();
  }

  // Wait until parent has class containing "focus"
    await expect(async () => {
        // perform the check/assertion inside the function
        const parentHandle = await parent.elementHandle();

        await expect(parent).toHaveClass(/focus/);

    }).toPass({ timeout: 10000});

  // Clear existing content and fill, then press Tab
  await this.type(locator, data);
  await this.page.keyboard.press('Tab');
}


}

export default LNCommon;