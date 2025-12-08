
import {expect} from '@playwright/test';
import BaseClass, { log } from '../../../testBase/BaseClass';
import LNPage from '../../commons/LNCommonPage';
import LNCommon from '../../commons/LNCommon';
import LNSessionTabs from '../../commons/LNCommonConstants/LNSessionTabs';
import LNTabs from '../../commons/LNCommonConstants/LNTabs';
import LNSessionCodes from '../../commons/LNCommonConstants/LNSessionCodes';
import LNMenuActions_Id from '../constants/elementIds/LNMenuActions_Id';
import OrderIntakeWorkbench_Lbl from '../constants/elementLbls/OrderIntakeWorkbench_Lbl';
import OrderIntakeWorkbench_Id from '../constants/elementIds/OrderIntakeWorkbench_Id';
import LNMenuActions_Lbl from '../constants/elementLbls/LNMenuActions_Lbl';
import toolbar from '../../commons/LNCommonConstants/ToolbarActions';
import LNPopupMsg from '../constants/LNPopupMsg';
import DateFunctions from '../../../commons/functions/DateFunctions';
import TCEDU_LNReviewItemsFromGlobalPrespective from '../scripts/TCEDU_LNReviewItemsFromGlobalPrespective.spec';
import LNCommonFunctions from './LNCommonFunctions';
import Status from '../../commons/LNCommonConstants/Status';

class LNSales extends BaseClass {

