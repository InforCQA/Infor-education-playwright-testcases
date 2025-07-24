import BaseClass from "../../testBase/BaseClass";
import LNCommon from "./LNCommon";
import LNSessionTabs from "../constants/LNSessionTabs";
import LNTabs from "../constants/LNTabs";
import LNSessionCodes from "../constants/LNSessionCodes";
import OrderIntakeWorkbench_Id from "../constants/elementIds/OrderIntakeWorkbench_Id";
import OrderIntakeWorkbench_Lbl from "../constants/elementLbls/OrderIntakeWorkbench_Lbl";
import LNMenuActions_Id from "../constants/elementIds/LNMenuActions_Id";
import LNPage from "../pages/LNPage";
import LNMenuActions_Lbl from "../constants/elementLbls/LNMenuActions_Lbl";
import LNCommons from "../constants/LNCommons";
import LNPopupMsg from "../constants/LNPopupMsg";

class LNSales extends BaseClass {

     /*-------------------------------------------------------------------------------------
     * Objective : Create a sales order for a selected sales office
     * Workbook	 : LN Cloud: Configuring Multisite Environment
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
    
      await LNCommon.getTextboxLookUpIcon(OrderIntakeWorkbench_Lbl.BUSINESS_PARTNER, OrderIntakeWorkbench_Id.SALES_ORDER_BUSINESS_PARTNER, LNSessionCodes.SALES_ORDER).click();
      await LNCommon.verifyDialogBoxWindow(LNSessionTabs.SOLD_TO_BUSINESS_PARTNER);
    
      await LNCommon.filterRequiredRecord(OrderIntakeWorkbench_Lbl.SOLD_TO_BUSINESS_PARTNER_ZOOM_GRID, OrderIntakeWorkbench_Id.SOLD_TO_BUSINESS_PARTNER_ZOOM_GRID, LNSessionCodes.SOLD_TO_BUSINESS_PARTNER, businessCnxt.businessPartner);
      const rowNum = await LNCommon.selectRequiredRecord(LNSessionCodes.SOLD_TO_BUSINESS_PARTNER, OrderIntakeWorkbench_Lbl.SOLD_TO_BUSINESS_PARTNER_ZOOM_GRID, OrderIntakeWorkbench_Id.SOLD_TO_BUSINESS_PARTNER_ZOOM_GRID, businessCnxt.businessPartner);
      // Verifying the Sold to Business Partner Description
      expect(await LNCommon.getRequiredValueFromTheGrid(LNSessionCodes.SOLD_TO_BUSINESS_PARTNER, OrderIntakeWorkbench_Lbl.SOLD_TO_BUSINESS_PARTNER_ZOOM_GRID, OrderIntakeWorkbench_Id.SOLD_TO_BUSINESS_PARTNER_DESCRIPTION_ZOOM_GRID, rowNum)).toBe(businessCnxt.businessPartnerDesc);
    
      await LNCommon.clickTextMenuItem(LNSessionCodes.SOLD_TO_BUSINESS_PARTNER, LNMenuActions_Id.OK, LNMenuActions_Lbl.OK);
    
      await LNCommon.verifySessionTab(LNSessionTabs.SALES_ORDER);
      await actions().sendKeys('Tab').perform();
    
      // Verifying the Address field
      expect(await LNCommon.getTextField(OrderIntakeWorkbench_Lbl.ADDRESS, OrderIntakeWorkbench_Id.ADDRESS, LNSessionCodes.SALES_ORDER).getAttribute(ElementAttributes.VALUE)).not.toBe("");
      
      // Verifying the Order type field
      expect(await LNCommon.getTextField(OrderIntakeWorkbench_Lbl.SALES_ORDER_ORDER_TYPE, OrderIntakeWorkbench_Id.SALES_ORDER_ORDER_TYPE, LNSessionCodes.SALES_ORDER).getAttribute(ElementAttributes.VALUE)).not.toBe("");
    
      await LNCommon.getTextboxLookUpIcon(OrderIntakeWorkbench_Lbl.SALES_OFFICE, OrderIntakeWorkbench_Id.SALES_OFFICE, LNSessionCodes.SALES_ORDER).click();
      await LNCommon.verifyDialogBoxWindow(LNSessionTabs.SALES_OFFICES);
    
      await LNCommon.filterRequiredRecord(OrderIntakeWorkbench_Lbl.SALES_OFFICE_ZOOM_GRID, OrderIntakeWorkbench_Id.SALES_OFFICE_ZOOM_GRID, LNSessionCodes.SALES_OFFICES, businessCnxt.salesOffice);
      await LNCommon.selectRequiredRecord(LNSessionCodes.SALES_OFFICES, OrderIntakeWorkbench_Lbl.SALES_OFFICE_ZOOM_GRID, OrderIntakeWorkbench_Id.SALES_OFFICE_ZOOM_GRID, businessCnxt.salesOffice);
      await LNCommon.clickTextMenuItem(LNSessionCodes.SALES_OFFICES, LNMenuActions_Id.OK, LNMenuActions_Lbl.OK);
     
      // Verify Session Tab
      await LNCommon.verifySessionTab(LNSessionTabs.SALES_ORDER);
    
      await LNCommon.clickMainMenuItem(LNSessionCodes.SALES_ORDER, LNMenuActions_Id.SAVE);
      await LNCommon.validateMessageAndHandlePopUpIfExists(LNPopupMsg.DELIVERY_DATE, LNCommons.OK);
    
      // Fetching and Printing the Sales Order Number
      businessCnxt.salesOrderNum = await LNCommon.getTextField(OrderIntakeWorkbench_Lbl.NUMBER, OrderIntakeWorkbench_Id.NUMBER, LNSessionCodes.SALES_ORDER).getAttribute(ElementAttributes.VALUE);
      console.log("=========>>>>> The sales order number for selected sales office is " + businessCnxt.salesOrderNum + " <<<<<=========");
    
      await LNCommon.selectGridTab(LNTabs.ORDER_LINES, LNSessionCodes.SALES_ORDER);
      await LNCommon.clickMainMenuItem(LNSessionCodes.SALES_ORDER_LINE, LNMenuActions_Id.NEW);
      
      // Verifying the Value in the Line field
      expect(await LNCommon.getRequiredValueFromTheGrid(LNSessionCodes.SALES_ORDER_LINE, OrderIntakeWorkbench_Lbl.LINE_GRID, OrderIntakeWorkbench_Id.LINE_IN_ORDER_LINES_GRID, parseInt(LNCommons.FIRST_RECORD))).toBe(businessCnxt.line);
    
      await actions().sendKeys('Tab', 'Tab').perform();
      await LNCommon.pause(2);
    
      await LNCommon.dataCellElement(
        await LNCommon.getDataCell(OrderIntakeWorkbench_Lbl.ITEM_GRID, OrderIntakeWorkbench_Id.ITEM_SEGMENT_2_GRID, LNSessionCodes.SALES_ORDER_LINE),
        parseInt(LNCommons.FIRST_RECORD), businessCnxt.item[0]
      );
    
      await LNCommon.clickMainMenuItem(LNSessionCodes.SALES_ORDER, LNMenuActions_Id.SAVE);
    
      // Verifying the Ordered Quantity
      expect(await LNCommon.getRequiredValueFromTheGrid(LNSessionCodes.SALES_ORDER_LINE, OrderIntakeWorkbench_Lbl.ORDERED_QUANTITY_GRID, OrderIntakeWorkbench_Id.SALES_ORDER_ORDERED_QUANTITY_GRID, parseInt(LNCommons.FIRST_RECORD))).not.toBe("");
    
      await LNCommon.validateMessageAndHandlePopUpIfExists(LNPopupMsg.SALES_ORDER, LNCommons.OK);
      await LNCommon.drilldownRequiredRecord(LNSessionCodes.SALES_ORDER_LINE, LNCommons.FIRST_RECORD);
    
      await LNCommon.verifySessionTab(LNSessionTabs.SALES_ORDER_LINES);
      await LNCommon.selectHeaderTab(LNTabs.ITEM, LNSessionCodes.SALES_ORDER_LINE);
    
      // Verifying the Item details
      expect(await LNCommon.getTextField(OrderIntakeWorkbench_Lbl.ITEM, OrderIntakeWorkbench_Id.ITEM_IN_SALES_ORDER_SEG_TWO, LNSessionCodes.SALES_ORDER_LINE).getAttribute(ElementAttributes.VALUE)).toBe(businessCnxt.item[0]);
    
      await LNCommon.selectHeaderTab(LNTabs.SELLING, LNSessionCodes.SALES_ORDER_LINE);
      // Verifying the Selling details
      expect(await LNCommon.getTextField(OrderIntakeWorkbench_Lbl.ORDER_DATE, OrderIntakeWorkbench_Id.ORDER_DATE_IN_SALES_ORDER, LNSessionCodes.SALES_ORDER_LINE).getAttribute(ElementAttributes.VALUE)).toBe(DateFunctions.getCurrentDate(DateFormats.M_D_YYYY));
    
      await LNCommon.selectHeaderTab(LNTabs.SHIPPING, LNSessionCodes.SALES_ORDER_LINE);
      // Verifying the Shipping details
      expect(await LNCommon.getTextField(OrderIntakeWorkbench_Lbl.SHIP_TO_BUSINESS_PARTNER, OrderIntakeWorkbench_Id.SHIP_TO_BUSINESS_PARTNER, LNSessionCodes.SALES_ORDER_LINE).getAttribute(ElementAttributes.VALUE)).toBe(businessCnxt.businessPartner);
    
      await LNCommon.screenshot("Create a sales order for a selected sales office");
    
      await LNCommon.clickMainMenuItem(LNSessionCodes.SALES_ORDER_LINE, LNMenuActions_Id.SAVE_AND_EXIT);
      await LNCommon.clickMainMenuItem(LNSessionCodes.SALES_ORDER, LNMenuActions_Id.SAVE_AND_EXIT);
      await LNCommon.clickMainMenuItem(LNSessionCodes.SALES_ORDER_INTAKE_WORKBENCH, LNMenuActions_Id.SAVE_AND_EXIT);
    
      await LNCommon.collapseLNModule(LNSessionTabs.SALES);
      console.log("=========>>>>> Create a sales order for a selected sales office completed successfully <<<<<=========");
    }
   /*---------------------------------------------------------------------------------------
	 * Objective : Create sales order (by the sales center)
	 * Workbook	 : LN Cloud: Configuring Multisite Environment
	 * Exercises : 3.1.1
	 * --------------------------------------------------------------------------------------*/

static async createSalesOrderBySalesCenter(businessCnxt) {
    const commonPg = new LNPage(this.page);

    console.log("=========>>>>> Create sales order (by the sales center) started <<<<<=========");

    // Step 1: Navigate to Sales > Orders > Order Intake Workbench
    await LNCommon.navigateToLNModule( LNSessionTabs.SALES, LNSessionTabs.ORDERS, LNSessionTabs.ORDER_INTAKE_WORKBENCH);

    // Step 2: Verify session tab
    await LNCommon.verifySessionTab(LNSessionTabs.SALES_ORDER_INTAKE_WORKBENCH);

    // Step 3: Click Sales Orders tab
    await LNCommon.selectHeaderTab(LNTabs.SALES_ORDERS, LNSessionCodes.SALES_ORDER_INTAKE_WORKBENCH);

    // Step 4: Click New Sales Order
    await LNCommon.clickMainMenuItem(LNSessionCodes.SALES_ORDER_LINES, LNMenuActions_Id.NEW);
    await LNCommon.verifySessionTab(LNSessionTabs.SALES_ORDER);
    
    // Verifying the Sold to BP section
    expect( await commonPg.verifyHeader(OrderIntakeWorkbench_Lbl.SOLD_TO_BP_SECTION),`${OrderIntakeWorkbench_Lbl.SOLD_TO_BP_SECTION} section is not found`)
    .toBeTruthy();

    // Step 5: Click Zoom on Business Partner
    await LNCommon.getTextboxLookUpIcon(OrderIntakeWorkbench_Lbl.BUSINESS_PARTNER,OrderIntakeWorkbench_Id.SALES_ORDER_BUSINESS_PARTNER,LNSessionCodes.SALES_ORDER).click();
    await LNCommon.verifyDialogBoxWindow(LNSessionTabs.SOLD_TO_BUSINESS_PARTNER);

    // Step 6–8: Filter and select MSC000010 MS Cus Chair US
    await LNCommon.filterRequiredRecord( OrderIntakeWorkbench_Lbl.SOLD_TO_BUSINESS_PARTNER_ZOOM_GRID,
        OrderIntakeWorkbench_Id.SOLD_TO_BUSINESS_PARTNER_ZOOM_GRID,LNSessionCodes.SOLD_TO_BUSINESS_PARTNER,businessCnxt.businessPartner );
    
    // Verifying the Sold to Business Partner Description
    const rowNum = await LNCommon.selectRequiredRecord(LNSessionCodes.SOLD_TO_BUSINESS_PARTNER,OrderIntakeWorkbench_Lbl.SOLD_TO_BUSINESS_PARTNER_ZOOM_GRID,OrderIntakeWorkbench_Id.SOLD_TO_BUSINESS_PARTNER_ZOOM_GRID,businessCnxt.businessPartner);
    expect(await LNCommon.getRequiredValueFromTheGrid(LNSessionCodes.SOLD_TO_BUSINESS_PARTNER,OrderIntakeWorkbench_Lbl.SOLD_TO_BUSINESS_PARTNER_ZOOM_GRID,OrderIntakeWorkbench_Id.SOLD_TO_BUSINESS_PARTNER_DESCRIPTION_ZOOM_GRID,rowNum ),'The Description does not match').toBe(businessCnxt.businessPartnerDesc);
 
    await LNCommon.clickTextMenuItem(LNSessionCodes.SOLD_TO_BUSINESS_PARTNER, LNMenuActions_Id.OK, LNMenuActions_Lbl.OK);

    // Verify Session Tab
	await LNCommon.verifySessionTab(LNSessionTabs.SALES_ORDER);
    // Verifying the Business Partner
    expect(await LNCommon.getTextField(OrderIntakeWorkbench_Lbl.BUSINESS_PARTNER,OrderIntakeWorkbench_Id.SALES_ORDER_BUSINESS_PARTNER,LNSessionCodes.SALES_ORDER).getAttribute('value'),'The Business Partner is not ' + businessCnxt.businessPartner).toBe(businessCnxt.businessPartner);

    // Step 9: Press TAB
    await page.keyboard.press("Tab");

    // Verifying the Address field
    expect((await LNCommon.getTextField(OrderIntakeWorkbench_Lbl.ADDRESS,OrderIntakeWorkbench_Id.ADDRESS,LNSessionCodes.SALES_ORDER).getAttribute('value')),'The Address field is empty')
    .not.toBeNull();

    // Verifying the Order type field
    expect((await LNCommon.getTextField(OrderIntakeWorkbench_Lbl.SALES_ORDER_ORDER_TYPE,OrderIntakeWorkbench_Id.SALES_ORDER_ORDER_TYPE,LNSessionCodes.SALES_ORDER).getAttribute('value')),'The Order type field is empty')
    .not.toBeNull();

    // Step 10: Click Zoom on Sales Office
    await LNCommon.getTextboxLookUpIcon( OrderIntakeWorkbench_Lbl.SALES_OFFICE,OrderIntakeWorkbench_Id.SALES_OFFICE,LNSessionCodes.SALES_ORDER).click();
    await LNCommon.verifyDialogBoxWindow(LNSessionTabs.SALES_OFFICES);

    // Adjusting the Filter option to Contains
    await LNCommon.updateDefaultFilter(OrderIntakeWorkbench_Id.SALES_OFFICE_ZOOM_GRID, LNSessionCodes.SALES_OFFICES, LNCommons.CONTAINS);
    
    await LNCommon.filterRequiredRecord(OrderIntakeWorkbench_Lbl.SALES_OFFICE_ZOOM_GRID,OrderIntakeWorkbench_Id.SALES_OFFICE_ZOOM_GRID,LNSessionCodes.SALES_OFFICES,businessCnxt.partialSalesOffice);
    await LNCommon.selectRequiredRecord(LNSessionCodes.SALES_OFFICES,OrderIntakeWorkbench_Lbl.SALES_OFFICE_ZOOM_GRID,OrderIntakeWorkbench_Id.SALES_OFFICE_ZOOM_GRID, businessCnxt.salesOffice );
    await LNCommon.clickTextMenuItem(LNSessionCodes.SALES_OFFICES, LNMenuActions_Id.OK, LNMenuActions_Lbl.OK);

    // Verify Session Tab
	await LNCommon.verifySessionTab(LNSessionTabs.SALES_ORDER);
    // Verifying the Sales Office
    const salesOfficeField = await LNCommon.getTextField(OrderIntakeWorkbench_Lbl.SALES_OFFICE,OrderIntakeWorkbench_Id.SALES_OFFICE,LNSessionCodes.SALES_ORDER);
    expect(await salesOfficeField.getAttribute('value'), `The Sales Office is not ${businessCnxt.salesOffice}`).toBe(businessCnxt.salesOffice);

    // Step 16: Press TAB
    await page.keyboard.press("Tab");

    // Step 17: Save Sales Order
    await LNCommon.clickMainMenuItem(LNSessionCodes.SALES_ORDER, LNMenuActions_Id.SAVE);
    await LNCommon.validateMessageAndHandlePopUpIfExists(LNPopupMsg.DELIVERY_DATE, LNCommons.OK);

    // Step 18: Capture Order Number
    businessCnxt.salesOrderNumBySalesOffice = await LNCommon.getTextField( OrderIntakeWorkbench_Lbl.NUMBER, OrderIntakeWorkbench_Id.NUMBER,LNSessionCodes.SALES_ORDER).getAttribute('value');
    console.log("=========>>>>> Created Order Number: " + businessCnxt.salesOrderNumBySalesOffice + " <<<<<=========");

    // Step 19–21: Set Planned Delivery Date + Time
    await LNCommon.triggerInputField(await LNCommon.getTextField(OrderIntakeWorkbench_Lbl.PLANNED_DELIVERY_DATE,
        OrderIntakeWorkbench_Id.PLANNED_DELIVERY_DATE,LNSessionCodes.SALES_ORDER),businessCnxt.plannedDate);

    await LNCommon.triggerInputField(await LNCommon.getTextField(OrderIntakeWorkbench_Lbl.PLANNED_DELIVERY_DATE,
         OrderIntakeWorkbench_Id.PLANNED_DELIVERY_TIME,LNSessionCodes.SALES_ORDER),businessCnxt.plannedTime);

    await page.keyboard.press("Tab");

    // Step 22–24: Handle Date Validation Popup and Confirm Values
    await LNCommon.validateMessageAndHandlePopUpIfExists(LNPopupMsg.DELIVERY_DATE, LNCommons.OK);
    await LNCommon.validateMessageAndHandlePopUp(LNPopupMsg.RECEIPT_DATE_BEFORE_DELIVERY_DATE, LNCommons.OK);

   // Verifying the Planned Receipt Date
    expect(await (await LNCommon.getTextField(OrderIntakeWorkbench_Lbl.PLANNED_RECEIPT_DATE, OrderIntakeWorkbench_Id.SALES_PLANNED_RECEIPT_DATE, LNSessionCodes.SALES_ORDER)).getAttribute('value'), `The Planned Receipt Date is not ${businessCnxt.plannedDate}`)
    .toBe(businessCnxt.plannedDate);

    await page.keyboard.press("Tab");

    await LNCommon.validateMessageAndHandlePopUpIfExists(LNPopupMsg.DELIVERY_DATE, LNCommons.OK);
    
    // Verifying the Planned Receipt Time
    expect(await (await LNCommon.getTextField(OrderIntakeWorkbench_Lbl.PLANNED_RECEIPT_DATE, OrderIntakeWorkbench_Id.PLANNED_RECEIPT_DATE_TIME, LNSessionCodes.SALES_ORDER)).getAttribute('value'), `The Planned Receipt Date is not ${businessCnxt.plannedTime}`)
    .toBe(businessCnxt.plannedTime);

    // Step 25: New Order Line
    await LNCommon.selectHeaderTab(LNTabs.ORDER_LINES, LNSessionCodes.SALES_ORDER);
    await LNCommon.clickMainMenuItem(LNSessionCodes.SALES_ORDER_LINE, LNMenuActions_Id.NEW);
    await LNCommon.validateMessageAndHandlePopUpIfExists(LNPopupMsg.DELIVERY_DATE, LNCommons.OK);

    // Step 26–28: Select Item
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await LNCommon.getTextboxLookUpIconInGrid(OrderIntakeWorkbench_Lbl.ITEM_GRID,OrderIntakeWorkbench_Id.ITEM_SEGMENT_2_GRID, LNSessionCodes.SALES_ORDER_LINE);
    await LNCommon.verifyDialogBoxWindow(LNSessionTabs.ITEMS_SALES_BY_OFFICE);

    await LNCommon.filterRequiredRecord(OrderIntakeWorkbench_Lbl.ITEM_GRID,OrderIntakeWorkbench_Id.ITEM_IN_SALES_BY_OFFICE_SEGMENT_TWO_GRID,LNSessionCodes.ITEMS_SALES_BY_OFFICE,businessCnxt.item[1]);
    await LNCommon.selectRequiredRecord(LNSessionCodes.ITEMS_SALES_BY_OFFICE,OrderIntakeWorkbench_Lbl.ITEM_GRID,OrderIntakeWorkbench_Id.ITEM_IN_SALES_BY_OFFICE_SEGMENT_TWO_GRID,businessCnxt.item[1]);
    await LNCommon.clickTextMenuItem(LNSessionCodes.ITEMS_SALES_BY_OFFICE, LNMenuActions_Id.OK, LNMenuActions_Lbl.OK);

    // Verify Session Tab
	await LNCommon.verifySessionTab(LNSessionTabs.SALES_ORDER);

    // Step 29–30: Enter Quantity and Validate Price
    await page.keyboard.press("Tab");

    await LNCommon.validateMessageAndHandlePopUpIfExists(LNPopupMsg.SALES_ORDER, LNCommons.OK);
    await LNCommon.dataCellElement( await LNCommon.getDataCell(OrderIntakeWorkbench_Lbl.ITEM_GRID,OrderIntakeWorkbench_Id.SALES_ORDER_ORDERED_QUANTITY_GRID,
                                    LNSessionCodes.SALES_ORDER_LINE),parseInt(LNCommons.FIRST_RECORD), businessCnxt.orderedQuan);
    await page.keyboard.press("Tab");

    // Verifying the Price
    expect(await (await commonPg.gridInputField(OrderIntakeWorkbench_Lbl.PRICE_GRID, OrderIntakeWorkbench_Id.PRICE_GRID, LNSessionCodes.SALES_ORDER_LINE)).getAttribute('value'), `The Price does not contain ${businessCnxt.price}`)
    .toContain(businessCnxt.price);

    // Step 31: Save Order
    await LNCommon.clickMainMenuItem(LNSessionCodes.SALES_ORDER, LNMenuActions_Id.SAVE);
    console.log("=========>>>>> Create sales order (by the sales center) completed <<<<<=========");
}

}

export default LNSales;