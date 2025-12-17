import {test} from '@playwright/test';
import CloudSuite from '../../../commons/functions/CloudSuite';
import BaseClass, { describeTest } from '../../../testBase/BaseClass';
import PayablesManagerFunctions from '../functions/PayablesManagerFunctions';
import config from '../../plan/FSMFinancialsDifferencesToLawson.spec';
import ProductNames from '../../../commons/constants/ProductNames';

/**--------------------------------------------------------------------------
 * Purpose	 : Review the screen elements on the Payables Manager homepage
 * Exercise  : 1.1.1, 1.1.2, 1.1.3
 * 1. Access FSM
 * 2. Review the screen elements on the Payables Manager homepage
 * --------------------------------------------------------------------------*/

// Property data for testcases
const reviewScreenElementsContext = JSON.parse(JSON.stringify(require("../data/ReviewScreenElements.properties.json")));


export default function TCEDU_FSMReviewTheScreenElementsOnPayablesManagerHomepage() {
  
    describeTest('TCEDU_FSMReviewTheScreenElementsOnPayablesManagerHomepage', () => {

        test.beforeAll('',async ({ }) => {
            await BaseClass.globalSetup();
            await CloudSuite.login(config.BASE_URL, config.USER_NAME, config.PASSWORD);
        });

        test('Review the screen elements on the Payables Manager homepage', async ({ }) => {
            await CloudSuite.navigateToApplication(ProductNames.FSM);

            // Collapse the context apps
		    await CloudSuite.collapseContextApps();

            await PayablesManagerFunctions.reviewTheScreenElementsOnPayablesManagerHomepage(reviewScreenElementsContext);
        });

        test.afterAll(async () => {
            await CloudSuite.logOut();
            await BaseClass.page.close();
        });
    })
}