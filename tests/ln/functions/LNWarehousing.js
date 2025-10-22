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
import LNSessionTabActions from "./LNSessionTabActions";

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

/**
 * Objective : Unhide Project activity fields and Cost Component fields in the warehouse orders session
 * Workbook  : LN Cloud: Configuring Multisite Environment
 * Exercises : 3.4.4
 */
static async unhideProjectActivityFieldsAndCostComponentFieldsInWarehouseOrdersSession(orderNo, orderLine, personalizeColumns) {
  console.log("=========>>>>> Unhide Project activity fields and Cost Component fields in the warehouse orders session started <<<<<=========");

  // Initialising page elements
  const commonPg = new LNPage(this.page);
  // Navigate to Warehousing > Orders > Orders
  await LNCommon.navigateToLNModule(LNSessionTabs.WAREHOUSING, LNSessionTabs.ORDERS, LNSessionTabs.ORDERS);

  // Verify Warehousing Orders session tab
  await LNCommon.verifySessionTab(LNSessionTabs.WAREHOUSING_ORDERS);

  // Filter and select the order record
  await LNCommon.filterRequiredRecord(Orders_Lbl.ORDER_GRID, Orders_Id.ORDER_GRID, LNSessionCodes.WAREHOUSING_ORDERS, orderNo);
  const rowNo = await LNCommon.selectRequiredRecord(LNSessionCodes.WAREHOUSING_ORDERS, Orders_Lbl.ORDER_GRID, Orders_Id.ORDER_GRID, orderNo);
  await LNCommon.drilldownRequiredRecord(LNSessionCodes.WAREHOUSING_ORDERS, String(rowNo));

  // Verify Warehousing Order session tab
  await LNCommon.verifySessionTab(LNSessionTabs.WAREHOUSING_ORDER);

  // Select Outbound Lines tab in the Warehousing Order session
  await LNCommon.selectGridTab(LNTabs.OUTBOUND_LINES, LNSessionCodes.WAREHOUSING_ORDER);

  // Select the required order line
  await LNCommon.selectRequiredRecord(LNSessionCodes.OUTBOUND_LINES, Orders_Lbl.ORDER_LINE_IN_OUTBOUND_LINES_GRID, Orders_Id.ORDER_LINE_IN_OUTBOUND_LINES_GRID, orderLine);

  // Click the Personalize button in the Outbound Lines menu bar
  await LNCommon.clickMainMenuItem(LNSessionCodes.OUTBOUND_LINES, LNMenuActions_Id.PERSONALIZE);

  // Click Personalizations option and then Personalize Form list item
  await forceClick(await getDynamicElement(commonPg.personalizationOptions, LNSessionCodes.OUTBOUND_LINES, LNMenuActions_Lbl.PERSONALIZATION));
  await page.waitForTimeout(2000);
  await forceClick(await getDynamicElement(commonPg.personalizationOptions, LNSessionCodes.OUTBOUND_LINES, LNMenuActions_Lbl.PERSONALIZE_FORM));
  await page.waitForTimeout(7000);

  // Verify Outbound Order Lines (Personalization) session tab is open
  await LNCommon.verifySessionTab(LNSessionTabs.OUTBOUND_ORDER_LINES_PERSONALIZATION);

  // Click All tab in personalization window
  await commonPg.allTab.click();
  await page.waitForTimeout(2000);

  // Loop through each column to personalize/unhide
  for (const columnName of personalizeColumns) {
    // Clear and type the column name in the filter input (simulate sendKeys + TAB)
    await commonPg.allFilter.fill('');
    await commonPg.allFilter.type(columnName);
    await page.keyboard.press('Tab');
    await page.waitForTimeout(2000);

    // Select checkbox for the personalize column if not selected
    const isCheckboxSelected = (await commonPg.allCheckBox.getAttribute('class')).toLowerCase().includes(LNCommons.SELECTED.toLowerCase());
    if (!isCheckboxSelected) {
      await commonPg.allCheckBox.click();
    }

    // Clear the Hidden checkbox if it is selected
    const isHiddenChecked = (await commonPg.hiddenCheckbox.getAttribute('class')).includes(LNCommons.CHECKED);
    if (isHiddenChecked) {
      await commonPg.hiddenCheckbox.click();
      await page.waitForTimeout(1000);
    }

    // Verify Hidden checkbox is cleared
    const hiddenClass = await commonPg.hiddenCheckbox.getAttribute('class');
    if (hiddenClass.includes(LNCommons.CHECKED)) {
      throw new Error(`Hidden checkbox is not cleared for ${columnName}`);
    }

    // Clear checkbox for the personalize column if it is selected
    const stillSelected = (await commonPg.allCheckBox.getAttribute('class')).toLowerCase().includes(LNCommons.SELECTED.toLowerCase());
    if (stillSelected) {
      await commonPg.allCheckBox.click();
    }
  }

  // Click Save Changes and Exit button
  await commonPg.personalizationSave.click();
  await page.waitForTimeout(2000);

  // Validate the popup message and click OK
  await LNCommon.validateMessageAndHandlePopUpIfExists(LNPopupMsg.PERSONALIZATION_SAVED, LNCommons.OK);
  await page.waitForTimeout(3000);

  // Verify Warehousing Order session tab is displayed
  await LNCommon.verifySessionTab(LNSessionTabs.WAREHOUSING_ORDER);

  // Take screenshot for evidence
  await page.screenshot({ path: "Unhide_Project_Activity_and_Cost_Component_Fields.png" });

  // Close Warehousing Order tab
  await LNSessionTabActions.closeTab(LNSessionTabs.WAREHOUSING_ORDER);

  // Verify Warehousing Orders session tab
  await LNCommon.verifySessionTab(LNSessionTabs.WAREHOUSING_ORDERS);

  // Close Warehousing Orders tab
  await LNSessionTabActions.closeTab(LNSessionTabs.WAREHOUSING_ORDERS);

  // Collapse Warehousing LN module
  await LNCommon.collapseLNModule(LNSessionTabs.WAREHOUSING);

  console.log("=========>>>>> Unhide Project activity fields and Cost Component fields in the warehouse orders session completed successfully <<<<<=========");
}
/**
 * Objective : Create warehouse transfer (Boston Warehouse to Project PRJ000003)
 * Workbook  : LN Cloud: Configuring Multisite Environment
 * Exercises : 3.4.5
 */
