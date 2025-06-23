import InforOsCommon from "./InforOsCommon";
import BaseClass from "../../testBase/BaseClass";
import OSTabs from "../constants/OSTabs";
import OSDocumentManagementPage from "../pages/OSDocumentManagementPage.js";
import OSSessionNames from "../constants/OSSessionNames.js";
import OSConfirmationMessages from "../constants/OSConfirmationMessages.js";
import DocumentManagement_Id from "../constants/elementIds/DocumentManagement_Id.js";

class OSDocumentManagementFunctions extends BaseClass
{
    static async importDataModel(docCxt) {

        //Intializing the pages
        const docPg = new OSDocumentManagementPage();
        const iframe = docPg.iframe();

        InforOsCommon.selectTab(OSTabs.DOCUMENT_MANAGEMENT);

        InforOsCommon.expandContextApps(this.getLocator(docPg.toggleMenu), this.getLocator(docPg.toggleMenuBtn));

        InforOsCommon.courseMenuNavigation(iframe, docPg.menuFolders, OSSessionNames.ADMINISTRATION, OSSessionNames.IMPORT_EXPORT);
        await (await this.getDynamicElementWithIframe(iframe, docPg.selectTab, OSTabs.IMPORT)).click();
        await (await this.getDynamicElementWithIframe(iframe, docPg.attachmentFileUpload)).setInputFiles(path.join("files\OSFiles\DataModel_Workspaces.xml"));
        await (await this.getDynamicElementWithIframe(iframe, docPg.textBtn.toLowerCase(), OSTabs.IMPORT)).click();

        InforOsCommon.validateConfirmationMessage(this.getElementWithIframe(iframe, docPg.actionMsg), this.getElementWithIframe(iframe, docPg.btnClose), OSConfirmationMessages.CONFIGURATION_IMPORT);
        InforOsCommon.collapseCourseMenuNavigation(iframe, docPg.menuFolder, OSSessionNames.ADMINISTRATION);
        InforOsCommon.courseMenuNavigation(iframe, docPg.menuFolders, OSSessionNames.ADMINISTRATION, OSSessionNames.DOCUMENT_TYPE);

        for (let i = 0; i < docCxt.documentTypes.length; i++) {
            this.type(this.getDynamicElementWithIframe(iframe, docPg.textSearch, DocumentManagement_Id.SEARCH), docCxt.documentTypes[i]);

            await expect(this.isDynamicElementPresentWithIframe(iframe, docPg.textWithLink, docCxt.documentTypes[i])).toBeVisible();
        }

    }
}

export default OSDocumentManagementFunctions;