  /*-------------------------------------------------------------------------------------
  * Objective : Create a sales order for a selected sales office
  * Workbook  : LN Cloud Configuring Multisite and Intercompany Trade Training Workbook
  * Exercises : 2.5
  * ------------------------------------------------------------------------------------*/
  static async createASalesOrderForASelectedSalesOffice(businessCnxt) {
    const commonPg = new LNPage(this.page);

    console.log("=========>>>>> Create a sales order for a selected sales office started <<<<<=========");

    // Navigate to Sales > Orders > Order Intake Workbench
    await LNCommon.navigateToLNModule(LNSessionTabs.SALES, LNSessionTabs.ORDERS, LNSessionTabs.ORDER_INTAKE_WORKBENCH);
    // Verify Session Tab
    await LNCommon.verifySessionTab(LNSessionTabs.SALES_ORDER_INTAKE_WORKBENCH);
    await LNCommon.selectGridTab(LNTabs.SALES_ORDERS, LNSessionCodes.SALES_ORDER_INTAKE_WORKBENCH);
    await LNCommon.clickMainMenuItem(LNSessionCodes.SALES_ORDER_LINES, LNMenuActions_Id.NEW);

    await LNCommon.verifySessionTab(LNSessionTabs.SALES_ORDER);
    // Verifying the Sold to BP section
    expect(await commonPg.verifyHeader(OrderIntakeWorkbench_Lbl.SOLD_TO_BP_SECTION)).toBeTruthy();

    await (await LNCommon.getTextboxLookUpIcon(OrderIntakeWorkbench_Lbl.BUSINESS_PARTNER, OrderIntakeWorkbench_Id.SALES_ORDER_BUSINESS_PARTNER, LNSessionCodes.SALES_ORDER)).click();
    await LNCommon.verifyDialogBoxWindow(LNSessionTabs.SOLD_TO_BUSINESS_PARTNER);

    await LNCommon.filterRequiredRecord(OrderIntakeWorkbench_Lbl.SOLD_TO_BUSINESS_PARTNER_ZOOM_GRID, OrderIntakeWorkbench_Id.SOLD_TO_BUSINESS_PARTNER_ZOOM_GRID, LNSessionCodes.SOLD_TO_BUSINESS_PARTNER, businessCnxt.businessPartner);
    const rowNum = await LNCommon.selectRequiredRecord(LNSessionCodes.SOLD_TO_BUSINESS_PARTNER, OrderIntakeWorkbench_Lbl.SOLD_TO_BUSINESS_PARTNER_ZOOM_GRID, OrderIntakeWorkbench_Id.SOLD_TO_BUSINESS_PARTNER_ZOOM_GRID, businessCnxt.businessPartner);
    // Verifying the Sold to Business Partner Description
    expect(await LNCommon.getRequiredValueFromTheGrid(LNSessionCodes.SOLD_TO_BUSINESS_PARTNER, OrderIntakeWorkbench_Lbl.SOLD_TO_BUSINESS_PARTNER_ZOOM_GRID, OrderIntakeWorkbench_Id.SOLD_TO_BUSINESS_PARTNER_DESCRIPTION_ZOOM_GRID, rowNum)).toBe(businessCnxt.businessPartnerDesc);

    await LNCommon.clickTextMenuItem(LNSessionCodes.SOLD_TO_BUSINESS_PARTNER, LNMenuActions_Id.OK, LNMenuActions_Lbl.OK);

    await LNCommon.verifySessionTab(LNSessionTabs.SALES_ORDER);
    await this.page.waitForTimeout(1000);
    await this.page.keyboard.press('Tab');

    await this.page.waitForTimeout(1000);
    // Verifying the Address field
    expect(await (await LNCommon.getTextField(OrderIntakeWorkbench_Lbl.ADDRESS, OrderIntakeWorkbench_Id.ADDRESS, LNSessionCodes.SALES_ORDER)).inputValue(), 'The Address field is empty')
      .not.toBe("");

    // Verifying the Order type field
    expect(await (await LNCommon.getTextField(OrderIntakeWorkbench_Lbl.SALES_ORDER_ORDER_TYPE, OrderIntakeWorkbench_Id.SALES_ORDER_ORDER_TYPE, LNSessionCodes.SALES_ORDER)).inputValue()).not.toBe("");

    await (await LNCommon.getTextboxLookUpIcon(OrderIntakeWorkbench_Lbl.SALES_OFFICE, OrderIntakeWorkbench_Id.SALES_OFFICE, LNSessionCodes.SALES_ORDER)).click();
    await LNCommon.verifyDialogBoxWindow(LNSessionTabs.SALES_OFFICES);

    await LNCommon.filterRequiredRecord(OrderIntakeWorkbench_Lbl.SALES_OFFICE_ZOOM_GRID, OrderIntakeWorkbench_Id.SALES_OFFICE_ZOOM_GRID, LNSessionCodes.SALES_OFFICES, businessCnxt.salesOffice);
    await LNCommon.selectRequiredRecord(LNSessionCodes.SALES_OFFICES, OrderIntakeWorkbench_Lbl.SALES_OFFICE_ZOOM_GRID, OrderIntakeWorkbench_Id.SALES_OFFICE_ZOOM_GRID, businessCnxt.salesOffice);
    await LNCommon.clickTextMenuItem(LNSessionCodes.SALES_OFFICES, LNMenuActions_Id.OK, LNMenuActions_Lbl.OK);

    // Verify Session Tab
    await LNCommon.verifySessionTab(LNSessionTabs.SALES_ORDER);

    await LNCommon.clickMainMenuItem(LNSessionCodes.SALES_ORDER, LNMenuActions_Id.SAVE);
    await this.page.waitForTimeout(1000);
    await LNCommon.validateMessageAndHandlePopUpIfExists(LNPopupMsg.DELIVERY_DATE, toolbar.OK);

    // Fetching and Printing the Sales Order Number
    businessCnxt.salesOrderNum = await (await LNCommon.getTextField(OrderIntakeWorkbench_Lbl.NUMBER, OrderIntakeWorkbench_Id.NUMBER, LNSessionCodes.SALES_ORDER)).inputValue();
    log.info("=========>>>>> The sales order number for selected sales office is " + businessCnxt.salesOrderNum + " <<<<<=========");

    await LNCommon.selectGridTab(LNTabs.ORDER_LINES, LNSessionCodes.SALES_ORDER);
    await LNCommon.clickMainMenuItem(LNSessionCodes.SALES_ORDER_LINE, LNMenuActions_Id.NEW);

    // Verifying the Value in the Line field
    expect(await LNCommon.getRequiredValueFromTheGrid(LNSessionCodes.SALES_ORDER_LINE, OrderIntakeWorkbench_Lbl.LINE_GRID, OrderIntakeWorkbench_Id.LINE_IN_ORDER_LINES_GRID, parseInt(LNCommons.FIRST_RECORD))).toBe(businessCnxt.line);

    await this.page.keyboard.press('Tab');
    await this.page.keyboard.press('Tab');

    await LNCommon.dataCellElement(
      await LNCommon.getDataCell(OrderIntakeWorkbench_Lbl.ITEM_GRID, OrderIntakeWorkbench_Id.ITEM_SEGMENT_2_GRID, LNSessionCodes.SALES_ORDER_LINE),
      Number(toolbar.FIRST_RECORD), businessCnxt.item[0]
    );
    //await LNCommon.validateMessageAndHandlePopUpIfExists(LNPopupMsg.SALES_ORDER, LNCommons.OK);
    await LNCommon.clickMainMenuItem(LNSessionCodes.SALES_ORDER, LNMenuActions_Id.SAVE);

    // Verifying the Ordered Quantity
    expect(await LNCommon.getRequiredValueFromTheGrid(LNSessionCodes.SALES_ORDER_LINE, OrderIntakeWorkbench_Lbl.ORDERED_QUANTITY_GRID, OrderIntakeWorkbench_Id.SALES_ORDER_ORDERED_QUANTITY_GRID, parseInt(toolbar.FIRST_RECORD))).not.toBe("");

    await LNCommon.validateMessageAndHandlePopUpIfExists(LNPopupMsg.SALES_ORDER, toolbar.OK);
    await LNCommon.drilldownRequiredRecord(LNSessionCodes.SALES_ORDER_LINE, toolbar.FIRST_RECORD);

    await LNCommon.verifySessionTab(LNSessionTabs.SALES_ORDER_LINES);
    await LNCommon.selectHeaderTab(LNTabs.ITEM, LNSessionCodes.SALES_ORDER_LINE);

    // Verifying the Item details
    expect(await (await LNCommon.getTextField(OrderIntakeWorkbench_Lbl.ITEM, OrderIntakeWorkbench_Id.ITEM_IN_SALES_ORDER_SEG_TWO, LNSessionCodes.SALES_ORDER_LINE)).inputValue()).toBe(businessCnxt.item[0]);

    await LNCommon.selectHeaderTab(LNTabs.SELLING, LNSessionCodes.SALES_ORDER_LINE);
    // Verifying the Selling details
    expect(await (await LNCommon.getTextField(OrderIntakeWorkbench_Lbl.ORDER_DATE, OrderIntakeWorkbench_Id.ORDER_DATE_IN_SALES_ORDER, LNSessionCodes.SALES_ORDER_LINE)).inputValue()).toBe(DateFunctions.getCurrentDate(DateFormats.M_D_YYYY));

    await LNCommon.selectHeaderTab(LNTabs.SHIPPING, LNSessionCodes.SALES_ORDER_LINE);
    // Verifying the Shipping details
    expect(await (await LNCommon.getTextField(OrderIntakeWorkbench_Lbl.SHIP_TO_BUSINESS_PARTNER, OrderIntakeWorkbench_Id.SHIP_TO_BUSINESS_PARTNER, LNSessionCodes.SALES_ORDER_LINE)).inputValue()).toBe(businessCnxt.businessPartner);

    await this.screenshot("Create a sales order for a selected sales office");

    await LNCommon.clickMainMenuItem(LNSessionCodes.SALES_ORDER_LINE, LNMenuActions_Id.SAVE_AND_EXIT);
    await LNCommon.clickMainMenuItem(LNSessionCodes.SALES_ORDER, LNMenuActions_Id.SAVE_AND_EXIT);
    await LNCommon.clickMainMenuItem(LNSessionCodes.SALES_ORDER_INTAKE_WORKBENCH, LNMenuActions_Id.SAVE_AND_EXIT);

    await LNCommon.collapseLNModule(LNSessionTabs.SALES);
    log.info("=========>>>>> Create a sales order for a selected sales office completed successfully <<<<<=========");
  }
  /*---------------------------------------------------------------------------------------
   * Objective : Create sales order (by the sales center)
   * 			       Review intercompany trade order - purchase (by the sales center)
   * 			       Ship sales order (by the distribution center)
   * 			       Review the intercompany trade order transaction line (by the sales center)
   * Workbook  : LN Cloud Configuring Multisite and Intercompany Trade Training Workbook
   * Exercises : 3.1.1, 3.1.2, 3.1.4, 3.1.5
   * --------------------------------------------------------------------------------------*/
  static async createSalesOrderAndReviewIntercompanyTradeOrderPurchaseBySalesCenter(businessCnxt) {

    const commonPg = new LNPage(this.page);

    log.info("=========>>>>> Create sales order (by the sales center) started <<<<<=========");

    // Step 1: Navigate to Sales > Orders > Order Intake Workbench
    await LNCommon.navigateToLNModule(LNSessionTabs.SALES, LNSessionTabs.ORDERS, LNSessionTabs.ORDER_INTAKE_WORKBENCH);

    // Step 2: Verify session tab
    await LNCommon.verifySessionTab(LNSessionTabs.SALES_ORDER_INTAKE_WORKBENCH);

    // Step 3: Click Sales Orders tab
    await LNCommon.selectGridTab(LNTabs.SALES_ORDERS, LNSessionCodes.SALES_ORDER_INTAKE_WORKBENCH);

    // Step 4: Click New Sales Order
    await LNCommon.clickMainMenuItem(LNSessionCodes.SALES_ORDER_LINES, LNMenuActions_Id.NEW);
    await LNCommon.verifySessionTab(LNSessionTabs.SALES_ORDER);

    // Verifying the Sold to BP section
    expect(await commonPg.verifyHeader(OrderIntakeWorkbench_Lbl.SOLD_TO_BP_SECTION), `${OrderIntakeWorkbench_Lbl.SOLD_TO_BP_SECTION} section is not found`)
      .toBeTruthy();

    // Step 5: Click Zoom on Business Partner
    await (await LNCommon.getTextboxLookUpIcon(OrderIntakeWorkbench_Lbl.BUSINESS_PARTNER, OrderIntakeWorkbench_Id.SALES_ORDER_BUSINESS_PARTNER, LNSessionCodes.SALES_ORDER)).click();
    await LNCommon.verifyDialogBoxWindow(LNSessionTabs.SOLD_TO_BUSINESS_PARTNER);

    // Step 6–8: Filter and select MSC000010 MS Cus Chair US
    await LNCommon.filterRequiredRecord(OrderIntakeWorkbench_Lbl.SOLD_TO_BUSINESS_PARTNER_ZOOM_GRID,
      OrderIntakeWorkbench_Id.SOLD_TO_BUSINESS_PARTNER_ZOOM_GRID, LNSessionCodes.SOLD_TO_BUSINESS_PARTNER, businessCnxt.businessPartner);

    // Verifying the Sold to Business Partner Description
    const rowNum = await LNCommon.selectRequiredRecord(LNSessionCodes.SOLD_TO_BUSINESS_PARTNER, OrderIntakeWorkbench_Lbl.SOLD_TO_BUSINESS_PARTNER_ZOOM_GRID, OrderIntakeWorkbench_Id.SOLD_TO_BUSINESS_PARTNER_ZOOM_GRID, businessCnxt.businessPartner);
    expect(await LNCommon.getRequiredValueFromTheGrid(LNSessionCodes.SOLD_TO_BUSINESS_PARTNER, OrderIntakeWorkbench_Lbl.SOLD_TO_BUSINESS_PARTNER_ZOOM_GRID, OrderIntakeWorkbench_Id.SOLD_TO_BUSINESS_PARTNER_DESCRIPTION_ZOOM_GRID, rowNum), 'The Description does not match').toBe(businessCnxt.businessPartnerDesc);

    await LNCommon.clickTextMenuItem(LNSessionCodes.SOLD_TO_BUSINESS_PARTNER, LNMenuActions_Id.OK, LNMenuActions_Lbl.OK);

    // Verify Session Tab
    await LNCommon.verifySessionTab(LNSessionTabs.SALES_ORDER);
    await expect(async () => {
      // Verifying the Business Partner
      expect(await (await LNCommon.getTextField(OrderIntakeWorkbench_Lbl.BUSINESS_PARTNER, OrderIntakeWorkbench_Id.SALES_ORDER_BUSINESS_PARTNER, LNSessionCodes.SALES_ORDER)).inputValue(), 'The Business Partner is not ' + businessCnxt.businessPartner).toBe(businessCnxt.businessPartner);
    }).toPass({ timeout: 10000 });
    // Verifying the Business Partner
    // expect(await (await LNCommon.getTextField(OrderIntakeWorkbench_Lbl.BUSINESS_PARTNER,OrderIntakeWorkbench_Id.SALES_ORDER_BUSINESS_PARTNER,LNSessionCodes.SALES_ORDER)).inputValue(),'The Business Partner is not ' + businessCnxt.businessPartner).toBe(businessCnxt.businessPartner);

    // Step 9: Press TAB
    await this.page.keyboard.press("Tab");

    // Verifying the Address field
    expect(await (await LNCommon.getTextField(OrderIntakeWorkbench_Lbl.ADDRESS, OrderIntakeWorkbench_Id.ADDRESS, LNSessionCodes.SALES_ORDER)).inputValue(), 'The Address field is empty')
      .not.toBeNull();

    // Verifying the Order type field
    expect(await (await LNCommon.getTextField(OrderIntakeWorkbench_Lbl.SALES_ORDER_ORDER_TYPE, OrderIntakeWorkbench_Id.SALES_ORDER_ORDER_TYPE, LNSessionCodes.SALES_ORDER)).inputValue(), 'The Order type field is empty')
      .not.toBeNull();

    // Step 10: Click Zoom on Sales Office
    await (await LNCommon.getTextboxLookUpIcon(OrderIntakeWorkbench_Lbl.SALES_OFFICE, OrderIntakeWorkbench_Id.SALES_OFFICE, LNSessionCodes.SALES_ORDER)).click();
    await LNCommon.verifyDialogBoxWindow(LNSessionTabs.SALES_OFFICES);

    // Adjusting the Filter option to Contains
    await LNCommon.updateDefaultFilter(OrderIntakeWorkbench_Id.SALES_OFFICE_ZOOM_GRID, LNSessionCodes.SALES_OFFICES, toolbar.CONTAINS);

    await LNCommon.filterRequiredRecord(OrderIntakeWorkbench_Lbl.SALES_OFFICE_ZOOM_GRID, OrderIntakeWorkbench_Id.SALES_OFFICE_ZOOM_GRID, LNSessionCodes.SALES_OFFICES, businessCnxt.partialSalesOffice);
    await LNCommon.selectRequiredRecord(LNSessionCodes.SALES_OFFICES, OrderIntakeWorkbench_Lbl.SALES_OFFICE_ZOOM_GRID, OrderIntakeWorkbench_Id.SALES_OFFICE_ZOOM_GRID, businessCnxt.salesOffice);
    await LNCommon.clickTextMenuItem(LNSessionCodes.SALES_OFFICES, LNMenuActions_Id.OK, LNMenuActions_Lbl.OK);

    // Verify Session Tab
    await LNCommon.verifySessionTab(LNSessionTabs.SALES_ORDER);

    // Verifying the Sales Office

    const salesOfficeField = await LNCommon.getTextField(OrderIntakeWorkbench_Lbl.SALES_OFFICE, OrderIntakeWorkbench_Id.SALES_OFFICE, LNSessionCodes.SALES_ORDER);

    await expect(async () => {
      expect(await salesOfficeField.inputValue(), `The Sales Office is not ${businessCnxt.salesOffice}`).toBe(businessCnxt.salesOffice);
    }).toPass({ timeout: 10000 });


    // Step 16: Press TAB
    await this.page.waitForTimeout(2000);
    await this.page.keyboard.press("Tab");

    // Step 17: Save Sales Order
    await LNCommon.clickMainMenuItem(LNSessionCodes.SALES_ORDER, LNMenuActions_Id.SAVE);
    await LNCommon.validateMessageAndHandlePopUpIfExists(LNPopupMsg.DELIVERY_DATE, toolbar.OK);

    // Step 18: Capture Order Number
    businessCnxt.salesOrderNumBySalesOffice = await (await LNCommon.getTextField(OrderIntakeWorkbench_Lbl.NUMBER, OrderIntakeWorkbench_Id.NUMBER, LNSessionCodes.SALES_ORDER)).inputValue();

    log.info("=========>>>>> Created Order Number: " + businessCnxt.salesOrderNumBySalesOffice + " <<<<<=========");

    // Step 19–21: Set Planned Delivery Date + Time
    await this.page.waitForTimeout(2000);
        
    await LNCommon.triggerInputField(await (await LNCommon.getTextField(OrderIntakeWorkbench_Lbl.PLANNED_DELIVERY_DATE,
      OrderIntakeWorkbench_Id.PLANNED_DELIVERY_DATE, LNSessionCodes.SALES_ORDER)).first(), businessCnxt.plannedDate);

    await LNCommon.triggerInputField(await LNCommon.getTextField(OrderIntakeWorkbench_Lbl.PLANNED_DELIVERY_DATE,
      OrderIntakeWorkbench_Id.PLANNED_DELIVERY_TIME, LNSessionCodes.SALES_ORDER), businessCnxt.plannedTime);

    await this.page.waitForTimeout(2000);
    await this.page.keyboard.press("Tab");

    // Step 22–24: Handle Date Validation Popup and Confirm Values
    await LNCommon.validateMessageAndHandlePopUpIfExists(LNPopupMsg.DELIVERY_DATE, toolbar.OK);
    await LNCommon.validateMessageAndHandlePopUp(LNPopupMsg.RECEIPT_DATE_BEFORE_DELIVERY_DATE, toolbar.OK);

    // Verifying the Planned Receipt Date
    await expect(async () => {

      expect(await (await (await LNCommon.getTextField(OrderIntakeWorkbench_Lbl.PLANNED_RECEIPT_DATE, OrderIntakeWorkbench_Id.SALES_PLANNED_RECEIPT_DATE, LNSessionCodes.SALES_ORDER)).first()).inputValue(), `The Planned Receipt Date is not ${businessCnxt.plannedDate}`)
        .toBe(businessCnxt.plannedDate);

    }).toPass({ timeout: 10000 });

    await this.page.waitForTimeout(1000);
    await this.page.keyboard.press("Tab");

    await LNCommon.validateMessageAndHandlePopUpIfExists(LNPopupMsg.DELIVERY_DATE, TCEDU_LNReviewItemsFromGlobalPrespective.OK);

    // Verifying the Planned Receipt Time
    expect(await (await LNCommon.getTextField(OrderIntakeWorkbench_Lbl.PLANNED_RECEIPT_DATE, OrderIntakeWorkbench_Id.PLANNED_RECEIPT_DATE_TIME, LNSessionCodes.SALES_ORDER)).inputValue(), `The Planned Receipt Date is not ${businessCnxt.plannedTime}`)
      .toBe(businessCnxt.plannedTime);

    // Step 25: New Order Line
    await LNCommon.selectGridTab(LNTabs.ORDER_LINES, LNSessionCodes.SALES_ORDER);
    await LNCommon.clickMainMenuItem(LNSessionCodes.SALES_ORDER_LINE, LNMenuActions_Id.NEW);
    await LNCommon.validateMessageAndHandlePopUpIfExists(LNPopupMsg.DELIVERY_DATE, toolbar.OK);

    // Step 26–28: Select Item
    await this.page.waitForTimeout(2000);
    await this.page.keyboard.press("Tab");
    await this.page.waitForTimeout(2000);
    await this.page.keyboard.press("Tab");

    await (await LNCommon.getTextboxLookUpIconInGrid(OrderIntakeWorkbench_Lbl.ITEM_GRID, OrderIntakeWorkbench_Id.ITEM_SEGMENT_2_GRID, LNSessionCodes.SALES_ORDER_LINE)).click();
    await LNCommon.verifyDialogBoxWindow(LNSessionTabs.ITEMS_SALES_BY_OFFICE);

    await LNCommon.filterRequiredRecord(OrderIntakeWorkbench_Lbl.ITEM_GRID, OrderIntakeWorkbench_Id.ITEM_IN_SALES_BY_OFFICE_SEGMENT_TWO_GRID, LNSessionCodes.ITEMS_SALES_BY_OFFICE, businessCnxt.item[1]);
    await LNCommon.selectRequiredRecord(LNSessionCodes.ITEMS_SALES_BY_OFFICE, OrderIntakeWorkbench_Lbl.ITEM_GRID, OrderIntakeWorkbench_Id.ITEM_IN_SALES_BY_OFFICE_SEGMENT_TWO_GRID, businessCnxt.item[1]);
    await LNCommon.clickTextMenuItem(LNSessionCodes.ITEMS_SALES_BY_OFFICE, LNMenuActions_Id.OK, LNMenuActions_Lbl.OK);

    // Verify Session Tab
    await LNCommon.verifySessionTab(LNSessionTabs.SALES_ORDER);

    // Step 29–30: Enter Quantity and Validate Price
    await this.page.waitForTimeout(1000);
    await this.page.keyboard.press("Tab");

    await LNCommon.validateMessageAndHandlePopUpIfExists(LNPopupMsg.SALES_ORDER, toolbar.OK);
    await LNCommon.dataCellElement(await LNCommon.getDataCell(OrderIntakeWorkbench_Lbl.ITEM_GRID, OrderIntakeWorkbench_Id.SALES_ORDER_ORDERED_QUANTITY_GRID,
      LNSessionCodes.SALES_ORDER_LINE), parseInt(toolbar.FIRST_RECORD), businessCnxt.orderedQuan);

    await this.page.waitForTimeout(1000);
    await this.page.keyboard.press("Tab");

    // Verifying the Price
    expect(await (await commonPg.gridInputField(OrderIntakeWorkbench_Lbl.PRICE_GRID, OrderIntakeWorkbench_Id.PRICE_GRID, LNSessionCodes.SALES_ORDER_LINE)).inputValue(), `The Price does not contain ${businessCnxt.price}`)
      .toContain(businessCnxt.price);

    // Step 31: Save Order
    await LNCommon.clickMainMenuItem(LNSessionCodes.SALES_ORDER, LNMenuActions_Id.SAVE);

    log.info("=========>>>>> Create sales order (by the sales center) completed <<<<<=========");

    log.info("=========>>>>> Review intercompany trade order - purchase (by the sales center) started <<<<<=========");

    // Step 1: Select Line 10 in Sales Order Lines tab
    await LNCommon.selectRequiredRecord(LNSessionCodes.SALES_ORDER_LINE, OrderIntakeWorkbench_Lbl.LINE_GRID, OrderIntakeWorkbench_Id.LINE_IN_ORDER_LINES_GRID, businessCnxt.line);

    // Step 2: Navigate to Intercompany Trade Order - Purchase
    await LNCommon.navigateToLNReferences(LNSessionCodes.SALES_ORDER_LINE, LNMenuActions_Lbl.VIEW, LNMenuActions_Lbl.INTERCOMPANY_TRADE_ORDER_PURCHASE);

    await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_ORDER_PURCHASE);

