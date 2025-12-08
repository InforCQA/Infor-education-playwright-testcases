import DateFormats from "../../../commons/constants/DateFormats";
import DateFunctions from "../../../commons/functions/DateFunctions";
import config from "../../plan/FSMFinancialsDifferencesToLawson.spec";

/**-----------------------------------------------------------------------------------------
 * Purpose : 	This class is mapping the data for Setting up and approving vendor requests
 * -----------------------------------------------------------------------------------------*/
class GetDataFSM_AddInvoiceRoutingRuleAndCustomGroup {

    static async CustomGroupsContext(customGrpContext) {

        console.log("INFO : ========>>>>> Data mapping for VendorContext started <<<<<=========");

        customGrpContext.name 				= config.USER_NAME + customGrpContext.name ;
        customGrpContext.description		= config.USER_NAME.substring(config.USER_NAME.length-4) + customGrpContext.description;
        customGrpContext.customGroup 		= config.USER_NAME.substring(config.USER_NAME.length-4) + customGrpContext.customGroup;
        customGrpContext.condition			= customGrpContext.condition.replace('%s' , config.USER_NAME.substring(config.USER_NAME.length-4));

        console.log("INFO : =========>>>>> Data mapping for VendorContext is successfully completed <<<<<=========");
    }

}

export default GetDataFSM_AddInvoiceRoutingRuleAndCustomGroup;