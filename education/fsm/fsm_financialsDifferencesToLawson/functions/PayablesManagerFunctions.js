import { expect } from "allure-playwright";
import BaseClass, { log } from "../../../testBase/BaseClass";
import FSMApplicationRoles from "../../commons/ApplicationRoles";
import FSMCommon from "../../commons/FSMCommonFunctions";
import FSMCommonPage from "../../commons/FSMCommonPage";
import FSMMenu from "../../commons/FSMMenu";
import FSMPageTitles from "../../commons/PageTitles";
import FSMQuickLinks from "../../commons/QuickLinks";
import FSMTableTitles from "../../commons/TableTitles";
import FSMTabs from "../../commons/Tabs";
import config from "../../plan/FSMFinancialsDifferencesToLawson.spec";
import PayablesManager_ManageInvoices_Id from "../constants/elementIDs/PayablesManager_ManageInvoices_Id";
import PayablesManager_ManageInvoices_Lbl from "../constants/elementLbls/PayablesManager_ManageInvoices_Lbl";
import PayablesAdministrator_VendorGroups_Lbl from "../constants/elementLbls/PayablesAdministrator_VendorGroups_Lbl";
import FSMActionsMenu from "../../commons/MenuActions";
import Constants from "../../commons/Constants";
import PayablesAdministrator_VendorGroups_Id from "../constants/elementIDs/PayablesAdministrator_VendorGroups_Id";
import ElementAttributes from "../../../commons/constants/ElementAttributes";
import FSMPopupMsgs from "../constants/PopupMsgs";
import PayablesManager_Vendors_Lbl from "../constants/elementLbls/PayablesManager_Vendors_Lbl";
import PayablesManager_Vendors_Id from "../constants/elementIDs/PayablesManager_Vendors_Id";
import ProcessServerAdministrator_ServiceDefinitions_Lbl from "../constants/elementLbls/ProcessServerAdministrator_ServiceDefinitions_Lbl";
import ProcessServerAdministrator_ServiceDefinitions_Id from "../constants/elementIDs/ProcessServerAdministrator_ServiceDefinitions_Id";
import ProcessServerAdministrator_Tasks_Lbl from "../constants/elementLbls/ProcessServerAdministrator_Tasks_Lbl";
import ProcessServerAdministrator_Tasks_Id from "../constants/elementIDs/ProcessServerAdministrator_Tasks_Id";
import FSMDialogBoxTitles from "../constants/DialogBoxTitles";
import Actions_Lbl from "../constants/elementLbls/Actions_Lbl";
import Inbasket_Lbl from "../constants/elementLbls/Inbasket_Lbl";
import CustomGroupsPage from "../pages/CustomGroupsPage";
import CustomGroups_Lbl from "../constants/elementLbls/CustomGroups_Lbl";
import CustomGroups_Id from "../constants/elementIDs/CustomGroups_Id";
import PayablesManager_InvoiceApprovalRoles_Lbl from "../constants/elementLbls/PayablesManager_InvoiceApprovalRoles_Lbl";
import PayablesManager_InvoiceApprovalRoles_Id from "../constants/elementIDs/PayablesManager_InvoiceApprovalRoles_Id";
import PayablesManager_InvoiceRoutingCategories_Lbl from "../constants/elementLbls/PayablesManager_InvoiceRoutingCategories_Lbl";
import PayablesManager_InvoiceRoutingCategories_Id from "../constants/elementIDs/PayablesManager_InvoiceRoutingCategories_Id";
import Payables_InvoiceApprovalCodes_Lbl from "../constants/elementLbls/Payables_InvoiceApprovalCodes_Lbl";
import Payables_InvoiceApprovalCodes_Id from "../constants/elementIDs/Payables_InvoiceApprovalCodes_Id";

class PayablesManagerFunctions extends BaseClass {

    /*-------------------------------------------------------------------------
	 * Objective : Review the screen elements on the Payables Manager homepage
	 * Workbook  : IFSM_FinancialsDifferencesToLawson_Workbook
	 * Exercise  : 1.1.2
	 * -------------------------------------------------------------------------*/
    static async reviewTheScreenElementsOnPayablesManagerHomepage(reviewElCxt) {

        const commonPg = new FSMCommonPage(this.page);

        log.info("=========>>>>> Review the screen elements on the Payables Manager homepage started <<<<<=========");

        // Switch role to Payables Manager
        await FSMCommon.switchRoles(FSMApplicationRoles.PAYABLES_MANAGER);
        await FSMCommon.verifyPageTitle(FSMPageTitles.MANAGE_PAYABLES);

        await FSMCommon.selectHeaderTab(FSMTabs.CHARTS);

        // Review info on widgets that display on Dashboard
        for (let i = 0; i < reviewElCxt.homePgWidgets.length; i++) {
            expect(await this.isElementPresent(await commonPg.widgetTitle(reviewElCxt.homePgWidgets[i]))).toBeTruthy();
        }

        await FSMCommon.menuNavigation(FSMQuickLinks.MANAGE_INVOICES);
        await FSMCommon.verifyPageTitle(FSMPageTitles.MANAGE_INVOICES);

        const tabs = [FSMTabs.UNSUBMITTED, FSMTabs.CANCELLED, FSMTabs.SEARCH];
        const tables = [
            FSMTableTitles.UNSUBMITTED_INVOICES,
            FSMTableTitles.CANCELLED_INVOICES,
            FSMTableTitles.SEARCH_INVOICES
        ];

        for (let i = 0; i < tabs.length; i++) {
            await FSMCommon.selectHeaderTab(tabs[i]);
            await FSMCommon.getTableID(tables[i]);
        }

        // Enter search fields
        await this.type(await FSMCommon.getTextField(PayablesManager_ManageInvoices_Lbl.COMPANY_SEARCH,PayablesManager_ManageInvoices_Id.COMPANY_SEARCH),
            config.USER_NAME.substring(config.USER_NAME.length-4)
        );

        await this.type(await FSMCommon.getTextField(PayablesManager_ManageInvoices_Lbl.VENDOR_SEARCH,PayablesManager_ManageInvoices_Id.VENDOR_SEARCH),
            reviewElCxt.vendor
        );

        // Click Search button
        await (await commonPg.btnWithId(PayablesManager_ManageInvoices_Lbl.SEARCH_IN_SEARCH_TAB,PayablesManager_ManageInvoices_Id.SEARCH_IN_SEARCH_TAB)).click();

        // Verify search results display
        const resultPresent = await FSMCommon.isRequiredRowPresent(await FSMCommon.getTableID(FSMTableTitles.SEARCH_INVOICES),
            PayablesManager_ManageInvoices_Lbl.VENDOR_SEARCH_GRID,
            reviewElCxt.vendor
        );

        expect(resultPresent, "Search results are not displayed").toBeTruthy();

        // Navigation
        await FSMCommon.menuNavigation(FSMMenu.SETUP);
        await FSMCommon.menuNavigation(FSMMenu.SETUP, FSMMenu.PAYMENT_TERMS, FSMMenu.PAYMENT_TERMS);
        await FSMCommon.verifyPageTitle(FSMPageTitles.PAYMENT_TERMS);

        await FSMCommon.menuNavigation(FSMMenu.RUN_PROCESSES);
        await FSMCommon.menuNavigation(FSMMenu.RUN_PROCESSES, FSMMenu.PROCESS_PAYMENTS);
        await FSMCommon.menuNavigation(FSMMenu.RUN_PROCESSES, FSMMenu.PROCESS_TAX_DOCUMENTS);

        await FSMCommon.clickHome();
        await FSMCommon.verifyPageTitle(FSMPageTitles.MANAGE_PAYABLES);

        await this.screenshot("Review the screen elements on the Payables Manager homepage");

        log.info("INFO : =========>>>>> Review the screen elements on the Payables Manager homepage successful <<<<<=========");
    }

