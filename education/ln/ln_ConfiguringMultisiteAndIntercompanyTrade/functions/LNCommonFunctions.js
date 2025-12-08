import BaseClass, { log } from "../../../testBase/BaseClass";
import LNSessionCodes from "../../commons/LNCommonConstants/LNSessionCodes";
import LNSessionTabs from "../../commons/LNCommonConstants/LNSessionTabs";
import LNTabs from "../../commons/LNCommonConstants/LNTabs";
import toolbar from "../../commons/LNCommonConstants/ToolbarActions";
import LNCommon from "../../commons/LNCommon";
import LNPage from "../../commons/LNCommonPage";
import LNMenuActions_Id from "../constants/elementIds/LNMenuActions_Id";
import PurchaseWorkbench_Id from "../constants/elementIds/PurchaseWorkbench_Id";
import SalesWorkbench_Id from "../constants/elementIds/SalesWorkbench_Id";
import LNMenuActions_Lbl from "../constants/elementLbls/LNMenuActions_Lbl";
import PurchaseWorkbench_Lbl from "../constants/elementLbls/PurchaseWorkbench_Lbl";
import SalesWorkbench_Lbl from "../constants/elementLbls/SalesWorkbench_Lbl";
import LNPopupMsg from "../constants/LNPopupMsg";
import ElementAttributes from "../../../commons/constants/ElementAttributes";
import {expect} from '@playwright/test';
import Status from "../../commons/LNCommonConstants/Status";
import SalesDashboard_Lbl from "../constants/elementLbls/SalesDashboard_Lbl";
import SalesDashboard_Id from "../constants/elementIds/SalesDashboard_Id";
import PurchaseDashboard_Lbl from "../constants/elementLbls/PurchaseDashboard_Lbl";
import PurchaseDashboard_Id from "../constants/elementIds/PurchaseDashboard_Id";
import Parameters_Id from "../constants/elementIds/Parameters_Id";
import Parameters_Lbl from "../constants/elementLbls/Parameters_Lbl";
import Relationships_Lbl from "../constants/elementLbls/Relationships_Lbl";
import Relationships_Id from "../constants/elementIds/Relationships_Id";

class LNCommonFunctions extends BaseClass {

    static async invoiceIntercompanyTradeOrderTransactionLineByTheDistributionCenter(enterpriseUnits, intercompanyTradeNum, flag) {

        const commonPg = new LNPage(this.page);

        log.info("=========>>>>> Invoice intercompany trade order transaction line (by the distribution center) started <<<<<=========");

        // Navigating to module
        await LNCommon.navigateToLNModule(
            LNSessionTabs.COMMON,
            LNSessionTabs.INTERCOMPANY_TRADE,
            LNSessionTabs.SALES_WORKBENCH
        );

        await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_SALES_WORKBENCH);

        const sections = [
            SalesWorkbench_Lbl.FINANCIAL_ENTITY,
            SalesWorkbench_Lbl.INTERCOMPANY_CUSTOMER
        ];

        const euLbl = [
            SalesWorkbench_Lbl.ENTERPRISE_UNIT_FINANCIAL_ENTITY,
            SalesWorkbench_Lbl.ENTERPRISE_UNIT_INTERCOMPANY_CUSTOMER
        ];

        const euId = [
            SalesWorkbench_Id.ENTERPRISE_UNIT_FINANCIAL_ENTITY,
            SalesWorkbench_Id.ENTERPRISE_UNIT_INTERCOMPANY_CUSTOMER
        ];

