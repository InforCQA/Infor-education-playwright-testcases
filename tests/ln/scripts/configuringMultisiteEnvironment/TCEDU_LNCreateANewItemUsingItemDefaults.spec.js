import {test} from '@playwright/test';
import ProductNames from "../../../commons/constants/ProductNames";
import CloudSuite from "../../../commons/functions/CloudSuite";
import BaseClass from "../../../testBase/BaseClass";
import LNMasterData from '../../functions/LNMasterData';
import GetDataLN_CreateANewItemUsingItemDefaults from '../../dataMapping/configuringMultisiteEnvironment/GetDataLN_CreateANewItemUsingItemDefaults';
import config from '../../../plan/LNConfiguringMultisiteEnvironment.spec';

// Property data for testcases
const loginData = JSON.parse(JSON.stringify(require("../../../commons/data/productCredentials.json")));
const itemCnxt = JSON.parse(JSON.stringify(require("../../../data/ln/TCEDU-LNConfiguringMultisiteEnvironment/CreateANewItemUsingItemDefaults.properties.json")));
/**---------------------------------------------------------------------------------------
 * Purpose : Create a new item using item defaults
 * Exercise : 2.3.1, 2.3.2
 * Workbook  : LN Cloud Configuring Multisite and Intercompany Trade Training Workbook
 * 1. Review item defaults
 * 2. Create a new item
 * ---------------------------------------------------------------------------------------*/
export default function TCEDU_LNCreateANewItemUsingItemDefaults() {

    test.describe.configure({ mode: 'serial' });
    
    test.describe('TCEDU_LNCreateANewItemUsingItemDefaults', () => {

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
            await BaseClass.page.close();
        });
    })
}