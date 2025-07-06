import { test } from '@playwright/test';
import TCEDU_InforOSDownloadAndImportDataModel from '../inforOS/scripts/inforOSAdminWorkspacesInsights/TCEDU_InforOSDownloadAndImportDataModel.spec';
import TCEDU_InforOSCreateANewWorkspace from '../inforOS/scripts/inforOSAdminWorkspacesInsights/TCEDU_InforOSCreateANewWorkspace.spec.js';
import TCEDU_InforOSCreateWorkspaceToAddSecurityRoles from '../inforOS/scripts/inforOSAdminWorkspacesInsights/TCEDU_InforOSCreateWorkspaceToAddSecurityRoles.spec.js';

test.describe('InforOSAdminWorkspaceInsights', () => {
    // TCEDU_InforOSDownloadAndImportDataModel();
    // TCEDU_InforOSCreateANewWorkspace();
    TCEDU_InforOSCreateWorkspaceToAddSecurityRoles();
});