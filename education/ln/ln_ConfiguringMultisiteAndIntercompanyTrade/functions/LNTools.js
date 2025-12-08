import { setBrowserZoom } from 'playwright-zoom';
import LNCommon from "../../commons/LNCommon";
import LNSessionTabs from "../../commons/LNCommonConstants/LNSessionTabs";
import LNMenuActions_Lbl from "../constants/elementLbls/LNMenuActions_Lbl";
import MapProviders_Id from "../constants/elementIds/MapProviders_Id";
import LNMenuActions_Id from "../constants/elementIds/LNMenuActions_Id";
import LNSessionCodes from "../../commons/LNCommonConstants/LNSessionCodes";
import BaseClass, { log } from '../../../testBase/BaseClass';
import MapProviders_Lbl from '../constants/elementLbls/MapProviders_Lbl';

/**-------------------------------------------------------------------
 * Purpose : This class contains methods related to Tools Module.         
 * Date             Author          Reviewer       Methods
 * 
 * 14/07/2025       Sathish         Sathish        Select a map provider                
 * -------------------------------------------------------------------*/

class LNTools extends BaseClass {

    /*---------------------------------------------------------------------------------------
	* Objective : Select a map provider
	* Workbook  : LN Cloud Configuring Multisite and Intercompany Trade Training Workbook
	* Exercise	: 1.1
	* -----------------------------------------------------------------------------------------*/
    static async selectMapProvider(mapCnxt) {

        log.info("Select a map provider started");

        await setBrowserZoom(this.page, 50);

        await LNCommon.navigateToLNModule(LNSessionTabs.TOOLS, LNSessionTabs.APPLICATION_CONFIGURATION,
            LNSessionTabs.PARAMETERS, LNSessionTabs.WORKBENCH_PARAMETERS, LNSessionTabs.MAP_PROVIDERS);

        await LNCommon.verifySessionTab(LNSessionTabs.MAP_PROVIDERS);

        await LNCommon.clickAndSelectDropdownField(MapProviders_Lbl.DEFAULT_MAP_PROVIDER_DRP,
            MapProviders_Id.DEFAULT_MAP_PROVIDER_DRP, mapCnxt.defaultMapProvider);

        await this.screenshot("Select a map provider");

        await LNCommon.clickTextMenuItem(LNSessionCodes.MAP_PROVIDERS, LNMenuActions_Id.OK, LNMenuActions_Lbl.OK);

        // Close all LN Modules
        await LNCommon.collapseLNModule(LNSessionTabs.TOOLS);

        log.info("Select a map provider started successful");
    }
}

export default LNTools;