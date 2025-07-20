import BaseClass from "../../testBase/BaseClass";
import EnterpriseModelWorkbenchPage from "../pages/EnterpriseModelWorkbenchPage";
import LNCommon from "./LNCommon";
import LNSessionTabs from "../constants/LNSessionTabs";
import EnterpriseModelWorkbench_Lbl from "../constants/elementLbls/EnterpriseModelWorkbench_Lbl";
import LNCommons from "../constants/LNCommons";
import {expect} from '@playwright/test';
import { setBrowserZoom } from 'playwright-zoom';
import LNPage from "../pages/LNPage";
import EnterpriseModelWorkbench_Id from "../constants/elementIds/EnterpriseModelWorkbench_Id";
import LNSessionCodes from "../constants/LNSessionCodes";
import LNTabs from "../constants/LNTabs";
import ElementAttributes from "../../commons/constants/ElementAttributes";
import LNSessionTabActions from "./LNSessionTabActions";
import LNMenuActions_Id from "../constants/elementIds/LNMenuActions_Id";
import Addresses_Lbl from "../../ln/constants/elementLbls/Addresses_Lbl";
import Addresses_Id from "../../ln/constants/elementIds/Addresses_Id";
import LNMenuActions_Lbl from "../../ln/constants/elementLbls/LNMenuActions_Lbl";
import EnterpriseUnits_Lbl from "../../ln/constants/elementLbls/EnterpriseUnits_Lbl";
import EnterpriseUnits_Id from "../constants/elementIds/EnterpriseUnits_Id";
import LNPopupMsg from "../constants/LNPopupMsg";
import PlanningClusters_Lbl from "../constants/elementLbls/PlanningClusters_Lbl";
import PlanningClusters_Id from "../constants/elementIds/PlanningClusters_Id";
import Sites_Lbl from "../constants/elementLbls/Sites_Lbl";
import Sites_Id from "../constants/elementIds/Sites_Id";
import Items_Lbl from "../constants/elementLbls/Items_Lbl";
import Items_Id from "../constants/elementIds/Items_Id";

class LNMasterData extends BaseClass {

    static async reviewEnterpriseModelInInforLN(enterpriseMdlCnxt) {

        // Intializing the page
        const emwPg = new EnterpriseModelWorkbenchPage(this.page);

        await setBrowserZoom(this.page, 50);

        // Navigating to Master Data --> Enterprise Model --> Enterprise Model Workbench
        await LNCommon.navigateToLNModule(LNSessionTabs.MASTER_DATA, LNSessionTabs.ENTERPRISE_MODEL,
            LNSessionTabs.ENTERPRISE_MODEL_WORKBENCH);

        // Verify Session Tab
        await LNCommon.verifySessionTab(LNSessionTabs.ENTERPRISE_MODEL_WORKBENCH);

        // Verify the pane heading
        expect(await this.isElementPresent(await emwPg.headerLayoutPanel(EnterpriseModelWorkbench_Lbl.ENTERPRISE_STRUCTURE))).toBeTruthy();

        await emwPg.expandSite(enterpriseMdlCnxt.entity).click();

        // Verifying the Pushpins on the Map
        expect(await emwPg.pushPins().count()).toBeGreaterThan(parseInt(LNCommons.ZERO));

        for (let i = 0; i < enterpriseMdlCnxt.sites.length; i++) {

            await emwPg.expandButton(enterpriseMdlCnxt.sites[i]).click();

            // Verify the pane heading
            expect(await this.isElementPresent(await emwPg.headerLayoutPanel(EnterpriseModelWorkbench_Lbl.DETAILS))).toBeTruthy();

            // Verifying the Label in Side Pane
            expect(await this.isElementPresent(await emwPg.paneOptionLabel(enterpriseMdlCnxt.sites[i]))).toBeTruthy();

            // Verifying the Offices in Enterprises Pane
            const offices = enterpriseMdlCnxt.offices[i];
            for (let j = 0; j < offices.length; j++) {
                expect(await this.isElementPresent(await emwPg.offices(offices[j]))).toBeTruthy();
            }

            // Verifying the Address in Side Pane
            expect(await this.isElementPresent(await emwPg.address(enterpriseMdlCnxt.addresses[i]))).toBeTruthy();

            if (i == 0) {
                await emwPg.expandButton(enterpriseMdlCnxt.sites[0]).click();
            }
        }

        const noPushpinsBeforeZoom = await emwPg.pushPins().count();

        // Zoom in the map
        await emwPg.zoomIn().click();
        await this.page.waitForTimeout(2000);

        const noPushpinsAfterZoom = await emwPg.pushPins().count();

        // Verify the number of pushpins updated
        expect(noPushpinsBeforeZoom).not.toBe(noPushpinsAfterZoom);

        // Verify the pane heading
        expect(await this.isElementPresent(await emwPg.headerLayoutPanel(EnterpriseModelWorkbench_Lbl.ENTERPRISE_STRUCTURE))).toBeTruthy();

        // Click on site on Enterprise structure pane
        await this.forceClick(await emwPg.offices(enterpriseMdlCnxt.sites[1]));

        const pushpins = await emwPg.pushPins().nth(0);
        await pushpins.dispatchEvent('mouseover');
        
        // Click on site on Enterprise structure pane
        await emwPg.offices(enterpriseMdlCnxt.sites[1]).click();

        // Click Boston Purchase office site
        await emwPg.offices(enterpriseMdlCnxt.offices[1][0]).click();

        // Verify the pane heading
        expect(await this.isElementPresent(await emwPg.headerLayoutPanel(EnterpriseModelWorkbench_Lbl.DETAILS))).toBeTruthy();

        // Verify the Details pane
        expect(await this.isElementPresent(await emwPg.paneOptionLabel(enterpriseMdlCnxt.purchaseOffice))).toBeTruthy();
    }

