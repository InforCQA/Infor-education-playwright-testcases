import {test} from '@playwright/test';
import CloudSuite from '../../../commons/functions/CloudSuite';
import BaseClass, { describeTest } from '../../../testBase/BaseClass';
import PayablesManagerFunctions from '../functions/PayablesManagerFunctions';
import config from '../../plan/FSMFinancialsDifferencesToLawson.spec';
import ProductNames from '../../../commons/constants/ProductNames';
import GetDataFSM_SetUpAndApproveInvoicesAndJournalizeDistributions from '../dataMapping/GetDataFSM_SetUpAndApproveInvoicesAndJournalizeDistributions';
import GetDataFSM_AddInvoiceRoutingRuleAndCustomGroup from '../dataMapping/GetDataFSM_AddInvoiceRoutingRuleAndCustomGroup';
import GetDataFSM_CreateInvoiceAssignmentRule from '../dataMapping/GetDataFSM_CreateInvoiceAssignmentRule';
import GetData_LoginDetails from '../dataMapping/GetData_LoginDetails';
import WebMailFunctions from '../../../commons/functions/WebMailFunctions';
import FSMCommon from '../../commons/FSMCommonFunctions';
import FSMPageTitles from '../../commons/PageTitles';

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
const loginCnt = JSON.parse(JSON.stringify(require("../../../commons/context/LoginContext.json")));
const processInvCxt = JSON.parse(JSON.stringify(require("../data/SettingUpAndApprovingInvoicesAndJournalizingDistributions.properties.json")));
const customGrpContext = JSON.parse(JSON.stringify(require("../data/AddInvoiceRoutingRuleAndCustomGroup.properties.json")));
const customGrpContext_Two = JSON.parse(JSON.stringify(require("../data/AddAnotherInvoiceRoutingRuleAndCustomGroup.properties.json")));
const customGrpContext_Three = JSON.parse(JSON.stringify(require("../data/CreateInvoiceAssignmentRule.properties.json")));


