import DateFormats from "../../../commons/constants/DateFormats";
import DateFunctions from "../../../commons/functions/DateFunctions";
import config from "../../plan/FSMFinancialsDifferencesToLawson.spec";

/**-----------------------------------------------------------------------------------------
 * Purpose : 	This class is mapping the data for Setting up and approving vendor requests
 * -----------------------------------------------------------------------------------------*/
class GetDataFSM_SetUpAndApproveVendorRequests {

    static async getVendorContext(vendorContext) {

        console.log("INFO : ========>>>>> Data mapping for VendorContext started <<<<<=========");

        vendorContext.neededBy = await DateFunctions.addNDays(new Date(), 2, DateFormats.M_D_YYYY);
        vendorContext.vendorName = config.USER_NAME.substring(config.USER_NAME.length - 4) + vendorContext.vendorName;
        vendorContext.searchName = config.USER_NAME.substring(config.USER_NAME.length - 4) + vendorContext.searchName;
        vendorContext.legalName = config.USER_NAME.substring(config.USER_NAME.length - 4) + vendorContext.legalName;

        console.log("INFO : =========>>>>> Data mapping for VendorContext is successfully completed <<<<<=========");
    }

}

export default GetDataFSM_SetUpAndApproveVendorRequests;