    static async reviewASiteInInforLN(enterpriseMdlCnxt) {

        // Intializing the page
        const lnPg = new LNPage(this.page);
        const emwPg = new EnterpriseModelWorkbenchPage(this.page);

        // Filter the site
        await this.type(await emwPg.siteFilter(EnterpriseModelWorkbench_Lbl.SITE), enterpriseMdlCnxt.sites[1]);
        await this.page.keyboard.press('Enter');

        // Move to Element and Drilldown
        await (await emwPg.bostonDrilldown()).hover();
        await (await emwPg.bostonDrilldown()).click();

        await LNCommon.verifySessionTab(LNSessionTabs.SITE);

        const siteValue = await (await LNCommon.getTextField(
            EnterpriseModelWorkbench_Lbl.SITE,
            EnterpriseModelWorkbench_Id.SITE,
            LNSessionCodes.SITE
        )).inputValue();
        expect(siteValue).toBe(enterpriseMdlCnxt.sites[1]);

        await LNCommon.selectHeaderTab(LNTabs.GENERAL, LNSessionCodes.SITE);

        const entUnitValue = await (await LNCommon.getTextField(
            EnterpriseModelWorkbench_Lbl.ENTERPRISE_UNIT,
            EnterpriseModelWorkbench_Id.ENTERPRISE_UNIT,
            LNSessionCodes.SITE
        )).inputValue();
        expect(entUnitValue).toBe(enterpriseMdlCnxt.sites[1]);

        await LNCommon.selectGridTab(LNTabs.WAREHOUSES, LNSessionCodes.SITE);

        expect(await this.isElementPresent(
            await LNCommon.getDataCell(
                EnterpriseModelWorkbench_Lbl.WAREHOUSE_GRID,
                EnterpriseModelWorkbench_Id.WAREHOUSE_GRID,
                LNSessionCodes.WAREHOUSES_SITE
            )
        )).toBeTruthy();

        expect(await (
            await lnPg.selectRequiredRecord(
                LNSessionCodes.WAREHOUSES_SITE,
                LNCommons.SECOND_RECORD
            )
        ).isVisible()).toBeFalsy();

        await LNCommon.selectGridTab(LNTabs.DEPARTMENTS, LNSessionCodes.SITE);

        await this.page.waitForTimeout(2000);
        const departments = await(await lnPg.gridCell(
            LNSessionCodes.DEPARTMENTS_SITE,
            EnterpriseModelWorkbench_Id.DEPARTMENT_TYPE_DRP_GRID
        )).count();
        expect(departments).toBe(Number(LNCommons.RECORD_TWO));

        for (let i = 0; i < departments; i++) {
            const value = await LNCommon.getRequiredValueFromTheGrid(
                LNSessionCodes.DEPARTMENTS_SITE,
                EnterpriseModelWorkbench_Lbl.ENTERPRISE_UNIT_GRID,
                EnterpriseModelWorkbench_Id.ENTERPRISE_UNIT_GRID,
                i
            );
            expect(value).toBe(enterpriseMdlCnxt.sites[1]);
        }

        await LNCommon.selectGridTab(LNTabs.ASSEMBLY_LINES, LNSessionCodes.SITE);

        expect(await (
            await lnPg.gridCell(
                LNSessionCodes.ASSEMBLY_LINES,
                EnterpriseModelWorkbench_Id.ASSEMBLY_LINE_GRID
            )
        ).isVisible()).toBeFalsy();

        await LNCommon.selectGridTab(LNTabs.SERVICE_LOCATIONS, LNSessionCodes.SITE);

        expect(await (
            await lnPg.gridCell(
                LNSessionCodes.SERVICE_LOCATIONS_SITE,
                EnterpriseModelWorkbench_Id.LOCATION_GRID
            )
        ).isVisible()).toBeFalsy();

        await LNCommon.selectHeaderTab(LNTabs.SETTINGS, LNSessionCodes.SITE);

        const settingsLbl = [
            EnterpriseModelWorkbench_Lbl.PROCUREMENT_RDN,
            EnterpriseModelWorkbench_Lbl.SALES_RDN,
            EnterpriseModelWorkbench_Lbl.WAREHOUSING_RDN
        ];
        const settingsId = [
            EnterpriseModelWorkbench_Id.PROCUREMENT_RDN,
            EnterpriseModelWorkbench_Id.SALES_RDN,
            EnterpriseModelWorkbench_Id.WAREHOUSING_RDN
        ];

        for (let i = 0; i < settingsLbl.length; i++) {
            
            await this.page.waitForTimeout(1000);
            
            const classAttr = await (await lnPg.hyperlinkText(
                settingsLbl[i], settingsId[i], LNSessionCodes.SITE
            )).getAttribute(ElementAttributes.CLASS);

            expect(classAttr).toContain(LNCommons.CHECKED);
        }

        // Click Procurement
        await(await lnPg.hyperlinkText(
            EnterpriseModelWorkbench_Lbl.PROCUREMENT_RDN,
            EnterpriseModelWorkbench_Id.PROCUREMENT_RDN,
            LNSessionCodes.SITE
        )).click();
        
        await LNCommon.verifySessionTab(LNSessionTabs.PROCUREMENT_SETTINGS_BY_SITE);

        const procurementTabs = [
            LNTabs.GENERAL, LNTabs.REQUISITION, LNTabs.RFQ, LNTabs.ORDER,
            LNTabs.SCHEDULE, LNTabs.PRICING, LNTabs.LANDED_COST
        ];
        const procurementLabels = [
            EnterpriseModelWorkbench_Lbl.USE_GLOBAL_PROCUREMENT_PARAMETERS_CHK,
            EnterpriseModelWorkbench_Lbl.USE_GLOBAL_PURCHSE_REQUISITION_PARAMETERS_CHK,
            EnterpriseModelWorkbench_Lbl.USE_GLOBAL_REQUEST_FOR_QUOTATION_PARAMETERS_CHK,
            EnterpriseModelWorkbench_Lbl.USE_GLOBAL_PURCHASE_ORDER_PARAMETERS_CHK,
            EnterpriseModelWorkbench_Lbl.USE_GLOBAL_PURCHASE_SCHEDULE_PARAMETERS_CHK,
            EnterpriseModelWorkbench_Lbl.USE_GLOBAL_PROCUREMENT_PRICING_PARAMETERS_CHK,
            EnterpriseModelWorkbench_Lbl.USE_GLOBAL_LANDED_COST_PARAMETERS_CHK
        ];
        const procurementIds = [
            EnterpriseModelWorkbench_Id.USE_GLOBAL_PROCUREMENT_PARAMETERS_CHK,
            EnterpriseModelWorkbench_Id.USE_GLOBAL_PURCHSE_REQUISITION_PARAMETERS_CHK,
            EnterpriseModelWorkbench_Id.USE_GLOBAL_REQUEST_FOR_QUOTATION_PARAMETERS_CHK,
            EnterpriseModelWorkbench_Id.USE_GLOBAL_PURCHASE_ORDER_PARAMETERS_CHK,
            EnterpriseModelWorkbench_Id.USE_GLOBAL_PURCHASE_SCHEDULE_PARAMETERS_CHK,
            EnterpriseModelWorkbench_Id.USE_GLOBAL_PROCUREMENT_PRICING_PARAMETERS_CHK,
            EnterpriseModelWorkbench_Id.USE_GLOBAL_LANDED_COST_PARAMETERS_CHK
        ];

        const items =procurementTabs.map((tab, i) => ({
            tab,
            label: procurementLabels[i],
            id: procurementIds[i]
        }));

       for (const { tab, label, id } of items) {

            // Select tab
            await LNCommon.selectHeaderTab(tab, LNSessionCodes.PROCUREMENT_SETTINGS_BY_SITE);
           
            expect(await LNCommon.isElementPresent(await
                lnPg.selectCheckboxLabel(
                    label,
                    id
                ))).toBeTruthy();

        }

        await LNSessionTabActions.closeTab(LNSessionTabs.PROCUREMENT_SETTINGS_BY_SITE); 


        await (await lnPg.hyperlinkText(
            EnterpriseModelWorkbench_Lbl.SALES_RDN,
            EnterpriseModelWorkbench_Id.SALES_RDN,
            LNSessionCodes.SITE
        )).click();
        

        await this.page.waitForLoadState('domcontentloaded');

        await LNCommon.verifySessionTab(LNSessionTabs.SALES_SETTINGS_BY_SITE);

        const salesTabs = [LNTabs.GENERAL, LNTabs.QUOTATION, LNTabs.ORDER];
        const salesLabels = [
            EnterpriseModelWorkbench_Lbl.USE_GLOBAL_SALES_PARAMETERS_CHK,
            EnterpriseModelWorkbench_Lbl.USE_GLOBAL_SALES_QUOTATION_PARAMETERS_CHK,
            EnterpriseModelWorkbench_Lbl.USE_GLOBAL_SALES_ORDER_PARAMETERS_CHK
        ];
        const salesIds = [
            EnterpriseModelWorkbench_Id.USE_GLOBAL_SALES_PARAMETERS_CHK,
            EnterpriseModelWorkbench_Id.USE_GLOBAL_SALES_QUOTATION_PARAMETERS_CHK,
            EnterpriseModelWorkbench_Id.USE_GLOBAL_SALES_ORDER_PARAMETERS_CHK
        ];

        const itemss =salesTabs.map((tab, i) => ({
            tab,
            label: salesLabels[i],
            id: salesIds[i]
        }));

        for (const { tab, label, id } of itemss) {
            await LNCommon.selectHeaderTab(tab, LNSessionCodes.SALES_SETTINGS_BY_SITE);

             expect(await LNCommon.isElementPresent(await
                lnPg.selectCheckboxLabel(
                    label,
                    id
                ))).toBeTruthy();
        }

        await LNSessionTabActions.closeTab(LNSessionTabs.SALES_SETTINGS_BY_SITE);
       

        await LNCommon.verifySessionTab(LNSessionTabs.SITE);


        await(await lnPg.hyperlinkText(
            EnterpriseModelWorkbench_Lbl.WAREHOUSING_RDN,
            EnterpriseModelWorkbench_Id.WAREHOUSING_RDN,
            LNSessionCodes.SITE
        )).waitFor({ state: 'visible'});


        await this.forceClick(await lnPg.hyperlinkText(
            EnterpriseModelWorkbench_Lbl.WAREHOUSING_RDN,
            EnterpriseModelWorkbench_Id.WAREHOUSING_RDN,
            LNSessionCodes.SITE
        ));

       await this.page.waitForLoadState('domcontentloaded');

       await LNCommon.verifySessionTab(LNSessionTabs.WAREHOUSING_SETTINGS_BY_SITE);

        const warehousingTabs = [
            LNTabs.WAREHOUSE, LNTabs.GENERAL, LNTabs.ORDERS, LNTabs.INBOUND, LNTabs.OUTBOUND,
            LNTabs.SHIPPING_DOCUMENTS, LNTabs.INSPECTIONS, LNTabs.CROSS_DOCKING,
            LNTabs.HANDLING_UNITS, LNTabs.LABELS, LNTabs.CYCLE_COUNTING_ADJUSTMENTS
        ];
        const warehousingLabels = [
            EnterpriseModelWorkbench_Lbl.USE_ITEM_ORDERING_DATA_BY_SITE_CHK,
            EnterpriseModelWorkbench_Lbl.USE_GLOBAL_WAREHOUSING_PARAMETERS_CHK,
            EnterpriseModelWorkbench_Lbl.USE_GLOBAL_ORDER_PARAMETERS_CHK,
            EnterpriseModelWorkbench_Lbl.USE_GLOBAL_INBOUND_PARAMETERS_CHK,
            EnterpriseModelWorkbench_Lbl.USE_GLOBAL_OUTBOUND_PARAMETERS_CHK,
            EnterpriseModelWorkbench_Lbl.USE_GLOBAL_SHIPPING_DOCUMENTS_PARAMETERS_CHK,
            EnterpriseModelWorkbench_Lbl.USE_GLOBAL_INSPECTION_PARAMETERS_CHK,
            EnterpriseModelWorkbench_Lbl.USE_GLOBAL_CROSS_DOCKING_PARAMETERS_CHK,
            EnterpriseModelWorkbench_Lbl.USE_GLOBAL_HANDLING_UNIT_PARAMETERS_CHK,
            EnterpriseModelWorkbench_Lbl.AUTOMATIC_LABELING_OF_MULTI_ITEM_HANDLING_UNIT_CHK,
            EnterpriseModelWorkbench_Lbl.USE_GLOBAL_CYCLE_COUNTING_ADJUSTMENTS_PARAMETERS_CHK
        ];
        const warehousingIds = [
            EnterpriseModelWorkbench_Id.USE_ITEM_ORDERING_DATA_BY_SITE_CHK,
            EnterpriseModelWorkbench_Id.USE_GLOBAL_WAREHOUSING_PARAMETERS_CHK,
            EnterpriseModelWorkbench_Id.USE_GLOBAL_ORDER_PARAMETERS_CHK,
            EnterpriseModelWorkbench_Id.USE_GLOBAL_INBOUND_PARAMETERS_CHK,
            EnterpriseModelWorkbench_Id.USE_GLOBAL_OUTBOUND_PARAMETERS_CHK,
            EnterpriseModelWorkbench_Id.USE_GLOBAL_SHIPPING_DOCUMENTS_PARAMETERS_CHK,
            EnterpriseModelWorkbench_Id.USE_GLOBAL_INSPECTION_PARAMETERS_CHK,
            EnterpriseModelWorkbench_Id.USE_GLOBAL_CROSS_DOCKING_PARAMETERS_CHK,
            EnterpriseModelWorkbench_Id.USE_GLOBAL_HANDLING_UNIT_PARAMETERS_CHK,
            EnterpriseModelWorkbench_Id.AUTOMATIC_LABELING_OF_MULTI_ITEM_HANDLING_UNIT_CHK,
            EnterpriseModelWorkbench_Id.USE_GLOBAL_CYCLE_COUNTING_ADJUSTMENTS_PARAMETERS_CHK
        ];


        const warehousingItems =warehousingTabs.map((tab, i) => ({
            tab,
            label: warehousingLabels[i],
            id: warehousingIds[i]
        }));

        for (const { tab, label, id } of warehousingItems) {

            await LNCommon.selectHeaderTab(tab, LNSessionCodes.WAREHOUSING_SETTINGS_BY_SITE);

            const selectCheckboxLabel = await
                lnPg.selectCheckboxLabel(
                    label,
                    id
                );
            expect(await LNCommon.isElementPresent(selectCheckboxLabel)).toBeTruthy();
        }

        await LNSessionTabActions.closeTab(LNSessionTabs.WAREHOUSING_SETTINGS_BY_SITE);
         await LNCommon.verifySessionTab(LNSessionTabs.SITE);
        // --- Department drilldown & sales office ---
        await LNCommon.selectGridTab(LNTabs.DEPARTMENTS, LNSessionCodes.SITE);

        await LNCommon.clickAndSelectDropdownFieldGridFilter(
            EnterpriseModelWorkbench_Id.DEPARTMENT_TYPE_DRP_GRID,
            enterpriseMdlCnxt.deptType,
            EnterpriseModelWorkbench_Lbl.DEPARTMENT_TYPE_DRP_GRID,
            LNSessionCodes.DEPARTMENTS_SITE
        );
        let rowNo = await LNCommon.selectRequiredRecord(
            LNSessionCodes.DEPARTMENTS_SITE,
            EnterpriseModelWorkbench_Lbl.DEPARTMENT_TYPE_DRP_GRID,
            EnterpriseModelWorkbench_Id.DEPARTMENT_TYPE_DRP_GRID,
            enterpriseMdlCnxt.deptType
        );
        await LNCommon.drilldownRequiredRecord(LNSessionCodes.DEPARTMENTS_SITE, String(rowNo));

        await this.page.waitForLoadState('domcontentloaded');
        await LNCommon.verifyDialogBoxWindow(LNSessionTabs.SALES_OFFICES);

        const txt = await (await LNCommon.getTextField(
            EnterpriseModelWorkbench_Lbl.SITE_DRILL_DOWN,
            EnterpriseModelWorkbench_Id.SITE_DRILL_DOWN,
            LNSessionCodes.SALES_OFFICES)).inputValue();
            
        expect(txt.trim().toLowerCase()).toBe(enterpriseMdlCnxt.sites[1].toLowerCase());

       await (await lnPg.closeButton(LNSessionCodes.SALES_OFFICES)).dblclick();
        
        await LNCommon.verifySessionTab(LNSessionTabs.SITE);

        // --- Intercompany trade relationships & agreement ---
        await LNCommon.selectRequiredRecord(
            LNSessionCodes.DEPARTMENTS_SITE,
            EnterpriseModelWorkbench_Lbl.DEPARTMENT_TYPE_DRP_GRID,
            EnterpriseModelWorkbench_Id.DEPARTMENT_TYPE_DRP_GRID,
            enterpriseMdlCnxt.deptType
        );
        await LNCommon.navigateToLNReferences(
            LNSessionCodes.DEPARTMENTS_SITE,
            LNMenuActions_Lbl.INTERCOMPANY_TRADE_SELLING_RELATIONSHIPS
        );

        await this.page.waitForLoadState('domcontentloaded');
        await LNCommon.verifyDialogBoxWindow(LNSessionTabs.INTERCOMPANY_TRADE_RELATIONSHIPS);

        await LNCommon.selectRequiredRecord(
            LNSessionCodes.INTERCOMPANY_TRADE_RELATIONSHIPS,
            EnterpriseModelWorkbench_Lbl.FROM_ENTERPRISE_UNIT_ZOOM_GRID,
            EnterpriseModelWorkbench_Id.FROM_ENTERPRISE_UNIT_ZOOM_GRID,
            enterpriseMdlCnxt.sites[1]
        );
        await LNCommon.clickTextMenuItem(
            LNSessionCodes.INTERCOMPANY_TRADE_RELATIONSHIPS,
            LNMenuActions_Id.OPEN,
            LNMenuActions_Lbl.OPEN
        );

        await this.page.waitForLoadState('domcontentloaded');
        await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_RELATIONSHIP);

