import test from "@playwright/test";
import ProductNames from "../../../commons/constants/ProductNames";
import CloudSuite from "../../../commons/functions/CloudSuite";
import BaseClass from "../../../testBase/BaseClass";
import LNMasterData from "../../functions/LNMasterData";
import LNSales from "../../functions/LNSales";

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
            await CloudSuite.navigateToApplication(ProductNames.LN);
            await LNSales.createASalesOrderForASelectedSalesOffice(businessCnxt);
        });
        // 3.1.1
        test('Create sales order (by the sales center)', async ({ }) => {
            await CloudSuite.navigateToApplication(ProductNames.LN);
            await LNSales.createSalesOrderBySalesCenter(businessCnxt);
        });
        // 3.1.2
        test('Review intercompany trade order - purchase (by the sales center)', async ({ }) => {
            await CloudSuite.navigateToApplication(ProductNames.LN);
            await LNSales.createSalesOrderBySalesCenter(businessCnxt);
        });
    })
}