    /*-----------------------------------------------------------
	 * Objective : Review changes to vendor group setup
	 * Workbook  : IFSM_FinancialsDifferencesToLawson_Workbook 
	 * Exercise  : 1.2
	 * -----------------------------------------------------------*/
    static async reviewChangesToVendorGroupSetup(vendorContext) {

        const commonPg = new FSMCommonPage(this.page);

        log.info("INFO : =========>>>>> Review changes to vendor group setup started <<<<<=========");

        // Switch role
        await FSMCommon.switchRoles(FSMApplicationRoles.PAYABLES_ADMINISTRATOR);
        await FSMCommon.verifyPageTitle(FSMPageTitles.PAYABLES_ADMINISTRATOR);

        // Click Vendor Groups link
        await (await commonPg.hyperlink(PayablesAdministrator_VendorGroups_Lbl.VENDOR_GROUPS_LINK)).click();

        await FSMCommon.verifyPageTitle(FSMPageTitles.VENDOR_GROUPS);

        // Filter
        await FSMCommon.enterDataInFilterField(await FSMCommon.getPageID(), PayablesAdministrator_VendorGroups_Lbl.VENDOR_GROUP_GRID,
            config.USER_NAME.substring(0, 4)
        );

        await FSMCommon.rightClickOnRowAndPerformAnAction(await FSMCommon.getPageID(), PayablesAdministrator_VendorGroups_Lbl.VENDOR_GROUP_GRID,
            config.USER_NAME.substring(0, 4),
            FSMActionsMenu.OPEN
        );

        const companyGroup = config.USER_NAME.substring(0, 4);
        await FSMCommon.verifyPageTitle(FSMPageTitles.VENDOR_GROUP.replace("%s", companyGroup).replace("%s", companyGroup));

        // Main tab
        await FSMCommon.selectHeaderTab(FSMTabs.MAIN);

        await (await FSMCommon.getTextboxLookUpIcon(
            PayablesAdministrator_VendorGroups_Lbl.ONE_TIME_VENDOR_CLASS,
            PayablesAdministrator_VendorGroups_Id.ONE_TIME_VENDOR_CLASS
        )).click();

        await (await commonPg.btnClose()).click();

        // Check OFAC checkbox
        await FSMCommon.selectCheckbox(
            await FSMCommon.getCheckbox(
                PayablesAdministrator_VendorGroups_Lbl.VALIDATE_OFAC_CHK,
                PayablesAdministrator_VendorGroups_Id.VALIDATE_OFAC_CHK
            )
        );

        // Verify OFAC Compare Threshold
        const thresholdPresent = await this.isElementPresent(await FSMCommon.getTextField(
            PayablesAdministrator_VendorGroups_Lbl.OFAC_COMPARE_THRESHOLD,
            PayablesAdministrator_VendorGroups_Id.OFAC_COMPARE_THRESHOLD));
        expect(thresholdPresent).toBeTruthy();

        // Main tab again
        await FSMCommon.selectHeaderTab(FSMTabs.MAIN);

        // Sections verification
        const sections = [
            PayablesAdministrator_VendorGroups_Lbl.DIVERSITY_REQUIREMENTS,
            PayablesAdministrator_VendorGroups_Lbl.ATTACHMENT_SIZE
        ];

        for (const section of sections) {
            const present = await this.isElementPresent(await commonPg.headers(section));
            expect(present).toBeTruthy();
        }

        // Payables Invoice Approval tab
        await FSMCommon.selectHeaderTab(FSMTabs.PAYABLES_INVOICE_APPROVAL);

        await (await FSMCommon.getTextboxLookUpIcon(
            PayablesAdministrator_VendorGroups_Lbl.CORPORATE_CALENDAR,
            PayablesAdministrator_VendorGroups_Id.CORPORATE_CALENDAR
        )).click();

        // Select row in dialog
        await FSMCommon.clickRowInDialogBox(await FSMCommon.getDialogBoxTableID(FSMTableTitles.SYSTEM_CALENDARS),
            PayablesAdministrator_VendorGroups_Lbl.SYSTEM_CALENDAR_GRID,
            vendorContext.corporateCalendar
        );

        // Verify corporate calendar field
        await expect(async () => {

        expect(await (await FSMCommon.getTextField(PayablesAdministrator_VendorGroups_Lbl.CORPORATE_CALENDAR,PayablesAdministrator_VendorGroups_Id.CORPORATE_CALENDAR
        )).inputValue(), `Corporate calendar is not ${vendorContext.corporateCalendar}`).toBe(vendorContext.corporateCalendar);

        }).toPass({ timeout: 20000 });

        // Expand dropdown if not open
        const drp = await (await FSMCommon.getDropdown(
            PayablesAdministrator_VendorGroups_Lbl.INVOICE_POST_DATE_DEFAULT_OPTION_DRP,
            PayablesAdministrator_VendorGroups_Id.INVOICE_POST_DATE_DEFAULT_OPTION_DRP
        )).getAttribute(ElementAttributes.CLASS);

        if (!drp.includes(Constants.IS_OPEN)) {
            await (await FSMCommon.getDropdown(
                PayablesAdministrator_VendorGroups_Lbl.INVOICE_POST_DATE_DEFAULT_OPTION_DRP,
                PayablesAdministrator_VendorGroups_Id.INVOICE_POST_DATE_DEFAULT_OPTION_DRP
            )).click();
        }

        // Review dropdown items
        for (const value of vendorContext.invoicePostDateDefaultOptionValues) {

            const present = await this.isElementPresent(await commonPg.dropdownValues(value));
            expect(present).toBeTruthy();
        }

        // Review sections
        const headers = [
            PayablesAdministrator_VendorGroups_Lbl.INVOICE_SUBMITTED_FOR_APPROVAL,
            PayablesAdministrator_VendorGroups_Lbl.INVOICE_REJECTED,
            PayablesAdministrator_VendorGroups_Lbl.EMAIL_INVOICE
        ];

        for (const header of headers) {
            await (await (await commonPg.headers(header)).first()).scrollIntoViewIfNeeded();
            expect(await this.isElementPresent(await (await commonPg.headers(header)).first()), `section is not displayed`).toBeTruthy();
        }

        // Supplier Created Invoices tab
        await FSMCommon.selectHeaderTab(FSMTabs.SUPPLIER_CREATED_INVOICES);

        expect(await this.isElementPresent(await FSMCommon.getTextField(PayablesAdministrator_VendorGroups_Lbl.INVOICE_COMPANY,
            PayablesAdministrator_VendorGroups_Id.INVOICE_COMPANY
        ))).toBeTruthy();

        await this.screenshot("Review changes to vendor group setup");

        // Exit
        await FSMCommon.clickHome();

        await FSMCommon.validateMessageTextAndHandlePopUpIfExists(
            FSMPopupMsgs.DO_YOU_WANT_TO_SAVE_CHANGES_BEFORE_CONTINUING,
            FSMPopupMsgs.NO
        );

        await FSMCommon.clickHome();

        await FSMCommon.verifyPageTitle(FSMPageTitles.PAYABLES_ADMINISTRATOR);

        log.info("INFO : =========>>>>> Review changes to vendor group setup successful <<<<<=========");
    }

    /*-------------------------------------------------------------------------
	 * Objective : Review changes to managing vendors
	 * Workbook  : IFSM_FinancialsDifferencesToLawson_Workbook 
	 * Exercise  : 1.3
	 * -------------------------------------------------------------------------*/
    static async reviewChangesToManagingVendors(vendorContext) {

        const commonPg = new FSMCommonPage(this.page);

        log.info("INFO : =========>>>>> Review changes to managing vendors started <<<<<=========");

        // Switch role to Payables Manager
        await FSMCommon.switchRoles(FSMApplicationRoles.PAYABLES_MANAGER);
        await FSMCommon.verifyPageTitle(FSMPageTitles.MANAGE_PAYABLES);

        await FSMCommon.menuNavigation(FSMMenu.VENDORS);
        await FSMCommon.verifyPageTitle(FSMPageTitles.MANAGE_VENDORS);

        await (await (await commonPg.cardField(vendorContext.vendorName[0])).first()).click();

        // Verify the vendor Id
        expect(
            await (await FSMCommon.getTextData(
                PayablesManager_Vendors_Lbl.DASHBOARD_VENDOR,
                PayablesManager_Vendors_Id.DASHBOARD_VENDOR
            )).textContent(),
            `Vendor ID is not ${vendorContext.vendorId}`
        ).toBe(vendorContext.vendorId);

        // Verify that vendor name displays on the right
        expect(
            await (await FSMCommon.getTextData(
                PayablesManager_Vendors_Lbl.DASHBOARD_VENDOR_NAME,
                PayablesManager_Vendors_Id.DASHBOARD_VENDOR_NAME
            )).textContent(),
            `Vendor name is not ${vendorContext.vendorName}`
        ).toBe(vendorContext.vendorName);

        // Verify list views for vendor
        for (let i = 0; i < vendorContext.widgetTitle.length; i++) {
            expect(await this.isElementPresent(await commonPg.widgetTitle(vendorContext.widgetTitle[i])),
                `${vendorContext.widgetTitle[i]} widget is not found`
            ).toBeTruthy();
        }

        await FSMCommon.selectHeaderTab(FSMTabs.VENDOR_LIST);
        await FSMCommon.enterDataInFilterField(
            await FSMCommon.getTableID(FSMTableTitles.VENDORS),
            PayablesManager_Vendors_Lbl.STATE_PROVINCE_GRID,
            vendorContext.stateProvince[0]
        );

        // Verify filter results display
        expect(
            await FSMCommon.isRequiredRowPresent(
                await FSMCommon.getTableID(FSMTableTitles.VENDORS),
                PayablesManager_Vendors_Lbl.STATE_PROVINCE_GRID,
                vendorContext.stateProvince[0]
            ),
            "Filter results are not displayed"
        ).toBeTruthy();

        await FSMCommon.selectHeaderTab(FSMTabs.VENDOR_SEARCH);
        await FSMCommon.getTableID(FSMTableTitles.VENDOR_SEARCH);

        await FSMCommon.selectHeaderTab(FSMTabs.PAYABLES_TO_RECEIVABLES_INTERFACE);
        await FSMCommon.getTableID(FSMTableTitles.PAYABLES_TO_RECEIVABLES);

        await this.screenshot("Review changes to managing vendors");

        await FSMCommon.clickHome();
        await FSMCommon.verifyPageTitle(FSMPageTitles.MANAGE_PAYABLES);

        log.info("INFO : =========>>>>> Review changes to managing vendors successful <<<<<=========");
    }

