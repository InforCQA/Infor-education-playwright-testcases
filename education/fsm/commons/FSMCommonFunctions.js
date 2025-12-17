import {expect } from '@playwright/test';
import ElementAttributes from "../../commons/constants/ElementAttributes";
import BaseClass, { log } from "../../testBase/BaseClass";
import FSMCommonPage from "./FSMCommonPage";
import Constants from "./Constants";
import { setBrowserZoom } from "playwright-zoom";
import FSMMenu from "./FSMMenu";
import FSMPageTitles from "./PageTitles";
import FSMTabs from "./Tabs";
import Homepages from "../../commons/pages/CommonPage";
const loginCnt = JSON.parse(JSON.stringify(require("../../commons/context/LoginContext.json")));

class FSMCommon extends BaseClass {

    static async expandToggleMenu() {

    const commonPg = new FSMCommonPage(this.page);

    // Expand toggle menu if it is not expanded
    if (!(await (await commonPg.moduleContainer()).getAttribute(ElementAttributes.CLASS))
            .includes(ElementAttributes.MODE_EXPANDED)) {

        await (await commonPg.btnToggleMenu()).click();
    }

    // Verify that toggle menu is expanded
    const cls = await (await commonPg.moduleContainer()).getAttribute(ElementAttributes.CLASS);
    expect(cls).toContain(ElementAttributes.MODE_EXPANDED);

    log.info("INFO : =========>>>>> Expanded Toggle menu <<<<<=========");
}


    static async switchRoles(role) {

        const commonPg = new FSMCommonPage(this.page);

            // Expand toggle menu
            await this.expandToggleMenu();

            await setBrowserZoom(this.page, 70);

            // Check if Application role is already selected
            if ((await (await commonPg.txtApplicationSwitcher()).getAttribute(ElementAttributes.INNER_TEXT)) !== role) {

                // Expand application switcher drop-down
                if ((await (await commonPg.drpApplicationSwitcher()).getAttribute(ElementAttributes.ARIA_EXPANDED)) === Constants.FALSE) {

                    await (await commonPg.drpApplicationSwitcher()).click();
                }

                // Select required role
                await (await commonPg.roleSwitcherOptions(role)).hover()

                await (await commonPg.roleSwitcherOptions(role)).click();
            }

            // Verify that role is switched
            await expect(async () => {

                expect(await (await commonPg.txtApplicationSwitcher()).innerText()).toBe(role);
            }).toPass({ timeout: 20000 });

        log.info(`INFO : =========>>>>> Switched role to ${role} <<<<<=========`);
    }

    static async verifyPageTitle(pageTitle) {

		const commonPg = new FSMCommonPage(this.page);

        await expect(async () => {
		expect((await (await commonPg.pageTitle()).textContent()).toLowerCase(), `Page title is not ${pageTitle}`).toBe(pageTitle.toLowerCase());
         }).toPass({ timeout: 30000 });
	}

    static async selectHeaderTab(tabName) {

        const commonPg = new FSMCommonPage(this.page);

        try {
            await (await commonPg.lnkTabs(tabName)).hover();
            await (await commonPg.lnkTabs(tabName)).click();
        } catch (e) {
            // Expand more tab options
            if (!(await ((await commonPg.btnMoreHeaderTabs()).getAttribute(ElementAttributes.CLASS)).includes(Constants.IS_OPEN))) {
                await (await commonPg.btnMoreHeaderTabs()).click();
            }
            await (await commonPg.lnkMoreTabs(tabName)).click();
        }

        log.info("INFO : =========>>>>> Clicked on " + tabName + " tab <<<<<=========");
    }

