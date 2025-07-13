import {test} from '@playwright/test';
import ProductNames from "../../../commons/constants/ProductNames";
import CloudSuite from "../../../commons/functions/CloudSuite";
import BaseClass from "../../../testBase/BaseClass";
import LNMasterData from '../../functions/LNMasterData';

// Property data for testcases
const loginData = JSON.parse(JSON.stringify(require("../../../commons/data/productCredentials.json")));
const enterpriseMdlCnxt = JSON.parse(JSON.stringify(require("../../../data/ln/TCEDU-LNConfiguringMultisiteEnvironment/ReviewTheEnterpriseModel.properties.json")));

export default function TCEDU_LNReviewEnterpriseModel() {

    test.describe('TCEDU_LNReviewEnterpriseModel', () => {
        test('login', async ({ }) => {
            await BaseClass.globalSetup();
            await CloudSuite.login(loginData.lnUrl, loginData.lnmultisiteUsername, loginData.lnmultisitePassword);
        });

        test('Select a map provider', async ({ }) => {

            await CloudSuite.navigateToApplication(ProductNames.LN);

            await LNMasterData.reviewEnterpriseModelInInforLN(enterpriseMdlCnxt);

        });
    })
}