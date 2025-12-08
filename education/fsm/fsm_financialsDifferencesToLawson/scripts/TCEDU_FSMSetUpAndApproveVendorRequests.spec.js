import {test} from '@playwright/test';
import CloudSuite from '../../../commons/functions/CloudSuite';
import BaseClass, { describeTest } from '../../../testBase/BaseClass';
import PayablesManagerFunctions from '../functions/PayablesManagerFunctions';
import config from '../../plan/FSMFinancialsDifferencesToLawson.spec';
import ProductNames from '../../../commons/constants/ProductNames';
import GetDataFSM_SetUpAndApproveVendorRequests from '../dataMapping/GetDataFSM_SetUpAndApproveVendorRequests';

/**--------------------------------------------------------------------
 * Purpose   : 	Setting up and approving vendor requests
 * Exercises : 	1.4.1, 1.4.2, 1.5, 1.6
 * 1. Add the service definition
 * 2. Add a user to the list of final approvers
 * 3. Request a vendor
 * 4. Approve Vendor requests
 * --------------------------------------------------------------------*/

// Property data for testcases
const vendorContext = JSON.parse(JSON.stringify(require("../data/SetUpAndApproveVendorRequests.properties.json")));


export default function TCEDU_FSMSetUpAndApproveVendorRequests() {

    describeTest('TCEDU_FSMSetUpAndApproveVendorRequests', () => {

        test.beforeAll('', async ({ }) => {
            await GetDataFSM_SetUpAndApproveVendorRequests.getVendorContext(vendorContext);
            await BaseClass.globalSetup();
            await CloudSuite.login(config.BASE_URL, config.USER_NAME, config.PASSWORD);
        });

        test('Add the service definition', async ({ }) => {
            await CloudSuite.navigateToApplication(ProductNames.FSM);

            // Collapse the context apps
            await CloudSuite.collapseContextApps();

            await PayablesManagerFunctions.addTheServiceDefinition(vendorContext.serviceDefinition,
                vendorContext.processDefinition);
        });

        test('Add a user to the list of final approvers', async ({ }) => {

            await PayablesManagerFunctions.addUserToListOfFinalApprovers(vendorContext.taskName);
        });

        test('Request a vendor', async ({ }) => {

            await PayablesManagerFunctions.requestVendor(vendorContext);
            await CloudSuite.logOut();
        });

        test('Approve Vendor requests', async ({ }) => {

            await CloudSuite.login(config.BASE_URL, config.INSTRUCTOR, config.PASSWORD);

            await CloudSuite.navigateToApplication(ProductNames.FSM);

            await PayablesManagerFunctions.approveVendorRequests(vendorContext);
        });

        test.afterAll(async () => {
            await CloudSuite.logOut();
            await BaseClass.page.close();
        });
    })
}