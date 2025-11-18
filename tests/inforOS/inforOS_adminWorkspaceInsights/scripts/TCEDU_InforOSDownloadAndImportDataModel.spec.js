import {test} from '@playwright/test';
import CloudSuite from '../../../commons/functions/CloudSuite.js';
import BaseClass from '../../../testBase/BaseClass.js';
import ProductNames from '../../../commons/constants/ProductNames.js';
import DocumentManagementFunctions from '../../../commons/functions/DocumentManagementFunctions.js';
import OSDocumentManagementFunctions from '../../functions/OSDocumentManagementFunctions.js';
import IONFunctions from '../../functions/IONFunctions.js';
import BookMarks from '../../functions/BookMarks.js';
import PortalFunctions from '../../functions/PortalFunctions.js';
import OSSessionNames from '../constants/OSSessionNames.js';
import OSConfirmationMessages from '../constants/OSConfirmationMessages.js';

// Property data for testcases
const loginData=JSON.parse(JSON.stringify(require("../../../commons/data/productCredentials.json")));
const docCxt=JSON.parse(JSON.stringify(require("../../../data/inforOS/TCEDU-InforOSAdminWorkSpaces/DocumentSetup.properties.json")));

export default function TCEDU_InforOSDownloadAndImportDataModel() {
  test.describe('TCEDU_InforOSDownloadAndImportDataModel', () => {

    test('login', async ({ }) => {
      await BaseClass.globalSetup();
      await CloudSuite.login(loginData.inforAdminWorkspaceUsername, loginData.inforAdminWorkspacePassword);
    });

    test('Navigate to Document Management', async ({ }) => {
      await CloudSuite.navigateToApplication(ProductNames.DOCUMENT_MANAGEMENT);
    });

    // testWithZoomExtension('page zooms out properly', async ({}) => {
    //   await setBrowserZoom(BaseClass.page, 70); 
    // });

    test('Download Course File', async ({ }) => {
      await DocumentManagementFunctions.documentCourseFiles(docCxt.documentInfo.docuType, docCxt.documentInfo.document);
    });

    // test('Import data model', async ({ }) => {
    //   await CloudSuite.navigateToApplication(ProductNames.OS);
    //   await OSDocumentManagementFunctions.importDataModel(docCxt.controlCenterProperties);
    // });

    // test('Activate the monitor', async ({ }) => {
    //   await IONFunctions.activateMonitor(docCxt.controlCenterProperties);
    // });

    // test('Add document Cool car', async ({ }) => {
    //   await CloudSuite.navigateToApplication(ProductNames.DOCUMENT_MANAGEMENT);
    //   await OSDocumentManagementFunctions.addDocument(docCxt, docCxt.documentInfo.itemName[0], docCxt.documentInfo.itemCode[0], docCxt.documentInfo.docuName[0], 0);
    // });

    // test('Add document Gaming chair', async ({ }) => {
    //   await OSDocumentManagementFunctions.addDocument(docCxt, docCxt.documentInfo.itemName[1], docCxt.documentInfo.itemCode[1], docCxt.documentInfo.docuName[1], 1);
    // });

    // test('Add document Supplier Invoice', async ({ }) => {
    //   await OSDocumentManagementFunctions.addDocument(docCxt, "", "", docCxt.documentInfo.docuName[2], 2);
    // });

    test('Test the alert widget', async ({ }) => {
      await OSDocumentManagementFunctions.addDocument(docCxt, docCxt.itemName[2],
        documentSetupContext.itemCode[2], documentSetupContext.docuName[3], 3);
    });

    // test('Import bookmarks', async ({ }) => {
    //   await BookMarks.importBookmarks(docCxt);
    // });

    // test('Import widgets', async ({ }) => {
    //   await CloudSuite.navigateToApplication(ProductNames.OS);
    //   await PortalFunctions.importWidgets(docCxt, OSSessionNames.WIDGETS, OSSessionNames.PUBLISHED_WIDGETS, OSConfirmationMessages.IMPORTED_WIDGETS, 0);
    // });

    // test('Import workspaces', async ({ }) => {
    //   await PortalFunctions.importWidgets(docCxt, OSSessionNames.WORKSPACES, OSSessionNames.PUBLISHED_WORKSPACES, OSConfirmationMessages.IMPORTED_WORKSPACE, 1);
    // });

    // test('Import announcements', async ({ }) => {
    //   await PortalFunctions.importWidgets(docCxt, OSSessionNames.ANNOUNCEMENTS, "", OSConfirmationMessages.IMPORTED_ANNOUNCEMENTS, 2);
    // });
  });
}