    // Assuming this is part of a Page Object or a utility class
    static async menuNavigation(...menuOptions) {
        const commonPg = new FSMCommonPage(this.page);

        // Expand toggle menu
        await this.expandToggleMenu();

        let menuIndex = null;
        let menuItem = null;

        for (let i = 0; i < menuOptions.length; i++) {

            if (i === 0) {
                menuItem =  await commonPg.lnkMenuOptions(menuOptions[i], menuOptions[i]);
            } else {
                menuIndex = await (await menuItem.first()).getAttribute(ElementAttributes.MENU_INDEX);
                menuItem = await commonPg.lnkMenuSubOptions(menuOptions[i], menuIndex, menuIndex);
            }

            const menuClass = await menuItem.getAttribute(ElementAttributes.CLASS);

            // Click if no sub-menu
            if (menuClass.includes(Constants.NO_ICON)) {
                await this.page.waitForTimeout(1000);
                await menuItem.hover();
                await menuItem.click();
            }
            // Expand sub-menu if not already expanded
            else if (!menuClass.includes(Constants.IS_EXPANDED)) {
                await this.page.waitForTimeout(1000);
                await  menuItem.hover();
                await menuItem.click();
            }

            log.info(`INFO : =========>>>>> Clicked on ${menuOptions[i]} menu <<<<<=========`);
        }
    }

    	static async getTableID(tableTitle) {

		const commonPg = new FSMCommonPage(this.page);

        await this.page.waitForTimeout(2000);

		// Tab which is currently active
        let activeTabIDAttr = await (await (await commonPg.activeTab()).first())
                .getAttribute(ElementAttributes.ID);

        let activeTabID = (activeTabIDAttr || "").replace(Constants.PAGE_PANEL, "");
		// Required table
		const tableID = (await (await commonPg.tableTitle(activeTabID, tableTitle)).getAttribute(ElementAttributes.ID))
				.replace(Constants.TOOLBAR_TOOLBAR_TITLE, "");

		return tableID;
	}

    static async getTextField(lbl, id) {

        const commonPg = new FSMCommonPage(this.page);

		return await commonPg.textbox(lbl.toLowerCase(), id);
	}

    static async collapseToggleMenu() {

        const commonPg = new FSMCommonPage(this.page);

        // Collapse toggle menu if it is expanded
        if ((await (await commonPg.moduleContainer()).getAttribute(ElementAttributes.CLASS)).includes(ElementAttributes.MODE_EXPANDED)) {
            try {
                await (await commonPg.btnToggleMenu()).click();

                // Verify that toggle menu is collapsed
                expect(await (await commonPg.moduleContainer()).getAttribute(ElementAttributes.CLASS), `Toggle menu is not collapsed`).not.toBe(ElementAttributes.MODE_EXPANDED);

            } catch (e) {
            }
        }

        log.info("INFO : =========>>>>> Collapsed Toggle menu <<<<<=========");
    }

    static async isRequiredRowPresent(id, ...parameters) {

        const commonPg = new FSMCommonPage(this.page);

        // Collapse toggle menu
        await this.collapseToggleMenu();

        let displayStatus = false;


        const length = parameters.length / 2;

        const columnNames = new Array(length);
        const values = new Array(length);
        const columnIDs = new Array(length);

        // Even index → column names
        for (let i = 0, j = 0; i < length; i++, j += 2) {
            columnNames[i] = parameters[j];
        }

        // Odd index → values
        for (let i = 0, j = 1; i < length; i++, j += 2) {
            values[i] = parameters[j];
        }

        // Get column IDs
        for (let i = 0; i < length; i++) {
            columnIDs[i] = await (await commonPg.thColumn(columnNames[i], id)).getAttribute(ElementAttributes.ID);
        }

        let requiredRow = null;

        try {
            switch (length) {

                case 1:

                    while (!await this.isElementPresent(await commonPg.row(columnIDs[0], values[0]))) {

                        if (await this.isElementPresent(await commonPg.btnNextWithId(id))) {

                            const nextBtn = await commonPg.btnNextWithId(id);
                            const classValue = await nextBtn.getAttribute(ElementAttributes.CLASS);

                            if (!classValue.includes(Constants.IS_DISABLED)) {
                                await nextBtn.click();
                            } else {
                                break;
                            }

                        } else {
                            break;
                        }
                    }

                    await (await commonPg.row(columnIDs[0], values[0])).waitFor({ timeout: 1000 });
                    displayStatus = true;
                    break;

                case 2:

                    while (!await this.isElementPresent(await commonPg.rowForTwoCols(columnIDs[0], values[0], columnIDs[1], values[1]))) {

                        if (await this.isElementPresent(await commonPg.btnNextWithId(id))) {

                            const nextBtn = await commonPg.btnNextWithId(id);
                            const classValue = await nextBtn.getAttribute(ElementAttributes.CLASS);

                            if (!classValue.includes(Constants.IS_DISABLED)) {
                                await nextBtn.click();
                            } else {
                                break;
                            }

                        } else {
                            break;
                        }
                    }

                    await (await commonPg.rowForTwoCols(columnIDs[0], values[0], columnIDs[1], values[1])).waitFor({ timeout: 1000 });
                    displayStatus = true;
                    break;
            }

        } catch (e) {
            displayStatus = false;
        }

        return displayStatus;
    }