    /*-------------------------------------------------------------------------
	 * Objective : Add the service definition
	 * Workbook  : IFSM_FinancialsDifferencesToLawson_Workbook
	 * Exercise  : 1.4.1
	 * -------------------------------------------------------------------------*/
    static async addTheServiceDefinition(serviceDefinition, processDefinition) {

        log.info(`INFO : =========>>>>> Add the service definition ${serviceDefinition} started <<<<<=========`);

        // Switch role to Process Server Administrator
        await FSMCommon.switchRoles(FSMApplicationRoles.PROCESS_SERVER_ADMINISTRATOR);
        await FSMCommon.getTableID(FSMTableTitles.PROCESS_SERVER_RUN_TIME_STATUS);

        // Configuration → Service Definitions
        await FSMCommon.menuNavigation(FSMMenu.CONFIGURATION, FSMMenu.SERVICE_DEFINITIONS);
        await FSMCommon.verifyPageTitle(FSMPageTitles.SERVICE_DEFINITIONS);

        await FSMCommon.enterDataInFilterField(await FSMCommon.getPageID(),
            ProcessServerAdministrator_ServiceDefinitions_Lbl.SERVICE_GRID,
            serviceDefinition
        );

        await FSMCommon.updateDefaultFilter(await FSMCommon.getPageID(),
            ProcessServerAdministrator_ServiceDefinitions_Lbl.SERVICE_GRID,
            Constants.EQUALS);

        await FSMCommon.rightClickOnRowAndPerformAnAction(await FSMCommon.getPageID(),
            ProcessServerAdministrator_ServiceDefinitions_Lbl.SERVICE_GRID,
            serviceDefinition, FSMActionsMenu.OPEN);

        await FSMCommon.verifyPageTitle(FSMPageTitles.SERVICE_DEFINITION);

        // Check service enabled checkbox
        const serviceEnabled = await FSMCommon.getCheckbox(
            ProcessServerAdministrator_ServiceDefinitions_Lbl.SERVICE_IS_ENABLED_CHK,
            ProcessServerAdministrator_ServiceDefinitions_Id.SERVICE_IS_ENABLED_CHK);

        expect(await serviceEnabled.isChecked(), "Service is enabled checkbox is not selected").toBeTruthy();

        await FSMCommon.selectHeaderTab(FSMTabs.PROCESSES);

        // Check if the process exists
        const processTable = await FSMCommon.getTableID(FSMTableTitles.SERVICE_PROCESS_DEFINITIONS);
        const exists = await FSMCommon.isRequiredRowPresent(processTable,
            ProcessServerAdministrator_ServiceDefinitions_Lbl.PROCESS_DEFINITION_GRID,
            processDefinition);

        if (!exists) {

            await FSMCommon.toolbarIcons(processTable, FSMActionsMenu.CREATE);
            await FSMCommon.verifyPageTitle(FSMPageTitles.SERVICE_PROCESS_DEFINITION);

            await (await FSMCommon.getTextboxLookUpIcon(
                ProcessServerAdministrator_ServiceDefinitions_Lbl.PROCESS_DEFINITION,
                ProcessServerAdministrator_ServiceDefinitions_Id.PROCESS_DEFINITION
            )).click();

            const dialogTable = await FSMCommon.getDialogBoxTableID(FSMTableTitles.PROCESS_DEFINITION_LIST);

            await FSMCommon.enterDataInFilterField(
                dialogTable,
                ProcessServerAdministrator_ServiceDefinitions_Lbl.PROCESS_GRID,
                processDefinition
            );

            await FSMCommon.updateDefaultFilter(
                dialogTable,
                ProcessServerAdministrator_ServiceDefinitions_Lbl.PROCESS_GRID,
                Constants.EQUALS
            );

            await FSMCommon.clickRowInDialogBox(dialogTable,
                ProcessServerAdministrator_ServiceDefinitions_Lbl.PROCESS_GRID,
                processDefinition);

            const value = await (await FSMCommon.getTextField(
                ProcessServerAdministrator_ServiceDefinitions_Lbl.PROCESS_DEFINITION,
                ProcessServerAdministrator_ServiceDefinitions_Id.PROCESS_DEFINITION
            )).inputValue();

            expect(value).toBe(processDefinition);

            // Process Enabled checkbox
            const processEnabled = await FSMCommon.getCheckbox(
                ProcessServerAdministrator_ServiceDefinitions_Lbl.SERVICE_PROCESS_IS_ENABLED_CHK,
                ProcessServerAdministrator_ServiceDefinitions_Id.SERVICE_PROCESS_IS_ENABLED_CHK
            );

            expect(await processEnabled.isChecked()).toBeTruthy();

            // Save
            await FSMCommon.toolbarIcons(await FSMCommon.getPageID(), FSMActionsMenu.SAVE);

            await FSMCommon.validateConfirmationMessage(
                FSMPopupMsgs.SERVICE_PROCESS_DEFINITION_CREATED);

            await this.page.goBack();

            log.info(`INFO : =========>>>>> Created ${processDefinition} process <<<<<=========`);
        }

        await FSMCommon.verifyPageTitle(FSMPageTitles.SERVICE_DEFINITION);

        expect(await FSMCommon.isRequiredRowPresent(await FSMCommon.getTableID(FSMTableTitles.SERVICE_PROCESS_DEFINITIONS),
                ProcessServerAdministrator_ServiceDefinitions_Lbl.PROCESS_DEFINITION_GRID,
                processDefinition)).toBeTruthy();

        // Screenshot
        await this.screenshot(`Add the service definition ${serviceDefinition}`);

        await this.page.goBack();

        await FSMCommon.verifyPageTitle(FSMPageTitles.SERVICE_DEFINITIONS);

        log.info(`INFO : =========>>>>> Add the service definition ${serviceDefinition} successful <<<<<=========`);
    }

