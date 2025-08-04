import { expect } from "@playwright/test";
import LNMenuActions_Id from "../constants/elementIds/LNMenuActions_Id";
import OrderIntakeWorkbench_Id from "../constants/elementIds/OrderIntakeWorkbench_Id";
import LNMenuActions_Lbl from "../constants/elementLbls/LNMenuActions_Lbl";
import OrderIntakeWorkbench_Lbl from "../constants/elementLbls/OrderIntakeWorkbench_Lbl";
import LNSessionCodes from "../constants/LNSessionCodes";
import LNSessionTabs from "../constants/LNSessionTabs";
import LNTabs from "../constants/LNTabs";
import LNCommon from "./LNCommon";
import LNCommons from "../constants/LNCommons";
import Commons from "../../commons/constants/Commons";
import LNCommonFunctions from "./LNCommonFunctions";
import LNPage from "../pages/LNPage";
import BaseClass from "../../testBase/BaseClass";

class LNProcurement extends BaseClass{
    /*-----------------------------------------------------------------------------------------------
	 * Objective: Create purchase order (by distribution center)
	 * 			  Review intercompany trade order - sales (by purchase office at distribution center)
	 * 			  Review intercompany trade order - purchase (by sales center)
	 * 			  Receive the purchase order (by your sales center)
	 * 			  Review the intercompany trade order transaction line (by distribution center)
	 * Workbook : LN Cloud: Configuring Multisite Environment
	 * Exercise : 3.3.1, 3.3.2, 3.3.3, 3.3.4, 3.3.5
	 *-----------------------------------------------------------------------------------------------*/
    static async createAPurchaseOrderForExternalMaterialDelivery(warehouseCnxt) {

		console.log("=========>>>>> Create purchase order (by distribution center) Started <<<<<=========");

		// Intializing the page
		const commonPg =  new LNPage(this.page);
		
		// Restarting LN application
		await LNCommon.LNRestart();
		
		// Navigating to Procurement --> Orders --> Order Intake Workbench
		await LNCommon.navigateToLNModule(LNSessionTabs.PROCUREMENT, LNSessionTabs.ORDERS,
				LNSessionTabs.ORDER_INTAKE_WORKBENCH);

		// Verifying the Session title
		await LNCommon.verifySessionTab(LNSessionTabs.PURCHASE_ORDER_INTAKE_WORKBENCH);

		await LNCommon.selectGridTab(LNTabs.PURCHASE_ORDERS, LNSessionCodes.PURCHASE_ORDER_INTAKE_WORKBENCH);
		await LNCommon.clickMainMenuItem(LNSessionCodes.PURCHASE_ORDERS_IN_PURCHASE_ORDER_INTAKE, LNMenuActions_Id.NEW);

		// Verifying the Session title
		await LNCommon.verifySessionTab(LNSessionTabs.PURCHASE_ORDER);

		// Verifying the Section
		expect(await this.isElementPresent(await commonPg.verifyHeader(
						OrderIntakeWorkbench_Lbl.BUY_FROM)), `${OrderIntakeWorkbench_Lbl.BUY_FROM} section is not found`).toBeTruthy();

		await (await (await LNCommon.getTextboxLookUpIcon(OrderIntakeWorkbench_Lbl.BUSINESS_PARTNER,
				OrderIntakeWorkbench_Id.BUSINESS_PARTNER, LNSessionCodes.PURCHASE_ORDER)).first()).click();

		// Verifying the Dialogbox title
		await LNCommon.verifyDialogBoxWindow(LNSessionTabs.BUY_FROM_BUSINESS_PARTNERS);

		await LNCommon.filterRequiredRecord(OrderIntakeWorkbench_Lbl.BUY_FROM_BUSINESS_PARTNER_ZOOM_GRID,
				OrderIntakeWorkbench_Id.BUY_FROM_BUSINESS_PARTNER_FST_SEG_ZOOM_GRID,
				LNSessionCodes.BUY_FROM_BUSINESS_PARTNERS, warehouseCnxt.buyFromBP[0]);
		await LNCommon.selectRequiredRecord(LNSessionCodes.BUY_FROM_BUSINESS_PARTNERS,
				OrderIntakeWorkbench_Lbl.BUY_FROM_BUSINESS_PARTNER_ZOOM_GRID,
				OrderIntakeWorkbench_Id.BUY_FROM_BUSINESS_PARTNER_FST_SEG_ZOOM_GRID, warehouseCnxt.buyFromBP[1]);
		await LNCommon.clickTextMenuItem(LNSessionCodes.BUY_FROM_BUSINESS_PARTNERS, LNMenuActions_Id.OK,
				LNMenuActions_Lbl.OK);

		// Verifying the Session title
		await LNCommon.verifySessionTab(LNSessionTabs.PURCHASE_ORDER);

		await this.page.waitForTimeout(1000);
		await this.page.keyboard.press('Tab');

		// Verifying the Populated fields
		await expect(async () => {

			expect(await (await LNCommon
				.getTextField(OrderIntakeWorkbench_Lbl.ADDRESS_IN_BUY_FROM,
					OrderIntakeWorkbench_Id.ADDRESS_IN_BUY_FROM, LNSessionCodes.PURCHASE_ORDER))
				.inputValue(), "The Buy from address field is empty").not.toBe('');

		}).toPass({ timeout: 10000 });

		expect(await (await (await LNCommon.getTextField(OrderIntakeWorkbench_Lbl.PURCHASE_OFFICE, OrderIntakeWorkbench_Id.PURCHASE_OFFICE,
						LNSessionCodes.PURCHASE_ORDER)).first()).inputValue(), `The Purchase Office field is empty`).not.toBe('');

		await LNCommon.clickMainMenuItem(LNSessionCodes.PURCHASE_ORDER, LNMenuActions_Id.SAVE);

		await LNCommon.selectGridTab(LNTabs.ORDER_LINES, LNSessionCodes.PURCHASE_ORDER);
		await LNCommon.clickMainMenuItem(LNSessionCodes.PURCHASE_ORDER_LINE, LNMenuActions_Id.NEW);

		// Verifying the Line
		expect(await (await commonPg.gridInputField(OrderIntakeWorkbench_Lbl.LINE_GRID,
						OrderIntakeWorkbench_Id.LINE_GRID, LNSessionCodes.PURCHASE_ORDER_LINE))
						.inputValue(), `The new line is not ${warehouseCnxt.orderLine[0]}`).toBe(warehouseCnxt.orderLine[0]);

		await this.page.waitForTimeout(1000);
		await this.page.keyboard.press('Tab');
		
		await (await LNCommon.getTextboxLookUpIconInGrid(OrderIntakeWorkbench_Lbl.SITE_GRID, OrderIntakeWorkbench_Id.SITE_GRID,
				LNSessionCodes.PURCHASE_ORDER_LINE)).click();

		// Verifying the Dialogbox title
		await LNCommon.verifyDialogBoxWindow(LNSessionTabs.SITES);
		
		await LNCommon.filterRequiredRecord(OrderIntakeWorkbench_Lbl.SITE_ZOOM_GRID,
				OrderIntakeWorkbench_Id.SITE_ZOOM_GRID, LNSessionCodes.SITES, warehouseCnxt.warehouses[1]);
		await LNCommon.selectRequiredRecord(LNSessionCodes.SITES, OrderIntakeWorkbench_Lbl.SITE_ZOOM_GRID,
				OrderIntakeWorkbench_Id.SITE_ZOOM_GRID, warehouseCnxt.warehouseDesc[1]);
		await LNCommon.clickTextMenuItem(LNSessionCodes.SITES, LNMenuActions_Id.OK, LNMenuActions_Lbl.OK);

		// Verifying the Session title
		await LNCommon.verifySessionTab(LNSessionTabs.PURCHASE_ORDER);
        
		await this.page.waitForTimeout(1000);
		await this.page.keyboard.press('Tab');
		
		await LNCommon.dataCellElement(await LNCommon.getDataCell(OrderIntakeWorkbench_Lbl.ITEM_GRID,
				OrderIntakeWorkbench_Id.ITEM_SEG_SEC_GRID, LNSessionCodes.PURCHASE_ORDER_LINE), 0,
				warehouseCnxt.items[1]);

		// Verifying the Item Description
		expect(await (await commonPg.gridLabelField(OrderIntakeWorkbench_Lbl.ITEM_GRID,
				OrderIntakeWorkbench_Id.ITEM_DESCRIPTION_GRID, LNSessionCodes.PURCHASE_ORDER_LINE))
				.innerText(), `The item description is empty`).not.toBe('');

		await LNCommon.clickMainMenuItem(LNSessionCodes.PURCHASE_ORDER, LNMenuActions_Id.SAVE);

		// Noting down the order number
		warehouseCnxt.purchaseOrderNum = await (await LNCommon.getTextField(OrderIntakeWorkbench_Lbl.ORDER,
				OrderIntakeWorkbench_Id.ORDER, LNSessionCodes.PURCHASE_ORDER)).inputValue();

		console.log(`=========>>>>> The purchase order number is ${warehouseCnxt.purchaseOrderNum}`);

		//screenshot("Create purchase order (by distribution center)");

		console.log(
				"=========>>>>> Create purchase order (by distribution center) completed sucessfully <<<<<=========");

		console.log(
				"=========>>>>> Review intercompany trade order - sales (by purchase office at distribution center) Started <<<<<=========");

		await LNCommon.selectRequiredRecord(LNSessionCodes.PURCHASE_ORDER_LINE, OrderIntakeWorkbench_Lbl.LINE_GRID,
				OrderIntakeWorkbench_Id.LINE_GRID, warehouseCnxt.orderLine[0]);
		await LNCommon.navigateToLNReferences(LNSessionCodes.PURCHASE_ORDER_LINE, LNMenuActions_Lbl.RELATED_ORDERS,
				LNMenuActions_Lbl.INTERCOMPANY_TRADE_ORDER_SALES);

		// Verifying the Session title
		await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_ORDER_SALES);

