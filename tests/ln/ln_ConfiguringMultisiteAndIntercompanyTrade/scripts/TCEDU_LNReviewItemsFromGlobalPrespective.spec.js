import {test} from '@playwright/test';
import ProductNames from "../../../commons/constants/ProductNames";
import CloudSuite from "../../../commons/functions/CloudSuite";
import BaseClass from "../../../testBase/BaseClass";
import LNMasterData from '../../ConfiguringMultisiteAndIntercompanyTrade/functions/LNMasterData';
import config from '../../plan/LNConfiguringMultisiteEnvironment.spec';

// Property data for testcases
const loginData = JSON.parse(JSON.stringify(require("../../../commons/data/productCredentials.json")));
const itemCnxt = JSON.parse(JSON.stringify(require("../../../data/ln/TCEDU-LNConfiguringMultisiteEnvironment/ReviewItemsFromGlobalPrespective.properties.json")));
/** ---------------------------------------------------------------------------------------
 * Purpose : Review items (from global perspective )
 * Exercise : 2.1.1, 2.1.2, 2.1.3, 2.1.4, 2.1.5
 * Workbook  : LN Cloud Configuring Multisite and Intercompany Trade Training Workbook
 * 1.Review the item at an enterprise level 
 * 2.Review the domain-specific data
 * 3.Review Purchase Data for the Item 
 * 4.Review sales office for the item
 * 5.Review standard costs by enterprise unit
 * ---------------------------------------------------------------------------------------*/
export default function TCEDU_LNReviewItemsFromGlobalPrespective() {

    test.describe.configure({ mode: 'serial' });

    test.describe('TCEDU_LNReviewItemsFromGlobalPrespective', () => {

      test.beforeAll(async ({ }) => {
        await BaseClass.globalSetup();
        await CloudSuite.login(config.BASE_URL, config.USER_NAME, config.PASSWORD);
      });
        
      test('Review the item at an enterprise level', async ({ }) => {
        await CloudSuite.navigateToApplication(ProductNames.LN);
        await LNMasterData.reviewItemAtEnterpriseLevel(itemCnxt);
      });

      test('Review the domain-specific data', async ({ }) => {
        await LNMasterData.reviewDomainSpecificData();
      });
        
      test('Review Purchase Data for the Item', async ({ }) => {
        await LNMasterData.reviewPurchaseDataForItem(itemCnxt);
      });
    
      test('Review sales office for the item', async ({ }) => {
        await LNMasterData.reviewSalesOfficeForItem();
      });
      
      test('Review standard costs by enterprise unit', async ({ }) => {
        await LNMasterData.reviewStandardCostsByEnterpriseUnit(itemCnxt);
      });

      test.afterAll(async () => {
        await BaseClass.page.close();
      });
      
    })
}