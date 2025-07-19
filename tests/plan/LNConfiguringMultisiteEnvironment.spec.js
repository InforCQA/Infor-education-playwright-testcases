import { test } from '@playwright/test';
import TCEDU_LNSelectMapProvider from "../ln/scripts/configuringMultisiteEnvironment/TCEDU_LNSelectMapProvider.spec";
import TCEDU_LNReviewEnterpriseModel from '../ln/scripts/configuringMultisiteEnvironment/TCEDU_LNReviewEnterpriseModel.spec';
import TCEDU_LNDevelopTheOriginalEnterpriseStructure from "../ln/scripts/configuringMultisiteEnvironment/TCEDU_LNDevelopTheOriginalEnterpriseStructure.spec";
import TCEDU_LNReviewItemsFromGlobalPrespective from '../ln/scripts/configuringMultisiteEnvironment/TCEDU_LNReviewItemsFromGlobalPrespective.spec';

test.describe('LNConfiguringMultisiteEnvironment', () => {
   // TCEDU_LNSelectMapProvider();
   // TCEDU_LNReviewEnterpriseModel();
   // TCEDU_LNDevelopTheOriginalEnterpriseStructure();
    TCEDU_LNReviewItemsFromGlobalPrespective();
});