static async createWarehouseTransferBostonWarehouseToProject(warehouseCnxt) {
  console.log("=========>>>>> Create warehouse transfer (Boston Warehouse to Project PRJ000003) started <<<<<=========");

   // Initialising page elements
  const commonPg = new LNPage(this.page);
  // Navigate to Warehousing > Orders > Orders
  await LNCommon.navigateToLNModule(LNSessionTabs.WAREHOUSING, LNSessionTabs.ORDERS, LNSessionTabs.ORDERS);

  // Verify Warehousing Orders tab
  await LNCommon.verifySessionTab(LNSessionTabs.WAREHOUSING_ORDERS);

  // Click New button
  await LNCommon.clickMainMenuItem(LNSessionCodes.WAREHOUSING_ORDERS, LNMenuActions_Id.NEW);

  // Verify Warehousing Order tab
  await LNCommon.verifySessionTab(LNSessionTabs.WAREHOUSING_ORDER);

  // Select Orders dropdown field
  await LNCommon.clickAndSelectDropdownField(Orders_Lbl.ORDER_DRP, Orders_Id.ORDER_DRP, warehouseCnxt.orders);

  // Select Transaction Type dropdown field
  await LNCommon.clickAndSelectDropdownField(Orders_Lbl.TRANSACTION_TYPE_DRP, Orders_Id.TRANSACTION_TYPE_DRP, warehouseCnxt.transactionType);

  // Verify Ship From header visible
  const isShipFromVisible = await this.isElementPresent (await commonPg.verifyHeader, Orders_Lbl.SHIP_FROM);
  if (!isShipFromVisible) throw new Error(`${Orders_Lbl.SHIP_FROM} header is not found`);

  // Click zoom icon in Ship From Code field (3rd segment)
  await LNCommon.getTextboxLookUpIcon(Orders_Lbl.CODE, Orders_Id.SHIP_FROM_CODE_SEGMENT_THREE, LNSessionCodes.WAREHOUSING_ORDER).click();

  // Verify Warehouses dialog is open
  await LNCommon.verifyDialogBoxWindow(LNSessionTabs.WAREHOUSES);

  // Filter and select warehouse in Warehouses dialog
  await LNCommon.filterRequiredRecord(Orders_Lbl.WAREHOUSE_GRID, Orders_Id.WAREHOUSE_SEGMENT_TWO_ZOOM_GRID, LNSessionCodes.WAREHOUSES, warehouseCnxt.shipFrWhs[0]);
  await LNCommon.selectRequiredRecord(LNSessionCodes.WAREHOUSES, Orders_Lbl.WAREHOUSE_GRID, Orders_Id.WAREHOUSE_GRID, warehouseCnxt.shipFrWhs[1]);

  // Click OK in Warehouses dialog
  await LNCommon.clickTextMenuItem(LNSessionCodes.WAREHOUSES, LNMenuActions_Id.OK, LNMenuActions_Lbl.OK);

  // Verify Warehousing Order tab again
  await LNCommon.verifySessionTab(LNSessionTabs.WAREHOUSING_ORDER);

  // Verify Ship To header visible
  const isShipToVisible = await CommonFunctions.isDynamicElementPresent(commonPg.verifyHeader, Orders_Lbl.SHIP_TO);
  if (!isShipToVisible) throw new Error(`${Orders_Lbl.SHIP_TO} header is not found`);

  // Click zoom icon in Ship To Code field (3rd segment)
  await LNCommon.getTextboxLookUpIcon(Orders_Lbl.CODE_SHIP_TO, Orders_Id.CODE_SHIP_TO_THREE_SEG, LNSessionCodes.WAREHOUSING_ORDER).click();

  // Verify Projects dialog is open
  await LNCommon.verifyDialogBoxWindow(LNSessionTabs.PROJECTS);

  // Filter and select project in Projects dialog
  await LNCommon.filterRequiredRecord(Orders_Lbl.PROJECT_DESCRIPTION_ZOOM_GRID, Orders_Id.PROJECT_DESCRIPTION_ZOOM_GRID, LNSessionCodes.PROJECTS, warehouseCnxt.shipToWhs);
  await LNCommon.selectRequiredRecord(LNSessionCodes.PROJECTS, Orders_Lbl.PROJECT_DESCRIPTION_ZOOM_GRID, Orders_Id.PROJECT_DESCRIPTION_ZOOM_GRID, warehouseCnxt.shipToWhs);

  // Click OK in Projects dialog
  await LNCommon.clickTextMenuItem(LNSessionCodes.PROJECTS, LNMenuActions_Id.OK, LNMenuActions_Lbl.OK);

  // Verify Warehousing Order tab again
  await LNCommon.verifySessionTab(LNSessionTabs.WAREHOUSING_ORDER);

  // Click Save
  await LNCommon.clickMainMenuItem(LNSessionCodes.WAREHOUSING_ORDER, LNMenuActions_Id.SAVE);

  // Handle popup about no distance defined
  await LNCommon.validateMessageAndHandlePopUp(LNPopupMsg.NO_DISTANCE_HAS_BEEN_DEFINED_BETWEEN_THE_ADDRESSES, LNCommons.OK);

  // Select Outbound Lines tab
  await LNCommon.selectGridTab(LNTabs.OUTBOUND_LINES, LNSessionCodes.WAREHOUSING_ORDER);

  // Click New Outbound Line button
  await LNCommon.clickMainMenuItem(LNSessionCodes.OUTBOUND_LINES, LNMenuActions_Id.NEW);

  // Verify order line present
  const isOrderLinePresent = await LNCommon.isRequiredRowPresent(LNSessionCodes.OUTBOUND_LINES, Orders_Lbl.ORDER_LINE_IN_OUTBOUND_LINES_GRID, Orders_Id.ORDER_LINE_IN_OUTBOUND_LINES_GRID, warehouseCnxt.orderLine[0]);
  if (!isOrderLinePresent) throw new Error(`Order line number is not ${warehouseCnxt.orderLine[0]}`);

  // Set Item field value for first row (index 0)
  await LNCommon.dataCellElement(LNCommon.getDataCell(Orders_Lbl.ITEM_GRID, Orders_Id.ITEM_IN_OUTBOUND_LINES_SEGMENT_TWO_GRID, LNSessionCodes.OUTBOUND_LINES), 0, warehouseCnxt.item);

  // Set Ordered Quantity for first row (index 0)
  await LNCommon.dataCellElement(LNCommon.getDataCell(Orders_Lbl.ORDERED_QUANTITY_GRID, Orders_Id.ORDERED_QUANTITY_GRID, LNSessionCodes.OUTBOUND_LINES), 0, warehouseCnxt.orderedQty);

  // Send TAB keys (simulate navigation)
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');

  // Click zoom icon in To Activity grid cell
  await LNCommon.getTextboxLookUpIconInGrid(Orders_Lbl.TO_ACTIVITY_GRID, Orders_Id.TO_ACTIVITY_GRID, LNSessionCodes.OUTBOUND_LINES).click();

  // Verify Activities dialog
  await LNCommon.verifyDialogBoxWindow(LNSessionTabs.ACTIVITIES);

  // Filter and select activity
  await LNCommon.filterRequiredRecord(Orders_Lbl.ACTIVITY_ZOOM_GRID, Orders_Id.ACTIVITY_ZOOM_GRID, LNSessionCodes.ACTIVITIES_LINES, warehouseCnxt.activity);
  await LNCommon.selectRequiredRecord(LNSessionCodes.ACTIVITIES_LINES, Orders_Lbl.ACTIVITY_ZOOM_GRID, Orders_Id.ACTIVITY_ZOOM_GRID, warehouseCnxt.activity);

  // Click OK in Activities dialog
  await LNCommon.clickTextMenuItem(LNSessionCodes.ACTIVITIES_LINES, LNMenuActions_Id.OK, LNMenuActions_Lbl.OK);

  // Send one TAB key
  await page.keyboard.press('Tab');

  // Click zoom icon in To Cost Component grid cell
  await LNCommon.getTextboxLookUpIconInGrid(Orders_Lbl.TO_COST_COMPONENT_GRID, Orders_Id.TO_COST_COMPONENT_GRID, LNSessionCodes.OUTBOUND_LINES).click();

  // Verify Cost Components dialog
  await LNCommon.verifyDialogBoxWindow(LNSessionTabs.COST_COMPONENTS);

  // Filter and select cost component
  await LNCommon.filterRequiredRecord(Orders_Lbl.COST_COMPONENT_ZOOM_GRID, Orders_Id.COST_COMPONENT_ZOOM_GRID, LNSessionCodes.COST_COMPONENTS, warehouseCnxt.costComponent);
  await LNCommon.selectRequiredRecord(LNSessionCodes.COST_COMPONENTS, Orders_Lbl.COST_COMPONENT_ZOOM_GRID, Orders_Id.COST_COMPONENT_ZOOM_GRID, warehouseCnxt.costComponent);

  // Click OK in Cost Components dialog
  await LNCommon.clickTextMenuItem(LNSessionCodes.COST_COMPONENTS, LNMenuActions_Id.OK, LNMenuActions_Lbl.OK);

  // Select the order line in Outbound Lines tab
  await LNCommon.selectRequiredRecord(LNSessionCodes.OUTBOUND_LINES, Orders_Lbl.ORDER_LINE_IN_OUTBOUND_LINES_GRID, Orders_Id.ORDER_LINE_IN_OUTBOUND_LINES_GRID, warehouseCnxt.orderLine[0]);

  // Navigate to References > Intercompany Trade Order > Sales
  await LNCommon.navigateToLNReferences(LNSessionCodes.OUTBOUND_LINES, LNMenuActions_Lbl.INTERCOMPANY_TRADE_ORDER, LNMenuActions_Lbl.SALES);

  // Verify Intercompany Trade Order - Sales tab
  await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_ORDER_SALES);

  // Store Intercompany trade number from Order field
  warehouseCnxt.intercompanyTradeNumSales = await LNCommon.getTextFieldAttribute(Orders_Lbl.ORDER, Orders_Id.ORDER_IN_INTERCOMPANY_TRADE_ORDER_SALES, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES, 'value');

  console.log(`=========>>>>> The Intercompany trade number for sales is ${warehouseCnxt.intercompanyTradeNumSales} <<<<<=========`);

  // Click Save changes and exit button
  await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_ORDER_SALES, LNMenuActions_Id.SAVE_AND_EXIT);

  // Verify Warehousing Order tab
  await LNCommon.verifySessionTab(LNSessionTabs.WAREHOUSING_ORDER);

  // Store Order number
  warehouseCnxt.order = await LNCommon.getTextFieldAttribute(Orders_Lbl.ORDER, Orders_Id.ORDER, LNSessionCodes.WAREHOUSING_ORDER, 'value');
  console.log(`=========>>>>> The Order number for sales is ${warehouseCnxt.order} <<<<<=========`);

  // Take screenshot
  await page.screenshot({ path: "Create_Warehouse_Transfer_Boston_Project.png" });

  // Close Warehousing Order tab
  await LNSessionTabActions.closeTab(LNSessionTabs.WAREHOUSING_ORDER);

  // Verify Warehousing Orders tab
  await LNCommon.verifySessionTab(LNSessionTabs.WAREHOUSING_ORDERS);

  // Close Warehousing Orders tab
  await LNSessionTabActions.closeTab(LNSessionTabs.WAREHOUSING_ORDERS);

  // Collapse Warehousing module
  await LNCommon.collapseLNModule(LNSessionTabs.WAREHOUSING);

  console.log("=========>>>>> Create warehouse transfer (Boston Warehouse to Project PRJ000003) completed successfully <<<<<=========");
}

