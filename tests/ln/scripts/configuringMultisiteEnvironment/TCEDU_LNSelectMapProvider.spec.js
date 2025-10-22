import {test} from '@playwright/test';
import ProductNames from "../../../commons/constants/ProductNames";
import CloudSuite from "../../../commons/functions/CloudSuite";
import BaseClass, { log } from "../../../testBase/BaseClass";
import LNTools from "../../functions/LNTools";
import config from '../../../plan/LNConfiguringMultisiteEnvironment.spec';
import fs from 'fs';
import { createTestLogger } from '../../../../utils/logger.js';

/*---------------------------------------------------------------------------------------
* Purpose   : Select a map provider
* Workbook  : LN Cloud Configuring Multisite and Intercompany Trade Training Workbook
* Exercise	: 1.1
* -----------------------------------------------------------------------------------------*/

// Property data for testcases
const loginData = JSON.parse(JSON.stringify(require("../../../commons/data/productCredentials.json")));
const mapCnxt = JSON.parse(JSON.stringify(require("../../../data/ln/TCEDU-LNConfiguringMultisiteEnvironment/SelectMapProvider.properties.json")));


export default function TCEDU_LNSelectMapProvider() {
  
    BaseClass.describeTest('TCEDU_LNSelectMapProvider', () => {

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
        });
    })
}