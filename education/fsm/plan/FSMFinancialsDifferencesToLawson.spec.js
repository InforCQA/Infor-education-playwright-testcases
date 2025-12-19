import { test } from '@playwright/test';
import TCEDU_FSMReviewTheScreenElementsOnPayablesManagerHomepage from '../fsm_financialsDifferencesToLawson/scripts/TCEDU_FSMReviewTheScreenElementsOnPayablesManagerHomepage.spec';
import TCEDU_FSMReviewChangesToVendorGroupSetup from '../fsm_financialsDifferencesToLawson/scripts/TCEDU_FSMReviewChangesToVendorGroupSetup.spec';
import TCEDU_FSMReviewChangesToManagingVendors from '../fsm_financialsDifferencesToLawson/scripts/TCEDU_FSMReviewChangesToManagingVendors.spec';
import TCEDU_FSMSetUpAndApproveVendorRequests from '../fsm_financialsDifferencesToLawson/scripts/TCEDU_FSMSetUpAndApproveVendorRequests.spec';
import TCEDU_FSMUseConditionBuilderToDefineRules from '../fsm_financialsDifferencesToLawson/scripts/TCEDU_FSMUseConditionBuilderToDefineRules.spec';
import TCEDU_FSMSettingUpAndApprovingInvoicesAndJournalizingDistributions from '../fsm_financialsDifferencesToLawson/scripts/TCEDU_FSMSettingUpAndApprovingInvoicesAndJournalizingDistributions.spec';

const config = {
  BASE_URL: "https://mingle-portal.inforcloudsuite.com/v2/EDUGDENA027_TRN",
  INSTRUCTOR: "HS4500",
  USER_NAME: "HS4506",
  STUDENT_NAME: "Peterson, Tom",
  EMPLOYEE_ID: "1103",
  PASSWORD: "Tr@in123"
};

test.describe.configure({ mode: 'parallel' });

// test.describe('TCEDU_FSMReviewTheScreenElementsOnPayablesManagerHomepage', () => {
//    TCEDU_FSMReviewTheScreenElementsOnPayablesManagerHomepage();
// });

// test.describe('TCEDU_FSMReviewChangesToVendorGroupSetup', () => {
//    TCEDU_FSMReviewChangesToVendorGroupSetup();
// });

// test.describe('TCEDU_FSMReviewChangesToManagingVendorss', () => {
//    TCEDU_FSMReviewChangesToManagingVendors();
// });

test.describe('TCEDU_FSMSetUpAndApproveVendorRequests', () => {
   TCEDU_FSMSetUpAndApproveVendorRequests();
});

test.describe('TCEDU_FSMUseConditionBuilderToDefineRules', () => {
   TCEDU_FSMUseConditionBuilderToDefineRules();
});

test.describe('TCEDU_FSMSettingUpAndApprovingInvoicesAndJournalizingDistributions', () => {
   TCEDU_FSMSettingUpAndApprovingInvoicesAndJournalizingDistributions();
});
export default config;