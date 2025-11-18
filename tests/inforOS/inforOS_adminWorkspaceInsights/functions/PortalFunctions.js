import BaseClass from "../../../testBase/BaseClass.js";
import OSTabs from "../constants/OSTabs.js";
import PortalPage from "../pages/PortalPage .js";
import InforOsCommon from "./InforOsCommon.js";
import Portal_Id from "../constants/elementIds/Portal_Id.js";
import DocumentManagement_Id from "../constants/elementIds/DocumentManagement_Id.js";
import {expect} from '@playwright/test';
import DocumentManagement_Lbl from "../../../commons/constants/elementLbls/DocumentManagement_Lbl.js";
import path from 'path';
import OSCommons from "../constants/OSCommons.js";

class PortalFunctions extends BaseClass{

    static async importWidgets(docCxt, session, subSession, verify, flag) {

        const portalPg = new PortalPage();

        await InforOsCommon.selectTab(OSTabs.PORTAL);

        if (flag == 2) {
            await InforOsCommon.courseMenuNavigation(false, portalPg.expandPanel, session.toLowerCase());
        } else {
            await InforOsCommon.courseMenuNavigation(false, portalPg.expandPanel, session.toLowerCase(), subSession.toLowerCase());
        }

        await (await this.getDynamicElement(portalPg.toolBar, Portal_Id.IMPORT)).click({ delay: 1000 });

        await (await this.getDynamicElement(portalPg.fileUpload, Portal_Id.FILE_UPLOAD)).setInputFiles(path.join(docCxt.documentInfo.importAttachmentFilePaths[flag]));

        // Verify that file is uploaded
        const fileName = await this.getDynamicElement(portalPg.textFld, DocumentManagement_Id.FILE);
        await expect(fileName).toHaveValue(docCxt.documentInfo.importDocumentTypeName[flag]);

        if (flag == 2) {
            await InforOsCommon.selectCheckbox(portalPg.checkbox, DocumentManagement_Lbl.OVERWRITE_EXISTING_CHK,
                DocumentManagement_Id.OVERWRITE_EXISTING_CHK, false);
        }

        await InforOsCommon.toolbarIcons(await this.getLocator(portalPg.okBtn));

        // Verify the uploaded file is imported successfully
        const text = await this.getDynamicElement(portalPg.title, DocumentManagement_Id.IMORTED_MESSAGE);
        await expect(text).toContainText(verify);

        await InforOsCommon.toolbarIcons(await this.getDynamicElement(portalPg.actionMsg, OSCommons.OK.toLowerCase()));

        await InforOsCommon.collapseCourseMenuNavigation(false, portalPg.expandedPanel, session.toLowerCase());
    }
}

export default PortalFunctions;