    // Step 3: Capture the intercompany trade order number
    expect(await (await LNCommon.getTextField(OrderIntakeWorkbench_Lbl.ORDER, OrderIntakeWorkbench_Id.ORDER_SEGMENT_TWO, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE)).inputValue(), 'The order field is empty').not.toBe('');

    businessCnxt.interCmpnyTradeNum = await (await LNCommon.getTextField(OrderIntakeWorkbench_Lbl.ORDER, OrderIntakeWorkbench_Id.ORDER_SEGMENT_TWO, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE)).inputValue();

    log.info(`=========>>>>> The Intercompany Trade number is ${businessCnxt.interCmpnyTradeNum} <<<<<=========`);

    // Step 4: Open Intercompany Trade Order Details
    await LNCommon.navigateToLNReferences(LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE, LNMenuActions_Lbl.INTERCOMPANY_TRADE_ORDER_DETAILS);

    await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_ORDER_PURCHASE);

    // Switching to Intercompany trade tab and verifying the values
    await LNCommon.selectHeaderTab(LNTabs.INTERCOMPANY_TRADE, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL);
    expect(await (await LNCommon.getTextField(OrderIntakeWorkbench_Lbl.FROM_ENTERPRISE_UNIT, OrderIntakeWorkbench_Id.FROM_ENTERPRISE_UNIT, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL)).inputValue()).toBe(businessCnxt.enterpriseUnits[0]);
    expect(await (await LNCommon.getTextField(OrderIntakeWorkbench_Lbl.TO_ENTERPRISE_UNIT, OrderIntakeWorkbench_Id.TO_ENTERPRISE_UNIT, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL)).inputValue()).toBe(businessCnxt.enterpriseUnits[1]);

    // Switching to Project/Item tab and verifying the values
    await LNCommon.selectHeaderTab(LNTabs.PROJECT_ITEM, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL);

    await expect(async () => {
      expect(await (await LNCommon.getTextField(OrderIntakeWorkbench_Lbl.FROM_ITEM, OrderIntakeWorkbench_Id.FROM_ITEM_SEGMENT_TWO, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL)).inputValue()).toBe(businessCnxt.item[1]);
    }).toPass({ timeout: 10000 });
    
    expect(await (await (await LNCommon.getTextField(OrderIntakeWorkbench_Lbl.TO_ITEM, OrderIntakeWorkbench_Id.TO_ITEM_SEGMENT_TWO, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL)).first()).inputValue()).toBe(businessCnxt.item[1]);

    // Switching to Operational tab and verifying the values
    await LNCommon.selectHeaderTab(LNTabs.OPERATIONAL, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL);

    await expect(async () => {
      expect(await (await LNCommon.getTextField(OrderIntakeWorkbench_Lbl.SHIP_FROM_SITE, OrderIntakeWorkbench_Id.SHIP_FROM_SITE, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL)).inputValue()).toBe(businessCnxt.enterpriseUnits[0]);
    }).toPass({ timeout: 10000 });
  
    expect(await (await LNCommon.getTextField(OrderIntakeWorkbench_Lbl.SHIP_TO_BUSINESS_PARTNER_IN_INTERCOMPANY, OrderIntakeWorkbench_Id.SHIP_TO_BUSINESS_PARTNER_IN_INTERCOMPANY, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL)).inputValue()).toBe(businessCnxt.businessPartner);

    // Switching to tab Buying Information and verifying the values
    await LNCommon.selectHeaderTab(LNTabs.BUYING_INFORMATION, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL);

    await expect(async () => {
          expect(await (await LNCommon.getTextField(OrderIntakeWorkbench_Lbl.INTERCOMPANY_TO_DEPARTMENT, OrderIntakeWorkbench_Id.INTERCOMPANY_TO_DEPARTMENT, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL)).inputValue()).toBe(businessCnxt.salesOffice);
    }).toPass({ timeout: 10000 });
    expect(await (await LNCommon.getTextField(OrderIntakeWorkbench_Lbl.INTERCOMPANY_TO_DEPARTMENT, OrderIntakeWorkbench_Id.INTERCOMPANY_TO_DEPARTMENT, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL)).inputValue()).toBe(businessCnxt.salesOffice);

    // Switching to Control tab and verifying the values
    await LNCommon.selectHeaderTab(LNTabs.CONTROL, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL);

    await expect(async () => {
      expect(await (await LNCommon.getTextField(OrderIntakeWorkbench_Lbl.USER, OrderIntakeWorkbench_Id.USER, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL)).inputValue()).toBe("3170st01");
    }).toPass({ timeout: 10000 });

    // Screenshot for tabs
    const tabs = [LNTabs.AGREEMENT, LNTabs.TAX, LNTabs.PRICING, LNTabs.HOURS_EXPENSES, LNTabs.FREIGHT, LNTabs.FINANCIAL];
    for (const tab of tabs) {

      await LNCommon.selectHeaderTab(tab, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE_DETAIL);
      await this.screenshot(`${tab}_details`);
    }

    await this.screenshot("Review intercompany trade order - purchase");

    log.info("=========>>>>> Review intercompany trade order - purchase completed <<<<<=========");

    // 3.1.3
    await LNCommonFunctions.reviewIntercompanyTradeOrderSalesByTheDistributionCenter(businessCnxt);
    
    // Part 3: Ship Sales Order
     log.info("=========>>>>> Ship sales order (by the distribution center) started <<<<<=========");

    await LNCommon.selectRequiredRecord(LNSessionCodes.SALES_ORDER_LINE, OrderIntakeWorkbench_Lbl.LINE_GRID, OrderIntakeWorkbench_Id.LINE_IN_ORDER_LINES_GRID, businessCnxt.line);

    await LNCommon.clickTextMenuItem(LNSessionCodes.SALES_ORDER, LNMenuActions_Id.APPROVE_SALES_ORDER, LNMenuActions_Lbl.APPROVE);

    // Verifying the Status
    await expect(async () => {
      expect(await this.isElementPresent(await commonPg.status(OrderIntakeWorkbench_Lbl.STATUS, LNSessionCodes.SALES_ORDER, Status.IN_PROCESS
      ))).toBeTruthy();
    }).toPass({ timeout: 60000 });

    // Selecting required line record
    await LNCommon.selectRequiredRecord(LNSessionCodes.SALES_ORDER_LINE, OrderIntakeWorkbench_Lbl.LINE_GRID, OrderIntakeWorkbench_Id.LINE_IN_ORDER_LINES_GRID, businessCnxt.line);

    await LNCommon.navigateToLNReferences(LNSessionCodes.SALES_ORDER_LINE, LNMenuActions_Lbl.STATUS);
    await LNCommon.verifySessionTab(LNSessionTabs.SALES_ORDER_LINE_STATUS);

    // Switching to tab and Verifying the Line is Shipped but Not Invoiced
    await LNCommon.selectHeaderTab(LNTabs.LINKED_ORDER_DATA, LNSessionCodes.SALES_ORDER_LINE_STATUS);

    await expect(async () => {
      expect(await (await LNCommon.getTextField(OrderIntakeWorkbench_Lbl.STATUS_IN_SALES_ORDER_LINE_STATUS, OrderIntakeWorkbench_Id.STATUS_IN_SALES_ORDER_LINE_STATUS, LNSessionCodes.SALES_ORDER_LINE_STATUS
      )).inputValue()).toBe(toolbar.SHIPPED);
    }).toPass({ timeout: 60000 });

    await this.screenshot("Sales Order Line Status - Shipped");

    await LNCommon.closeTab(LNSessionTabs.SALES_ORDER_LINE_STATUS);
    await LNCommon.verifySessionTab(LNSessionTabs.SALES_ORDER);

    log.info("=========>>>>> Ship sales order completed <<<<<=========");

    // Part 4: Review Transaction Line
     log.info("=========>>>>> Review transaction line (by sales center) started <<<<<=========");

    await LNCommon.selectRequiredRecord(LNSessionCodes.SALES_ORDER_LINE, OrderIntakeWorkbench_Lbl.LINE_GRID, OrderIntakeWorkbench_Id.LINE_IN_ORDER_LINES_GRID, businessCnxt.line);

    await LNCommon.navigateToLNReferences(LNSessionCodes.SALES_ORDER_LINE, LNMenuActions_Lbl.VIEW, LNMenuActions_Lbl.INTERCOMPANY_TRADE_ORDER_PURCHASE);

    await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_ORDER_PURCHASE);
    await LNCommon.selectGridTab(LNTabs.TRANSACTION_LINES, LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE);

    // Verifying a Transaction Line in Transaction Lines tab
    expect(await commonPg.gridCell(LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_ORDER_PURCHASE, OrderIntakeWorkbench_Id.TRANSACTION_LINE_GRID,
      LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_ORDER_PURCHASE, OrderIntakeWorkbench_Id.TRANSACTION_LINE_GRID
    )).toBeTruthy();

    await LNCommon.filterRequiredRecord(OrderIntakeWorkbench_Lbl.TRANSACTION_LINE_GRID, OrderIntakeWorkbench_Id.TRANSACTION_LINE_GRID,
      LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_ORDER_PURCHASE, businessCnxt.transactionLine);

    await LNCommon.drilldownRequiredRecord(LNSessionCodes.TRANSACTION_LINES_IN_INTERCOMPANY_TRADE_ORDER_PURCHASE, toolbar.FIRST_RECORD);
    await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_ORDER_TRANSACTION_LINE_PURCHASE);

    // Verifying the Data in Transaction line
    await expect(async () => {
      expect(await (await LNCommon.getTextField(
        OrderIntakeWorkbench_Lbl.ORDER_IN_TRANSACTION_LINE_PURCHASE,
        OrderIntakeWorkbench_Id.ORDER_IN_TRANSACTION_LINE_PURCHASE,
        LNSessionCodes.INTERCOMPANY_TRADE_ORDER_TRANSACTION_LINE_PURCHASE
      )).inputValue()).toBe("3170");
    }).toPass({ timeout: 60000 });

    await this.screenshot("Transaction Line Verified");

    // Closing All Tabs
    await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_ORDER_TRANSACTION_LINE_PURCHASE, LNMenuActions_Id.SAVE_AND_CLOSE);
    await LNCommon.clickMainMenuItem(LNSessionCodes.INTERCOMPANY_TRADE_ORDER_PURCHASE, LNMenuActions_Id.SAVE_AND_CLOSE);
    await LNCommon.clickMainMenuItem(LNSessionCodes.SALES_ORDER, LNMenuActions_Id.SAVE_AND_CLOSE);
    await LNCommon.clickMainMenuItem(LNSessionCodes.SALES_ORDER_INTAKE_WORKBENCH, LNMenuActions_Id.SAVE_AND_CLOSE);

    await LNCommon.collapseLNModule(LNSessionTabs.SALES);

    log.info("=========>>>>> Review intercompany trade order transaction line completed successfully <<<<<=========");
  }
}

export default LNSales;