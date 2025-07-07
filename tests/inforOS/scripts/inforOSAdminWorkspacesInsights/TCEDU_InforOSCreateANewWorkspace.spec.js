import {test} from '@playwright/test';
import CloudSuite from '../../../commons/functions/CloudSuite.js';
import BaseClass from '../../../testBase/BaseClass.js';
import AddWorkSpaces from '../../functions/AddWorkSpaces.js';
import WorkSpaces_Lbl from '../../constants/elementLbls/WorkSpaces_Lbl.js';
import WorkSpaces_Id from '../../constants/elementIds/WorkSpaces_Id.js';

// Property data for testcases
const loginData = JSON.parse(JSON.stringify(require("../../../commons/data/productCredentials.json")));
const workSpaceCxt = JSON.parse(JSON.stringify(require("../../../data/inforOS/TCEDU-InforOSAdminWorkSpaces/WorkSpace.properties.json")));

export default function TCEDU_InforOSCreateANewWorkspace() {
test.describe('TCEDU_InforOSCreateANewWorkspace', () => {

  test('login',async ({}) => {
    await BaseClass.globalSetup();
    await CloudSuite.login(loginData.inforAdminWorkspaceUsername, loginData.inforAdminWorkspacePassword);
  });

  test('Create a new workspace', async ({}) => {
    await AddWorkSpaces.createWorkSpace(1,workSpaceCxt.workspaceName[0],WorkSpaces_Lbl.WIDGETS,WorkSpaces_Id.WIDGETS,workSpaceCxt.testcaseName[0]);
  });

  test('Add a banner', async ({}) =>{
    await AddWorkSpaces.addBanner(0, workSpaceCxt.bannerWidgets);
  });

  test('Add all widgets to workspace', async ({}) => {
  await AddWorkSpaces.addBanner(1, workSpaceCxt.workspaceWidgets);
  });

  test('Configure the Banner Widgets', async () => {
    await AddWorkSpaces.configureBannerWidgets(workSpaceCxt, WorkSpaces_Lbl.IMAGE, WorkSpaces_Lbl.CONFIGURE_WIDGET, workSpaceCxt.widgetType[0], 1);
  });
  
  test('Configure the ION API Performance Widget', async () => {
    await AddWorkSpaces.configureBannerWidgets(workSpaceCxt, WorkSpaces_Lbl.ION_API_PERFORMANCE, WorkSpaces_Lbl.WIDGET_SETTINGS, workSpaceCxt.widgetType[1], 0);
  });
});
}
