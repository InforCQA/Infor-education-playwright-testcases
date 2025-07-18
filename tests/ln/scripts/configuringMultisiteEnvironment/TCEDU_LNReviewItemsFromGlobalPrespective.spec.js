import {test} from '@playwright/test';
import BaseClass from '../../../testBase/BaseClass';
import CloudSuite from '../../../commons/functions/CloudSuite';

export default function TCEDU_LNReviewItemsFromGlobalPrespective() {

    test.describe('TCEDU_LNReviewItemsFromGlobalPrespective', () => {
        test('login', async ({ }) => {
            await BaseClass.globalSetup();
            await CloudSuite.login(loginData.lnUrl, loginData.lnmultisiteUsername, loginData.lnmultisitePassword);
        });
        // 2.1.1
        test('Create an address', async ({ }) => {
             await CloudSuite.navigateToApplication(ProductNames.LN);
             await LNMasterData.createAnAddress(structureCnxt);
         });

    })
}