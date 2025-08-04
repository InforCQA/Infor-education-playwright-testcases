import BaseClass from "../../testBase/BaseClass";
import LNSessionTabs from "../constants/LNSessionTabs";
import LNCommon from "./LNCommon";
import { setBrowserZoom } from 'playwright-zoom';
import MapProviders_Id from "../constants/elementIds/MapProviders_Id";
import MapProviders_Lbl from "../constants/elementLbls/MapProviders_Lbl";
import LNSessionCodes from "../constants/LNSessionCodes";
import LNMenuActions_Id from "../constants/elementIds/LNMenuActions_Id";
import LNMenuActions_Lbl from "../constants/elementLbls/LNMenuActions_Lbl";

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

        await setBrowserZoom(this.page, 50);

        await LNCommon.navigateToLNModule(LNSessionTabs.TOOLS, LNSessionTabs.APPLICATION_CONFIGURATION,
            LNSessionTabs.PARAMETERS, LNSessionTabs.WORKBENCH_PARAMETERS, LNSessionTabs.MAP_PROVIDERS);

        await LNCommon.verifySessionTab(LNSessionTabs.MAP_PROVIDERS);

        await LNCommon.clickAndSelectDropdownField(MapProviders_Lbl.DEFAULT_MAP_PROVIDER_DRP,
            MapProviders_Id.DEFAULT_MAP_PROVIDER_DRP, mapCnxt.defaultMapProvider);

        await LNCommon.clickTextMenuItem(LNSessionCodes.MAP_PROVIDERS, LNMenuActions_Id.OK, LNMenuActions_Lbl.OK);

        // Close all LN Modules
        await LNCommon.collapseLNModule(LNSessionTabs.TOOLS);
    }
}

export default LNTools;