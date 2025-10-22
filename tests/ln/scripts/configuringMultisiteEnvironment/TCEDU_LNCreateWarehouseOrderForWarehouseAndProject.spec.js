import {test} from '@playwright/test';
import ProductNames from "../../../commons/constants/ProductNames";
import CloudSuite from "../../../commons/functions/CloudSuite";
import BaseClass from "../../../testBase/BaseClass";
import LNCommonFunctions from '../../functions/LNCommonFunctions';
import LNProcurement from '../../functions/LNProcurement';
import LNWarehousing from '../../functions/LNWarehousing';
import LNMasterData from '../../functions/LNMasterData';

// Property data for testcases
const loginData = JSON.parse(JSON.stringify(require("../../../commons/data/productCredentials.json")));
const warehouseCnxt = JSON.parse(JSON.stringify(require("../../../data/ln/TCEDU-LNConfiguringMultisiteEnvironment/CreateWarehouseOrderForWarehouseAndProject.properties.json")));
/**
 * ---------------------------------------------------------------------------------------
 * Purpose  : Create a warehouse order (warehouse and project)
 * Exercise : 3.4.1, 3.4.2, 3.4.3, 3.4.4, 3.4.5, 3.4.6, 3.4.7, 3.4.8, 3.4.9, 3.4.10
 * 
 * 1. Support Internal Material Delivery to Project
 * 2. Create Project Data
 * 3. Intercompany trade relations between Boston Enterprise Unit and any US entity
 * 4. Unhide Project activity fields and Cost Component fields in the warehouse orders session
 * 5. Create warehouse transfer (Boston Warehouse to Project PRJ000003)
 * 6. Review intercompany trade order – sales (by warehouse)
 * 7. Ship warehouse transfer (by warehouse)
 * 8. Review the intercompany trade order transaction line (by Project)
 * 9. Invoice intercompany trade order transaction line (by Warehouse)
 * 10.Create intercompany trade purchase invoice (by PROJECT)
 * ---------------------------------------------------------------------------------------
 */

export default function TCEDU_LNCreateAWarehouseTransferAndPurchaseOrder() {

    test.describe.configure({ mode: 'serial' });
    
    test.describe('TCEDU_LNCreateAWarehouseTransferAndPurchaseOrder', () => {

        test.beforeAll(async ({}) => { 
            await BaseClass.globalSetup();
            await CloudSuite.login(loginData.lnUrl, loginData.lnmultisiteUsername, loginData.lnmultisitePassword);
        });

       test('Support Internal Material Delivery to Project', async ({ }) => {
            await LNCommonFunctions.supportInternalMaterialDeliveryToProject(warehouseCnxt.parameter);
        });
        
        test('Create Project Data', async ({ }) => {
            await LNMasterData.createProjectData(warehouseCnxt.item);
        });

        test('Intercompany trade relations between Boston Enterprise Unit and any US entity', async ({ }) => {
            await LNCommonFunctions.intercompanyTradeRelationsBetweenBostonEnterpriseUnitAndAnyUSEntity(warehouseCnxt.fromEnterpriseUnit, warehouseCnxt.scenario);
        });

        test('Unhide Project activity fields and Cost Component fields in the warehouse orders session', async ({ }) => {
            await LNWarehousing.unhideProjectActivityFieldsAndCostComponentFieldsInWarehouseOrdersSession(warehouseCnxt.orderNo,
			warehouseCnxt.orderLine[0], warehouseCnxt.personalizeColumms);
        });

        test('Create warehouse transfer (Boston Warehouse to Project PRJ000003)', async ({ }) => {
            await LNWarehousing.createWarehouseTransferBostonWarehouseToProject(warehouseCnxt);
        });

        test('Review intercompany trade order – sales (by warehouse)', async ({ }) => {
            await LNCommonFunctions.reviewIntercompanyTradeOrderSalesByWarehouse(warehouseCnxt);
        });

        test('Ship warehouse transfer (by warehouse)', async ({ }) => {
            await LNWarehousing.shipWarehouseTransferByWarehouse(warehouseCnxt);
        });

        test('Review the intercompany trade order transaction line (by Project)', async ({ }) => {
            await LNWarehousing.reviewIntercompanyTradeOrderTransactionLineByProject(warehouseCnxt);
        });

        test('Invoice intercompany trade order transaction line (by Warehouse)', async ({ }) => {
            await LNCommonFunctions.invoiceIntercompanyTradeOrderTransactionLineByWarehouse(warehouseCnxt);
        });

        test('Create intercompany trade purchase invoice (by PROJECT)', async ({ }) => {
            await LNCommonFunctions.createIntercompanyTradePurchaseInvoiceByProject(warehouseCnxt);
        });

        test.afterAll(async () => {
            await BaseClass.page.close();
        });
    })
}