    static async clickHome() {

		const commonPg = new FSMCommonPage(this.page);

		// Expand toggle menu
		await this.expandToggleMenu();

		await (await commonPg.homeBtn()).click();

		log.info("INFO : =========>>>>> Clicked on Home button <<<<<=========");
	}

    /*--------------------------------------------------------
	 * Objective : To get Page ID based on page title
	 *--------------------------------------------------------*/
	static async getPageID() {

		const commonPg = new FSMCommonPage(this.page);

		// Active page
		const pageID = (await (await commonPg.pageTitle()).getAttribute(Constants.DATA_AUTOMATION_ID)).replace(Constants.LM, "")
				.replace(Constants.TOOLBAR_TITLE, "");

		return pageID;
	}

    /*-----------------------------------------------------------------------------------------------
	 * Objective : To enable the search fields
	 * 
	 * If there are multiple tables in active page, pass uniqueElementId 
	 * using FSMCommon.getTableID(table name) otherwise, if there is 
	 * single table in active page, pass uniqueElementId using FSMCommon.getPageID()
	 *-----------------------------------------------------------------------------------------------*/
	static async enableSearchFilters(id) {

		 const commonPg = new FSMCommonPage(this.page);  

		// Collapse toggle menu
		await this.collapseToggleMenu();

		// If filters are not enabled, click on search button to enable filters
		if (!(await (await (await commonPg.datagrid(id)).first()).getAttribute(ElementAttributes.CLASS))
				.includes(Constants.HAS_FILTERABLE_COLUMNS)) {
			await FSMCommon.toolbarIcons(id, Constants.SEARCH);
		}

		log.info("INFO : =========>>>>> Enabled search filters <<<<<=========");
	}

    static async enterDataInFilterField(id, columnName, value) {

        const commonPg = new FSMCommonPage(this.page);

        // Collapse toggle menu
        await this.collapseToggleMenu();

        // Confirm that the filter fields are enabled
        await this.enableSearchFilters(id);

        // Build dynamic locator (replacement for getDynamicElement)
        const filter= await (await commonPg.filter(columnName, id))
        await filter.scrollIntoViewIfNeeded();
        // Type value
        await this.type(filter, value);
        await this.page.keyboard.press('Enter');

        log.info(
            `INFO : =========>>>>> Entered ${value} in ${columnName} filter <<<<<=========`
        );
    }

    	/*---------------------------------------------------------------------------------
	 * Objective : To click on toolbar icons
	 * Example - Save, Save and New, Open icons
	 * 
	 * If there are multiple tables in active page, pass uniqueElementId 
	 * using FSMCommon.getTableID(table name) otherwise, if there is 
	 * single table in active page, pass uniqueElementId using FSMCommon.getPageID()
	 * 
	 * For iconName, Use FSMCommons constants
	 *---------------------------------------------------------------------------------*/
	static async toolbarIcons(uniqueElementId, iconName) {

		const commonPg = new FSMCommonPage(this.page);
		
		// Verifying the options from actions
		try {
			
			await (await commonPg.toolbarIcons(iconName.toLowerCase(), uniqueElementId)).hover();
            await (await commonPg.toolbarIcons(iconName.toLowerCase(), uniqueElementId)).click();

		} catch (e) {

			await (await commonPg.btnAction(uniqueElementId)).click();

            await (await commonPg.actionMenuOptions(iconName)).hover();
			await (await commonPg.actionMenuOptions(iconName)).click();
		}
		
		log.info(`INFO : =========>>>>> Clicked on ${iconName} icon <<<<<=========`);
	}