        await LNCommon.selectGridTab(LNTabs.AGREEMENTS, LNSessionCodes.INTER_COMPANY_TRADE_RELATIONSHIP);
        const firstVal = await LNCommon.getRequiredValueFromTheGrid(
            LNSessionCodes.INTER_COMPANY_TRADE_RELATIONSHIP_LINE,
            EnterpriseModelWorkbench_Lbl.SCENARIO_DRP_GRID,
            EnterpriseModelWorkbench_Id.SCENARIO_DRP_GRID,
            Number(LNCommons.FIRST_RECORD)
        );
        expect(firstVal).not.toBe('');

        await LNCommon.selectRequiredRecord(
            LNSessionCodes.INTER_COMPANY_TRADE_RELATIONSHIP_LINE,
            EnterpriseModelWorkbench_Lbl.SCENARIO_DRP_GRID,
            EnterpriseModelWorkbench_Id.SCENARIO_DRP_GRID,
            enterpriseMdlCnxt.scenario
        );
        await LNCommon.navigateToLNReferences(
            LNSessionCodes.INTER_COMPANY_TRADE_RELATIONSHIP_LINE,
            LNMenuActions_Lbl.AGREEMENT
        );

        await this.page.waitForLoadState('domcontentloaded');
        await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_AGREEMENT);

        // --- Agreement & Transfer Pricing ---
        await LNCommon.selectHeaderTab(LNTabs.AGREEMENT, LNSessionCodes.INTERCOMPANY_TRADE_AGREEMENT);
        await LNCommon.clickAndSelectDropdownField(
            EnterpriseModelWorkbench_Lbl.SCENARIO_DRP,
            EnterpriseModelWorkbench_Id.SCENARIO_DRP,
            enterpriseMdlCnxt.scenario
        );
        await LNCommon.selectHeaderTab(LNTabs.SETTINGS, LNSessionCodes.INTERCOMPANY_TRADE_AGREEMENT);

        const present = await LNCommon.isElementPresent(await 
            lnPg.selectCheckboxLabel(
            EnterpriseModelWorkbench_Lbl.RETURN_ORDER_CHK,
            EnterpriseModelWorkbench_Id.RETURN_ORDER_CHK
        ));
        expect(present).toBeTruthy();

        await LNCommon.selectGridTab(LNTabs.TRANSFER_PRICING_RULES, LNSessionCodes.INTERCOMPANY_TRADE_AGREEMENT);
        rowNo = await LNCommon.selectRequiredRecord(
            LNSessionCodes.TRANSFER_PRICING_RULES,
            EnterpriseModelWorkbench_Lbl.PRICE_ORIGIN_DRP_GRID,
            EnterpriseModelWorkbench_Id.PRICE_ORIGIN_DRP_GRID,
            enterpriseMdlCnxt.priceOrigin
        );
        await LNCommon.drilldownRequiredRecord(LNSessionCodes.TRANSFER_PRICING_RULES, String(rowNo));

        await this.page.waitForLoadState('domcontentloaded');
        await LNCommon.verifySessionTab(LNSessionTabs.INTERCOMPANY_TRADE_AGREEMENT_TRANSFER_PRICING_RULES);

        await LNCommon.clickAndSelectDropdownField(
            EnterpriseModelWorkbench_Lbl.PRICE_ORIGIN_DRP,
            EnterpriseModelWorkbench_Id.PRICE_ORIGIN_DRP,
            enterpriseMdlCnxt.priceOrigin
        );

        await LNSessionTabActions.closeTab(LNSessionTabs.INTERCOMPANY_TRADE_AGREEMENT_TRANSFER_PRICING_RULES);
        await LNSessionTabActions.closeTab(LNSessionTabs.INTERCOMPANY_TRADE_AGREEMENT);
        await LNSessionTabActions.closeTab(LNSessionTabs.INTERCOMPANY_TRADE_RELATIONSHIP);

        await (await lnPg.closeButton(LNSessionCodes.INTERCOMPANY_TRADE_RELATIONSHIPS)).click();
        await LNSessionTabActions.closeTab(LNSessionTabs.SITE);
        await LNSessionTabActions.closeTab(LNSessionTabs.ENTERPRISE_MODEL_WORKBENCH);

        await LNCommon.collapseLNModule(LNSessionTabs.MASTER_DATA);
    }
    // Create an address
    static async  createAnAddress(structureCnxt) {
        console.log('=========>>>>> Create an address started <<<<<=========');

        // Navigating to Master Data ---> Addresses ---> Addresses
        await LNCommon.navigateToLNModule( LNSessionTabs.MASTER_DATA, LNSessionTabs.ADDRESSES, LNSessionTabs.ADDRESSES);

        // Verify Session Tab
        await LNCommon.verifySessionTab(LNSessionTabs.ADDRESSES);

        // Filter by name
        structureCnxt.name+="04";
        await LNCommon.filterRequiredRecord(Addresses_Lbl.NAME_GRID,Addresses_Id.NAME_GRID, LNSessionCodes.ADDRESS, structureCnxt.name);

        // Check if address already exists
        const isPresent = await LNCommon.isRequiredRowPresent( LNSessionCodes.ADDRESS, Addresses_Lbl.NAME_GRID,Addresses_Id.NAME_GRID,structureCnxt.name);

        if (!isPresent) {
            await LNCommon.clickMainMenuItem(LNSessionCodes.ADDRESS, LNMenuActions_Id.NEW);

            await LNCommon.verifySessionTab(LNSessionTabs.ADDRESSES);

            await LNCommon.triggerInputField(
                await LNCommon.getTextField(Addresses_Lbl.NAME, Addresses_Id.NAME, LNSessionCodes.ADDRESSES), structureCnxt.name);

            await LNCommon.triggerInputField(
                await LNCommon.getTextField(Addresses_Lbl.COUNTRY, Addresses_Id.COUNTRY, LNSessionCodes.ADDRESSES), structureCnxt.country);

            await (await LNCommon.getTextboxLookUpIcon(Addresses_Lbl.CITY, Addresses_Id.CITY, LNSessionCodes.ADDRESSES)).click();

            await LNCommon.verifyDialogBoxWindow(LNSessionTabs.CITIES_BY_COUNTRY);

            await LNCommon.filterAndSelectFirstRecord(Addresses_Lbl.CITY_ZOOM_GRID, Addresses_Id.CITY_ZOOM_GRID, structureCnxt.city, LNSessionCodes.CITIES_BY_COUNTRY);

            await LNCommon.clickTextMenuItem(LNSessionCodes.CITIES_BY_COUNTRY, LNMenuActions_Id.OK, LNMenuActions_Lbl.OK);

            await LNCommon.verifySessionTab(LNSessionTabs.ADDRESSES);

            await LNCommon.triggerInputField(await LNCommon.getTextField(Addresses_Lbl.STREET, Addresses_Id.STREET, LNSessionCodes.ADDRESSES), structureCnxt.street);

            structureCnxt.houseNum=structureCnxt.houseNum.replace('%s', '04');
            await LNCommon.triggerInputField(await LNCommon.getTextField(Addresses_Lbl.HOUSE_NUMBER, Addresses_Id.HOUSE_NUMBER, LNSessionCodes.ADDRESSES), structureCnxt.houseNum);

            await LNCommon.triggerInputField(await LNCommon.getTextField(Addresses_Lbl.GPS_LATITUDE, Addresses_Id.GPS_LATITUDE, LNSessionCodes.ADDRESSES), structureCnxt.latitude);

            await LNCommon.triggerInputField(await LNCommon.getTextField(Addresses_Lbl.GPS_LONGITUDE, Addresses_Id.GPS_LONGITUDE, LNSessionCodes.ADDRESSES), structureCnxt.longitude);

            await LNCommon.clickMainMenuItem(LNSessionCodes.ADDRESSES, LNMenuActions_Id.SAVE);
        } else {
            const rowNum = await LNCommon.selectRequiredRecord( LNSessionCodes.ADDRESS, Addresses_Lbl.NAME_GRID,Addresses_Id.NAME_GRID, structureCnxt.name );

            await LNCommon.drilldownRequiredRecord( LNSessionCodes.ADDRESS,rowNum.toString() );
        }

        // Get Address Code
        structureCnxt.addressCode = await (await LNCommon.getTextField( Addresses_Lbl.ADDRESS_CODE, Addresses_Id.ADDRESS_CODE, LNSessionCodes.ADDRESSES )).inputValue();

        console.log(`=========>>>>> The Address Code is ${structureCnxt.addressCode} <<<<<=========`);

        await LNCommon.clickMainMenuItem(LNSessionCodes.ADDRESSES, LNMenuActions_Id.SAVE_AND_EXIT);
        await LNCommon.verifySessionTab(LNSessionTabs.ADDRESSES);
        await LNCommon.clickMainMenuItem(LNSessionCodes.ADDRESS, LNMenuActions_Id.SAVE_AND_EXIT);

        await LNCommon.collapseLNModule(LNSessionTabs.MASTER_DATA);

        console.log('=========>>>>> Create an address completed successfully <<<<<=========');
    }

    static async createAnEnterpriseUnit(structureCnxt) {
    console.log('=========>>>>> Create an enterprise unit started <<<<<=========');

    // Navigate to Enterprise Units session
    await LNCommon.navigateToLNModule( LNSessionTabs.MASTER_DATA, LNSessionTabs.ENTERPRISE_MODEL, LNSessionTabs.ENTERPRISE_STRUCTURE, LNSessionTabs.ENTERPRISE_UNITS );
    await LNCommon.verifySessionTab(LNSessionTabs.ENTERPRISE_UNITS);

    // Filter and check if already present
    structureCnxt.enterpriseUnit= structureCnxt.enterpriseUnit.replace('%s', "04");
    await LNCommon.filterRequiredRecord(EnterpriseUnits_Lbl.ENTERPRISE_UNIT_GRID, EnterpriseUnits_Id.ENTERPRISE_UNIT_GRID, LNSessionCodes.ENTERPRISE_UNITS, structureCnxt.enterpriseUnit);

    const isPresent = await LNCommon.isRequiredRowPresent( LNSessionCodes.ENTERPRISE_UNITS, EnterpriseUnits_Lbl.ENTERPRISE_UNIT_GRID, EnterpriseUnits_Id.ENTERPRISE_UNIT_GRID, structureCnxt.enterpriseUnit);

    if (!isPresent) {
        // Click New
        await LNCommon.clickMainMenuItem(LNSessionCodes.ENTERPRISE_UNITS, LNMenuActions_Id.NEW);

        // Set Enterprise Unit
        await LNCommon.dataCellElement(await LNCommon.getDataCell(EnterpriseUnits_Lbl.ENTERPRISE_UNIT_GRID,EnterpriseUnits_Id.ENTERPRISE_UNIT_GRID,LNSessionCodes.ENTERPRISE_UNITS), 0, structureCnxt.enterpriseUnit);

        // Set Description
        structureCnxt.enterpriseUnitDesc= structureCnxt.enterpriseUnitDesc.replace('%s', '04');
        await LNCommon.dataCellElement(await LNCommon.getDataCell( EnterpriseUnits_Lbl.DESCRIPTION_GRID, EnterpriseUnits_Id.DESCRIPTION_GRID, LNSessionCodes.ENTERPRISE_UNITS), 0, structureCnxt.enterpriseUnitDesc);

        // Verify Logistic Company
        const logisticCompany= await LNCommon.getRequiredValueFromTheGrid(
        LNSessionCodes.ENTERPRISE_UNITS,EnterpriseUnits_Lbl.LOGISTIC_COMPANY_GRID,EnterpriseUnits_Id.LOGISTIC_COMPANY_GRID,0);

        expect(logisticCompany.trim()).toBe(structureCnxt.logisticCompany);

        await this.page.keyboard.press('Tab');

        // Click lookup for Financial Company
        await(await LNCommon.getTextboxLookUpIconInGrid( EnterpriseUnits_Lbl.FINANCIAL_COMPANY_GRID,EnterpriseUnits_Id.FINANCIAL_COMPANY_GRID, LNSessionCodes.ENTERPRISE_UNITS)).click();

        // Handle company selection
        await LNCommon.verifyDialogBoxWindow(LNSessionTabs.COMPANIES);

        await LNCommon.filterRequiredRecord( EnterpriseUnits_Lbl.COMPANY_ZOOM_GRID, EnterpriseUnits_Id.COMPANY_DESCRIPTION_ZOOM_GRID,LNSessionCodes.COMPANIES,structureCnxt.financeCompany);
        await LNCommon.selectRequiredRecord(LNSessionCodes.COMPANIES, EnterpriseUnits_Lbl.COMPANY_ZOOM_GRID,
					EnterpriseUnits_Id.COMPANY_DESCRIPTION_ZOOM_GRID, structureCnxt.financeCompany);
        await LNCommon.clickTextMenuItem(LNSessionCodes.COMPANIES, LNMenuActions_Id.OK,LNMenuActions_Lbl.OK);
        await this.page.keyboard.press('Tab');
        await LNCommon.dataCellElement(
        await LNCommon.getDataCell(EnterpriseUnits_Lbl.SITE_GRID,EnterpriseUnits_Id.SITE_GRID,LNSessionCodes.ENTERPRISE_UNITS),0, "");

        // Go to Details
        await LNCommon.drilldownRequiredRecord(LNSessionCodes.ENTERPRISE_UNITS,LNCommons.FIRST_RECORD);

        // Handle pop-up
        await LNCommon.validateMessageAndHandlePopUp(LNPopupMsg.NO_BUSINESS_PARTNER_ASSIGNED_TO_ENTERPRISE_UNIT.replace('%s', structureCnxt.enterpriseUnit),LNCommons.OK);

        await LNCommon.verifySessionTab(LNSessionTabs.ENTERPRISE_UNIT);

        await LNCommon.clickMainMenuItem(LNSessionCodes.ENTERPRISE_UNIT, LNMenuActions_Id.SAVE_AND_EXIT);
        await LNCommon.verifySessionTab(LNSessionTabs.ENTERPRISE_UNITS);
    }
    const createdUnit = await LNCommon.getRequiredValueFromTheGrid( LNSessionCodes.ENTERPRISE_UNITS, EnterpriseUnits_Lbl.ENTERPRISE_UNIT_GRID,EnterpriseUnits_Id.ENTERPRISE_UNIT_GRID, 0 );

    console.log(`=========>>>>> The Enterprise Unit is ${createdUnit} <<<<<=========`);

    await LNCommon.clickMainMenuItem(LNSessionCodes.ENTERPRISE_UNITS, LNMenuActions_Id.SAVE_AND_EXIT);

    await LNCommon.collapseLNModule(LNSessionTabs.MASTER_DATA);

    console.log('=========>>>>> Create an enterprise unit completed successfully <<<<<=========');
}

