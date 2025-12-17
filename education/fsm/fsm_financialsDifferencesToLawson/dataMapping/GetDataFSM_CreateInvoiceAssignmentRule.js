import DateFormats from "../../../commons/constants/DateFormats";
import DateFunctions from "../../../commons/functions/DateFunctions";
import BaseClass, { log } from "../../../testBase/BaseClass";
import config from "../../plan/FSMFinancialsDifferencesToLawson.spec";

/**-----------------------------------------------------------------------------------------
 * Purpose : 	This class is mapping the data for Setting up and approving vendor requests
 * -----------------------------------------------------------------------------------------*/
class GetDataFSM_CreateInvoiceAssignmentRule extends BaseClass {

    static async CustomGroupsContext(customGrpContext_Three) {

        log.info("INFO : ========>>>>> Data mapping for InvoiceAssignmentRulesContext and  CustomGroupsContext started <<<<<=========");

        for (let i = 0; i < customGrpContext_Three.name.length; i++) {

            customGrpContext_Three.name[i] = customGrpContext_Three.name[i] + config.USER_NAME.substring(config.USER_NAME.length - 4);

        }

        for (let j = 0; j < customGrpContext_Three.description.length; j++) {
			customGrpContext_Three.description[j] = customGrpContext_Three.description[j] + config.USER_NAME.substring(config.USER_NAME.length - 4);
		}

        customGrpContext_Three.resourceID 		= config.EMPLOYEE_ID;
		customGrpContext_Three.resourceName 	= config.STUDENT_NAME;

        customGrpContext_Three.customGroup 		= customGrpContext_Three.customGroup + config.USER_NAME.substring(config.USER_NAME.length - 4);
		customGrpContext_Three.description 		= customGrpContext_Three.description 	 + config.USER_NAME.substring(config.USER_NAME.length - 4);
		customGrpContext_Three.condition        = customGrpContext_Three.condition  + config.USER_NAME.substring(config.USER_NAME.length - 4);

        log.info("INFO : =========>>>>> Data mapping for InvoiceAssignmentRulesContext and  CustomGroupsContext is successfully completed <<<<<=========");
    }

}

export default GetDataFSM_CreateInvoiceAssignmentRule;