        for (let i = 0; i < sections.length; i++) {

            // Assert dynamic element
            const sectionFound = await this.isElementPresent(await commonPg.verifyHeader(sections[i]));
            expect(sectionFound, `${sections[i]} section is not found`).toBeTruthy();

            await (await LNCommon.getTextboxLookUpIcon(euLbl[i], euId[i], LNSessionCodes.INTERCOMPANY_TRADE_SALES_WORKBENCH)).click();

            await LNCommon.verifyDialogBoxWindow(LNSessionTabs.ENTERPRISE_UNITS);

            await LNCommon.filterRequiredRecord(
                SalesWorkbench_Lbl.ENTERPRISE_UNIT_GRID,
                SalesWorkbench_Id.ENTERPRISE_UNIT_GRID,
                LNSessionCodes.ENTERPRISE_UNITS,
                enterpriseUnits[i]
            );

            await LNCommon.selectRequiredRecord(
                LNSessionCodes.ENTERPRISE_UNITS,
                SalesWorkbench_Lbl.ENTERPRISE_UNIT_GRID,
                SalesWorkbench_Id.ENTERPRISE_UNIT_GRID,
                enterpriseUnits[i]
            );

            await LNCommon.clickTextMenuItem(
                LNSessionCodes.ENTERPRISE_UNITS,
                LNMenuActions_Id.OK,
                LNMenuActions_Lbl.OK
            );

            await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_SALES_WORKBENCH);
        }

        if (flag === 1) {
            await LNCommon.selectHeaderTab(LNTabs.ADDITIONAL, LNSessionCodes.INTERCOMPANY_TRADE_SALES_WORKBENCH);

           await (await commonPg.statFieldButton(
                LNSessionCodes.INTERCOMPANY_TRADE_SALES_WORKBENCH,
                SalesWorkbench_Lbl.INTERNAL_MATERIAL_DELIVERY
            )).click();
        }

        await LNCommon.selectGridTab(LNTabs.TRANSACTION_LINES, LNSessionCodes.INTERCOMPANY_TRADE_SALES_WORKBENCH);

        if (flag === 0) {
            await LNCommon.clickAndSelectDropdownFieldGridFilter(
                SalesWorkbench_Id.STATUS_GRID_DRP,
                Status.RELEASED,
                SalesWorkbench_Lbl.STATUS_GRID_DRP,
                LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_SALES_WORKBENCH
            );
        }

        if (flag === 1) {
            await LNCommon.updateDefaultFilter(
                SalesWorkbench_Id.ORDER_IN_TRANSACTION_LINES_SEGEMNT_TWO_GRID,
                LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_SALES_WORKBENCH,
                toolbar.CONTAINS
            );

            await LNCommon.filterRequiredRecord(
                SalesWorkbench_Lbl.ORDER_IN_TRANSACTION_LINES_GRID,
                SalesWorkbench_Id.ORDER_IN_TRANSACTION_LINES_SEGEMNT_TWO_GRID,
                LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_SALES_WORKBENCH,
                intercompanyTradeNum.slice(-2)
            );
        }

        const rowNum = await LNCommon.selectRequiredRecord(
            LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_SALES_WORKBENCH,
            SalesWorkbench_Lbl.ORDER_IN_TRANSACTION_LINES_GRID,
            SalesWorkbench_Id.ORDER_IN_TRANSACTION_LINES_SEGEMNT_TWO_GRID,
            intercompanyTradeNum
        );

        await LNCommon.drilldownRequiredRecord(
            LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_SALES_WORKBENCH,
            String(rowNum)
        );

        await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_ORDER_TRANSACTION_LINE_SALES);

        await LNCommon.selectGridTab(LNTabs.COS, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_TRANSACTION_LINE_SALES);

        const cosText = await (await (await commonPg.gridLabelField(SalesWorkbench_Lbl.COST_OF_SALES_GRID,
            SalesWorkbench_Id.COST_OF_SALES_GRID,
            LNSessionCodes.COS_IN_INTERCOMPANY_TRADE_ORDER_TRANSACTION_LINE_SALES
        )).first()).getAttribute(ElementAttributes.INNER_TEXT);

        expect(cosText, "The Material costs and Inventory/Warehouse surcharges are not displayed").not.toEqual("");

        await LNCommon.clickMainMenuItem(
            LNSessionCodes.INTERCOMPANY_TRADE_ORDER_TRANSACTION_LINE_SALES,
            LNMenuActions_Id.SAVE_AND_CLOSE
        );

        await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_SALES_WORKBENCH);

        await LNCommon.selectGridTab(LNTabs.ORDERS, LNSessionCodes.INTERCOMPANY_TRADE_SALES_WORKBENCH);

        await LNCommon.updateDefaultFilter(
            SalesWorkbench_Id.ORDER_IN_ORDERS_SEGMENT_TWO_GRID,
            LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_SALES,
            toolbar.CONTAINS
        );

        const tradeNum = intercompanyTradeNum.slice(-2);

        await LNCommon.filterRequiredRecord(
            SalesWorkbench_Lbl.ORDER_IN_ORDERS_GRID,
            SalesWorkbench_Id.ORDER_IN_ORDERS_SEGMENT_TWO_GRID,
            LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_SALES,
            tradeNum
        );

        await LNCommon.selectRequiredRecord(
            LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_SALES,
            SalesWorkbench_Lbl.ORDER_IN_ORDERS_GRID,
            SalesWorkbench_Id.ORDER_IN_ORDERS_SEGMENT_TWO_GRID,
            intercompanyTradeNum
        );

        await LNCommon.navigateToLNReferences(
            LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_SALES,
            LNMenuActions_Lbl.SALES_INVOICE_INFORMATION
        );

        await LNCommon.verifySessionTab(LNSessionTabs.INVOICING_360);

        await LNCommon.selectGridTab(LNTabs.BILLABLE_LINES, LNSessionCodes.INVOICING_360);

        await LNCommon.selectRequiredRecord(
            LNSessionCodes.BILLABLE_LINES,
            SalesWorkbench_Lbl.SOURCE_DOCUMENT_GRID,
            SalesWorkbench_Id.SOURCE_DOCUMENT_GRID,
            intercompanyTradeNum
        );

        await LNCommon.clickTextMenuItem(
            LNSessionCodes.BILLABLE_LINES,
            LNMenuActions_Id.CREATE_INVOICE,
            LNMenuActions_Lbl.CREATE_INVOICE_BILLABLE_LINES
        );

        await LNCommon.validateMessageAndHandlePopUp(
            LNPopupMsg.INVOICES_WILL_BE_CREATED_AND_POSTED,
            toolbar.YES
        );

        await this.screenshot("Posting Batches Created Report");
        await LNCommon.closeTab(LNSessionTabs.POSTING_BATCHES_CREATED);

        await LNCommon.validateMessageAndHandlePopUp(
            LNPopupMsg.BILLABLE_LINES_OK_POPUP,
            toolbar.OK
        );

        await LNCommon.verifySessionTab(LNSessionTabs.INVOICING_360);

        await (await commonPg.currentTab(LNSessionTabs.INVOICE)).click();

        await this.screenshot("Invoice Report");

        await LNCommon.closeTab(LNSessionTabs.INVOICE);

        await LNCommon.verifySessionTab(LNSessionTabs.INVOICING_360);

        await this.screenshot("Invoice intercompany trade order transaction line (by the distribution center)");

        await LNCommon.clickMainMenuItem(LNSessionCodes.INVOICING_360, LNMenuActions_Id.SAVE_AND_CLOSE);
        await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_SALES_WORKBENCH, LNMenuActions_Id.SAVE_AND_CLOSE);

        await LNCommon.collapseLNModule(LNSessionTabs.COMMON);

        log.info("=========>>>>> Invoice intercompany trade order transaction line (by the distribution center) completed successfully <<<<<=========");
    }

    static async createIntercompanyTradePurchaseInvoiceByTheSalesCenter(intercompanyTradeNum,toEnterpriseUnit,flag) {

    const commonPg = new LNPage(this.page);

    log.info("=========>>>>> Create intercompany trade purchase invoice (by the sales center) started <<<<<=========");

    // Navigate
    await LNCommon.navigateToLNModule(LNSessionTabs.COMMON, LNSessionTabs.INTERCOMPANY_TRADE,LNSessionTabs.PURCHASE_WORKBENCH);

    await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH);

    // Clear additional filter if needed
    if (flag === 0) {
        const clearBtnClass = await (await commonPg.textMenuWithoutLabel(
            LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH,
            LNMenuActions_Id.CLEAR_ADDITIONAL_FILTER
        )).getAttribute(ElementAttributes.CLASS);

        if (!clearBtnClass.includes(toolbar.DISABLED)) {
            await LNCommon.clickTextMenuItem(
                LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH,
                LNMenuActions_Id.CLEAR_ADDITIONAL_FILTER,
                LNMenuActions_Lbl.CLEAR_ADDITIONAL_FILTER
            );
        }
    }

    // For flag 1 or 2 — clear enterprise units + go to Additional tab
    if (flag === 1 || flag === 2) {
        const euLbl = [
            PurchaseWorkbench_Lbl.ENTERPRISE_UNIT_FINANCIAL_ENTITY,
            PurchaseWorkbench_Lbl.ENTERPRISE_UNIT_INTERCOMPANY_CUSTOMER
        ];

        const euId = [
            PurchaseWorkbench_Id.ENTERPRISE_UNIT_FINANCIAL_ENTITY,
            PurchaseWorkbench_Id.ENTERPRISE_UNIT_INTERCOMPANY_CUSTOMER
        ];

        for (let i = 0; i < euLbl.length; i++) {
            await (await (await LNCommon.getTextField(
                euLbl[i],
                euId[i],
                LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH
            )).first()).clear();
        }

        await LNCommon.selectHeaderTab(
            LNTabs.ADDITIONAL,
            LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH
        );
    }

    // Internal material delivery
    if (flag === 1) {
        const internalClass = await (await commonPg.statFieldButton(
            LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH,
            PurchaseWorkbench_Lbl.INTERNAL_MATERIAL_DELIVERY
        )).getAttribute(ElementAttributes.CLASS);

        if (!internalClass.includes(toolbar.STATFIELD_SELECTED)) {
           await (await commonPg.statFieldButton(
                LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH,
                PurchaseWorkbench_Lbl.INTERNAL_MATERIAL_DELIVERY
            )).click();

            
        }
    }

    // External material delivery purchase
    if (flag === 2) {
        const externalClass = await (await commonPg.statFieldButton(
            LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH,
            PurchaseWorkbench_Lbl.EXTERNAL_MATERIAL_DELIVERY_PURCHASE
        )).getAttribute(ElementAttributes.CLASS);

        if (!externalClass.includes(toolbar.STATFIELD_SELECTED)) {
            await (await commonPg.statFieldButton(
                LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH,
                PurchaseWorkbench_Lbl.EXTERNAL_MATERIAL_DELIVERY_PURCHASE
            )).click();
        }
    }

    // Transaction Lines tab
    await LNCommon.selectGridTab(
        LNTabs.TRANSACTION_LINES,
        LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH
    );

    if (flag === 0) {
        await LNCommon.updateDefaultFilter(
            PurchaseWorkbench_Id.ORDER_IN_TRANSACTION_LINES_SEGEMNT_TWO_GRID,
            LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_PURCHASE_WORKBENCH,
            toolbar.CONTAINS
        );

        await LNCommon.filterRequiredRecord(
            PurchaseWorkbench_Lbl.ORDER_IN_TRANSACTION_LINES_GRID,
            PurchaseWorkbench_Id.ORDER_IN_TRANSACTION_LINES_SEGEMNT_TWO_GRID,
            LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_PURCHASE_WORKBENCH,
            intercompanyTradeNum.slice(-2)
        );
    }

    if (flag === 1 || flag === 2) {
        await LNCommon.clickAndSelectDropdownFieldGridFilter(
            PurchaseWorkbench_Id.STATUS_IN_TRANSACTION_LINES_DRP_GRID,
            Status.RELEASED,
            PurchaseWorkbench_Lbl.STATUS_IN_TRANSACTION_LINES_DRP_GRID,
            LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_PURCHASE_WORKBENCH
        );
    }

    if (flag === 2) {
        await LNCommon.filterRequiredRecord(
            PurchaseWorkbench_Lbl.TO_ENTERPRISE_UNIT_GRID,
            PurchaseWorkbench_Id.TO_ENTERPRISE_UNIT_GRID,
            LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_PURCHASE_WORKBENCH,
            toEnterpriseUnit
        );
    }

    // Select record and navigate
    await LNCommon.selectRequiredRecord(
        LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_PURCHASE_WORKBENCH,
        PurchaseWorkbench_Lbl.ORDER_IN_TRANSACTION_LINES_GRID,
        PurchaseWorkbench_Id.ORDER_IN_TRANSACTION_LINES_SEGEMNT_TWO_GRID,
        intercompanyTradeNum
    );

    await LNCommon.navigateToLNActions(
        LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_PURCHASE_WORKBENCH,
        LNMenuActions_Lbl.GENERATE_PURCHASE_INVOICE
    );

    await LNCommon.verifySessionTab(LNSessionTabs.GENERATE_INTERCOMPANY_TRADE_PURCHASE_INVOICES);

    await LNCommon.clickTextMenuItem(
        LNSessionCodes.GENERATE_INTERCOMPANY_TRADE_PURCHASE_INVOICES,
        LNMenuActions_Id.GENERATES,
        LNMenuActions_Lbl.GENERATE
    );

    // Handle device loop
    do {
        await LNCommon.handleDevice();
    } while (await this.isElementPresent(await commonPg.device()));

    // Process Report
    await LNCommon.verifySessionTab(LNSessionTabs.PROCESS_REPORT);
    await this.screenshot("Process Report");
    await LNCommon.closeTab(LNSessionTabs.PROCESS_REPORT);

    // Close generate session
    await LNCommon.clickTextMenuItem(
        LNSessionCodes.GENERATE_INTERCOMPANY_TRADE_PURCHASE_INVOICES,
        LNMenuActions_Id.CLOSE,
        LNMenuActions_Lbl.CLOSE
    );

    // Internal Invoice Detailed Report
    await LNCommon.verifySessionTab(LNSessionTabs.INTERNAL_INVOICE_DETAILED);
    await this.screenshot("Internal Invoice (Detailed) Report");
    await LNCommon.closeTab(LNSessionTabs.INTERNAL_INVOICE_DETAILED);

    await this.screenshot("Create intercompany trade purchase invoice (by the sales center)");

    await LNCommon.clickMainMenuItem(
        LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH,
        LNMenuActions_Id.SAVE_AND_CLOSE
    );

    await LNCommon.collapseLNModule(LNSessionTabs.COMMON);

    log.info("=========>>>>> Create intercompany trade purchase invoice (by the sales center) completed successfully <<<<<=========");
}

