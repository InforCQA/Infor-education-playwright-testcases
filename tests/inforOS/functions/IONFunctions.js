import BaseClass from "../../testBase/BaseClass.js";
import WorkflowsPage from "../pages/WorkflowsPage.js";
import OSTabs from "../constants/OSTabs.js";
import InforOsCommon from "./InforOsCommon.js";
import OSSessionNames from "../constants/OSSessionNames.js";
import MonitorsPage from "../pages/MonitorsPage.js";
import Workflows_Id from "../constants/elementIds/Workflows_Id.js";
import OSCommons from "../constants/OSCommons.js";
import Import_Export_Lbl from "../constants/elementLbls/Import_Export_Lbl.js";
import Ion_Monitors_Lbl from "../constants/elementLbls/Ion_Monitors_Lbl.js";
import path from 'path'; 
import {expect} from '@playwright/test';

class IONFunctions extends BaseClass {

    static async activateMonitor(controlCenterCxt) {

        //Intializing the pages
        const ionPg = new WorkflowsPage();
        const monitorsPg = new MonitorsPage();

        const iframe = ionPg.iframe();
        const mFrame = monitorsPg.iframe();

        await InforOsCommon.selectTab(OSTabs.ION);

        await InforOsCommon.expandContextApps(await this.getElementWithIframe(iframe, ionPg.toggleMenu), await this.getElementWithIframe(iframe, ionPg.toggleMenuBtn));

        await InforOsCommon.courseMenuNavigation(iframe, ionPg.menuFolders, OSSessionNames.MONITORS_AND_WORKFLOWS.toLowerCase(),
            OSSessionNames.MONITORS.toLowerCase());
        
        await (await this.getDynamicElementWithIframe(mFrame, monitorsPg.menubarIcons, Workflows_Id.SEARCH)).click();

        const documentTypeName = controlCenterCxt.documentTypeName.replace('%s', await InforOsCommon.getCompany());

        await this.type(await this.getDynamicElementWithIframe(mFrame, monitorsPg.inputField, Workflows_Id.FILTER_SEARCH), documentTypeName);
        await this.page.keyboard.press('Enter');

        // Delete file if already existed
        if (await this.isDynamicElementPresentWithIframe(mFrame, monitorsPg.iconBtn, documentTypeName)) {

            await (await this.getDynamicElementWithIframe(mFrame, monitorsPg.iconBtn, documentTypeName)).hover();
            await (await this.getDynamicElementWithIframe(mFrame, monitorsPg.tileBarBtn, documentTypeName.toLowerCase(), OSCommons.DELETE)).click();
            await (await this.getDynamicElementWithIframe(mFrame, monitorsPg.txnBtn, OSCommons.YES)).click();

        }

        await (await this.getDynamicElementWithIframe(mFrame, monitorsPg.toolbarIcons, Import_Export_Lbl.IMPORT)).click();

        await (await this.getDynamicElementWithIframe(mFrame, monitorsPg.fileUpload)).setInputFiles(path.join("../../../files/OSFiles/S03_IDM_NewImageUploaded.xml"));

        await (await this.getDynamicElementWithIframe(mFrame, monitorsPg.txnBtn, OSCommons.OK)).click();
        await (await this.getDynamicElementWithIframe(mFrame, monitorsPg.txnBtn, OSCommons.OK)).click();
        await (await this.getDynamicElementWithIframe(mFrame, monitorsPg.iconBtn, documentTypeName)).click();
        //await (await this.getDynamicElementWithIframe(mFrame, monitorsPg.activateBtn, OSCommons.ACTIVATE)).click();

        await InforOsCommon.selectSubTab(monitorsPg.selectTab, OSTabs.DISTRIBUTION.toLowerCase(), mFrame);

        const radioBtn = await this.getDynamicElementWithIframe(mFrame, monitorsPg.rdnBtn, Ion_Monitors_Lbl.SIMPLE_RDN.toLowerCase());
        expect((await radioBtn.isChecked())).toBeTruthy();
    }
}

export default IONFunctions;

