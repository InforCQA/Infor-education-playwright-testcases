import {test} from '@playwright/test';
import ProductNames from "../../../commons/constants/ProductNames";
import CloudSuite from "../../../commons/functions/CloudSuite";
import BaseClass from "../../../testBase/BaseClass";
import LNMasterData from '../../functions/LNMasterData';

// Property data for testcases
const loginData = JSON.parse(JSON.stringify(require("../../../commons/data/productCredentials.json")));
const itemsBySiteCnxt = JSON.parse(JSON.stringify(require("../../../data/ln/TCEDU-LNConfiguringMultisiteEnvironment/ReviewAndUpdateItemsFromSalesPerspective.properties.json")));

export default function TCEDU_LNReviewAndUpdateItemsFromSalesPerspective() {

    test.describe('TCEDU_LNReviewAndUpdateItemsFromSalesPerspective', () => {
        test('login', async ({ }) => {
            
            await BaseClass.globalSetup();
            await CloudSuite.login(loginData.lnUrl, loginData.lnmultisiteUsername, loginData.lnmultisitePassword);
        });

        // 2.2.1
        test('Review item by site and update purchase price', async ({ }) => {
             await CloudSuite.navigateToApplication(ProductNames.LN);
             await LNMasterData.reviewItemBySiteAndUpdatePurchasePrice(itemsBySiteCnxt);
         });

        // // 2.2.2
        // test('Calculate standard cost per enterprise unit (sales center)', async ({ }) => {
        //     await LNMasterData.calculateStandardCostPerEnterpriseUnitSalesCenter(itemsBySiteCnxt);
        // });
        
        // // 2.2.3
        // test('Review item by sales office and update sales price', async ({ }) => {
        //     await LNMasterData.reviewItemBySalesOfficeAndUpdateSalesPrice(itemsBySiteCnxt);
        // });
    })
}