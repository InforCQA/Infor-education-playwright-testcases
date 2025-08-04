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

/**---------------------------------------------------------------------------------------
 * Purpose  : Create A Warehouse Transfer And Purchase Order
 * Exercise : 3.2.1, 3.2.2, 3.2.3, 3.2.4, 3.2.5, 3.2.6, 3.2.7, 3.3.1, 3.3.2, 3.3.3, 3.3.4, 
 * 			  3.3.5, 3.3.6, 3.3.7, 3.4.1, 3.4.2
 * Workbook : LN Cloud Configuring Multisite and Intercompany Trade Training Workbook
 * 1. Create warehouse transfer (by sales center)
 * 2. Review intercompany trade order - purchase (by sales center)
 * 3. Review intercompany trade order - sales (by distribution center)
 * 4. Ship warehouse transfer (by distribution center)
 * 5. Review the intercompany trade order transaction line (by sales center)
 * 6. Invoice intercompany trade order transaction line (by distribution center)
 * 7. Create intercompany trade purchase invoice (by sales center)
 * 8. Create purchase order (by distribution center)
 * 9. Review intercompany trade order - sales (by purchase office at distribution center)
 * 10.Review intercompany trade order - purchase (by sales center)
 * 11.Receive the purchase order (by your sales center)
 * 12.Review the intercompany trade order transaction line (by distribution center)
 * 13.Invoice intercompany trade order transaction line (by purchase office of distribution center)
 * 14.Create intercompany trade purchase invoice (by sales center)
 * 15.Review the Intercompany Trade Sales Dashboard
 * 16.Review the Intercompany Trade Purchase Dashboard
 * ---------------------------------------------------------------------------------------*/
export default function TCEDU_LNCreateAWarehouseTransferAndPurchaseOrder() {

    test.describe('TCEDU_LNCreateAWarehouseTransferAndPurchaseOrder', () => {

        test('login', async ({ }) => {
            
            await BaseClass.globalSetup();
            await CloudSuite.login(loginData.lnUrl, loginData.lnmultisiteUsername, loginData.lnmultisitePassword);
        });

        /* Create warehouse transfer (by sales center)
		 * Review intercompany trade order - purchase (by sales center)	
		 * Review intercompany trade order - sales (by distribution center)		
		 * Ship warehouse transfer (by distribution center)
		 * Review the intercompany trade order transaction line (by sales center)*/
        test('Review intercompany trade order - purchase (by sales center)', async ({ }) => {
              await CloudSuite.navigateToApplication(ProductNames.LN);
              await LNWarehousing.createAWarehouseTransferForInternalMaterialDelivery(warehouseCnxt);
        });

        test('Invoice intercompany trade order transaction line (by distribution center)', async ({ }) => {                           
            await LNCommonFunctions.invoiceIntercompanyTradeOrderTransactionLineByTheDistributionCenter(warehouseCnxt.enterpriseUnits, warehouseCnxt.intercompanyTradeNumPurchase, 1);
        });
        
        test('Create intercompany trade purchase invoice (by sales center)', async ({ }) => {
            warehouseCnxt.intercompanyTradeNumPurchase="000000101";
            await LNCommonFunctions.createIntercompanyTradePurchaseInvoiceByTheSalesCenter(warehouseCnxt.intercompanyTradeNumPurchase, null, 1);
        });

        /* Create purchase order (by distribution center)
		 * Review intercompany trade order - sales (by purchase office at distribution center)
		 * Review intercompany trade order - purchase (by sales center)
		 * Receive the purchase order (by your sales center)
		 * Review the intercompany trade order transaction line (by distribution center)*/
        test('Create purchase order (by distribution center)', async ({ }) => {
            await LNProcurement.createAPurchaseOrderForExternalMaterialDelivery(warehouseCnxt);
        });
        
        test('Invoice intercompany trade order transaction line (by purchase office of distribution center)', async ({ }) => {
            await LNCommonFunctions.invoiceIntercompanyTradeOrderTransactionLineByPurchaseOfficeOfDistributionCenter(warehouseCnxt);
        });
        
        test('Create intercompany trade purchase invoice(by sales center)', async ({ }) => {
            await LNCommonFunctions.createIntercompanyTradePurchaseInvoiceByTheSalesCenter(warehouseCnxt.intercompanyTradeNumSales, warehouseCnxt.toEnterpriseUnit, 2);
        }); 

        test('Review the Intercompany Trade Sales Dashboard', async ({ }) => {
            await LNCommonFunctions.reviewTheIntercompanyTradeSalesDashboard(warehouseCnxt);
        }); 

        test('Review the Intercompany Trade Purchase Dashboard', async ({ }) => {
            await LNCommonFunctions.reviewTheIntercompanyTradePurchaseDashboard(warehouseCnxt);
        }); 

    })
}