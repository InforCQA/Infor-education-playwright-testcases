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

export default function TCEDU_LNCreateAWarehouseTransferAndPurchaseOrder() {

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
             test.slow(); 
             await CloudSuite.navigateToApplication(ProductNames.LN);
             await LNWarehousing.createAWarehouseTransferForInternalMaterialDelivery(warehouseCnxt);
         });

        // 1.4.2
        // test('Invoice intercompany trade order transaction line (by distribution center)', async ({ }) => {
        //     await LNCommonFunctions.invoiceIntercompanyTradeOrderTransactionLineByTheDistributionCenter(warehouseCnxt.enterpriseUnits, warehouseCnxt.intercompanyTradeNumPurchase, 1);
        // });
        
        // // 1.4.3
        // test('Create intercompany trade purchase invoice (by sales center)', async ({ }) => {
        //     await LNCommonFunctions.createIntercompanyTradePurchaseInvoiceByTheSalesCenter(warehouseCnxt.intercompanyTradeNumPurchase, null, 1);
        // });

        // // Create purchase order (by distribution center)
		// // Review intercompany trade order - sales (by purchase office at distribution center)
		// // Review intercompany trade order - purchase (by sales center)
		// // Receive the purchase order (by your sales center)
		// // Review the intercompany trade order transaction line (by distribution center)
        // test('Create purchase order (by distribution center)', async ({ }) => {
        //     await LNProcurement.createAPurchaseOrderForExternalMaterialDelivery(warehouseCnxt);
        // });
        
        // // 1.4.5
        // test('Invoice intercompany trade order transaction line (by purchase office of distribution center)', async ({ }) => {
        //     await LNCommonFunctions.invoiceIntercompanyTradeOrderTransactionLineByPurchaseOfficeOfDistributionCenter(warehouseCnxt);
        // });
        
        // // 1.4.6
        // test('Create intercompany trade purchase invoice(by sales center)', async ({ }) => {
        //     await LNCommonFunctions.createIntercompanyTradePurchaseInvoiceByTheSalesCenter(warehouseCnxt.intercompanyTradeNumSales, warehouseCnxt.toEnterpriseUnit, 2);
        // }); 

        // // 1.4.7
        // test('Review the Intercompany Trade Sales Dashboard', async ({ }) => {
        //     await LNCommonFunctions.reviewTheIntercompanyTradeSalesDashboard(warehouseCnxt);
        // }); 

        //   // 1.4.7
        // test('Review the Intercompany Trade Purchase Dashboard', async ({ }) => {
        //     await LNCommonFunctions.reviewTheIntercompanyTradePurchaseDashboard(warehouseCnxt);
        // }); 

    })
}