import { log } from "../../../testBase/BaseClass";

/**--------------------------------------------------------
 * Purpose :  This class was created to map the dynamic data.
 *---------------------------------------------------------*/
class GetDataLN_DevelopTheOriginalEnterpriseStructure {

    static async getLNDevelopTheOriginalEnterpriseStructureContext(structureCnxt) {

       log.info("INFO : ========>>>>> Data mapping for Develop the original enterprise structure started <<<<<========= ");

        structureCnxt.name += "04";
        structureCnxt.houseNum            = structureCnxt.houseNum.replace('%s', '04');
        structureCnxt.enterpriseUnit      = structureCnxt.enterpriseUnit.replace('%s', "04");
        structureCnxt.planningCluster     = structureCnxt.planningCluster.replace('%s', "04");
        structureCnxt.planningClusterDesc = structureCnxt.planningClusterDesc.replace('%s', "04");
        structureCnxt.planningCluster     = structureCnxt.planningCluster.replace('%s', "04");
        structureCnxt.planningClusterDesc = structureCnxt.planningClusterDesc.replace('%s', "04");
        structureCnxt.warehouseDesc       = structureCnxt.warehouseDesc.replace('%s', '04');
        structureCnxt.site+="04";
        structureCnxt.siteDesc            =structureCnxt.siteDesc.replace('%s', '04');
        structureCnxt.logisticCompany     ="3170";
        structureCnxt.salesOffice+='04';
        structureCnxt.salesOfficeDesc+="04";
        structureCnxt.warehouse+='04';
        structureCnxt.warehouseDesc       = structureCnxt.warehouseDesc.replace('%s', '04');
        structureCnxt.offices[0]          = structureCnxt.offices[0] + structureCnxt.salesOfficeDesc;
        structureCnxt.offices[1]          = structureCnxt.offices[1] + structureCnxt.warehouseDesc;

      log.info("INFO : ========>>>>> Data mapping for Develop the original enterprise structure is successfully completed <<<<<========= ");
    }

}

export default GetDataLN_DevelopTheOriginalEnterpriseStructure;
