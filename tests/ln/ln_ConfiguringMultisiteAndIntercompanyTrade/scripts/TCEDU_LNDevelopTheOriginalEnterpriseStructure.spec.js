import {test} from '@playwright/test';
import ProductNames from "../../../commons/constants/ProductNames";
import CloudSuite from "../../../commons/functions/CloudSuite";
import BaseClass from "../../../testBase/BaseClass";
import LNMasterData from '../../ConfiguringMultisiteAndIntercompanyTrade/functions/LNMasterData';
import GetDataLN_DevelopTheOriginalEnterpriseStructure from '../../ConfiguringMultisiteAndIntercompanyTrade/dataMapping/GetDataLN_DevelopTheOriginalEnterpriseStructure';
import config from '../../plan/LNConfiguringMultisiteEnvironment.spec';

// Property data for testcases
const loginData = JSON.parse(JSON.stringify(require("../../../commons/data/productCredentials.json")));
const structureCnxt = JSON.parse(JSON.stringify(require("../../../data/ln/TCEDU-LNConfiguringMultisiteEnvironment/DevelopTheOriginalEnterpriseStructure.properties.json")));

 /* ---------------------------------------------------------------------------------------
 * Purpose  : Develop the original enterprise structure
 * Workbook  : LN Cloud Configuring Multisite and Intercompany Trade Training Workbook
 * Exercise : 1.3.1, 1.3.2, 1.3.3, 1.3.4, 1.3.5, 1.3.6, 1.3.7
 * 1. Create an address Type the step
 * 2. Create an enterprise unit
 * 3. Create a planning cluster
 * 4. Create a site
 * 5. Create a sales office and warehouse
 * 6. Create a sales setting by site
 * 7. Review the new site details in the Enterprise Model Workbench
 * ---------------------------------------------------------------------------------------*/
export default function TCEDU_LNDevelopTheOriginalEnterpriseStructure() {

    test.describe.configure({ mode: 'serial' });

    test.describe('TCEDU_LNDevelopTheOriginalEnterpriseStructure', () => {

        test.beforeAll(async ({ }) => {

            // Input Data Returned From Data Mapping
            await GetDataLN_DevelopTheOriginalEnterpriseStructure.getLNDevelopTheOriginalEnterpriseStructureContext(structureCnxt);

            await BaseClass.globalSetup();
            await CloudSuite.login(config.BASE_URL, config.USER_NAME, config.PASSWORD);
        });

        test('Create an address Type the step', async ({ }) => {
             await CloudSuite.navigateToApplication(ProductNames.LN);
             await LNMasterData.createAnAddressTypeTheStep(structureCnxt);
         });

        test('Create an enterprise unit', async ({ }) => {
            await LNMasterData.createAnEnterpriseUnit(structureCnxt);
        });
        
        test('Create a planning cluster', async ({ }) => {
            await LNMasterData.createPlanningCluster(structureCnxt.planningCluster, structureCnxt.planningClusterDesc);
        });

        test('Create a site', async ({ }) => {
            await LNMasterData.createSite(structureCnxt);
        });
        
        test('Create a sales office and warehouse', async ({ }) => {
            await LNMasterData.createSalesOfficeAndWarehouse(structureCnxt);
        });
        
        test('Create a sales setting by site', async ({ }) => {
            await LNMasterData.createSalesSettingBySite(structureCnxt);
        });

        test('Review the new site details in the Enterprise Model Workbench', async ({ }) => {
            await LNMasterData.reviewNewSiteDetailsInEnterpriseModelWorkbench(structureCnxt);
        });

        test.afterAll(async () => {
            await BaseClass.page.close();
        });
    })
}