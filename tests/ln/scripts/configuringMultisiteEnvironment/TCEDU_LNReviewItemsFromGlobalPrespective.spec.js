import {test} from '@playwright/test';
import ProductNames from "../../../commons/constants/ProductNames";
import CloudSuite from "../../../commons/functions/CloudSuite";
import BaseClass from "../../../testBase/BaseClass";
import LNMasterData from '../../functions/LNMasterData';

// Property data for testcases
const loginData = JSON.parse(JSON.stringify(require("../../../commons/data/productCredentials.json")));
const itemCnxt = JSON.parse(JSON.stringify(require("../../../data/ln/TCEDU-LNConfiguringMultisiteEnvironment/ReviewItemsFromGlobalPrespective.properties.json")));

export default function TCEDU_LNReviewItemsFromGlobalPrespective() {

  test.describe('TCEDU_LNReviewItemsFromGlobalPrespective', () => {
    test('login', async ({ }) => {
      await BaseClass.globalSetup();
      await CloudSuite.login(loginData.lnUrl, loginData.lnmultisiteUsername, loginData.lnmultisitePassword);
    });
    // 2.1.1
    test('Review the item at an enterprise level', async ({ }) => {
      await CloudSuite.navigateToApplication(ProductNames.LN);
      await LNMasterData.reviewItemAtEnterpriseLevel(itemCnxt);
    });

    // 2.1.2
    test('Review the domain-specific data', async ({ }) => {
      await LNMasterData.reviewDomainSpecificData();
    });
    //2.1.3
    test('Review Purchase Data for the Item', async ({ }) => {
      await LNMasterData.reviewPurchaseDataForItem(itemCnxt);
    });
    // 2.1.4
    test('Review sales office for the item', async ({ }) => {
      await LNMasterData.reviewSalesOfficeForItem();
    });
    // 2.1.5
    test('Review standard costs by enterprise unit', async ({ }) => {
      await LNMasterData.reviewStandardCostsByEnterpriseUnit(itemCnxt);
    });
  })
}