import { expect } from "@playwright/test";
import BaseClass from "../../testBase/BaseClass";
import LNMenuActions_Id from "../constants/elementIds/LNMenuActions_Id";
import Orders_Id from "../constants/elementIds/Orders_Id";
import LNMenuActions_Lbl from "../constants/elementLbls/LNMenuActions_Lbl";
import Orders_Lbl from "../constants/elementLbls/Orders_Lbl";
import LNCommons from "../constants/LNCommons";
import LNPopupMsg from "../constants/LNPopupMsg";
import LNSessionCodes from "../constants/LNSessionCodes";
import LNSessionTabs from "../constants/LNSessionTabs";
import LNPage from "../pages/LNPage";
import LNCommon from "./LNCommon";
import LNTabs from "../constants/LNTabs";
import SalesWorkbench_Lbl from "../constants/elementLbls/SalesWorkbench_Lbl";
import SalesWorkbench_Id from "../constants/elementIds/SalesWorkbench_Id";
import OrderIntakeWorkbench_Id from "../constants/elementIds/OrderIntakeWorkbench_Id";

class LNWarehousing extends BaseClass {

    /*-------------------------------------------------------------------------------------------------------------
	 * Objective 	: Create warehouse transfer (by sales center)
	 * 				  Review intercompany trade order - purchase (by sales center)
	 * 				  Review intercompany trade order - sales (by distribution center)
	 * 				  Ship warehouse transfer (by distribution center)
	 * 				  Review the intercompany trade order transaction line (by sales center)
	 * Workbook 	: LN Cloud Configuring Multisite and Intercompany Trade Training Workbook
	 * Exercise		: 3.2.1, 3.2.2, 3.2.3, 3.2.4, 3.2.5
	 *--------------------------------------------------------------------------------------------------------------*/
    static async createAWarehouseTransferForInternalMaterialDelivery(warehouseCnxt) {

		// Initialising page elements
		let commonPg = new LNPage(this.page);

            console.log("=========>>>>> Create warehouse transfer (by sales center) started <<<<<=========");

            // Navigating to Warehousing --> Orders --> Orders
            await LNCommon.navigateToLNModule(LNSessionTabs.WAREHOUSING, LNSessionTabs.ORDERS, LNSessionTabs.ORDERS);

            // Verifying the Session title
            await LNCommon.verifySessionTab(LNSessionTabs.WAREHOUSING_ORDERS);

            await LNCommon.clickMainMenuItem(LNSessionCodes.WAREHOUSING_ORDERS, LNMenuActions_Id.NEW);

            // Verifying the Session title
            await LNCommon.verifySessionTab(LNSessionTabs.WAREHOUSING_ORDER);

            await LNCommon.clickMainMenuItem(LNSessionCodes.WAREHOUSING_ORDER, LNMenuActions_Id.NEW);

            // Verifying the Dialogbox title
            await LNCommon.verifyDialogBoxWindow(LNSessionTabs.WAREHOUSING_ORDER_TTSTPQ);

            await LNCommon.validateMessageAndHandlePopUp(LNPopupMsg.DO_YOU_WANT_TO_SAVE_THE_CHANGES_YOU_MADE_IN_WAREHOUSING_ORDER,
                LNCommons.YES);

            // Verifying the Dialogbox title
            await LNCommon.verifyDialogBoxWindow(LNSessionTabs.WAREHOUSING_ORDER_TTSTPS);

            await LNCommon.validateMessageAndHandlePopUp(LNPopupMsg.ENTER_A_VALUE_FOR_THE_ADDRESS_FIELD, LNCommons.OK);
            await LNCommon.clickAndSelectDropdownField(Orders_Lbl.ORDER_DRP, Orders_Id.ORDER_DRP, warehouseCnxt.order);

            // Verifying the Ship From section
            expect(await this.isElementPresent(await commonPg.verifyHeader(Orders_Lbl.SHIP_FROM)), `${Orders_Lbl.SHIP_FROM} section is not found`).toBeTruthy();

            await (await LNCommon.getTextboxLookUpIcon(Orders_Lbl.SHIP_FROM_CODE, Orders_Id.SHIP_FROM_CODE_SEGMENT_THREE,
                LNSessionCodes.WAREHOUSING_ORDER)).click();

            // Verifying the Dialogbox title
            await LNCommon.verifyDialogBoxWindow(LNSessionTabs.WAREHOUSES);

            await LNCommon.filterRequiredRecord(Orders_Lbl.WAREHOUSE_GRID, Orders_Id.WAREHOUSE_SEGMENT_TWO_ZOOM_GRID,
                LNSessionCodes.WAREHOUSES, warehouseCnxt.warehouseDesc[0]);
            await LNCommon.selectRequiredRecord(LNSessionCodes.WAREHOUSES, Orders_Lbl.WAREHOUSE_GRID,
                Orders_Id.WAREHOUSE_GRID, warehouseCnxt.warehouses[0]);
            await LNCommon.clickTextMenuItem(LNSessionCodes.WAREHOUSES, LNMenuActions_Id.OK, LNMenuActions_Lbl.OK);

            // Verifying the Session title
            await LNCommon.verifySessionTab(LNSessionTabs.WAREHOUSING_ORDER);

            await this.pause(1);
            await this.page.keyboard.press('Tab');

            // Verifying the Ship From Address
            expect(await (await LNCommon.getTextField(Orders_Lbl.SHIP_FROM_ADDRESS, Orders_Id.SHIP_FROM_ADDRESS,
                LNSessionCodes.WAREHOUSING_ORDER)), `The Ship from address is not ${warehouseCnxt.addresses[0]}`).toHaveValue(warehouseCnxt.addresses[0]);

            // Verifying the Ship To section
            expect(await this.isElementPresent(await commonPg.verifyHeader(Orders_Lbl.SHIP_TO)), `${Orders_Lbl.SHIP_TO} section is not found`).toBeTruthy();

            await (await LNCommon.getTextboxLookUpIcon(Orders_Lbl.SHIP_TO_CODE, Orders_Id.SHIP_TO_CODE_SEGMENT_THREE,
                LNSessionCodes.WAREHOUSING_ORDER)).click();

            // Verifying the Dialogbox title
            await LNCommon.verifyDialogBoxWindow(LNSessionTabs.WAREHOUSES);

            // Adjusting the Grid filter
            await LNCommon.updateDefaultFilter(Orders_Id.WAREHOUSE_GRID, LNSessionCodes.WAREHOUSES, LNCommons.CONTAINS);

            await LNCommon.filterRequiredRecord(Orders_Lbl.WAREHOUSE_GRID, Orders_Id.WAREHOUSE_GRID,
                LNSessionCodes.WAREHOUSES, warehouseCnxt.warehouses[1]);
            await LNCommon.selectRequiredRecord(LNSessionCodes.WAREHOUSES, Orders_Lbl.WAREHOUSE_GRID,
                Orders_Id.WAREHOUSE_GRID, warehouseCnxt.warehouses[2]);
            await LNCommon.clickTextMenuItem(LNSessionCodes.WAREHOUSES, LNMenuActions_Id.OK, LNMenuActions_Lbl.OK);

            // Verifying the Session title
            await LNCommon.verifySessionTab(LNSessionTabs.WAREHOUSING_ORDER);

            await this.pause(1);
            await this.page.keyboard.press('Tab');

            await LNCommon.validateMessageAndHandlePopUp(LNPopupMsg.NO_DISTANCE_HAS_BEEN_DEFINED_BETWEEN_ADDRESSES, LNCommons.OK);

            await this.pause(1);
            await this.page.keyboard.press('Tab');

            // Verifying the Ship To Address
            expect(await LNCommon.getTextField(Orders_Lbl.SHIP_TO_ADDRESS, Orders_Id.SHIP_TO_ADDRESS,
                LNSessionCodes.WAREHOUSING_ORDER), `The Ship to address is not ${warehouseCnxt.addresses[1]}`).toHaveValue(warehouseCnxt.addresses[1]);

            await LNCommon.selectGridTab(LNTabs.OUTBOUND_LINES, LNSessionCodes.WAREHOUSING_ORDER);
            await LNCommon.clickMainMenuItem(LNSessionCodes.OUTBOUND_LINES, LNMenuActions_Id.NEW);

            await (await this.page).waitForTimeout(1000);

            // Verifying the Order Line values

            expect(await LNCommon.getRequiredValueFromTheGrid(LNSessionCodes.OUTBOUND_LINES,
                Orders_Lbl.ORDER_LINE_IN_OUTBOUND_LINES_GRID, Orders_Id.ORDER_LINE_IN_OUTBOUND_LINES_GRID,
                Number(LNCommons.FIRST_RECORD)), `The value Order line segment one is not ${warehouseCnxt.orderLine[0]}`)
                .toBe(warehouseCnxt.orderLine[0]);
            expect(await LNCommon.getRequiredValueFromTheGrid(LNSessionCodes.OUTBOUND_LINES,
                Orders_Lbl.ORDER_LINE_IN_OUTBOUND_LINES_GRID, Orders_Id.ORDER_LINE_IN_OUTBOUND_LINES_SEGMENT_TWO_GRID,
                Number(LNCommons.FIRST_RECORD)), `The value Order line segment two is not ${warehouseCnxt.orderLine[1]}`)
                .toBe(warehouseCnxt.orderLine[1]);

            await this.pause(1);
            await this.page.keyboard.press('Tab');
            await this.page.keyboard.press('Tab');
            await this.page.keyboard.press('Tab');

            await LNCommon.dataCellElement(
                await LNCommon.getDataCell(Orders_Lbl.ITEM_IN_OUTBOUND_LINES_GRID,
                    Orders_Id.ITEM_IN_OUTBOUND_LINES_SEGMENT_TWO_GRID, LNSessionCodes.OUTBOUND_LINES),
                Number(LNCommons.FIRST_RECORD), warehouseCnxt.items[0]);

            // Verifying the Item Description
            expect(await LNCommon.getRequiredValueFromTheGrid(LNSessionCodes.OUTBOUND_LINES,
                Orders_Lbl.ITEM_IN_OUTBOUND_LINES_GRID, Orders_Id.ITEM_IN_OUTBOUND_LINES_SEGMENT_THREE_GRID,
                Number(LNCommons.FIRST_RECORD))).toBe(warehouseCnxt.itemDesc);

            await LNCommon.dataCellElement(
                await LNCommon.getDataCell(Orders_Lbl.ORDER_QUANTITY_IN_OUTBOUND_LINES_GRID,
                    Orders_Id.ORDER_QUANTITY_IN_OUTBOUND_LINES_GRID, LNSessionCodes.OUTBOUND_LINES),
                Number(LNCommons.FIRST_RECORD), warehouseCnxt.orderedQuantity);

            await LNCommon.clickMainMenuItem(LNSessionCodes.WAREHOUSING_ORDER, LNMenuActions_Id.SAVE);

            //screenshot("Create warehouse transfer (by sales center)");

            console.log("=========>>>>> Create warehouse transfer (by sales center) completed sucessfully <<<<<=========");

            console.log(
                "=========>>>>> Review intercompany trade order - purchase (by sales center) started <<<<<=========");

            await LNCommon.selectRequiredRecord(LNSessionCodes.OUTBOUND_LINES, Orders_Lbl.ORDER_LINE_IN_OUTBOUND_LINES_GRID,
                Orders_Id.ORDER_LINE_IN_OUTBOUND_LINES_GRID, warehouseCnxt.orderLine[0]);
            await this.pause(2);
            await LNCommon.navigateToLNReferences(LNSessionCodes.OUTBOUND_LINES, LNMenuActions_Lbl.INTERCOMPANY_TRADE_ORDER,
                LNMenuActions_Lbl.PURCHASE_);

            // Verifying the Session title
            await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_ORDER_PURCHASE);

