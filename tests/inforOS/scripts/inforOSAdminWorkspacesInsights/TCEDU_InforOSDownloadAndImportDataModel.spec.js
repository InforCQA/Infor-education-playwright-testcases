import {test,expect} from '@playwright/test';
import CloudSuite from '../../../commons/functions/CloudSuite.js';
import BaseClass from '../../../testBase/BaseClass.js';
import ProductNames from '../../../commons/constants/ProductNames.js';
import DocumentManagementFunctions from '../../../commons/functions/DocumentManagementFunctions.js';
import OSDocumentManagementFunctions from '../../functions/OSDocumentManagementFunctions.js';

// Property data for testcases
const loginData=JSON.parse(JSON.stringify(require("../../../commons/data/productCredentials.json")));
const docCxt=JSON.parse(JSON.stringify(require("../../../data/inforOS/TCEDU-InforOSAdminWorkSpaces/DocumentSetup.properties.json")));

test.describe('TCEDU_InforOSDownloadAndImportDataModel', () => {

  test('login',async ({}) => {
    await BaseClass.globalSetup();
    await CloudSuite.login(loginData.inforAdminWorkspaceUsername, loginData.inforAdminWorkspacePassword);
  });

  test('Navigate to Document Management', async ({}) => {
    await CloudSuite.navigateToApplication(ProductNames.DOCUMENT_MANAGEMENT);
  });

   test('Download Course File', async ({}) => {
    await DocumentManagementFunctions.documentCourseFiles(docCxt.documentInfo.docuType, docCxt.documentInfo.document);
  });

   test(' Import data model', async ({}) => {
    await CloudSuite.navigateToApplication(ProductNames.OS);
    await OSDocumentManagementFunctions.importDataModel(docCxt.controlCenterProperties);
  });

});