    /*-------------------------------------------------------------------------
	 * Objective : Add a user to the list of final approvers
	 * Workbook  : IFSM_FinancialsDifferencesToLawson_Workbook 
	 * Exercise  : 1.4.2, 18.2.2
	 * -------------------------------------------------------------------------*/
    static async addUserToListOfFinalApprovers(taskName) {

        log.info("INFO : =========>>>>> Add a user to the list of final approvers started <<<<<=========");

        await FSMCommon.menuNavigation(FSMMenu.CONFIGURATION, FSMMenu.USER_CONFIGURATION, FSMMenu.TASKS);
        await FSMCommon.verifyPageTitle(FSMPageTitles.TASKS);

        await FSMCommon.enterDataInFilterField(
            await FSMCommon.getDialogBoxTableID(FSMTableTitles.TASKS),
            ProcessServerAdministrator_Tasks_Lbl.TASK_NAME_GRID,
            taskName
        );

        await FSMCommon.selectRequiredGridRow(
            await FSMCommon.getDialogBoxTableID(FSMTableTitles.TASKS),
            ProcessServerAdministrator_Tasks_Lbl.TASK_NAME_GRID,
            taskName);

        await FSMCommon.enterDataInFilterField(
            await FSMCommon.getDialogBoxTableID(FSMTableTitles.USER_TASKS),
            ProcessServerAdministrator_Tasks_Lbl.ACTOR_ID_GRID, config.INSTRUCTOR);

        // Check if required user displays in Actor ID Field
        if (!(
            await FSMCommon.isRequiredRowPresent(
                await FSMCommon.getDialogBoxTableID(FSMTableTitles.USER_TASKS),
                ProcessServerAdministrator_Tasks_Lbl.ACTOR_ID_GRID, config.INSTRUCTOR)
        )) {

            await FSMCommon.toolbarIcons(
                await FSMCommon.getDialogBoxTableID(FSMTableTitles.USER_TASKS),
                FSMActionsMenu.CREATE
            );

            await FSMCommon.verifyPageTitle(FSMPageTitles.USER_TASK);

            await (await FSMCommon.getTextboxLookUpIcon(
                ProcessServerAdministrator_Tasks_Lbl.USER,
                ProcessServerAdministrator_Tasks_Id.USER
            )).click();

            await FSMCommon.enterDataInFilterField(
                await FSMCommon.getDialogBoxTableID(FSMTableTitles.USER_PROFILE_LIST),
                ProcessServerAdministrator_Tasks_Lbl.USER_GRID, config.INSTRUCTOR);

            await FSMCommon.clickRowInDialogBox(
                await FSMCommon.getDialogBoxTableID(FSMTableTitles.USER_PROFILE_LIST),
                ProcessServerAdministrator_Tasks_Lbl.USER_GRID, config.INSTRUCTOR);

            // Verify that selected value is reflected in the field
            const userFieldVal = await (await FSMCommon.getTextField(
                ProcessServerAdministrator_Tasks_Lbl.USER,
                ProcessServerAdministrator_Tasks_Id.USER)).inputValue();

            expect(
                userFieldVal, `User field is not ${config.INSTRUCTOR}`).toBe(config.INSTRUCTOR);

            await FSMCommon.toolbarIcons(await FSMCommon.getPageID(), FSMActionsMenu.SAVE);
            await FSMCommon.validateConfirmationMessages();

            await this.page.goBack();
        }

        await FSMCommon.verifyPageTitle(FSMPageTitles.TASKS);

        // Verify that user displays in user tasks list
        expect(
            await FSMCommon.isRequiredRowPresent(
                await FSMCommon.getDialogBoxTableID(FSMTableTitles.USER_TASKS),
                ProcessServerAdministrator_Tasks_Lbl.ACTOR_ID_GRID, config.INSTRUCTOR),
            `${config.INSTRUCTOR} is not added to user tasks`).toBeTruthy();

        await FSMCommon.clickHome();

        // To verify the active page name
        await FSMCommon.getTableID(FSMTableTitles.PROCESS_SERVER_RUN_TIME_STATUS);

        await this.screenshot("Add a user to the list of final approvers");

        log.info("INFO : =========>>>>> Add a user to the list of final approvers successful <<<<<=========");
    }

	/*-------------------------------------------------------------------------
	 * Objective : Request a vendor
	 * Workbook  : IFSM_FinancialsDifferencesToLawson_Workbook 
	 * Exercise  : 1.5
	 * -------------------------------------------------------------------------*/
    static async requestVendor(vendorContext) {

        log.info("INFO : =========>>>>> Request a vendor started <<<<<=========");

        // Switch role to Payables
        await FSMCommon.switchRoles(FSMApplicationRoles.PAYABLES_MANAGER);
        await FSMCommon.verifyPageTitle(FSMPageTitles.MANAGE_PAYABLES);

        await FSMCommon.menuNavigation(FSMMenu.VENDORS);
        await FSMCommon.verifyPageTitle(FSMPageTitles.MANAGE_VENDORS);

        await FSMCommon.selectHeaderTab(FSMTabs.VENDOR_LIST);

        // Create Menu → Request new vendor
        await FSMCommon.toolbarIcon(await FSMCommon.getTableID(FSMTableTitles.VENDORS),
            FSMActionsMenu.CREATE,
            FSMActionsMenu.REQUEST_NEW_VENDOR);

        await FSMCommon.verifyDlgTitle(FSMDialogBoxTitles.REQUEST_NEW_VENDOR);

        // Enter values in Request new vendor dialog
        await this.type(await FSMCommon.getTextField(
            PayablesManager_Vendors_Lbl.NEEDED_BY,
            PayablesManager_Vendors_Id.NEEDED_BY
        ), vendorContext.neededBy);

        await FSMCommon.selectValueFromDropdown(await FSMCommon.getDropdown(
            PayablesManager_Vendors_Lbl.PRIORITY_DRP,
            PayablesManager_Vendors_Id.PRIORITY_DRP), vendorContext.priority);

        await this.type(await FSMCommon.getTextField(
            PayablesManager_Vendors_Lbl.VENDOR_NAME, PayablesManager_Vendors_Id.VENDOR_NAME), vendorContext.vendorName);

        await this.type(await FSMCommon.getTextField(
            PayablesManager_Vendors_Lbl.SEARCH_NAME,
            PayablesManager_Vendors_Id.SEARCH_NAME),
            vendorContext.searchName
        );

        await this.type(await FSMCommon.getTextField(
                PayablesManager_Vendors_Lbl.LEGAL_NAME,
                PayablesManager_Vendors_Id.LEGAL_NAME
            ),
            vendorContext.legalName
        );

        await this.type(await FSMCommon.getTextArea(PayablesManager_Vendors_Lbl.NOTES,
            PayablesManager_Vendors_Id.NOTES),
            vendorContext.notes);

        await this.type(await FSMCommon.getTextField(
                PayablesManager_Vendors_Lbl.TAX_ID_TYPE,
                PayablesManager_Vendors_Id.TAX_ID_TYPE
            ),
            vendorContext.taxIDType
        );

        await this.type(await FSMCommon.getTextField(
            PayablesManager_Vendors_Lbl.TAX_ID,
            PayablesManager_Vendors_Id.TAX_ID),
            vendorContext.taxID);

        // Address tab
        await FSMCommon.selectHeaderTab(FSMTabs.ADDRESS);

        await this.type(await FSMCommon.getTextField(
            PayablesManager_Vendors_Lbl.COUNTRY_JURISDICTION,
            PayablesManager_Vendors_Id.COUNTRY_JURISDICTION), vendorContext.country);

        // TAB key
        await (await FSMCommon.getTextField(
            PayablesManager_Vendors_Lbl.COUNTRY_JURISDICTION,
            PayablesManager_Vendors_Id.COUNTRY_JURISDICTION)).press("Tab");

        await this.type(await FSMCommon.getTextField(
            PayablesManager_Vendors_Lbl.STREET_ADDRESS,
            PayablesManager_Vendors_Id.STREET_ADDRESS
        ),
            vendorContext.streetAddress
        );

        await this.type(await FSMCommon.getTextField(
            PayablesManager_Vendors_Lbl.CITY,
            PayablesManager_Vendors_Id.CITY
        ),
            vendorContext.city
        );

        await this.type(await FSMCommon.getTextField(
            PayablesManager_Vendors_Lbl.STATE_PROVINCE,
            PayablesManager_Vendors_Id.STATE_PROVINCE
        ),
            vendorContext.stateProvince
        );

        await this.type(await FSMCommon.getTextField(
            PayablesManager_Vendors_Lbl.ZIP_CODE,
            PayablesManager_Vendors_Id.ZIP_CODE
        ),
            vendorContext.zipCode
        );

        await FSMCommon.toHandleButtons(FSMActionsMenu.SUBMIT);
        await FSMCommon.validateConfirmationMessages();

        await FSMCommon.verifyPageTitle(FSMPageTitles.MANAGE_VENDORS);

        await FSMCommon.clickBtnInUserAccount(FSMMenu.ACTIONS);

        await FSMCommon.verifyPageTitle(FSMPageTitles.MY_ACTIONS);

        await FSMCommon.selectHeaderTab(FSMTabs.ACTION_REQUESTS);

        await FSMCommon.rightClickOnRowAndPerformAnAction(await FSMCommon.getTableID(FSMTableTitles.OPEN_ACTION_REQUESTS),
            Actions_Lbl.REQUEST_TITLE_GRID,
            vendorContext.vendorName[0],
            FSMActionsMenu.OPEN
        );

        await this.screenshot("Request a vendor");

        await FSMCommon.toHandleButtons(Constants.CANCEL);

        await FSMCommon.verifyPageTitle(FSMPageTitles.MY_ACTIONS);

        await FSMCommon.clickHome();

        await FSMCommon.verifyPageTitle(FSMPageTitles.MANAGE_PAYABLES);

        log.info("INFO : =========>>>>> Request a vendor successful <<<<<=========");
    }