/*-----------------------------------------------------------------------------------------------------
 * Objective : Ship warehouse transfer (by warehouse)
 * Workbook  : LN Cloud: Configuring Multisite Environment
 * Exercises : 3.4.7
 * ----------------------------------------------------------------------------------------------------*/
static async shipWarehouseTransferByWarehouse(warehouseCnxt) {

  // Assuming LNCommon, CommonFunctions, Assertions (or expect) and constants are imported and usable

  console.info("=========>>>>> Ship warehouse transfer (by warehouse) started <<<<<=========");

  // Navigating to Warehousing ---> Orders ---> Orders
  await LNCommon.navigateToLNModule(LNSessionTabs.WAREHOUSING,LNSessionTabs.ORDERS,LNSessionTabs.ORDERS);

  // Verify Session Tab
  await LNCommon.verifySessionTab(LNSessionTabs.WAREHOUSING_ORDERS);

  // Apply dropdown filter on Order Origin
  await LNCommon.clickAndSelectDropdownFieldGridFilter(Orders_Id.ORDER_ORIGIN_DRP_GRID,warehouseCnxt.orders,Orders_Lbl.ORDER_ORIGIN_DRP_GRID,LNSessionCodes.WAREHOUSING_ORDERS);

  // Filter required record based on warehouseCnxt.order
  await LNCommon.filterRequiredRecord(Orders_Lbl.ORDER_GRID,Orders_Id.ORDER_GRID,LNSessionCodes.WAREHOUSING_ORDERS,warehouseCnxt.order);

  // Select required record row number for the order origin dropdown filter value
  const rowNo = await LNCommon.selectRequiredRecord(LNSessionCodes.WAREHOUSING_ORDERS, Orders_Lbl.ORDER_ORIGIN_DRP_GRID,Orders_Id.ORDER_ORIGIN_DRP_GRID, warehouseCnxt.orders );

  // Drill down to details for the selected record
  await LNCommon.drilldownRequiredRecord(LNSessionCodes.WAREHOUSING_ORDERS, String(rowNo));

  // Verify Session Tab switched to Warehousing Order
  await LNCommon.verifySessionTab(LNSessionTabs.WAREHOUSING_ORDER);

  // Select Outbound Lines tab
  await LNCommon.selectGridTab(LNTabs.OUTBOUND_LINES, LNSessionCodes.WAREHOUSING_ORDER);

  // Select required order line checkbox (line 10 from warehouseCnxt.orderLine[0])
  await LNCommon.selectRequiredRecord(LNSessionCodes.OUTBOUND_LINES,Orders_Lbl.ORDER_LINE_IN_OUTBOUND_LINES_GRID,Orders_Id.ORDER_LINE_IN_OUTBOUND_LINES_GRID,warehouseCnxt.orderLine[0]);

  // Click Process button in Outbound Lines menu bar
  await LNCommon.clickTextMenuItem(LNSessionCodes.OUTBOUND_LINES,LNMenuActions_Id.PROCESS_ORDER,LNMenuActions_Lbl.PROCESS_ASSIGNMENT);

  // Pause 10 seconds to wait for processing
  await page.waitForTimeout(10000);

  // Verify the order status changed to "shipped"
  const statusIsShipped = await CommonFunctions.isDynamicElementPresent('statusField',LNSessionCodes.WAREHOUSING_ORDER,Orders_Id.HEADER_STATUS,LNCommons.SHIPPED);

  expect(statusIsShipped).toBeTruthy();

  // Screenshot for evidence
  await page.screenshot({ path: 'Ship_warehouse_transfer_by_warehouse.png', fullPage: true });

  console.info("=========>>>>> Ship warehouse transfer (by warehouse) completed successfully <<<<<=========");
}

