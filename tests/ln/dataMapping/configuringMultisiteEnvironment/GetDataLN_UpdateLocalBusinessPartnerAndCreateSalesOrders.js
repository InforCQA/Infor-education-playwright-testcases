import DateFormats from "../../../commons/constants/DateFormats";
import WeekDays from "../../../commons/constants/WeekDays";
import DateFunctions from "../../../commons/functions/DateFunctions";

/**--------------------------------------------------------
 * Purpose :  This class was created to map the dynamic data.
 *---------------------------------------------------------*/
class GetDataLN_UpdateLocalBusinessPartnerAndCreateSalesOrders {

    static async getLNBusinessPartnerContext(businessCnxt) {

        console.log("INFO : ========>>>>> Data mapping for Update Local Business Partner and Create Sales Orders started <<<<<========= ");

        businessCnxt.plannedDate = await DateFunctions.nextWeekDate(WeekDays.MONDAY, DateFormats.MDDYYYY);

        console.log("INFO : ========>>>>> Data mapping for Update Local Business Partner and Create Sales Orders is successfully completed <<<<<========= ");
    }

}

export default GetDataLN_UpdateLocalBusinessPartnerAndCreateSalesOrders;