    /*-------------------------------------------------------------------------
	 * Objective : Approve Vendor requests
	 * Workbook  : IFSM_FinancialsDifferencesToLawson_Workbook
	 * Exercise  : 1.6
	 * -------------------------------------------------------------------------*/
    static async approveVendorRequests(vendorContext) {

        log.info("INFO : =========>>>>> Approve Vendor requests started <<<<<=========");

        // Switch role to Payables Manager
        await FSMCommon.switchRoles(FSMApplicationRoles.PAYABLES_MANAGER);
        await FSMCommon.verifyPageTitle(FSMPageTitles.MANAGE_PAYABLES);

        // User account → My Inbasket
        await FSMCommon.clickBtnInUserAccount(FSMMenu.INBASKET);
        await FSMCommon.verifyPageTitle(FSMPageTitles.INBASKET);

        await FSMCommon.clickRowInDialogBox(await FSMCommon.getPageID(),
            Inbasket_Lbl.TASK_GRID,
            vendorContext.task
        );


        await FSMCommon.enterDataInFilterField(await FSMCommon.getDialogBoxTableID(FSMTableTitles.WORK_ITEMS),
            Inbasket_Lbl.WORK_DESCRIPTION_GRID,
            vendorContext.vendorName
        );

        await FSMCommon.rightClickOnRowAndPerformAnAction(await FSMCommon.getDialogBoxTableID(FSMTableTitles.WORK_ITEMS),
            Inbasket_Lbl.WORK_DESCRIPTION_GRID,
            vendorContext.vendorName,
            FSMActionsMenu.OPEN
        );

        await FSMCommon.verifyDlgTitle(FSMDialogBoxTitles.REQUEST_NEW_VENDOR);

        // Select vendor group
        await (await FSMCommon.getTextboxLookUpIcon(
            PayablesManager_Vendors_Lbl.VENDOR_GROUP,
            PayablesManager_Vendors_Id.VENDOR_GROUP))
            .click();

        await FSMCommon.enterDataInFilterField(await FSMCommon.getDialogBoxTableID(FSMTableTitles.VENDOR_GROUPS),
            PayablesManager_Vendors_Lbl.VENDOR_GROUP_GRID, config.USER_NAME.substring(0, 4));

        await FSMCommon.clickRowInDialogBox(await FSMCommon.getDialogBoxTableID(FSMTableTitles.VENDOR_GROUPS),
            PayablesManager_Vendors_Lbl.VENDOR_GROUP_GRID, config.USER_NAME.substring(0, 4));

        await FSMCommon.verifyDlgTitle(FSMDialogBoxTitles.REQUEST_NEW_VENDOR);

        // Assert vendor group is selected
        expect(await (await FSMCommon.getTextField(PayablesManager_Vendors_Lbl.VENDOR_GROUP, PayablesManager_Vendors_Id.VENDOR_GROUP)
        ).inputValue()).toBe(config.USER_NAME.substring(0, 4));

        // Select vendor class
        await (await FSMCommon.getTextboxLookUpIcon(
            PayablesManager_Vendors_Lbl.VENDOR_CLASS,
            PayablesManager_Vendors_Id.VENDOR_CLASS
        )).click();

        await FSMCommon.enterDataInFilterField(await FSMCommon.getDialogBoxTableID(FSMTableTitles.VENDOR_CLASSES),
            PayablesManager_Vendors_Lbl.VENDOR_CLASS_GRID,
            vendorContext.vendorClass
        );

        await FSMCommon.clickRowInDialogBox(await FSMCommon.getDialogBoxTableID(FSMTableTitles.VENDOR_CLASSES),
            PayablesManager_Vendors_Lbl.VENDOR_CLASS_GRID,
            vendorContext.vendorClass);

        // Assert vendor class is selected
        await expect(async () => {

            expect(await (await FSMCommon.getTextField(
                PayablesManager_Vendors_Lbl.VENDOR_CLASS,
                PayablesManager_Vendors_Id.VENDOR_CLASS)).inputValue()).toBe(vendorContext.vendorClass);
        }).toPass({ timeout: 20000 });

        // Approve the vendor request
        await FSMCommon.toHandleButtons(FSMActionsMenu.APPROVE);
        await FSMCommon.validateConfirmationMessages();

        await FSMCommon.verifyPageTitle(FSMPageTitles.INBASKET);

        await FSMCommon.clickHome();
        await FSMCommon.verifyPageTitle(FSMPageTitles.MANAGE_PAYABLES);

        await FSMCommon.menuNavigation(FSMMenu.VENDORS);
        await FSMCommon.verifyPageTitle(FSMPageTitles.MANAGE_VENDORS);

        await FSMCommon.selectHeaderTab(FSMTabs.VENDOR_LIST);

        await FSMCommon.enterDataInFilterField(await FSMCommon.getTableID(FSMTableTitles.VENDORS),
            PayablesManager_Vendors_Lbl.VENDOR_NAME_GRID,
            vendorContext.vendorName);

        expect(await FSMCommon.isRequiredRowPresent(await FSMCommon.getTableID(FSMTableTitles.VENDORS),
            PayablesManager_Vendors_Lbl.VENDOR_NAME_GRID,
            vendorContext.vendorName)).toBe(true);

        await this.screenshot("Approve Vendor requests");

        log.info("INFO : =========>>>>> Approve Vendor requests successful <<<<<=========");
    }

    static async useTheConditionBuilderToDefineRules(customGrpContext) {

        // Initialising page objects
        const customGrpPg = new CustomGroupsPage(this.page);

        log.info("INFO : =========>>>>> Use Condition Builder to define rules started <<<<<=========");

        // Switch role to Cash Administrator
        await FSMCommon.switchRoles(FSMApplicationRoles.CASH_ADMINISTRATOR);
        await FSMCommon.verifyPageTitle(FSMPageTitles.CASH_ADMINISTRATION);

        // Click General setup --> Custom groups
        await FSMCommon.menuNavigation(FSMMenu.GENERAL_SETUP, FSMMenu.CUSTOM_GROUPS);

        await FSMCommon.verifyPageTitle(FSMPageTitles.CUSTOM_GROUPS);

        customGrpContext.customGroup=(config.USER_NAME.substring(config.USER_NAME.length-4))+customGrpContext.customGroup;
        await FSMCommon.enterDataInFilterField(await FSMCommon.getPageID(),
            CustomGroups_Lbl.CUSTOM_GROUP_GRID,
            customGrpContext.customGroup);

        if (!await FSMCommon.isRequiredRowPresent(await FSMCommon.getPageID(),
            CustomGroups_Lbl.CUSTOM_GROUP_GRID, customGrpContext.customGroup)) {

            // Click the create icon
            await FSMCommon.toolbarIcons(await FSMCommon.getPageID(), FSMActionsMenu.CREATE);
            await FSMCommon.verifyPageTitle(FSMPageTitles.CUSTOM_GROUP);

            await this.type(await FSMCommon.getTextField(CustomGroups_Lbl.CUSTOM_GROUP, CustomGroups_Id.CUSTOM_GROUP),
                customGrpContext.customGroup);

            await this.type(await FSMCommon.getUnlabeledTextField(CustomGroups_Id.DESCRIPTION),
                customGrpContext.description);

            await (await FSMCommon.getTextField(CustomGroups_Lbl.EFFECTIVE_DATE, CustomGroups_Id.EFFECTIVE_DATE)).clear();

            await (await FSMCommon.getTextboxLookUpIcon(CustomGroups_Lbl.BUSINESS_CLASS, CustomGroups_Id.BUSINESS_CLASS)).click();

            await FSMCommon.verifyDlgTitle(FSMDialogBoxTitles.SELECT_BUSINESS_CLASS);

            await FSMCommon.enterDataInFilterField(await FSMCommon.getDialogBoxTableID(FSMTableTitles.BUSINESS_VIEWS),
                CustomGroups_Lbl.BUSINESS_VIEW_GRID,
                customGrpContext.businessView
            );

            await FSMCommon.clickRowInDialogBox(await FSMCommon.getDialogBoxTableID(FSMTableTitles.BUSINESS_VIEWS),
                CustomGroups_Lbl.BUSINESS_VIEW_GRID,
                customGrpContext.businessView);

            // Verify that business view is displayed
            await expect(async () => {

                expect(await (await FSMCommon.getTextField(CustomGroups_Lbl.BUSINESS_CLASS, CustomGroups_Id.BUSINESS_CLASS))
                    .inputValue()).toBe(customGrpContext.businessView);
            }).toPass({ timeout: 10000 });

            await FSMCommon.verifyPageTitle(FSMPageTitles.CUSTOM_GROUP);

            await FSMCommon.toHandleButtons(CustomGroups_Lbl.BUILDER_BTN);

            await FSMCommon.verifyDlgTitle(FSMDialogBoxTitles.PAYABLESINVOICE_CONDITION_BUILDER_HELPER);

            await (await FSMCommon.getRadioButton(CustomGroups_Lbl.MATCH_ALL_RBTN, CustomGroups_Id.MATCH_ALL_RBTN)).click({ force: true});

            for (let i = 0; i < customGrpContext.conditions.length; i++) {

                // Verify the heading
                expect(await this.isElementPresent(await customGrpPg.conditions())).toBeTruthy();

                await (await customGrpPg.conditionsSearch()).click();

                await FSMCommon.verifyDlgTitle(FSMDialogBoxTitles.SELECT_FIELD_FROM_PAYABLESINVOICE);

                await this.type(await customGrpPg.name(), customGrpContext.name.split(".")[1]);
                 await this.page.keyboard.press('Enter');
                 
                await (await customGrpPg.getNameRow(await (await customGrpPg.tthName()).getAttribute(ElementAttributes.ID),
                    customGrpContext.name.split(".")[0],
                    customGrpContext.name.split(".")[1]
                )).click();

                // Click Ok button
                await FSMCommon.toHandleButtons(Constants.OK);

                await FSMCommon.verifyDlgTitle(FSMDialogBoxTitles.PAYABLESINVOICE_CONDITION_BUILDER_HELPER);

                await FSMCommon.selectValueFromDropdown(await customGrpPg.condition(), customGrpContext.conditions[i]);

                await FSMCommon.selectValueFromDropdown(await FSMCommon.getDropdown(CustomGroups_Lbl.OPTION_DRP, ""),
                    customGrpContext.option);

                await this.type(await customGrpPg.literalValue(), customGrpContext.literalValues[i]);

                if (i < customGrpContext.conditions.length - 1) {
                    await FSMCommon.toHandleButtons(CustomGroups_Lbl.BUILD_ANOTHER_BTN);
                }
            }

            await FSMCommon.toHandleButtons(Constants.OK);

            await FSMCommon.verifyPageTitle(FSMPageTitles.CUSTOM_GROUP);

            await FSMCommon.toolbarIcons(await FSMCommon.getPageID(), FSMActionsMenu.SAVE);
            await FSMCommon.validateConfirmationMessages();
        }

        await this.screenshot("Use Condition Builder to define rules");
        log.info("INFO : =========>>>>> Use Condition Builder to define rules Completed <<<<<=========");
    }