		// Verify the order field
		expect(await (await LNCommon
						.getTextField(OrderIntakeWorkbench_Lbl.ORDER_SEGMENT_TWO_IN_INTERCOMPANY_TRADE_ORDER_SALES,
								OrderIntakeWorkbench_Id.ORDER_SEGMENT_TWO_IN_INTERCOMPANY_TRADE_ORDER_SALES,
								LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES))
						.inputValue(), `Your intercompany trade number is not displayed`).not.toBe('');

		warehouseCnxt.intercompanyTradeNumSales = await (await LNCommon
				.getTextField(OrderIntakeWorkbench_Lbl.ORDER_SEGMENT_TWO_IN_INTERCOMPANY_TRADE_ORDER_SALES,
						OrderIntakeWorkbench_Id.ORDER_SEGMENT_TWO_IN_INTERCOMPANY_TRADE_ORDER_SALES,
						LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES))
				.inputValue();

		console.log(`=========>>>>> The Intercompany trade number for sales is ${warehouseCnxt.intercompanyTradeNumSales} + <<<<<=========`);

		await LNCommon.navigateToLNReferences(LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES,
				LNMenuActions_Lbl.INTERCOMPANY_TRADE_ORDER_DETAILS);

		// Verifying the Session title
		await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_ORDER_SALES);

		// Switching to Intercompany trade tab and verifying the values
		await LNCommon.selectHeaderTab(LNTabs.INTERCOMPANY_TRADE, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES_DETAIL);

		expect(await (await LNCommon
						.getTextField(OrderIntakeWorkbench_Lbl.FROM_ENTERPRISE_UNIT,
								OrderIntakeWorkbench_Id.FROM_ENTERPRISE_UNIT,
								LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES_DETAIL))
						.inputValue(),  `The value in From Enterprise Unit is not ${warehouseCnxt.enterpriseUnits[0]}`)
				.toBe(warehouseCnxt.enterpriseUnits[0]);

		expect(await (await LNCommon
						.getTextField(OrderIntakeWorkbench_Lbl.TO_ENTERPRISE_UNIT,
								OrderIntakeWorkbench_Id.TO_ENTERPRISE_UNIT,
								LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES_DETAIL))
						.inputValue(), `The value in To Enterprise Unit is not ${warehouseCnxt.enterpriseUnits[1]}`)
				.toBe(warehouseCnxt.enterpriseUnits[1]);

		// Switching to Project/Item tab and verifying the values
		await LNCommon.selectHeaderTab(LNTabs.PROJECT_ITEM, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES_DETAIL);

		expect(await (await (await LNCommon
						.getTextField(OrderIntakeWorkbench_Lbl.FROM_ITEM, OrderIntakeWorkbench_Id.FROM_ITEM_SEGMENT_TWO,
								LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES_DETAIL)).first())
						.inputValue(), `The value in From Item is not ${warehouseCnxt.items[1]}`).toBe(warehouseCnxt.items[1]);

		await expect(async () => {
			expect(await (await LNCommon
				.getTextField(OrderIntakeWorkbench_Lbl.TO_ITEM, OrderIntakeWorkbench_Id.TO_ITEM_SEGMENT_TWO,
					LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES_DETAIL))
				.inputValue(), `The value in To Item is not ${warehouseCnxt.items[1]}`).toBe(warehouseCnxt.items[1]);

		}).toPass({ timeout: 10000 });

		// Switching to Operational tab and verifying the values
		await LNCommon.selectHeaderTab(LNTabs.OPERATIONAL, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES_DETAIL);
        
		await expect(async () => {

			expect(await (await LNCommon
				.getTextField(OrderIntakeWorkbench_Lbl.SHIP_FROM_BUSINESS_PARTNER_IN_INTERCOMPANY,
					OrderIntakeWorkbench_Id.SHIP_FROM_BUSINESS_PARTNER_IN_INTERCOMPANY,
					LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES_DETAIL))
				.inputValue(), `The value in Business Partner field of Ship from section is not ${warehouseCnxt.buyFromBP[1]}`)
				.toBe(warehouseCnxt.buyFromBP[1]);

		}).toPass({ timeout: 10000 });

		// Switching to Control tab and verifying the values
		await LNCommon.selectHeaderTab(LNTabs.CONTROL, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES_DETAIL);
        
		await expect(async () => {

			expect(await (await LNCommon
				.getTextField(OrderIntakeWorkbench_Lbl.USER, OrderIntakeWorkbench_Id.USER,
					LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES_DETAIL))
				.inputValue(), `The value in User is not`)
				.toBe("3270st02");

		}).toPass({ timeout: 10000 });

		// Switching to Tabs and verifying the values
		const tabs = [ LNTabs.AGREEMENT, LNTabs.SELLING_INFORMATION, LNTabs.TAX, LNTabs.PRICING,
				LNTabs.HOURS_EXPENSES, LNTabs.FREIGHT, LNTabs.FINANCIAL ];
				
		for (let i = 0; i < tabs.length; i++) {
			
            await LNCommon.selectHeaderTab(tabs[i], LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES_DETAIL);

			//screenshot(tabs[i] + " Tab details");
		}

		//screenshot("Review intercompany trade order - sales (by purchase office at distribution center)");

		await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES_DETAIL,
				LNMenuActions_Id.SAVE_AND_CLOSE);
		await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES, LNMenuActions_Id.SAVE_AND_CLOSE);

		// Verifying the Session title
		await LNCommon.verifySessionTab(LNSessionTabs.PURCHASE_ORDER);

		await LNCommon.collapseLNModule(LNSessionTabs.PROCUREMENT);

		console.log(
				"=========>>>>> Review intercompany trade order - sales (by purchase office at distribution center) Completed <<<<<=========");

		/*-------------------------------------------------------------------------------------
		 * Objective : Calling the function as its dependant on the 2 methods above
		 * Exercises : 3.3.3
		 * ------------------------------------------------------------------------------------*/
		await LNCommonFunctions.reviewIntercompanyTradeOrderPurchaseBySalesCenter(warehouseCnxt);

		console.log("=========>>>>> Receive the purchase order (by your sales center) started <<<<<=========");

		await LNCommon.selectRequiredRecord(LNSessionCodes.PURCHASE_ORDER_LINE, OrderIntakeWorkbench_Lbl.LINE_GRID,
				OrderIntakeWorkbench_Id.LINE_GRID, warehouseCnxt.orderLine[0]);
		await LNCommon.clickTextMenuItem(LNSessionCodes.PURCHASE_ORDER_LINE, LNMenuActions_Id.APPROVE_LABEL,
				LNMenuActions_Lbl.APPROVE);
	

		//screenshot("Receive the purchase order (by your sales center)");

		// Verifying the Status is closed
		await LNCommon.verifyValueWithLabel(OrderIntakeWorkbench_Lbl.STATUS, LNSessionCodes.PURCHASE_ORDER, LNCommons.CLOSED);

		console.log(
				"=========>>>>> Receive the purchase order (by your sales center) completed sucessfully <<<<<=========");

		console.log(
				"=========>>>>> Review the intercompany trade order transaction line (by distribution center) started <<<<<=========");

		await LNCommon.selectRequiredRecord(LNSessionCodes.PURCHASE_ORDER_LINE, OrderIntakeWorkbench_Lbl.LINE_GRID, OrderIntakeWorkbench_Id.LINE_GRID,
				warehouseCnxt.orderLine[0]);
		await LNCommon.navigateToLNReferences(LNSessionCodes.PURCHASE_ORDER_LINE, LNMenuActions_Lbl.RELATED_ORDERS,
				LNMenuActions_Lbl.INTERCOMPANY_TRADE_ORDER_SALES);

		// Verifying the Session title
		await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_ORDER_SALES);

		await LNCommon.selectGridTab(LNTabs.TRANSACTION_LINES, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES);

		// Verifying a Transaction Line in Transaction Lines tab
		expect(await this.isElementPresent(await commonPg.gridCell(
						LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_SALES_WORKBENCH,
						OrderIntakeWorkbench_Id.TRANSACTION_LINE_GRID)), "The Transaction line is missing in transaction lines tab").toBeTruthy();

		await LNCommon.filterRequiredRecord(OrderIntakeWorkbench_Lbl.TRANSACTION_LINE_GRID,
				OrderIntakeWorkbench_Id.TRANSACTION_LINE_GRID,
				LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_SALES_WORKBENCH, warehouseCnxt.transactionLine);
		await LNCommon.drilldownRequiredRecord(LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_SALES_WORKBENCH,
				LNCommons.FIRST_RECORD);

		// Verifying the Session title
		await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_ORDER_TRANSACTION_LINE_SALES);

		await LNCommon.selectHeaderTab(LNTabs.SALES_BUSINESS_OBJECT,
				LNSessionCodes.INTERCOMPANY_TRADE_ORDER_TRANSACTION_LINE_SALES);

		// Verifying the Data in Transaction line
		await expect(async () => {

			expect(await (await LNCommon
				.getTextField(OrderIntakeWorkbench_Lbl.COMPANY, OrderIntakeWorkbench_Id.COMPANY,
					LNSessionCodes.INTERCOMPANY_TRADE_ORDER_TRANSACTION_LINE_SALES))
				.inputValue(), `The Order is not`)
				.toBe("3270");

		}).toPass({ timeout: 10000 });

		await LNCommon.selectGridTab(LNTabs.COS, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_TRANSACTION_LINE_SALES);

		// Verifying the Material costs and Inventory/Warehouse surcharges
		expect(await (await commonPg.gridLabelField(OrderIntakeWorkbench_Lbl.COST_COMPONENT_GRID,
						OrderIntakeWorkbench_Id.COST_COMPONENT_GRID,
						LNSessionCodes.COS_IN_INTERCOMPANY_TRADE_ORDER_TRANSACTION_LINE_SALES))
						.innerText(), "The Cost component line is missing").not.toBe('');

		//screenshot("Review the intercompany trade order transaction line (by distribution center)");

		await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_ORDER_TRANSACTION_LINE_SALES,
			LNMenuActions_Id.SAVE_AND_CLOSE);
		await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES, LNMenuActions_Id.SAVE_AND_CLOSE);
		await LNCommon.clickMainMenuItem(LNSessionCodes.PURCHASE_ORDER, LNMenuActions_Id.SAVE_AND_CLOSE);
		await LNCommon.clickMainMenuItem(LNSessionCodes.PURCHASE_ORDER_INTAKE_WORKBENCH, LNMenuActions_Id.SAVE_AND_CLOSE);

		// Close LN Module
		await LNCommon.collapseLNModule(LNSessionTabs.PROCUREMENT);

		console.log(
				"=========>>>>> Review the intercompany trade order transaction line (by distribution center) completed sucessfully <<<<<=========");
	
    }

}

export default LNProcurement;