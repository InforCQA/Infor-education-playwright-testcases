import {test} from '@playwright/test';
import ProductNames from "../../../commons/constants/ProductNames";
import CloudSuite from "../../../commons/functions/CloudSuite";
import BaseClass from "../../../testBase/BaseClass";
import LNMasterData from '../../functions/LNMasterData';

// Property data for testcases
const loginData = JSON.parse(JSON.stringify(require("../../../commons/data/productCredentials.json")));
const structureCnxt = JSON.parse(JSON.stringify(require("../../../data/ln/TCEDU-LNConfiguringMultisiteEnvironment/DevelopTheOriginalEnterpriseStructure.properties.json")));

export default function TCEDU_LNDevelopTheOriginalEnterpriseStructure() {

    test.describe('TCEDU_LNDevelopTheOriginalEnterpriseStructure', () => {
        test('login', async ({ }) => {
            await BaseClass.globalSetup();
            await CloudSuite.login(loginData.lnUrl, loginData.lnmultisiteUsername, loginData.lnmultisitePassword);
        });
        // 1.4.1
        test('Create an address', async ({ }) => {
             await CloudSuite.navigateToApplication(ProductNames.LN);
             await LNMasterData.createAnAddress(structureCnxt);
         });

        // 1.4.2
        test('Create an enterprise unit', async ({ }) => {
            await LNMasterData.createAnEnterpriseUnit(structureCnxt);
        });
        
        // 1.4.3
        test('Create a planning cluster', async ({ }) => {
            await LNMasterData.createPlanningCluster(structureCnxt.planningCluster, structureCnxt.planningClusterDesc);
        });

        // 1.4.4
        test('Create a site', async ({ }) => {
            await LNMasterData.createSite(structureCnxt);
        });
        
        // // 1.4.5
        // test('Create a sales office and warehouse', async ({ }) => {
        //     await LNMasterData.createSalesOfficeAndWarehouse(structureCnxt);
        // });
        // // 1.4.6
        // test('Create a sales setting by site', async ({ }) => {
        //     await LNMasterData.createSalesSettingBySite(structureCnxt);
        // }); 
        // // 1.4.7
        // test('Review the new site details in the Enterprise Model Workbench', async ({ }) => {
        //     await LNMasterData.reviewNewSiteDetailsInEnterpriseModelWorkbench(structureCnxt);
        // }); 
    })
}