    /*-------------------------------------------------------------------------
	 * Objective : Create approval roles
	 * Workbook  : IFSM_FinancialsDifferencesToLawson_Workbook
	 * Exercise  : 2.1
	 * -------------------------------------------------------------------------*/
    static async createApprovalRoles(invoiceApprovalContext) {

        log.info("INFO : =========>>>>> Create approval roles started <<<<<=========");

        // Switch role to Payables Manager
        await FSMCommon.switchRoles(FSMApplicationRoles.PAYABLES_MANAGER);
        await FSMCommon.verifyPageTitle(FSMPageTitles.MANAGE_PAYABLES);

        // Click Setup --> Invoice Approval Setup --> Invoice Approval Roles
        await FSMCommon.menuNavigation(FSMMenu.SETUP, FSMMenu.INVOICE_APPROVAL_SETUP, FSMMenu.INVOICE_APPROVAL_ROLES);
        await FSMCommon.verifyPageTitle(FSMPageTitles.INVOICE_APPROVAL_ROLES);

        await FSMCommon.enterDataInFilterField(await FSMCommon.getPageID(),
            PayablesManager_InvoiceApprovalRoles_Lbl.VENDOR_GROUP_GRID,
            config.USER_NAME.substring(0,4)
        );

        // Create and save the approval roles
        for (let i = 0; i < invoiceApprovalContext.invoiceApprovalRoles.length; i++) {

            await FSMCommon.enterDataInFilterField(await FSMCommon.getPageID(),
                PayablesManager_InvoiceApprovalRoles_Lbl.INVOICE_APPROVAL_ROLE_GRID,
                invoiceApprovalContext.invoiceApprovalRoles[i]
            );

            if (!(await FSMCommon.isRequiredRowPresent(await FSMCommon.getPageID(),
                PayablesManager_InvoiceApprovalRoles_Lbl.INVOICE_APPROVAL_ROLE_GRID,
                invoiceApprovalContext.invoiceApprovalRoles[i]))) {

                // Click Create icon
                await FSMCommon.toolbarIcons(await FSMCommon.getPageID(), FSMActionsMenu.CREATE);
                await FSMCommon.verifyPageTitle(FSMPageTitles.INVOICE_APPROVAL_ROLE);

                // Verify Vendor Group
                expect(await (await FSMCommon.getTextField(
                    PayablesManager_InvoiceApprovalRoles_Lbl.VENDOR_GROUP,
                    PayablesManager_InvoiceApprovalRoles_Id.VENDOR_GROUP
                )).inputValue(), `Vendor group is not ${config.USER_NAME.substring(0,4)}`).toBe(config.USER_NAME.substring(0,4));

                await this.type(await FSMCommon.getTextField(
                        PayablesManager_InvoiceApprovalRoles_Lbl.INVOICE_APPROVAL_ROLE,
                        PayablesManager_InvoiceApprovalRoles_Id.INVOICE_APPROVAL_ROLE
                    ), invoiceApprovalContext.invoiceApprovalRoles[i]);

                await this.type(await FSMCommon.getTextField(
                        PayablesManager_InvoiceApprovalRoles_Lbl.DESCRIPTION,
                        PayablesManager_InvoiceApprovalRoles_Id.DESCRIPTION),
                    invoiceApprovalContext.invoiceApprovalRolesDesc[i]);

                // Save
                await FSMCommon.toolbarIcons(await FSMCommon.getPageID(), FSMActionsMenu.SAVE);
                await FSMCommon.validateConfirmationMessages();
                await this.page.goBack();
                await FSMCommon.verifyPageTitle(FSMPageTitles.INVOICE_APPROVAL_ROLES);

                // Verify role is created
                await FSMCommon.enterDataInFilterField(await FSMCommon.getPageID(),
                    PayablesManager_InvoiceApprovalRoles_Lbl.INVOICE_APPROVAL_ROLE_GRID,
                    invoiceApprovalContext.invoiceApprovalRoles[i]);

                expect(await FSMCommon.isRequiredRowPresent(await FSMCommon.getPageID(),
                    PayablesManager_InvoiceApprovalRoles_Lbl.INVOICE_APPROVAL_ROLE_GRID,
                    invoiceApprovalContext.invoiceApprovalRoles[i])).toBeTruthy();
            }
        }

        await this.screenshot("Create approval roles");

        await FSMCommon.clickHome();
        await FSMCommon.verifyPageTitle(FSMPageTitles.MANAGE_PAYABLES);

        log.info("INFO : =========>>>>> Create approval roles successful <<<<<=========");
    }

    /*-------------------------------------------------------------------------
	 * Objective : Change invoice approval role priority
	 * Workbook  : IFSM_FinancialsDifferencesToLawson_Workbook
	 * Exercise  : 2.2
	 * -------------------------------------------------------------------------*/
    static async changeInvoiceApprovalRolePriority(invoiceApprovalContext) {

        log.info("INFO : =========>>>>> Change invoice approval role priority started <<<<<=========");

        // Switch role to Payables Manager
        await FSMCommon.switchRoles(FSMApplicationRoles.PAYABLES_MANAGER);
        await FSMCommon.verifyPageTitle(FSMPageTitles.MANAGE_PAYABLES);

        // Click Setup --> Invoice Approval Setup --> Invoice Approval Roles
        await FSMCommon.menuNavigation(FSMMenu.SETUP, FSMMenu.INVOICE_APPROVAL_SETUP, FSMMenu.INVOICE_APPROVAL_ROLES);
        await FSMCommon.verifyPageTitle(FSMPageTitles.INVOICE_APPROVAL_ROLES);

        // Filter the vendor group
        await FSMCommon.enterDataInFilterField(await FSMCommon.getPageID(),
            PayablesManager_InvoiceApprovalRoles_Lbl.VENDOR_GROUP_GRID, config.USER_NAME.substring(0,4));

        for (let i = 0; i < 2; i++) {
            await FSMCommon.enterDataInFilterField(await FSMCommon.getPageID(),
                PayablesManager_InvoiceApprovalRoles_Lbl.INVOICE_APPROVAL_ROLE_GRID,
                invoiceApprovalContext.invoiceApprovalRoles[i]);
			const rowNo = await FSMCommon.selectRequiredGridRow(await FSMCommon.getPageID(),
                    PayablesManager_InvoiceApprovalRoles_Lbl.INVOICE_APPROVAL_ROLE_GRID,
                    invoiceApprovalContext.invoiceApprovalRoles[i]);
            
            await FSMCommon.enterDataInGridCell(await FSMCommon.getPageID(), PayablesManager_InvoiceApprovalRoles_Lbl.NEW_GRID,
                rowNo, invoiceApprovalContext.priority[i], Keys.TAB);
            // Click on save button
            await FSMCommon.toolbarIcons(FSMCommon.getPageID(), FSMActionsMenu.SAVE);
            await FSMCommon.validateConfirmationMessages();
        }

        await this.screenshot("Change invoice approval role priority");

        await FSMCommon.clickHome();
        await FSMCommon.verifyPageTitle(FSMPageTitles.MANAGE_PAYABLES);

        log.info("INFO : =========>>>>> Change invoice approval role priority successful <<<<<=========");
    }

