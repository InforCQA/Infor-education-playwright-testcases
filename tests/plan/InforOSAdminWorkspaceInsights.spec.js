import { test } from '@playwright/test';
import TCEDU_InforOSDownloadAndImportDataModel from '../inforOS/scripts/inforOSAdminWorkspacesInsights/TCEDU_InforOSDownloadAndImportDataModel.spec';
import TCEDU_InforOSCreateANewWorkspace from '../inforOS/scripts/inforOSAdminWorkspacesInsights/TCEDU_InforOSCreateANewWorkspace.spec.js';

test.describe('InforOSAdminWorkspaceInsights', () => {
    TCEDU_InforOSDownloadAndImportDataModel();
    TCEDU_InforOSCreateANewWorkspace();
});