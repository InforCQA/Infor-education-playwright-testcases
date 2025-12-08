import { test } from '@playwright/test';
import TCEDU_LNSelectMapProvider from '../ln_ConfiguringMultisiteAndIntercompanyTrade/scripts/TCEDU_LNSelectMapProvider.spec';
import TCEDU_LNReviewEnterpriseModel from '../ln_ConfiguringMultisiteAndIntercompanyTrade/scripts/TCEDU_LNReviewEnterpriseModel.spec';
import TCEDU_LNDevelopTheOriginalEnterpriseStructure from '../ln_ConfiguringMultisiteAndIntercompanyTrade/scripts/TCEDU_LNDevelopTheOriginalEnterpriseStructure.spec';
import TCEDU_LNReviewItemsFromGlobalPrespective from '../ln_ConfiguringMultisiteAndIntercompanyTrade/scripts/TCEDU_LNReviewItemsFromGlobalPrespective.spec';
import TCEDU_LNReviewAndUpdateItemsFromSalesPerspective from '../ln_ConfiguringMultisiteAndIntercompanyTrade/scripts/TCEDU_LNReviewAndUpdateItemsFromSalesPerspective.spec';
import TCEDU_LNCreateANewItemUsingItemDefaults from '../ln_ConfiguringMultisiteAndIntercompanyTrade/scripts/TCEDU_LNCreateANewItemUsingItemDefaults.spec';
import TCEDU_LNUpdateLocalBusinessPartnerAndCreateSalesOrders from '../ln_ConfiguringMultisiteAndIntercompanyTrade/scripts/TCEDU_LNUpdateLocalBusinessPartnerAndCreateSalesOrders.spec';
import TCEDU_LNCreateAWarehouseTransferAndPurchaseOrder from '../ln_ConfiguringMultisiteAndIntercompanyTrade/scripts/TCEDU_LNCreateAWarehouseTransferAndPurchaseOrder.spec';
import TCEDU_LNCreateWarehouseOrderForWarehouseAndProject from '../ln_ConfiguringMultisiteAndIntercompanyTrade/scripts/TCEDU_LNCreateWarehouseOrderForWarehouseAndProject.spec';

const config = {
  BASE_URL: "https://mingle-portal.inforcloudsuite.com/v2/EDUGDENA003_TST",
  USER_NAME: "3170st01@infor-edu.com",
  PASSWORD: "Infor123!"
};

test.describe.configure({ mode: 'parallel' });

// test.describe('TCEDU_LNSelectMapProvider', () => {
//    TCEDU_LNSelectMapProvider();
// });

// test.describe('TCEDU_LNReviewEnterpriseModel', () => {
//    TCEDU_LNReviewEnterpriseModel();
// });

// test.describe('TCEDU_LNDevelopTheOriginalEnterpriseStructure', () => {
//    TCEDU_LNDevelopTheOriginalEnterpriseStructure();
// });

// test.describe('TCEDU_LNReviewItemsFromGlobalPrespective', () => {
//    TCEDU_LNReviewItemsFromGlobalPrespective();
// });

// test.describe('TCEDU_LNReviewAndUpdateItemsFromSalesPerspective', () => {
//    TCEDU_LNReviewAndUpdateItemsFromSalesPerspective();
// });

// test.describe('TCEDU_LNCreateANewItemUsingItemDefaults', () => {
//    TCEDU_LNCreateANewItemUsingItemDefaults();
// });

// test.describe('TCEDU_LNUpdateLocalBusinessPartnerAndCreateSalesOrders', () => {
//    TCEDU_LNUpdateLocalBusinessPartnerAndCreateSalesOrders();
// });

// test.describe('TCEDU_LNCreateAWarehouseTransferAndPurchaseOrder', () => {
//    TCEDU_LNCreateAWarehouseTransferAndPurchaseOrder();
// });

test.describe('TCEDU_LNCreateWarehouseOrderForWarehouseAndProject', () => {
   TCEDU_LNCreateWarehouseOrderForWarehouseAndProject();
});
   
export default config;
   
   