static async createPlanningCluster(planningClusters, planningClusterDescs) {
    console.log("=========>>>>> Create a planning cluster started <<<<<=========");

    // Navigating to Master Data --> Enterprise Model --> Enterprise Structure --> Planning Clusters
    await LNCommon.navigateToLNModule( LNSessionTabs.MASTER_DATA, LNSessionTabs.ENTERPRISE_MODEL, LNSessionTabs.ENTERPRISE_STRUCTURE, LNSessionTabs.PLANNING_CLUSTERS);

    // Verify Session Tab
    await LNCommon.verifySessionTab(LNSessionTabs.PLANNING_CLUSTERS);

    // Filter to check if record exists
    const planningCluster= planningClusters.replace('%s', "04");
    const planningClusterDesc= planningClusterDescs.replace('%s', "04");
    await LNCommon.filterRequiredRecord( PlanningClusters_Lbl.PLANNING_CLUSTER_GRID, PlanningClusters_Id.PLANNING_CLUSTER_GRID, LNSessionCodes.PLANNING_CLUSTERS, planningCluster);

    const isPresent = await LNCommon.isRequiredRowPresent( LNSessionCodes.PLANNING_CLUSTERS, PlanningClusters_Lbl.PLANNING_CLUSTER_GRID, PlanningClusters_Id.PLANNING_CLUSTER_GRID, planningCluster );

    if (!isPresent) {
        await LNCommon.clickMainMenuItem(LNSessionCodes.PLANNING_CLUSTERS, LNMenuActions_Id.NEW);

        await LNCommon.dataCellElement(await LNCommon.getDataCell(PlanningClusters_Lbl.PLANNING_CLUSTER_GRID,PlanningClusters_Id.PLANNING_CLUSTER_GRID, LNSessionCodes.PLANNING_CLUSTERS ), 0, planningCluster);

        await LNCommon.dataCellElement(await LNCommon.getDataCell(PlanningClusters_Lbl.PLANNING_CLUSTER_GRID, PlanningClusters_Id.PLANNING_CLUSTER_DESCRIPTION_GRID, LNSessionCodes.PLANNING_CLUSTERS ), 0, planningClusterDesc );

        await LNCommon.clickMainMenuItem(LNSessionCodes.PLANNING_CLUSTERS, LNMenuActions_Id.SAVE);
    }

    console.log(`=========>>>>> The Planning cluster is ${planningCluster} <<<<<=========`);

    await LNCommon.clickMainMenuItem(LNSessionCodes.PLANNING_CLUSTERS, LNMenuActions_Id.SAVE_AND_EXIT);

    // Close all LN Modules
    await LNCommon.collapseLNModule(LNSessionTabs.MASTER_DATA);

    console.log("=========>>>>> Create a planning cluster completed successfully <<<<<=========");
}