static async  reviewIntercompanyTradeOrderSalesByTheDistributionCenter(businessCnxt) {

    log.info("=========>>>>> Review intercompany trade order - sales (by the distribution center) started <<<<<=========");

    const commonPg = new LNPage(this.page);

    // Navigate to Common → Intercompany Trade → Sales Workbench
    await LNCommon.navigateToLNModule(
        LNSessionTabs.COMMON,
        LNSessionTabs.INTERCOMPANY_TRADE,
        LNSessionTabs.SALES_WORKBENCH
    );

    // Verify session tab
    await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_SALES_WORKBENCH);

    // Clear additional filter if enabled
    const clearBtn = await commonPg.textMenuWithoutLabel(
        LNSessionCodes.INTERCOMPANY_TRADE_SALES_WORKBENCH,
        LNMenuActions_Id.CLEAR_ADDITIONAL_FILTER
    );

    const isDisabled = await clearBtn.getAttribute(ElementAttributes.CLASS);

    if (!isDisabled.includes(toolbar.DISABLED)) {
        await LNCommon.clickTextMenuItem(
            LNSessionCodes.INTERCOMPANY_TRADE_SALES_WORKBENCH,
            LNMenuActions_Id.CLEAR_ADDITIONAL_FILTER,
            LNMenuActions_Lbl.CLEAR_ADDITIONAL_FILTER
        );
    }

    // Update filter mode to "Contains"
    await LNCommon.updateDefaultFilter(
        SalesWorkbench_Id.ORDER_IN_ORDERS_SEGMENT_TWO_GRID,
        LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_SALES,
        toolbar.CONTAINS
    );

    // Filter using last 2 chars of trade number
    const filterValue = businessCnxt.interCmpnyTradeNum.slice(-2);

    await LNCommon.filterRequiredRecord(
        SalesWorkbench_Lbl.ORDER_IN_ORDERS_GRID,
        SalesWorkbench_Id.ORDER_IN_ORDERS_SEGMENT_TWO_GRID,
        LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_SALES,
        filterValue
    );

    await LNCommon.drilldownRequiredRecord(
        LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_SALES,
        toolbar.FIRST_RECORD
    );

    // Verify session title
    await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_ORDER_SALES);

    // Navigate to references
    await LNCommon.navigateToLNReferences(
        LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES,
        LNMenuActions_Lbl.INTERCOMPANY_TRADE_ORDER_DETAILS
    );

    await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_ORDER_SALES);

    //
    // INTERCOMPANY TRADE TAB VALIDATIONS
    //
    await LNCommon.selectHeaderTab(
        LNTabs.INTERCOMPANY_TRADE,
        LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES_DETAIL
    );

     expect(await (await LNCommon.getTextField(SalesWorkbench_Lbl.FROM_ENTERPRISE_UNIT, 
        SalesWorkbench_Id.FROM_ENTERPRISE_UNIT,
        LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES_DETAIL
    )).inputValue()).toBe(businessCnxt.enterpriseUnits[0]);

    expect(await (await LNCommon.getTextField(SalesWorkbench_Lbl.TO_ENTERPRISE_UNIT, 
        SalesWorkbench_Id.TO_ENTERPRISE_UNIT,
        LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES_DETAIL
    )).inputValue()).toBe(businessCnxt.enterpriseUnits[1]);

    //
    // PROJECT/ITEM TAB
    //
    await LNCommon.selectHeaderTab(LNTabs.PROJECT_ITEM, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES_DETAIL);

    expect(await (await (await LNCommon.getTextField(SalesWorkbench_Lbl.FROM_ITEM, 
        SalesWorkbench_Id.FROM_ITEM_SEGMENT_TWO,
        LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES_DETAIL
    ))).first().inputValue()).toBe(businessCnxt.item[1]);

    expect(await (await (await LNCommon.getTextField(SalesWorkbench_Lbl.TO_ITEM, 
        SalesWorkbench_Id.TO_ITEM_SEGMENT_TWO,
        LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES_DETAIL
    ))).first().inputValue()).toBe(businessCnxt.item[1]);

    //
    // OPERATIONAL TAB
    //
    await LNCommon.selectHeaderTab(LNTabs.OPERATIONAL, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES_DETAIL);

    expect(await (await (await LNCommon.getTextField(SalesWorkbench_Lbl.SHIP_FROM_SITE, 
        SalesWorkbench_Id.SHIP_FROM_SITE,
        LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES_DETAIL
    )).first()).inputValue()).toBe(businessCnxt.enterpriseUnits[0]);

    expect(await (await (await LNCommon.getTextField(SalesWorkbench_Lbl.SHIP_TO_BUSINESS_PARTNER, 
        SalesWorkbench_Id.SHIP_TO_BUSINESS_PARTNER,
        LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES_DETAIL
    )).first()).inputValue()).toBe(businessCnxt.businessPartner);

    //
    // FINANCIAL TAB
    //
    await LNCommon.selectHeaderTab(LNTabs.CONTROL, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES_DETAIL);

    expect(await (await (await LNCommon.getTextField(SalesWorkbench_Lbl.USER, 
        SalesWorkbench_Id.USER,
        LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES_DETAIL
    )).first()).inputValue()).toBe("3170st01");

    //
    // OTHER TABS → SCREENSHOTS ONLY
    //
    const tabs = [
        LNTabs.AGREEMENT,
        LNTabs.SELLING_INFORMATION,
        LNTabs.TAX,
        LNTabs.PRICING,
        LNTabs.HOURS_EXPENSES,
        LNTabs.FREIGHT,
        LNTabs.FINANCIAL
    ];

    for (const tab of tabs) {
        await LNCommon.selectHeaderTab(tab, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES_DETAIL);
        await this.screenshot(`${tab} Tab details`);
    }

    await this.screenshot("Review intercompany trade order - sales (by the distribution center)");

    //
    // CLOSE ALL SESSIONS
    //
    await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES_DETAIL, LNMenuActions_Id.SAVE_AND_CLOSE);
    await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES, LNMenuActions_Id.SAVE_AND_CLOSE);
    await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_SALES_WORKBENCH, LNMenuActions_Id.SAVE_AND_CLOSE);
    await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL, LNMenuActions_Id.SAVE_AND_CLOSE);
    await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE, LNMenuActions_Id.SAVE_AND_CLOSE);

    // Final Session tab verification
    await LNCommon.verifySessionTab(LNSessionTabs.SALES_ORDER);

    log.info("=========>>>>> Review intercompany trade order - sales (by the distribution center) completed successfully <<<<<=========");
}

