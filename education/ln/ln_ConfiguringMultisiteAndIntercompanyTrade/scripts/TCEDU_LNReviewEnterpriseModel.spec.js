import {test} from '@playwright/test';
import BaseClass from '../../../testBase/BaseClass';
import {describeTest} from '../../../testBase/BaseClass';
import CloudSuite from '../../../commons/functions/CloudSuite';
import config from '../../plan/LNConfiguringMultisiteEnvironment.spec';
import ProductNames from '../../../commons/constants/ProductNames';
import LNMasterData from '../functions/LNMasterData';

/**---------------------------------------------------------------------------------------
 * Purpose  : Review the enterprise model
 * Exercise : 1.2.1, 1.2.2
 * Workbook : LN Cloud Configuring Multisite and Intercompany Trade Training Workbook
 * 1. Review the enterprise model in LN CE
 * 2. Review a site in LN CE
 * ---------------------------------------------------------------------------------------*/

// Property data for testcases
const enterpriseMdlCnxt = JSON.parse(JSON.stringify(require("../data/ReviewTheEnterpriseModel.properties.json")));

export default function TCEDU_LNReviewEnterpriseModel() {

    
    describeTest('TCEDU_LNReviewEnterpriseModel', () => {

        test.beforeAll(async ({}) => {
            await BaseClass.globalSetup();
            await CloudSuite.login(config.BASE_URL, config.USER_NAME, config.PASSWORD);
        });

        test('Review the enterprise model in LN CE', async ({}) => {
            await CloudSuite.navigateToApplication(ProductNames.LN);
            await LNMasterData.reviewEnterpriseModelInLNCE(enterpriseMdlCnxt);
        });

        test('Review a site in LN CE', async ({}) => {
            await LNMasterData.reviewASiteInLNCE(enterpriseMdlCnxt);
        });

        test.afterAll(async () => {
            await CloudSuite.logOut();
            await BaseClass.page.close();
        });

    })
}