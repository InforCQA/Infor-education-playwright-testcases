import { test } from '@playwright/test';
import TCEDU_LNSelectMapProvider from "../../ln/scripts/configuringMultisiteEnvironment/TCEDU_LNSelectMapProvider.spec";
import TCEDU_LNReviewEnterpriseModel from '../../ln/scripts/configuringMultisiteEnvironment/TCEDU_LNReviewEnterpriseModel.spec';
import TCEDU_LNDevelopTheOriginalEnterpriseStructure from "../../ln/scripts/configuringMultisiteEnvironment/TCEDU_LNDevelopTheOriginalEnterpriseStructure.spec";
import TCEDU_LNReviewAndUpdateItemsFromSalesPerspective from '../../ln/scripts/configuringMultisiteEnvironment/TCEDU_LNReviewAndUpdateItemsFromSalesPerspective.spec';
import TCEDU_LNCreateANewItemUsingItemDefaults from '../../ln/scripts/configuringMultisiteEnvironment/TCEDU_LNCreateANewItemUsingItemDefaults.spec';
import TCEDU_LNReviewItemsFromGlobalPrespective from '../../ln/scripts/configuringMultisiteEnvironment/TCEDU_LNReviewItemsFromGlobalPrespective.spec';
import TCEDU_LNUpdateLocalBusinessPartnerAndCreateSalesOrders from '../../ln/scripts/configuringMultisiteEnvironment/TCEDU_LNUpdateLocalBusinessPartnerAndCreateSalesOrders.spec';
import TCEDU_LNCreateAWarehouseTransferAndPurchaseOrder from '../../ln/scripts/configuringMultisiteEnvironment/TCEDU_LNCreateAWarehouseTransferAndPurchaseOrder.spec';

const config = {
  BASE_URL: "https://mingle-portal.inforcloudsuite.com/v2/EDUGDENA003_TST",
  USER_NAME: "3170st01@infor-edu.com",
  PASSWORD: "Infor123!"
};

test.describe.configure({ mode: 'parallel' });

test.describe('TCEDU_LNSelectMapProvider', () => {
   TCEDU_LNSelectMapProvider();
});

test.describe('TCEDU_LNReviewEnterpriseModel', () => {
   TCEDU_LNReviewEnterpriseModel();
});

test.describe('TCEDU_LNDevelopTheOriginalEnterpriseStructure', () => {
   TCEDU_LNDevelopTheOriginalEnterpriseStructure();
});

test.describe('TCEDU_LNReviewItemsFromGlobalPrespective', () => {
   TCEDU_LNReviewItemsFromGlobalPrespective();
});

test.describe('TCEDU_LNReviewAndUpdateItemsFromSalesPerspective', () => {
   TCEDU_LNReviewAndUpdateItemsFromSalesPerspective();
});

test.describe('TCEDU_LNCreateANewItemUsingItemDefaults', () => {
   TCEDU_LNCreateANewItemUsingItemDefaults();
});

// test.describe('TCEDU_LNUpdateLocalBusinessPartnerAndCreateSalesOrders', () => {
//    TCEDU_LNUpdateLocalBusinessPartnerAndCreateSalesOrders();
// });

test.describe('TCEDU_LNCreateAWarehouseTransferAndPurchaseOrder', () => {
   TCEDU_LNCreateAWarehouseTransferAndPurchaseOrder();
});

test.describe('TCEDU_LNCreateWarehouseOrderForWarehouseAndProject', () => {
   TCEDU_LNCreateWarehouseOrderForWarehouseAndProject();
});
   
export default config;
   
   