            await LNCommon.navigateToLNReferences(LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE,
                LNMenuActions_Lbl.INTERCOMPANY_TRADE_ORDER_DETAILS);

            // Verifying the Session title
            await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_ORDER_PURCHASE);

            // Fetching and Printing the Intercompany Trade number
            warehouseCnxt.intercompanyTradeNumPurchase = await (await LNCommon
                .getTextField(Orders_Lbl.ORDER_IN_INTERCOMPANY_TRADE_ORDER_PURCHASE,
                    Orders_Id.ORDER_IN_INTERCOMPANY_TRADE_ORDER_PURCHASE,
                    LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL))
                .inputValue();

            console.log("=========>>>>> The Intercompany Trade number for Purchase is "
                + warehouseCnxt.intercompanyTradeNumPurchase + " <<<<<=========");

            // Verifying the Price Origin in Intercompany Trade and Agreement Tab
            const tab = [
                LNTabs.INTERCOMPANY_TRADE,
                LNTabs.AGREEMENT,
            ];

            // Define the priceOrigin labels array
            const priceOriginLbl = [
                Orders_Lbl.INTERCOMPANY_TRADE_PRICE_ORIGIN_DRP,
                Orders_Lbl.AGREEMENT_PRICE_ORIGIN_DRP,
            ];

            // Define the priceOrigin IDs array
            const priceOriginId = [
                Orders_Id.INTERCOMPANY_TRADE_PRICE_ORIGIN_DRP,
                Orders_Id.AGREEMENT_PRICE_ORIGIN_DRP,
            ];
            for (let i = 0; i < tab.length; i++) {
                await LNCommon.selectHeaderTab(tab[i], LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL);

                await expect(async () => {
                    expect(await (await commonPg.dropdownValueLabel(priceOriginLbl[i], priceOriginId[i])).innerText(), `${warehouseCnxt.priceOrigin} is not selected from dropdown`)
                        .toBe(warehouseCnxt.priceOrigin);
                }).toPass({ timeout: 10000 });

            }

            // Verifying the Details in Project/Item tab
            await LNCommon.selectHeaderTab(LNTabs.PROJECT_ITEM, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL);

            expect(await LNCommon
                .getTextField(Orders_Lbl.FROM_ITEM_IN_PROJECT_ITEM_TAB,
                    Orders_Id.FROM_ITEM_IN_PROJECT_ITEM_TAB_SEGMENT_TWO,
                    LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL), `The From Item is not ${warehouseCnxt.items[0]}`).toHaveValue(warehouseCnxt.items[0]);

            // Verifying the Details in Operational tab
            await LNCommon.selectHeaderTab(LNTabs.OPERATIONAL, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL);

            expect(await LNCommon
                .getTextField(Orders_Lbl.SHIP_FROM_ADDRESS_IN_OPERATIONAL_TAB,
                    Orders_Id.SHIP_FROM_ADDRESS_IN_OPERATIONAL_TAB,
                    LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL), `The Ship From address is not ${warehouseCnxt.addresses[0]}`).toHaveValue(warehouseCnxt.addresses[0]);

            expect(await LNCommon
                .getTextField(Orders_Lbl.SHIP_TO_ADDRESS_IN_OPERATIONAL_TAB,
                    Orders_Id.SHIP_TO_ADDRESS_IN_OPERATIONAL_TAB,
                    LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL), `The Ship To address is not ${warehouseCnxt.addresses[1]}`).toHaveValue(warehouseCnxt.addresses[1]);

            // Verifying the Details in Buying Information tab
            await LNCommon.selectHeaderTab(LNTabs.BUYING_INFORMATION, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL);

            expect(await LNCommon
                .getTextField(Orders_Lbl.BUY_FROM_ADDRESS_IN_BUYING_INFORMATION_TAB,
                    Orders_Id.BUY_FROM_ADDRESS_IN_BUYING_INFORMATION_TAB,
                    LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL), `The Buy From address is not ${warehouseCnxt.addresses[0]}`).toHaveValue(warehouseCnxt.addresses[0]);

            expect(await LNCommon
                .getTextField(Orders_Lbl.INVOICE_FROM_ADDRESS_IN_BUYING_INFORMATION_TAB,
                    Orders_Id.INVOICE_FROM_ADDRESS_IN_BUYING_INFORMATION_TAB,
                    LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL), `The Invoice From address is not ${warehouseCnxt.addresses[0]}`)
                .toHaveValue(warehouseCnxt.addresses[0]);

            // Verifying the Details in Tax, Pricing, Hours Expenses, Freight, Fianancial
            // tab
            const tabs = [LNTabs.TAX, LNTabs.PRICING, LNTabs.HOURS_EXPENSES, LNTabs.FREIGHT, LNTabs.FINANCIAL];
            for (let i = 0; i < tabs.length; i++) {
                await LNCommon.selectHeaderTab(tabs[i], LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL);
                //screenshot(tabs[i] + " Tab Details");
            }

            // Verifying the Control tab details
            await LNCommon.selectHeaderTab(LNTabs.CONTROL, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL);

            expect(await LNCommon
                .getTextField(Orders_Lbl.USER_IN_CONTROL_TAB, Orders_Id.USER_IN_CONTROL_TAB,
                    LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL), `The user field does not contain 3270st02`)
                .toHaveValue("3270st02");

            await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL,
                LNMenuActions_Id.SAVE_AND_EXIT);

            //screenshot("Review intercompany trade order - purchase (by sales center)");

            await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE, LNMenuActions_Id.SAVE_AND_EXIT);

            // Close LN Module
            await LNCommon.collapseLNModule(LNSessionTabs.WAREHOUSING);

            console.log(
                "=========>>>>> Review intercompany trade order - purchase (by sales center) completed sucessfully <<<<<=========");

            /*-------------------------------------------------------------------------------------
             * Objective : Calling the function as its dependant on the 2 methods above
             * Exercises : 3.2.3
             * ------------------------------------------------------------------------------------*/
            await LNWarehousing.reviewIntercompanyTradeOrderSalesByDistributionCenter(warehouseCnxt);

            console.log("=========>>>>> Ship warehouse transfer (by distribution center) started <<<<<=========");

            await LNCommon.selectRequiredRecord(LNSessionCodes.OUTBOUND_LINES, Orders_Lbl.ORDER_LINE_IN_OUTBOUND_LINES_GRID,
                Orders_Id.ORDER_LINE_IN_OUTBOUND_LINES_GRID, warehouseCnxt.orderLine[0]);
            await LNCommon.clickTextMenuItem(LNSessionCodes.WAREHOUSING_ORDER, LNMenuActions_Id.PROCESS_WAREHOUSING_ORDER,
                LNMenuActions_Lbl.PROCESS_WAREHOUSING_ORDER);

            //screenshot("Ship warehouse transfer (by distribution center)");

            console.log(
                "=========>>>>> Ship warehouse transfer (by distribution center) completed sucessfully <<<<<=========");

            console.log(
                "=========>>>>> Review the intercompany trade order transaction line (by sales center) started <<<<<=========");

            await LNCommon.selectRequiredRecord(LNSessionCodes.OUTBOUND_LINES, Orders_Lbl.ORDER_LINE_IN_OUTBOUND_LINES_GRID,
                Orders_Id.ORDER_LINE_IN_OUTBOUND_LINES_GRID, warehouseCnxt.orderLine[0]);

            await this.page.waitForTimeout(1000);
            await LNCommon.navigateToLNReferences(LNSessionCodes.OUTBOUND_LINES, LNMenuActions_Lbl.INTERCOMPANY_TRADE_ORDER,
                LNMenuActions_Lbl.PURCHASE_);

            // Verifying the Session title
            await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_ORDER_PURCHASE);

            await LNCommon.selectGridTab(LNTabs.TRANSACTION_LINES, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE);

            // Verifying the Transaction line
            expect(await this.isElementPresent(await commonPg.gridCell(
                LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_ORDER_PURCHASE,
                OrderIntakeWorkbench_Id.TRANSACTION_LINE_GRID)), "The transaction line in Transaction lines tab is missing").toBeTruthy();

            // Verifying the Received Amount
            const rowNum = await LNCommon.selectRequiredRecord(
                LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_ORDER_PURCHASE, Orders_Lbl.TRANSACTION_LINE_GRID,
                Orders_Id.TRANSACTION_LINE_GRID, warehouseCnxt.transactionLine);

            expect(await LNCommon.getRequiredValueFromTheGrid(
                LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_ORDER_PURCHASE,
                Orders_Lbl.RECEIVED_AMOUNT_GRID, Orders_Id.RECEIVED_AMOUNT_GRID, rowNum)).not.toBe('');

            await LNCommon.drilldownRequiredRecord(LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_ORDER_PURCHASE,
                String(rowNum));

            // Verifying the Session title
            await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_ORDER_TRANSACTION_LINE_PURCHASE);

            // Verifying the Order number
            expect(await (await LNCommon
                .getTextField(Orders_Lbl.ORDER_IN_TRANSACTION_LINE_PURCHASE,
                    Orders_Id.ORDER_IN_TRANSACTION_LINE_PURCHASE_SEGMENT_TWO,
                    LNSessionCodes.INTERCOMPANY_TRADE_ORDER_TRANSACTION_LINE_PURCHASE))
                .inputValue(), `The Order number is not " + ${warehouseCnxt.intercompanyTradeNumPurchase}`)
                .toBe(warehouseCnxt.intercompanyTradeNumPurchase);

            //screenshot("Review the intercompany trade order transaction line (by sales center)");

            await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_ORDER_TRANSACTION_LINE_PURCHASE,
                LNMenuActions_Id.SAVE_AND_EXIT);
            await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE, LNMenuActions_Id.SAVE_AND_EXIT);
            await LNCommon.clickMainMenuItem(LNSessionCodes.WAREHOUSING_ORDER, LNMenuActions_Id.SAVE_AND_EXIT);
            await LNCommon.clickMainMenuItem(LNSessionCodes.WAREHOUSING_ORDERS, LNMenuActions_Id.SAVE_AND_EXIT);

            // Close LN Module
            await LNCommon.collapseLNModule(LNSessionTabs.WAREHOUSING);

            console.log(
                "=========>>>>> Review the intercompany trade order transaction line (by sales center) completed sucessfully <<<<<=========");
        // } catch (e) {
        //     console.error(e.stack);
        // }
    }
    // Exercises : 3.2.3
    static async reviewIntercompanyTradeOrderSalesByDistributionCenter(warehouseCnxt) {

        try {
            // Initialising page elements
            let commonPg = new LNPage(this.page);

            console.log(
                "=========>>>>> Review intercompany trade order - sales (by distribution center) started <<<<<=========");

            // Navigating to Common --> Intercompany Trade --> Sales Workbench
            await LNCommon.navigateToLNModule(LNSessionTabs.COMMON, LNSessionTabs.INTERCOMPANY_TRADE,
                LNSessionTabs.SALES_WORKBENCH);

            // Verify Session Tab
            await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_SALES_WORKBENCH);

            // Verifying the sections and Clearing Enterprise Unit fields
            const sections = [SalesWorkbench_Lbl.FINANCIAL_ENTITY, SalesWorkbench_Lbl.INTERCOMPANY_CUSTOMER];
            const euLbl = [SalesWorkbench_Lbl.ENTERPRISE_UNIT_FINANCIAL_ENTITY,
            SalesWorkbench_Lbl.ENTERPRISE_UNIT_FINANCIAL_ENTITY];
            const euId = [SalesWorkbench_Id.ENTERPRISE_UNIT_INTERCOMPANY_CUSTOMER,
            SalesWorkbench_Id.ENTERPRISE_UNIT_INTERCOMPANY_CUSTOMER];

            for (let i = 0; i < sections.length; i++) {

                expect(await this.isElementPresent(await commonPg.verifyHeader(sections[i]))).toBeTruthy();
                await (await (await LNCommon.getTextField(euLbl[i], euId[i], LNSessionCodes.INTERCOMPANY_TRADE_SALES_WORKBENCH)).first()).clear();

            }

            await LNCommon.selectHeaderTab(LNTabs.ADDITIONAL, LNSessionCodes.INTERCOMPANY_TRADE_SALES_WORKBENCH);

            await this.page.waitForTimeout(1000);
            await (await commonPg.statFieldButton(LNSessionCodes.INTERCOMPANY_TRADE_SALES_WORKBENCH,
                SalesWorkbench_Lbl.INTERNAL_MATERIAL_DELIVERY)).click();

            await LNCommon.updateDefaultFilter(SalesWorkbench_Id.ORDER_IN_ORDERS_SEGMENT_TWO_GRID,
                LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_SALES, LNCommons.CONTAINS);
            await LNCommon.filterRequiredRecord(SalesWorkbench_Lbl.ORDER_IN_ORDERS_GRID,
                SalesWorkbench_Id.ORDER_IN_ORDERS_SEGMENT_TWO_GRID,
                LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_SALES,
                warehouseCnxt.intercompanyTradeNumPurchase.substring(warehouseCnxt.intercompanyTradeNumPurchase.length - 2));
            await LNCommon.drilldownRequiredRecord(LNSessionCodes.ORDERS_IN_INTERCOMPANY_TRADE_SALES,
                LNCommons.FIRST_RECORD);

            // Verify Session Tab
            await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_ORDER_SALES);

            await LNCommon.navigateToLNReferences(LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES,
                LNMenuActions_Lbl.INTERCOMPANY_TRADE_ORDER_DETAILS);

            // Verify Session Tab
            await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_ORDER_SALES);

            // Verifying the Details on Intercompany Trade tab
            await LNCommon.selectHeaderTab(LNTabs.INTERCOMPANY_TRADE, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES_DETAIL);

            expect(await LNCommon
                .getTextField(SalesWorkbench_Lbl.FROM_ENTERPRISE_UNIT, SalesWorkbench_Id.FROM_ENTERPRISE_UNIT,
                    LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES_DETAIL), `The From Enterprise Unit is not ${warehouseCnxt.enterpriseUnits[0]}`).toHaveValue(warehouseCnxt.enterpriseUnits[0]);

            // Verifying the Details on Agreement tab
            await LNCommon.selectHeaderTab(LNTabs.AGREEMENT, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES_DETAIL);

            expect(await this.isElementPresent(await commonPg.verifyHeader(
                SalesWorkbench_Lbl.TRANSFER_PRICING_RULES)), `${SalesWorkbench_Lbl.TRANSFER_PRICING_RULES} section is not found`).toBeTruthy();

            expect(await (await (await LNCommon
                .getTextField(SalesWorkbench_Lbl.MARKUP_PERCENTAGE, SalesWorkbench_Id.MARKUP_PERCENTAGE,
                    LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES_DETAIL)).first())
                .inputValue(), "The Markup Percentage field is empty").not.toBe('');

            // Verifying the Details on Financial tab
            await LNCommon.selectHeaderTab(LNTabs.FINANCIAL, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES_DETAIL);

            expect(await this.isElementPresent(await commonPg.verifyHeader(SalesWorkbench_Lbl.ESTIMATED_AMOUNTS)), `${SalesWorkbench_Lbl.ESTIMATED_AMOUNTS} section is not found`).toBeTruthy();

            expect(await commonPg.valueInTabular(SalesWorkbench_Lbl.MARGIN,
                SalesWorkbench_Id.MARGIN, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES_DETAIL), "The Markup Percentage field is empty").not.toBeEmpty();

            //screenshot("Review intercompany trade order - sales (by distribution center)");

            await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES_DETAIL,
                LNMenuActions_Id.SAVE_AND_EXIT);
            await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES, LNMenuActions_Id.SAVE_AND_EXIT);
            await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_SALES_WORKBENCH, LNMenuActions_Id.SAVE_AND_EXIT);

            // Verify Session Tab
            await LNCommon.verifySessionTab(LNSessionTabs.WAREHOUSING_ORDER);

            // Close LN Module
            await LNCommon.collapseLNModule(LNSessionTabs.COMMON);

            console.log(
                "=========>>>>> Review intercompany trade order - sales (by distribution center) completed sucessfully <<<<<=========");
        } catch (e) {
            console.error(e.stack);
        }
    }

}

export default LNWarehousing;