static async createSite(structureCnxt) {
  console.log("=========>>>>> Create a site started <<<<<=========");

  // Initializing page elements
  const lnPg = new LNPage(this.page);

  // Navigate to Master Data > Enterprise Model > Enterprise Structure > Sites
  await LNCommon.navigateToLNModule(LNSessionTabs.MASTER_DATA,LNSessionTabs.ENTERPRISE_MODEL,LNSessionTabs.ENTERPRISE_STRUCTURE,LNSessionTabs.SITES);

  // Verify Session Tab
  await LNCommon.verifySessionTab(LNSessionTabs.SITES);

  structureCnxt.site+="04";
  await LNCommon.filterRequiredRecord( Sites_Lbl.SITE_GRID,Sites_Id.SITE_GRID,LNSessionCodes.SITES,structureCnxt.site);

  const isPresent = await LNCommon.isRequiredRowPresent( LNSessionCodes.SITES, Sites_Lbl.SITE_GRID, Sites_Id.SITE_GRID,structureCnxt.site);

  if (!isPresent) {
    await LNCommon.clickMainMenuItem(LNSessionCodes.SITES, LNMenuActions_Id.NEW);
    await LNCommon.verifySessionTab(LNSessionTabs.SITE);

    await LNCommon.decoratorInputField( await LNCommon.getTextField(Sites_Lbl.SITE, Sites_Id.SITE, LNSessionCodes.SITE),structureCnxt.site);
    
    structureCnxt.siteDesc=structureCnxt.siteDesc.replace('%s', '04');
    await LNCommon.decoratorInputField(await LNCommon.getTextField(Sites_Lbl.SITE, Sites_Id.SITE_DESCRIPTION, LNSessionCodes.SITE),structureCnxt.siteDesc);

    structureCnxt.logisticCompany="3270";
    const logisticCompany = await (await LNCommon.getTextField(Sites_Lbl.LOGISTIC_COMPANY, Sites_Id.LOGISTIC_COMPANY, LNSessionCodes.SITE)).inputValue();
    expect(logisticCompany).toBe(structureCnxt.logisticCompany);

    await LNCommon.triggerInputField(await LNCommon.getTextField(Sites_Lbl.ADDRESS, Sites_Id.ADDRESS, LNSessionCodes.SITE),structureCnxt.addressCode);

      await expect(async () => {
          const streetName = await (await LNCommon.getTextField(Sites_Lbl.ADDRESS, Sites_Id.ADDRESS_DESCRIPTION, LNSessionCodes.SITE)).textContent();
          expect(streetName).toBe(structureCnxt.street);
      }).toPass({ timeout: 10000 });

    structureCnxt.planningCluster= structureCnxt.planningCluster.replace('%s', '04');
    await LNCommon.triggerInputField(await LNCommon.getTextField(Sites_Lbl.PLANNING_CLUSTER, Sites_Id.PLANNING_CLUSTER, LNSessionCodes.SITE),structureCnxt.planningCluster );

    structureCnxt.enterpriseUnit= structureCnxt.enterpriseUnit.replace('%s', '04');
    await LNCommon.triggerInputField(await LNCommon.getTextField(Sites_Lbl.ENTERPRISE_UNIT, Sites_Id.ENTERPRISE_UNIT, LNSessionCodes.SITE),structureCnxt.enterpriseUnit);

    await LNCommon.clickMainMenuItem(LNSessionCodes.SITE, LNMenuActions_Id.SAVE_AND_EXIT);
  }

  const siteCode = await LNCommon.getRequiredValueFromTheGrid( LNSessionCodes.SITES,Sites_Lbl.SITE_GRID, Sites_Id.SITE_GRID,0);
  console.log("=========>>>>> The Site code is " + siteCode + " <<<<<=========");

  const rowNo = await LNCommon.selectRequiredRecord( LNSessionCodes.SITES, Sites_Lbl.SITE_GRID,Sites_Id.SITE_GRID,structureCnxt.site);

  await LNCommon.drilldownRequiredRecord(LNSessionCodes.SITES, rowNo.toString());
  await LNCommon.verifySessionTab(LNSessionTabs.SITE);

  // Click Settings tab
  await LNCommon.selectHeaderTab(LNTabs.SETTINGS, LNSessionCodes.SITE);

  const warehousingElement = await lnPg.hyperlinkText(Sites_Lbl.WAREHOUSING_RDN,Sites_Id.WAREHOUSING_RDN,LNSessionCodes.SITE);

  const warehousingClass = await warehousingElement.getAttribute(ElementAttributes.CLASS);

  if (!warehousingClass.includes(LNCommons.CHECKED)) {
    await warehousingElement.click();

    await LNCommon.validateMessageAndHandlePopUp(
      LNPopupMsg.WAREHOUSING_SETINGS_ARE_NOT_PRESENT_FOR_SITE_DO_YOU_WANT_TO_CREATE_THEM.replace('%s',  structureCnxt.site),
      LNCommons.YES
    );

    await LNCommon.verifySessionTab(LNSessionTabs.WAREHOUSING_SETTINGS_BY_SITE);
    await LNCommon.selectHeaderTab(LNTabs.GENERAL, LNSessionCodes.WAREHOUSING_SETTINGS_BY_SITE);
    await LNCommon.selectCheckbox( Sites_Lbl.USE_GLOBAL_WAREHOUSING_PARAMETERS_CHK, Sites_Id.USE_GLOBAL_WAREHOUSING_PARAMETERS_CHK );
    await LNCommon.clickMainMenuItem(LNSessionCodes.WAREHOUSING_SETTINGS_BY_SITE, LNMenuActions_Id.SAVE_AND_EXIT);
    await LNCommon.verifySessionTab(LNSessionTabs.SITE);
  }

  const classFinal = await warehousingElement.getAttribute('class');
  expect(classFinal).toContain(LNCommons.CHECKED);

  await LNCommon.clickMainMenuItem(LNSessionCodes.SITE, LNMenuActions_Id.SAVE_AND_EXIT);
  await LNCommon.verifySessionTab(LNSessionTabs.SITES);
  await LNCommon.clickMainMenuItem(LNSessionCodes.SITES, LNMenuActions_Id.SAVE_AND_EXIT);
  await LNCommon.collapseLNModule(LNSessionTabs.MASTER_DATA);

  console.log("=========>>>>> Create a site completed successfully <<<<<=========");
}