export default function TCEDU_FSMSettingUpAndApprovingInvoicesAndJournalizingDistributions() {
  
    describeTest('TCEDU_FSMSettingUpAndApprovingInvoicesAndJournalizingDistributions', () => {

        test.beforeAll('',async ({ }) => {

            // Mapping the data
            await GetData_LoginDetails.getCSLoginDetailsContext();
            await GetDataFSM_SetUpAndApproveInvoicesAndJournalizeDistributions.ProcessInvoicesContext(processInvCxt);
            await GetDataFSM_AddInvoiceRoutingRuleAndCustomGroup.CustomGroupsContext(customGrpContext);
            await GetDataFSM_AddInvoiceRoutingRuleAndCustomGroup.CustomGroupsContext(customGrpContext_Two);
            await GetDataFSM_CreateInvoiceAssignmentRule.CustomGroupsContext(customGrpContext_Three);

            await BaseClass.globalSetup();
            await CloudSuite.login(loginCnt.BASE_URL, loginCnt.USER_NAME, loginCnt.PASSWORD);
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

        test(' Create invoice approval levels', async ({ }) => {

            await PayablesManagerFunctions.createInvoiceApprovalLevels(processInvCxt, await FSMCommon.getCompany());
        });

        test('Add an invoice routing rule and custom group', async ({ }) => {

            await PayablesManagerFunctions.addAnInvoiceRoutingRuleAndCustomGroup(customGrpContext.name,
				config.USER_NAME.substring(0,4), customGrpContext.description, customGrpContext.customGroup,
				customGrpContext.description, customGrpContext.condition, customGrpContext.listName, null, 0, true);
        });

        test('Add another invoice routing rule and custom group', async ({ }) => {

     		await PayablesManagerFunctions.addAnInvoiceRoutingRuleAndCustomGroup(customGrpContext_Two.name,
				config.USER_NAME.substring(0,4), customGrpContext_Two.description, customGrpContext_Two.customGroup,
				customGrpContext_Two.description, customGrpContext_Two.condition, customGrpContext_Two.listName, null, 1, true);
        });

        test('Create an invoice assignment rule', async ({ }) => {

            await PayablesManagerFunctions.createInvoiceAssignmentRule(customGrpContext_Three.name[0], config.USER_NAME.substring(0,4),
				customGrpContext_Three.description[0], customGrpContext_Three.customGroup, customGrpContext_Three.description,
				customGrpContext_Three.condition, customGrpContext_Three.listName, customGrpContext_Three.resourceName,
				customGrpContext_Three.resourceID);
        });

        test('Enter an invoice from General Supplies', async ({ }) => {

            await PayablesManagerFunctions.createInvoice(processInvCxt.invoiceEntryTemplate, processInvCxt.vendors[0],
				processInvCxt.invoiceNumbers[0], processInvCxt.invoiceDates[0], false, null,
				processInvCxt.invoiceAmounts[0], processInvCxt.invoiceRoutingCategory,
				processInvCxt.distributionAmt[0].split("&"), processInvCxt.costCenter[0].split("&"),
				processInvCxt.account[0].split("&"), false, null, false, null, processInvCxt.errorMsgs[0], 0, null,null, null, null);
        });

        test('Enter an invoice from Reliable Office', async ({ }) => {

            await PayablesManagerFunctions.createInvoice(processInvCxt.invoiceEntryTemplate, processInvCxt.vendors[1],
                processInvCxt.invoiceNumbers[1], processInvCxt.invoiceDates[1], false, null,
                processInvCxt.invoiceAmounts[1], processInvCxt.invoiceRoutingCategory,
                processInvCxt.distributionAmt[1].split("&"), processInvCxt.costCenter[1].split("&"),
                processInvCxt.account[1].split("&"), false, null, false, null, processInvCxt.errorMsgs[1], 0, null,
                null, null, null);
        });

        test('Enter an invoice from Computer World', async ({ }) => {

            	await PayablesManagerFunctions.createInvoice(processInvCxt.invoiceEntryTemplate, processInvCxt.vendors[2],
				processInvCxt.invoiceNumbers[2], processInvCxt.invoiceDates[2], false, null,
				processInvCxt.invoiceAmounts[2], processInvCxt.invoiceRoutingCategory,
				processInvCxt.distributionAmt[2].split("&"), processInvCxt.costCenter[2].split("&"),
				processInvCxt.account[2].split("&"), true, processInvCxt.paymentTerms, true,
				processInvCxt.externalPurchaseOrder, processInvCxt.errorMsgs[2], 0, null, null, null, null);
        });

        test('Enter a second invoice from General Supplies', async ({ }) => {

            await PayablesManagerFunctions.createInvoice(processInvCxt.invoiceEntryTemplate, processInvCxt.vendors[3],
				processInvCxt.invoiceNumbers[3], processInvCxt.invoiceDates[3], true, processInvCxt.dueDate,
				processInvCxt.invoiceAmounts[3], processInvCxt.invoiceRoutingCategory,
				processInvCxt.distributionAmt[3].split("&"), processInvCxt.costCenter[3].split("&"),
				processInvCxt.account[3].split("&"), false, null, false, null, processInvCxt.errorMsgs[3], 0, null,
				null, null, null);
        });

        test('Reassign an invoice to another Payables Invoice Processor', async ({ }) => {

            await PayablesManagerFunctions.reassignInvoiceToAnotherPayablesInvoiceProcessor(
				processInvCxt.invoiceNumbers[1], processInvCxt.vendorNames[1], processInvCxt.invoiceAmounts[1], 1,
				);
        });

        test('Attach a document and Review the attachment', async ({ }) => {

            await PayablesManagerFunctions.attachDocumentToAnInvoiceAndReviewTheAttachment(processInvCxt,
				processInvCxt.invoiceNumbers[0], processInvCxt.vendorNames[0]);
        });

        test('Review invoices', async ({ }) => {

            await PayablesManagerFunctions.reviewInvoices(0, processInvCxt.invoiceNumbers[3],
				processInvCxt.invoiceNumbers[0]);
        });

        test('Submit an invoice for approval', async ({ }) => {

            await PayablesManagerFunctions.submitInvoiceForApproval(processInvCxt.invoiceApprovalCode, null,
				null, 0, processInvCxt.invoiceNumbers[3], processInvCxt.invoiceNumbers[0]);
        });

        test('Auto approve the Computer World Invoice for $168', async ({ }) => {

            await PayablesManagerFunctions.autoApproveAnInvoice(processInvCxt.invoiceNumbers[2],
				processInvCxt.vendorNames[2], processInvCxt.invoiceAmounts[2], null, 0);
        });

        test('Send an email message to the current approver', async ({ }) => {

            await PayablesManagerFunctions.sendAnEmailMessageToTheCurrentApprover(processInvCxt.invoiceNumbers[3],
				processInvCxt.emailContent, processInvCxt.vendorNames[3], processInvCxt.invoiceAmounts[3]);

            /*------------------------------------------------------------------------------
         *  Here, we need to login as instructor for Exercise 5.1 : Approve an invoice
         *-----------------------------------------------------------------------------*/
            // Logout from Cloud Suite
            CloudSuite.logOut();
        });

        
        test('Approve an invoice', async ({ }) => {


            await CloudSuite.login(loginCnt.BASE_URL, loginCnt.INSTRUCTOR, loginCnt.PASSWORD);

            await CloudSuite.navigateToApplication(ProductNames.FSM);

            await PayablesManagerFunctions.approveAnInvoice(processInvCxt.invoiceNumbers[3]);

            /*-----------------------------------------------------------------------------
            *  Here, we need to login back as employee to proceed with remaining exercises
            *-----------------------------------------------------------------------------*/
            // Logout from Cloud Suite
            await CloudSuite.logOut();
        });

        test('Reassign an approval level', async ({ }) => {

            // Login to Cloud Suite
            await CloudSuite.login(loginCnt.BASE_URL, loginCnt.USER_NAME, loginCnt.PASSWORD);

            // Navigate to Infor Financials & Supply Management
            await CloudSuite.navigateToApplication(ProductNames.FSM);

            await PayablesManagerFunctions.reassignAnApprovalLevel(processInvCxt.invoiceNumbers[0],
				processInvCxt.invoiceApprovalRoles[3]);
        });

        test('Manually approve an invoice', async ({ }) => {


            await PayablesManagerFunctions.manuallyApproveAnInvoice(processInvCxt.invoiceNumbers[3],
                processInvCxt.vendorNames[3]);
        });

        test('Email Invoice', async ({ }) => {


            await PayablesManagerFunctions.emailInvoice(processInvCxt.invoiceNumbers[3], processInvCxt.toEmail,
                processInvCxt.vendorNames[3]);

            await WebMailFunctions.reviewWebMailSubject(processInvCxt.toEmail, loginCnt.PASSWORD,
                processInvCxt.emailSubject + processInvCxt.invoiceNumbers[3]);
        });

        
        test('Maintain released invoices', async ({ }) => {


            // Navigate to Infor Financials & Supply Management
		    await CloudSuite.navigateToApplication(ProductNames.FSM);

            await PayablesManagerFunctions.maintainReleasedInvoices(processInvCxt);
        });

        
        test('Place an invoice on hold and Take an invoice off hold', async ({ }) => {

            await PayablesManagerFunctions.placeAnInvoiceOnHoldAndTakeItOffHold(processInvCxt.invoiceNumbers[0],
				processInvCxt.holdCode, processInvCxt.holdCodeDescr);
        });

                
        test('Generate a Cash Requirements report', async ({ }) => {

            await PayablesManagerFunctions.generateCashRequirementsReport(processInvCxt, await FSMCommon.getCompanyGroup());

        });

        test('Review the Cash Requirements Results', async ({ }) => {

            await PayablesManagerFunctions.reviewCashRequirementsResults(processInvCxt.payGroup);

        });

        test('Run Electronic Payment Creation for your pay group, payment code, and cash and code to generate the system checks and verify their accuracy', async ({ }) => {

            await PayablesManagerFunctions.runElectronicPaymentCreationToGenerateSystemChecksAndVerifyAccuracy(processInvCxt,
				await FSMCommon.getCompanyGroup());

        });

        test('Review the documents generated from your payment form creation submission', async ({ }) => {

            await PayablesManagerFunctions.reviewReportInYourPrintFiles(processInvCxt.printFileNames[0]);

        });

        test('View the payment output files', async ({ }) => {

            await PayablesManagerFunctions.viewPaymentOutputFiles(processInvCxt.cashCode, processInvCxt.paymentCode, null);

        });

        test('Run Payment Closing for your pay group to post the payments to Global Ledger', async ({ }) => {

            await PayablesManagerFunctions.runPaymentClosingToPostPaymentsToGlobalLedger(processInvCxt.payGroup,
				await FSMCommon.getCompanyGroup());

        });

        
        test('Review the report', async ({ }) => {

            await PayablesManagerFunctions.reviewReportInYourPrintFiles(processInvCxt.printFileNames[1]);
            await FSMCommon.clickHome();
		    await FSMCommon.verifyPageTitle(FSMPageTitles.MANAGE_PAYABLES);
        });

        // test('Journalize distributions', async ({ }) => {

        //     await PayablesManagerFunctions.journalizeDistributions(processInvCxt, 0);

        // });

        test.afterAll(async () => {
            await CloudSuite.logOut();
            await BaseClass.page.close();
        });
    })
}