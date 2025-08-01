import ElementAttributes from "../../commons/constants/ElementAttributes";
import BaseClass from "../../testBase/BaseClass";
import LNMenuActions_Id from "../constants/elementIds/LNMenuActions_Id";
import PurchaseDashboard_Id from "../constants/elementIds/PurchaseDashboard_Id";
import PurchaseWorkbench_Id from "../constants/elementIds/PurchaseWorkbench_Id";
import SalesDashboard_Id from "../constants/elementIds/SalesDashboard_Id";
import SalesWorkbench_Id from "../constants/elementIds/SalesWorkbench_Id";
import LNMenuActions_Lbl from "../constants/elementLbls/LNMenuActions_Lbl";
import PurchaseDashboard_Lbl from "../constants/elementLbls/PurchaseDashboard_Lbl";
import PurchaseWorkbench_Lbl from "../constants/elementLbls/PurchaseWorkbench_Lbl";
import SalesDashboard_Lbl from "../constants/elementLbls/SalesDashboard_Lbl";
import SalesWorkbench_Lbl from "../constants/elementLbls/SalesWorkbench_Lbl";
import LNCommons from "../constants/LNCommons";
import LNPopupMsg from "../constants/LNPopupMsg";
import LNSessionCodes from "../constants/LNSessionCodes";
import LNSessionTabs from "../constants/LNSessionTabs";
import LNTabs from "../constants/LNTabs";
import LNPage from "../pages/LNPage";
import LNCommon from "./LNCommon";
import LNSessionTabActions from "./LNSessionTabActions";
import { expect } from "@playwright/test";



class LNCommonFunctions extends BaseClass{


     static async invoiceIntercompanyTradeOrderTransactionLineByTheDistributionCenter(enterpriseUnits, intercompanyTradeNum, flag) {

		// Initialising page elements
		const commonPg = new LNPage(this.page);

		console.log(
				"=========>>>>> Invoice intercompany trade order transaction line (by the distribution center) started <<<<<=========");

		// Navigating to Common --> Intercompany Trade --> Sales Workbench
		await LNCommon.navigateToLNModule(LNSessionTabs.COMMON, LNSessionTabs.INTERCOMPANY_TRADE,
				LNSessionTabs.SALES_WORKBENCH);

		// Verify Session Tab
		await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_SALES_WORKBENCH);

		const sections = [ SalesWorkbench_Lbl.FINANCIAL_ENTITY, SalesWorkbench_Lbl.INTERCOMPANY_CUSTOMER];
		const euLbl = [ SalesWorkbench_Lbl.ENTERPRISE_UNIT_FINANCIAL_ENTITY,
				SalesWorkbench_Lbl.ENTERPRISE_UNIT_INTERCOMPANY_CUSTOMER ];
		const euId = [ SalesWorkbench_Id.ENTERPRISE_UNIT_FINANCIAL_ENTITY,
				SalesWorkbench_Id.ENTERPRISE_UNIT_INTERCOMPANY_CUSTOMER ];