    static async rightClickOnRowAndPerformAnAction(id, columnName, valueToSelect, ...action) {

        const commonPg = new FSMCommonPage(this.page);

        // Collapse toggle menu
        await this.collapseToggleMenu();

        // Required column
        const columnID = await (await commonPg.thColumn(columnName, id)).getAttribute(ElementAttributes.ID);

        // Click next if required row is not found and next button is enabled
        while (!(await this.isElementPresent(await commonPg.row(columnID, valueToSelect)))) {

            if (await this.isElementPresent(await commonPg.btnNextWithId(id))) {

                const nextBtn = await (await commonPg.btnNextWithId(id)).getAttribute(ElementAttributes.CLASS);;

                if (!nextBtn.includes(Constants.IS_DISABLED)) {
                    await (await commonPg.btnNextWithId(id)).click();

                } else {
                    break;
                }

            } else {
                break;
            }
        }

        // Required row
        await (await (await commonPg.row(columnID, valueToSelect)).first()).click({ button: 'right' });

        // Perform action clicks
        for (let i = 0; i < action.length; i++) {
            await (await commonPg.actionMenuOptions(action[i])).click();

        }

        log.info(`INFO : =========>>>>> Right clicked on row with value ${valueToSelect} and clicked ${action.toString()} <<<<<=========`);
    }


    static async clickRowInDialogBox(id, ...parameters) {

        const commonPg = new FSMCommonPage(this.page);

        // Collapse toggle menu
        
        await this.collapseToggleMenu();

        const length = parameters.length / 2;

        const columnNames = new Array(length);
        const values = new Array(length);
        const columnIDs = new Array(length);

        // Column names (even index)
        for (let i = 0, j = 0; i < length; i++, j += 2) {
            columnNames[i] = parameters[j];
        }

        // Column values (odd index)
        for (let i = 0, j = 1; i < length; i++, j += 2) {
            values[i] = parameters[j];
        }

        // Get column IDs
        for (let i = 0; i < length; i++) {
            columnIDs[i] = await ( await commonPg.thColumn(columnNames[i], id)).getAttribute(ElementAttributes.ID);
        }

        let requiredRow = null;

        switch (length) {

            case 1:

                // Click next until row found
                while (!(await this.isElementPresent(await commonPg.row(columnIDs[0], values[0])))) {

                    if (await this.isElementPresent(await commonPg.btnNextWithId(id))) {

                        const nextBtn = await (await commonPg.btnNextWithId(id)).getAttribute(ElementAttributes.CLASS);

                        if (!nextBtn.includes(Constants.IS_DISABLED)) {
                            await (await commonPg.btnNextWithId(id)).click();
                        } else {
                            break;
                        }

                    } else {
                        break;
                    }
                }

                requiredRow = await commonPg.row(columnIDs[0], values[0]);
                break;

            case 2:

                while (!(await this.isElementPresent(await commonPg.rowForTwoCols(columnIDs[0], values[0],columnIDs[1], values[1])))) {

                    if (await this.isElementPresent(await commonPg.btnNextWithId(id))) {

                        const nextBtn = await (await commonPg.btnNextWithId(id)).getAttribute(ElementAttributes.CLASS);

                        if (!nextBtn.includes(Constants.IS_DISABLED)) {
                            await (await commonPg.btnNextWithId(id)).click();
                        } else {
                            break;
                        }

                    } else {
                        break;
                    }
                }

                // Required row
                requiredRow = await commonPg.rowForTwoCols(columnIDs[0], values[0],columnIDs[1], values[1]);
                break;
        }

        // Get row index
        const rowNo = Number(await requiredRow.getAttribute(ElementAttributes.ARIA_ROWINDEX));

        // Click on row
        await requiredRow.hover();
        await requiredRow.click();

        log.info(`INFO : =========>>>>> Clicked on row ${rowNo} <<<<<=========`);

        return rowNo;
    }

