import {test} from '@playwright/test';
import ProductNames from "../../../commons/constants/ProductNames";
import CloudSuite from "../../../commons/functions/CloudSuite";
import BaseClass from "../../../testBase/BaseClass";
import LNTools from "../../functions/LNTools";

/*---------------------------------------------------------------------------------------
* Purpose   : Select a map provider
* Workbook  : LN Cloud Configuring Multisite and Intercompany Trade Training Workbook
* Exercise	: 1.1
* -----------------------------------------------------------------------------------------*/

// Property data for testcases
const loginData = JSON.parse(JSON.stringify(require("../../../commons/data/productCredentials.json")));
const mapCnxt = JSON.parse(JSON.stringify(require("../../../data/ln/TCEDU-LNConfiguringMultisiteEnvironment/SelectMapProvider.properties.json")));

export default function TCEDU_LNSelectMapProvider() {

    test.describe('TCEDU_LNSelectMapProvider', () => {
        
        test.describe.configure({ mode: 'serial' });
        
        test.beforeAll(async ({ }) => {
            await BaseClass.globalSetup();
            await CloudSuite.login(loginData.lnUrl, loginData.lnmultisiteUsername, loginData.lnmultisitePassword);
        });
        
        test('Select a map provider', async ({ }) => {
            await CloudSuite.navigateToApplication(ProductNames.LN);
            await LNTools.selectMapProvider(mapCnxt);
        });

        test.afterAll(async () => {
            await BaseClass.page.close();
        });
    })
}