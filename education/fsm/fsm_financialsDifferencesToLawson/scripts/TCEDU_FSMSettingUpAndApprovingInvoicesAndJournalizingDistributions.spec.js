import {test} from '@playwright/test';
import CloudSuite from '../../../commons/functions/CloudSuite';
import BaseClass, { describeTest } from '../../../testBase/BaseClass';
import PayablesManagerFunctions from '../functions/PayablesManagerFunctions';
import config from '../../plan/FSMFinancialsDifferencesToLawson.spec';
import ProductNames from '../../../commons/constants/ProductNames';
import GetDataFSM_SetUpAndApproveInvoicesAndJournalizeDistributions from '../dataMapping/GetDataFSM_SetUpAndApproveInvoicesAndJournalizeDistributions';
import GetDataFSM_AddInvoiceRoutingRuleAndCustomGroup from '../dataMapping/GetDataFSM_AddInvoiceRoutingRuleAndCustomGroup';
import GetDataFSM_CreateInvoiceAssignmentRule from '../dataMapping/GetDataFSM_CreateInvoiceAssignmentRule';

/**-----------------------------------------------------------------------------------------------
 * Purpose   : 	Setting up invoice approval and assignment, Processing invoices and 
 * 				Paying invoices and journalizing distributions
 * Exercises :  2.1, 2.2, 2.3.1, 2.3.2, 2.4.1, 2.4.2, 2.6.1, 2.6.2, 2.7, 3.1.1, 3.1.2, 3.1.3, 
 * 				3.1.4, 3.3, 3.4.1, 3.4.2, 4.1.1, 4.1.2, 4.1.3, 4.2, 5.1, 5.3, 5.4, 5.6, 6.1, 
 * 				6.2.1, 6.2.2, 7.1.1, 7.1.2, 7.1.3, 7.1.4, 7.1.5, 7.1.6, 7.1.7, 7.2
 * 1.  Create approval roles
 * 2.  Change invoice approval role priority
 * 3.  Create an invoice routing category
 * 4.  Create invoice approval assignments
 * 5.  Create an invoice approval code
 * 6.  Create invoice approval levels
 * 7.  Add an invoice routing rule and custom group
 * 8.  Add another invoice routing rule and custom group
 * 9.  Create an invoice assignment rule
 * 10. Enter an invoice from General Supplies
 * 11. Enter an invoice from Reliable Office
 * 12. Enter an invoice from Computer World
 * 13. Enter a second invoice from General Supplies
 * 14. Reassign an invoice to another Payables Invoice Processor
 * 15. Attach a document
 * 16. Review the attachment
 * 17. Review invoices
 * 18. Submit an invoice for approval
 * 19. Auto approve the Computer World Invoice for $168
 * 20. Send an email message to the current approver
 * 21. Approve an invoice
 * 22. Reassign an approval level
 * 23. Manually approve an invoice
 * 24. Email Invoice
 * 25. Maintain released invoices
 * 26. Place an invoice on hold
 * 27. Take an invoice off hold
 * 28. Generate a Cash Requirements report
 * 29. Review the Cash Requirements Results
 * 30. Run Electronic Payment Creation for your pay group, payment code, and cash 
 * 	   code to generate the system checks and verify their accuracy
 * 31. Review the documents generated from your payment form creation submission
 * 32. View the payment output files
 * 33. Run Payment Closing for your pay group to post the payments to Global Ledger
 * 34. Review the report
 * 35. Journalize distributions
 * -----------------------------------------------------------------------------------------------*/

// Property data for testcases
const processInvCxt = JSON.parse(JSON.stringify(require("../data/SettingUpAndApprovingInvoicesAndJournalizingDistributions.properties.json")));
const customGrpContext = JSON.parse(JSON.stringify(require("../data/AddInvoiceRoutingRuleAndCustomGroup.properties.json")));
const customGrpContext_Two = JSON.parse(JSON.stringify(require("../data/AddAnotherInvoiceRoutingRuleAndCustomGroup.properties.json")));
const customGrpContext_Three = JSON.parse(JSON.stringify(require("../data/CreateInvoiceAssignmentRule.properties.json")));


export default function TCEDU_FSMSettingUpAndApprovingInvoicesAndJournalizingDistributions() {
  
    describeTest('TCEDU_FSMSettingUpAndApprovingInvoicesAndJournalizingDistributions', () => {

        test.beforeAll('',async ({ }) => {

            // Mapping the data
            await GetDataFSM_SetUpAndApproveInvoicesAndJournalizeDistributions.ProcessInvoicesContext(processInvCxt);
            await GetDataFSM_AddInvoiceRoutingRuleAndCustomGroup.CustomGroupsContext(customGrpContext);
            await GetDataFSM_AddInvoiceRoutingRuleAndCustomGroup.CustomGroupsContext(customGrpContext_Two);
            await GetDataFSM_CreateInvoiceAssignmentRule.CustomGroupsContext(customGrpContext_Three);

            await BaseClass.globalSetup();
            await CloudSuite.login(config.BASE_URL, config.USER_NAME, config.PASSWORD);
        });

        test('Create approval roles', async ({ }) => {
            await CloudSuite.navigateToApplication(ProductNames.FSM);

            // Collapse the context apps
		    await CloudSuite.collapseContextApps();

            await PayablesManagerFunctions.createApprovalRoles(processInvCxt);
        });

        test('Change invoice approval role priority', async ({ }) => {
 
            await PayablesManagerFunctions.changeInvoiceApprovalRolePriority(processInvCxt);
        });

        
        test('Create an invoice routing category', async ({ }) => {
 
            await PayablesManagerFunctions.createAnInvoiceRoutingCategory(processInvCxt);
        });

        test('Create invoice approval assignments', async ({ }) => {

            await PayablesManagerFunctions.createInvoiceApprovalAssignments(processInvCxt);
        });

        test('Create an invoice approval code', async ({ }) => {

            await PayablesManagerFunctions.createAnInvoiceApprovalCode(processInvCxt, config.USER_NAME.substring(0,4));
        });


        test.afterAll(async () => {
            await CloudSuite.logOut();
            await BaseClass.page.close();
        });
    })
}