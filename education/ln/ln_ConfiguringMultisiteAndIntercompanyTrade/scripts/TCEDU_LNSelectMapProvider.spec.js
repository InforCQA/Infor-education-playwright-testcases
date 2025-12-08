import {test} from '@playwright/test';
import LNTools from '../functions/LNTools';
import CloudSuite from '../../../commons/functions/CloudSuite';
import BaseClass from '../../../testBase/BaseClass';
import config from '../../plan/LNConfiguringMultisiteEnvironment.spec';
import ProductNames from '../../../commons/constants/ProductNames';
import {describeTest} from '../../../testBase/BaseClass';

/*---------------------------------------------------------------------------------------
* Purpose   : Select a map provider
* Workbook  : LN Cloud Configuring Multisite and Intercompany Trade Training Workbook
* Exercise	: 1.1
* -----------------------------------------------------------------------------------------*/

// Property data for testcases
const mapCnxt = JSON.parse(JSON.stringify(require("../../ln_ConfiguringMultisiteAndIntercompanyTrade/data/SelectMapProvider.properties.json")));


export default function TCEDU_LNSelectMapProvider() {
  
    describeTest('TCEDU_LNSelectMapProvider', () => {

        test.beforeAll('',async ({ }) => {
            await BaseClass.globalSetup();
            await CloudSuite.login(config.BASE_URL, config.USER_NAME, config.PASSWORD);
        });

        test('Select a map provider', async ({ }) => {
            await CloudSuite.navigateToApplication(ProductNames.LN);
            await LNTools.selectMapProvider(mapCnxt);
        });

        test.afterAll(async () => {
            await CloudSuite.logOut();
            await BaseClass.page.close();
        });
    })
}