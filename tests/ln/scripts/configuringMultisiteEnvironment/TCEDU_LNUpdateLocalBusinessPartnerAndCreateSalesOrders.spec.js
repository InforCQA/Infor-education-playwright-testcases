import test from "@playwright/test";
import ProductNames from "../../../commons/constants/ProductNames";
import CloudSuite from "../../../commons/functions/CloudSuite";
import BaseClass from "../../../testBase/BaseClass";
import LNMasterData from "../../functions/LNMasterData";
import LNSales from "../../functions/LNSales";
import LNCommonFunctions from "../../functions/LNCommonFunctions";

const loginData = JSON.parse(JSON.stringify(require("../../../commons/data/productCredentials.json")));
const businessCnxt = JSON.parse(JSON.stringify(require("../../../data/ln/TCEDU-LNConfiguringMultisiteEnvironment/UpdateLocalBusinessPartnerAndCreateSalesOrders.properties.json")));

export default function TCEDU_LNUpdateLocalBusinessPartnerAndCreateSalesOrders() {

    test.describe('TCEDU_LNUpdateLocalBusinessPartnerAndCreateSalesOrders', () => {
        test('login', async ({ }) => {
            await BaseClass.globalSetup();
            await CloudSuite.login(loginData.lnUrl, loginData.lnmultisiteUsername, loginData.lnmultisitePassword);
        });
        // 2.4
        test('Update local business partner (customer) data', async ({ }) => {
            await CloudSuite.navigateToApplication(ProductNames.LN);
            await LNMasterData.updateLocalBusinessPartnerCustomerData(businessCnxt);
        });
        // 2.5
        test('Create a sales order for a selected sales office', async ({ }) => {

            await LNSales.createASalesOrderForASelectedSalesOffice(businessCnxt);
        });

        // Create sales order (by the sales center)
        // Review intercompany trade order - purchase (by the sales center)
        // Review intercompany trade order - sales (by the distribution center)
        // Ship sales order (by the distribution center)
        // Review the intercompany trade order transaction line (by the sales center)
        test('Create a sales order for a selected sales office', async ({ }) => {

            await LNSales.createSalesOrderAndReviewIntercompanyTradeOrderPurchaseBySalesCenter(businessCnxt);
        });

        // 3.1.1
        test('Review the intercompany trade order transaction line (by the sales center)', async ({ }) => {

            LNCommonFunctions.invoiceIntercompanyTradeOrderTransactionLineByTheDistributionCenter(businessCnxt.enterpriseUnits, businessCnxt.interCmpnyTradeNum, 0);
        });
        // 3.1.2
        test('Create intercompany trade purchase invoice (by the sales center)', async ({ }) => {
            LNCommonFunctions.createIntercompanyTradePurchaseInvoiceByTheSalesCenter(businessCnxt.interCmpnyTradeNum, null, 0);
        });
    })
}