static async createSalesOfficeAndWarehouse(structureCnxt) {
  console.log(">>>>>>> Create a sales office and warehouse started <<<<<<<<");

  // Navigate to Enterprise Units module
  await LNCommon.navigateToLNModule( LNSessionTabs.MASTER_DATA, LNSessionTabs.ENTERPRISE_MODEL, LNSessionTabs.ENTERPRISE_STRUCTURE, LNSessionTabs.ENTERPRISE_UNITS);

  await LNCommon.verifySessionTab(LNSessionTabs.ENTERPRISE_UNITS);
  await LNCommon.filterRequiredRecord(EnterpriseUnits_Lbl.ENTERPRISE_UNIT_GRID, EnterpriseUnits_Id.ENTERPRISE_UNIT_GRID, LNSessionCodes.ENTERPRISE_UNITS, structureCnxt.enterpriseUnit );

  const rowNo = await LNCommon.selectRequiredRecord(LNSessionCodes.ENTERPRISE_UNITS,EnterpriseUnits_Lbl.ENTERPRISE_UNIT_GRID,EnterpriseUnits_Id.ENTERPRISE_UNIT_GRID,structureCnxt.enterpriseUnit );
  await LNCommon.drilldownRequiredRecord(LNSessionCodes.ENTERPRISE_UNITS, rowNo);
  await LNCommon.verifySessionTab(LNSessionTabs.ENTERPRISE_UNIT);

  // Sales Office - Department Tab
  await LNCommon.selectGridTab(LNTabs.DEPARTMENTS, LNSessionCodes.ENTERPRISE_UNIT);
  await LNCommon.filterRequiredRecord( EnterpriseUnits_Lbl.DEPARTMENT_GRID, EnterpriseUnits_Id.DEPARTMENT_GRID, LNSessionCodes.DEPARTMENTS_SITE, structureCnxt.salesOffice);

  const deptExists = await LNCommon.isRequiredRowPresent( LNSessionCodes.DEPARTMENTS_SITE, EnterpriseUnits_Lbl.DEPARTMENT_GRID, EnterpriseUnits_Id.DEPARTMENT_GRID, structureCnxt.salesOffice);

  if (!deptExists) {
    await LNCommon.clickMainMenuItem(LNSessionCodes.DEPARTMENTS_SITE, LNMenuActions_Id.NEW);
    await LNCommon.verifyDialogBoxWindow(LNSessionTabs.SELECT_DEPARTMENT_TYPE);
    await LNCommon.clickAndSelectDropdownField( EnterpriseUnits_Lbl.SELECT_DEPARTMENT_TYPE_DRP, EnterpriseUnits_Id.SELECT_DEPARTMENT_TYPE_DRP, structureCnxt.departmentType);
    await LNCommon.clickTextMenuItem(LNSessionCodes.DEPARTMENTS_SITE, LNMenuActions_Id.OK_, LNMenuActions_Lbl.OK);
    await LNCommon.verifyDialogBoxWindow(LNSessionTabs.SALES_OFFICES);

    await LNCommon.triggerInputField(await LNCommon.getTextField( EnterpriseUnits_Lbl.SALES_OFFICE, EnterpriseUnits_Id.SALES_OFFICE, LNSessionCodes.SALES_OFFICES), structureCnxt.salesOffice);
    await LNCommon.decoratorInputField(await LNCommon.getTextField( EnterpriseUnits_Lbl.SALES_OFFICE_DESCRIPTION,EnterpriseUnits_Id.SALES_OFFICE_DESCRIPTION,LNSessionCodes.SALES_OFFICES ),structureCnxt.salesOfficeDesc);
    await LNCommon.triggerInputField(await LNCommon.getTextField(EnterpriseUnits_Lbl.SALES_OFFICE_ADDRESS,EnterpriseUnits_Id.SALES_OFFICE_ADDRESS, LNSessionCodes.SALES_OFFICES ), structureCnxt.addressCode);
    await LNCommon.triggerInputField( await LNCommon.getTextField(EnterpriseUnits_Lbl.PART_OF_SITE,EnterpriseUnits_Id.PART_OF_SITE, LNSessionCodes.SALES_OFFICES), structureCnxt.site);

    const eunitValue = await (await LNCommon.getTextField(EnterpriseUnits_Lbl.PART_OF_ENTERPRISE_UNIT,EnterpriseUnits_Id.PART_OF_ENTERPRISE_UNIT, LNSessionCodes.SALES_OFFICES)).getAttribute("value");
    expect(eunitValue).toBe(structureCnxt.enterpriseUnit);

    await LNCommon.clickTextMenuItem(LNSessionCodes.SALES_OFFICES, LNMenuActions_Id.OK, LNMenuActions_Lbl.OK);
    await LNCommon.verifySessionTab(LNSessionTabs.ENTERPRISE_UNIT);
  }

  expect(await LNCommon.isRequiredRowPresent(LNSessionCodes.DEPARTMENTS_SITE,EnterpriseUnits_Lbl.DEPARTMENT_GRID, EnterpriseUnits_Id.DEPARTMENT_GRID,structureCnxt.salesOffice)).toBe(true);

  await screenshot("Create a sales office");

  // Warehouse tab
  await LNCommon.selectGridTab(LNTabs.WAREHOUSES, LNSessionCodes.ENTERPRISE_UNIT);
  await LNCommon.filterRequiredRecord( EnterpriseUnits_Lbl.WAREHOUSE_GRID, EnterpriseUnits_Id.WAREHOUSE_GRID,LNSessionCodes.WAREHOUSES_SITE,structureCnxt.warehouse );

  const whExists = await LNCommon.isRequiredRowPresent( LNSessionCodes.WAREHOUSES_SITE,EnterpriseUnits_Lbl.WAREHOUSE_GRID,EnterpriseUnits_Id.WAREHOUSE_GRID,structureCnxt.warehouse);

  if (!whExists) {
    await LNCommon.clickMainMenuItem(LNSessionCodes.WAREHOUSES_SITE, LNMenuActions_Id.NEW);
    await LNCommon.verifySessionTab(LNSessionTabs.WAREHOUSES);

    await LNCommon.decoratorInputField(await LNCommon.getTextField(EnterpriseUnits_Lbl.WAREHOUSE, EnterpriseUnits_Id.WAREHOUSE, LNSessionCodes.WAREHOUSES ),structureCnxt.warehouse);
    await LNCommon.decoratorInputField(await LNCommon.getTextField( EnterpriseUnits_Lbl.WAREHOUSE, EnterpriseUnits_Id.WAREHOUSE_DESCRIPTION, LNSessionCodes.WAREHOUSES), structureCnxt.warehouseDesc);
    await LNCommon.triggerInputField(await LNCommon.getTextField(EnterpriseUnits_Lbl.SITE, EnterpriseUnits_Id.SITE, LNSessionCodes.WAREHOUSES),structureCnxt.site);
    await LNCommon.selectCheckbox(EnterpriseUnits_Lbl.USE_SITE_SETTINGS_CHK,EnterpriseUnits_Id.USE_SITE_SETTINGS_CHK);
    await LNCommon.triggerInputField( await LNCommon.getTextField(EnterpriseUnits_Lbl.WAREHOUSE_ADDRESS, EnterpriseUnits_Id.WAREHOUSE_ADDRESS, LNSessionCodes.WAREHOUSES ),structureCnxt.addressCode);

    await LNCommon.clickMainMenuItem(LNSessionCodes.WAREHOUSES, LNMenuActions_Id.SAVE_AND_EXIT);
    await LNCommon.verifySessionTab(LNSessionTabs.ENTERPRISE_UNIT);
  }

  expect( await LNCommon.isRequiredRowPresent( LNSessionCodes.WAREHOUSES_SITE,EnterpriseUnits_Lbl.WAREHOUSE_GRID, EnterpriseUnits_Id.WAREHOUSE_GRID,structureCnxt.warehouse)).toBe(true);

  await screenshot("Create a warehouse");

  await LNCommon.clickMainMenuItem(LNSessionCodes.ENTERPRISE_UNIT, LNMenuActions_Id.SAVE_AND_EXIT);
  await LNCommon.verifySessionTab(LNSessionTabs.ENTERPRISE_UNITS);
  await LNCommon.clickMainMenuItem(LNSessionCodes.ENTERPRISE_UNITS, LNMenuActions_Id.SAVE_AND_EXIT);
  await LNCommon.collapseLNModule(LNSessionTabs.MASTER_DATA);

  console.log(">>>>>>> Create a sales office and warehouse completed successfully <<<<<<<<");
}

