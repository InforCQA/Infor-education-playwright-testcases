import { expect } from "allure-playwright";
import BaseClass, { log } from "../../testBase/BaseClass";
import FSMCommonPageWithOutFrame from "./FSMCommonPageWithOutFrame";
import Constants from "./Constants";

class FSMCommonWithoutIFrame extends BaseClass {

    /*------------------------------------------------------------------
	 * Objective : To click on toolbar icons
	 * if there are multiple tables in active page
	 * 		@param uniqueElementId = FSMCommon.getTableID(table name)
	 * else if there is single table in active page
	 * 		@param uniqueElementId = FSMCommon.getPageID()
	 * 
	 * @param iconName = Use FSMCOMMONS constants
	 *------------------------------------------------------------------*/
	static async toolbarIcons(uniqueElementId, iconName) {

		const commonPg = new FSMCommonPageWithOutFrame(this.page);

        await (await commonPg.toolbarIcons(iconName, uniqueElementId)).click();
		await (await commonPg.toolbarIcons(iconName, uniqueElementId)).click();

		log.info(`INFO : =========>>>>> Clicked on ${iconName} icon <<<<<=========`);
	}

    static async verifyPageTitle(pageTitle) {

        const commonPg = new FSMCommonPageWithOutFrame(this.page);

        expect(async () => {
            expect((await (await commonPg.pageTitle()).textContent()).toLowerCase(), `Page title is not ${pageTitle}`).toBe(pageTitle.toLowerCase());
        }).toPass({ timeout: 30000 });
    }

    
    static async getTextField(lbl, id) {

        const commonPg = new FSMCommonPageWithOutFrame(this.page);

		return await commonPg.textbox(lbl.toLowerCase(), id);
	}

    /*----------------------------------------------------------
	 * Objective : To get unlabeled textbox element
	 *----------------------------------------------------------*/
    static async getUnlabeledTextField(id) {

        const commonPg = new FSMCommonPageWithOutFrame(this.page);

        return await commonPg.unlabeledTextField(id);
    }

    	/*----------------------------------------------------------
	 * Objective : To get textarea element
	 *----------------------------------------------------------*/
	static async getTextArea(lbl, id) {

		const commonPg = new FSMCommonPageWithOutFrame(this.page);

		return await commonPg.textarea(lbl.toLowerCase(), id);
	}

    /*-----------------------------------------------------------------------
	 * Objective : To verify and close action completed confirmation message
	 *-----------------------------------------------------------------------*/
    static async validateConfirmationMessages() {

        const commonPg = new FSMCommonPageWithOutFrame(this.page);

        await this.isElementPresent(await commonPg.cnfMsgActionCompleted());

        // Force close the confirmation message
        await (await commonPg.btnClose()).click({ force: true });

        log.info(`INFO : =========>>>>> Verified action completed confirmation message <<<<<=========`);
    }

    /*-------------------------------------------------------------------------------
	 * Objective : To handle popupButtons
	 *-------------------------------------------------------------------------------*/
	static async toHandleButtons(buttonName) {

		const commonPg = new FSMCommonPageWithOutFrame(this.page);

		await (await commonPg.popupButtons(buttonName)).click({force: true});
		
		log.info(`INFO : =========>>>>> Selected ${buttonName} from Popup <<<<<=========`);
	}

    /*--------------------------------------------------------
    * Objective : To verify the window header title
    *--------------------------------------------------------*/
    static async verifyDlgTitle(headTitle) {

		const commonPg = new FSMCommonPageWithOutFrame(this.page);

        
        expect(await (await commonPg.modalTitle()).textContent(), `"Page title is not ${headTitle}`).toBe(headTitle);
    }

	/*--------------------------------------------------------
	 * Objective : To get Page ID based on page title
	 *--------------------------------------------------------*/
	static async getPageID() {

		const commonPg = new FSMCommonPageWithOutFrame(this.page);

		// Active page
		const pageID = await (await commonPg.pageTitle()).getAttribute(Constants.DATA_AUTOMATION_ID).replace(Constants.LM, "")
				.replace(Constants.TOOLBAR_TITLE, "");

		return pageID;
	}

	static async selectValueFromDropdown(dropdown, value) {

		const commonPg = new FSMCommonPageWithOutFrame(this.page);

		// Open dropdown if it is not already open
		if (!(await dropdown.getAttribute('class'))?.includes(Constants.IS_OPEN)) {
			await dropdown.click();
		}

		// Select the value
		await (await commonPg.dropdownValues(value)).click();

		// Verify selected value
		await expect(dropdown).toHaveText(value);

		log.info(`INFO : =========>>>>> Selected ${value} from dropdown <<<<<=========`);
	}

	/*----------------------------------------------------------
	 * Objective : To get dropdown element
	 *----------------------------------------------------------*/
	static async getDropdown(lbl, id) {

		const commonPg = new FSMCommonPageWithOutFrame(this.page);

		return await commonPg.dropdown(lbl.toLowerCase(), id);
	}

	
}

export default FSMCommonWithoutIFrame;