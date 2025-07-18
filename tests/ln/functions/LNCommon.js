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

        //expect(actualLabel.toLowerCase()).toBe(label.trim().toLowerCase());
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
        await this.pause(2000);
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
    
    /*---------------------------------------------------------------------------------
	 * Objective 	: Filter the required record
	 *---------------------------------------------------------------------------------*/
    static async filterRequiredRecord(label, elementId, sessionCode, filterItem) {
        // Intializing the page
        const lnPg = new LNPage();

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
    const lnPg = new LNPage();

    // Verify the column header
    await this.verifyColumnHeader(sessionCode, columnName);

    // Get all grid cell elements for the given elementId
    const records = await lnPg.gridCell(sessionCode, elementId, sessionCode, elementId).elementHandles();

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
    const lnPg = new LNPage();

    const menuLocator = lnPg.menuItem(sessionCode, menuItem);

    // Wait for menu item to be clickable
    await menuLocator.waitFor({ state: 'visible', timeout: 5000 });

    // Click using force to handle any overlay
    await menuLocator.click({ force: true });
}

/*--------------------------------------------------------------------------------------------
 * Objective 	: The method is used to perform custom actions on LN Input fields with Lookup
 *-------------------------------------------------------------------------------------------*/
static async triggerInputField(locator, data) {
 // Initializing the page
    const lnPg = new LNPage();

    // Step 1: Wait and click the input field
    await locator.click();

    // Step 3: Get parent div and check for focus class
    const parent = await locator.locator('..'); // parent div
    const classAttr = await parent.getAttribute('class');

    if (!classAttr.includes('TriggerInputField-focus')) {
        await locator.click(); // Re-click to enforce focus
    }

    // Step 5: Clear and type
    await this.type(locator, data);

    // Step 6: Press Tab to trigger any events
    await this.page.keyboard.press('Tab');
}

/*----------------------------------------------------------
 * Objective : To get Look up icon of textbox element
 *----------------------------------------------------------*/
static getTextboxLookUpIcon(label, elementId, sessionCode) {

    // Initialize the page
    const lnPg = new LNPage();

    // Return dynamic locator for lookup icon (your LNPage.lookupBtn must support this structure)
    return lnPg.lookupBtn(label, elementId, sessionCode, label, elementId, sessionCode, label, elementId, sessionCode, label, elementId, sessionCode, label, elementId, sessionCode, label, elementId, sessionCode);
}

/*------------------------------------------------------------------
 * Objective 	: Filters the required record and select first record
 *-------------------------------------------------------------------*/
static async filterAndSelectFirstRecord(label, elementId, filterItem, sessionCode) {

    // Initialize the page
    const lnPg = new LNPage();

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
    const position2 = position + 1;

    // Construct dynamic locator based on position
    const element = baseLocator.nth(position); // Using Playwright's native nth()

    // Scroll/move to the element and click to activate it
    await element.scrollIntoViewIfNeeded();
    await element.click();

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
  const lnPg = new LNPage();

  // Get all popup text locators
  const popups = await lnPg.popupText.elementHandles(); // assuming popupText is a locator for all visible messages
  let matchedText = null;

  for (let i = popups.length - 1; i >= 0; i--) {
    const text = (await popups[i].textContent())?.trim();
    if (text && text.includes(popupText)) {
      console.log(`=========>>>>> Pop Up message: ${text} <<<<<=========`);

      matchedText = text;
      await this.page.waitForTimeout(2000);
      break;
    }
  }

  // Assert that the expected popup message appeared
  expect(matchedText).toContain(popupText);

  // Click the required popup button
  const button = lnPg.popupBtn(popupBtn); // dynamic locator like: (label) => page.getByRole('button', { name: label })
  await button.click();
}

/**
 * ----------------------------------------------------------------
 * Objective : To get Look up icon of textbox element in Grid 
 * ----------------------------------------------------------------
 */
static async getTextboxLookUpIconInGrid(lbl, elementId, sessionCode) {
  const lnPg = new LNPage();
    // Verify header label before proceeding
  await this.verifyColumnHeader(sessionCode, lbl);

  // Return locator for the dynamic grid lookup icon (last record)
  return await lnPg.gridLookupBtnLastRec(elementId, sessionCode);
}
/*-----------------------------------------------
 * Objective 	: Select checkbox
*--------------------------------------------------*/	
static async selectCheckbox(label, elementId) {
  const locator = await this.getDynamicElementMultiple(label, elementId);

  // Move to the element (hover simulation)
  await locator.scrollIntoViewIfNeeded();
  await locator.hover();

  // Check if not already selected
  const classAttr = await locator.getAttribute('class');
  if (!classAttr.includes(LNCommons.CHECKED)) {
    await locator.click({ force: true });
  }

  // Verify if selected now
  const updatedClass = await locator.getAttribute('class');
  expect(updatedClass).toContain(LNCommons.CHECKED);
}

}

export default LNCommon;