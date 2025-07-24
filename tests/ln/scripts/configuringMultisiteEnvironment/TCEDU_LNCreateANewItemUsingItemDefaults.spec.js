import {test} from '@playwright/test';
import ProductNames from "../../../commons/constants/ProductNames";
import CloudSuite from "../../../commons/functions/CloudSuite";
import BaseClass from "../../../testBase/BaseClass";
import LNMasterData from '../../functions/LNMasterData';
import GetDataLN_CreateANewItemUsingItemDefaults from '../../dataMapping/configuringMultisiteEnvironment/GetDataLN_CreateANewItemUsingItemDefaults';

// Property data for testcases
const loginData = JSON.parse(JSON.stringify(require("../../../commons/data/productCredentials.json")));
const itemCnxt = JSON.parse(JSON.stringify(require("../../../data/ln/TCEDU-LNConfiguringMultisiteEnvironment/CreateANewItemUsingItemDefaults.properties.json")));

export default function TCEDU_LNCreateANewItemUsingItemDefaults() {

    test.describe('TCEDU_LNCreateANewItemUsingItemDefaults', () => {
        test('login', async ({ }) => {
            
            // Input Data Returned From Data Mapping
            await GetDataLN_CreateANewItemUsingItemDefaults.getItemContext(itemCnxt);

            await BaseClass.globalSetup();
            await CloudSuite.login(loginData.lnUrl, loginData.lnmultisiteUsername, loginData.lnmultisitePassword);
        });

      
        test('Review item defaults', async ({ }) => {
             await CloudSuite.navigateToApplication(ProductNames.LN);

             await LNMasterData.reviewItemDefaults(itemCnxt);
         });

       
        test('Create a new item', async ({ }) => {
            test.slow(); 
            await LNMasterData.createANewItem(itemCnxt);
        });
    })
}