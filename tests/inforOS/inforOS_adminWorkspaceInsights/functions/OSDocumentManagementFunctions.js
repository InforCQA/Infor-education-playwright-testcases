import InforOsCommon from "./InforOsCommon.js";
import BaseClass from "../../testBase/BaseClass";
import OSTabs from "../constants/OSTabs.js";
import OSDocumentManagementPage from "../pages/OSDocumentManagementPage.js";
import OSSessionNames from "../constants/OSSessionNames.js";
import OSConfirmationMessages from "../constants/OSConfirmationMessages.js";
import DocumentManagement_Id from "../constants/elementIds/DocumentManagement_Id.js";
import path from 'path'; 
import {expect} from '@playwright/test';
import DocumentManagementLbl from "../../commons/constants/elementLbls/DocumentManagement_Lbl.js"; 
import DocumentManagementPage from "../../commons/pages/DocumentManagementPage.js";
import OSCommons from "../constants/OSCommons.js";
import DocumentManagementTabs from "../../commons/constants/DocumentManagementTabs.js";
import CloudSuite from "../../commons/functions/CloudSuite.js";

class OSDocumentManagementFunctions extends BaseClass
{
    static async importDataModel(docCxt) {

        //Intializing the pages
        const docPg = new OSDocumentManagementPage();
        const iframe = docPg.iframe();

        await InforOsCommon.selectTab(OSTabs.DOCUMENT_MANAGEMENT);

        await InforOsCommon.expandContextApps(await this.getElementWithIframe(iframe, docPg.toggleMenu), await this.getElementWithIframe(iframe, docPg.toggleMenuBtn));

        await InforOsCommon.courseMenuNavigation(iframe, docPg.menuFolders, OSSessionNames.ADMINISTRATION.toLowerCase(), OSSessionNames.IMPORT_EXPORT.toLowerCase());

        await (await this.getDynamicElementWithIframe(iframe, docPg.selectTab, OSTabs.IMPORT.toLowerCase())).click();
        await (await this.getDynamicElementWithIframe(iframe, docPg.attachmentFileUpload)).setInputFiles(path.join("../../../files/OSFiles/DataModel_Workspaces.xml"));
        await (await this.getDynamicElementWithIframe(iframe, docPg.textBtn, OSTabs.IMPORT.toLowerCase())).click();

        await InforOsCommon.validateConfirmationMessage(await this.getElementWithIframe(iframe, docPg.actionMsg), await this.getElementWithIframe(iframe, docPg.btnClose), OSConfirmationMessages.CONFIGURATION_IMPORT);
        await InforOsCommon.collapseCourseMenuNavigation(iframe, docPg.menuFolder, OSSessionNames.ADMINISTRATION.toLowerCase());
        await InforOsCommon.courseMenuNavigation(iframe, docPg.menuFolders, OSSessionNames.ADMINISTRATION.toLowerCase(), OSSessionNames.DOCUMENT_TYPE.toLowerCase());

        for (let i = 0; i < docCxt.documentTypes.length; i++) {
            await this.type(await this.getDynamicElementWithIframe(iframe, docPg.textSearch, DocumentManagement_Id.SEARCH), docCxt.documentTypes[i].toLowerCase());

            const webElement = await this.getDynamicElementWithIframe(
                iframe,
                docPg.textWithLink,
                docCxt.documentTypes[i].toLowerCase()
            );

            await expect(webElement).toBeVisible();
        }
        CloudSuite.closeActiveWorkspace();
    }

    static async addDocument(docCxt, itemName, itemCode, docName, flag) {

        //Intializing the pages
        const docPg = new DocumentManagementPage();
        const iframe = docPg.iframe();

        await (await this.getDynamicElementWithIframe(iframe, docPg.menuItems, DocumentManagementLbl.ADD_DOCUMENT.toLowerCase(), DocumentManagement_Id.ADD_DOCUMENT)).click();
        await InforOsCommon.selectFromDropdown(await this.getDynamicElementWithIframe(iframe, docPg.drpWithLabel, DocumentManagementLbl.SELECT_A_DOCUMENT_TYPE_DRP, DocumentManagement_Id.SELECT_A_DOCUMENT_TYPE_DRP), docCxt.documentInfo.documentType[flag]);
        await (await this.getDynamicElementWithIframe(iframe, docPg.textBtn, OSCommons.CREATE)).click();
        await (await this.getElementWithIframe(iframe, docPg.uploadFile)).setInputFiles(path.join(docCxt.documentInfo.addAttachmentFilePaths[flag]));

        const webElement = await this.getDynamicElementWithIframe(iframe, docPg.inputFile)
        await expect(webElement).toContainText(docCxt.documentInfo.addDocumentTypeName[flag]);

        await InforOsCommon.selectSubTab(docPg.selectTab, DocumentManagementTabs.ATTRIBUTES.toLowerCase(), iframe);

        if (flag == 2) {
            await this.type(await InforOsCommon.getTextField(docPg.textField, DocumentManagementLbl.INVOICE_ID.toLowerCase(),
                DocumentManagement_Id.INVOICE_ID, iframe), docCxt.documentInfo.invoiceId.replace('%s', await InforOsCommon.getCompany()));
            await this.selectValueFromDropdown(await this.getDynamicElementWithIframe(iframe, docPg.textField, DocumentManagementLbl.INVOICE_STATUS.toLowerCase(), DocumentManagement_Id.INVOICE_STATUS), await this.getDynamicElementWithIframe(iframe, docPg.statusDrpdown, DocumentManagement_Id.INVOICE_STATUS, docCxt.documentInfo.invoiceStatus));
            await this.type(await InforOsCommon.getTextField(docPg.textField, DocumentManagementLbl.INVOICE_AMOUNT.toLowerCase(),
                DocumentManagement_Id.INVOICE_AMOUNT, iframe), docCxt.documentInfo.invoiceAmount);
            await this.type(await InforOsCommon.getTextField(docPg.textField, DocumentManagementLbl.REFERENCE_ID.toLowerCase(),
                DocumentManagement_Id.REFERENCE_ID, iframe), docCxt.documentInfo.referenceId.replace('%s', await InforOsCommon.getCompany()));
        } else {

            await this.type(await InforOsCommon.getTextField(docPg.textField, DocumentManagementLbl.ITEM_NAME.toLowerCase(),
                DocumentManagement_Id.ITEM_NAME, iframe), itemName.replace('%s', await InforOsCommon.getCompany()));
            await this.type(await InforOsCommon.getTextField(docPg.textField, DocumentManagementLbl.ITEM_CODE.toLowerCase(),
                DocumentManagement_Id.ITEM_CODE, iframe), itemCode.replace('%s', await InforOsCommon.getCompany()));
            await this.selectValueFromDropdown(await this.getDynamicElementWithIframe(iframe, docPg.textField, DocumentManagementLbl.STATUS.toLowerCase(), DocumentManagement_Id.STATUS), await this.getDynamicElementWithIframe(iframe, docPg.statusDrpdown, DocumentManagement_Id.STATUS, docCxt.documentInfo.status));
        }

        await InforOsCommon.toolbarIconsInDocManagement(DocumentManagementLbl.SAVE, DocumentManagement_Id.SAVE);
    }
}

export default OSDocumentManagementFunctions;