static async createSalesSettingBySite(structureCnxt) {
  console.log("=========>>>>> Create a sales setting by site started <<<<<=========");

  const lnPg=new LNPage(this.page);

  // Navigate to Master Data > Enterprise Model > Enterprise Structure > Sites
  await LNCommon.navigateToLNModule(LNSessionTabs.MASTER_DATA,LNSessionTabs.ENTERPRISE_MODEL,LNSessionTabs.ENTERPRISE_STRUCTURE,LNSessionTabs.SITES);
  // Verify Session Tab
  await LNCommon.verifySessionTab(LNSessionTabs.SITES);

  // Filter by Site
  await LNCommon.filterRequiredRecord(Sites_Lbl.SITE_GRID,Sites_Id.SITE_GRID,LNSessionCodes.SITES,structureCnxt.site);

  // Select and drill into site
  const rowNo = await LNCommon.selectRequiredRecord(LNSessionCodes.SITES,Sites_Lbl.SITE_GRID,Sites_Id.SITE_GRID,structureCnxt.site);
  await LNCommon.drilldownRequiredRecord(LNSessionCodes.SITES, rowNo.toString());

  // Verify inside Site session
  await LNCommon.verifySessionTab(LNSessionTabs.SITE);

  // Click the Settings tab
  await LNCommon.selectHeaderTab(LNTabs.SETTINGS, LNSessionCodes.SITE);

  // Check if Sales settings already exist
  const salesIconClass = await LNCommon.getDynamicElement(LNPage.hyperlinkText,Sites_Lbl.SALES_RDN,Sites_Id.SALES_RDN,LNSessionCodes.SITE).getAttribute("class");

  if (!salesIconClass.includes(LNCommons.CHECKED)) {
    // Click Sales button
    await LNPage.hyperlinkText(Sites_Lbl.SALES_RDN,Sites_Id.SALES_RDN,LNSessionCodes.SITE).click();

    // Handle confirmation popup
    await LNCommon.validateMessageAndHandlePopUp(`Sales settings are not present for site ${structureCnxt.site}. Do you want to create them?`,LNCommons.YES);

    // Wait for Sales Settings tab
    await LNCommon.verifySessionTab(LNSessionTabs.SALES_SETTINGS_BY_SITE);

    // Go to General tab
    await LNCommon.selectHeaderTab(LNTabs.GENERAL, LNSessionCodes.SALES_SETTINGS_BY_SITE);

    // Select checkbox: Use Global Sales Parameters
    await LNCommon.selectCheckbox(Sites_Lbl.USE_GLOBAL_SALES_PARAMETERS_CHK,Sites_Id.USE_GLOBAL_SALES_PARAMETERS_CHK);

    // Save and exit from Sales Settings
    await LNCommon.clickMainMenuItem(LNSessionCodes.SALES_SETTINGS_BY_SITE,LNMenuActions_Id.SAVE_AND_EXIT);

    // Back to Site session
    await LNCommon.verifySessionTab(LNSessionTabs.SITE);
  }

  // Verify the green check icon exists
  const finalClass = await LNPage.hyperlinkText(Sites_Lbl.SALES_RDN,Sites_Id.SALES_RDN,LNSessionCodes.SITE).getAttribute("class");

  expect(finalClass).toContain(LNCommons.CHECKED);

  // Screenshot
  await screenshot("Create a sales setting by site");

  // Save and exit from Site and Sites sessions
  await LNCommon.clickMainMenuItem(LNSessionCodes.SITE, LNMenuActions_Id.SAVE_AND_EXIT);
  await LNCommon.verifySessionTab(LNSessionTabs.SITES);
  await LNCommon.clickMainMenuItem(LNSessionCodes.SITES, LNMenuActions_Id.SAVE_AND_EXIT);

  // Collapse Master Data menu
  await LNCommon.collapseLNModule(LNSessionTabs.MASTER_DATA);

  console.log("=========>>>>> Create a sales setting by site completed successfully <<<<<=========");
}

/*------------------------------------------------------------------------
 * Objective : Review the new site details in the Enterprise Model Workbench
 * Workbook  : LN Cloud: Configuring Multisite Environment
 * Exercise  : 1.4.7
 *------------------------------------------------------------------------*/
static async reviewNewSiteDetailsInEnterpriseModelWorkbench(structureCnxt) {
   
    const emwPg=new EnterpriseModelWorkbenchPage(this.page);
    // Navigating to Master Data --> Enterprise Model --> Enterprise Model Workbench
    await LNCommon.navigateToLNModule(LNSessionTabs.MASTER_DATA, LNSessionTabs.ENTERPRISE_MODEL,
        LNSessionTabs.ENTERPRISE_MODEL_WORKBENCH);

    // Verify Session Tab is open
    await LNCommon.verifySessionTab(LNSessionTabs.ENTERPRISE_MODEL_WORKBENCH);

    // Verify the Enterprise Structure pane
    await expect(emwPg.headerLayoutPanel(EnterpriseModelWorkbench_Lbl.ENTERPRISE_STRUCTURE)).toBeVisible();

    // Click + icon for United States entity
    await emwPg.expandSite(structureCnxt.entity).click();

    // Click + icon for AUS_ST[XX] site
    await emwPg.expandButton(structureCnxt.site).hover();
    await emwPg.expandButton(structureCnxt.site).click();

    // Validate sales office and warehouse entries
    for (let i = 0; i < structureCnxt.offices.length; i++) {
        await expect(emwPg.offices(structureCnxt.offices[i])).toBeVisible();
    }

    // Click to highlight Sales Office
    await emwPg.offices(structureCnxt.offices[0]).click();
    await this.page.waitForTimeout(2000);

    // Verify the Details pane is visible
    await expect(emwPg.headerLayoutPanel(EnterpriseModelWorkbench_Lbl.DETAILS)).toBeVisible();

    // Verify info inside the Details pane
    await expect(emwPg.paneOptionLabel(structureCnxt.salesOffice)).toBeVisible();

    // Screenshot
    await this.page.screenshot({ path: 'screenshots/reviewNewSiteDetails.png' });

    // Close tab and module
    await LNSessionTabActions.closeTab(LNSessionTabs.ENTERPRISE_MODEL_WORKBENCH);
    await LNCommon.collapseLNModule(LNSessionTabs.MASTER_DATA);
}
/* -------------------------------------------------------------------------------------
* Objective : Review the item at an enterprise level
* Workbook  : LN Cloud: Configuring Multisite Environment
* Exercises : 2.1.1
* -------------------------------------------------------------------------------------*/
static async reviewItemAtEnterpriseLevel(itemCnxt) {

  console.log("=========>>>>> Review the item at an enterprise level started <<<<<=========");

  // Navigate to Master Data > Items > Items
  await LNCommon.navigateToLNModule(LNSessionTabs.MASTER_DATA,LNSessionTabs.ITEMS,LNSessionTabs.ITEMS );
  // Verify session tab is loaded
  await LNCommon.verifySessionTab(LNSessionTabs.ITEMS);

  // Filter the record by second segment value (e.g., MS200)
  await LNCommon.filterRequiredRecord(Items_Lbl.ITEM_GRID,Items_Id.ITEM_SEG_2_GRID,LNSessionCodes.ITEMS, itemCnxt.items[0]);

  // Select the filtered row
  const rowNo = await LNCommon.selectRequiredRecord(LNSessionCodes.ITEMS,Items_Lbl.ITEM_GRID,Items_Id.ITEM_SEG_2_GRID,itemCnxt.items[0]);
  await LNCommon.drilldownRequiredRecord(LNSessionCodes.ITEMS,rowNo.toString());

  // Verify session tab is now on ITEM detail page
  await LNCommon.verifySessionTab(LNSessionTabs.ITEM);

  // Assert header shows the correct item
  await expect(async () => {
    const itemVal = await (await LNCommon.getTextField(Items_Lbl.ITEM,Items_Id.ITEM_SEC,LNSessionCodes.ITEM)).inputValue();
    expect(itemVal).toBe(itemCnxt.items[0]);
  }).toPass({ timeout: 20000 });

  // Go to 'Sites' tab at bottom and validate site data exists
  await LNCommon.selectGridTab(LNTabs.SITES, LNSessionCodes.ITEM);
  
  // Validate that at least one site is present
  const siteVal = await LNCommon.getRequiredValueFromTheGrid(LNSessionCodes.ITEMS_BY_SITE,Items_Lbl.SITE_GRID,Items_Id.SITES_GRID,0);
  expect(siteVal).not.toBe(""); 

  console.log("=========>>>>> Review the item at an enterprise level completed successfully <<<<<=========");
}

// -------------------------------------------------------------------------------------
// Objective : Review the domain-specific data
// Workbook  : LN Cloud: Configuring Multisite Environment
// Exercises : 2.1.2
// -------------------------------------------------------------------------------------

static async reviewDomainSpecificData() {

  console.log("=========>>>>> Review the domain-specific data started <<<<<=========");
  
  // Intializing the page
  const lnPg=new LNPage(this.page);

  // Assert Subentities section is present
  expect(await this.isElementPresent(await lnPg.verifyHeader(Items_Lbl.SUBENTITIES))).toBeTruthy();

  // Verify that Sales section is enabled (green check class exists)
  const salesLocator = await lnPg.hyperlinkText(Items_Lbl.SALES_TEXT_BUTTON, Items_Id.SALES_TEXT_BUTTON, LNSessionCodes.ITEM);
  expect(await salesLocator.getAttribute(ElementAttributes.CLASS)).toContain(LNCommons.CHECKED);

  // Verify that Service section is NOT enabled (no green check class)
  const serviceLocator = await lnPg.hyperlinkText(Items_Lbl.SERVICE_TEXT_BUTTON, Items_Id.SERVICE_BTN, LNSessionCodes.ITEM);
  expect(await serviceLocator.getAttribute(ElementAttributes.CLASS)).not.toContain(LNCommons.CHECKED);

  console.log("=========>>>>> Review the domain-specific data completed successfully <<<<<=========");
}
    /*-------------------------------------------------------------------------------------
	 * Objective : Review Purchase Data for the Item
	 * Workbook	 : LN Cloud: Configuring Multisite Environment
	 * Exercises : 2.1.3
	 * ------------------------------------------------------------------------------------*/
