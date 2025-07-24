import {test} from '@playwright/test';
import ProductNames from "../../../commons/constants/ProductNames";
import CloudSuite from "../../../commons/functions/CloudSuite";
import BaseClass from "../../../testBase/BaseClass";
import LNCommonFunctions from '../../functions/LNCommonFunctions';
import LNProcurement from '../../functions/LNProcurement';
import LNWarehousing from '../../functions/LNWarehousing';

// Property data for testcases
const loginData = JSON.parse(JSON.stringify(require("../../../commons/data/productCredentials.json")));
const warehouseCnxt = JSON.parse(JSON.stringify(require("../../../data/ln/TCEDU-LNConfiguringMultisiteEnvironment/CreateAWarehouseTransferAndPurchaseOrder.properties.json")));

export default function TCEDU_LNDevelopTheOriginalEnterpriseStructure() {

    test.describe('TCEDU_LNCreateAWarehouseTransferAndPurchaseOrder', () => {

        test('login', async ({ }) => {
            
            await BaseClass.globalSetup();
            await CloudSuite.login(loginData.lnUrl, loginData.lnmultisiteUsername, loginData.lnmultisitePassword);
        });

        // Create warehouse transfer (by sales center)
		// Review intercompany trade order - purchase (by sales center)	
		// Review intercompany trade order - sales (by distribution center)		
		// Ship warehouse transfer (by distribution center)
		// Review the intercompany trade order transaction line (by sales center)
        test('Review intercompany trade order - purchase (by sales center)', async ({ }) => {
             await CloudSuite.navigateToApplication(ProductNames.LN);
             LNWarehousing.createAWarehouseTransferForInternalMaterialDelivery(warehouseCnxt);
         });

        // 1.4.2
        test('Create an enterprise unit', async ({ }) => {
            await LNCommonFunctions.invoiceIntercompanyTradeOrderTransactionLineByTheDistributionCenter(warehouseCnxt.enterpriseUnits, warehouseCnxt.intercompanyTradeNumPurchase, 1);
        });
        
        // 1.4.3
        test('Create a planning cluster', async ({ }) => {
            await LNCommonFunctions.createIntercompanyTradePurchaseInvoiceByTheSalesCenter(warehouseCnxt.intercompanyTradeNumPurchase, null, 1);
        });

        // 1.4.4
        test('Create a site', async ({ }) => {
            await LNProcurement.createAPurchaseOrderForExternalMaterialDelivery(warehouseCnxt);
        });
        
        // 1.4.5
        test('Create a sales office and warehouse', async ({ }) => {
            await LNCommonFunctions.invoiceIntercompanyTradeOrderTransactionLineByPurchaseOfficeOfDistributionCenter(warehouseCnxt);
        });
        
        // 1.4.6
        test('Create a sales setting by site', async ({ }) => {
            await LNCommonFunctions.createIntercompanyTradePurchaseInvoiceByTheSalesCenter(warehouseCnxt.intercompanyTradeNumSales, warehouseCnxt.toEnterpriseUnit, 2);
        }); 

        // 1.4.7
        test('Review the new site details in the Enterprise Model Workbench', async ({ }) => {
            await LNCommonFunctions.reviewTheIntercompanyTradeSalesDashboard(warehouseCnxt);
        }); 

          // 1.4.7
        test('Review the new site details in the Enterprise Model Workbench', async ({ }) => {
            await LNCommonFunctions.reviewTheIntercompanyTradePurchaseDashboard(warehouseCnxt);
        }); 

    })
}