import {test} from '@playwright/test';
import CloudSuite from '../../../commons/functions/CloudSuite';
import BaseClass, { describeTest } from '../../../testBase/BaseClass';
import PayablesManagerFunctions from '../functions/PayablesManagerFunctions';
import config from '../../plan/FSMFinancialsDifferencesToLawson.spec';
import ProductNames from '../../../commons/constants/ProductNames';

/**--------------------------------------------------------------------
 * Purpose  : 	Review changes to managing vendors
 * Exercise : 	1.3
 * --------------------------------------------------------------------*/

// Property data for testcases
const reviewScreenElementsContext = JSON.parse(JSON.stringify(require("../data/ReviewChangesToManagingVendors.properties.json")));


export default function TCEDU_FSMReviewChangesToManagingVendors() {
  
    describeTest('TCEDU_FSMReviewChangesToManagingVendors', () => {

        test.beforeAll('',async ({ }) => {
            await BaseClass.globalSetup();
            await CloudSuite.login(config.BASE_URL, config.USER_NAME, config.PASSWORD);
        });

        test('Review changes to managing vendors', async ({ }) => {
            await CloudSuite.navigateToApplication(ProductNames.FSM);

            // Collapse the context apps
		    await CloudSuite.collapseContextApps();

            await PayablesManagerFunctions.reviewChangesToManagingVendors(reviewScreenElementsContext);
        });

        test.afterAll(async () => {
            await CloudSuite.logOut();
            await BaseClass.page.close();
        });
    })
}