/*-----------------------------------------------------------------------------------------------------
 * Objective : Review the intercompany trade order transaction line (by Project)
 * Workbook  : LN Cloud: Configuring Multisite Environment
 * Exercises : 3.4.8
 * ----------------------------------------------------------------------------------------------------*/
static async reviewIntercompanyTradeOrderTransactionLineByProject(warehouseCnxt) {

  // Assuming LNCommon, CommonFunctions, and constants are imported and usable

  console.info("=========>>>>> Review the intercompany trade order transaction line (by Project) started <<<<<=========");

  // Verify Session Tab is Warehousing Order
  await LNCommon.verifySessionTab(LNSessionTabs.WAREHOUSING_ORDER);

  // Select Outbound Lines tab
  await LNCommon.selectGridTab(LNTabs.OUTBOUND_LINES, LNSessionCodes.WAREHOUSING_ORDER);

  // Select required order line checkbox (line 10 from warehouseCnxt.orderLine[0])
  await LNCommon.selectRequiredRecord(LNSessionCodes.OUTBOUND_LINES,Orders_Lbl.ORDER_LINE_IN_OUTBOUND_LINES_GRID,Orders_Id.ORDER_LINE_IN_OUTBOUND_LINES_GRID, warehouseCnxt.orderLine[0]);

  // Navigate to References > Intercompany Trade Order > Purchase
  await LNCommon.navigateToLNReferences(LNSessionCodes.OUTBOUND_LINES,LNMenuActions_Lbl.INTERCOMPANY_TRADE_ORDER,LNMenuActions_Lbl.PURCHASE);

  // Verify Session Tab Intercompany Trade Order - Purchase
  await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_ORDER_PURCHASE);

  // Select Transaction Lines tab
  await LNCommon.selectGridTab(LNTabs.TRANSACTION_LINES, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE);

  // Select required transaction line (line 1 from warehouseCnxt.transactionLine)
  const rowNo = await LNCommon.selectRequiredRecord(LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_ORDER_PURCHASE,Orders_Lbl.TRANSACTION_LINE_GRID,Orders_Id.TRANSACTION_LINE_GRID,warehouseCnxt.transactionLine);

  // Drilldown to transaction line details
  await LNCommon.drilldownRequiredRecord(LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_ORDER_PURCHASE,String(rowNo));

  // Verify Session Tab Intercompany Trade Order Transaction Line - Purchase
  await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_ORDER_TRANSACTION_LINE_PURCHASE);

  // Review data on Transaction Line tab
  await LNCommon.selectHeaderTab(LNTabs.TRANSACTION_LINE,LNSessionCodes.INTERCOMPANY_TRADE_ORDER_TRANSACTION_LINE_PURCHASE);

  const generalSectionPresent = await CommonFunctions.isDynamicElementPresent(page,'verifyHeader',Orders_Lbl.GENERAL);
  expect(generalSectionPresent).toBeTruthy();

  // Review data on Invoice tab
  await LNCommon.selectHeaderTab(LNTabs.INVOICE, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_TRANSACTION_LINE_PURCHASE);

  const purchaseSectionPresent = await CommonFunctions.isDynamicElementPresent(
    page,
    'verifyHeader',
    Orders_Lbl.PURCHASE
  );
  expect(purchaseSectionPresent).toBeTruthy();

  const salesSectionPresent = await CommonFunctions.isDynamicElementPresent(
    page,
    'verifyHeader',
    Orders_Lbl.SALES
  );
  expect(salesSectionPresent).toBeTruthy();

  // Screenshot for documentation
  await page.screenshot({ path: 'Review_intercompany_trade_order_transaction_line_by_project.png', fullPage: true });

  // Click Save changes and exit (4 times navigating back through sessions)
  await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_ORDER_TRANSACTION_LINE_PURCHASE,LNMenuActions_Id.SAVE_AND_EXIT);
  await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_ORDER_PURCHASE);

  await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE,LNMenuActions_Id.SAVE_AND_EXIT );
  await LNCommon.verifySessionTab(LNSessionTabs.WAREHOUSING_ORDER);

  await LNCommon.clickMainMenuItem(LNSessionCodes.WAREHOUSING_ORDER,LNMenuActions_Id.SAVE_AND_EXIT);
  await LNCommon.verifySessionTab(LNSessionTabs.WAREHOUSING_ORDERS);

  await LNCommon.clickMainMenuItem(LNSessionCodes.WAREHOUSING_ORDERS,LNMenuActions_Id.SAVE_AND_EXIT);

  // Close LN Module Warehousing
  await LNCommon.collapseLNModule(LNSessionTabs.WAREHOUSING);

  console.info("=========>>>>> Review the intercompany trade order transaction line (by Project) completed successfully <<<<<=========");
}
}

export default LNWarehousing;