    /*-------------------------------------------------------------------------
	 * Objective : Create an invoice routing category
	 * Workbook  : IFSM_FinancialsDifferencesToLawson_Workbook 
	 * Exercise  : 2.3.1
	 * -------------------------------------------------------------------------*/
    static async createAnInvoiceRoutingCategory(invoiceApprovalContext) {

        log.info("INFO : =========>>>>> Create an invoice routing category started <<<<<=========");

        // Switch role to Payables Manager
        await FSMCommon.switchRoles(FSMApplicationRoles.PAYABLES_MANAGER);
        await FSMCommon.verifyPageTitle(FSMPageTitles.MANAGE_PAYABLES);

        // Click Setup --> Invoice Approval Setup --> Invoice Routing Categories
        await FSMCommon.menuNavigation(FSMMenu.SETUP, FSMMenu.INVOICE_APPROVAL_SETUP, FSMMenu.INVOICE_ROUTING_CATEGORIES);
        await FSMCommon.verifyPageTitle(FSMPageTitles.INVOICE_ROUTING_CATEGORIES);

        await FSMCommon.enterDataInFilterField(await FSMCommon.getPageID(),
            PayablesManager_InvoiceRoutingCategories_Lbl.VENDOR_GROUP_GRID,
            config.USER_NAME.substring(0, 4));

        await FSMCommon.enterDataInFilterField(await FSMCommon.getPageID(),
            PayablesManager_InvoiceRoutingCategories_Lbl.INVOICE_ROUTING_CATEGORY_GRID,
            invoiceApprovalContext.invoiceRoutingCategory
        );

        if (!(await FSMCommon.isRequiredRowPresent(await FSMCommon.getPageID(),
            PayablesManager_InvoiceRoutingCategories_Lbl.VENDOR_GROUP_GRID,
            config.USER_NAME.substring(0, 4),
            PayablesManager_InvoiceRoutingCategories_Lbl.INVOICE_ROUTING_CATEGORY_GRID,
            invoiceApprovalContext.invoiceRoutingCategory))) {
            await FSMCommon.toolbarIcons(await FSMCommon.getPageID(), FSMActionsMenu.CREATE);
            await FSMCommon.verifyPageTitle(FSMPageTitles.CREATE_INVOICE_ROUTING_CATEGORY);

            // Verify vendor group. If mismatch, input manually
            const vendorGroupValue = await (await FSMCommon.getTextField(
                PayablesManager_InvoiceRoutingCategories_Lbl.VENDOR_GROUP,
                PayablesManager_InvoiceRoutingCategories_Id.VENDOR_GROUP
            )).inputValue();

            if (vendorGroupValue !== FSMCommon.getCompanyGroup()) {
                await this.type(await FSMCommon.getTextField(
                    PayablesManager_InvoiceRoutingCategories_Lbl.VENDOR_GROUP,
                    PayablesManager_InvoiceRoutingCategories_Id.VENDOR_GROUP
                ),
                    config.USER_NAME.substring(0, 4));
            }

            await this.type(await FSMCommon.getTextField(
                PayablesManager_InvoiceRoutingCategories_Lbl.INVOICE_ROUTING_CATEGORY,
                PayablesManager_InvoiceRoutingCategories_Id.INVOICE_ROUTING_CATEGORY),
                invoiceApprovalContext.invoiceRoutingCategory
            );

            await this.type(await FSMCommon.getTextField(
                PayablesManager_InvoiceRoutingCategories_Lbl.DESCRIPTION,
                PayablesManager_InvoiceRoutingCategories_Id.DESCRIPTION
            ),
                invoiceApprovalContext.invoiceRoutingCategory
            );

            await FSMCommon.toolbarIcons(await FSMCommon.getPageID(), FSMActionsMenu.SAVE);
            await FSMCommon.validateConfirmationMessages();
        }

        // Otherwise open existing record
        else {
            await FSMCommon.rightClickOnRowAndPerformAnAction(await FSMCommon.getPageID(),
                PayablesManager_InvoiceRoutingCategories_Lbl.INVOICE_ROUTING_CATEGORY_GRID,
                invoiceApprovalContext.invoiceRoutingCategory,
                FSMActionsMenu.OPEN
            );
        }

        await FSMCommon.getDialogBoxTableID(FSMTableTitles.INVOICE_APPROVAL_ASSIGNMENTS);

        await this.screenshot("Create an invoice routing category");

        log.info("INFO : =========>>>>> Create an invoice routing category successful <<<<<=========");
    }
    /*-------------------------------------------------------------------------
	 * Objective : Create invoice approval assignments
	 * Workbook  : IFSM_FinancialsDifferencesToLawson_Workbook
	 * Exercise  : 2.3.2
	 * -------------------------------------------------------------------------*/
    static async createInvoiceApprovalAssignments(invoiceApprovalContext) {

        log.info("INFO : =========>>>>> Create invoice approval assignments started <<<<<=========");

        // Create invoice approval assignments for all the roles
        for (let i = 0; i < invoiceApprovalContext.invoiceApprovalRoles.length; i++) {

            await FSMCommon.enterDataInFilterField(await FSMCommon.getDialogBoxTableID(FSMTableTitles.INVOICE_APPROVAL_ASSIGNMENTS),
                PayablesManager_InvoiceRoutingCategories_Lbl.INVOICE_APPROVAL_ROLE_GRID,
                invoiceApprovalContext.invoiceApprovalRoles[i]
            );

            // If record exists, verify Finance Resource
            if (await FSMCommon.isRequiredRowPresent(await FSMCommon.getDialogBoxTableID(FSMTableTitles.INVOICE_APPROVAL_ASSIGNMENTS),
                PayablesManager_InvoiceRoutingCategories_Lbl.INVOICE_APPROVAL_ROLE_GRID,
                invoiceApprovalContext.invoiceApprovalRoles[i]
            )) {
                const rowNo = await FSMCommon.selectRequiredGridRow(await FSMCommon.getDialogBoxTableID(FSMTableTitles.INVOICE_APPROVAL_ASSIGNMENTS),
                    PayablesManager_InvoiceRoutingCategories_Lbl.INVOICE_APPROVAL_ROLE_GRID,
                    invoiceApprovalContext.invoiceApprovalRoles[i]
                );

                expect(await FSMCommon.getRequiredValueFromTheGrid(await FSMCommon.getDialogBoxTableID(FSMTableTitles.INVOICE_APPROVAL_ASSIGNMENTS),
                    PayablesManager_InvoiceRoutingCategories_Lbl.FINANCE_RESOURCE_GRID,
                    rowNo), `${invoiceApprovalContext.financeResources[i]} is not selected in finance resource field`).toBe(invoiceApprovalContext.financeResources[i]);
            }

            // Otherwise create assignment
            else {
                await FSMCommon.toolbarIcons(await FSMCommon.getDialogBoxTableID(FSMTableTitles.INVOICE_APPROVAL_ASSIGNMENTS),
                    FSMActionsMenu.CREATE
                );

                await FSMCommon.verifyPageTitle(FSMPageTitles.INVOICE_APPROVAL_ASSIGNMENT);

                // Select Finance Resource
                await (await FSMCommon.getTextboxLookUpIcon(
                    PayablesManager_InvoiceRoutingCategories_Lbl.FINANCE_RESOURCE,
                    PayablesManager_InvoiceRoutingCategories_Id.FINANCE_RESOURCE
                )).click();

                await FSMCommon.enterDataInFilterField(await FSMCommon.getDialogBoxTableID(FSMTableTitles.RESOURCES),
                    PayablesManager_InvoiceRoutingCategories_Lbl.NAME_GRID,
                    invoiceApprovalContext.financeResources[i]
                );

                await FSMCommon.enterDataInFilterField(await FSMCommon.getDialogBoxTableID(FSMTableTitles.RESOURCES),
                    PayablesManager_InvoiceRoutingCategories_Lbl.RESOURCE_ID_GRID,
                    invoiceApprovalContext.resourceIDs[i]
                );

                await FSMCommon.clickRowInDialogBox(await FSMCommon.getDialogBoxTableID(FSMTableTitles.RESOURCES),
                    PayablesManager_InvoiceRoutingCategories_Lbl.NAME_GRID,
                    invoiceApprovalContext.financeResources[i],
                    PayablesManager_InvoiceRoutingCategories_Lbl.RESOURCE_ID_GRID,
                    invoiceApprovalContext.resourceIDs[i]);

                // Verify Finance Resource is selected
                expect(await (await FSMCommon
                    .getTextField(
                        PayablesManager_InvoiceRoutingCategories_Lbl.FINANCE_RESOURCE,
                        PayablesManager_InvoiceRoutingCategories_Id.FINANCE_RESOURCE
                    ))
                    .inputValue()).toBe(invoiceApprovalContext.resourceIDs[i])

                // Select Invoice Approval Role
                await (await FSMCommon.getTextboxLookUpIcon(
                    PayablesManager_InvoiceRoutingCategories_Lbl.INVOICE_APPROVAL_ROLE,
                    PayablesManager_InvoiceRoutingCategories_Id.INVOICE_APPROVAL_ROLE)).click();

                await FSMCommon.enterDataInFilterField(await FSMCommon.getDialogBoxTableID(FSMTableTitles.INVOICE_APPROVAL_ROLES),
                    PayablesManager_InvoiceRoutingCategories_Lbl.INVOICE_APPROVAL_ROLE_GRID,
                    invoiceApprovalContext.invoiceApprovalRoles[i]
                );

                await FSMCommon.clickRowInDialogBox(await FSMCommon.getDialogBoxTableID(FSMTableTitles.INVOICE_APPROVAL_ROLES),
                    PayablesManager_InvoiceRoutingCategories_Lbl.INVOICE_APPROVAL_ROLE_GRID,
                    invoiceApprovalContext.invoiceApprovalRoles[i]);

                // Verify Role is selected
                expect(await (await FSMCommon
                    .getTextField(
                        PayablesManager_InvoiceRoutingCategories_Lbl.INVOICE_APPROVAL_ROLE,
                        PayablesManager_InvoiceRoutingCategories_Id.INVOICE_APPROVAL_ROLE
                    )).inputValue(), `${invoiceApprovalContext.invoiceApprovalRoles[i]} role is not selected`).toBe(invoiceApprovalContext.invoiceApprovalRoles[i])

                await FSMCommon.toolbarIcons(await FSMCommon.getPageID(), FSMActionsMenu.SAVE);
                await FSMCommon.validateConfirmationMessages();

                await this.page.goBack();

                await FSMCommon.verifyPageTitle(FSMPageTitles.INVOICE_ROUTING_CATEGORY.replace('%s', invoiceApprovalContext.invoiceRoutingCategory).replace('%s', invoiceApprovalContext.invoiceRoutingCategory));
            }
        }

        await this.screenshot("Create invoice approval assignments");

        await FSMCommon.clickHome();
        await FSMCommon.verifyPageTitle(FSMPageTitles.MANAGE_PAYABLES);

        log.info("INFO : =========>>>>> Create invoice approval assignments successful <<<<<=========");
    }

