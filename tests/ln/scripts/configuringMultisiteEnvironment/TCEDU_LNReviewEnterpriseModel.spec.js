import {test} from '@playwright/test';
import ProductNames from "../../../commons/constants/ProductNames";
import CloudSuite from "../../../commons/functions/CloudSuite";
import BaseClass from "../../../testBase/BaseClass";
import LNMasterData from '../../functions/LNMasterData';

/**---------------------------------------------------------------------------------------
 * Purpose  : Review the enterprise model
 * Exercise : 1.2.1, 1.2.2
 * Workbook : LN Cloud Configuring Multisite and Intercompany Trade Training Workbook
 * 1. Review the enterprise model in LN CE
 * 2. Review a site in LN CE
 * ---------------------------------------------------------------------------------------*/

// Property data for testcases
const loginData = JSON.parse(JSON.stringify(require("../../../commons/data/productCredentials.json")));
const enterpriseMdlCnxt = JSON.parse(JSON.stringify(require("../../../data/ln/TCEDU-LNConfiguringMultisiteEnvironment/ReviewTheEnterpriseModel.properties.json")));

export default function TCEDU_LNReviewEnterpriseModel() {

    test.describe.configure({ mode: 'serial' });
    
    test.describe('TCEDU_LNReviewEnterpriseModel', () => {

        test.beforeAll(async () => {
            await BaseClass.globalSetup();
            await CloudSuite.login(loginData.lnUrl, loginData.lnmultisiteUsername, loginData.lnmultisitePassword);
        });

        test('Review the enterprise model in LN CE', async ({ }) => {
            await CloudSuite.navigateToApplication(ProductNames.LN);
            await LNMasterData.reviewEnterpriseModelInLNCE(enterpriseMdlCnxt);
        });

        test('Review a site in LN CE', async ({ }) => {
            await LNMasterData.reviewASiteInLNCE(enterpriseMdlCnxt);
        });

        test.afterAll(async () => {
            await BaseClass.page.close();
        });

    })
}