    /*----------------------------------------------------------
 * Objective : To get Look up icon of textbox element
 *----------------------------------------------------------*/
    static async getTextboxLookUpIcon(lbl, id) {

		const commonPg = new FSMCommonPage(this.page);

        return await commonPg.lookUpIcon(lbl.toLowerCase(), id);
    }

    /*------------------------------------------------------------------------
	 * Objective : To get ID of dialog box table based on table title
	 * For tableTitle, Use FSMTABLE_TITLES constants
	 *------------------------------------------------------------------------*/
    static async getDialogBoxTableID(tableTitle) {

		const commonPg = new FSMCommonPage(this.page);

		// Required table
		const tableID = (await (await commonPg.dlgBoxTableTitle(tableTitle)).getAttribute(ElementAttributes.ID))
            .replace(Constants.TOOLBAR_TOOLBAR_TITLE, "");

        return tableID;
    }

    /*----------------------------------------------------------
 * Objective : To get dropdown element
 *----------------------------------------------------------*/
    static async getDropdown(lbl, id) {

		const commonPg = new FSMCommonPage(this.page);

        return await commonPg.dropdown(lbl.toLowerCase(), id);
    }

   /*--------------------------------------------------------
   * Objective : To validate message text and handle pop up
   *--------------------------------------------------------*/
    static async validateMessageTextAndHandlePopUp(message, handleWith) {

		const commonPg = new FSMCommonPage(this.page);

        // Validate the message
        expect(await (await commonPg.popUpMessages()).innerText(), `Message: ${message} is not displayed`).toContain(message);

        // Handle the popUp
        await (await commonPg.popUpButtons(handleWith)).click();

        log.info(`INFO : =========>>>>> Validated Message : ${message} and Clicked on ${handleWith} " <<<<<=========`);
    }
    /*---------------------------------------------------------------------
	 * Objective : To validate message text and handle pop up if exists
	 *---------------------------------------------------------------------*/
	static async validateMessageTextAndHandlePopUpIfExists(message, handleWith) {

		const commonPg = new FSMCommonPage(this.page);

		if (await this.isElementPresent(await commonPg.popUpMessages())) {
			await FSMCommon.validateMessageTextAndHandlePopUp(message, handleWith);
		}
	}

    static async selectCheckbox(checkbox) {

        // Check if checkbox is already checked
        const isChecked = await checkbox.isChecked();

        if (!isChecked) {
            await this.page.waitForTimeout(1000);
            await checkbox.click({ force: true });
        }

        // Verify checkbox is selected
        expect(await checkbox.isChecked(), `Checkbox is not selected`).toBeTruthy();
    }

    	/*----------------------------------------------------------
	 * Objective : To get checkbox element
	 *----------------------------------------------------------*/
	static async getCheckbox(lbl, id) {

		const commonPg = new FSMCommonPage(this.page);

		return await commonPg.checkbox(lbl.toLowerCase(), id);
	}

    /*----------------------------------------------------------
	 * Objective : To get text-data element
	 *----------------------------------------------------------*/
    static async getTextData(lbl, id) {

		const commonPg = new FSMCommonPage(this.page);

        return await commonPg.textData(lbl.toLowerCase(), id);
    }

    /*----------------------------------------------------------------------------------------------------
	* Objective : To verify and close action completed confirmation message (with message assertion)
	*----------------------------------------------------------------------------------------------------*/
    static async validateConfirmationMessage(message) {

        const commonPg = new FSMCommonPage(this.page);

        expect((await (await commonPg.cnfMsgActionCompleted()).innerText()).toLowerCase(),
            `Action completed message is not ${message}`
        ).toContain(message.toLowerCase());

        // Force close the confirmation message
        await (await commonPg.btnClose()).click({ force: true });

        log.info(`INFO : =========>>>>> Verified message : ${message} <<<<<=========`);
    }