/*----------------------------------------------------------------------------------------------------------
	 * Objective : Invoice intercompany trade order transaction line (by purchase office of distribution center)
	 * Workbook	 : LN Cloud Configuring Multisite and Intercompany Trade Training Workbook
	 * Exercises : 3.3.6
	 * ---------------------------------------------------------------------------------------------------------*/
	static async invoiceIntercompanyTradeOrderTransactionLineByPurchaseOfficeOfDistributionCenter(warehouseCnxt) {

		// Initialising page elements
		const commonPg = new LNPage(this.page);

		log.info(
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
			PurchaseWorkbench_Lbl.EXTERNAL_MATERIAL_DELIVERY_PURCHASE)).toContainClass(toolbar.STATFIELD_ENABLED);
		if (!(await (await (await commonPg.statFieldButton(LNSessionCodes.INTERCOMPANY_TRADE_SALES_WORKBENCH,
			SalesWorkbench_Lbl.EXTERNAL_MATERIAL_DELIVERY_PURCHASE)).getAttribute(ElementAttributes.CLASS))
			.includes(toolbar.STATFIELD_ENABLED))) {
			await (await commonPg.statFieldButton(LNSessionCodes.INTERCOMPANY_TRADE_SALES_WORKBENCH,
				SalesWorkbench_Lbl.EXTERNAL_MATERIAL_DELIVERY_PURCHASE)).click();

		}

		await LNCommon.selectGridTab(LNTabs.TRANSACTION_LINES, LNSessionCodes.INTERCOMPANY_TRADE_SALES_WORKBENCH);
		await LNCommon.clickAndSelectDropdownFieldGridFilter(SalesWorkbench_Id.STATUS_GRID_DRP, Status.RELEASED,
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
				LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_SALES, toolbar.CONTAINS);

		const tradeNum = warehouseCnxt.intercompanyTradeNumSales
				.substring(warehouseCnxt.intercompanyTradeNumSales.length - 2);

		await LNCommon.filterRequiredRecord(SalesWorkbench_Lbl.ORDER_IN_ORDERS_GRID,
				SalesWorkbench_Id.ORDER_IN_ORDERS_SEGMENT_TWO_GRID,
				LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_SALES, tradeNum);
		await LNCommon.drilldownRequiredRecord(LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_SALES,
				toolbar.FIRST_RECORD);

		// Verifying the Session title
		await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_ORDER_SALES);

		await LNCommon.filterRequiredRecord(SalesWorkbench_Lbl.TRANSACTION_LINE_GRID, SalesWorkbench_Id.TRANSACTION_LINE_GRID,
				LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_SALES_WORKBENCH, warehouseCnxt.transactionLine);
		await LNCommon.drilldownRequiredRecord(LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_SALES_WORKBENCH,
				toolbar.FIRST_RECORD);

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
		await LNCommon.validateMessageAndHandlePopUp(LNPopupMsg.INVOICES_WILL_BE_CREATED_AND_POSTED, toolbar.YES);
		

		// Taking a screenshot of Posting Batches Created Report to verify the details
		await this.screenshot("Posting Batches Created Report");
		await LNCommon.closeTab(LNSessionTabs.POSTING_BATCHES_CREATED);
		await LNCommon.validateMessageAndHandlePopUp(LNPopupMsg.BILLABLE_LINES_OK_POPUP, toolbar.OK);

		// Verifying the Session title
		await LNCommon.verifySessionTab(LNSessionTabs.INVOICING_360);

		// Taking a screenshot of Invoice Report to verify the details
		await (await commonPg.currentTab(LNSessionTabs.INVOICE)).click();
		
		await this.screenshot("Invoice Report");

		await LNCommon.closeTab(LNSessionTabs.INVOICE);

		// Verifying the Session title
		await LNCommon.verifySessionTab(LNSessionTabs.INVOICING_360);

		await LNCommon.clickMainMenuItem(LNSessionCodes.INVOICING_360, LNMenuActions_Id.SAVE_AND_EXIT);

		// Verifying the Session title
		await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_SALES_WORKBENCH);

		await LNCommon.selectGridTab(LNTabs.TRANSACTION_LINES, LNSessionCodes.INTERCOMPANY_TRADE_SALES_WORKBENCH);
		await LNCommon.clickMainMenuItem(LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_SALES_WORKBENCH,
				LNMenuActions_Id.REFRESH);
	
		await LNCommon.clickAndSelectDropdownFieldGridFilter(SalesWorkbench_Id.STATUS_GRID_DRP, toolbar.INVOICED,
				SalesWorkbench_Lbl.STATUS_GRID_DRP,
				LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_SALES_WORKBENCH);

		// Verifying our Intercompany Trade order is Invoiced
		await LNCommon.isRequiredRowPresent(LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_SALES_WORKBENCH,
				SalesWorkbench_Lbl.ORDER_IN_TRANSACTION_LINES_GRID,
				SalesWorkbench_Id.ORDER_IN_TRANSACTION_LINES_SEGEMNT_TWO_GRID, warehouseCnxt.intercompanyTradeNumSales);

		await this.screenshot("Invoice intercompany trade order transaction line (by purchase office of distribution center)");

		await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_SALES_WORKBENCH, LNMenuActions_Id.SAVE_AND_EXIT);

		// Close LN Module
		await LNCommon.collapseLNModule(LNSessionTabs.COMMON);

		log.info(
				"=========>>>>> Invoice intercompany trade order transaction line (by purchase office of distribution center) completed sucessfully <<<<<=========");
	}

     /*---------------------------------------------------------------
	 * Objective : Review the Intercompany Trade Sales Dashboard
	 * Workbook	 : LN Cloud Configuring Multisite and Intercompany Trade Training Workbook
	 * Exercises : 3.4.1
	 * --------------------------------------------------------------*/
	static async reviewTheIntercompanyTradeSalesDashboard(warehouseCnxt) {

		// Initialising page elements
		const commonPg = new LNPage(this.page);

		log.info("=========>>>>> Review the Intercompany Trade Sales Dashboard started <<<<<=========");

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
					filters[i])).getAttribute(ElementAttributes.CLASS))?.includes(toolbar.STATFIELD_SELECTED)) {
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
		await this.screenshot("The List view of Intercompany Trade tab in Orders tab");

		// Selecting and Capturing the List View of Business Object tab
		await LNCommon.selectHeaderTab(LNTabs.BUSINESS_OBJECT, LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_SALES);
		
        await this.screenshot("The List view of Business Object tab in Orders tab");

		// Selecting and Capturing the List View of Transaction Lines tab
		await LNCommon.selectGridTab(LNTabs.TRANSACTION_LINES, LNSessionCodes.INTERCOMPANY_TRADE_SALES_DASHBOARD);
		//screenshot("The List view of Transaction Lines tab");

		// Selecting Additional tab and Capturing the Filter Selection range
		await LNCommon.selectHeaderTab(LNTabs.ADDITIONAL, LNSessionCodes.INTERCOMPANY_TRADE_SALES_DASHBOARD);
		expect(await this.isElementPresent(await LNCommon.getTextField(SalesDashboard_Lbl.PROJECT,
						SalesDashboard_Id.PROJECT, LNSessionCodes.INTERCOMPANY_TRADE_SALES_DASHBOARD)), `The ${SalesDashboard_Lbl.PROJECT} filter is not available`).toBeTruthy();
		await this.screenshot("The Filter Ranges that are available for selection");

		await this.screenshot("Review the Intercompany Trade Sales Dashboard");

		await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_SALES_DASHBOARD, LNMenuActions_Id.SAVE_AND_EXIT);

		// Close LN Module
		await LNCommon.collapseLNModule(LNSessionTabs.COMMON);

		log.info("=========>>>>> Review the Intercompany Trade Sales Dashboard completed sucessfully <<<<<=========");
	}

    /*-----------------------------------------------------------------------------------
	 * Objective : Review the Intercompany Trade Purchase Dashboard
	 * Workbook	 : LN Cloud Configuring Multisite and Intercompany Trade Training Workbook
	 * Exercises : 3.4.2
	 * -----------------------------------------------------------------------------------*/
	 static async reviewTheIntercompanyTradePurchaseDashboard(warehouseCnxt) {

		// Initialising page elements
		const commonPg = new LNPage(this.page);

		log.info("=========>>>>> Review the Intercompany Trade Purchase Dashboard started <<<<<=========");

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
					filters[i])).getAttribute(ElementAttributes.CLASS))?.includes(toolbar.STATFIELD_SELECTED)) {
				await (await commonPg.statFieldButton(LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_DASHBOARD,
						filters[i])).click();
				
			}
		}

		await this.page.waitForTimeout(1000);
		await this.page.keyboard.press('Tab');

		await this.screenshot("The List view of General tab");

		// Selecting Orders tab and Capturing the List View of Intercompany Trade tab
		await LNCommon.selectGridTab(LNTabs.ORDERS, LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_DASHBOARD);
		await LNCommon.selectHeaderTab(LNTabs.INTERCOMPANY_TRADE,
				LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_PURCHASE);

		await LNCommon.filterRequiredRecord(PurchaseDashboard_Lbl.TO_ENTERPRISE_UNIT_GRID,
				PurchaseDashboard_Id.TO_ENTERPRISE_UNIT_GRID,
				LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_PURCHASE, warehouseCnxt.toEnterpriseUnit);
		await this.screenshot("The List view of Intercompany Trade tab in Orders tab");

		// Selecting and Capturing the List View of Business Object tab
		await LNCommon.selectHeaderTab(LNTabs.BUSINESS_OBJECT,
				LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_PURCHASE);
		await this.screenshot("The List view of Business Object tab in Orders tab");

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

		await this.screenshot("The List view of Transaction Lines tab");
		
		await this.screenshot("Review the Intercompany Trade Purchase Dashboard");

		await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_DASHBOARD,
				LNMenuActions_Id.SAVE_AND_EXIT);

		// Close LN Module
		await LNCommon.collapseLNModule(LNSessionTabs.COMMON);

		log.info(
				"=========>>>>> Review the Intercompany Trade Purchase Dashboard completed sucessfully <<<<<=========");
	}

    static async reviewIntercompanyTradeOrderPurchaseBySalesCenter(warehouseCnxt) {

		// Initialising page elements
		const commonPg = new LNPage(this.page);

		log.info(
				"=========>>>>> Review intercompany trade order - purchase (by sales center) started <<<<<=========");

		// Navigating to Common --> Intercompany Trade --> Purchase Workbench
		await LNCommon.navigateToLNModule(LNSessionTabs.COMMON, LNSessionTabs.INTERCOMPANY_TRADE,
				LNSessionTabs.PURCHASE_WORKBENCH);

		// Verify Session Tab
		await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH);

		await LNCommon.selectHeaderTab(LNTabs.ADDITIONAL, LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH);

		await expect(await commonPg.statFieldButton(LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH,
					PurchaseWorkbench_Lbl.INTERNAL_MATERIAL_DELIVERY)).toContainClass(toolbar.STATFIELD_ENABLED);
					
		if (await (await (await commonPg.statFieldButton(LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH,
				PurchaseWorkbench_Lbl.INTERNAL_MATERIAL_DELIVERY)).getAttribute(ElementAttributes.CLASS))
				.includes(toolbar.STATFIELD_ENABLED)) {
			await (await commonPg.statFieldButton(LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH,
					PurchaseWorkbench_Lbl.INTERNAL_MATERIAL_DELIVERY)).click();
			
		}

		await expect(await commonPg.statFieldButton(LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH,
					PurchaseWorkbench_Lbl.EXTERNAL_MATERIAL_DELIVERY_PURCHASE)).toContainClass(toolbar.STATFIELD_ENABLED);
		if (!(await (await (await commonPg.statFieldButton(LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH,
				PurchaseWorkbench_Lbl.EXTERNAL_MATERIAL_DELIVERY_PURCHASE)).getAttribute(ElementAttributes.CLASS))
				.includes(toolbar.STATFIELD_ENABLED))) {
			await (await commonPg.statFieldButton(LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH,
					PurchaseWorkbench_Lbl.EXTERNAL_MATERIAL_DELIVERY_PURCHASE)).click();
			
		}

		await LNCommon.updateDefaultFilter(PurchaseWorkbench_Id.ORDER_IN_ORDERS_SEGMENT_TWO_GRID,
				LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_PURCHASE, toolbar.CONTAINS);
		await LNCommon.filterRequiredRecord(PurchaseWorkbench_Lbl.ORDER_IN_ORDERS_GRID,
				PurchaseWorkbench_Id.ORDER_IN_ORDERS_SEGMENT_TWO_GRID,
				LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_PURCHASE, warehouseCnxt.intercompanyTradeNumSales
						.substring(warehouseCnxt.intercompanyTradeNumSales.length - 2));
		await LNCommon.drilldownRequiredRecord(LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_PURCHASE,
				toolbar.FIRST_RECORD);

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
				 .inputValue(), "The value in User is not ").toBe("3170st01");

		 }).toPass({ timeout: 10000 });

		// Switching to Tabs and verifying the values
		const tabs = [ LNTabs.TAX, LNTabs.PRICING, LNTabs.HOURS_EXPENSES, LNTabs.FREIGHT, LNTabs.FINANCIAL ];
		for (let i = 0; i < tabs.length; i++) {
			LNCommon.selectHeaderTab(tabs[i], LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL);

			await this.screenshot(tabs[i] + " Tab details");
		}

		await this.screenshot("Review intercompany trade order - purchase (by sales center)");

		await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL,
				LNMenuActions_Id.SAVE_AND_EXIT);
		await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE, LNMenuActions_Id.SAVE_AND_EXIT);
		await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH,
				LNMenuActions_Id.SAVE_AND_EXIT);

		// Verify Session Tab
		await LNCommon.verifySessionTab(LNSessionTabs.PURCHASE_ORDER);

		// Close LN Module
		await LNCommon.collapseLNModule(LNSessionTabs.COMMON);

		log.info(
				"=========>>>>> Review intercompany trade order - purchase (by sales center) completed sucessfully <<<<<=========");
	}

    	/*-------------------------------------------------------------------------------------------
	 * Objective : Support Internal Material Delivery to Project
	 * Workbook	 : LN Cloud: Configuring Multisite Environment
	 * Exercises : 3.4.1
	 * ------------------------------------------------------------------------------------------*/
	static async supportInternalMaterialDeliveryToProject(parameter) {

		// Initialising page elements
		const commonPg = new LNPage(this.page);

		log.info("=========>>>>> Support Internal Material Delivery to Project started <<<<<=========");

		// Navigating to Common --> Intercompany Trade --> Parameters
		await LNCommon.navigateToLNModule(LNSessionTabs.COMMON, LNSessionTabs.INTERCOMPANY_TRADE, LNSessionTabs.PARAMETERS);

		// Verify Session Tab
		await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_PARAMETERS);

		await LNCommon.filterRequiredRecord(Parameters_Lbl.DESCRIPTION_INTERCOMPANY_TRADE_GRID,
				Parameters_Id.DESCRIPTION_INTERCOMPANY_TRADE_GRID, LNSessionCodes.INTERCOMPANY_TRADE_PARAMETERS,
				parameter);
		const rowNo = await LNCommon.selectRequiredRecord(LNSessionCodes.INTERCOMPANY_TRADE_PARAMETERS,
				Parameters_Lbl.DESCRIPTION_INTERCOMPANY_TRADE_GRID, Parameters_Id.DESCRIPTION_INTERCOMPANY_TRADE_GRID,
				parameter);
		await LNCommon.drilldownRequiredRecord(LNSessionCodes.INTERCOMPANY_TRADE_PARAMETERS, String(rowNo));

		// Verify Session Tab
		await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_PARAMETERS);

		// Verify the heading
		expect(await this.isElementPresent(await commonPg.verifyHeader(Parameters_Lbl.ORDER_SETTINGS)), `${Parameters_Lbl.ORDER_SETTINGS} + " header is not found`).toBeTruthy();

		await LNCommon.selectCheckbox(Parameters_Lbl.SUPPORT_INTERNAL_MATERIAL_DELIVERY_TO_PROJECT_CHK,
				Parameters_Id.SUPPORT_INTERNAL_MATERIAL_DELIVERY_TO_PROJECT_CHK);

		await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_PARAMETERS, LNMenuActions_Id.SAVE_AND_CLOSE);
		// Verify Session Tab
		await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_PARAMETERS);

		await this.screenshot("Support Internal Material Delivery to Project");

		await LNCommon.closeTab(LNSessionTabs.INTERCOMPANY_TRADE_PARAMETERS);

		// Close LN Module
		await LNCommon.collapseLNModule(LNSessionTabs.COMMON);

		log.info("=========>>>>> Support Internal Material Delivery to Project completed sucessfully <<<<<=========");
	}

    /*-------------------------------------------------------------------------------------------
	 * Objective : Intercompany trade relations between Boston Enterprise Unit and any US entity
	 * Workbook	 : LN Cloud: Configuring Multisite Environment
	 * Exercises : 3.4.3
	 * ------------------------------------------------------------------------------------------*/
	static async intercompanyTradeRelationsBetweenBostonEnterpriseUnitAndAnyUSEntity(fromEnterpriseUnit, scenario) {

		// Initialising page elements
		const commonPg = new LNPage(this.page);

		log.info(
				"=========>>>>> Intercompany trade relations between Boston Enterprise Unit and any US entity started <<<<<=========");

		// Navigating to Common --> Intercompany Trade --> Relationships --->
		// Relationships
		await LNCommon.navigateToLNModule(LNSessionTabs.COMMON, LNSessionTabs.INTERCOMPANY_TRADE, LNSessionTabs.RELATIONSHIPS,
				LNSessionTabs.RELATIONSHIPS);

		// Verify Session Tab
		await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_RELATIONSHIPS);

		await LNCommon.filterRequiredRecord(Relationships_Lbl.FROM_ENTERPRISE_UNIT_GRID,
				Relationships_Id.FROM_ENTERPRISE_UNIT_GRID, LNSessionCodes.INTERCOMPANY_TRADE_RELATIONSHIPS,
				fromEnterpriseUnit);
		const rowNo = await LNCommon.selectRequiredRecord(LNSessionCodes.INTERCOMPANY_TRADE_RELATIONSHIPS,
				Relationships_Lbl.FROM_ENTERPRISE_UNIT_GRID, Relationships_Id.FROM_ENTERPRISE_UNIT_GRID,
				fromEnterpriseUnit);
		await LNCommon.drilldownRequiredRecord(LNSessionCodes.INTERCOMPANY_TRADE_RELATIONSHIPS, String(rowNo));

		// Verify Session Tab
		await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_RELATIONSHIP);

		// Verify the heading
		expect(await this.isElementPresent(await commonPg.verifyHeader(Relationships_Lbl.FROM)), `${Relationships_Lbl.FROM} + " header is not found"`).toBeTruthy();

		// Verify the Enterprise Unit
		expect(await (await LNCommon.getTextField(Relationships_Lbl.FROM_ENTERPRISE_UNIT,
						Relationships_Id.FROM_ENTERPRISE_UNIT, LNSessionCodes.INTER_COMPANY_TRADE_RELATIONSHIP))
						.inputValue(), `From Enterprise Unit is not ${fromEnterpriseUnit}`).toBe(fromEnterpriseUnit);

		await LNCommon.selectGridTab(LNTabs.AGREEMENTS, LNSessionCodes.INTER_COMPANY_TRADE_RELATIONSHIP);

		await LNCommon.clickAndSelectDropdownFieldGridFilter(Relationships_Id.SCENARIO_GRID, scenario,
				Relationships_Lbl.SCENARIO_GRID, LNSessionCodes.INTER_COMPANY_TRADE_RELATIONSHIP_LINE);

		await LNCommon.selectRequiredRecord(LNSessionCodes.INTER_COMPANY_TRADE_RELATIONSHIP_LINE,
				Relationships_Lbl.SCENARIO_GRID, Relationships_Id.SCENARIO_GRID, scenario);

		await LNCommon.navigateToLNReferences(LNSessionCodes.INTER_COMPANY_TRADE_RELATIONSHIP_LINE,
				LNMenuActions_Lbl.AGREEMENT);

		// Verify Session Tab
		await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_AGREEMENT);

		// Review the fields and data
		await LNCommon.selectHeaderTab(LNTabs.AGREEMENT, LNSessionCodes.INTERCOMPANY_TRADE_AGREEMENT);

		await this.screenshot("Intercompany trade relations between Boston Enterprise Unit and any US entity");

		await LNCommon.closeTab(LNSessionTabs.INTERCOMPANY_TRADE_AGREEMENT);
		await LNCommon.closeTab(LNSessionTabs.INTERCOMPANY_TRADE_RELATIONSHIP);
		await LNCommon.closeTab(LNSessionTabs.INTERCOMPANY_TRADE_RELATIONSHIPS);

		// Close LN Module
		await LNCommon.collapseLNModule(LNSessionTabs.COMMON);

		log.info(
				"=========>>>>> Intercompany trade relations between Boston Enterprise Unit and any US entity completed sucessfully <<<<<=========");
	}

		/*-------------------------------------------------------------------------------------------
	 * Objective : Review intercompany trade order – sales (by warehouse)
	 * Workbook	 : LN Cloud: Configuring Multisite Environment
	 * Exercises : 3.4.6
	 * ------------------------------------------------------------------------------------------*/
	static async reviewIntercompanyTradeOrderSalesByWarehouse(warehouseCnxt) {

		// Initialising page elements
		const commonPg = new LNPage(this.page);

		log.info("=========>>>>> Review intercompany trade order – sales (by warehouse) started <<<<<=========");

		// Navigating to Common --> Intercompany Trade --> Sales Workbench
		await LNCommon.navigateToLNModule(LNSessionTabs.COMMON, LNSessionTabs.INTERCOMPANY_TRADE,
				LNSessionTabs.SALES_WORKBENCH);

		// Verify Session Tab
		await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_SALES_WORKBENCH);

		// Click Clear Additional Filter button if enabled
		if (!(await (await commonPg.textMenuWithoutLabel(LNSessionCodes.INTERCOMPANY_TRADE_SALES_WORKBENCH,
				LNMenuActions_Id.CLEAR_ADDITIONAL_FILTER)).getAttribute(ElementAttributes.CLASS)
				.includes(toolbar.DISABLED))) {

			await LNCommon.clickTextMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_SALES_WORKBENCH,
					LNMenuActions_Id.CLEAR_ADDITIONAL_FILTER, LNMenuActions_Lbl.CLEAR_ADDITIONAL_FILTER);
		}

		await LNCommon.selectHeaderTab(LNTabs.GENERAL, LNSessionCodes.INTERCOMPANY_TRADE_SALES_WORKBENCH);

		// Verifying the sections and Entering Data for Enterprise Unit fields
		const sections = [ SalesWorkbench_Lbl.FINANCIAL_ENTITY, SalesWorkbench_Lbl.INTERCOMPANY_CUSTOMER ];
		const euLbl = [ SalesWorkbench_Lbl.ENTERPRISE_UNIT_FINANCIAL_ENTITY,
				SalesWorkbench_Lbl.ENTERPRISE_UNIT_FINANCIAL_ENTITY ];
		const euId = [ SalesWorkbench_Id.ENTERPRISE_UNIT_INTERCOMPANY_CUSTOMER,
				SalesWorkbench_Id.ENTERPRISE_UNIT_INTERCOMPANY_CUSTOMER ];
		const enterpriseUnit = [ warehouseCnxt.fromEnterpriseUnit, warehouseCnxt.toEnterpriseUnit ];

		for (let i = 0; i < sections.length; i++) {
			expect(await this.isElementPresent(await commonPg.verifyHeader(sections[i]))).toBeTruthy();
			await LNCommon.triggerInputField( await LNCommon.getTextField(euLbl[i], euId[i], LNSessionCodes.INTERCOMPANY_TRADE_SALES_WORKBENCH),
					enterpriseUnit[i]);
		}

		await LNCommon.selectHeaderTab(LNTabs.ADDITIONAL, LNSessionCodes.INTERCOMPANY_TRADE_SALES_WORKBENCH);

		// Verify the heading
		expect(await this.isElementPresent(await commonPg.verifyHeader(SalesWorkbench_Lbl.SCENARIO)),`${SalesWorkbench_Lbl.SCENARIO} header is not found`).toBeTruthy();

		if (!await (await commonPg.statFieldButton(LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH,
				PurchaseWorkbench_Lbl.INTERNAL_MATERIAL_DELIVERY)).getAttribute(ElementAttributes.CLASS)
				.includes(toolbar.STATFIELD_SELECTED)) {
			await (await commonPg.statFieldButton(LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH,
					PurchaseWorkbench_Lbl.INTERNAL_MATERIAL_DELIVERY)).click();
			await this.page.waitForTimeout(1000);
		}

		await LNCommon.selectGridTab(LNTabs.ORDERS, LNSessionCodes.INTERCOMPANY_TRADE_SALES_WORKBENCH);

		// Adjusting the Filter option to Contains
		await LNCommon.updateDefaultFilter(SalesWorkbench_Id.ORDER_IN_ORDERS_SEGMENT_TWO_GRID,
				LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_SALES, toolbar.EQUALS);

		await LNCommon.filterRequiredRecord(SalesWorkbench_Lbl.ORDER_IN_ORDERS_GRID,
				SalesWorkbench_Id.ORDER_IN_ORDERS_SEGMENT_TWO_GRID, LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_SALES,
				warehouseCnxt.intercompanyTradeNumSales);
		const rowNo = LNCommon.selectRequiredRecord(LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_SALES,
				SalesWorkbench_Lbl.ORDER_IN_ORDERS_GRID, SalesWorkbench_Id.ORDER_IN_ORDERS_SEGMENT_TWO_GRID,
				warehouseCnxt.intercompanyTradeNumSales);
		await LNCommon.drilldownRequiredRecord(LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_SALES, String(rowNo));

		// Verifying the Session title
		await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_ORDER_SALES);

		await LNCommon.navigateToLNReferences(LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES,
				LNMenuActions_Lbl.INTERCOMPANY_TRADE_ORDER_DETAILS);

		// Verify Session Tab
		await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_ORDER_SALES);

		// Verifying the Details on Intercompany Trade tab
		await LNCommon.selectHeaderTab(LNTabs.INTERCOMPANY_TRADE, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES_DETAIL);

		expect(await (await LNCommon
						.getTextField(SalesWorkbench_Lbl.FROM_ENTERPRISE_UNIT, SalesWorkbench_Id.FROM_ENTERPRISE_UNIT,
								LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES_DETAIL))
						.inputValue(), `The From Enterprise Unit is not ${warehouseCnxt.fromEnterpriseUnit}`).toBe(warehouseCnxt.fromEnterpriseUnit);

		// Verifying the Details on Agreement tab
		await LNCommon.selectHeaderTab(LNTabs.AGREEMENT, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES_DETAIL);
		expect(await this.isElementPresent(await commonPg.verifyHeader(
						SalesWorkbench_Lbl.TRANSFER_PRICING_RULES)), `${SalesWorkbench_Lbl.TRANSFER_PRICING_RULES} section is not found`).toBeTruthy();

		// Verifying the Details on Financial tab
		await LNCommon.selectHeaderTab(LNTabs.FINANCIAL, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES_DETAIL);
		expect(await this.isElementPresent(await commonPg.verifyHeader(SalesWorkbench_Lbl.ESTIMATED_AMOUNTS)), `${SalesWorkbench_Lbl.ESTIMATED_AMOUNTS} section is not found`).toBeTruthy();

		await this.screenshot("Review intercompany trade order – sales (by warehouse)");

		await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES_DETAIL,
				LNMenuActions_Id.SAVE_AND_EXIT);
		await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_ORDER_SALES);

		await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES, LNMenuActions_Id.SAVE_AND_EXIT);
		await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_SALES_WORKBENCH);

		await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_SALES_WORKBENCH, LNMenuActions_Id.SAVE_AND_EXIT);

		// Close LN Module
		await LNCommon.collapseLNModule(LNSessionTabs.COMMON);

		log.info(
				"=========>>>>> Review intercompany trade order – sales (by warehouse) completed sucessfully <<<<<=========");
	}

		static async invoiceIntercompanyTradeOrderTransactionLineByWarehouse(warehouseCnxt) {

		// Initialising page elements
		const commonPg = new LNPage(this.page);

		log.info(
				"=========>>>>> Invoice intercompany trade order transaction line (by Warehouse) started <<<<<=========");

		// Navigating to Common --> Intercompany Trade --> Sales Workbench
		await LNCommon.navigateToLNModule(LNSessionTabs.COMMON, LNSessionTabs.INTERCOMPANY_TRADE,
				LNSessionTabs.SALES_WORKBENCH);

		// Verify Session Tab
		await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_SALES_WORKBENCH);

		await LNCommon.selectGridTab(LNTabs.TRANSACTION_LINES, LNSessionCodes.INTERCOMPANY_TRADE_SALES_WORKBENCH);

		await LNCommon.filterRequiredRecord(SalesWorkbench_Lbl.FROM_ENTERPRISE_UNIT_GRID,
				SalesWorkbench_Id.FROM_ENTERPRISE_UNIT_GRID,
				LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_SALES_WORKBENCH,
				warehouseCnxt.fromEnterpriseUnit);
		await LNCommon.filterRequiredRecord(SalesWorkbench_Lbl.TO_ENTERPRISE_UNIT_GRID,
				SalesWorkbench_Id.TO_ENTERPRISE_UNIT_GRID,
				LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_SALES_WORKBENCH, warehouseCnxt.toEnterpriseUnit);
		await LNCommon.filterRequiredRecord(SalesWorkbench_Lbl.ORDER_IN_TRANSACTION_LINES_GRID,
				SalesWorkbench_Id.ORDER_IN_TRANSACTION_LINES_SEGEMNT_TWO_GRID,
				LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_SALES_WORKBENCH,
				warehouseCnxt.intercompanyTradeNumSales);

		const rowNo =await LNCommon.selectRequiredRecord(
				LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_SALES_WORKBENCH,
				SalesWorkbench_Lbl.ORDER_IN_TRANSACTION_LINES_GRID,
				SalesWorkbench_Id.ORDER_IN_TRANSACTION_LINES_SEGEMNT_TWO_GRID, warehouseCnxt.intercompanyTradeNumSales);

		await LNCommon.drilldownRequiredRecord(LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_SALES_WORKBENCH,
				String(rowNo));

		// Verify Session Tab
		await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_ORDER_TRANSACTION_LINE_SALES);

		await LNCommon.selectGridTab(LNTabs.COS, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_TRANSACTION_LINE_SALES);

		// Verifying the Material costs and Inventory/Warehouse surcharges
		expect(await (await commonPg.gridLabelField(SalesWorkbench_Lbl.COST_OF_SALES_GRID,
						SalesWorkbench_Id.COST_OF_SALES_GRID,
						LNSessionCodes.COS_IN_INTERCOMPANY_TRADE_ORDER_TRANSACTION_LINE_SALES))
						.getAttribute(ElementAttributes.INNER_TEXT), `The Material costs and Inventory/Warehouse surcharges are not displayed`).not.toBeEmpty();

		await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_ORDER_TRANSACTION_LINE_SALES,
				LNMenuActions_Id.SAVE_AND_CLOSE);

		// Verify Session Tab
		await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_SALES_WORKBENCH);

		await LNCommon.selectGridTab(LNTabs.ORDERS, LNSessionCodes.INTERCOMPANY_TRADE_SALES_WORKBENCH);

		// Adjusting the Filter option to Contains
		await LNCommon.updateDefaultFilter(SalesWorkbench_Id.ORDER_IN_ORDERS_SEGMENT_TWO_GRID,
				LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_SALES, toolbar.CONTAINS);

		await LNCommon.filterRequiredRecord(SalesWorkbench_Lbl.ORDER_IN_ORDERS_GRID,
				SalesWorkbench_Id.ORDER_IN_ORDERS_SEGMENT_TWO_GRID, LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_SALES,
				warehouseCnxt.intercompanyTradeNumSales);
		await LNCommon.selectRequiredRecord(LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_SALES,
				SalesWorkbench_Lbl.ORDER_IN_ORDERS_GRID, SalesWorkbench_Id.ORDER_IN_ORDERS_SEGMENT_TWO_GRID,
				warehouseCnxt.intercompanyTradeNumSales);
		await LNCommon.navigateToLNReferences(LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_SALES,
				LNMenuActions_Lbl.SALES_INVOICE_INFORMATION);

		// Verifying the Session title
		await LNCommon.verifySessionTab(LNSessionTabs.INVOICING_360);

		await LNCommon.selectGridTab(LNTabs.BILLABLE_LINES, LNSessionCodes.INVOICING_360);
		await LNCommon.selectRequiredRecord(LNSessionCodes.BILLABLE_LINES, SalesWorkbench_Lbl.SOURCE_DOCUMENT_GRID,
				SalesWorkbench_Id.SOURCE_DOCUMENT_GRID, warehouseCnxt.intercompanyTradeNumSales);
		await LNCommon.clickTextMenuItem(LNSessionCodes.BILLABLE_LINES, LNMenuActions_Id.CREATE_INVOICE,
				LNMenuActions_Lbl.CREATE_INVOICE_BILLABLE_LINES);
		LNCommon.validateMessageAndHandlePopUp(LNPopupMsg.INVOICES_WILL_BE_CREATED_AND_POSTED, toolbar.YES);
		await this.page.waitForTimeout(1000);

		// Taking a screenshot of Posting Batches Created Report to verify the details
		await this.screenshot("Posting Batches Created Report");
		await LNCommon.closeTab(LNSessionTabs.POSTING_BATCHES_CREATED);
		await LNCommon.validateMessageAndHandlePopUp(LNPopupMsg.BILLABLE_LINES_OK_POPUP, toolbar.OK);

		// Verifying the Session title
		await LNCommon.verifySessionTab(LNSessionTabs.INVOICING_360);

		// Taking a screenshot of Invoice Report to verify the details
		await (await commonPg.currentTab(LNSessionTabs.INVOICE)).click();
		
		await this.screenshot("Invoice Report");

		await LNCommon.closeTab(LNSessionTabs.INVOICE);

		// Verifying the Session title
		await LNCommon.verifySessionTab(LNSessionTabs.INVOICING_360);

		await this.screenshot("Invoice intercompany trade order transaction line (by Warehouse)");

		await LNCommon.clickMainMenuItem(LNSessionCodes.INVOICING_360, LNMenuActions_Id.SAVE_AND_CLOSE);
		await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_SALES_WORKBENCH, LNMenuActions_Id.SAVE_AND_CLOSE);

		// Close LN Module
		await LNCommon.collapseLNModule(LNSessionTabs.COMMON);

		log.info(
				"=========>>>>> Invoice intercompany trade order transaction line (by Warehouse) completed sucessfully <<<<<=========");
	}

	/*-------------------------------------------------------------------------------------------
	 * Objective : Create intercompany trade purchase invoice (by PROJECT)
	 * Workbook	 : LN Cloud: Configuring Multisite Environment
	 * Exercises : 3.4.10
	 * ------------------------------------------------------------------------------------------*/
	static async createIntercompanyTradePurchaseInvoiceByProject(warehouseCnxt) {

		// Initialising page elements
		const commonPg = new LNPage(this.page);

		log.info("=========>>>>> Create intercompany trade purchase invoice (by PROJECT) started <<<<<=========");

		// Navigating to Common --> Intercompany Trade --> Purchase Workbench
		await LNCommon.navigateToLNModule(LNSessionTabs.COMMON, LNSessionTabs.INTERCOMPANY_TRADE,
				LNSessionTabs.PURCHASE_WORKBENCH);

		// Verify Session Tab
		await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH);

		await LNCommon.selectHeaderTab(LNTabs.ADDITIONAL, LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH);

		if (!(await (await commonPg.statFieldButton(LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH,
				PurchaseWorkbench_Lbl.INTERNAL_MATERIAL_DELIVERY)).getAttribute(ElementAttributes.CLASS))
				.includes(toolbar.STATFIELD_SELECTED)) {
			await (await commonPg.statFieldButton(LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH,
					PurchaseWorkbench_Lbl.INTERNAL_MATERIAL_DELIVERY)).click();
			
		}

		await LNCommon.selectGridTab(LNTabs.TRANSACTION_LINES, LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH);

		await LNCommon.clickAndSelectDropdownFieldGridFilter(PurchaseWorkbench_Id.STATUS_IN_TRANSACTION_LINES_DRP_GRID,
				Status.RELEASED, PurchaseWorkbench_Lbl.STATUS_IN_TRANSACTION_LINES_DRP_GRID,
				LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_ORDER_PURCHASE);
		await LNCommon.filterRequiredRecord(PurchaseWorkbench_Lbl.ORDER_IN_TRANSACTION_LINES_GRID,
				PurchaseWorkbench_Id.ORDER_IN_TRANSACTION_LINES_SEGEMNT_TWO_GRID,
				LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_ORDER_PURCHASE,
				warehouseCnxt.intercompanyTradeNumSales);

		const rowNo = await LNCommon.selectRequiredRecord(LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_ORDER_PURCHASE,
				PurchaseWorkbench_Lbl.ORDER_IN_TRANSACTION_LINES_GRID,
				PurchaseWorkbench_Id.ORDER_IN_TRANSACTION_LINES_SEGEMNT_TWO_GRID,
				warehouseCnxt.intercompanyTradeNumSales);
		await LNCommon.drilldownRequiredRecord(LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_ORDER_PURCHASE,
				String(rowNo));

		// Verify Session Tab
		await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_ORDER_TRANSACTION_LINE_PURCHASE);

		await LNCommon.navigateToLNActions(LNSessionCodes.INTERCOMPANY_TRADE_ORDER_TRANSACTION_LINE_PURCHASE,
				LNMenuActions_Lbl.GENERATE_PURCHASE_INVOICE);

		// Verify Session Tab
		await LNCommon.verifySessionTab(LNSessionTabs.GENERATE_INTERCOMPANY_TRADE_PURCHASE_INVOICES);

		await LNCommon.clickTextMenuItem(LNSessionCodes.GENERATE_INTERCOMPANY_TRADE_PURCHASE_INVOICES,
				LNMenuActions_Id.GENERATES, LNMenuActions_Lbl.GENERATE);

		// Handling Device as it may open multiple times as per workbook
		do {
			await LNCommon.handleDevice();
			pause(3);
		} while (await this.isElementPresent(await commonPg.device()));

		// Verifying the Session title, Report and closing it
		await LNCommon.verifySessionTab(LNSessionTabs.PROCESS_REPORT);
		await this.screenshot("Process Report");
		await LNCommon.closeTab(LNSessionTabs.PROCESS_REPORT);

		await (await commonPg.currentTab(LNSessionTabs.INTERNAL_INVOICE_DETAILED)).click();

		// Verifying the Session title, Report and closing it
		await LNCommon.verifySessionTab(LNSessionTabs.INTERNAL_INVOICE_DETAILED);
		await this.screenshot("Internal Invoice (Detailed) Report");
		await LNCommon.closeTab(LNSessionTabs.INTERNAL_INVOICE_DETAILED);

		await this.screenshot("Create intercompany trade purchase invoice (by PROJECT)");

		await LNCommon.clickTextMenuItem(LNSessionCodes.GENERATE_INTERCOMPANY_TRADE_PURCHASE_INVOICES, LNMenuActions_Id.CLOSE,
				LNMenuActions_Lbl.CLOSE);

		await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_ORDER_TRANSACTION_LINE_PURCHASE,
				LNMenuActions_Id.SAVE_AND_CLOSE);

		await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_PURCHASE_WORKBENCH,
				LNMenuActions_Id.SAVE_AND_CLOSE);

		// Close LN Module
		await LNCommon.collapseLNModule(LNSessionTabs.COMMON);

		log.info(
				"=========>>>>> Create intercompany trade purchase invoice (by PROJECT) completed sucessfully <<<<<=========");
	}
}

export default LNCommonFunctions;