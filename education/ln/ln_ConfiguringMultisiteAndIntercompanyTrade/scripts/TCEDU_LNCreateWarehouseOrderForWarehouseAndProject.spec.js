import {test} from '@playwright/test';
import CloudSuite from "../../../commons/functions/CloudSuite";
import BaseClass from "../../../testBase/BaseClass";
import {describeTest} from '../../../testBase/BaseClass';
import config from '../../plan/LNConfiguringMultisiteEnvironment.spec';
import LNCommonFunctions from '../functions/LNCommonFunctions';
import LNMasterData from '../functions/LNMasterData';
import LNWarehousing from '../functions/LNWarehousing';

// Property data for testcases
const warehouseCnxt = JSON.parse(JSON.stringify(require("../data/CreateWarehouseOrderForWarehouseAndProject.properties.json")));
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

export default function TCEDU_LNCreateWarehouseOrderForWarehouseAndProject() {
    
    describeTest('TCEDU_LNCreateWarehouseOrderForWarehouseAndProject', () => {

          test.beforeAll('',async ({ }) => {
            await BaseClass.globalSetup();
            await CloudSuite.login(config.BASE_URL, config.USER_NAME, config.PASSWORD);
        });


    //    test('Support Internal Material Delivery to Project', async ({ }) => {
    //         await LNCommonFunctions.supportInternalMaterialDeliveryToProject(warehouseCnxt.parameter);
    //     });
        
    //     test('Create Project Data', async ({ }) => {
    //         await LNMasterData.createProjectData(warehouseCnxt.item);
    //     });

    //     test('Intercompany trade relations between Boston Enterprise Unit and any US entity', async ({ }) => {
    //         await LNCommonFunctions.intercompanyTradeRelationsBetweenBostonEnterpriseUnitAndAnyUSEntity(warehouseCnxt.fromEnterpriseUnit, warehouseCnxt.scenario);
    //     });

        // test('Unhide Project activity fields and Cost Component fields in the warehouse orders session', async ({ }) => {
        //     await LNWarehousing.unhideProjectActivityFieldsAndCostComponentFieldsInWarehouseOrdersSession(warehouseCnxt.orderNo,
		// 	warehouseCnxt.orderLine, warehouseCnxt.personalizeColumms);
        // });

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
            await CloudSuite.logOut();
            await BaseClass.page.close();
        });
    })
}