    /*-----------------------------------------------------------------------
	 * Objective : To verify and close action completed confirmation message
	 *-----------------------------------------------------------------------*/
    static async validateConfirmationMessages() {

        const commonPg = new FSMCommonPage(this.page);

        await this.isElementPresent(await commonPg.cnfMsgActionCompleted());

        // Force close the confirmation message
        await (await commonPg.btnClose()).click({ force: true });

        log.info(`INFO : =========>>>>> Verified action completed confirmation message <<<<<=========`);
    }

    /*--------------------------------------------------------
	 * Objective : To verify the window header title
	 *--------------------------------------------------------*/
	static async verifyDlgTitle(headTitle) {

		const commonPg = new FSMCommonPage(this.page);

        await expect(async () => {

            expect(await (await (await commonPg.modalTitle()).first()).textContent(), `"Page title is not ${headTitle}`).toBe(headTitle);
        }).toPass({ timeout: 20000 });
	}

    /*--------------------------------------------------------
	 * Objective : To update default filter value in the grids
	 *--------------------------------------------------------*/

	static async updateDefaultFilter(id, columnName, value) {

		const commonPg = new FSMCommonPage(this.page);

		// Collapse toggle menu
		await this.collapseToggleMenu();

		// Confirm that the filter fields are enabled
		await this.enableSearchFilters(id);
		
		const filter = await commonPg.drpUpdateFilter(columnName, id);
		
		filter.click();
		await (await commonPg.gridFilterValues(value)).click();

		log.info(`INFO : =========>>>>> Selected ${value} from dropdown <<<<<=========`);
	}

    static async selectRequiredGridRow(id, ...parameters) {

        const commonPg = new FSMCommonPage(this.page);

        // Collapse toggle menu
        await this.collapseToggleMenu();

        const length = parameters.length/ 2;

        const columnNames = [];
        const values = [];
        const columnIDs = [];

        // Even indexes → column names
        for (let i = 0, j = 0; i < length; i++, j += 2) {
            columnNames[i] = parameters[j];
        }

        // Odd indexes → column values
        for (let i = 0, j = 1; i < length; i++, j += 2) {
            values[i] = parameters[j];
        }

        // Fetch column IDs dynamically
        for (let i = 0; i < length; i++) {
            columnIDs[i] = await (await commonPg.thColumn(columnNames[i], id)).getAttribute(ElementAttributes.ID);
        }

        let requiredRow = null;

        switch (length) {

            case 1:

                while (!(await this.isElementPresent(await commonPg.row(columnIDs[0], values[0])))) {

                    if (await this.isElementPresent(await commonPg.btnNextWithId(id))) {

                        const nextBtn = await (await commonPg.btnNextWithId(id)).getAttribute(ElementAttributes.CLASS);

                        if (!nextBtn.includes(Constants.IS_DISABLED)) {
                            await (await commonPg.btnNextWithId(id)).click();

                        } else {
                            break;
                        }
                    } else {
                        break;
                    }
                }

                requiredRow = await commonPg.row(columnIDs[0], values[0]);
                break;

            case 2:

                while (!(await this.isElementPresent(await commonPg.rowForTwoCols(columnIDs[0], values[0],columnIDs[1], values[1])))) {

                    if (await this.isElementPresent(await commonPg.btnNextWithId(id))) {

                        const nextBtn = await (await commonPg.btnNextWithId(id)).getAttribute(ElementAttributes.CLASS);

                        if (!nextBtn.includes(Constants.IS_DISABLED)) {
                            await (await commonPg.btnNextWithId(id)).click();
                        } else {
                            break;
                        }
                    } else {
                        break;
                    }
                }

                requiredRow = await commonPg.rowForTwoCols(columnIDs[0], values[0], columnIDs[1], values[1]);
                break;
        }

        // Select the row
        const rowNo = Number(await requiredRow.getAttribute(ElementAttributes.ARIA_ROWINDEX));

        const rowToSelect = await (await commonPg.selectRow(String(rowNo), id)).getAttribute(ElementAttributes.CLASS);

        if (!(rowToSelect.includes(Constants.IS_CHECKED))) {
            const box= await (await commonPg.selectRow(String(rowNo), id)).boundingBox();
            await this.page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
            // await (await commonPg.selectRow(String(rowNo), id)).click({ force: true });
        }

        log.info(`INFO : =========>>>>> Clicked on row ${rowNo} <<<<<=========`);

        return rowNo;
    }