    /*-------------------------------------------------------------------------
	 * Objective : 1) Create an invoice approval code
	 * Workbook  : IFSM_FinancialsDifferencesToLawson_Workbook
	 * Exercise  : 2.4.1
	 * -------------------------------------------------------------------------*/
    static async createAnInvoiceApprovalCode(invoiceApprovalContext, vendorGroup) {

    log.info("INFO : =========>>>>> Create an invoice approval code started <<<<<=========");

    // Switch role to Payables
    await FSMCommon.switchRoles(FSMApplicationRoles.PAYABLES_ADMINISTRATOR);

    // Click Administration
    await FSMCommon.menuNavigation(
        FSMMenu.PAYABLES_SETUP,
        FSMMenu.INVOICE_APPROVAL_SETUP,
        FSMMenu.INVOICE_APPROVAL_CODES);

    await FSMCommon.verifyPageTitle(FSMPageTitles.INVOICE_APPROVAL_CODES);

    await FSMCommon.enterDataInFilterField(
        await FSMCommon.getPageID(),
        Payables_InvoiceApprovalCodes_Lbl.VENDOR_GROUP_GRID,
        vendorGroup
    );

    await FSMCommon.enterDataInFilterField(
        await FSMCommon.getPageID(),
        Payables_InvoiceApprovalCodes_Lbl.INVOICE_APPROVAL_CODE_GRID,
        invoiceApprovalContext.invoiceApprovalCode
    );

    // Create if record does not exist
    if (!await FSMCommon.isRequiredRowPresent(
        await FSMCommon.getPageID(),
        Payables_InvoiceApprovalCodes_Lbl.INVOICE_APPROVAL_CODE_GRID,
        invoiceApprovalContext.invoiceApprovalCode
    )) {

        await FSMCommon.toolbarIcons(await FSMCommon.getPageID(), FSMActionsMenu.CREATE);
        await FSMCommon.verifyPageTitle(FSMPageTitles.CREATE_INVOICE_APPROVAL_CODE);

        // Verify vendor group. If not same,type it
        if (!(
            await (await FSMCommon.getTextField(
                Payables_InvoiceApprovalCodes_Lbl.VENDOR_GROUP_INVOICE_ROUTING_CODE,
                Payables_InvoiceApprovalCodes_Id.VENDOR_GROUP_INVOICE_ROUTING_CODE
            )).inputValue() === vendorGroup)) {
            await this.type(
                await FSMCommon.getTextField(
                    Payables_InvoiceApprovalCodes_Lbl.VENDOR_GROUP_INVOICE_ROUTING_CODE,
                    Payables_InvoiceApprovalCodes_Id.VENDOR_GROUP_INVOICE_ROUTING_CODE
                ),
                vendorGroup
            );
        }

        await this.type(
            await FSMCommon.getTextField(
                Payables_InvoiceApprovalCodes_Lbl.INVOICE_APPROVAL_CODE,
                Payables_InvoiceApprovalCodes_Id.INVOICE_APPROVAL_CODE),
            invoiceApprovalContext.invoiceApprovalCode);

        await type(
            await FSMCommon.getTextField(
                Payables_InvoiceApprovalCodes_Lbl.DESCRIPTION,
                Payables_InvoiceApprovalCodes_Id.DESCRIPTION
            ),
            invoiceApprovalContext.approvalCodeDesc
        );

        await FSMCommon.selectValueFromDropdown(
            await FSMCommon.getDropdown(
                Payables_InvoiceApprovalCodes_Lbl.INITIAL_APPROVAL_LEVEL_DRP,
                Payables_InvoiceApprovalCodes_Id.INITIAL_APPROVAL_LEVEL_DRP
            ),
            invoiceApprovalContext.initialApprovalLevel
        );

        await FSMCommon.selectValueFromDropdown(
            await FSMCommon.getDropdown(
                Payables_InvoiceApprovalCodes_Lbl.FINAL_APPROVAL_LEVEL_DRP,
                Payables_InvoiceApprovalCodes_Id.FINAL_APPROVAL_LEVEL_DRP
            ),
            invoiceApprovalContext.finalApprovalLevel
        );

        await FSMCommon.selectCheckbox(
            await FSMCommon.getCheckbox(
                Payables_InvoiceApprovalCodes_Lbl.ASSIGN_APPROVERS_USING_RULES_CHK,
                Payables_InvoiceApprovalCodes_Id.ASSIGN_APPROVERS_USING_RULES_CHK
            )
        );

        // Save
        await FSMCommon.toolbarIcons(await FSMCommon.getPageID(), FSMActionsMenu.SAVE);
        await FSMCommon.validateConfirmationMessage();
        await pause(3);
    }

    // Open record if already exists
    else {
        await FSMCommon.rightClickOnRowAndPerformAnAction(
            await FSMCommon.getPageID(),
            Payables_InvoiceApprovalCodes_Lbl.INVOICE_APPROVAL_CODE_GRID,
            invoiceApprovalContext.invoiceApprovalCode,
            FSMActionsMenu.OPEN
        );
    }

    await FSMCommon.getDialogBoxTableID(FSMTableTitles.INVOICE_APPROVAL_LEVELS);

    await screenshot("Create an invoice approval code");

    console.log("INFO : =========>>>>> Create an invoice approval code successful <<<<<=========");
}


}

export default PayablesManagerFunctions;