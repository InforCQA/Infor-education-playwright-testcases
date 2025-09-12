import {test} from '@playwright/test';
import ProductNames from "../../../commons/constants/ProductNames";
import CloudSuite from "../../../commons/functions/CloudSuite";
import BaseClass from "../../../testBase/BaseClass";
import LNMasterData from '../../functions/LNMasterData';
import config from '../../../plan/LNConfiguringMultisiteEnvironment.spec';

// Property data for testcases
const loginData = JSON.parse(JSON.stringify(require("../../../commons/data/productCredentials.json")));
const itemsBySiteCnxt = JSON.parse(JSON.stringify(require("../../../data/ln/TCEDU-LNConfiguringMultisiteEnvironment/ReviewAndUpdateItemsFromSalesPerspective.properties.json")));
/**---------------------------------------------------------------------------------------
 * Purpose : Review and update items (from sales perspective)
 * Exercise : 2.2.1, 2.2.2, 2.2.3
 * Workbook  : LN Cloud Configuring Multisite and Intercompany Trade Training Workbook
 * 1. Review item by site and update purchase price
 * 2. Calculate standard cost per enterprise unit (sales center)
 * 3. Review item by sales office and update sales price
 * ---------------------------------------------------------------------------------------*/
export default function TCEDU_LNReviewAndUpdateItemsFromSalesPerspective() {

    test.describe.configure({ mode: 'serial' });
    
    test.describe('TCEDU_LNReviewAndUpdateItemsFromSalesPerspective', () => {
        
        test.beforeAll(async ({ }) => { 
            await BaseClass.globalSetup();
            await CloudSuite.login(config.BASE_URL, config.USER_NAME, config.PASSWORD);
        });

        test('Review item by site and update purchase price', async ({ }) => {
             await CloudSuite.navigateToApplication(ProductNames.LN);
             await LNMasterData.reviewItemBySiteAndUpdatePurchasePrice(itemsBySiteCnxt);
         });
       
        test('Calculate standard cost per enterprise unit (sales center)', async ({ }) => {
            await LNMasterData.calculateStandardCostPerEnterpriseUnitSalesCenter(itemsBySiteCnxt);
        });
        
        test('Review item by sales office and update sales price', async ({ }) => {
            await LNMasterData.reviewItemBySalesOfficeAndUpdateSalesPrice(itemsBySiteCnxt);
        });

        test.afterAll(async () => {
            await BaseClass.page.close();
        });

    })
}