    	/*-------------------------------------------------------------------------
	 * Objective : To click on toolbar icons and select option from  menu
	 * Example - Create --> Request New Vendor
	 * 
	 *  If there are multiple tables in active page, pass uniqueElementId 
	 * using FSMCommon.getTableID(table name) otherwise, if there is 
	 * single table in active page, pass uniqueElementId using FSMCommon.getPageID()
	 * 
	 * For iconName, Use FSMCommons constants
	 * For option, Use FSMCommons constants
	 *-------------------------------------------------------------------------*/
	static async toolbarIcon(uniqueElementId, iconName, ...option) {

		const commonPg = new FSMCommonPage(this.page);

		await this.toolbarIcons(uniqueElementId, iconName);
		
		for (let i = 0; i < option.length; i++) {

			await (await commonPg.actionMenuOptions(option[i])).click();
			
			log.info(`INFO : =========>>>>> Clicked on ${iconName} --> ${String(option)} <<<<<=========`);
		}
	}

    static async selectValueFromDropdown(dropdown, value) {

        const commonPg = new FSMCommonPage(this.page);

        if (!(((await dropdown.getAttribute(ElementAttributes.CLASS)).includes(Constants.IS_OPEN)))) {
            await dropdown.click();
        }

        await (await (await commonPg.dropdownValues(value)).first()).hover();
        await (await (await commonPg.dropdownValues(value)).first()).click();
        
        expect(await dropdown.textContent()).toContain(value);

        log.info(`INFO : =========>>>>> Selected ${value} from dropdown <<<<<=========`);
    }

    	
	/*----------------------------------------------------------
	 * Objective : To get textarea element
	 *----------------------------------------------------------*/
	static async getTextArea(lbl, id) {

		const commonPg = new FSMCommonPage(this.page);

		return await commonPg.textarea(lbl.toLowerCase(), id);
	}

    /*-------------------------------------------------------------------------------
	* Objective : To handle popupButtons
	*-------------------------------------------------------------------------------*/
	static async toHandleButtons(button) {
		
		const commonPg = new FSMCommonPage(this.page);
		
		await (await (await commonPg.popupButtons(button)).first()).click({ force: true });

		log.info(`INFO : =========>>>>> Selected ${button} from Popup <<<<<=========`);
	}

    static async clickBtnInUserAccount(button) {

        const commonPg = new FSMCommonPage(this.page);

        // Expand toggle menu
        await this.expandToggleMenu();

        // If My Print Files button
        if (button === FSMMenu.MY_PRINT_FILES) {

            await (await commonPg.userAccountBtns(FSMMenu.REPORT_CATALOG)).click();
            await FSMCommon.verifyPageTitle(FSMPageTitles.REPORT_CATALOG);
            await FSMCommon.selectHeaderTab(FSMTabs.PRINT_FILES);

        } else if (button === FSMMenu.MY_REPORTS) {

            await (await commonPg.userAccountBtns(FSMMenu.REPORT_CATALOG)).click();
            await FSMCommon.verifyPageTitle(FSMPageTitles.REPORT_CATALOG);
            await (await commonPg.onlyMyReports()).click();

        } else {

            if (
                button === FSMMenu.JOBS ||
                button === FSMMenu.ACTIONS ||
                button === FSMMenu.PERSONALIZATIONS
            ) {
                await (await commonPg.userAccountBtns(FSMMenu.MORE)).click();
            }

            await (await commonPg.userAccountBtns(button)).click();
        }

        log.info(`INFO : =========>>>>> Clicked on ${button} <<<<<=========`);
    }

    /*----------------------------------------------------------
	 * Objective : To get radio button element
	 *----------------------------------------------------------*/
	static async getRadioButton(lbl, id) {

		const commonPg = new FSMCommonPage(this.page);

		return await commonPg.radioButton(id, lbl.toLowerCase());
	}
	
