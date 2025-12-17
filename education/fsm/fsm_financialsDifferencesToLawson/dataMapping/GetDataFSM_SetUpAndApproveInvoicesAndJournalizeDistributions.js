import DateFormats from "../../../commons/constants/DateFormats";
import DateFunctions from "../../../commons/functions/DateFunctions";
import { log } from "../../../testBase/BaseClass";
import FSMCommon from "../../commons/FSMCommonFunctions";
import config from "../../plan/FSMFinancialsDifferencesToLawson.spec";
const { DateTime } = require('luxon');

/**-----------------------------------------------------------------------------------------
 * Purpose : 	This class is mapping the data for Setting up and approving vendor requests
 * -----------------------------------------------------------------------------------------*/
class GetDataFSM_SetUpAndApproveInvoicesAndJournalizeDistributions {

    static async ProcessInvoicesContext(processInvCxt) {

        log.info("INFO : ========>>>>> Data mapping for SetUpInvoiceApprovalContext and ProcessInvoicesContext started <<<<<=========");

        processInvCxt.invoiceRoutingCategory		= config.USER_NAME;
        processInvCxt.financeResources[1]			= config.STUDENT_NAME;
        processInvCxt.resourceIDs[1]				= config.EMPLOYEE_ID;
        processInvCxt.invoiceApprovalCode 			= config.USER_NAME.substring(config.USER_NAME.length - 4) +  processInvCxt.invoiceApprovalCode ;
		processInvCxt.approvalCodeDesc 			    = config.USER_NAME.substring(config.USER_NAME.length - 4) + " " + processInvCxt.approvalCodeDesc ;
        processInvCxt.invoiceNumbers[3] 			= processInvCxt.invoiceNumbers[3].replace('%s', config.USER_NAME.substring(config.USER_NAME.length - 4));
        processInvCxt.invoiceDates[0] 				= DateTime.now().minus({ months: 1 }).set({ day: 7 }).toFormat(DateFormats.M_D_YYYY);
        processInvCxt.invoiceDates[1]               = DateTime.now().minus({ months: 1 }).set({ day: 20 }).toFormat(DateFormats.M_D_YYYY);
        processInvCxt.invoiceDates[2]               = DateTime.now().set({ day: 15 }).toFormat(DateFormats.M_D_YYYY);
        processInvCxt.invoiceDates[3]               = DateTime.now().toFormat(DateFormats.M_D_YYYY);
        processInvCxt.dueDate                       = await DateFunctions.addNDays(new Date(), 10, DateFormats.M_D_YYYY);
        processInvCxt.toEmail 					    = config.USER_NAME.substring(config.USER_NAME.length - 4) + processInvCxt.toEmail;
        processInvCxt.payGroup 						= config.USER_NAME.substring(config.USER_NAME.length - 4);
        processInvCxt.payThroughDate 				= DateFunctions.lastDateInMonth(DateFormats.M_D_YYYY, 1);
        processInvCxt.paymentDate 				    = DateFunctions.lastDateInMonth(DateFormats.M_D_YYYY, 0);
        processInvCxt.cashCode 						= config.USER_NAME.substring(config.USER_NAME.length - 4);
        processInvCxt.effectiveDate 				= DateFunctions.lastDateInMonth(DateFormats.M_D_YYYY, 0);
        processInvCxt.postThroughDate 				= DateFunctions.getCurrentDate(DateFormats.M_D_YYYY);
        processInvCxt.description 					= await FSMCommon.getCompany() + processInvCxt.description;
        

        log.info("INFO : ========>>>>> Data mapping for SetUpInvoiceApprovalContext and ProcessInvoicesContext is successfully completed <<<<<=========");
    }

}

export default GetDataFSM_SetUpAndApproveInvoicesAndJournalizeDistributions;
