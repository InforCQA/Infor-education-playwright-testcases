import {test} from '@playwright/test';
import CloudSuite from '../../../commons/functions/CloudSuite';
import BaseClass, { describeTest } from '../../../testBase/BaseClass';
import PayablesManagerFunctions from '../functions/PayablesManagerFunctions';
import config from '../../plan/FSMFinancialsDifferencesToLawson.spec';
import ProductNames from '../../../commons/constants/ProductNames';

/**-----------------------------------------------------
 * Purpose   : 	Use Condition Builder to define rules
 * Exercises : 	Demo 11.4
 * -----------------------------------------------------*/

// Property data for testcases
const customGrpContext = JSON.parse(JSON.stringify(require("../data/UseConditionBuilderToDefineRules.properties.json")));


export default function TCEDU_FSMUseConditionBuilderToDefineRules() {
  
    describeTest('TCEDU_FSMUseConditionBuilderToDefineRules', () => {

        test.beforeAll('',async ({ }) => {
            await BaseClass.globalSetup();
            await CloudSuite.login(config.BASE_URL, config.USER_NAME, config.PASSWORD);
        });

        test('Use Condition Builder to define rules', async ({ }) => {
            await CloudSuite.navigateToApplication(ProductNames.FSM);

            // Collapse the context apps
		    await CloudSuite.collapseContextApps();

            await PayablesManagerFunctions.useTheConditionBuilderToDefineRules(customGrpContext);
        });

        test.afterAll(async () => {
            await CloudSuite.logOut();
            await BaseClass.page.close();
        });
    })
}