    /*----------------------------------------------------------
	 * Objective : To get unlabeled textbox element
	 *----------------------------------------------------------*/
	static async getUnlabeledTextField(id) {

		const commonPg = new FSMCommonPage(this.page);

		return await (await commonPg.unlabeledTextField(id));
	}

    static async getRequiredValueFromTheGrid(id, columnName, rowNo) {

		const commonPg = new FSMCommonPage(this.page);

        // Collapse toggle menu
        await this.collapseToggleMenu();

		// Required column
		const columnID = await (await commonPg.thColumn(columnName, id)).getAttribute(ElementAttributes.ID);

		const reqValue = await (await commonPg.getCellValue(String(rowNo), columnID)).getAttribute(ElementAttributes.INNER_TEXT);

        log.info(`INFO : =========>>>>> Retreived ${reqValue} from row : ${rowNo} of column columnName <<<<<=========`);

        return reqValue;
    }

    static async actionsMenuOption(elementID, ...text) {

        const commonPg = new FSMCommonPage(this.page);

        try {
            await (await commonPg.actionMenuBtn(text)).click({force:true});

        } catch (exception) {

            await (await commonPg.btnAction(elementID)).click();

            for (let i = 0; i < text.length; i++) {

                 await (await commonPg.actionMenuOptions(text[i])).hover();
                 await (await commonPg.actionMenuOptions(text[i])).click();
            }
        }

        log.info(`INFO : =========>>>>> Selected ${text.toString()} from actions <<<<<=========`);
    }

    /*--------------------------------------------------------
	 * Objective : To get assigned employee name
	 *--------------------------------------------------------*/
	static async getAssignedEmployeeName() {

		const homepage = new Homepages(this.page);

		return (await (await homepage.userIconLn()).getAttribute(ElementAttributes.INNER_TEXT)).split("\\R")[1];
	}

    /*--------------------------------------------------------
	 * Objective : To get assigned company
	 *--------------------------------------------------------*/
    static async getCompany() {

		const username = loginCnt.USER_NAME;
		const company = username.substring(username.length() - 4);

        return company;
    }

    /*--------------------------------------------------------
	 * Objective : To get assigned company group
	 *--------------------------------------------------------*/
	static async getCompanyGroup() {

		const username = loginCnt.USER_NAME;
		const cmpGroup = username.substring(0, 4);

		return cmpGroup;
	}

    static async selectTabWithPartialText(tabName) {
        const commonPg = new FSMCommonPage(this.page);

        try {
            await (await commonPg.lnkTabsPartial(tabName)).hover();
            await (await commonPg.lnkTabsPartial(tabName)).click();
        } catch (error) {
            if (!(await (await commonPg.btnMoreHeaderTabs())
                .getAttribute(ElementAttributes.CLASS)
            ).includes(Constants.IS_OPEN)
            ) {
                await (await commonPg.btnMoreHeaderTabs()).click({ force: true });
            }

            await (await commonPg.lnkMoreTabs(tabName)).click();
        }

        await this.screenshot(`Clicked on ${tabName} tab`);

        log.info(`INFO : =========>>>>> Clicked on ${tabName} tab <<<<<=========`);
    }

    static async enterDataInGridCell(id, columnName, rowNo, ...valueToType) {

        const commonPg = new FSMCommonPage(this.page);

        // Collapse toggle menu
        await this.collapseToggleMenu();

        // Get required column ID
        const columnID = await (await commonPg
            .thColumn(columnName, id))
            .getAttribute(ElementAttributes.ID);

        // Click the cell
        await (await commonPg.gridCellClick(rowNo, columnID)).click();

        // Clear the cell
        await (await commonPg.gridCellType(rowNo, columnID)).fill('');

        // Click again to activate
        await (await commonPg.gridCellClick(rowNo, columnID)).click();

        // Type value
        await (await commonPg.gridCellType(rowNo, columnID)).type(valueToType.join(''));

        // Press TAB
        await this.page.keyboard.press('Tab');

        log.info(`INFO : =========>>>>> Entered ${valueToType} in row : ${rowNo} of column ${columnName} <<<<<=========`);
    }



}

export default FSMCommon;