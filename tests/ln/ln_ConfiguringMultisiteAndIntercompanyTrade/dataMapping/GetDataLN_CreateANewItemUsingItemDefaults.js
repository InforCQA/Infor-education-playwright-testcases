/**--------------------------------------------------------
 * Purpose :  This class was created to map the dynamic data.
 *---------------------------------------------------------*/
class GetDataLN_CreateANewItemUsingItemDefaults {

    static async getItemContext(itemCnxt) {

        console.log("INFO : ========>>>>> Data mapping for Review and update items (from sales perspective) started <<<<<========= ");

        itemCnxt.item = "st02" + itemCnxt.item;
        itemCnxt.itemDesc = "st02" + " " + itemCnxt.itemDesc;

        console.log("INFO : ========>>>>> Data mapping for Review and update items (from sales perspective) is successfully completed <<<<<========= ");
    }

}

export default GetDataLN_CreateANewItemUsingItemDefaults;