static async reviewPurchaseDataForItem(itemCnxt) {

  console.log("=========>>>>> Review Purchase Data for the Item started <<<<<=========");

   // Initialize the page
   const lnPg=new LNPage(this.page);

  //Ensure 'Subentities' section is visible
  expect(await this.isElementPresent(await lnPg.verifyHeader(Items_Lbl.SUBENTITIES))).toBeTruthy();

  // Click 'Purchase' button inside Subentities
  await (await lnPg.hyperlinkText(Items_Lbl.PURCHASE_BTN,Items_Id.PURCHASE_BTN,LNSessionCodes.ITEM)).click();

  // Wait for Purchase dialog session
  await LNCommon.verifyDialogBoxWindow(LNSessionTabs.ITEM_PURCHASE);

  // Verify header field has correct item value
  const itemHeaderField = await LNCommon.getTextField(Items_Lbl.ITEM_SEC_SEG_ITEM_PURCHASE,Items_Id.ITEM_SEC_SEG_ITEM_PURCHASE,LNSessionCodes.ITEM_PURCHASE);
  expect(await itemHeaderField.inputValue()).toBe(itemCnxt.items[0]);

  // Tab: Site-wise purchase data
  await LNCommon.selectGridTab(LNTabs.SITES, LNSessionCodes.ITEM_PURCHASE);
  await this.page.screenshot({ path: 'purchase_data_by_site.png' });

  // Tab: Office-wise purchase data
  await LNCommon.selectGridTab(LNTabs.OFFICES, LNSessionCodes.ITEM_PURCHASE);
  await this.page.screenshot({ path: 'purchase_data_by_office.png' });

  // Tab: Business Partner-wise purchase data
  await LNCommon.selectGridTab(LNTabs.ITEM_BUSINESS_PARTNER, LNSessionCodes.ITEM_PURCHASE);
  await this.page.screenshot({ path: 'purchase_data_by_bp.png' });

  // Close the Item - Purchase session
  await (await lnPg.closeButton(LNSessionCodes.ITEM_PURCHASE)).click();

  // Verify it returned back to the ITEM session
  await LNCommon.verifySessionTab(LNSessionTabs.ITEM);

  console.log("=========>>>>> Review Purchase Data for the Item completed successfully <<<<<=========");
}
/*-------------------------------------------------------------------------------------
* Objective : Review sales office for the item
* Workbook	 : LN Cloud: Configuring Multisite Environment
* Exercises : 2.1.4
* ------------------------------------------------------------------------------------*/
static async reviewSalesOfficeForItem() {
  console.log("=========>>>>> Review sales office for the item started <<<<<=========");
  
  // Intialize the page
  const lnPg=new LNPage(this.page);

  // Ensure 'Subentities' section is visible
  expect(await this.isElementPresent(await lnPg.verifyHeader(Items_Lbl.SUBENTITIES))).toBeTruthy();

  // Click 'Sales' button in Subentities section
  await (await lnPg.hyperlinkText(Items_Lbl.SALES_TEXT_BUTTON,Items_Id.SALES_TEXT_BUTTON,LNSessionCodes.ITEM)).click();

  // Wait for Item - Sales session
  await LNCommon.verifyDialogBoxWindow(LNSessionTabs.ITEM_SALES);

  // Select 'Offices' tab in the sales session
  await LNCommon.selectGridTab(LNTabs.OFFICES, LNSessionCodes.ITEM_SALES);

  // Check that the sales office grid has records
  const salesOfficeValue = await LNCommon.getRequiredValueFromTheGrid(LNSessionCodes.ITEMS_SALES_BY_OFFICE,Items_Lbl.SALES_OFFICE_GRID,Items_Id.SALES_OFFICE_GRID,0);
  expect(salesOfficeValue).not.toBe("");

  // Screenshot for validation
  await this.page.screenshot({ path: 'review_sales_office_for_item.png' });

  // Close Item - Sales session
  await (await lnPg.closeButton(LNSessionCodes.ITEM_SALES)).click();

  // Verify return to Item session
  await LNCommon.verifySessionTab(LNSessionTabs.ITEM);

  // Close Item session
  await LNSessionTabActions.closeTab(LNSessionTabs.ITEM);

  // Confirm return to Items session
  await LNCommon.verifySessionTab(LNSessionTabs.ITEMS);

  console.log("=========>>>>> Review sales office for the item completed successfully <<<<<=========");
}

/* -------------------------------------------------------------------------------------
* Objective : Review standard costs by enterprise unit
* Workbook  : LN Cloud: Configuring Multisite Environment
* Exercises : 2.1.5
* -------------------------------------------------------------------------------------*/
static async reviewStandardCostsByEnterpriseUnit(itemCnxt) {
  console.log("=========>>>>> Review standard costs by enterprise unit started <<<<<=========");

  // Intialize the page
  const lnPg = new LNPage(this.page);

  //Filter item MS5000-2
  await LNCommon.filterRequiredRecord(Items_Lbl.ITEM_GRID,Items_Id.ITEM_SEG_2_GRID,LNSessionCodes.ITEMS,itemCnxt.items[1]);

  const rowNo = await LNCommon.selectRequiredRecord(LNSessionCodes.ITEMS,Items_Lbl.ITEM_GRID,Items_Id.ITEM_SEG_2_GRID,itemCnxt.items[1]);
  await LNCommon.drilldownRequiredRecord(LNSessionCodes.ITEMS, String(rowNo));

  // Verify in ITEM session and click 'Enterprise Units' tab
  await LNCommon.verifySessionTab(LNSessionTabs.ITEM);
  await LNCommon.selectGridTab(LNTabs.ENTERPRISE_UNITS, LNSessionCodes.ITEM);

  // Validate costing details in grid for each enterprise unit
  for (let i = 0; i < itemCnxt.enterpriseUnitsDesc.length; i++) {
    const unitDesc = itemCnxt.enterpriseUnitsDesc[i];

    // Select row by enterprise unit description
    await LNCommon.moveToRequiredColumnHeader(LNSessionCodes.ITEM_COSTING,Items_Id.ENTERPRISE_UNIT_SEC_SEG_GRID,Items_Lbl.ENTERPRISE_UNIT_GRID);
    const rowIndex = await LNCommon.selectRequiredRecord(LNSessionCodes.ITEM_COSTING,Items_Lbl.ENTERPRISE_UNIT_GRID,Items_Id.ENTERPRISE_UNIT_SEC_SEG_GRID,unitDesc);

    // Costing Source check
    await LNCommon.moveToRequiredColumnHeader(LNSessionCodes.ITEM_COSTING,Items_Id.COSTING_SOURCE_GRID,Items_Lbl.COSTING_SOURCE_GRID);
    const costingSource = await LNCommon.getRequiredValueFromTheGrid(LNSessionCodes.ITEM_COSTING,Items_Lbl.COSTING_SOURCE_GRID,Items_Id.COSTING_SOURCE_GRID,rowIndex);
    expect(costingSource).not.toBe("");

    // Standard Cost value
    await LNCommon.moveToRequiredColumnHeader(LNSessionCodes.ITEM_COSTING,Items_Id.STANDARD_COST_CURRENCY_GRID,Items_Lbl.STANDARD_COST_GRID);
    const stdCost = await LNCommon.getRequiredValueFromTheGrid(LNSessionCodes.ITEM_COSTING,Items_Lbl.STANDARD_COST_GRID,Items_Id.STANDARD_COST_GRID,rowIndex);
    expect(stdCost).not.toBe("");

    // Standard Cost currency
    const currency = await LNCommon.getRequiredValueFromTheGrid(LNSessionCodes.ITEM_COSTING,Items_Lbl.STANDARD_COST_GRID,Items_Id.STANDARD_COST_CURRENCY_GRID,rowIndex);
    expect(currency).not.toBe("");

    // Supplying EU validation for BER and MUNICH
    await LNCommon.moveToRequiredColumnHeader(LNSessionCodes.ITEM_COSTING,Items_Id.SUPPLYING_ENTERPRISE_UNIT_GRID,Items_Lbl.SUPPLYING_ENTERPRISE_UNIT_GRID);

    const supplyingEU = await LNCommon.getRequiredValueFromTheGrid(LNSessionCodes.ITEM_COSTING,Items_Lbl.SUPPLYING_ENTERPRISE_UNIT_GRID,Items_Id.SUPPLYING_ENTERPRISE_UNIT_GRID,rowIndex);

    if (i === 2 || i === 3) {
      // Expect Amsterdam (itemCnxt.enterpriseUnitsDesc[1]) as supplying EU
      expect(supplyingEU).toBe(itemCnxt.enterpriseUnitsDesc[1]);
    } else {
      // For BOSTON and AMSTERDAM, it should be empty
      expect(supplyingEU).toBe("");
    }
  }

  // Drill into each enterprise unit and verify costing source + components
  for (let i = 0; i < itemCnxt.enterpriseUnits.length; i++) {
    const unitCode = itemCnxt.enterpriseUnits[i];
    const expectedSource = itemCnxt.costingSourceDrp[i];

    await LNCommon.moveToRequiredColumnHeader(LNSessionCodes.ITEM_COSTING,Items_Id.ENTERPRISE_UNIT_SEC_SEG_GRID,Items_Lbl.ENTERPRISE_UNIT_GRID);
    const row = await LNCommon.selectRequiredRecord(LNSessionCodes.ITEM_COSTING,Items_Lbl.ENTERPRISE_UNIT_GRID,Items_Id.ENTERPRISE_UNIT_GRID,unitCode);
    await LNCommon.drilldownRequiredRecord(LNSessionCodes.ITEM_COSTING, String(row));

    await LNCommon.verifySessionTab(LNSessionTabs.ITEM_COSTING);

    // Verify costing source matches expected
    await LNCommon.clickAndSelectDropdownField(Items_Lbl.COSTING_SOURCE_DRP,Items_Id.COSTING_SOURCE_DRP,expectedSource);

    // Verify 'Cost Components' section exists
    const costComponentHeader = await lnPg.verifyHeader(Items_Lbl.COST_COMPONENTS);
    await expect(costComponentHeader).toBeVisible();

    // Close Item - Costing session
    await LNSessionTabActions.closeTab(LNSessionTabs.ITEM_COSTING);
    await LNCommon.verifySessionTab(LNSessionTabs.ITEM);
  }

  // Step 5: Screenshot full summary and cleanup
  await this.page.screenshot({ path: 'standard_costs_by_enterprise_unit.png' });

  await LNSessionTabActions.closeTab(LNSessionTabs.ITEM);
  await LNSessionTabActions.closeTab(LNSessionTabs.ITEMS);
  await LNCommon.collapseLNModule(LNSessionTabs.MASTER_DATA);

  console.log("=========>>>>> Review standard costs by enterprise unit completed successfully <<<<<=========");
}

}

export default LNMasterData;