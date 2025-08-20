import test from "@playwright/test";
import ProductNames from "../../../commons/constants/ProductNames";
import CloudSuite from "../../../commons/functions/CloudSuite";
import BaseClass from "../../../testBase/BaseClass";
import LNMasterData from "../../functions/LNMasterData";
import LNSales from "../../functions/LNSales";
import LNCommonFunctions from "../../functions/LNCommonFunctions";
import GetDataLN_UpdateLocalBusinessPartnerAndCreateSalesOrders from "../../dataMapping/configuringMultisiteEnvironment/GetDataLN_UpdateLocalBusinessPartnerAndCreateSalesOrders";

const loginData = JSON.parse(JSON.stringify(require("../../../commons/data/productCredentials.json")));
const businessCnxt = JSON.parse(JSON.stringify(require("../../../data/ln/TCEDU-LNConfiguringMultisiteEnvironment/UpdateLocalBusinessPartnerAndCreateSalesOrders.properties.json")));
/**---------------------------------------------------------------------------------------
 * Purpose : Update Local Business Partner and Create Sales Orders
 * Exercise : 2.4, 3.1.1, 3.1.2, 3.1.3, 3.1.4, 3.1.5, 3.1.6, 3.1.7
 * Workbook  : LN Cloud Configuring Multisite and Intercompany Trade Training Workbook
 * 1. Update local business partner (customer) data
 * 2. Create sales order (by the sales center)
 * 3. Review intercompany trade order - purchase (by the sales center)
 * 4. Review intercompany trade order - sales (by the distribution center)
 * 5. Ship sales order (by the distribution center)
 * 6. Review the intercompany trade order transaction line (by the sales center)
 * 7. Invoice intercompany trade order transaction line (by the distribution center)
 * 8. Create intercompany trade purchase invoice (by the sales center)
 * ---------------------------------------------------------------------------------------*/
export default function TCEDU_LNUpdateLocalBusinessPartnerAndCreateSalesOrders() {

    test.describe.configure({ mode: 'serial' });
    
    test.describe('TCEDU_LNUpdateLocalBusinessPartnerAndCreateSalesOrders', () => {

        test.beforeAll(async ({ }) => {

            await GetDataLN_UpdateLocalBusinessPartnerAndCreateSalesOrders.getLNBusinessPartnerContext(businessCnxt);
            await BaseClass.globalSetup();
            await CloudSuite.login(loginData.lnUrl, loginData.lnmultisiteUsername, loginData.lnmultisitePassword);
        });
        
        // 2.4
        test('Update local business partner (customer) data', async ({ }) => {
            await CloudSuite.navigateToApplication(ProductNames.LN);
            await LNMasterData.updateLocalBusinessPartnerCustomerData(businessCnxt);
        });
        
        // 2.5
     //   test('Create a sales order for a selected sales office', async ({ }) => {

     //       await LNSales.createASalesOrderForASelectedSalesOffice(businessCnxt);
      //  });

        // Create sales order (by the sales center)
        // Review intercompany trade order - purchase (by the sales center)
        // Review intercompany trade order - sales (by the distribution center)
        // Ship sales order (by the distribution center)
        // Review the intercompany trade order transaction line (by the sales center)
        test('Create a sales order And Review Intercompany Trade Oder Purchase By Sales Center', async ({ }) => {

            await LNSales.createSalesOrderAndReviewIntercompanyTradeOrderPurchaseBySalesCenter(businessCnxt);
        });

        test('Review the intercompany trade order transaction line (by the sales center)', async ({ }) => {    
            
            await LNCommonFunctions.invoiceIntercompanyTradeOrderTransactionLineByTheDistributionCenter(businessCnxt.enterpriseUnits, businessCnxt.interCmpnyTradeNum, 0);
        });
        
        test('Create intercompany trade purchase invoice (by the sales center)', async ({ }) => {

            await LNCommonFunctions.createIntercompanyTradePurchaseInvoiceByTheSalesCenter(businessCnxt.interCmpnyTradeNum, null, 0);
        });

        test.afterAll(async () => {
            await BaseClass.page.close();
        });

    })
}