		for (let i = 0; i < sections.length; i++) {
			// Verifying the sections
			expect(await this.isElementPresent(await commonPg.verifyHeader(sections[i])), `${sections[i]} section is not found`).toBeTruthy();
           
			await (await LNCommon.getTextboxLookUpIcon(euLbl[i], euId[i], LNSessionCodes.INTERCOMPANY_TRADE_SALES_WORKBENCH)).hover();
			await (await LNCommon.getTextboxLookUpIcon(euLbl[i], euId[i], LNSessionCodes.INTERCOMPANY_TRADE_SALES_WORKBENCH)).click();

			// Verifying the Dialogbox title
			await LNCommon.verifyDialogBoxWindow(LNSessionTabs.ENTERPRISE_UNITS);

			await LNCommon.filterRequiredRecord(SalesWorkbench_Lbl.ENTERPRISE_UNIT_GRID,
					SalesWorkbench_Id.ENTERPRISE_UNIT_GRID, LNSessionCodes.ENTERPRISE_UNITS, enterpriseUnits[i]);
			await LNCommon.selectRequiredRecord(LNSessionCodes.ENTERPRISE_UNITS, SalesWorkbench_Lbl.ENTERPRISE_UNIT_GRID,
					SalesWorkbench_Id.ENTERPRISE_UNIT_GRID, enterpriseUnits[i]);
			await LNCommon.clickTextMenuItem(LNSessionCodes.ENTERPRISE_UNITS, LNMenuActions_Id.OK, LNMenuActions_Lbl.OK);

			// Verify Session Tab
			await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_SALES_WORKBENCH);
		}

		if (flag == 1) {
			await LNCommon.selectHeaderTab(LNTabs.ADDITIONAL, LNSessionCodes.INTERCOMPANY_TRADE_SALES_WORKBENCH);
			await (await commonPg.statFieldButton(LNSessionCodes.INTERCOMPANY_TRADE_SALES_WORKBENCH,
					SalesWorkbench_Lbl.INTERNAL_MATERIAL_DELIVERY)).click();
			
		}

		await LNCommon.selectGridTab(LNTabs.TRANSACTION_LINES, LNSessionCodes.INTERCOMPANY_TRADE_SALES_WORKBENCH);

		if (flag == 0) {
			LNCommon.clickAndSelectDropdownFieldGridFilter(SalesWorkbench_Id.STATUS_GRID_DRP, LNCommons.RELEASED,
					SalesWorkbench_Lbl.STATUS_GRID_DRP,
					LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_SALES_WORKBENCH);
		}

		if (flag == 1) {
			LNCommon.updateDefaultFilter(SalesWorkbench_Id.ORDER_IN_TRANSACTION_LINES_SEGEMNT_TWO_GRID,
					LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_SALES_WORKBENCH, LNCommons.CONTAINS);
			LNCommon.filterRequiredRecord(SalesWorkbench_Lbl.ORDER_IN_TRANSACTION_LINES_GRID,
					SalesWorkbench_Id.ORDER_IN_TRANSACTION_LINES_SEGEMNT_TWO_GRID,
					LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_SALES_WORKBENCH,
					intercompanyTradeNum.substring(intercompanyTradeNum.length - 2));
			await this.page.waitForTimeout(2000);
		}

		// Fetching the row number to Drill down the record

		let rowNum = await LNCommon.selectRequiredRecord(
				LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_SALES_WORKBENCH,
				SalesWorkbench_Lbl.ORDER_IN_TRANSACTION_LINES_GRID,
				SalesWorkbench_Id.ORDER_IN_TRANSACTION_LINES_SEGEMNT_TWO_GRID, intercompanyTradeNum);

		await LNCommon.drilldownRequiredRecord(LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_SALES_WORKBENCH,
				String(rowNum));

		// Verify Session Tab
		await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_ORDER_TRANSACTION_LINE_SALES);

		await LNCommon.selectGridTab(LNTabs.COS, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_TRANSACTION_LINE_SALES);

		// Verifying the Material costs and Inventory/Warehouse surcharges
		expect(await (await(await commonPg.gridLabelField(SalesWorkbench_Lbl.COST_OF_SALES_GRID,
						SalesWorkbench_Id.COST_OF_SALES_GRID,
						LNSessionCodes.COS_IN_INTERCOMPANY_TRADE_ORDER_TRANSACTION_LINE_SALES)).first())
						.innerText(), "The Material costs and Inventory/Warehouse surcharges are not displayed").not.toBe('');

		await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_ORDER_TRANSACTION_LINE_SALES,
				LNMenuActions_Id.SAVE_AND_CLOSE);

		// Verify Session Tab
		await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_SALES_WORKBENCH);

		await LNCommon.selectGridTab(LNTabs.ORDERS, LNSessionCodes.INTERCOMPANY_TRADE_SALES_WORKBENCH);

		// Adjusting the Filter option to Contains
		await LNCommon.updateDefaultFilter(SalesWorkbench_Id.ORDER_IN_ORDERS_SEGMENT_TWO_GRID,
				LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_SALES, LNCommons.CONTAINS);

		const tradeNum = await intercompanyTradeNum.substring(intercompanyTradeNum.length - 2);
		await LNCommon.filterRequiredRecord(SalesWorkbench_Lbl.ORDER_IN_ORDERS_GRID,
				SalesWorkbench_Id.ORDER_IN_ORDERS_SEGMENT_TWO_GRID,
				LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_SALES, tradeNum);
		await LNCommon.selectRequiredRecord(LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_SALES,
				SalesWorkbench_Lbl.ORDER_IN_ORDERS_GRID, SalesWorkbench_Id.ORDER_IN_ORDERS_SEGMENT_TWO_GRID,
				intercompanyTradeNum);
		await LNCommon.navigateToLNReferences(LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_SALES,
				LNMenuActions_Lbl.SALES_INVOICE_INFORMATION);

		// Verifying the Session title
		await LNCommon.verifySessionTab(LNSessionTabs.INVOICING_360);

		await LNCommon.selectGridTab(LNTabs.BILLABLE_LINES, LNSessionCodes.INVOICING_360);
		await LNCommon.selectRequiredRecord(LNSessionCodes.BILLABLE_LINES, SalesWorkbench_Lbl.SOURCE_DOCUMENT_GRID,
				SalesWorkbench_Id.SOURCE_DOCUMENT_GRID, intercompanyTradeNum);
		await LNCommon.clickTextMenuItem(LNSessionCodes.BILLABLE_LINES, LNMenuActions_Id.CREATE_INVOICE,
				LNMenuActions_Lbl.CREATE_INVOICE_BILLABLE_LINES);
		await LNCommon.validateMessageAndHandlePopUp(LNPopupMsg.INVOICES_WILL_BE_CREATED_AND_POSTED, LNCommons.YES);
		

		// Taking a screenshot of Posting Batches Created Report to verify the details
		//screenshot("Posting Batches Created Report");
		await LNSessionTabActions.closeTab(LNSessionTabs.POSTING_BATCHES_CREATED);
		await LNCommon.validateMessageAndHandlePopUp(LNPopupMsg.BILLABLE_LINES_OK_POPUP, LNCommons.OK);

		// Verifying the Session title
		await LNCommon.verifySessionTab(LNSessionTabs.INVOICING_360);

		// Taking a screenshot of Invoice Report to verify the details
		await (await commonPg.currentTab(LNSessionTabs.INVOICE)).click();
		// pause(5);
		// screenshot("Invoice Report");

		await LNSessionTabActions.closeTab(LNSessionTabs.INVOICE);

		// Verifying the Session title
		await LNCommon.verifySessionTab(LNSessionTabs.INVOICING_360);

		// screenshot("Invoice intercompany trade order transaction line (by the distribution center)");

		await LNCommon.clickMainMenuItem(LNSessionCodes.INVOICING_360, LNMenuActions_Id.SAVE_AND_CLOSE);
		await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_SALES_WORKBENCH, LNMenuActions_Id.SAVE_AND_CLOSE);

		// Close LN Module
		await LNCommon.collapseLNModule(LNSessionTabs.COMMON);

		console.log(
				"=========>>>>> Invoice intercompany trade order transaction line (by the distribution center) completed sucessfully <<<<<=========");
	}

    static async createIntercompanyTradePurchaseInvoiceByTheSalesCenter(intercompanyTradeNum, toEnterpriseUnit, flag) {

		// Initialising page elements
		const  commonPg = new LNPage(this.page);

		console.log(
				"=========>>>>> Create intercompany trade purchase invoice (by the sales center) started <<<<<=========");

		// Navigating to Common --> Intercompany Trade --> Purchase Workbench
		await LNCommon.navigateToLNModule(LNSessionTabs.COMMON, LNSessionTabs.INTERCOMPANY_TRADE,
				LNSessionTabs.PURCHASE_WORKBENCH);

		// Verify Session Tab
		await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH);

		if (flag == 0) {
			// Verifying the Clear Additional Filter button is enabled and Clicking
			if (!await (await commonPg.textMenuWithoutLabel(LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH,
					LNMenuActions_Id.CLEAR_ADDITIONAL_FILTER)).getAttribute(ElementAttributes.CLASS)
					.includes(LNCommons.DISABLED)) {

				await LNCommon.clickTextMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH,
						LNMenuActions_Id.CLEAR_ADDITIONAL_FILTER, LNMenuActions_Lbl.CLEAR_ADDITIONAL_FILTER);
			}
		}

		if (flag == 1 || flag == 2) {
			// Clearing Enterprise Unit fields
			const euLbl = [ PurchaseWorkbench_Lbl.ENTERPRISE_UNIT_FINANCIAL_ENTITY,
					PurchaseWorkbench_Lbl.ENTERPRISE_UNIT_INTERCOMPANY_CUSTOMER ];
			const euId = [ PurchaseWorkbench_Id.ENTERPRISE_UNIT_FINANCIAL_ENTITY,
					PurchaseWorkbench_Id.ENTERPRISE_UNIT_INTERCOMPANY_CUSTOMER ];

			for (let i = 0; i < euLbl.length; i++) {
				await (await (await LNCommon.getTextField(euLbl[i], euId[i], LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH)).first()).clear();
			}
			await LNCommon.selectHeaderTab(LNTabs.ADDITIONAL, LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH);
		}

		// To Verify and Enable the Internal material delivery filter
		if (flag == 1) {
			await expect(await commonPg.statFieldButton(LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH,
					PurchaseWorkbench_Lbl.INTERNAL_MATERIAL_DELIVERY)).toContainClass(LNCommons.STATFIELD);

			if (!await (await (await commonPg.statFieldButton(LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH,
					PurchaseWorkbench_Lbl.INTERNAL_MATERIAL_DELIVERY)).getAttribute(ElementAttributes.CLASS))
					?.includes(LNCommons.STATFIELD_SELECTED)) {
				await (await commonPg.statFieldButton(LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH,
						PurchaseWorkbench_Lbl.INTERNAL_MATERIAL_DELIVERY)).click();
				
			}
		}

		// To Verify and Enable the External material delivery purchase filter
		if (flag == 2) {
			await expect(await commonPg.statFieldButton(LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH,
				PurchaseWorkbench_Lbl.EXTERNAL_MATERIAL_DELIVERY_PURCHASE)).toContainClass(LNCommons.STATFIELD);
			if (!await (await (await commonPg.statFieldButton(LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH,
				PurchaseWorkbench_Lbl.EXTERNAL_MATERIAL_DELIVERY_PURCHASE)).getAttribute(ElementAttributes.CLASS))
				.includes(LNCommons.STATFIELD_SELECTED)) {
				await (await commonPg.statFieldButton(LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH,
					PurchaseWorkbench_Lbl.EXTERNAL_MATERIAL_DELIVERY_PURCHASE)).click();
			}
		}

		await LNCommon.selectGridTab(LNTabs.TRANSACTION_LINES, LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH);

		if (flag == 0) {
			// Adjusting the Filter option to Contains
			await LNCommon.updateDefaultFilter(PurchaseWorkbench_Id.ORDER_IN_TRANSACTION_LINES_SEGEMNT_TWO_GRID,
					LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_PURCHASE_WORKBENCH, LNCommons.CONTAINS);

			await LNCommon.filterRequiredRecord(PurchaseWorkbench_Lbl.ORDER_IN_TRANSACTION_LINES_GRID,
					PurchaseWorkbench_Id.ORDER_IN_TRANSACTION_LINES_SEGEMNT_TWO_GRID,
					LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_PURCHASE_WORKBENCH,
					intercompanyTradeNum.substring(intercompanyTradeNum.length - 2));
		}

		if (flag == 1 || flag == 2) {
			await LNCommon.clickAndSelectDropdownFieldGridFilter(PurchaseWorkbench_Id.STATUS_IN_TRANSACTION_LINES_DRP_GRID,
					LNCommons.RELEASED, PurchaseWorkbench_Lbl.STATUS_IN_TRANSACTION_LINES_DRP_GRID,
					LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_PURCHASE_WORKBENCH);
		}

		if (flag == 2) {
			await LNCommon.filterRequiredRecord(PurchaseWorkbench_Lbl.TO_ENTERPRISE_UNIT_GRID,
					PurchaseWorkbench_Id.TO_ENTERPRISE_UNIT_GRID,
					LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_PURCHASE_WORKBENCH, toEnterpriseUnit);
		}

		await LNCommon.selectRequiredRecord(LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_PURCHASE_WORKBENCH,
				PurchaseWorkbench_Lbl.ORDER_IN_TRANSACTION_LINES_GRID,
				PurchaseWorkbench_Id.ORDER_IN_TRANSACTION_LINES_SEGEMNT_TWO_GRID, intercompanyTradeNum);
		await LNCommon.navigateToLNActions(LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_PURCHASE_WORKBENCH,
				LNMenuActions_Lbl.GENERATE_PURCHASE_INVOICE);

		// Verify Session Tab
		await LNCommon.verifySessionTab(LNSessionTabs.GENERATE_INTERCOMPANY_TRADE_PURCHASE_INVOICES);

		await LNCommon.clickTextMenuItem(LNSessionCodes.GENERATE_INTERCOMPANY_TRADE_PURCHASE_INVOICES,
				LNMenuActions_Id.GENERATES, LNMenuActions_Lbl.GENERATE);

		// Handling Device as it may open multiple times as per workbook
		do {
			await this.page.waitForLoadState('domcontentloaded');
			await LNCommon.handleDevice();
		} while (await this.isElementPresent(await commonPg.display()));

		// Verifying the Session title, Report and closing it
		await LNCommon.verifySessionTab(LNSessionTabs.PROCESS_REPORT);
		//screenshot("Process Report");
		await LNSessionTabActions.closeTab(LNSessionTabs.PROCESS_REPORT);

		await LNCommon.clickTextMenuItem(LNSessionCodes.GENERATE_INTERCOMPANY_TRADE_PURCHASE_INVOICES, LNMenuActions_Id.CLOSE,
				LNMenuActions_Lbl.CLOSE);
		
		// Verifying the Session title, Report and closing it
		await LNCommon.verifySessionTab(LNSessionTabs.INTERNAL_INVOICE_DETAILED);
		//screenshot("Internal Invoice (Detailed) Report");
		await LNSessionTabActions.closeTab(LNSessionTabs.INTERNAL_INVOICE_DETAILED);

		//screenshot("Create intercompany trade purchase invoice (by the sales center)");

		await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH,
				LNMenuActions_Id.SAVE_AND_CLOSE);

		// Close LN Module
		await LNCommon.collapseLNModule(LNSessionTabs.COMMON);

		console.log(
				"=========>>>>> Create intercompany trade purchase invoice (by the sales center) completed sucessfully <<<<<=========");
	}

	static async invoiceIntercompanyTradeOrderTransactionLineByPurchaseOfficeOfDistributionCenter(warehouseCnxt) {

		// Initialising page elements
		const commonPg = new LNPage(this.page);

		console.log(
				"=========>>>>> Invoice intercompany trade order transaction line (by purchase office of distribution center) started <<<<<=========");

		// Navigating to Common --> Intercompany Trade --> Sales Workbench
		await LNCommon.navigateToLNModule(LNSessionTabs.COMMON, LNSessionTabs.INTERCOMPANY_TRADE,
				LNSessionTabs.SALES_WORKBENCH);

		// Verify Session Tab
		await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_SALES_WORKBENCH);

		await LNCommon.selectHeaderTab(LNTabs.GENERAL, LNSessionCodes.INTERCOMPANY_TRADE_SALES_WORKBENCH);

		// Clearing Enterprise Unit fields
		const euLbl = [ SalesWorkbench_Lbl.ENTERPRISE_UNIT_FINANCIAL_ENTITY,
				SalesWorkbench_Lbl.ENTERPRISE_UNIT_FINANCIAL_ENTITY ];
		const euId = [ SalesWorkbench_Id.ENTERPRISE_UNIT_INTERCOMPANY_CUSTOMER,
				SalesWorkbench_Id.ENTERPRISE_UNIT_INTERCOMPANY_CUSTOMER ];

		for (let i = 0; i < euLbl.length; i++) {
			await (await (await LNCommon.getTextField(euLbl[i], euId[i], LNSessionCodes.INTERCOMPANY_TRADE_SALES_WORKBENCH)).first()).clear();
			
		}

		await LNCommon.selectHeaderTab(LNTabs.ADDITIONAL, LNSessionCodes.INTERCOMPANY_TRADE_SALES_WORKBENCH);

		// Verifying and selecting the filter if already not selected
		await expect(await commonPg.statFieldButton(LNSessionCodes.INTERCOMPANY_TRADE_SALES_WORKBENCH,
			PurchaseWorkbench_Lbl.EXTERNAL_MATERIAL_DELIVERY_PURCHASE)).toContainClass(LNCommons.STATFIELD);
		if (!(await (await (await commonPg.statFieldButton(LNSessionCodes.INTERCOMPANY_TRADE_SALES_WORKBENCH,
			SalesWorkbench_Lbl.EXTERNAL_MATERIAL_DELIVERY_PURCHASE)).getAttribute(ElementAttributes.CLASS))
			.includes(LNCommons.STATFIELD_SELECTED))) {
			await (await commonPg.statFieldButton(LNSessionCodes.INTERCOMPANY_TRADE_SALES_WORKBENCH,
				SalesWorkbench_Lbl.EXTERNAL_MATERIAL_DELIVERY_PURCHASE)).click();

		}

		await LNCommon.selectGridTab(LNTabs.TRANSACTION_LINES, LNSessionCodes.INTERCOMPANY_TRADE_SALES_WORKBENCH);
		await LNCommon.clickAndSelectDropdownFieldGridFilter(SalesWorkbench_Id.STATUS_GRID_DRP, LNCommons.RELEASED,
				SalesWorkbench_Lbl.STATUS_GRID_DRP,
				LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_SALES_WORKBENCH);

		// Fetching the row number to Drill down the record
		const rowNum = await LNCommon.selectRequiredRecord(
				LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_SALES_WORKBENCH,
				SalesWorkbench_Lbl.ORDER_IN_TRANSACTION_LINES_GRID,
				SalesWorkbench_Id.ORDER_IN_TRANSACTION_LINES_SEGEMNT_TWO_GRID, warehouseCnxt.intercompanyTradeNumSales);
		
		await LNCommon.drilldownRequiredRecord(LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_SALES_WORKBENCH,
				String(rowNum));

		// Verify Session Tab
		await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_ORDER_TRANSACTION_LINE_SALES);

		await LNCommon.selectHeaderTab(LNTabs.TRANSACTION_LINE,
				LNSessionCodes.INTERCOMPANY_TRADE_ORDER_TRANSACTION_LINE_SALES);

		// Verifying the Details in Transaction Line tab
		expect(await this.isElementPresent(await commonPg.verifyHeader(SalesWorkbench_Lbl.GENERAL), `${SalesWorkbench_Lbl.GENERAL} section is not found`)).toBeTruthy();

		expect(await this.isElementPresent(await commonPg.verifyHeader(
						SalesWorkbench_Lbl.OPERATIONAL_DATA)), `${SalesWorkbench_Lbl.OPERATIONAL_DATA} section is not found`).toBeTruthy();

		await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_ORDER_TRANSACTION_LINE_SALES,
				LNMenuActions_Id.SAVE_AND_EXIT);

		// Verify Session Tab
		await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_SALES_WORKBENCH);

		await LNCommon.selectGridTab(LNTabs.ORDERS, LNSessionCodes.INTERCOMPANY_TRADE_SALES_WORKBENCH);

		// Adjusting the Filter option to Contains
		await LNCommon.updateDefaultFilter(SalesWorkbench_Id.ORDER_IN_ORDERS_SEGMENT_TWO_GRID,
				LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_SALES, LNCommons.CONTAINS);

		const tradeNum = warehouseCnxt.intercompanyTradeNumSales
				.substring(warehouseCnxt.intercompanyTradeNumSales.length - 2);

		await LNCommon.filterRequiredRecord(SalesWorkbench_Lbl.ORDER_IN_ORDERS_GRID,
				SalesWorkbench_Id.ORDER_IN_ORDERS_SEGMENT_TWO_GRID,
				LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_SALES, tradeNum);
		await LNCommon.drilldownRequiredRecord(LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_SALES,
				LNCommons.FIRST_RECORD);

		// Verifying the Session title
		await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_ORDER_SALES);

		await LNCommon.filterRequiredRecord(SalesWorkbench_Lbl.TRANSACTION_LINE_GRID, SalesWorkbench_Id.TRANSACTION_LINE_GRID,
				LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_SALES_WORKBENCH, warehouseCnxt.transactionLine);
		await LNCommon.drilldownRequiredRecord(LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_SALES_WORKBENCH,
				LNCommons.FIRST_RECORD);

		// Verify Session Tab
		await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_ORDER_TRANSACTION_LINE_SALES);

		await LNCommon.selectGridTab(LNTabs.COS, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_TRANSACTION_LINE_SALES);

		// Verifying the Material costs and Inventory/Warehouse surcharges
		expect(await (await commonPg.gridLabelField(SalesWorkbench_Lbl.COST_OF_SALES_GRID,
						SalesWorkbench_Id.COST_OF_SALES_GRID,
						LNSessionCodes.COS_IN_INTERCOMPANY_TRADE_ORDER_TRANSACTION_LINE_SALES))
						.innerText(), "The Material costs and Inventory/Warehouse surcharges are not displayed").not.toBe('');

		await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_ORDER_TRANSACTION_LINE_SALES,
				LNMenuActions_Id.SAVE_AND_EXIT);

		// Verify Session Tab
		await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_ORDER_SALES);

		await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES, LNMenuActions_Id.SAVE_AND_EXIT);

		// Verify Session Tab
		await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_SALES_WORKBENCH);
		
		await LNCommon.filterRequiredRecord(SalesWorkbench_Lbl.ORDER_IN_ORDERS_GRID,
				SalesWorkbench_Id.ORDER_IN_ORDERS_SEGMENT_TWO_GRID, LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_SALES, tradeNum);
		await LNCommon.selectRequiredRecord(LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_SALES, SalesWorkbench_Lbl.ORDER_IN_ORDERS_GRID,
				SalesWorkbench_Id.ORDER_IN_ORDERS_SEGMENT_TWO_GRID, warehouseCnxt.intercompanyTradeNumSales);

		await LNCommon.navigateToLNReferences(LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_SALES,
				LNMenuActions_Lbl.SALES_INVOICE_INFORMATION);

		// Verifying the Session title
		await LNCommon.verifySessionTab(LNSessionTabs.INVOICING_360);

		await LNCommon.selectGridTab(LNTabs.BILLABLE_LINES, LNSessionCodes.INVOICING_360);
		await LNCommon.selectRequiredRecord(LNSessionCodes.BILLABLE_LINES, SalesWorkbench_Lbl.SOURCE_DOCUMENT_GRID,
				SalesWorkbench_Id.SOURCE_DOCUMENT_GRID, warehouseCnxt.intercompanyTradeNumSales);
				
		await this.page.waitForTimeout(1000);
		await LNCommon.clickTextMenuItem(LNSessionCodes.BILLABLE_LINES, LNMenuActions_Id.CREATE_INVOICE,
				LNMenuActions_Lbl.CREATE_INVOICE_BILLABLE_LINES);
		await LNCommon.validateMessageAndHandlePopUp(LNPopupMsg.INVOICES_WILL_BE_CREATED_AND_POSTED, LNCommons.YES);
		

		// Taking a screenshot of Posting Batches Created Report to verify the details
		//screenshot("Posting Batches Created Report");
		await LNSessionTabActions.closeTab(LNSessionTabs.POSTING_BATCHES_CREATED);
		await LNCommon.validateMessageAndHandlePopUp(LNPopupMsg.BILLABLE_LINES_OK_POPUP, LNCommons.OK);

		// Verifying the Session title
		await LNCommon.verifySessionTab(LNSessionTabs.INVOICING_360);

		// Taking a screenshot of Invoice Report to verify the details
		await (await commonPg.currentTab(LNSessionTabs.INVOICE)).click();
		
		//screenshot("Invoice Report");

		await LNSessionTabActions.closeTab(LNSessionTabs.INVOICE);

		// Verifying the Session title
		await LNCommon.verifySessionTab(LNSessionTabs.INVOICING_360);

		await LNCommon.clickMainMenuItem(LNSessionCodes.INVOICING_360, LNMenuActions_Id.SAVE_AND_EXIT);

		// Verifying the Session title
		await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_SALES_WORKBENCH);

		await LNCommon.selectGridTab(LNTabs.TRANSACTION_LINES, LNSessionCodes.INTERCOMPANY_TRADE_SALES_WORKBENCH);
		await LNCommon.clickMainMenuItem(LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_SALES_WORKBENCH,
				LNMenuActions_Id.REFRESH);
	
		await LNCommon.clickAndSelectDropdownFieldGridFilter(SalesWorkbench_Id.STATUS_GRID_DRP, LNCommons.INVOICED,
				SalesWorkbench_Lbl.STATUS_GRID_DRP,
				LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_SALES_WORKBENCH);

		// Verifying our Intercompany Trade order is Invoiced
		await LNCommon.isRequiredRowPresent(LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_SALES_WORKBENCH,
				SalesWorkbench_Lbl.ORDER_IN_TRANSACTION_LINES_GRID,
				SalesWorkbench_Id.ORDER_IN_TRANSACTION_LINES_SEGEMNT_TWO_GRID, warehouseCnxt.intercompanyTradeNumSales);

		//screenshot("Invoice intercompany trade order transaction line (by purchase office of distribution center)");

		await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_SALES_WORKBENCH, LNMenuActions_Id.SAVE_AND_EXIT);

		// Close LN Module
		await LNCommon.collapseLNModule(LNSessionTabs.COMMON);

		console.log(
				"=========>>>>> Invoice intercompany trade order transaction line (by purchase office of distribution center) completed sucessfully <<<<<=========");
	}

	static async reviewTheIntercompanyTradeSalesDashboard(warehouseCnxt) {

		// Initialising page elements
		const commonPg = new LNPage(this.page);

		console.log("=========>>>>> Review the Intercompany Trade Sales Dashboard started <<<<<=========");

		// Navigating to Common --> Intercompany Trade --> Sales Workbench
		await LNCommon.navigateToLNModule(LNSessionTabs.COMMON, LNSessionTabs.INTERCOMPANY_TRADE,
				LNSessionTabs.SALES_DASHBOARD);

		// Verify Session Tab
		await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_SALES_DASHBOARD);

		await LNCommon.selectHeaderTab(LNTabs.GENERAL, LNSessionCodes.INTERCOMPANY_TRADE_SALES_DASHBOARD);

		await LNCommon.triggerInputField(await (await LNCommon.getTextField(SalesDashboard_Lbl.ENTERPRISE_UNIT_IN_FINANCE_ENTITY,
				SalesDashboard_Id.ENTERPRISE_UNIT_IN_FINANCE_ENTITY, LNSessionCodes.INTERCOMPANY_TRADE_SALES_DASHBOARD)).first(),
				warehouseCnxt.enterpriseUnits[0]);

		// Verifying Scenario Section
		expect(await this.isElementPresent(await commonPg.verifyHeader(SalesDashboard_Lbl.SCENARIO)), `${SalesDashboard_Lbl.SCENARIO} section is not found`).toBeTruthy();

		// Clearing all the Filters in Scenario section if they are selected
		const filters = [ SalesDashboard_Lbl.EXTERNAL_MATERIAL_DELIVERY_SALES,
				SalesDashboard_Lbl.EXTERNAL_MATERIAL_DELIVERY_PURCHASE,
				SalesDashboard_Lbl.EXTERNAL_MATERIAL_DIRECT_DELIVERY, SalesDashboard_Lbl.INTERNAL_MATERIAL_DELIVERY,
				SalesDashboard_Lbl.FREIGHT, SalesDashboard_Lbl.SUBCONTRACTING_DEPOT_REPAIR,
				SalesDashboard_Lbl.PROJECT_PCS_DELIVERY, SalesDashboard_Lbl.WIP_TRANSFER ];

		for (let i = 0; i < filters.length; i++) {
			if (await (await (await commonPg.statFieldButton(LNSessionCodes.INTERCOMPANY_TRADE_SALES_DASHBOARD,
					filters[i])).getAttribute(ElementAttributes.CLASS))?.includes(LNCommons.STATFIELD_SELECTED)) {
				await (await commonPg.statFieldButton(LNSessionCodes.INTERCOMPANY_TRADE_SALES_DASHBOARD,
						filters[i])).click();
				
			}
		}
        
		await this.page.waitForTimeout(1000);
		await this.page.keyboard.press('Tab');
	
		// Selecting Orders tab and Capturing the List View of Intercompany Trade tab
		await LNCommon.selectGridTab(LNTabs.ORDERS, LNSessionCodes.INTERCOMPANY_TRADE_SALES_DASHBOARD);
		await LNCommon.selectHeaderTab(LNTabs.INTERCOMPANY_TRADE,
				LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_SALES);
		await LNCommon.filterRequiredRecord(SalesDashboard_Lbl.TO_ENTERPRISE_UNIT_GRID,
				SalesDashboard_Id.TO_ENTERPRISE_UNIT_GRID, LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_SALES,
				warehouseCnxt.toEnterpriseUnit);
		//screenshot("The List view of Intercompany Trade tab in Orders tab");

		// Selecting and Capturing the List View of Business Object tab
		await LNCommon.selectHeaderTab(LNTabs.BUSINESS_OBJECT, LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_SALES);
		//screenshot("The List view of Business Object tab in Orders tab");

		// Selecting and Capturing the List View of Transaction Lines tab
		await LNCommon.selectGridTab(LNTabs.TRANSACTION_LINES, LNSessionCodes.INTERCOMPANY_TRADE_SALES_DASHBOARD);
		//screenshot("The List view of Transaction Lines tab");

		// Selecting Additional tab and Capturing the Filter Selection range
		await LNCommon.selectHeaderTab(LNTabs.ADDITIONAL, LNSessionCodes.INTERCOMPANY_TRADE_SALES_DASHBOARD);
		expect(await this.isElementPresent(await LNCommon.getTextField(SalesDashboard_Lbl.PROJECT,
						SalesDashboard_Id.PROJECT, LNSessionCodes.INTERCOMPANY_TRADE_SALES_DASHBOARD)), `The ${SalesDashboard_Lbl.PROJECT} filter is not available`).toBeTruthy();
		//screenshot("The Filter Ranges that are available for selection");

		//screenshot("Review the Intercompany Trade Sales Dashboard");

		await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_SALES_DASHBOARD, LNMenuActions_Id.SAVE_AND_EXIT);

		// Close LN Module
		await LNCommon.collapseLNModule(LNSessionTabs.COMMON);

		console.log("=========>>>>> Review the Intercompany Trade Sales Dashboard completed sucessfully <<<<<=========");
	}

	 static async reviewTheIntercompanyTradePurchaseDashboard(warehouseCnxt) {

		// Initialising page elements
		const commonPg = new LNPage(this.page);

		console.log("=========>>>>> Review the Intercompany Trade Purchase Dashboard started <<<<<=========");

		// Navigating to Common --> Intercompany Trade --> Sales Workbench
		await LNCommon.navigateToLNModule(LNSessionTabs.COMMON, LNSessionTabs.INTERCOMPANY_TRADE,
				LNSessionTabs.PURCHASE_DASHBOARD);

		// Verify Session Tab
		await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_PURCHASE_DASHBOARD);

		await LNCommon.selectHeaderTab(LNTabs.GENERAL, LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_DASHBOARD);

		await (await (await LNCommon.getTextField(PurchaseDashboard_Lbl.ENTERPRISE_UNIT_IN_FINANCE_ENTITY,
				PurchaseDashboard_Id.ENTERPRISE_UNIT_IN_FINANCE_ENTITY,
				LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_DASHBOARD)).first()).clear();

		// Verifying Scenario Section
		expect(await this.isElementPresent(await commonPg.verifyHeader(PurchaseDashboard_Lbl.SCENARIO)), `${PurchaseDashboard_Lbl.SCENARIO} section is not found`).toBeTruthy();

		// Clearing all the Filters in Scenario section if they are selected
		const filters = [ PurchaseDashboard_Lbl.EXTERNAL_MATERIAL_DELIVERY_SALES,
				PurchaseDashboard_Lbl.EXTERNAL_MATERIAL_DELIVERY_PURCHASE,
				PurchaseDashboard_Lbl.EXTERNAL_MATERIAL_DIRECT_DELIVERY,
				PurchaseDashboard_Lbl.INTERNAL_MATERIAL_DELIVERY, PurchaseDashboard_Lbl.FRIEGHT,
				PurchaseDashboard_Lbl.SUBCONTRACTING_DEPOT_REPAIR, PurchaseDashboard_Lbl.PROJECT_PCS_DELIVERY,
				PurchaseDashboard_Lbl.WIP_TRANSFER ];
		
		 try {
			 await (await commonPg.statFieldButton(LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_DASHBOARD,
				 filters[i])).getAttribute(ElementAttributes.CLASS);
		 } catch (e) {
			 console.log(e.stack);
		 }

		for (let i = 0; i < filters.length; i++) {
			if (await (await (await commonPg.statFieldButton(LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_DASHBOARD,
					filters[i])).getAttribute(ElementAttributes.CLASS))?.includes(LNCommons.STATFIELD_SELECTED)) {
				await (await commonPg.statFieldButton(LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_DASHBOARD,
						filters[i])).click();
				
			}
		}

		await this.page.waitForTimeout(1000);
		await this.page.keyboard.press('Tab');

		//screenshot("The List view of General tab");

		// Selecting Orders tab and Capturing the List View of Intercompany Trade tab
		await LNCommon.selectGridTab(LNTabs.ORDERS, LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_DASHBOARD);
		await LNCommon.selectHeaderTab(LNTabs.INTERCOMPANY_TRADE,
				LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_PURCHASE);

		await LNCommon.filterRequiredRecord(PurchaseDashboard_Lbl.TO_ENTERPRISE_UNIT_GRID,
				PurchaseDashboard_Id.TO_ENTERPRISE_UNIT_GRID,
				LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_PURCHASE, warehouseCnxt.toEnterpriseUnit);
		//screenshot("The List view of Intercompany Trade tab in Orders tab");

		// Selecting and Capturing the List View of Business Object tab
		await LNCommon.selectHeaderTab(LNTabs.BUSINESS_OBJECT,
				LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_PURCHASE);
		//screenshot("The List view of Business Object tab in Orders tab");

		// Selecting and Capturing the List View of Transaction Lines tab
		await LNCommon.selectGridTab(LNTabs.TRANSACTION_LINES,
				LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_DASHBOARD);

		await LNCommon.filterRequiredRecord(PurchaseDashboard_Lbl.FROM_ENTERPRISE_UNIT_IN_TRANSACTION_LINES_GRID,
				PurchaseDashboard_Id.FROM_ENTERPRISE_UNIT_IN_TRANSACTION_LINES_GRID,
				LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_PURCHASE_DASHBOARD,
				warehouseCnxt.enterpriseUnits[0]);

		await LNCommon.filterRequiredRecord(PurchaseDashboard_Lbl.TO_ENTERPRISE_UNIT_IN_TRANSACTION_LINES_GRID,
				PurchaseDashboard_Id.TO_ENTERPRISE_UNIT_IN_TRANSACTION_LINES_GRID,
				LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_PURCHASE_DASHBOARD,
				warehouseCnxt.toEnterpriseUnit);
		//screenshot("The List view of Transaction Lines tab");
		
		//screenshot("Review the Intercompany Trade Purchase Dashboard");

		await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_DASHBOARD,
				LNMenuActions_Id.SAVE_AND_EXIT);

		// Close LN Module
		await LNCommon.collapseLNModule(LNSessionTabs.COMMON);

		console.log(
				"=========>>>>> Review the Intercompany Trade Purchase Dashboard completed sucessfully <<<<<=========");
	}

	 static async reviewIntercompanyTradeOrderPurchaseBySalesCenter(warehouseCnxt) {

		// Initialising page elements
		const commonPg = new LNPage(this.page);

		console.log(
				"=========>>>>> Review intercompany trade order - purchase (by sales center) started <<<<<=========");

		// Navigating to Common --> Intercompany Trade --> Purchase Workbench
		await LNCommon.navigateToLNModule(LNSessionTabs.COMMON, LNSessionTabs.INTERCOMPANY_TRADE,
				LNSessionTabs.PURCHASE_WORKBENCH);

		// Verify Session Tab
		await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH);

		await LNCommon.selectHeaderTab(LNTabs.ADDITIONAL, LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH);

		await expect(await commonPg.statFieldButton(LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH,
					PurchaseWorkbench_Lbl.INTERNAL_MATERIAL_DELIVERY)).toContainClass(LNCommons.STATFIELD);
					
		if (await (await (await commonPg.statFieldButton(LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH,
				PurchaseWorkbench_Lbl.INTERNAL_MATERIAL_DELIVERY)).getAttribute(ElementAttributes.CLASS))
				.includes(LNCommons.STATFIELD_SELECTED)) {
			await (await commonPg.statFieldButton(LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH,
					PurchaseWorkbench_Lbl.INTERNAL_MATERIAL_DELIVERY)).click();
			
		}

		await expect(await commonPg.statFieldButton(LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH,
					PurchaseWorkbench_Lbl.EXTERNAL_MATERIAL_DELIVERY_PURCHASE)).toContainClass(LNCommons.STATFIELD);
		if (!(await (await (await commonPg.statFieldButton(LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH,
				PurchaseWorkbench_Lbl.EXTERNAL_MATERIAL_DELIVERY_PURCHASE)).getAttribute(ElementAttributes.CLASS))
				.includes(LNCommons.STATFIELD_SELECTED))) {
			await (await commonPg.statFieldButton(LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH,
					PurchaseWorkbench_Lbl.EXTERNAL_MATERIAL_DELIVERY_PURCHASE)).click();
			
		}

		await LNCommon.updateDefaultFilter(PurchaseWorkbench_Id.ORDER_IN_ORDERS_SEGMENT_TWO_GRID,
				LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_PURCHASE, LNCommons.CONTAINS);
		await LNCommon.filterRequiredRecord(PurchaseWorkbench_Lbl.ORDER_IN_ORDERS_GRID,
				PurchaseWorkbench_Id.ORDER_IN_ORDERS_SEGMENT_TWO_GRID,
				LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_PURCHASE, warehouseCnxt.intercompanyTradeNumSales
						.substring(warehouseCnxt.intercompanyTradeNumSales.length - 2));
		await LNCommon.drilldownRequiredRecord(LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_PURCHASE,
				LNCommons.FIRST_RECORD);

		// Verify Session Tab
		await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_ORDER_PURCHASE);

		await LNCommon.navigateToLNReferences(LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE,
				LNMenuActions_Lbl.INTERCOMPANY_TRADE_ORDER_DETAILS);

		// Verify Session Tab
		await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_ORDER_PURCHASE);

		// Verifying the Details on Intercompany Trade tab
		await LNCommon.selectHeaderTab(LNTabs.INTERCOMPANY_TRADE, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL);
		expect(await (await LNCommon
						.getTextField(PurchaseWorkbench_Lbl.FROM_ENTERPRISE_UNIT,
								PurchaseWorkbench_Id.FROM_ENTERPRISE_UNIT,
								LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL))
						.inputValue(), `The From Enterprise Unit is not ${warehouseCnxt.enterpriseUnits[0]}`).toBe(warehouseCnxt.enterpriseUnits[0]);

		// Verifying the Details on Agreement tab
		await LNCommon.selectHeaderTab(LNTabs.AGREEMENT, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL);
		expect(await this.isElementPresent(await commonPg.verifyHeader(
						PurchaseWorkbench_Lbl.TRANSFER_PRICING_RULES)), `${PurchaseWorkbench_Lbl.TRANSFER_PRICING_RULES} section is not found`).toBeTruthy();

		// Verifying the Price Origin dropdown value
		expect(await (await commonPg.dropdownValueLabel(PurchaseWorkbench_Lbl.PRICE_ORIGIN_DRP,
						PurchaseWorkbench_Id.PRICE_ORIGIN_DRP)).innerText(), `${warehouseCnxt.priceOrigin} is not selected from dropdown`).toBe(warehouseCnxt.priceOrigin);

		// Verifying the Details on Project/Item tab
		await LNCommon.selectHeaderTab(LNTabs.PROJECT_ITEM, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL);

		 await expect(async () => {
			 expect(await (await LNCommon
				 .getTextField(PurchaseWorkbench_Lbl.FROM_ITEM, PurchaseWorkbench_Id.FROM_ITEM_SEGMENT_TWO,
					 LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL))
				 .inputValue(), `The Item in From Item section is not ${warehouseCnxt.items[1]}`).toBe(warehouseCnxt.items[1]);
		 }).toPass({ timeout: 10000 });

		// Switching to Operational tab and verifying the values
		await LNCommon.selectHeaderTab(LNTabs.OPERATIONAL, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL);

		 await expect(async () => {
			 expect(await (await LNCommon
				 .getTextField(PurchaseWorkbench_Lbl.SHIP_FROM_BUSINESS_PARTNER,
					 PurchaseWorkbench_Id.SHIP_FROM_BUSINESS_PARTNER,
					 LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL))
				 .inputValue(), `The value in Business Partner field of Ship from section is not ${warehouseCnxt.buyFromBP[1]}`)
				 .toBe(warehouseCnxt.buyFromBP[1]);
		 }).toPass({ timeout: 10000 });

		 await expect(async () => {
			 expect(await (await LNCommon
				 .getTextField(PurchaseWorkbench_Lbl.SHIP_TO_ADDRESS, PurchaseWorkbench_Id.SHIP_TO_ADDRESS,
					 LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL))
				 .inputValue(), `The value in Address field of Ship to section is not ${warehouseCnxt.addresses[1]}`)
				 .toBe(warehouseCnxt.addresses[1]);
		 }).toPass({ timeout: 10000 });

		// Switching to Buying Information tab and verifying the values
		await LNCommon.selectHeaderTab(LNTabs.BUYING_INFORMATION, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL);
        
		 await expect(async () => {
			 expect(await (await LNCommon
				 .getTextField(PurchaseWorkbench_Lbl.BUY_FROM_ADDRESS, PurchaseWorkbench_Id.BUY_FROM_ADDRESS,
					 LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL))
				 .inputValue(), `The Buy from address is not ${warehouseCnxt.addresses[0]}`).toBe(warehouseCnxt.addresses[0]);

		 }).toPass({ timeout: 10000 });

		expect(await (await LNCommon
						.getTextField(PurchaseWorkbench_Lbl.INVOICE_FROM_ADDRESS,
								PurchaseWorkbench_Id.INVOICE_FROM_ADDRESS,
								LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL))
						.inputValue(), `The Buy from address is not ${warehouseCnxt.addresses[0]}`)
				.toBe(warehouseCnxt.addresses[0]);

		// Switching to Control tab and verifying the values
		await LNCommon.selectHeaderTab(LNTabs.CONTROL, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL);

		 await expect(async () => {

			 expect(await (await LNCommon
				 .getTextField(PurchaseWorkbench_Lbl.USER, PurchaseWorkbench_Id.USER,
					 LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL))
				 .inputValue(), "The value in User is not ").toBe("3270st02");

		 }).toPass({ timeout: 10000 });

		// Switching to Tabs and verifying the values
		const tabs = [ LNTabs.TAX, LNTabs.PRICING, LNTabs.HOURS_EXPENSES, LNTabs.FREIGHT, LNTabs.FINANCIAL ];
		for (let i = 0; i < tabs.length; i++) {
			LNCommon.selectHeaderTab(tabs[i], LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL);

			//screenshot(tabs[i] + " Tab details");
		}

		//screenshot("Review intercompany trade order - purchase (by sales center)");

		await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL,
				LNMenuActions_Id.SAVE_AND_EXIT);
		await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE, LNMenuActions_Id.SAVE_AND_EXIT);
		await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH,
				LNMenuActions_Id.SAVE_AND_EXIT);

		// Verify Session Tab
		await LNCommon.verifySessionTab(LNSessionTabs.PURCHASE_ORDER);

		// Close LN Module
		await LNCommon.collapseLNModule(LNSessionTabs.COMMON);

		console.log(
				"=========>>>>> Review intercompany trade order - purchase (by sales center) completed sucessfully <<<<<=========");
	}
}

export default LNCommonFunctions;