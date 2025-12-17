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
import Payables_InvoiceRoutingRules_Lbl from "../constants/elementLbls/Payables_InvoiceRoutingRules_Lbl";
import Payables_InvoiceRoutingRules_Id from "../constants/elementIDs/Payables_InvoiceRoutingRules_Id";
import FSMCommonWithoutIFrame from "../../commons/FSMCommonWithoutIFrame";
import FSMWindows from "../constants/FSMWindows";
import Payables_InvoiceAssignmentRules_Lbl from "../constants/elementLbls/Payables_InvoiceAssignmentRules_Lbl";
import Payables_InvoiceAssignmentRules_Id from "../constants/elementIDs/Payables_InvoiceAssignmentRules_Id";
import Payables_CreateInvoice_Lbl from "../constants/elementLbls/Payables_CreateInvoice_Lbl";
import Payables_CreateInvoice_Id from "../constants/elementIDs/Payables_CreateInvoice_Id";
import MyInvoicesPage from "../pages/MyInvoicesPage";
import Payables_MyInvoices_Lbl from "../constants/elementLbls/Payables_MyInvoices_Lbl";
import Payables_MyInvoices_Id from "../constants/elementIDs/Payables_MyInvoices_Id";
import Payables_Invoices_Lbl from "../constants/elementLbls/Payables_Invoices_Lbl";
import Payables_Invoices_Id from "../constants/elementIDs/Payables_Invoices_Id";
import Payables_CurrentCashRequirementsResults_Lbl from "../constants/elementLbls/Payables_CurrentCashRequirementsResults_Lbl";
import PayablesManager_PerformCashRequirements_Id from "../constants/elementIDs/PayablesManager_PerformCashRequirements_Id";
import PayablesManager_CashRequirementsResults_Lbl from "../constants/elementLbls/PayablesManager_CashRequirementsResults_Lbl";

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
                rowNo, invoiceApprovalContext.priority[i]);
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

            await this.type(
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
            await FSMCommon.validateConfirmationMessages();
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

        await this.screenshot("Create an invoice approval code");

        log.info("INFO : =========>>>>> Create an invoice approval code successful <<<<<=========");
    }

    /*-------------------------------------------------------------------------
	 * Objective : Create invoice approval levels
	 * Workbook  : IFSM_FinancialsDifferencesToLawson_Workbook 
	 * Exercise  : 2.4.2
	 * -------------------------------------------------------------------------*/
    static async createInvoiceApprovalLevels(invoiceApprovalContext, vendorGroup) {

        log.info("INFO : =========>>>>> Create invoice approval levels started <<<<<=========");

        // Create approval levels for all the roles
        for (let i = 0; i < invoiceApprovalContext.invoiceApprovalRoles.length; i++) {

            await FSMCommon.enterDataInFilterField(
                await FSMCommon.getDialogBoxTableID(FSMTableTitles.INVOICE_APPROVAL_LEVELS),
                Payables_InvoiceApprovalCodes_Lbl.NAME_GRID,
                invoiceApprovalContext.invoiceApprovalRoles[i]
            );

            // If record already exists, Verify the Maximum approval amount
            if (await FSMCommon.isRequiredRowPresent(
                await FSMCommon.getDialogBoxTableID(FSMTableTitles.INVOICE_APPROVAL_LEVELS),
                Payables_InvoiceApprovalCodes_Lbl.NAME_GRID,
                invoiceApprovalContext.invoiceApprovalRoles[i]
            )) {

                const rowNo = await FSMCommon.selectRequiredGridRow(
                    await FSMCommon.getDialogBoxTableID(FSMTableTitles.INVOICE_APPROVAL_LEVELS),
                    Payables_InvoiceApprovalCodes_Lbl.NAME_GRID,
                    invoiceApprovalContext.invoiceApprovalRoles[i]
                );

                const gridValue = await FSMCommon.getRequiredValueFromTheGrid(
                    await FSMCommon.getDialogBoxTableID(FSMTableTitles.INVOICE_APPROVAL_LEVELS),
                    Payables_InvoiceApprovalCodes_Lbl.MAXIMUM_APPROVAL_AMOUNT_GRID,
                    rowNo
                );

                expect(gridValue).toHaveText(invoiceApprovalContext.maxApprovalAmt[i]);
            }

            // Otherwise create invoice approval level
            else {
                await FSMCommon.toolbarIcons(
                    await FSMCommon.getDialogBoxTableID(FSMTableTitles.INVOICE_APPROVAL_LEVELS),
                    FSMActionsMenu.CREATE
                );

                await FSMCommon.verifyPageTitle(FSMPageTitles.INVOICE_APPROVAL_LEVEL);

                const vendorValue = await (await FSMCommon.getTextField(
                    Payables_InvoiceApprovalCodes_Lbl.VENDOR_GROUP_INVOICE_APPROVAL_LEVEL,
                    Payables_InvoiceApprovalCodes_Id.VENDOR_GROUP_INVOICE_APPROVAL_LEVEL
                )).inputValue();

                expect(vendorValue).toBe(vendorGroup);

                await (await FSMCommon.getTextboxLookUpIcon(
                    Payables_InvoiceApprovalCodes_Lbl.INVOICE_APPROVAL_ROLE,
                    Payables_InvoiceApprovalCodes_Id.INVOICE_APPROVAL_ROLE
                )).click();

                await FSMCommon.enterDataInFilterField(
                    await FSMCommon.getDialogBoxTableID(FSMTableTitles.INVOICE_APPROVAL_ROLES),
                    Payables_InvoiceApprovalCodes_Lbl.INVOICE_APPROVAL_ROLE_GRID,
                    invoiceApprovalContext.invoiceApprovalRoles[i]
                );

                await FSMCommon.clickRowInDialogBox(
                    await FSMCommon.getDialogBoxTableID(FSMTableTitles.INVOICE_APPROVAL_ROLES),
                    Payables_InvoiceApprovalCodes_Lbl.INVOICE_APPROVAL_ROLE_GRID,
                    invoiceApprovalContext.invoiceApprovalRoles[i]
                );

                const selectedRole = await FSMCommon.getTextField(
                    Payables_InvoiceApprovalCodes_Lbl.INVOICE_APPROVAL_ROLE,
                    Payables_InvoiceApprovalCodes_Id.INVOICE_APPROVAL_ROLE
                );

                expect(await selectedRole.inputValue()).toBe(invoiceApprovalContext.invoiceApprovalRoles[i]);

                await this.type(await FSMCommon.getTextField(
                    Payables_InvoiceApprovalCodes_Lbl.MAXIMUM_APPROVAL_AMOUNT,
                    Payables_InvoiceApprovalCodes_Id.MAXIMUM_APPROVAL_AMOUNT
                ),
                    invoiceApprovalContext.maxApprovalAmt[i]
                );

                expect(await this.isElementPresent(await FSMCommon.getCheckbox(
                    Payables_InvoiceApprovalCodes_Lbl.SKIP_NEXT_APPROVAL_LEVEL_CHK,
                    Payables_InvoiceApprovalCodes_Id.SKIP_NEXT_APPROVAL_LEVEL_CHK
                )
                )).toBeTruthy();

                expect(await this.isElementPresent(await FSMCommon.getTextField(
                    Payables_InvoiceApprovalCodes_Lbl.ESCALATE_AFTER,
                    Payables_InvoiceApprovalCodes_Id.ESCALATE_AFTER
                )
                )).toBeTruthy();
            }

            await FSMCommon.toolbarIcons(await FSMCommon.getPageID(), FSMActionsMenu.SAVE);
            await FSMCommon.validateConfirmationMessages();

            await this.page.goBack();

            await FSMCommon.verifyPageTitle(FSMPageTitles.INVOICE_APPROVAL_CODE.replace("%s", invoiceApprovalContext.invoiceApprovalCode)
                .replace("%s", invoiceApprovalContext.approvalCodeDesc));
        }

        await this.screenshot("Create invoice approval levels");

        log.info("INFO : =========>>>>> Create invoice approval levels successful <<<<<=========");
    }
    /*-------------------------------------------------------------------------
	 * Objective : 1) Add invoice routing rule and custom group
	 *             2) Create an invoice routing rule with a simple condition
	 * Workbook  : IFSM_FinancialsDifferencesToLawson_Workbook 
	 * Exercise  : 2.6.1, 2.6.2
	 * -------------------------------------------------------------------------*/
    static async addAnInvoiceRoutingRuleAndCustomGroup(name, vendorGroup, description, customGroup, customGrpDesc,
        condition, listName, approvalCode, flag, previewButton) {

        log.info("INFO : =========>>>>> Add invoice routing rule and custom group started <<<<<=========");

        await FSMCommon.switchRoles(FSMApplicationRoles.PAYABLES_ADMINISTRATOR);

        await FSMCommon.menuNavigation(
            FSMMenu.PAYABLES_SETUP, FSMMenu.INVOICE_APPROVAL_SETUP, FSMMenu.INVOICE_ROUTING_RULES);

        await FSMCommon.verifyPageTitle(FSMPageTitles.INVOICE_ROUTING_RULES);

        await FSMCommon.enterDataInFilterField(await FSMCommon.getPageID(),
            Payables_InvoiceRoutingRules_Lbl.NAME_GRID, name);

        // DELETE RULE IF EXISTS
        if (await FSMCommon.isRequiredRowPresent(await FSMCommon.getPageID(), Payables_InvoiceRoutingRules_Lbl.NAME_GRID,
            name)) {
            await FSMCommon.selectRequiredGridRow(
                await FSMCommon.getPageID(),
                Payables_InvoiceRoutingRules_Lbl.NAME_GRID,
                name
            );

            await FSMCommon.toolbarIcons(await FSMCommon.getPageID(), FSMActionsMenu.DELETE);
            await FSMCommon.validateMessageTextAndHandlePopUp(FSMPopupMsgs.CONFIRM_ACTION_DELETE, Constants.OK);
            await FSMCommon.validateConfirmationMessages();
            await FSMCommon.clickHome();

            await FSMCommon.switchRoles(FSMApplicationRoles.PAYABLES_ADMINISTRATOR);
            await FSMCommon.menuNavigation(
                FSMMenu.PAYABLES_SETUP, FSMMenu.INVOICE_APPROVAL_SETUP, FSMMenu.INVOICE_ROUTING_RULES);
            await FSMCommon.verifyPageTitle(FSMPageTitles.INVOICE_ROUTING_RULES);

            await FSMCommon.collapseToggleMenu();
        }

        // CREATE NEW RULE
        await FSMCommon.toolbarIcons(await FSMCommon.getPageID(), FSMActionsMenu.CREATE);
        await FSMCommon.verifyPageTitle(FSMPageTitles.INVOICE_ROUTING_RULE);

        const vendorValue = await (await FSMCommon.getTextField(
            Payables_InvoiceRoutingRules_Lbl.VENDOR_GROUP,
            Payables_InvoiceRoutingRules_Id.VENDOR_GROUP
        )).inputValue();
        expect(vendorValue).toBe(vendorGroup);

        await this.type(await FSMCommon.getTextField(Payables_InvoiceRoutingRules_Lbl.NAME, Payables_InvoiceRoutingRules_Id.NAME),
            name);

        await this.type(await FSMCommon.getTextField(Payables_InvoiceRoutingRules_Lbl.DESCRIPTION, Payables_InvoiceRoutingRules_Id.DESCRIPTION),
            description);

        // OPEN CUSTOM GROUP LOOKUP
        await (await FSMCommon.getTextboxLookUpIcon(
            Payables_InvoiceRoutingRules_Lbl.INVOICE_ROUTING_RULE,
            Payables_InvoiceRoutingRules_Id.INVOICE_ROUTING_RULE)).click();

        await FSMCommon.actionsMenuOption(
            await FSMCommon.getDialogBoxTableID(FSMTableTitles.CUSTOM_GROUPS),
            FSMActionsMenu.EDIT_MODE
        );

        // SEARCH CUSTOM GROUP
        await FSMCommon.enterDataInFilterField(
            await FSMCommon.getDialogBoxTableID(FSMTableTitles.CUSTOM_GROUPS),
            CustomGroups_Lbl.CUSTOM_GROUP_GRID, customGroup
        );

        // IF CUSTOM GROUP DOES NOT EXIST → CREATE
        if (!(await FSMCommon.isRequiredRowPresent(
            await FSMCommon.getDialogBoxTableID(FSMTableTitles.CUSTOM_GROUPS),
            CustomGroups_Lbl.CUSTOM_GROUP_GRID, customGroup))) {

            await FSMCommon.toolbarIcons(
                await FSMCommon.getDialogBoxTableID(FSMTableTitles.CUSTOM_GROUPS),
                FSMActionsMenu.CREATE);

            await this.switchToWindow(FSMWindows.CUSTOM_GROUP_PAYABLES_ADMINISTRATOR);

            await FSMCommonWithoutIFrame.verifyPageTitle(FSMPageTitles.CUSTOM_GROUP);

            await this.type(
                FSMCommonWithoutIFrame.getTextField(CustomGroups_Lbl.CUSTOM_GROUP, CustomGroups_Id.CUSTOM_GROUP),
                customGroup
            );

            await this.type(await FSMCommonWithoutIFrame.getUnlabeledTextField(CustomGroups_Id.DESCRIPTION),
                customGrpDesc
            );

            if (flag === 1) {
                await (await FSMCommonWithoutIFrame.getTextField(
                    CustomGroups_Lbl.EFFECTIVE_DATE,
                    CustomGroups_Id.EFFECTIVE_DATE
                )).clear();
            }

            await (await FSMCommonWithoutIFrame.getTextArea(CustomGroups_Lbl.CONDITION, CustomGroups_Id.CONDITION)).click();
    
            await (await FSMCommonWithoutIFrame.getTextArea(CustomGroups_Lbl.CONDITION, CustomGroups_Id.CONDITION)).press("Tab");

            await FSMCommonWithoutIFrame.toolbarIcons(
                await FSMCommonWithoutIFrame.getPageID(), FSMActionsMenu.SAVE);

            await FSMCommonWithoutIFrame.validateConfirmationMessages();
            await FSMCommonWithoutIFrame.verifyPageTitle(`${customGrpDesc} ${FSMPageTitles.CUSTOM_GROUP}`);

            // PREVIEW FLOW
            if (previewButton) {
                await FSMCommonWithoutIFrame.toHandleButtons(CustomGroups_Lbl.PREVIEW_BTN);
            
                await FSMCommonWithoutIFrame.verifyDlgTitle(FSMDialogBoxTitles.PREVIEW_OPTIONS);

                await FSMCommonWithoutIFrame.selectValueFromDropdown(await FSMCommonWithoutIFrame.getDropdown(CustomGroups_Lbl.LIST_NAME_DRP, ""), listName);

                await FSMCommonWithoutIFrame.toHandleButtons(Constants.OK);
               

                await this.switchToWindow(FSMWindows.PAYABLES_INVOICES_PAYABLES_ADMINISTRATOR);
            
                await FSMCommonWithoutIFrame.verifyPageTitle(FSMPageTitles.PAYABLES_INVOICES);

                await this.page.close();

                await this.switchToWindow(customGrpDesc + FSMWindows.CUSTOM_GROUP_PAYABLES_ADMINISTRATOR);
            
                await FSMCommonWithoutIFrame.verifyPageTitle(`${customGrpDesc} ${FSMPageTitles.CUSTOM_GROUP}`);
            }

            await this.page.close();
            await this.switchToWindow(FSMWindows.FSM);
        }

        await FSMCommon.toHandleButtons(Constants.DONE_EDITING);

        await FSMCommon.toolbarIcons(await FSMCommon.getDialogBoxTableID(FSMTableTitles.CUSTOM_GROUPS),
            FSMActionsMenu.REFRESH);

        await FSMCommon.enterDataInFilterField(
            await FSMCommon.getDialogBoxTableID(FSMTableTitles.CUSTOM_GROUPS),
            CustomGroups_Lbl.CUSTOM_GROUP_GRID, customGroup
        );

        await FSMCommon.clickRowInDialogBox(
            await FSMCommon.getDialogBoxTableID(FSMTableTitles.CUSTOM_GROUPS),
            CustomGroups_Lbl.CUSTOM_GROUP_GRID, customGroup
        );

        await FSMCommon.verifyPageTitle(FSMPageTitles.INVOICE_ROUTING_RULE);

        // VERIFY RULE POPULATED
        const ruleVal = await (await FSMCommon.getTextField(
            Payables_InvoiceRoutingRules_Lbl.INVOICE_ROUTING_RULE,
            Payables_InvoiceRoutingRules_Id.INVOICE_ROUTING_RULE
        )).inputValue();

        expect(ruleVal).toBe(customGroup);

        if (flag === 0) {
            await FSMCommon.selectCheckbox(await FSMCommon.getCheckbox(
                Payables_InvoiceRoutingRules_Lbl.AUTO_APPROVE_CHK,
                Payables_InvoiceRoutingRules_Id.AUTO_APPROVE_CHK ) );
        }

        if (approvalCode) {
            await (await FSMCommon.getTextboxLookUpIcon(
                Payables_InvoiceRoutingRules_Lbl.APPROVAL_CODE,
                Payables_InvoiceRoutingRules_Id.APPROVAL_CODE)).click();

            await FSMCommon.clickRowInDialogBox(
                await FSMCommon.getDialogBoxTableID(FSMTableTitles.INVOICE_APPROVAL_CODES),
                Payables_InvoiceRoutingRules_Lbl.CODE_GRID, approvalCode
            );
        }

        await FSMCommon.toolbarIcons(await FSMCommon.getPageID(), FSMActionsMenu.SAVE);
        await FSMCommon.validateConfirmationMessages();

        await this.screenshot("Add invoice routing rule and custom group");
        await FSMCommon.clickHome();

        log.info("INFO : =========>>>>> Add invoice routing rule and custom group successful <<<<<=========");
    }

    /*------------------------------------------------------------------------------------
	 * Objective : 1) Create an invoice assignment rule
	 * Workbook  : IFSM_FinancialsDifferencesToLawson_Workbook
	 * Exercise  : 2.7
	 * ------------------------------------------------------------------------------------*/
    static async createInvoiceAssignmentRule(name, vendorGrp, description, customGrp, customGrpDesc,
        condition, listName, resourceName, resourceId) {

        log.info("INFO : =========>>>>> Create an invoice assignment rule started <<<<<=========");

        await FSMCommon.switchRoles(FSMApplicationRoles.PAYABLES_ADMINISTRATOR);

        await FSMCommon.menuNavigation(FSMMenu.PAYABLES_SETUP, FSMMenu.INVOICE_ASSIGNMENT_RULES);

        await FSMCommon.verifyPageTitle(FSMPageTitles.INVOICE_ASSIGNMENT_RULES);

        await FSMCommon.enterDataInFilterField(await FSMCommon.getPageID(), Payables_InvoiceAssignmentRules_Lbl.NAME_GRID, name);

        if (await FSMCommon.isRequiredRowPresent(await FSMCommon.getPageID(), Payables_InvoiceAssignmentRules_Lbl.NAME_GRID, name)) {

            await FSMCommon.selectRequiredGridRow(await FSMCommon.getPageID(), Payables_InvoiceAssignmentRules_Lbl.NAME_GRID, name);
            await FSMCommon.toolbarIcons(await FSMCommon.getPageID(), FSMActionsMenu.DELETE);

            await FSMCommon.validateMessageTextAndHandlePopUp(FSMPopupMsgs.CONFIRM_ACTION_DELETE, Constants.OK);
            await FSMCommon.validateConfirmationMessages();
        }

        await FSMCommon.toolbarIcons(await FSMCommon.getPageID(), FSMActionsMenu.CREATE);
        await FSMCommon.verifyPageTitle(FSMPageTitles.INVOICE_ASSIGNMENT_RULE);

        expect(await (await FSMCommon.getTextField(Payables_InvoiceAssignmentRules_Lbl.VENDOR_GROUP,
            Payables_InvoiceAssignmentRules_Id.VENDOR_GROUP)).inputValue()).toEqual(vendorGrp);

        await this.type(await FSMCommon.getTextField(Payables_InvoiceAssignmentRules_Lbl.NAME,
            Payables_InvoiceAssignmentRules_Id.NAME), name);

        await this.type(await FSMCommon.getTextField(Payables_InvoiceAssignmentRules_Lbl.DESCRIPTION,
            Payables_InvoiceAssignmentRules_Id.DESCRIPTION), description);

        await (await FSMCommon.getTextboxLookUpIcon(
            Payables_InvoiceAssignmentRules_Lbl.INVOICE_ASSIGNMENT_RULE,
            Payables_InvoiceAssignmentRules_Id.INVOICE_ASSIGNMENT_RULE
        )).click();


        await FSMCommon.actionsMenuOption(await FSMCommon.getDialogBoxTableID(FSMTableTitles.CUSTOM_GROUPS),
            FSMActionsMenu.EDIT_MODE);

        await FSMCommon.enterDataInFilterField(await FSMCommon.getDialogBoxTableID(FSMTableTitles.CUSTOM_GROUPS),
            CustomGroups_Lbl.CUSTOM_GROUP_GRID, customGrp);

        if (!await FSMCommon.isRequiredRowPresent(await FSMCommon.getDialogBoxTableID(FSMTableTitles.CUSTOM_GROUPS),
            CustomGroups_Lbl.CUSTOM_GROUP_GRID, customGrp)) {

            await FSMCommon.toolbarIcons(await FSMCommon.getDialogBoxTableID(FSMTableTitles.CUSTOM_GROUPS), FSMActionsMenu.CREATE);


            await this.switchToWindow(FSMWindows.CUSTOM_GROUP_PAYABLES_ADMINISTRATOR);

            await FSMCommonWithoutIFrame.verifyPageTitle(FSMPageTitles.CUSTOM_GROUP);

            await this.type(await FSMCommonWithoutIFrame.getTextField(CustomGroups_Lbl.CUSTOM_GROUP,
                CustomGroups_Id.CUSTOM_GROUP), customGrp);

            await this.type(await FSMCommonWithoutIFrame.getUnlabeledTextField(CustomGroups_Id.DESCRIPTION), customGrpDesc);

            await (await FSMCommonWithoutIFrame.getTextField(
                CustomGroups_Lbl.EFFECTIVE_DATE, CustomGroups_Id.EFFECTIVE_DATE
            )).clear();

            await (await FSMCommonWithoutIFrame.getTextArea(
                CustomGroups_Lbl.CONDITION, CustomGroups_Id.CONDITION
            )).click();

            await (await FSMCommonWithoutIFrame.getTextArea(CustomGroups_Lbl.CONDITION, CustomGroups_Id.CONDITION))
                .press('Tab');

            await FSMCommonWithoutIFrame.toolbarIcons(await FSMCommonWithoutIFrame.getPageID(), FSMActionsMenu.SAVE);
            FSMCommonWithoutIFrame.validateConfirmationMessages();

            await FSMCommonWithoutIFrame.verifyPageTitle(`${customGrpDesc} ${FSMPageTitles.CUSTOM_GROUP}`);

            if (listName) {

                await FSMCommonWithoutIFrame.toHandleButtons(CustomGroups_Lbl.PREVIEW_BTN);

                await FSMCommonWithoutIFrame.verifyDlgTitle(FSMDialogBoxTitles.PREVIEW_OPTIONS);

                await FSMCommonWithoutIFrame.selectValueFromDropdown(await FSMCommonWithoutIFrame.getDropdown(CustomGroups_Lbl.LIST_NAME_DRP, ""), listName);

                await FSMCommonWithoutIFrame.toHandleButtons(Constants.OK);

                await this.switchToWindow(FSMWindows.PAYABLES_INVOICES_PAYABLES_ADMINISTRATOR);

                await FSMCommonWithoutIFrame.verifyPageTitle(FSMPageTitles.PAYABLES_INVOICES);

                await this.page.close();

                await this.switchToWindow(`${customGrpDesc} ${FSMWindows.CUSTOM_GROUP_PAYABLES_ADMINISTRATOR}`);

                await FSMCommonWithoutIFrame.verifyPageTitle(`${customGrpDesc} ${FSMPageTitles.CUSTOM_GROUP}`);
            }

            await this.page.close();

            await this.switchToWindow(FSMWindows.FSM);
        }

        await FSMCommon.toHandleButtons(Constants.DONE_EDITING);

        await FSMCommon.toolbarIcons(await FSMCommon.getDialogBoxTableID(FSMTableTitles.CUSTOM_GROUPS), FSMActionsMenu.REFRESH);

        await FSMCommon.enterDataInFilterField(
            await FSMCommon.getDialogBoxTableID(FSMTableTitles.CUSTOM_GROUPS), CustomGroups_Lbl.CUSTOM_GROUP_GRID, customGrp
        );

        await FSMCommon.clickRowInDialogBox(
            await FSMCommon.getDialogBoxTableID(FSMTableTitles.CUSTOM_GROUPS),
            CustomGroups_Lbl.CUSTOM_GROUP_GRID, customGrp
        );

        await FSMCommon.verifyPageTitle(FSMPageTitles.INVOICE_ASSIGNMENT_RULE);

        expect(await (await FSMCommon.getTextField(Payables_InvoiceAssignmentRules_Lbl.INVOICE_ASSIGNMENT_RULE,
            Payables_InvoiceAssignmentRules_Id.INVOICE_ASSIGNMENT_RULE)).inputValue()).toEqual(customGrp);

        await (await FSMCommon.getTextboxLookUpIcon(
            Payables_InvoiceAssignmentRules_Lbl.RESOURCE,
            Payables_InvoiceAssignmentRules_Id.RESOURCE
        )).click();

        await FSMCommon.enterDataInFilterField(await FSMCommon.getDialogBoxTableID(FSMTableTitles.RESOURCES),
            Payables_InvoiceAssignmentRules_Lbl.NAME_GRID, resourceName);

        await FSMCommon.enterDataInFilterField(await FSMCommon.getDialogBoxTableID(FSMTableTitles.RESOURCES),
            Payables_InvoiceAssignmentRules_Lbl.RESOURCE_ID_GRID, resourceId);

        await FSMCommon.clickRowInDialogBox(await FSMCommon.getDialogBoxTableID(FSMTableTitles.RESOURCES),
            Payables_InvoiceAssignmentRules_Lbl.NAME_GRID, resourceName,
            Payables_InvoiceAssignmentRules_Lbl.RESOURCE_ID_GRID, resourceId);

        expect(await (await FSMCommon.getTextField(
            Payables_InvoiceAssignmentRules_Lbl.RESOURCE, Payables_InvoiceAssignmentRules_Id.RESOURCE
        )).inputValue()).toEqual(resourceId);

        await FSMCommon.toolbarIcons(await FSMCommon.getPageID(), FSMActionsMenu.SAVE);
        await FSMCommon.validateConfirmationMessages();

        await this.screenshot("Create an invoice assignment rule");

        await FSMCommon.clickHome();

        log.info("INFO : =========>>>>> Create an invoice assignment rule successful <<<<<=========");
    }

    /*------------------------------------------------------------------------
	* Objective : 1) Create invoice
	*             2) Enter an invoice from Northern States Electric
	*             3) Enter an invoice from Farm State Insurance
	*             4) Enter an invoice from Prime Property Management
	* Workbook  : IFSM_FinancialsDifferencesToLawson_Workbook
	* Exercise  : 3.1.1, 3.1.2, 3.1.3, 3.1.4
	* -----------------------------------------------------------------------*/
    static async createInvoice(
        invoiceEntryTemplate, vendor, invoiceNumber, invoiceDate,
        isDueDate, dueDate, invoiceAmount, invoiceRoutingCategory,
        distributionAmt, costCenter, account, isPaymentTerms, paymentTerms,
        isExternalPO, externalPurchaseOrder, errorMsg, flag,
        distributionCode, recurringFreq, numOfRecurrences, amount) {

        const commonPg = new FSMCommonPage(this.page);
        const invPg = new MyInvoicesPage(this.page);

        log.info("INFO : =========>>>>> Create invoice started <<<<<=========");

        await FSMCommon.switchRoles(FSMApplicationRoles.PAYABLES_INVOICE_PROCESSOR);

        await FSMCommon.actionsMenuOption(await FSMCommon.getTableID(FSMTableTitles.SEARCH_INVOICES), FSMActionsMenu.CREATE_INVOICE);
        await FSMCommon.verifyPageTitle(FSMPageTitles.CREATE_INVOICE);

        await FSMCommon.selectHeaderTab(FSMTabs.MAIN);
        await FSMCommon.selectValueFromDropdown(await FSMCommon.getDropdown(Payables_CreateInvoice_Lbl.INVOICE_ENTRY_TEMPLATE_DRP, Payables_CreateInvoice_Id.INVOICE_ENTRY_TEMPLATE_DRP),
            invoiceEntryTemplate);

        await this.type(await FSMCommon.getTextField(Payables_CreateInvoice_Lbl.COMPANY, Payables_CreateInvoice_Id.COMPANY), FSMCommon.getCompany());
        await this.type(await FSMCommon.getTextField(Payables_CreateInvoice_Lbl.VENDOR, Payables_CreateInvoice_Id.VENDOR), vendor);

        await this.type(await FSMCommon.getTextField(Payables_CreateInvoice_Lbl.INVOICE_NUMBER, Payables_CreateInvoice_Id.INVOICE_NUMBER), invoiceNumber);
        await this.type(await FSMCommon.getTextField(Payables_CreateInvoice_Lbl.INVOICE_DATE, Payables_CreateInvoice_Id.INVOICE_DATE), invoiceDate);

        await (await FSMCommon.getTextField(Payables_CreateInvoice_Lbl.DUE_DATE, Payables_CreateInvoice_Id.DUE_DATE)).clear();

        if (isDueDate) {
            await this.type(await FSMCommon.getTextField(Payables_CreateInvoice_Lbl.DUE_DATE, Payables_CreateInvoice_Id.DUE_DATE), dueDate);
        }

        if (isPaymentTerms) {
            await this.type(await FSMCommon.getTextField(Payables_CreateInvoice_Lbl.PAYMENT_TERMS, Payables_CreateInvoice_Id.PAYMENT_TERMS), paymentTerms);
        }

        await this.type(await FSMCommon.getTextField(Payables_CreateInvoice_Lbl.INVOICE_AMOUNT, Payables_CreateInvoice_Id.INVOICE_AMOUNT), invoiceAmount);

        await (await FSMCommon.getTextField(Payables_CreateInvoice_Lbl.DISTRIBUTION_CODE, Payables_CreateInvoice_Id.DISTRIBUTION_CODE)).clear();

        await this.type(FSMCommon.getTextField(Payables_CreateInvoice_Lbl.INVOICE_ROUTING_CATEGORY, Payables_CreateInvoice_Id.INVOICE_ROUTING_CATEGORY), invoiceRoutingCategory);

        if (isExternalPO) {
            await this.type(await FSMCommon.getTextField(Payables_CreateInvoice_Lbl.EXTERNAL_PURCHASE_ORDER, Payables_CreateInvoice_Id.EXTERNAL_PURCHASE_ORDER), externalPurchaseOrder);
        }


        if (recurringFreq !== null) {
            await FSMCommon.selectHeaderTab(FSMTabs.PAYMENT);

            expect(await this.isElementPresent(await commonPg.headers(Payables_CreateInvoice_Lbl.RECURRING_INVOICE_OPTIONS)))
                .toBe(true);

            await FSMCommon.selectValueFromDropdown(await FSMCommon.getDropdown(Payables_CreateInvoice_Lbl.RECURRING_FREQUENCY_DRP, Payables_CreateInvoice_Id.RECURRING_FREQUENCY_DRP),
                recurringFreq);

            await this.type(await FSMCommon.getTextField(Payables_CreateInvoice_Lbl.NUMBER_OF_RECURRENCES, Payables_CreateInvoice_Id.NUMBER_OF_RECURRENCES), numOfRecurrences);
        }

        if (flag === 0) {

            await FSMCommon.toolbarIcons(await FSMCommon.getPageID(), FSMActionsMenu.SAVE);
            await (await commonPg.errorsExistMsg()).waitFor();

            await FSMCommon.selectHeaderTab(FSMTabs.WARNING_AND_ERRORS);

            expect(await FSMCommon.isRequiredRowPresent(await FSMCommon.getTableID(FSMTableTitles.WARNINGS_AND_ERRORS),
                Payables_CreateInvoice_Lbl.ERROR_MESSAGE_GRID,
                errorMsg)).toBe(true);

            await FSMCommon.selectHeaderTab(FSMTabs.DISTRIBUTIONS);

            if (amount !== null) {
                for (let i = 0; i < amount.length; i++) {

                    await FSMCommon.actionsMenuOption(await FSMCommon.getTableID(FSMTableTitles.DISTRIBUTIONS), FSMActionsMenu.CREATE_ON_LIST);

                    await FSMCommon.verifyDlgTitle(FSMDialogBoxTitles.FINANCE_STRUCTURE);

                    await (await invPg.input(Payables_CreateInvoice_Lbl.TO_BUSINESS_ENTITY.toLowerCase(), Payables_CreateInvoice_Id.TO_BUSINESS_ENTITY)).fill(config.USER_NAME.substring(0, 4));
                    await (await invPg.input(Payables_CreateInvoice_Lbl.COST_CENTER.toLowerCase(), Payables_CreateInvoice_Id.COST_CENTER)).fill(costCenter[i]);
                    await (await invPg.input(Payables_CreateInvoice_Lbl.ACCOUNT.toLowerCase(), Payables_CreateInvoice_Id.ACCOUNT)).fill(account[i]);

                    await FSMCommon.toHandleButtons(Constants.OK);

                    await FSMCommon.enterDataInGridCell(await FSMCommon.getTableID(FSMTableTitles.DISTRIBUTIONS),
                        Payables_CreateInvoice_Lbl.AMOUNT_DISTRIBUTIONS_GRID,
                        1, amount[i]);

                    if (i === amount.length - 1) {
                        await FSMCommon.actionsMenuOption(await FSMCommon.getTableID(FSMTableTitles.DISTRIBUTIONS), FSMActionsMenu.SAVE);
                    } else {
                        await FSMCommon.actionsMenuOption(await FSMCommon.getTableID(FSMTableTitles.DISTRIBUTIONS), FSMActionsMenu.SAVE_AND_NEW);
                    }

                    await FSMCommon.validateConfirmationMessages();
                }
            }
            else {
                await FSMCommon.actionsMenuOption(await FSMCommon.getTableID(FSMTableTitles.DISTRIBUTIONS), FSMActionsMenu.CREATE);
                await FSMCommon.verifyPageTitle(FSMPageTitles.CREATE_INVOICE_DISTRIBUTION);

                for (let i = 0; i < distributionAmt.length; i++) {

                    expect(await this.isElementPresent(await commonPg.headers(Payables_CreateInvoice_Lbl.LEDGER_SECTION)))
                        .toBe(true);

                    await this.type(await FSMCommon.getTextField(Payables_CreateInvoice_Lbl.DISTRIBUTION_AMOUNT, Payables_CreateInvoice_Id.DISTRIBUTION_AMOUNT), distributionAmt[i]);

                    await (await commonPg.toBusinessEntity(Payables_CreateInvoice_Id.FINANCE_STRUCTURE)).click();
                    await (await commonPg.txtToBusinessEntity(Payables_CreateInvoice_Id.FINANCE_STRUCTURE)).fill(config.USER_NAME.substring(config.USER_NAME.length - 4));

                    await (await commonPg.costCenter(Payables_CreateInvoice_Id.FINANCE_STRUCTURE)).click();
                    await (await commonPg.txtCostCenter(Payables_CreateInvoice_Id.FINANCE_STRUCTURE)).fill(costCenter[i]);

                    await (await commonPg.account(Payables_CreateInvoice_Id.FINANCE_STRUCTURE)).click();
                    await (await commonPg.txtAccount(Payables_CreateInvoice_Id.FINANCE_STRUCTURE)).fill(account[i]);

                    if (i === distributionAmt.length - 1) {
                        await FSMCommon.toolbarIcons(await FSMCommon.getPageID(), FSMActionsMenu.SAVE);
                    } else {
                        await FSMCommon.toolbarIcons(await FSMCommon.getPageID(), FSMActionsMenu.SAVE_AND_NEW);
                    }

                    await FSMCommon.validateConfirmationMessages();
                }
            }
        }

        else {
            await FSMCommon.toolbarIcons(await FSMCommon.getPageID(), FSMActionsMenu.SAVE);
            await FSMCommon.validateConfirmationMessages();
        }

        await this.page.goBack();

        await this.screenshot("Create invoice");
        await FSMCommon.clickHome();

        log.info(`INFO : =========>>>>> Created invoice ${invoiceNumber} successfully <<<<<=========`);
    }

    	
	/*--------------------------------------------------------------------------
	 * Objective : Reassign an invoice to another Payables Invoice Processor
	 * Workbook  : IFSM_FinancialsDifferencesToLawson_Workbook 
	 * Exercise  : 3.3
	 * --------------------------------------------------------------------------*/
    static async reassignInvoiceToAnotherPayablesInvoiceProcessor(invoiceNumber, vendorName, invAmount, flag, empId) {

        const processInvPg = new MyInvoicesPage(this.page);
        const commonPg = new FSMCommonPage(this.page);

        log.info("INFO : =========>>>>> Reassign an invoice to another Payables Invoice Processor started <<<<<=========");

            // Switch role to Payables Invoice Processor
        await FSMCommon.switchRoles(FSMApplicationRoles.PAYABLES_INVOICE_PROCESSOR);

        await FSMCommon.verifyPageTitle(FSMPageTitles.PROCESS_INVOICES);

            // Click My Invoices
        await FSMCommon.menuNavigation(FSMMenu.PROCESS_INVOICES);

        await FSMCommon.verifyPageTitle(FSMPageTitles.PROCESS_INVOICES);

        // Click on Unsubmitted tab
        await FSMCommon.selectHeaderTab(FSMTabs.UNSUBMITTED);

        // Filter company and invoice number
        await FSMCommon.enterDataInFilterField(await FSMCommon.getTableID(FSMTableTitles.UNSUBMITTED_INVOICES),
            Payables_MyInvoices_Lbl.COMPANY_UNSUBMITTED_GRID,
             config.USER_NAME.substring(config.USER_NAME.length - 4));

        await FSMCommon.enterDataInFilterField(await FSMCommon.getTableID(FSMTableTitles.UNSUBMITTED_INVOICES),
            Payables_MyInvoices_Lbl.INVOICE_NUMBER_UNSUBMITTED_GRID,
            invoiceNumber);

        const rowNo = await FSMCommon.selectRequiredGridRow(await FSMCommon.getTableID(FSMTableTitles.UNSUBMITTED_INVOICES),
            Payables_MyInvoices_Lbl.COMPANY_UNSUBMITTED_GRID,
            config.USER_NAME.substring(config.USER_NAME.length - 4),
            Payables_MyInvoices_Lbl.INVOICE_NUMBER_UNSUBMITTED_GRID,
            invoiceNumber);

        // Verify vendor name
        expect(await FSMCommon.getRequiredValueFromTheGrid(await FSMCommon.getTableID(FSMTableTitles.UNSUBMITTED_INVOICES),
                Payables_MyInvoices_Lbl.VENDOR_NAME_UNSUBMITTED_GRID,
                rowNo)
        ).toBe(vendorName);

        // Verify invoice amount
        expect(
            (await FSMCommon.getRequiredValueFromTheGrid(
                FSMCommon.getTableID(FSMTableTitles.UNSUBMITTED_INVOICES),
                Payables_MyInvoices_Lbl.INVOICE_AMOUNT_UNSUBMITTED_GRID,
                rowNo)).replace(Constants.COMMA, "")
        ).toBe(invAmount);

        if (flag === 0) {

            await FSMCommon.rightClickOnRowAndPerformAnAction(await FSMCommon.getTableID(FSMTableTitles.UNSUBMITTED_INVOICES),
                Payables_MyInvoices_Lbl.INVOICE_NUMBER_GRID,
                invoiceNumber, FSMActionsMenu.OPEN);

            await FSMCommon.verifyPageTitle(FSMPageTitles.INVOICE_FOR_VENDOR.replace("%s", invoiceNumber).replace("%s", vendorName));

            await FSMCommon.actionsMenuOption(await FSMCommon.getPageID(),
                FSMActionsMenu.REASSIGN_PROCESSOR);

        } else {

            await FSMCommon.actionsMenuOption(await FSMCommon.getTableID(FSMTableTitles.UNSUBMITTED_INVOICES),
                FSMActionsMenu.REASSIGN_PROCESSOR);
        }

        await FSMCommon.verifyDlgTitle(FSMDialogBoxTitles.REASSIGN_PROCESSOR);

        // Click Assign Specific Processor
        await (await FSMCommon.getRadioButton(
                Payables_MyInvoices_Lbl.ASSIGN_SPECIFIC_PROCESSOR_RBTN,
                Payables_MyInvoices_Id.ASSIGN_SPECIFIC_PROCESSOR_RBTN)).click({force:true});

        // Open lookup
        await (await FSMCommon.getTextboxLookUpIcon(
            Payables_MyInvoices_Lbl.NEW_PROCESSOR,
            Payables_MyInvoices_Id.NEW_PROCESSOR)).click();

        // Select new employee ID
        await (await processInvPg.getNewProcessor(
            await (await commonPg.thColumn(
                Payables_MyInvoices_Lbl.RESOURCE_ID_GRID,
                await FSMCommon.getDialogBoxTableID(FSMTableTitles.RESOURCES)
            )).getAttribute(ElementAttributes.ID),
            empId
        )).click();

        // Validate processor is updated
        expect(await (await FSMCommon.getTextField(
                Payables_MyInvoices_Lbl.NEW_PROCESSOR,
                Payables_MyInvoices_Id.NEW_PROCESSOR
            )).inputValue()).not.toBe(empId);

        // Submit
        await FSMCommon.toHandleButtons(Constants.SUBMIT);

        await FSMCommon.validateConfirmationMessages();

        if (flag === 0) {

            await this.page.goBack();

            await FSMCommon.enterDataInFilterField(await FSMCommon.getTableID(FSMTableTitles.UNSUBMITTED_INVOICES),
                Payables_MyInvoices_Lbl.COMPANY_UNSUBMITTED_GRID,
                config.USER_NAME.substring(config.USER_NAME.length-4));
        }

        // Verify reassignment (row should NO longer exist)
        expect(
            await FSMCommon.isRequiredRowPresent(await FSMCommon.getTableID(FSMTableTitles.UNSUBMITTED_INVOICES),
                Payables_MyInvoices_Lbl.COMPANY_UNSUBMITTED_GRID,
                 config.USER_NAME.substring(config.USER_NAME.length-4),
                Payables_MyInvoices_Lbl.INVOICE_NUMBER_UNSUBMITTED_GRID,
                invoiceNumber)).toBe(false);

        await this.screenshot("Reassign an invoice to another Payables Invoice Processor");

        await FSMCommon.clickHome();

        log.info("INFO : =========>>>>> Reassign an invoice to another Payables Invoice Processor successful <<<<<=========");
    }


    /*-----------------------------------------------------------
	 * Objective : Attach a document and Review the attachment
	 * Workbook  : IFSM_FinancialsDifferencesToLawson_Workbook
	 * Exercise  : 3.4.1, 3.4.2
	 * -----------------------------------------------------------*/
    static async attachDocumentToAnInvoiceAndReviewTheAttachment(processInvCxt, invoiceNumber, vendorName) {

        const commonPg = new FSMCommonPage(this.page);

        log.info("INFO : =========>>>>> Attach a document started <<<<<=========");

        // Switch role to Payables Invoice Processor
        await FSMCommon.switchRoles(FSMApplicationRoles.PAYABLES_INVOICE_PROCESSOR);
        await FSMCommon.verifyPageTitle(FSMPageTitles.PROCESS_INVOICES);
        await FSMCommon.selectHeaderTab(FSMTabs.SEARCH);

        // Click Process Invoices
        await FSMCommon.menuNavigation(FSMMenu.PROCESS_INVOICES);
        await FSMCommon.getTableID(FSMTableTitles.SEARCH_INVOICES);

        // Click Unsubmitted tab
        await FSMCommon.selectHeaderTab(FSMTabs.UNSUBMITTED);

        // Filter your invoice list
        await FSMCommon.enterDataInFilterField(await FSMCommon.getTableID(FSMTableTitles.UNSUBMITTED_INVOICES),
            Payables_MyInvoices_Lbl.COMPANY_UNSUBMITTED_GRID,
            await FSMCommon.getCompany());

        await FSMCommon.enterDataInFilterField(await FSMCommon.getTableID(FSMTableTitles.UNSUBMITTED_INVOICES),
            Payables_MyInvoices_Lbl.INVOICE_NUMBER_UNSUBMITTED_GRID,
            invoiceNumber);

        // Select row
        const rowNo = await FSMCommon.selectRequiredGridRow(await FSMCommon.getTableID(FSMTableTitles.UNSUBMITTED_INVOICES),
            Payables_MyInvoices_Lbl.COMPANY_UNSUBMITTED_GRID,
           await FSMCommon.getCompany(),
            Payables_MyInvoices_Lbl.INVOICE_NUMBER_UNSUBMITTED_GRID,
            invoiceNumber);

        // Verify vendor
        expect(
            await FSMCommon.getRequiredValueFromTheGrid(await FSMCommon.getTableID(FSMTableTitles.UNSUBMITTED_INVOICES),
                Payables_MyInvoices_Lbl.VENDOR_NAME_UNSUBMITTED_GRID,rowNo)
        ).toBe(vendorName);

        // Open invoice using right-click → Open
        await FSMCommon.rightClickOnRowAndPerformAnAction(await FSMCommon.getTableID(FSMTableTitles.UNSUBMITTED_INVOICES),
            Payables_MyInvoices_Lbl.INVOICE_NUMBER_UNSUBMITTED_GRID,
            invoiceNumber,
            FSMActionsMenu.OPEN);

        await FSMCommon.verifyPageTitle(FSMPageTitles.INVOICE_FOR_VENDOR.replace("%s", invoiceNumber).replace("%s", vendorName));

        // Documentation tab
        await FSMCommon.selectHeaderTab(FSMTabs.DOCUMENTATION);

        // Click create icon
        await FSMCommon.toolbarIcons(await FSMCommon.getTableID(FSMTableTitles.DOCUMENTS),
            FSMActionsMenu.CREATE
        );
        await FSMCommon.verifyPageTitle(FSMPageTitles.RELATED_DOCUMENT);

        await (await commonPg.attachmentFileUpload()).setInputFiles(processInvCxt.attachmentFilePath);


        // Verify file is uploaded
        expect(await (await FSMCommon.getTextField(
                Payables_MyInvoices_Lbl.FILE_RELATED_DOCUMENT,
                Payables_MyInvoices_Id.FILE_RELATED_DOCUMENT
            )).inputValue()).toBe(processInvCxt.attachmentFileName);

        // Enter description
        await this.type(await FSMCommon.getTextArea(
                Payables_MyInvoices_Lbl.DESCRIPTION_RELATED_DOCUMENT,
                Payables_MyInvoices_Id.DESCRIPTION_RELATED_DOCUMENT
            ),
            processInvCxt.attachmentDesc);

        // Save
        await FSMCommon.toolbarIcons(await FSMCommon.getPageID(),
            FSMActionsMenu.SAVE);

        await FSMCommon.validateConfirmationMessages();

        await this.screenshot("Attach a document");

        // Back
        await this.page.goBack();

        log.info("INFO : =========>>>>> Attach a document completed successfully <<<<<=========");

        log.info("INFO : =========>>>>> Review the attachment started <<<<<=========");

        await FSMCommon.verifyPageTitle(FSMPageTitles.INVOICE_FOR_VENDOR.replace('%s', invoiceNumber).replace('%s', vendorName));

        // Verify attachment exists
        expect(await FSMCommon.isRequiredRowPresent(await FSMCommon.getTableID(FSMTableTitles.DOCUMENTS),
                Payables_MyInvoices_Lbl.DESCRIPTION_DOCUMENTS_GRID,
                processInvCxt.attachmentDesc,
                Payables_MyInvoices_Lbl.ATTACHMENT_DOCUMENTS_GRID,
                processInvCxt.attachmentFileName)).toBe(true);

        // Back
        await this.page.goBack();

        await this.screenshot("Review the attachment");

        // Home
        await FSMCommon.clickHome();
        await FSMCommon.verifyPageTitle(FSMPageTitles.PROCESS_INVOICES);
        await FSMCommon.selectHeaderTab(FSMTabs.SEARCH);

        log.info("INFO : =========>>>>> Review the attachment completed successfully <<<<<=========");
    }
    /*-----------------------------------------------------------------
	 * Objective : Review invoices
	 * Workbook  : IFSM_FinancialsDifferencesToLawson_Workbook
	 * Exercise  : 4.1.1
	 * ----------------------------------------------------------------*/
    static async reviewInvoices(...invoiceNumbers) {

        log.info("INFO : =========>>>>> Review invoices started <<<<<=========");

        // Switch role to Payables Invoice Processor
        await FSMCommon.switchRoles(FSMApplicationRoles.PAYABLES_INVOICE_PROCESSOR);

        await FSMCommon.verifyPageTitle(FSMPageTitles.PROCESS_INVOICES);

        // Click My Invoices
        await FSMCommon.menuNavigation(FSMMenu.PROCESS_INVOICES);

        await FSMCommon.verifyPageTitle(FSMPageTitles.PROCESS_INVOICES);

        // Click on Unsubmitted tab
        await FSMCommon.selectHeaderTab(FSMTabs.UNSUBMITTED);

        await FSMCommon.enterDataInFilterField(
            await FSMCommon.getTableID(FSMTableTitles.UNSUBMITTED_INVOICES),
            Payables_MyInvoices_Lbl.COMPANY_UNSUBMITTED_GRID, config.USER_NAME.substring(config.USER_NAME.length-4));

        for (let i = 0; i < invoiceNumbers.length; i++) {

            // Filter your invoice list item
            await FSMCommon.enterDataInFilterField(
                await FSMCommon.getTableID(FSMTableTitles.UNSUBMITTED_INVOICES),
                Payables_MyInvoices_Lbl.INVOICE_NUMBER_UNSUBMITTED_GRID,
                invoiceNumbers[i]);

            // Verify invoice display
            const isPresent = await FSMCommon.isRequiredRowPresent(
                await FSMCommon.getTableID(FSMTableTitles.UNSUBMITTED_INVOICES),
                Payables_MyInvoices_Lbl.COMPANY_UNSUBMITTED_GRID,
                config.USER_NAME.substring(config.USER_NAME.length-4),
                Payables_MyInvoices_Lbl.INVOICE_NUMBER_UNSUBMITTED_GRID,
                invoiceNumbers[i]);

            expect(isPresent, `${invoiceNumbers[i]} invoice is not available in Unsubmitted invoices`).toBeTruthy();
        }

        await this.screenshot("Review invoices");

        log.info("INFO : =========>>>>> Review invoices completed successfully <<<<<=========");
    }

    /*--------------------------------------------------------------------------
	 * Objective : Submit an invoice for approval
	 * Workbook  : IFSM_FinancialsDifferencesToLawson_Workbook
	 * Exercise  : 4.1.2
	 * -------------------------------------------------------------------------*/
    static async submitInvoiceForApproval(approvalCode, invAmount, vendorName, flag, ...invoiceNumbers) {

        log.info("INFO : =========>>>>> Submit an invoice for approval started <<<<<=========");

        // Switch role to Payables Invoice Processor
        await FSMCommon.switchRoles(FSMApplicationRoles.PAYABLES_INVOICE_PROCESSOR);

        await FSMCommon.verifyPageTitle(FSMPageTitles.PROCESS_INVOICES);

        // Click My Invoices
        await FSMCommon.menuNavigation(FSMMenu.PROCESS_INVOICES);

        await FSMCommon.verifyPageTitle(FSMPageTitles.PROCESS_INVOICES);

        // Click Unsubmitted tab
        await FSMCommon.selectHeaderTab(FSMTabs.UNSUBMITTED);

        for (let i = 0; i < invoiceNumbers.length; i++) {

            // Filter invoice
            await FSMCommon.enterDataInFilterField(
                await FSMCommon.getTableID(FSMTableTitles.UNSUBMITTED_INVOICES),
                Payables_MyInvoices_Lbl.INVOICE_NUMBER_UNSUBMITTED_GRID, invoiceNumbers[i]);

            const rowNo = await FSMCommon.selectRequiredGridRow(
                await FSMCommon.getTableID(FSMTableTitles.UNSUBMITTED_INVOICES),
                Payables_MyInvoices_Lbl.COMPANY_UNSUBMITTED_GRID,
                await FSMCommon.getCompany(),
                Payables_MyInvoices_Lbl.INVOICE_NUMBER_UNSUBMITTED_GRID,
                invoiceNumbers[i]);

            if (invAmount !== null) {

                // Verify Invoice Amount
                const amount = await FSMCommon.getRequiredValueFromTheGrid(await FSMCommon.getTableID(FSMTableTitles.UNSUBMITTED_INVOICES),
                    Payables_MyInvoices_Lbl.INVOICE_AMOUNT_UNSUBMITTED_GRID,rowNo);

                expect(amount, `Invoice Amount is not ${invAmount}`).toBe(invAmount);

                // Right click → Open
                await FSMCommon.rightClickOnRowAndPerformAnAction(
                    await FSMCommon.getTableID(FSMTableTitles.UNSUBMITTED_INVOICES),
                    Payables_MyInvoices_Lbl.INVOICE_NUMBER_UNSUBMITTED_GRID,
                    invoiceNumbers[i], FSMActionsMenu.OPEN);

                await FSMCommon.verifyPageTitle(FSMPageTitles.INVOICE_FOR_VENDOR.replace('%s', invoiceNumbers[i]).replace('%s', vendorName));

                // Click Submit for approval
                await FSMCommon.actionsMenuOption(await FSMCommon.getPageID(), FSMActionsMenu.SUBMIT_FOR_APPROVAL);

            } else {

                // Submit for approval directly
                await FSMCommon.actionsMenuOption(await FSMCommon.getTableID(FSMTableTitles.UNSUBMITTED_INVOICES),
                    FSMActionsMenu.SUBMIT_FOR_APPROVAL);
            }

            // Dialog validation
            await FSMCommon.verifyDlgTitle(FSMDialogBoxTitles.SUBMIT_INVOICE_FOR_APPROVAL);

            await (await FSMCommon.getRadioButton(
                    Payables_MyInvoices_Lbl.APPROVAL_CODE_RBTN,
                    Payables_MyInvoices_Id.APPROVAL_CODE_RBTN)).click({force:true});

            // Approval code lookup
            await (await FSMCommon.getTextboxLookUpIcon(
                Payables_MyInvoices_Lbl.APPROVAL_CODE,
                Payables_MyInvoices_Id.APPROVAL_CODE)).click();


            await FSMCommon.clickRowInDialogBox(
                await FSMCommon.getDialogBoxTableID(FSMTableTitles.INVOICE_APPROVAL_CODES),
                Payables_MyInvoices_Lbl.CODE_GRID,
                approvalCode);

            // Validate approval code
            const approvalValue = await (await FSMCommon.getTextField(
                Payables_MyInvoices_Lbl.APPROVAL_CODE,
                Payables_MyInvoices_Id.APPROVAL_CODE
            )).inputValue();

            expect(approvalValue, `Approval Code is not ${approvalCode}`).toBe(approvalCode);

            // Click Submit
            await FSMCommon.toHandleButtons(Constants.SUBMIT);
            await FSMCommon.validateConfirmationMessages();

            if (invAmount !== null) {
                await this.page.goBack();

                await FSMCommon.selectHeaderTab(FSMTabs.UNSUBMITTED);
            }

            const present = await FSMCommon.isRequiredRowPresent(
                await FSMCommon.getTableID(FSMTableTitles.UNSUBMITTED_INVOICES),
                Payables_MyInvoices_Lbl.COMPANY_UNSUBMITTED_GRID,
                config.USER_NAME.substring(config.USER_NAME.length-4),
                Payables_MyInvoices_Lbl.INVOICE_NUMBER_UNSUBMITTED_GRID,
                invoiceNumbers[i]);

            expect(present, `${invoiceNumbers[i]} invoice is available in Unsubmitted invoices`).toBeFalsy();
        }

        await this.screenshot("Submit an invoice for approval");

        await FSMCommon.clickHome();

        log.info("INFO : =========>>>>> Submit an invoice for approval completed successfully <<<<<=========");
    }

    /*----------------------------------------------------------------------------
	 * Objective : 1) Auto approve an invoice
	 * Workbook  : IFSM_FinancialsDifferencesToLawson_Workbook
	 * Exercise  : 4.1.3
     * ---------------------------------------------------------------------------*/
    static async autoApproveAnInvoice(invoiceNumber, vendorName, invAmount, comment, flag) {

        log.info("INFO : =========>>>>> Auto approve an invoice started <<<<<=========");


        // Switch role to Payables Invoice Processor
        await FSMCommon.switchRoles(FSMApplicationRoles.PAYABLES_INVOICE_PROCESSOR);

        await FSMCommon.verifyPageTitle(FSMPageTitles.PROCESS_INVOICES);

        // Click My Invoices
        await FSMCommon.menuNavigation(FSMMenu.PROCESS_INVOICES);

        await FSMCommon.verifyPageTitle(FSMPageTitles.PROCESS_INVOICES);

        // Click Unsubmitted tab
        await FSMCommon.selectHeaderTab(FSMTabs.UNSUBMITTED);

        // Apply filters
        await FSMCommon.enterDataInFilterField(
            await FSMCommon.getTableID(FSMTableTitles.UNSUBMITTED_INVOICES),
            Payables_MyInvoices_Lbl.COMPANY_UNSUBMITTED_GRID, config.USER_NAME.substring(config.USER_NAME.length-4));

        await FSMCommon.enterDataInFilterField(
            await FSMCommon.getTableID(FSMTableTitles.UNSUBMITTED_INVOICES),
            Payables_MyInvoices_Lbl.INVOICE_NUMBER_UNSUBMITTED_GRID,
            invoiceNumber);

        if (comment === null) {

            const rowNo = await FSMCommon.selectRequiredGridRow(
                await FSMCommon.getTableID(FSMTableTitles.UNSUBMITTED_INVOICES),
                Payables_MyInvoices_Lbl.COMPANY_UNSUBMITTED_GRID,
                config.USER_NAME.substring(config.USER_NAME.length-4),
                Payables_MyInvoices_Lbl.INVOICE_NUMBER_UNSUBMITTED_GRID,
                invoiceNumber);

            // Validate Vendor Name
            const vendor = await FSMCommon.getRequiredValueFromTheGrid(
                await FSMCommon.getTableID(FSMTableTitles.UNSUBMITTED_INVOICES),
                Payables_MyInvoices_Lbl.VENDOR_NAME_UNSUBMITTED_GRID, rowNo);

            expect(vendor, `Vendor name is not ${vendorName}`).toBe(vendorName);

            // Validate Invoice Amount
            const amount = (await FSMCommon.getRequiredValueFromTheGrid(
                await FSMCommon.getTableID(FSMTableTitles.UNSUBMITTED_INVOICES),
                Payables_MyInvoices_Lbl.INVOICE_AMOUNT_UNSUBMITTED_GRID,
                rowNo
            )).replace(Constants.COMMA, "");

            expect(amount, `Invoice amount is not ${invAmount}`).toBe(invAmount);

            // Submit for Approval
            await FSMCommon.actionsMenuOption(
                await FSMCommon.getTableID(FSMTableTitles.UNSUBMITTED_INVOICES),
                FSMActionsMenu.SUBMIT_FOR_APPROVAL
            );

            await FSMCommon.verifyDlgTitle(FSMDialogBoxTitles.SUBMIT_INVOICE_FOR_APPROVAL);

            // Cancel dialog
            await FSMCommon.toHandleButtons(Constants.CANCEL);
        }

        // ======= Select invoice row again =======
        const rowNo = await FSMCommon.selectRequiredGridRow(
            await FSMCommon.getTableID(FSMTableTitles.UNSUBMITTED_INVOICES),
            Payables_MyInvoices_Lbl.COMPANY_UNSUBMITTED_GRID,
            config.USER_NAME.substring(config.USER_NAME.length-4),
            Payables_MyInvoices_Lbl.INVOICE_NUMBER_UNSUBMITTED_GRID,
            invoiceNumber);

        // Validate vendor
        const vendorVerify = await FSMCommon.getRequiredValueFromTheGrid(
            await FSMCommon.getTableID(FSMTableTitles.UNSUBMITTED_INVOICES),
            Payables_MyInvoices_Lbl.VENDOR_NAME_UNSUBMITTED_GRID,
            rowNo);
        expect(vendorVerify, `Vendor name is not ${vendorName}`).toBe(vendorName);

        // Validate amount
        const amountVerify = (await FSMCommon.getRequiredValueFromTheGrid(
            await FSMCommon.getTableID(FSMTableTitles.UNSUBMITTED_INVOICES),
            Payables_MyInvoices_Lbl.INVOICE_AMOUNT_UNSUBMITTED_GRID,
            rowNo
        )).replace(Constants.COMMA, "");

        expect(amountVerify, `Invoice amount is not ${invAmount}`).toBe(invAmount);


        // ======= Approve Invoice =======
        if (comment === null) {

            await FSMCommon.actionsMenuOption(
                await FSMCommon.getTableID(FSMTableTitles.UNSUBMITTED_INVOICES),
                FSMActionsMenu.APPROVE_INVOICE);

        } else {

            // Open Invoice
            await FSMCommon.rightClickOnRowAndPerformAnAction(
                await FSMCommon.getTableID(FSMTableTitles.UNSUBMITTED_INVOICES),
                Payables_MyInvoices_Lbl.INVOICE_NUMBER_UNSUBMITTED_GRID,
                invoiceNumber,
                FSMActionsMenu.OPEN
            );

            await FSMCommon.verifyPageTitle(FSMPageTitles.INVOICE_FOR_VENDOR.replace('%s', invoiceNumber).replace('%s', vendorName));

            // Approve Invoice
            await FSMCommon.actionsMenuOption(await FSMCommon.getPageID(), FSMActionsMenu.APPROVE_INVOICE);
        }

        await FSMCommon.verifyDlgTitle(FSMDialogBoxTitles.APPROVE_INVOICE);

        if (comment !== null) {
            await this.type(
                await FSMCommon.getTextArea(Payables_MyInvoices_Lbl.COMMENT, Payables_MyInvoices_Id.COMMENT),
                comment);
        }

        // Submit
        await FSMCommon.toHandleButtons(Constants.SUBMIT);
        await FSMCommon.validateConfirmationMessages();

        // Final validations
        if (comment !== null) {

            await this.page.goBack();

            await FSMCommon.selectHeaderTab(FSMTabs.UNSUBMITTED);

            await this.screenshot("Auto Approve the utility bill from Northern States Electric");

        } else {

            const present = await FSMCommon.isRequiredRowPresent(
                await FSMCommon.getTableID(FSMTableTitles.UNSUBMITTED_INVOICES),
                Payables_MyInvoices_Lbl.COMPANY_UNSUBMITTED_GRID,
                config.USER_NAME.substring(config.USER_NAME.length-4),
                Payables_MyInvoices_Lbl.INVOICE_NUMBER_UNSUBMITTED_GRID,
                invoiceNumber);

            expect(present, `${invoiceNumber} invoice is available in Unsubmitted invoices`).toBeFalsy();

            await this.screenshot("Auto approve an invoice");
        }

        await FSMCommon.clickHome();

        if (comment === null) {
            await FSMCommon.verifyPageTitle(FSMPageTitles.PROCESS_INVOICES);
            await FSMCommon.selectHeaderTab(FSMTabs.SEARCH);
        }

        log.info("INFO : =========>>>>> Auto approve an invoice completed successfully <<<<<=========");
    }
    /*-----------------------------------------------------------------
	 * Objective : Send an email message to the current approver
	 * Workbook  : IFSM_FinancialsDifferencesToLawson_Workbook
	 * Exercise  : 4.2
	 * ----------------------------------------------------------------*/
    static async sendAnEmailMessageToTheCurrentApprover(invoiceNumber, emailComment, vendorName, invAmount) {

        console.log("INFO : =========>>>>> Send an email message to the current approver started <<<<<=========");

        const processInvPg = new MyInvoicesPage(this.page);
        const commonPg = new FSMCommonPage(this.page);

        // Switch role
        await FSMCommon.switchRoles(FSMApplicationRoles.PAYABLES_INVOICE_PROCESSOR);
        await FSMCommon.verifyPageTitle(FSMPageTitles.PROCESS_INVOICES);
        await FSMCommon.selectHeaderTab(FSMTabs.SEARCH);

        // Navigate to process invoices
        await FSMCommon.menuNavigation(FSMMenu.PROCESS_INVOICES);
        await FSMCommon.verifyPageTitle(FSMPageTitles.PROCESS_INVOICES);
        await FSMCommon.selectHeaderTab(FSMTabs.SEARCH);

        // Open Pending Approval tab
        await FSMCommon.selectHeaderTab(FSMTabs.PENDING_APPROVAL);

        // Filter by company + invoice number
        await FSMCommon.enterDataInFilterField(await FSMCommon.getTableID(FSMTableTitles.INVOICES_PENDING_APPROVAL),
            Payables_MyInvoices_Lbl.COMPANY_PENDING_APPROVAL_GRID,
            config.USER_NAME.substring(config.USER_NAME.length - 4));

        await FSMCommon.enterDataInFilterField(await FSMCommon.getTableID(FSMTableTitles.INVOICES_PENDING_APPROVAL),
            Payables_MyInvoices_Lbl.INVOICE_NUMBER_PENDING_APPROVAL_GRID, invoiceNumber);

        // Select required row
        const rowNo = await FSMCommon.selectRequiredGridRow(await FSMCommon.getTableID(FSMTableTitles.INVOICES_PENDING_APPROVAL),
            Payables_MyInvoices_Lbl.COMPANY_PENDING_APPROVAL_GRID,
            await FSMCommon.getCompany(),
            Payables_MyInvoices_Lbl.INVOICE_NUMBER_PENDING_APPROVAL_GRID,
            invoiceNumber);

        // Validate Vendor Name
        const vendor = await FSMCommon.getRequiredValueFromTheGrid(
            FSMCommon.getTableID(FSMTableTitles.INVOICES_PENDING_APPROVAL),
            Payables_MyInvoices_Lbl.VENDOR_NAME_PENDING_APPROVAL_GRID,
            rowNo);

        expect(vendor).toBe(vendorName);

        // Validate Invoice Amount
        const amount = await FSMCommon.getRequiredValueFromTheGrid(
            FSMCommon.getTableID(FSMTableTitles.INVOICES_PENDING_APPROVAL),
            Payables_MyInvoices_Lbl.INVOICE_AMOUNT_PENDING_APPROVAL_GRID,
            rowNo);

        expect(amount).toContain(invAmount);

        // Open "Email Current Approver"
        await FSMCommon.actionsMenuOption(await FSMCommon.getTableID(FSMTableTitles.INVOICES_PENDING_APPROVAL),
            FSMActionsMenu.EMAIL_CURRENT_APPROVERS);

        await FSMCommon.verifyDlgTitle(FSMDialogBoxTitles.EMAIL_CURRENT_APPROVER);

        // Validate "To" field
        const toField = await FSMCommon.getTextField(
            Payables_MyInvoices_Lbl.TO,
            Payables_MyInvoices_Id.TO
        );

        expect(await toField.inputValue()).not.toBe("");

        // Verify the subject
        const subjectField = await FSMCommon.getTextField(
            Payables_MyInvoices_Lbl.SUBJECT,
            Payables_MyInvoices_Id.SUBJECT
        );
        expect(await subjectField.inputValue()).toContain(invoiceNumber);
        expect(await subjectField.inputValue()).toContain(vendorName);

        // Type email comment
        await (await processInvPg.emailContents()).fill(emailComment);

        // Submit email
        await commonPg.popupButtons(Constants.SUBMIT);
        await FSMCommon.validateConfirmationMessages();

        await FSMCommon.getTableID(FSMTableTitles.INVOICES_PENDING_APPROVAL);

        await this.screenshot("Send an email message to the current approver");

        // Go home
        await FSMCommon.clickHome();
        await FSMCommon.verifyPageTitle(FSMPageTitles.PROCESS_INVOICES);
        await FSMCommon.selectHeaderTab(FSMTabs.SEARCH);

        log.info("INFO : =========>>>>> Send an email message to the current approver completed successfully <<<<<=========");
    }
    /*-----------------------------------------------------------------
     * Objective : Approve an invoice
     * Workbook  : IFSM_FinancialsDifferencesToLawson_Workbook
     * Exercise  : 5.1
     * ----------------------------------------------------------------*/
    static async approveAnInvoice(invoiceNumber) {

        log.info("INFO : =========>>>>> Approve an invoice started <<<<<=========");

        await FSMCommon.switchRoles(FSMApplicationRoles.PAYABLES_INVOICE_PROCESSOR);
        await FSMCommon.verifyPageTitle(FSMPageTitles.PROCESS_INVOICES);

        // User account → My Inbasket
        await FSMCommon.clickBtnInUserAccount(FSMMenu.INBASKET);
        await FSMCommon.verifyPageTitle(FSMPageTitles.INBASKET);

        // Select task row
        await FSMCommon.clickRowInDialogBox(await FSMCommon.getPageID(),
            Inbasket_Lbl.TASK_GRID,
            FSMCommon.getAssignedEmployeeName()
        );

        // Filter work items grid for the invoice
        await FSMCommon.enterDataInFilterField(await FSMCommon.getDialogBoxTableID(FSMTableTitles.WORK_ITEMS),
            Inbasket_Lbl.WORK_DESCRIPTION_GRID,
            invoiceNumber);

        // Right click → Open
        await FSMCommon.rightClickOnRowAndPerformAnAction(await FSMCommon.getDialogBoxTableID(FSMTableTitles.WORK_ITEMS),
            Inbasket_Lbl.WORK_DESCRIPTION_GRID,
            invoiceNumber,
            FSMActionsMenu.OPEN);

        await FSMCommon.verifyPageTitle(FSMPageTitles.INVOICE_APPROVAL);

        // Open Distributions tab
        await FSMCommon.selectHeaderTab(FSMTabs.DISTRIBUTIONS);

        // Approve
        await FSMCommon.actionsMenuOption(await FSMCommon.getPageID(),
            FSMActionsMenu.APPROVE);

        await FSMCommon.validateConfirmationMessages();

        await FSMCommon.verifyPageTitle(FSMPageTitles.INBASKET);

        await this.screenshot("Approve an invoice");

        // Navigate Home
        await FSMCommon.clickHome();
        await FSMCommon.verifyPageTitle(FSMPageTitles.PROCESS_INVOICES);
        await FSMCommon.selectHeaderTab(FSMTabs.SEARCH);

        log.info("INFO : =========>>>>> Approve an invoice successful <<<<<=========");
    }

    /*-----------------------------------------------------------------
	 * Objective : Reassign an approval level
	 * Workbook  : IFSM_FinancialsDifferencesToLawson_Workbook
	 * Exercise  : 5.3
	 * ----------------------------------------------------------------*/
    static async reassignAnApprovalLevel(invoiceNumber, approver) {

        // Initialising page objects
        const commonPg = new FSMCommonPage(this.page);

        log.info("INFO : =========>>>>> Reassign an approval level started <<<<<=========");


        await FSMCommon.switchRoles(FSMApplicationRoles.PAYABLES_MANAGER);

        // Click Manage Invoices
        await FSMCommon.menuNavigation(FSMMenu.MANAGE_INVOICES);
        await FSMCommon.verifyPageTitle(FSMMenu.MANAGE_INVOICES);


        // Click Pending Approval tab
        await FSMCommon.selectHeaderTab(FSMTabs.PENDING_APPROVAL);

        // Filter your record
        await FSMCommon.enterDataInFilterField(
            await FSMCommon.getTableID(FSMTableTitles.INVOICES_PENDING_APPROVAL),
            Payables_Invoices_Lbl.COMPANY_PENDING_APPROVAL_GRID,
            config.USER_NAME.substring(config.USER_NAME.length-4));

        await FSMCommon.enterDataInFilterField(
            await FSMCommon.getTableID(FSMTableTitles.INVOICES_PENDING_APPROVAL),
            Payables_Invoices_Lbl.INVOICE_NUMBER_PENDING_APPROVAL_GRID,
            invoiceNumber
        );

        // Select invoice row
        await FSMCommon.selectRequiredGridRow(
            await FSMCommon.getTableID(FSMTableTitles.INVOICES_PENDING_APPROVAL),
            Payables_Invoices_Lbl.COMPANY_PENDING_APPROVAL_GRID,
            await FSMCommon.getCompany(),
            Payables_Invoices_Lbl.INVOICE_NUMBER_PENDING_APPROVAL_GRID,
            invoiceNumber
        );

        // Click Reassign Approver
        await FSMCommon.actionsMenuOption(
            await FSMCommon.getTableID(FSMTableTitles.INVOICES_PENDING_APPROVAL),
            FSMActionsMenu.REASSIGN_APPROVER );

        await FSMCommon.verifyDlgTitle(FSMDialogBoxTitles.REASSIGN_APPROVER);

        // Click lookup icon
        await (
            await FSMCommon.getTextboxLookUpIcon(
                Payables_Invoices_Lbl.REASSIGN_TO_APPROVAL_LEVEL,
                Payables_Invoices_Id.REASSIGN_TO_APPROVAL_LEVEL)).click();

        // Filter & select approver
        await FSMCommon.enterDataInFilterField(
            await FSMCommon.getDialogBoxTableID(FSMTableTitles.INVOICE_APPROVAL_LEVELS),
            Payables_Invoices_Lbl.NAME_REASSIGN_APPROVER_GRID,
            approver);

        await FSMCommon.clickRowInDialogBox(
            await FSMCommon.getDialogBoxTableID(FSMTableTitles.INVOICE_APPROVAL_LEVELS),
            Payables_Invoices_Lbl.NAME_REASSIGN_APPROVER_GRID,
            approver);

        // Verify approver selected
        expect(await (await FSMCommon.getTextField(
                    Payables_Invoices_Lbl.REASSIGN_TO_APPROVAL_LEVEL,
                    Payables_Invoices_Id.REASSIGN_TO_APPROVAL_LEVEL)
            ).inputValue(), `Approver ${approver} is not selected`).not.toBe('');

        await FSMCommon.verifyDlgTitle(FSMDialogBoxTitles.REASSIGN_APPROVER);

        // Submit
        await (await commonPg.popupButtons(Constants.SUBMIT)).click();

        await FSMCommon.validateConfirmationMessages();

        await FSMCommon.getTableID(FSMTableTitles.INVOICES_PENDING_APPROVAL);

        // Refresh
        await FSMCommon.toolbarIcons(
            await FSMCommon.getPageID(),
            FSMActionsMenu.REFRESH
        );


        await this.screenshot("Reassign an approval level");

        // Home
        await FSMCommon.clickHome();

        log.info("INFO : =========>>>>> Reassign an approval level successful <<<<<=========");
    }
    /*-----------------------------------------------------------------
	 * Objective : 1) Manually approve an invoice
	 * Workbook  : IFSM_FinancialsDifferencesToLawson_Workbook
	 * Exercise  : 5.4
	 * ----------------------------------------------------------------*/
    static async manuallyApproveAnInvoice(invoiceNumber, vendorName) {

        log.info("INFO : =========>>>>> Manually approve an invoice started <<<<<=========");

        // Switch role to Payables Manager
        await FSMCommon.switchRoles(FSMApplicationRoles.PAYABLES_MANAGER);

        await FSMCommon.verifyPageTitle(FSMPageTitles.MANAGE_PAYABLES);

        await FSMCommon.menuNavigation(FSMMenu.MANAGE_INVOICES);

        await FSMCommon.verifyPageTitle(FSMPageTitles.MANAGE_INVOICES);


        // Click Pending Approval tab
        await FSMCommon.selectHeaderTab(FSMTabs.PENDING_APPROVAL);

        // Filter your record
        await FSMCommon.enterDataInFilterField(
            await FSMCommon.getTableID(FSMTableTitles.INVOICES_PENDING_APPROVAL),
            Payables_Invoices_Lbl.COMPANY_PENDING_APPROVAL_GRID,
            config.USER_NAME.substring(config.USER_NAME.length - 4));
        await FSMCommon.enterDataInFilterField(
            await FSMCommon.getTableID(FSMTableTitles.INVOICES_PENDING_APPROVAL),
            Payables_Invoices_Lbl.INVOICE_NUMBER_PENDING_APPROVAL_GRID,
            invoiceNumber);

        // Select invoice row
        const rowNo = await FSMCommon.selectRequiredGridRow(
            await FSMCommon.getTableID(FSMTableTitles.INVOICES_PENDING_APPROVAL),
            Payables_Invoices_Lbl.COMPANY_PENDING_APPROVAL_GRID,
            config.USER_NAME.substring(config.USER_NAME.length - 4),
            Payables_Invoices_Lbl.INVOICE_NUMBER_PENDING_APPROVAL_GRID,
            invoiceNumber);

        // Verify vendor name
        expect(await FSMCommon.getRequiredValueFromTheGrid(
            await FSMCommon.getTableID(FSMTableTitles.INVOICES_PENDING_APPROVAL),
            Payables_Invoices_Lbl.VENDOR_NAME_PENDING_APPROVAL_GRID,
            rowNo), `Vendor name for your invoice is not ${vendorName}`).toBe(vendorName);

        // Click Manual Approve
        await FSMCommon.actionsMenuOption(
            await FSMCommon.getTableID(FSMTableTitles.INVOICES_PENDING_APPROVAL),
            FSMActionsMenu.MANUAL_APPROVE);


        await FSMCommon.validateConfirmationMessages();

        // Refresh grid
        await FSMCommon.toolbarIcons(await FSMCommon.getPageID(), FSMActionsMenu.REFRESH)

        // Verify invoice removed from Pending Approval
        expect(
            await FSMCommon.isRequiredRowPresent(
                await FSMCommon.getTableID(FSMTableTitles.INVOICES_PENDING_APPROVAL),
                Payables_Invoices_Lbl.COMPANY_PENDING_APPROVAL_GRID,
                config.USER_NAME.substring(config.USER_NAME.length - 4),
                Payables_Invoices_Lbl.INVOICE_NUMBER_PENDING_APPROVAL_GRID,
                invoiceNumber
            ), `Your invoice ${invoiceNumber} is not removed from Pending approval tab`)
            .toBeFalsy();

        // Verify invoice moved to Released tab
        await FSMCommon.selectHeaderTab(FSMTabs.RELEASED);
        await FSMCommon.enterDataInFilterField(
            await FSMCommon.getTableID(FSMTableTitles.RELEASED_INVOICES),
            Payables_Invoices_Lbl.COMPANY_RELEASED_GRID,
            config.USER_NAME.substring(config.USER_NAME.length - 4));

        await FSMCommon.enterDataInFilterField(
            await FSMCommon.getTableID(FSMTableTitles.RELEASED_INVOICES),
            Payables_Invoices_Lbl.INVOICE_NUMBER_RELEASED_GRID,
            invoiceNumber);

        expect(
            await FSMCommon.isRequiredRowPresent(
                await FSMCommon.getTableID(FSMTableTitles.RELEASED_INVOICES),
                Payables_Invoices_Lbl.COMPANY_RELEASED_GRID,
                config.USER_NAME.substring(config.USER_NAME.length - 4),
                Payables_Invoices_Lbl.INVOICE_NUMBER_RELEASED_GRID,
                invoiceNumber), `Your invoice ${invoiceNumber} is not moved to Released tab`).toBeTruthy();

        await this.screenshot("Manually approve an invoice");


        // Click Home
        await FSMCommon.clickHome();

        await FSMCommon.verifyPageTitle(FSMPageTitles.MANAGE_PAYABLES);

        log.info("INFO : =========>>>>> Manually approve an invoice successful <<<<<=========");
    }

    /*-----------------------------------------------------------------
     * Objective : Email Invoice
     * Workbook  : IFSM_FinancialsDifferencesToLawson_Workbook
     * Exercise  : 5.6
     * ----------------------------------------------------------------*/
    static async emailInvoice(invoiceNumber, toEmail, vendorName) {

        log.info("INFO : =========>>>>> Email Invoice started <<<<<=========");

        // Switch role to Payables Invoice Processor
        await FSMCommon.switchRoles(FSMApplicationRoles.PAYABLES_INVOICE_PROCESSOR);
        await FSMCommon.verifyPageTitle(FSMPageTitles.PROCESS_INVOICES);
        await FSMCommon.selectHeaderTab(FSMTabs.SEARCH);

        // Click Process Invoices
        await FSMCommon.menuNavigation(FSMMenu.PROCESS_INVOICES);

        // Click Released tab
        await FSMCommon.selectHeaderTab(FSMTabs.RELEASED);

        const company =
            config.USER_NAME.substring(config.USER_NAME.length - 4);

        // Filter your record
        await FSMCommon.enterDataInFilterField(
            await FSMCommon.getTableID(FSMTableTitles.RELEASED_INVOICES),
            Payables_MyInvoices_Lbl.COMPANY_RELEASED_GRID,
            company
        );
        await FSMCommon.enterDataInFilterField(
            await FSMCommon.getTableID(FSMTableTitles.RELEASED_INVOICES),
            Payables_MyInvoices_Lbl.INVOICE_NUMBER_RELEASED_GRID,
            invoiceNumber);

        // Select invoice row
        const rowNo = await FSMCommon.selectRequiredGridRow(
            await FSMCommon.getTableID(FSMTableTitles.RELEASED_INVOICES),
            Payables_MyInvoices_Lbl.COMPANY_RELEASED_GRID,
            company,
            Payables_MyInvoices_Lbl.INVOICE_NUMBER_RELEASED_GRID,
            invoiceNumber);

        // Verify vendor name
        expect(
            await FSMCommon.getRequiredValueFromTheGrid(
                await FSMCommon.getTableID(FSMTableTitles.RELEASED_INVOICES),
                Payables_MyInvoices_Lbl.VENDOR_NAME_RELEASED_GRID,
                rowNo), `Vendor name is not ${vendorName}`).toBe(vendorName);

        // Click Email Invoice
        await FSMCommon.actionsMenuOption(
            await FSMCommon.getTableID(FSMTableTitles.RELEASED_INVOICES),
            FSMActionsMenu.EMAIL_INVOICE
        );

        await FSMCommon.verifyDlgTitle(FSMDialogBoxTitles.EMAIL_INVOICE);

        // Enter To Email
        await this.type(
            await FSMCommon.getTextField(
                Payables_MyInvoices_Lbl.TO_EMAIL,
                Payables_MyInvoices_Id.TO_EMAIL), toEmail);

        // Submit
        await FSMCommon.toHandleButtons(Constants.SUBMIT);
        await FSMCommon.validateConfirmationMessages();

        await this.screenshot("Email Invoice");

        log.info("INFO : =========>>>>> Email Invoice successful <<<<<=========");
    }
    /*-----------------------------------------------------------------
	 * Objective : Maintain released invoices
	 * Workbook  : IFSM_FinancialsDifferencesToLawson_Workbook
	 * Exercise  : 6.1
	 * ----------------------------------------------------------------*/
    static async maintainReleasedInvoices(processInvCxt) {

        const commonPg = new FSMCommonPage(this.page);

        log.info("INFO : =========>>>>> Maintain released invoices started <<<<<=========");

        // Switch role to Payables Invoice Processor
        await FSMCommon.switchRoles(FSMApplicationRoles.PAYABLES_INVOICE_PROCESSOR);

        // Navigate to Process Invoices
        await FSMCommon.menuNavigation(FSMMenu.PROCESS_INVOICES);
        await FSMCommon.verifyPageTitle(FSMPageTitles.PROCESS_INVOICES);
        await FSMCommon.selectHeaderTab(FSMTabs.SEARCH);

        // Click Released tab
        await FSMCommon.selectHeaderTab(FSMTabs.RELEASED);

        // Filter record
        await FSMCommon.enterDataInFilterField(
            await FSMCommon.getTableID(FSMTableTitles.RELEASED_INVOICES),
            Payables_MyInvoices_Lbl.COMPANY_RELEASED_GRID,
            await FSMCommon.getCompany());

        await FSMCommon.enterDataInFilterField(
            await FSMCommon.getTableID(FSMTableTitles.RELEASED_INVOICES),
            Payables_MyInvoices_Lbl.INVOICE_NUMBER_RELEASED_GRID,
            processInvCxt.invoiceNumbers[3]
        );

        const rowNo = await FSMCommon.selectRequiredGridRow(
            await FSMCommon.getTableID(FSMTableTitles.RELEASED_INVOICES),
            Payables_MyInvoices_Lbl.COMPANY_RELEASED_GRID,
            await FSMCommon.getCompany(),
            Payables_MyInvoices_Lbl.INVOICE_NUMBER_RELEASED_GRID,
            processInvCxt.invoiceNumbers[3]
        );

        // Verify vendor name
         expect(
            await FSMCommon.getRequiredValueFromTheGrid(
                await FSMCommon.getTableID(FSMTableTitles.RELEASED_INVOICES),
                Payables_MyInvoices_Lbl.VENDOR_NAME_RELEASED_GRID,
                rowNo)).toBe(processInvCxt.vendorNames[3]);

        // Verify invoice amount
        expect(
            await FSMCommon.getRequiredValueFromTheGrid(
                await FSMCommon.getTableID(FSMTableTitles.RELEASED_INVOICES),
                Payables_MyInvoices_Lbl.INVOICE_AMOUNT_RELEASED_GRID,
                rowNo)).toContain(processInvCxt.invoiceAmounts[3]);

        // Open invoice
        await FSMCommon.rightClickOnRowAndPerformAnAction(
            await FSMCommon.getTableID(FSMTableTitles.RELEASED_INVOICES),
            Payables_MyInvoices_Lbl.INVOICE_NUMBER_RELEASED_GRID,
            processInvCxt.invoiceNumbers[3],
            FSMActionsMenu.OPEN);

        await FSMCommon.verifyPageTitle(
            FSMPageTitles.INVOICE_FOR_VENDOR
                .replace("%s", processInvCxt.invoiceNumbers[3])
                .replace("%s", processInvCxt.vendorNames[3]));

        // Distributions tab
        await FSMCommon.selectHeaderTab(FSMTabs.DISTRIBUTIONS_STAR);

        await FSMCommon.selectRequiredGridRow(
            await FSMCommon.getTableID(FSMTableTitles.DISTRIBUTIONS),
            Payables_MyInvoices_Lbl.AMOUNT_DISTRIBUTIONS_GRID,
            processInvCxt.invoiceAmounts[3]
        );

        // Reverse Distribution
        await FSMCommon.actionsMenuOption(
            await FSMCommon.getTableID(FSMTableTitles.DISTRIBUTIONS),
            FSMActionsMenu.REVERSE_DISTRIBUTION_FOR_UPDATE
        );

        await FSMCommon.verifyDlgTitle(
            FSMDialogBoxTitles.REVERSE_DISTRIBUTION_FOR_UPDATE
        );

        // Verify finance structure label
        expect(
            await this.isElementPresent(await commonPg.labelsWithId(
                Payables_MyInvoices_Lbl
                    .TO_FINANCE_STRUCTURE_OPTIONAL_REVERSE_DISTRIBUTION_FOR_UPDATE,
                Payables_MyInvoices_Id.REVERSE_DISTRIBUTION_FOR_UPDATE
            ))
        ).toBeTruthy();

        // Business Entity
        await (
            await commonPg.toBusinessEntity(
                Payables_MyInvoices_Id.REVERSE_DISTRIBUTION_FOR_UPDATE)
        ).click();

        await this.type(
            await commonPg.txtToBusinessEntity(
                Payables_MyInvoices_Id.REVERSE_DISTRIBUTION_FOR_UPDATE
            ),
            await FSMCommon.getCompanyGroup());

        // Cost Center
        await (
            await commonPg.costCenter(
                Payables_MyInvoices_Id.REVERSE_DISTRIBUTION_FOR_UPDATE
            )
        ).click();

        await this.type(
            await commonPg.txtCostCenter(
                Payables_MyInvoices_Id.REVERSE_DISTRIBUTION_FOR_UPDATE
            ),
            processInvCxt.revDistrCostCenter
        );

        // Account
        await (
            await commonPg.account(
                Payables_MyInvoices_Id.REVERSE_DISTRIBUTION_FOR_UPDATE
            )
        ).click();

        await this.type(
            await commonPg.txtAccount(
                Payables_MyInvoices_Id.REVERSE_DISTRIBUTION_FOR_UPDATE
            ),
            processInvCxt.revDistrAccount
        );

        // Submit
        await FSMCommon.toHandleButtons(Constants.SUBMIT);
        await FSMCommon.validateConfirmationMessages();

        // Verify updated distribution
        expect(await FSMCommon.isRequiredRowPresent(
                await FSMCommon.getTableID(FSMTableTitles.DISTRIBUTIONS),
                Payables_MyInvoices_Lbl.AMOUNT_DISTRIBUTIONS_GRID,
                processInvCxt.invoiceAmounts[3],
                Payables_MyInvoices_Lbl.STATUS_DISTRIBUTIONS_GRID,
                Constants.STATUS_UNRELEASED
            )
        ).toBeTruthy();

        await this.screenshot("Maintain released invoices");

        // Home
        await FSMCommon.clickHome();
        await FSMCommon.verifyPageTitle(FSMPageTitles.PROCESS_INVOICES);
        await FSMCommon.selectHeaderTab(FSMTabs.SEARCH);

        log.info("INFO : =========>>>>> Maintain released invoices successful <<<<<=========");
    }
    /*-----------------------------------------------------------------
	 * Objective : Place an invoice on hold
	 * 			   Take an invoice off hold
	 * Workbook  : IFSM_FinancialsDifferencesToLawson_Workbook
	 * Exercise  : 6.2.1, 6.2.2
	 * ----------------------------------------------------------------*/
    static async placeAnInvoiceOnHoldAndTakeItOffHold(invoiceNumber, holdCode, holdCodeDescr) {

        const commonPg = new FSMCommonPage(this.page);

        log.info("INFO : =========>>>>> Place an invoice on hold started <<<<<=========");

        // Switch role
        await FSMCommon.switchRoles(
            FSMApplicationRoles.PAYABLES_INVOICE_PROCESSOR
        );

        await FSMCommon.verifyPageTitle(FSMPageTitles.PROCESS_INVOICES);
        await FSMCommon.selectHeaderTab(FSMTabs.SEARCH);

        // Navigate to Process Invoices
        await FSMCommon.menuNavigation(FSMMenu.PROCESS_INVOICES);
        await FSMCommon.getTableID(FSMTableTitles.SEARCH_INVOICES);

        // Pending Approval tab
        await FSMCommon.selectHeaderTab(FSMTabs.PENDING_APPROVAL);

        // Filter invoice
        await FSMCommon.enterDataInFilterField(
            await FSMCommon.getTableID(FSMTableTitles.INVOICES_PENDING_APPROVAL),
            Payables_MyInvoices_Lbl.COMPANY_PENDING_APPROVAL_GRID,
            await FSMCommon.getCompany());

        await FSMCommon.enterDataInFilterField(
            await FSMCommon.getTableID(FSMTableTitles.INVOICES_PENDING_APPROVAL),
            Payables_MyInvoices_Lbl.INVOICE_NUMBER_PENDING_APPROVAL_GRID,
            invoiceNumber);

        // Put Invoice On Hold
        await FSMCommon.rightClickOnRowAndPerformAnAction(
            await FSMCommon.getTableID(FSMTableTitles.INVOICES_PENDING_APPROVAL),
            Payables_MyInvoices_Lbl.INVOICE_NUMBER_PENDING_APPROVAL_GRID,
            invoiceNumber,
            FSMActionsMenu.PUT_INVOICE_ON_HOLD
        );

        await FSMCommon.verifyDlgTitle(FSMDialogBoxTitles.PUT_INVOICE_ON_HOLD);

        // Select Hold Code
        await ( await FSMCommon.getTextboxLookUpIcon(
                Payables_MyInvoices_Lbl.HOLD_CODE,
                Payables_MyInvoices_Id.HOLD_CODE)).click();

        await FSMCommon.enterDataInFilterField(
            await FSMCommon.getDialogBoxTableID(
                FSMTableTitles.INVOICE_HOLD_CODES),
            Payables_MyInvoices_Lbl.HOLD_CODE_GRID,
            holdCode);

        await FSMCommon.clickRowInDialogBox(
            await FSMCommon.getDialogBoxTableID(
                FSMTableTitles.INVOICE_HOLD_CODES),
            Payables_MyInvoices_Lbl.HOLD_CODE_GRID,
            holdCode,
            Payables_MyInvoices_Lbl.DESCRIPTION_HOLD_CODE_GRID,holdCodeDescr);

        await FSMCommon.verifyDlgTitle(
            FSMDialogBoxTitles.PUT_INVOICE_ON_HOLD);

        // Verify hold code selected
        expect(await (await FSMCommon.getTextField(
                Payables_MyInvoices_Lbl.HOLD_CODE,
                Payables_MyInvoices_Id.HOLD_CODE
            )).inputValue()).toBe(holdCode);

        // Submit
        await FSMCommon.toHandleButtons(Constants.SUBMIT);
        await FSMCommon.validateConfirmationMessages();
        await FSMCommon.getTableID(FSMTableTitles.INVOICES_PENDING_APPROVAL );

        await this.screenshot("Place an invoice on hold");

        log.info(
            "INFO : =========>>>>> Place an invoice on hold successful <<<<<========="
        );

        log.info(
            "INFO : =========>>>>> Take an invoice off hold started <<<<<========="
        );

        // On Hold tab
        await FSMCommon.selectHeaderTab(FSMTabs.ON_HOLD);

        await this.type(
            await FSMCommon.getTextField(
                Payables_MyInvoices_Lbl.COMPANY_ON_HOLD_FILTER,
                Payables_MyInvoices_Id.COMPANY_ON_HOLD_FILTER
            ),
            await FSMCommon.getCompany()
        );

        await (
            await commonPg.btnWithId(
                Constants.SEARCH, Payables_MyInvoices_Id.SEARCH_ON_HOLD_BTN)).click();

        // Select invoice & Take Off Hold
        await FSMCommon.selectRequiredGridRow(
            await FSMCommon.getTableID(FSMTableTitles.INVOICES_ON_HOLD),
            Payables_MyInvoices_Lbl.COMPANY_ON_HOLD_GRID,
            await FSMCommon.getCompany(),
            Payables_MyInvoices_Lbl.INVOICE_NUMBER_ON_HOLD_GRID,
            invoiceNumber
        );

        await FSMCommon.actionsMenuOption(
            await FSMCommon.getTableID(FSMTableTitles.INVOICES_ON_HOLD),
            FSMActionsMenu.TAKE_OFF_HOLD
        );

        await FSMCommon.validateConfirmationMessages();

        // Verify invoice removed
        expect(
            await FSMCommon.isRequiredRowPresent(
                await FSMCommon.getTableID(FSMTableTitles.INVOICES_ON_HOLD),
                Payables_MyInvoices_Lbl.COMPANY_ON_HOLD_GRID,
                await FSMCommon.getCompany(),
                Payables_MyInvoices_Lbl.INVOICE_NUMBER_ON_HOLD_GRID,
                invoiceNumber
            )
        ).toBeFalsy();

        await this.screenshot("Take an invoice off hold");

        // Home
        await FSMCommon.clickHome();
        await FSMCommon.verifyPageTitle(FSMPageTitles.PROCESS_INVOICES);
        await FSMCommon.selectHeaderTab(FSMTabs.SEARCH);

        log.info(
            "INFO : =========>>>>> Take an invoice off hold successful <<<<<========="
        );
    }
    /*-----------------------------------------------------------------
	 * Objective : Generate a Cash Requirements report
	 * Workbook  : IFSM_FinancialsDifferencesToLawson_Workbook
	 * Exercise  : 7.1.1
	 * ----------------------------------------------------------------*/
    static async generateCashRequirementsReport(processInvCxt, vendorGroup) {

        log.info("INFO : =========>>>>> Generate a Cash Requirements report started <<<<<=========");

        // Switch role to Payables Manager
        await FSMCommon.switchRoles(FSMApplicationRoles.PAYABLES_MANAGER);
        await FSMCommon.verifyPageTitle(FSMPageTitles.MANAGE_PAYABLES);

        // Run Processes → Process Payments → Perform Cash Requirements
        await FSMCommon.menuNavigation(FSMMenu.RUN_PROCESSES,
            FSMMenu.PROCESS_PAYMENTS,
            FSMMenu.PERFORM_CASH_REQUIREMENTS);

        await FSMCommon.verifyDlgTitle(
            FSMDialogBoxTitles.PERFORM_CASH_REQUIREMENTS);

        // Verify vendor group
        expect(await (await FSMCommon.getTextField(
                Payables_CurrentCashRequirementsResults_Lbl.VENDOR_GROUP,
                PayablesManager_PerformCashRequirements_Id.VENDOR_GROUP
            )).inputValue()).toBe(vendorGroup);

        // Select Pay Group
        await (await FSMCommon.getTextboxLookUpIcon(
                Payables_CurrentCashRequirementsResults_Lbl.PAY_GROUP,
                PayablesManager_PerformCashRequirements_Id.PAY_GROUP
            )).click();

        await FSMCommon.enterDataInFilterField(
            await FSMCommon.getDialogBoxTableID(FSMTableTitles.PAY_GROUPS),
            Payables_CurrentCashRequirementsResults_Lbl.VENDOR_GROUP_GRID,
            vendorGroup);

        await FSMCommon.enterDataInFilterField(
            await FSMCommon.getDialogBoxTableID(FSMTableTitles.PAY_GROUPS),
            Payables_CurrentCashRequirementsResults_Lbl.PAY_GROUP_GRID,
            processInvCxt.payGroup);

        await FSMCommon.clickRowInDialogBox(
            await FSMCommon.getDialogBoxTableID(FSMTableTitles.PAY_GROUPS),
            Payables_CurrentCashRequirementsResults_Lbl.VENDOR_GROUP_GRID,
            vendorGroup,
            Payables_CurrentCashRequirementsResults_Lbl.PAY_GROUP_GRID,
            processInvCxt.payGroup);

        // Verify Pay Group
        expect(await (await FSMCommon.getTextField(
                Payables_CurrentCashRequirementsResults_Lbl.PAY_GROUP,
                PayablesManager_PerformCashRequirements_Id.PAY_GROUP
            )).inputValue()
        ).toBe(processInvCxt.payGroup);

        // Pay Through Date
        await this.type(
            await FSMCommon.getTextField(
                Payables_CurrentCashRequirementsResults_Lbl.PAY_THROUGH_DATE,
                PayablesManager_PerformCashRequirements_Id.PAY_THROUGH_DATE
            ),
            processInvCxt.payThroughDate
        );

        // Payment Date
        await this.type(
            await FSMCommon.getTextField(
                Payables_CurrentCashRequirementsResults_Lbl.PAYMENT_DATE,
                PayablesManager_PerformCashRequirements_Id.PAYMENT_DATE
            ),
            processInvCxt.paymentDate
        );

        // Select Cash Code
        await (
            await FSMCommon.getTextboxLookUpIcon(
                Payables_CurrentCashRequirementsResults_Lbl.CASH_CODE,
                PayablesManager_PerformCashRequirements_Id.CASH_CODE
            )
        ).click();

        await FSMCommon.enterDataInFilterField(
            await FSMCommon.getDialogBoxTableID(FSMTableTitles.CASH_CODES),
            Payables_CurrentCashRequirementsResults_Lbl.CASH_CODE_GRID,
            processInvCxt.cashCode
        );

        await FSMCommon.clickRowInDialogBox(
            await FSMCommon.getDialogBoxTableID(FSMTableTitles.CASH_CODES),
            Payables_CurrentCashRequirementsResults_Lbl.CASH_CODE_GRID,
            processInvCxt.cashCode
        );

        // Verify Cash Code
        expect(await (await FSMCommon.getTextField(
                Payables_CurrentCashRequirementsResults_Lbl.CASH_CODE,
                PayablesManager_PerformCashRequirements_Id.CASH_CODE
            )).inputValue()
        ).toBe(processInvCxt.cashCode);

        // Submit
        await FSMCommon.toHandleButtons(Constants.SUBMIT);
        await FSMCommon.validateConfirmationMessages();
        await FSMCommon.verifyPageTitle(FSMPageTitles.MANAGE_PAYABLES);

        await this.screenshot("Generate a Cash Requirements report");

        log.info("INFO : =========>>>>> Generate a Cash Requirements report successful <<<<<=========");
    }
    /*-----------------------------------------------------------------
	 * Objective : Review the Cash Requirements Results
	 * Workbook  : IFSM_FinancialsDifferencesToLawson_Workbook
	 * Exercise  : 7.1.2
	 * ----------------------------------------------------------------*/
    static async reviewCashRequirementsResults(payGroup) {

        const commonPg = new FSMCommonPage(this.page);

        log.info("INFO : =========>>>>> Review the Cash Requirements Results started <<<<<=========");

        // Click Run Processes --> Process Payments --> Cash Requirements Results
        await FSMCommon.menuNavigation(FSMMenu.RUN_PROCESSES,FSMMenu.PROCESS_PAYMENTS,
            FSMMenu.CASH_REQUIREMENTS_RESULTS
        );

        // Filter your record
        await FSMCommon.enterDataInFilterField(
            await FSMCommon.getTableID(FSMTableTitles.CURRENT_CASH_REQUIREMENTS_RESULTS),
            PayablesManager_CashRequirementsResults_Lbl.VENDOR_GROUP_GRID,
            await FSMCommon.getCompanyGroup()
        );

        await FSMCommon.enterDataInFilterField(
            await FSMCommon.getTableID(FSMTableTitles.CURRENT_CASH_REQUIREMENTS_RESULTS),
            PayablesManager_CashRequirementsResults_Lbl.PAY_GROUP_GRID,
            payGroup
        );

        // Click Refresh (instead of hard pause)
        await FSMCommon.toolbarIcons(
            await FSMCommon.getTableID(FSMTableTitles.CURRENT_CASH_REQUIREMENTS_RESULTS),
            FSMActionsMenu.REFRESH
        );

        // Review the status of Current Cash Requirements results
        const rowNo = await FSMCommon.clickRowInDialogBox(
            await FSMCommon.getTableID(FSMTableTitles.CURRENT_CASH_REQUIREMENTS_RESULTS),
            PayablesManager_CashRequirementsResults_Lbl.PAY_GROUP_GRID,
            payGroup
        );

        expect(
            await FSMCommon.getRequiredValueFromTheGrid(
                await FSMCommon.getTableID(FSMTableTitles.CURRENT_CASH_REQUIREMENTS_RESULTS),
                PayablesManager_CashRequirementsResults_Lbl.STATUS_GRID,
                rowNo
            )
        ).toBe(Constants.STATUS_COMPLETED);

        // Open the record
        await FSMCommon.rightClickOnRowAndPerformAnAction(
            await FSMCommon.getTableID(FSMTableTitles.CURRENT_CASH_REQUIREMENTS_RESULTS),
            PayablesManager_CashRequirementsResults_Lbl.PAY_GROUP_GRID,
            payGroup,
            FSMActionsMenu.OPEN
        );

        // Verify the page title
        expect(await (await commonPg.pageTitle()).textContent()).toContainText(
            FSMPageTitles.CASH_REQUIREMENTS_RESULT
        );

        // Selected Invoice Payments tab
        await FSMCommon.selectTabWithPartialText(FSMTabs.SELECTED_INVOICE_PAYMENTS);
        await this.screenshot("Selected Invoice Payments");

        // Scheduled Payments tab
        await FSMCommon.selectTabWithPartialText(FSMTabs.SCHEDULED_PAYMENTS);
        await this.screenshot("Scheduled Payments");

        log.info("INFO : =========>>>>> Review the Cash Requirements Results successful <<<<<=========");
    }




}

export default PayablesManagerFunctions;