import {test} from '@playwright/test';
import ProductNames from "../../../commons/constants/ProductNames";
import CloudSuite from "../../../commons/functions/CloudSuite";
import BaseClass from "../../../testBase/BaseClass";
import {describeTest} from '../../../testBase/BaseClass';
import LNMasterData from '../functions/LNMasterData';
import config from '../../plan/LNConfiguringMultisiteEnvironment.spec';
import GetDataLN_CreateANewItemUsingItemDefaults from '../dataMapping/GetDataLN_CreateANewItemUsingItemDefaults';

// Property data for testcases
const itemCnxt = JSON.parse(JSON.stringify(require("../data/CreateANewItemUsingItemDefaults.properties.json")));
/**---------------------------------------------------------------------------------------
 * Purpose : Create a new item using item defaults
 * Exercise : 2.3.1, 2.3.2
 * Workbook  : LN Cloud Configuring Multisite and Intercompany Trade Training Workbook
 * 1. Review item defaults
 * 2. Create a new item
 * ---------------------------------------------------------------------------------------*/
export default function TCEDU_LNCreateANewItemUsingItemDefaults() {
    
   describeTest('TCEDU_LNCreateANewItemUsingItemDefaults', () => {

        test.beforeAll(async ({ }) => {
            
            // Input Data Returned From Data Mapping
            await GetDataLN_CreateANewItemUsingItemDefaults.getItemContext(itemCnxt);
            await BaseClass.globalSetup();
            await CloudSuite.login(config.BASE_URL, config.USER_NAME, config.PASSWORD);
        });
    
        test('Review item defaults', async ({ }) => {
             await CloudSuite.navigateToApplication(ProductNames.LN);
             await LNMasterData.reviewItemDefaults(itemCnxt);
        });
   
        test('Create a new item', async ({ }) => {
            
            await LNMasterData.createANewItem(itemCnxt);
        });

        test.afterAll(async () => {
            await CloudSuite.logOut();
            await BaseClass.page.close();
        });
    })
}