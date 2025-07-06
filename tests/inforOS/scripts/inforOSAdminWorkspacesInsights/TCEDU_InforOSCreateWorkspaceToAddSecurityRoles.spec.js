import {test} from '@playwright/test';
import CloudSuite from '../../../commons/functions/CloudSuite.js';
import BaseClass from '../../../testBase/BaseClass.js';
import AddWorkSpaces from '../../functions/AddWorkSpaces.js';
import WorkSpaces_Lbl from '../../constants/elementLbls/WorkSpaces_Lbl.js';
import WorkSpaces_Id from '../../constants/elementIds/WorkSpaces_Id.js';

// Property data for testcases
const loginData = JSON.parse(JSON.stringify(require("../../../commons/data/productCredentials.json")));
const workSpaceCxt = JSON.parse(JSON.stringify(require("../../../data/inforOS/TCEDU-InforOSAdminWorkSpaces/WorkSpace.properties.json")));

export default function TCEDU_InforOSCreateWorkspaceToAddSecurityRoles() {
    test.describe('TCEDU_InforOSCreateWorkspaceToAddSecurityRoles', () => {

        test('login', async ({ }) => {
            await BaseClass.globalSetup();
            await CloudSuite.login(loginData.inforAdminWorkspaceUsername, loginData.inforAdminWorkspacePassword);
        });

        test('Create a new workspace', async ({ }) => {
            await AddWorkSpaces.createWorkSpace(1, workSpaceCxt.workspaceName[1], WorkSpaces_Lbl.WIDGETS, WorkSpaces_Id.WIDGETS, workSpaceCxt.testcaseName[1]);
        });

        test('Add a banner', async ({ }) => {
            await AddWorkSpaces.addBanner(1, workSpaceCxt.widgets);
        });

         test('Configure Alert list widgets', async ({ }) => {
            await AddWorkSpaces.configureAlertListWidgets(workSpaceCxt, workSpaceCxt.widgets[1]);
        })
    });
}