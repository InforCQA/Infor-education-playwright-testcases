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
import ItemsBySite_Id from "../constants/elementIds/ItemsBySite_Id";
import ItemsBySite_Lbl from "../constants/elementLbls/ItemsBySite_Lbl";
import { console } from "inspector";
import Items_Id from "../constants/elementIds/Items_Id";
import Items_Lbl from "../constants/elementLbls/Items_Lbl";
import CalculateStandardCost_Lbl from "../constants/elementLbls/CalculateStandardCostLbl ";
import CalculateStandardCost_Id from "../constants/elementIds/CalculateStandardCost_Id ";

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
    await LNCommon.filterRequiredRecord( PlanningClusters_Lbl.PLANNING_CLUSTER_GRID, PlanningClusters_Id.PLANNING_CLUSTER_GRID, LNSessionCodes.PLANNING_CLUSTERS, planningCluster);

    const isPresent = await LNCommon.isRequiredRowPresent( LNSessionCodes.PLANNING_CLUSTERS, PlanningClusters_Lbl.PLANNING_CLUSTER_GRID, PlanningClusters_Id.PLANNING_CLUSTER_GRID, planningCluster );

    if (!isPresent) {
        await LNCommon.clickMainMenuItem(LNSessionCodes.PLANNING_CLUSTERS, LNMenuActions_Id.NEW);

        await LNCommon.dataCellElement(await LNCommon.getDataCell(PlanningClusters_Lbl.PLANNING_CLUSTER_GRID,PlanningClusters_Id.PLANNING_CLUSTER_GRID, LNSessionCodes.PLANNING_CLUSTERS ), 0, planningClusters);

        await LNCommon.dataCellElement(await LNCommon.getDataCell(PlanningClusters_Lbl.PLANNING_CLUSTER_GRID, PlanningClusters_Id.PLANNING_CLUSTER_DESCRIPTION_GRID, LNSessionCodes.PLANNING_CLUSTERS ), 0, planningClusterDescs );

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

  await LNCommon.filterRequiredRecord( Sites_Lbl.SITE_GRID,Sites_Id.SITE_GRID,LNSessionCodes.SITES,structureCnxt.site);

  const isPresent = await LNCommon.isRequiredRowPresent( LNSessionCodes.SITES, Sites_Lbl.SITE_GRID, Sites_Id.SITE_GRID,structureCnxt.site);

  if (!isPresent) {
    await LNCommon.clickMainMenuItem(LNSessionCodes.SITES, LNMenuActions_Id.NEW);
    await LNCommon.verifySessionTab(LNSessionTabs.SITE);

    await LNCommon.decoratorInputField( await LNCommon.getTextField(Sites_Lbl.SITE, Sites_Id.SITE, LNSessionCodes.SITE),structureCnxt.site);
    
    await LNCommon.decoratorInputField(await LNCommon.getTextField(Sites_Lbl.SITE, Sites_Id.SITE_DESCRIPTION, LNSessionCodes.SITE),structureCnxt.siteDesc);

    const logisticCompany = await (await LNCommon.getTextField(Sites_Lbl.LOGISTIC_COMPANY, Sites_Id.LOGISTIC_COMPANY, LNSessionCodes.SITE)).inputValue();
    expect(logisticCompany).toBe(structureCnxt.logisticCompany);

    await LNCommon.triggerInputField(await LNCommon.getTextField(Sites_Lbl.ADDRESS, Sites_Id.ADDRESS, LNSessionCodes.SITE),structureCnxt.addressCode);

      await expect(async () => {
          const streetName = await (await LNCommon.getTextField(Sites_Lbl.ADDRESS, Sites_Id.ADDRESS_DESCRIPTION, LNSessionCodes.SITE)).textContent();
          expect(streetName).toBe(structureCnxt.street);
      }).toPass({ timeout: 10000 });

    await LNCommon.triggerInputField(await LNCommon.getTextField(Sites_Lbl.PLANNING_CLUSTER, Sites_Id.PLANNING_CLUSTER, LNSessionCodes.SITE),structureCnxt.planningCluster );

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

    try {
        await expect(warehousingElement).toContainClass('DashboardButton-checked', { timeout: 5000 });

    } catch (e) {
        console.log('Checked class not found');
    }

    let warehousingClass = await warehousingElement.evaluate(el =>
        el instanceof SVGElement
            ? el.className.baseVal
            : el.className
    );

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

    const eunitValue = await (await LNCommon.getTextField(EnterpriseUnits_Lbl.PART_OF_ENTERPRISE_UNIT,EnterpriseUnits_Id.PART_OF_ENTERPRISE_UNIT, LNSessionCodes.SALES_OFFICES)).inputValue();
    expect(eunitValue).toBe(structureCnxt.enterpriseUnit);

    await LNCommon.clickTextMenuItem(LNSessionCodes.SALES_OFFICES, LNMenuActions_Id.OK, LNMenuActions_Lbl.OK);
    await LNCommon.verifySessionTab(LNSessionTabs.ENTERPRISE_UNIT);
  }

  expect(await LNCommon.isRequiredRowPresent(LNSessionCodes.DEPARTMENTS_SITE,EnterpriseUnits_Lbl.DEPARTMENT_GRID, EnterpriseUnits_Id.DEPARTMENT_GRID,structureCnxt.salesOffice)).toBe(true);

  // Warehouse tab
  await LNCommon.selectGridTab(LNTabs.WAREHOUSES, LNSessionCodes.ENTERPRISE_UNIT);

  await LNCommon.filterRequiredRecord( EnterpriseUnits_Lbl.WAREHOUSE_GRID, EnterpriseUnits_Id.WAREHOUSE_GRID,LNSessionCodes.WAREHOUSES_SITE,structureCnxt.warehouse);

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

  
  const salesIconClass = await lnPg.hyperlinkText(Sites_Lbl.SALES_RDN,Sites_Id.SALES_RDN,LNSessionCodes.SITE);

      try {
        await expect(salesIconClass).toContainClass('DashboardButton-checked', { timeout: 5000 });

    } catch (e) {
         console.log('Checked class not found');
    }

    let salesClass = await salesIconClass.evaluate(el =>
        el instanceof SVGElement
            ? el.className.baseVal
            : el.className
    );

  if (!salesClass.includes(LNCommons.CHECKED)) {
    // Click Sales button
    await (await lnPg.hyperlinkText(Sites_Lbl.SALES_RDN,Sites_Id.SALES_RDN,LNSessionCodes.SITE)).click();

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
  const finalClass = await (await lnPg.hyperlinkText(Sites_Lbl.SALES_RDN,Sites_Id.SALES_RDN,LNSessionCodes.SITE)).getAttribute("class");

  expect(finalClass).toContain(LNCommons.CHECKED);

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
    const isPresent = await LNCommon.isElementPresent(await
                emwPg.headerLayoutPanel(EnterpriseModelWorkbench_Lbl.ENTERPRISE_STRUCTURE));
    expect(isPresent).toBeTruthy();

    // Click + icon for United States entity
    await emwPg.expandSite(structureCnxt.entity).click();

    // Click + icon for AUS_ST[XX] site
    await emwPg.expandButton(structureCnxt.site).hover();
    await emwPg.expandButton(structureCnxt.site).click();

    // Validate sales office and warehouse entries
    for (let i = 0; i < structureCnxt.offices.length; i++) {
        console.log(structureCnxt.offices[i]);
        const isPresent = await LNCommon.isElementPresent(await
            emwPg.offices(structureCnxt.offices[i]));
        expect(isPresent).toBeTruthy();
    }

    // Click to highlight Sales Office
    await emwPg.offices(structureCnxt.offices[0]).click();

    // Verify the Details pane is visible
    expect(await LNCommon.isElementPresent(await emwPg.headerLayoutPanel(EnterpriseModelWorkbench_Lbl.DETAILS))).toBeTruthy();
    

    // Verify info inside the Details pane
    expect(await LNCommon.isElementPresent(await emwPg.paneOptionLabel(structureCnxt.salesOffice))).toBeTruthy();

    // Screenshot
    await this.page.screenshot({ path: 'screenshots/reviewNewSiteDetails.png' });

    // Close tab and module
    await LNSessionTabActions.closeTab(LNSessionTabs.ENTERPRISE_MODEL_WORKBENCH);
    await LNCommon.collapseLNModule(LNSessionTabs.MASTER_DATA);
}

    static async reviewItemBySiteAndUpdatePurchasePrice(itemsBySiteCnxt) {

        // Initializing page elements
	    const lnPg =new LNPage(this.page);
        
        console.log("=========>>>>> Review item by site and update purchase price started <<<<<=========");

        await LNCommon.navigateToLNModule(LNSessionTabs.MASTER_DATA, LNSessionTabs.ITEMS, LNSessionTabs.ITEMS_BY_SITE);
        await LNCommon.verifySessionTab(LNSessionTabs.ITEMS_BY_SITE);
        await LNCommon.clickMainMenuItem(LNSessionCodes.ITEMS_BY_SITE, LNMenuActions_Id.SEARCH);

        // Verify Dialogbox title
        await LNCommon.verifyDialogBoxWindow(LNSessionTabs.ITEMS_BY_SITE_SEARCH);

        await LNCommon.clickTextMenuItem(LNSessionCodes.ITEMS_BY_SITE, LNMenuActions_Id.CLEAR_FIELDS, LNMenuActions_Lbl.CLEAR_FIELDS);
        await LNCommon.selectRadioBtn(ItemsBySite_Lbl.SITE_ITEM_RDN, ItemsBySite_Id.SITE_ITEM_RDN);
        await LNCommon.triggerInputField(
				await LNCommon.getTextField(ItemsBySite_Lbl.SITE, ItemsBySite_Id.SITE, LNSessionCodes.ITEMS_BY_SITE),
				itemsBySiteCnxt.site);
		await LNCommon.clickTextMenuItem(LNSessionCodes.ITEMS_BY_SITE, LNMenuActions_Id.OK, LNMenuActions_Lbl.OK);
        
        // Verify Session Tab
        await LNCommon.verifySessionTab(LNSessionTabs.ITEMS_BY_SITE);

        // filter
        await LNCommon.filterRequiredRecord(ItemsBySite_Lbl.ITEM_GRID, ItemsBySite_Id.ITEM_SEGMENT_TWO_GRID,
				LNSessionCodes.ITEMS_BY_SITE, itemsBySiteCnxt.item[0]);
		await LNCommon.filterRequiredRecord(ItemsBySite_Lbl.ITEM_GRID, ItemsBySite_Id.ITEM_DESCRIPTION_GRID,
				LNSessionCodes.ITEMS_BY_SITE, itemsBySiteCnxt.itemDesc);
		await LNCommon.drilldownRequiredRecord(LNSessionCodes.ITEMS_BY_SITE, LNCommons.FIRST_RECORD);
       
        // Verify Session Tab
        await LNCommon.verifySessionTab(LNSessionTabs.ITEMS_BY_SITE);

        // Verifying the Use Global Item checkbox
        expect(await this.isElementPresent(await lnPg.selectCheckboxLabel(
						ItemsBySite_Lbl.USE_GLOBAL_ITEM_CHK, ItemsBySite_Id.USE_GLOBAL_ITEM_CHK))).toBeTruthy();
        
        // Click Purchase button in Subentities section                
        expect(await this.isElementPresent(await lnPg.verifyHeader(ItemsBySite_Lbl.SUBENTITIES))).toBeTruthy();

        await (await lnPg.hyperlinkText(ItemsBySite_Lbl.PURCHASE_BUTTON, ItemsBySite_Id.PURCHASE_BUTTON,
				LNSessionCodes.ITEMS_BY_SITE)).click();
        
        // Verify Dialogbox title
        await LNCommon.verifyDialogBoxWindow(LNSessionTabs.ITEMS_PURCHASE_BY_SITE);

        // Verifying the details in tabs
        const tabs = [LNTabs.RECEIVING, LNTabs.ACTUAL_ITEM_PRICES];
        const headers = [ItemsBySite_Lbl.RECEIPT, ItemsBySite_Lbl.PURCHASE_PRICES];

        for (let i = 0; i < tabs.length; i++) {
            await LNCommon.selectHeaderTab(tabs[i], LNSessionCodes.ITEMS_PURCHASE_BY_SITE);

            expect(await this.isElementPresent(await lnPg.verifyHeader(headers[i]))).toBeTruthy();
        }

        await LNCommon.selectHeaderTab(LNTabs.BUYING, LNSessionCodes.ITEMS_PURCHASE_BY_SITE);

        // Verifying the Sections in Buying tab
		const sections = [ItemsBySite_Lbl.GENERAL, ItemsBySite_Lbl.BUYING, ItemsBySite_Lbl.PURCHASE];
        for (let i = 0; i < sections.length; i++) {
			expect(await this.isElementPresent(await lnPg.verifyHeader(sections[i]))).toBeTruthy();
		}

        await LNCommon.deselectCheckbox(ItemsBySite_Lbl.USE_GLOBAL_ITEM_PURCHASE_CHK,
				ItemsBySite_Id.USE_GLOBAL_ITEM_PURCHASE_CHK);

        await LNCommon.triggerInputField(await LNCommon.getTextField(ItemsBySite_Lbl.PURCHASE_PRICE, ItemsBySite_Id.PURCHASE_PRICE,
				LNSessionCodes.ITEMS_PURCHASE_BY_SITE), itemsBySiteCnxt.purchasePrice);
       await LNCommon.clickTextMenuItem(LNSessionCodes.ITEMS_PURCHASE_BY_SITE, LNMenuActions_Id.OK, LNMenuActions_Lbl.OK);
        
        // Verify Session Tab
        await LNCommon.verifySessionTab(LNSessionTabs.ITEMS_BY_SITE,);

        await (await lnPg.hyperlinkText(ItemsBySite_Lbl.SALES_BUTTON, ItemsBySite_Id.SALES_BUTTON,
				LNSessionCodes.ITEMS_BY_SITE)).click();
        
        // Verify Dialogbox title
        await LNCommon.verifyDialogBoxWindow(LNSessionTabs.ITEMS_SALES_BY_SITE);

        // Verifying the values in Items Sales by Site
        await expect(await LNCommon.getTextField(ItemsBySite_Lbl.ITEM_ZOOM, ItemsBySite_Id.ITEM_SEGMENT_TWO_ZOOM,
						LNSessionCodes.ITEMS_SALES_BY_SITE)).toHaveValue(itemsBySiteCnxt.item[0]);

        await expect(await LNCommon.getTextField(ItemsBySite_Lbl.SITE_ZOOM, ItemsBySite_Id.SITE_ZOOM,
						LNSessionCodes.ITEMS_SALES_BY_SITE)).toHaveValue(itemsBySiteCnxt.site);
       
        await LNCommon.clickTextMenuItem(LNSessionCodes.ITEMS_SALES_BY_SITE, LNMenuActions_Id.OK, LNMenuActions_Lbl.OK);
        
        await LNCommon.verifySessionTab(LNSessionTabs.ITEMS_BY_SITE);
        
        // Verify Session Tab
        await (await lnPg.hyperlinkText(ItemsBySite_Lbl.ORDERING_BUTTON, ItemsBySite_Id.ORDERING_BUTTON,
				LNSessionCodes.ITEMS_BY_SITE)).click();

        // Verify Dialogbox title
        await LNCommon.verifyDialogBoxWindow(LNSessionTabs.ITEMS_ORDERING_BY_SITE);

        const tabsDetails = [
            [LNTabs.GENERAL, ItemsBySite_Lbl.ORDER],
            [LNTabs.LOT_SIZES, ItemsBySite_Lbl.QUANTITIES],
            [LNTabs.DETAILS, ItemsBySite_Lbl.FORECAST]
        ];

        for (const [tabsInOrdering, headersInOrdering] of tabsDetails) {

            await LNCommon.selectHeaderTab(tabsInOrdering, LNSessionCodes.ITEMS_ORDERING_BY_SITE);
            
            expect(await this.isElementPresent(await lnPg.verifyHeader(headersInOrdering))).toBeTruthy();
        }

        await LNCommon.clickTextMenuItem(LNSessionCodes.ITEMS_ORDERING_BY_SITE, LNMenuActions_Id.OK, LNMenuActions_Lbl.OK);
       
        // Verify Session Tab
        await LNCommon.verifySessionTab(LNSessionTabs.ITEMS_BY_SITE);

        await (await lnPg.hyperlinkText(ItemsBySite_Lbl.WAREHOUSING_BUTTON, ItemsBySite_Id.WAREHOUSING_BUTTON,
				LNSessionCodes.ITEMS_BY_SITE)).click();
        
        // Verify Dialogbox title
        await LNCommon.verifyDialogBoxWindow(LNSessionTabs.ITEMS_WAREHOUSING_BY_SITE);

        // Verifying the Details in tabs
        const warehousingTabs = [
            [LNTabs.GENERAL, ItemsBySite_Lbl.GENERAL],
            [LNTabs.INVENTORY, ItemsBySite_Lbl.STORAGE_DATA],
            [LNTabs.HANDLING, ItemsBySite_Lbl.REJECTS_HANDLING],
            [LNTabs.IDENTIFICATION, ItemsBySite_Lbl.LOTS]
        ];
        for (const [tabsInWarehousing, sectionsInWarehousing] of warehousingTabs) {

             await LNCommon.selectHeaderTab(tabsInWarehousing, LNSessionCodes.ITEM_WAREHOUSING_BY_SITE);
            
            expect(await this.isElementPresent(await lnPg.verifyHeader(sectionsInWarehousing))).toBeTruthy();
        }
        
        await LNCommon.selectHeaderTab(LNTabs.HANDLING_UNITS, LNSessionCodes.ITEM_WAREHOUSING_BY_SITE);

        // Verifying the Handling Units in Use checkbox
        expect(await this.isElementPresent(await lnPg.selectCheckboxLabel(ItemsBySite_Lbl.HANDLING_UNITS_IN_USE_CHK, ItemsBySite_Id.HANDLING_UNITS_IN_USE_CHK))).toBeTruthy();

        await LNCommon.selectHeaderTab(LNTabs.DYNAMIC_CROSS_DOCKING, LNSessionCodes.ITEM_WAREHOUSING_BY_SITE);

        // Verifying the Dynamic Cross Docking checkbox
        expect(await this.isElementPresent(await lnPg.selectCheckboxLabel(ItemsBySite_Lbl.DYNAMIC_CROSS_DOCKING_CHK, ItemsBySite_Id.DYNAMIC_CROSS_DOCKING_CHK))).toBeTruthy();

        await LNCommon.selectGridTab(LNTabs.WAREHOUSES, LNSessionCodes.ITEM_WAREHOUSING_BY_SITE);
		await LNCommon.filterRequiredRecord(ItemsBySite_Lbl.WAREHOUSE_ZOOM_GRID, ItemsBySite_Id.WAREHOUSE_ZOOM_GRID,
				LNSessionCodes.ITEM_DATA_WAREHOUSE, itemsBySiteCnxt.warehouse);
		await LNCommon.drilldownRequiredRecord(LNSessionCodes.ITEM_DATA_WAREHOUSE, LNCommons.FIRST_RECORD);

		// Verify Session Tab
		await LNCommon.verifySessionTab(LNSessionTabs.ITEM_DATA_BY_WAREHOUSE);
        
        // Verifying the Details in tabs
        const itemDataTabs = [
            [LNTabs.GENERAL, ItemsBySite_Lbl.GENERAL],
            [LNTabs.REPLENISHMENT, ItemsBySite_Lbl.ORDER_SETTINGS]
        ];
        for (const [tabsInItemData, sectionsInItemData] of itemDataTabs) {
            
            await LNCommon.selectHeaderTab(tabsInItemData, LNSessionCodes.ITEM_DATA_BY_WAREHOUSE);
            
            expect(await this.isElementPresent(await lnPg.verifyHeader(sectionsInItemData))).toBeTruthy();
        }

        await LNCommon.clickMainMenuItem(LNSessionCodes.ITEM_DATA_BY_WAREHOUSE, LNMenuActions_Id.SAVE_AND_CLOSE);
        await LNCommon.clickMainMenuItem(LNSessionCodes.ITEM_WAREHOUSING_BY_SITE, LNMenuActions_Id.SAVE_AND_CLOSE);

                // Verify Session Tab
        await LNCommon.verifySessionTab(LNSessionTabs.ITEMS_BY_SITE);

        await LNCommon.clickMainMenuItem(LNSessionCodes.ITEMS_BY_SITE, LNMenuActions_Id.SAVE_AND_CLOSE);
        
        // Verify Session Tab
        await LNCommon.verifySessionTab(LNSessionTabs.ITEMS_BY_SITE);
        
        await LNCommon.clickMainMenuItem(LNSessionCodes.ITEMS_BY_SITE, LNMenuActions_Id.SAVE_AND_CLOSE);

        // Close all LN Modules
        await LNCommon.collapseLNModule(LNSessionTabs.MASTER_DATA);

        console.log("=========>>>>> Review item by site and update purchase price completed sucessfully <<<<<=========");
    }


    static async calculateStandardCostPerEnterpriseUnitSalesCenter(itemsBySiteCnxt) {

        const lnPg = new LNPage(this.page);

        console.log('=== Calculate standard cost per enterprise unit started ===');

        // Navigating to Master Data --> Items --> Items by Site
        await LNCommon.navigateToLNModule(LNSessionTabs.COMMON, LNSessionTabs.STANDARD_COSTS, LNSessionTabs.CALCULATION, LNSessionTabs.CALCULATE_STANDARD_COST);

        // Verify Session Tab
        await LNCommon.verifySessionTab(LNSessionTabs.CALCULATE_STANDARD_COST);

        await LNCommon.triggerInputField(await LNCommon.getTextField(CalculateStandardCost_Lbl.FROM_ITEM,
            CalculateStandardCost_Id.FROM_ITEM_SEG2, LNSessionCodes.CALCULATE_STANDARD_COST), itemsBySiteCnxt.item[0]);

        // Verifying the value in To Item field
        await expect(async () => {
            expect(await (await LNCommon.getTextField(CalculateStandardCost_Lbl.TO_ITEM, CalculateStandardCost_Id.TO_ITEM_SEG2,
                LNSessionCodes.CALCULATE_STANDARD_COST)).inputValue()).toBe(itemsBySiteCnxt.item[0]);
        }).toPass({ timeout: 10000 });

        await LNCommon.selectCheckbox(CalculateStandardCost_Lbl.ACTUALIZE_STANDARD_COST_AND_REVALUE_INVENTORY_CHK,
            CalculateStandardCost_Id.ACTUALIZE_STANDARD_COST_AND_REVALUE_INVENTORY_CHK);
        await LNCommon.clickTextMenuItem(LNSessionCodes.CALCULATE_STANDARD_COST, LNMenuActions_Id.CALCULATES, LNMenuActions_Lbl.CALCULATE);
        await LNCommon.handleDevice();

        await LNCommon.validateMessageAndHandlePopUp(LNPopupMsg.PROCESS_READY, LNCommons.OK);
        await LNCommon.clickTextMenuItem(LNSessionCodes.CALCULATE_STANDARD_COST, LNMenuActions_Id.CLOSE, LNMenuActions_Lbl.CLOSE);

        // Close all LN Modules
        await LNCommon.collapseLNModule(LNSessionTabs.COMMON);

        // Navigating to Master Data --> Items --> Items by Site
        await LNCommon.navigateToLNModule(LNSessionTabs.MASTER_DATA, LNSessionTabs.ITEMS, LNSessionTabs.ITEMS_BY_SITE);

        // Verify Session Tab
        await LNCommon.verifySessionTab(LNSessionTabs.ITEMS_BY_SITE);

        await LNCommon.clickMainMenuItem(LNSessionCodes.ITEMS_BY_SITE, LNMenuActions_Id.SEARCH);

        // Verify Dialogbox title
        await LNCommon.verifyDialogBoxWindow(LNSessionTabs.ITEMS_BY_SITE_SEARCH);

        await LNCommon.clickTextMenuItem(LNSessionCodes.ITEMS_BY_SITE, LNMenuActions_Id.CLEAR_FIELDS,
            LNMenuActions_Lbl.CLEAR_FIELDS);
        await LNCommon.selectRadioBtn(ItemsBySite_Lbl.ITEM_SITE_RDN, ItemsBySite_Id.ITEM_SITE_RDN);
        await LNCommon.triggerInputField(await LNCommon.getTextField(ItemsBySite_Lbl.ITEM, ItemsBySite_Id.ITEM_SEGMENT_TWO,
            LNSessionCodes.ITEMS_BY_SITE), itemsBySiteCnxt.item[0]);
        await LNCommon.clickTextMenuItem(LNSessionCodes.ITEMS_BY_SITE, LNMenuActions_Id.OK, LNMenuActions_Lbl.OK);

        // Verify Session Tab
        await LNCommon.verifySessionTab(LNSessionTabs.ITEMS_BY_SITE);

        // Verifying our Item is displayed in second item field
        expect(await (await LNCommon.getTextField(ItemsBySite_Lbl.ITEM_IN_ITEMS_BY_SITE,
                ItemsBySite_Id.ITEM_IN_ITEMS_BY_SITE, LNSessionCodes.ITEMS_BY_SITE))
                .inputValue()).toBe(itemsBySiteCnxt.item[0]);

        await LNCommon.filterRequiredRecord(ItemsBySite_Lbl.SITE_GRID, ItemsBySite_Id.SITE_GRID, LNSessionCodes.ITEMS_BY_SITE,
            itemsBySiteCnxt.site);
        await LNCommon.drilldownRequiredRecord(LNSessionCodes.ITEMS_BY_SITE, LNCommons.FIRST_RECORD);

        // Verify Session Tab
        await LNCommon.verifySessionTab(LNSessionTabs.ITEMS_BY_SITE);

        await LNCommon.navigateToLNReferences(LNSessionCodes.ITEMS_BY_SITE, LNMenuActions_Lbl.COSTINGS);

        // Verifying the Dialogbox title
        await LNCommon.verifyDialogBoxWindow(LNSessionTabs.ITEM_COSTING);

        await LNCommon.filterRequiredRecord(ItemsBySite_Lbl.ENTERPRISE_UNIT_ZOOM_GRID,
            ItemsBySite_Id.ENTERPRISE_UNIT_ZOOM_GRID, LNSessionCodes.ITEM_COSTINGS, itemsBySiteCnxt.enterpriseUnit);
        await LNCommon.drilldownRequiredRecord(LNSessionCodes.ITEM_COSTINGS, LNCommons.FIRST_RECORD);

        // Verifying the Dialogbox title
        await LNCommon.verifyDialogBoxWindow(LNSessionTabs.ITEM_COSTING);

        // Verifying the Data in Item Costing
        expect(await (await LNCommon
                .getTextField(ItemsBySite_Lbl.ITEM_IN_ITEM_COSTING,
                    ItemsBySite_Id.ITEM_IN_ITEM_COSTING_SEGMENT_TWO, LNSessionCodes.ITEM_COSTING))
                .inputValue()).toBe(itemsBySiteCnxt.item[0]);

        // Verifying the Costing Source dropdown value
        await expect(async () => {
            expect(await (await lnPg.dropdownValueLabel(ItemsBySite_Lbl.COSTING_SOURCE_DRP,
                ItemsBySite_Id.COSTING_SOURCE_DRP)).textContent())
                .toBe(itemsBySiteCnxt.costingSource);
        }).toPass({ timeout: 10000 });

        // Verifying Data in Costs Section
        expect(await this.isElementPresent(await lnPg.verifyHeader(ItemsBySite_Lbl.COSTS))).toBeTruthy();

        expect(await (await LNCommon.getTextField(ItemsBySite_Lbl.MATERIAL_COSTS, ItemsBySite_Id.MATERIAL_COSTS,
                LNSessionCodes.ITEM_COSTING)).textContent())
            .toContain(itemsBySiteCnxt.purchasePrice);

        await LNCommon.clickMainMenuItem(LNSessionCodes.ITEM_COSTING, LNMenuActions_Id.SAVE_AND_CLOSE);
        await LNCommon.clickMainMenuItem(LNSessionCodes.ITEM_COSTINGS, LNMenuActions_Id.SAVE_AND_CLOSE);
        await LNCommon.clickMainMenuItem(LNSessionCodes.ITEMS_BY_SITE, LNMenuActions_Id.SAVE_AND_CLOSE);
        await LNCommon.clickMainMenuItem(LNSessionCodes.ITEMS_BY_SITE, LNMenuActions_Id.SAVE_AND_CLOSE);

        // Close all LN Modules
        await LNCommon.collapseLNModule(LNSessionTabs.MASTER_DATA);

        console.log('=== Calculate standard cost completed successfully ===');
    }

    
    static async reviewItemBySalesOfficeAndUpdateSalesPrice(itemsBySiteCnxt) {

        console.log('=== Start reviewItemBySalesOfficeAndUpdateSalesPrice ===');

        await LNCommon.LNRestart();
        await LNCommon.runProgram(LNSessionCodes.ITEMS_SALES_BY_OFFICE);
        await LNCommon.verifySessionTab(LNSessionTabs.ITEMS_SALES_BY_OFFICE);

        await LNCommon.clickMainMenuItem(LNSessionCodes.ITEMS_SALES_BY_OFFICE, LNMenuActions_Id.SEARCH);

        await LNCommon.verifyDialogBoxWindow(LNSessionTabs.ITEMS_SALES_BY_OFFICE_SEARCH);

        await LNCommon.clickTextMenuItem(LNSessionCodes.ITEMS_SALES_BY_OFFICE, LNMenuActions_Id.CLEAR_FIELDS, LNMenuActions_Lbl.CLEAR_FIELDS);
        await LNCommon.selectRadioBtn(ItemsBySite_Lbl.SALES_OFFICE_ITEM_SITE_RDN, ItemsBySite_Id.SALES_OFFICE_ITEM_SITE_RDN);

        await LNCommon.clickTextMenuItem(LNSessionCodes.ITEMS_SALES_BY_OFFICE, LNMenuActions_Id.OK, LNMenuActions_Lbl.OK);
        await LNCommon.verifySessionTab(LNSessionTabs.ITEMS_SALES_BY_OFFICE);

        await LNCommon.clickMainMenuItem(LNSessionCodes.ITEMS_SALES_BY_OFFICE, LNMenuActions_Id.SEARCH);
        await LNCommon.verifyDialogBoxWindow(LNSessionTabs.ITEMS_SALES_BY_OFFICE_SEARCH);
        await LNCommon.clickTextMenuItem(LNSessionCodes.ITEMS_SALES_BY_OFFICE, LNMenuActions_Id.CLEAR_FIELDS, LNMenuActions_Lbl.CLEAR_FIELDS);
        await LNCommon.selectRadioBtn(ItemsBySite_Lbl.SALES_OFFICE_ITEM_SITE_RDN, ItemsBySite_Id.SALES_OFFICE_ITEM_SITE_RDN);

        await expect(async () => {
            await (await LNCommon.getTextboxLookUpIcon(ItemsBySite_Lbl.SALES_OFFICE_ZOOM, ItemsBySite_Id.SALES_OFFICE_ZOOM, LNSessionCodes.ITEMS_SALES_BY_OFFICE)).click();
        }).toPass({ timeout: 10000 });

        await LNCommon.verifyDialogBoxWindow(LNSessionTabs.SALES_OFFICES);

        await LNCommon.filterRequiredRecord(ItemsBySite_Lbl.SALES_OFFICE_ZOOM_GRID, ItemsBySite_Id.SALES_OFFICE_DESCRIPTION_ZOOM_GRID, LNSessionCodes.SALES_OFFICES, itemsBySiteCnxt.salesOfficeDesc);
        await LNCommon.selectRequiredRecord(LNSessionCodes.SALES_OFFICES, ItemsBySite_Lbl.SALES_OFFICE_ZOOM_GRID, ItemsBySite_Id.SALES_OFFICE_ZOOM_GRID, itemsBySiteCnxt.salesOffice);
        await LNCommon.clickTextMenuItem(LNSessionCodes.SALES_OFFICES, LNMenuActions_Id.OK, LNMenuActions_Lbl.OK);
        await LNCommon.verifyDialogBoxWindow(LNSessionTabs.ITEMS_SALES_BY_OFFICE_SEARCH);

        await LNCommon.triggerInputField(
           await LNCommon.getTextField(ItemsBySite_Lbl.ITEM_IN_SALES_BY_OFFICE,
                ItemsBySite_Id.ITEM_IN_SALES_BY_OFFICE_SEGMENT_TWO, LNSessionCodes.ITEMS_SALES_BY_OFFICE),
            itemsBySiteCnxt.item[1]);
        await LNCommon.clickTextMenuItem(LNSessionCodes.ITEMS_SALES_BY_OFFICE, LNMenuActions_Id.OK, LNMenuActions_Lbl.OK);
        await LNCommon.verifySessionTab(LNSessionTabs.ITEMS_SALES_BY_OFFICE);

        await LNCommon.filterRequiredRecord(ItemsBySite_Lbl.ITEM_IN_SALES_BY_OFFICE_GRID, ItemsBySite_Id.ITEM_IN_SALES_BY_OFFICE_DESCRIPTION_GRID, LNSessionCodes.ITEMS_SALES_BY_OFFICE, itemsBySiteCnxt.item[1]);
        await LNCommon.drilldownRequiredRecord(LNSessionCodes.ITEMS_SALES_BY_OFFICE, LNCommons.FIRST_RECORD);
        await LNCommon.verifySessionTab(LNSessionTabs.ITEMS_SALES_BY_OFFICE);

        await (await LNCommon.getTextboxLookUpIcon(ItemsBySite_Lbl.SITE_IN_SALES_BY_OFFICE, ItemsBySite_Id.SITE_IN_SALES_BY_OFFICE, LNSessionCodes.ITEMS_SALES_BY_OFFICE)).click();
        await LNCommon.verifyDialogBoxWindow(LNSessionTabs.SITES);

        await LNCommon.filterRequiredRecord(ItemsBySite_Lbl.SITE_IN_SITES_ZOOM_GRID, ItemsBySite_Id.SITE_IN_SITES_ZOOM_GRID, LNSessionCodes.SITES, itemsBySiteCnxt.site);
        await LNCommon.selectRequiredRecord(LNSessionCodes.SITES, ItemsBySite_Lbl.SITE_IN_SITES_ZOOM_GRID, ItemsBySite_Id.SITE_IN_SITES_ZOOM_GRID, itemsBySiteCnxt.site);
        await LNCommon.clickTextMenuItem(LNSessionCodes.SITES, LNMenuActions_Id.OK, LNMenuActions_Lbl.OK);
        await LNCommon.verifySessionTab(LNSessionTabs.ITEMS_SALES_BY_OFFICE);

        await LNCommon.selectHeaderTab(LNTabs.PRICE, LNSessionCodes.ITEMS_SALES_BY_OFFICE);
        await LNCommon.deselectCheckbox(ItemsBySite_Lbl.USE_GLOBAL_ITEM_SALES_CHK, ItemsBySite_Id.USE_GLOBAL_ITEM_SALES_CHK);

        await LNCommon.triggerInputField(await LNCommon.getTextField(ItemsBySite_Lbl.SALES_PRICE, ItemsBySite_Id.SALES_PRICE,
            LNSessionCodes.ITEMS_SALES_BY_OFFICE), itemsBySiteCnxt.salesPrice);

        await LNCommon.validateMessageAndHandlePopUp(LNPopupMsg.DEFAULT_PRICE_BOOK, LNCommons.OK);

        //await this.page.screenshot({ path: 'screenshots/reviewItemBySalesOffice.png' });

        await LNCommon.clickMainMenuItem(LNSessionCodes.ITEMS_SALES_BY_OFFICE, LNMenuActions_Id.SAVE_AND_EXIT);
        await LNCommon.verifySessionTab(LNSessionTabs.ITEMS_SALES_BY_OFFICE);
        await LNCommon.clickMainMenuItem(LNSessionCodes.ITEMS_SALES_BY_OFFICE, LNMenuActions_Id.SAVE_AND_EXIT);

        await LNCommon.collapseLNModule(LNSessionTabs.OPTIONS);

        console.log('=== Completed reviewItemBySalesOfficeAndUpdateSalesPrice ===');
    }

    static async reviewItemDefaults(itemCnxt) {

        // Initialising page elements
        const lnPg = new LNPage(this.page);

        log().info("=========>>>>> Review item defaults started <<<<<=========");

        // Navigating to Master Data --> Items --> Defaults --> Item Defaults
        await LNCommon.navigateToLNModule(LNSessionTabs.MASTER_DATA, LNSessionTabs.ITEMS, LNSessionTabs.DEFAULTS,
            LNSessionTabs.ITEM_DEFAULTS);

        // Verify Session Tab
        await LNCommon.verifySessionTab(LNSessionTabs.ITEM_DEFAULTS);

        await LNCommon.clickAndSelectDropdownFieldGridFilter(ItemDefaults_Id.ITEM_TYPE_GRID_DRP, itemCnxt.itemType,
            ItemDefaults_Lbl.ITEM_TYPE_GRID_DRP, LNSessionCodes.ITEM_DEFAULTS);
        await LNCommon.filterRequiredRecord(ItemDefaults_Lbl.ITEM_GROUP_GRID, ItemDefaults_Id.ITEM_GROUP_GRID,
            LNSessionCodes.ITEM_DEFAULTS, itemCnxt.itemGroup);
        await LNCommon.drilldownRequiredRecord(LNSessionCodes.ITEM_DEFAULTS, LNCommons.FIRST_RECORD);

        // Verify Session Tab
        await LNCommon.verifySessionTab(LNSessionTabs.ITEM_DEFAULTS);

        // Verifying the Item Type dropdown value
        expect(await lnPg.dropdownValueLabel(ItemDefaults_Lbl.ITEM_TYPE_DRP,
            ItemDefaults_Id.ITEM_TYPE_DRP).getAttribute(ElementAttributes.INNER_TEXT))
            .toBe(itemCnxt.itemType);

        // Verifying the Item Group value
        expect(await LNCommon.getTextField(ItemDefaults_Lbl.ITEM_GROUP_GRID, ItemDefaults_Id.ITEM_GROUP_GRID,
            LNSessionCodes.ITEM_DEFAULTS_DETAIL).getAttribute(ElementAttributes.VALUE)).toBe(itemCnxt.itemGroup);

        await lnPg.verifyHeader(ItemDefaults_Lbl.SUBENTITIES).hover();

        // Review the fields and data in Subentities section
        expect(await this.isElementPresent(await lnPg.verifyHeader(ItemDefaults_Lbl.SUBENTITIES))).toBeTruthy();

        for (let i = 0; i < itemCnxt.sites.length; i++) {
            await LNCommon.selectGridTab(LNTabs.SITES, LNSessionCodes.ITEM_DEFAULTS_DETAIL);

            await LNCommon.filterRequiredRecord(ItemDefaults_Lbl.SITE_GRID, ItemDefaults_Id.SITE_GRID,
                LNSessionCodes.ITEM_CONTROL_AND_DEFAULTS_BY_SITE, itemCnxt.sites[i]);
            await LNCommon.drilldownRequiredRecord(LNSessionCodes.ITEM_CONTROL_AND_DEFAULTS_BY_SITE, LNCommons.FIRST_RECORD);

            // Verifying the Session title
            await LNCommon.verifySessionTab(LNSessionTabs.ITEM_CONTROL_AND_DEFAULTS_BY_SITE);

            // Verifying the Value in Site
            expect(await LNCommon
                .getTextField(ItemDefaults_Lbl.SITE, ItemDefaults_Id.SITE,
                    LNSessionCodes.ITEM_CONTROL_AND_DEFAULTS_BY_SITE)
                .getAttribute(ElementAttributes.VALUE)).toBe(itemCnxt.sites[i]);

            await LNSessionTabActions.closeTab(LNSessionTabs.ITEM_CONTROL_AND_DEFAULTS_BY_SITE);
        }

        await LNCommon.selectGridTab(LNTabs.ENTERPRISE_UNITS, LNSessionCodes.ITEM_DEFAULTS_DETAIL);

        await lnPg.verifyHeader(ItemDefaults_Lbl.SUBENTITIES).hover();

        await lnPg.hyperlinkText(ItemDefaults_Lbl.SALES_BTN, ItemDefaults_Id.SALES_BTN,
            LNSessionCodes.ITEM_DEFAULTS_DETAIL).click();

        // Verifying the Dialogbox title
        await LNCommon.verifyDialogBoxWindow(LNSessionTabs.ITEM_SALES_DEFAULTS);

        // Verifying the Details in Item Sales Defaults window
        expect(await lnPg.dropdownValueLabel(ItemDefaults_Lbl.ITEM_TYPE_IN_SALES_ZOOM_DRP,
            ItemDefaults_Id.ITEM_TYPE_IN_SALES_ZOOM_DRP).getAttribute(ElementAttributes.INNER_TEXT)).toBe(itemCnxt.itemType);
        expect(await LNCommon
            .getTextField(ItemDefaults_Lbl.ITEM_GROUP_IN_SALES_ZOOM,
                ItemDefaults_Id.ITEM_GROUP_IN_SALES_ZOOM, LNSessionCodes.ITEM_SALES_DEFAULTS)
            .getAttribute(ElementAttributes.VALUE)).toBe(itemCnxt.itemGroup);

        await LNCommon.clickTextMenuItem(LNSessionCodes.ITEM_SALES_DEFAULTS, LNMenuActions_Id.OK, LNMenuActions_Lbl.OK);

        // Verify Session Tab
        await LNCommon.verifySessionTab(LNSessionTabs.ITEM_DEFAULTS);

        await lnPg.hyperlinkText(ItemDefaults_Lbl.ORDERING_BTN, ItemDefaults_Id.ORDERING_BTN,
            LNSessionCodes.ITEM_DEFAULTS_DETAIL).click();

        // Verifying the Dialogbox title
        await LNCommon.verifyDialogBoxWindow(LNSessionTabs.ITEM_ORDERING_DEFAULTS);

        // Verifying the Details in Item Sales Defaults window
        expect(await lnPg.dropdownValueLabel(ItemDefaults_Lbl.ITEM_TYPE_IN_ORDERING_ZOOM_DRP,
            ItemDefaults_Id.ITEM_TYPE_IN_ORDERING_ZOOM_DRP).getAttribute(ElementAttributes.INNER_TEXT)).toBe(itemCnxt.itemType);
        expect(await LNCommon
            .getTextField(ItemDefaults_Lbl.ITEM_GROUP_IN_ORDERING_ZOOM,
                ItemDefaults_Id.ITEM_GROUP_IN_ORDERING_ZOOM, LNSessionCodes.ITEM_ORDERING_DEFAULTS)
            .getAttribute(ElementAttributes.VALUE)).toBe(itemCnxt.itemGroup);

        await LNCommon.clickTextMenuItem(LNSessionCodes.ITEM_ORDERING_DEFAULTS, LNMenuActions_Id.OK, LNMenuActions_Lbl.OK);

        // Verify Session Tab
        await LNCommon.verifySessionTab(LNSessionTabs.ITEM_DEFAULTS);

        await lnPg.hyperlinkText(ItemDefaults_Lbl.PURCHASE_BTN, ItemDefaults_Id.PURCHASE_BTN,
            LNSessionCodes.ITEM_DEFAULTS_DETAIL).click();

        // Verifying the Dialogbox title
        await LNCommon.verifyDialogBoxWindow(LNSessionTabs.ITEM_PURCHASE_DEFAULTS);

        await LNCommon.selectHeaderTab(LNTabs.PURCHASE_DEFAULTS_ONE, LNSessionCodes.ITEM_PURCHASE_DEFAULTS);

        // Verifying the Price Details section
        expect(await lnPg.verifyHeader(ItemDefaults_Lbl.PRICE_DETAILS_SECTION)).toBeTruthy();

        await LNCommon.selectHeaderTab(LNTabs.PURCHASE_DEFAULTS_TWO, LNSessionCodes.ITEM_PURCHASE_DEFAULTS);

        // Verifying the Order Details section
        expect(await this.isElementPresent(lnPg.verifyHeader, ItemDefaults_Lbl.ORDER_DETAILS_SECTION)).toBeTruthy();

        await LNCommon.clickTextMenuItem(LNSessionCodes.ITEM_PURCHASE_DEFAULTS, LNMenuActions_Id.OK, LNMenuActions_Lbl.OK);

        // Verify Session Tab
        await LNCommon.verifySessionTab(LNSessionTabs.ITEM_DEFAULTS);

        await lnPg.hyperlinkText(ItemDefaults_Lbl.WAREHOUSING_BTN, ItemDefaults_Id.WAREHOUSING_BTN,
            LNSessionCodes.ITEM_DEFAULTS_DETAIL).click();

        // Verifying the Dialogbox title
        await LNCommon.verifyDialogBoxWindow(LNSessionTabs.ITEMS_WAREHOUSING_DEFAULTS);

        // Verifying the Details in Items Warehousing Defaults window
        expect(await lnPg.dropdownValueLabel(ItemDefaults_Lbl.ITEM_TYPE_IN_WAREHOUSING_ZOOM_DRP, ItemDefaults_Id.ITEM_TYPE_IN_WAREHOUSING_ZOOM_DRP)
            .getAttribute(ElementAttributes.INNER_TEXT)).toBe(itemCnxt.itemType);

        expect(await LNCommon.getTextField(ItemDefaults_Lbl.ITEM_GROUP_IN_WAREHOUSING_ZOOM,
            ItemDefaults_Id.ITEM_GROUP_IN_WAREHOUSING_ZOOM, LNSessionCodes.ITEMS_WAREHOUSING_DEFAULTS)
            .getAttribute(ElementAttributes.VALUE)).toBe(itemCnxt.itemGroup);

        await LNCommon.clickTextMenuItem(LNSessionCodes.ITEMS_WAREHOUSING_DEFAULTS, LNMenuActions_Id.OK,
            LNMenuActions_Lbl.OK);

        // Verify Session Tab
        await LNCommon.verifySessionTab(LNSessionTabs.ITEM_DEFAULTS);

        // tscreenshot("Review item defaults");

        await LNSessionTabActions.closeTab(LNSessionTabs.ITEM_DEFAULTS);
        await LNSessionTabActions.closeTab(LNSessionTabs.ITEM_DEFAULTS);

        // Close all LN Modules
        await LNCommon.collapseLNModule(LNSessionTabs.MASTER_DATA);

        log().info("=========>>>>> Review item defaults completed sucessfully <<<<<=========");
    }

    static async createANewItem(itemCnxt) {

		// Initialising page elements
		const lnPg = new LNPage(this.page);

		log().info("=========>>>>> Create a new item started <<<<<=========");

		// Navigating to Master Data --> Items --> Items
		await LNCommon.navigateToLNModule(LNSessionTabs.MASTER_DATA, LNSessionTabs.ITEMS, LNSessionTabs.ITEMS);

		// Verify Session Tab
		await LNCommon.verifySessionTab(LNSessionTabs.ITEMS);

		// Verifying and Deleting the Item if already created
		await LNCommon.filterRequiredRecord(Items_Lbl.ITEM_GRID, Items_Id.ITEM_SEG_2_GRID, LNSessionCodes.ITEMS,
				itemCnxt.item);
		if (await LNCommon.isRequiredRowPresent(LNSessionCodes.ITEMS, Items_Lbl.ITEM_GRID, Items_Id.ITEM_SEG_2_GRID,
				itemCnxt.item)) {
			await LNCommon.selectRequiredRecord(LNSessionCodes.ITEMS, Items_Lbl.ITEM_GRID, Items_Id.ITEM_SEG_2_GRID,
					itemCnxt.item);
			await LNCommon.clickMainMenuItem(LNSessionCodes.ITEMS, LNMenuActions_Id.DELETE);
			await LNCommon.validateMessageAndHandlePopUp(LNPopupMsg.DELETE_SELECT_RECORD, LNCommons.YES);
			
            await LNCommon.validateMessageAndHandlePopUp(LNPopupMsg.DELETED_RECORD, LNCommons.OK);
		}

		await LNCommon.clickMainMenuItem(LNSessionCodes.ITEMS, LNMenuActions_Id.NEW);

		// Verify Session Tab
		await LNCommon.verifySessionTab(LNSessionTabs.ITEM);

		await LNCommon.triggerInputField(LNCommon.getTextField(Items_Lbl.ITEM, Items_Id.ITEM_SEC, LNSessionCodes.ITEM),
				itemCnxt.item);
		await LNCommon.triggerInputField(await
				LNCommon.getTextField(Items_Lbl.DESCRIPTION, Items_Id.DESCRIPTION_ITEM, LNSessionCodes.ITEM),
				itemCnxt.itemDesc);
		await LNCommon.getTextboxLookUpIcon(Items_Lbl.ITEM_GROUP, Items_Id.ITEM_GROUP, LNSessionCodes.ITEM).click();

		// Verifying the Dialogbox title
		await LNCommon.verifyDialogBoxWindow(LNSessionTabs.ITEM);

		await LNCommon.selectRadioBtn(Items_Lbl.ITEM_DEFAULTS_RDN, Items_Id.ITEM_DEFAULTS_RDN);
		await LNCommon.handlePopUp();

		// Verifying the Dialogbox title
		await LNCommon.verifyDialogBoxWindow(LNSessionTabs.ITEM_DEFAULTS);

		await LNCommon.clickAndSelectDropdownFieldGridFilter(Items_Id.ITEM_TYPE_ZOOM_GRID_DRP, itemCnxt.itemType,
				Items_Lbl.ITEM_TYPE_ZOOM_GRID_DRP, LNSessionCodes.ITEM_DEFAULTS);
		await LNCommon.filterRequiredRecord(Items_Lbl.ITEM_GROUP_ZOOM_GRID, Items_Id.ITEM_GROUP_IN_ITEM_DEFAULTS_ZOOM_GRID,
				LNSessionCodes.ITEM_DEFAULTS, itemCnxt.itemGroup);
		await LNCommon.selectRecord(LNSessionCodes.ITEM_DEFAULTS, LNCommons.FIRST_RECORD);
		await LNCommon.clickTextMenuItem(LNSessionCodes.ITEM_DEFAULTS, LNMenuActions_Id.OK, LNMenuActions_Lbl.OK);

		// Verify Session Tab
		await LNCommon.verifySessionTab(LNSessionTabs.ITEM);

		await this.page.keyboard.press('Tab');
		
		// Verifying the Unit Set
		expect(await LNCommon.getTextField(Items_Lbl.UNIT_SET, Items_Id.UNIT_SET, LNSessionCodes.ITEM)
				.getAttribute(ElementAttributes.VALUE)).as("The Unit set field is empty").not.toBe();

		// Verifying the Unit
		expect(await LNCommon.getTextField(Items_Lbl.UNIT, Items_Id.UNIT, LNSessionCodes.ITEM)
				.getAttribute(ElementAttributes.VALUE)).not.toBeEmpty();

		await LNCommon.clickMainMenuItem(LNSessionCodes.ITEM, LNMenuActions_Id.SAVE);
		await lnPg.verifyHeader(Items_Lbl.SUBENTITIES).hover();


		// Review the fields and data in Subentities section
		expect(await this.isElementPresent(lnPg.verifyHeader(Items_Lbl.SUBENTITIES))).toBeTruthy();

		await lnPg.hyperlinkText(Items_Lbl.PURCHASE_BTN, Items_Id.PURCHASE_BTN, LNSessionCodes.ITEM)
				.click();

		// Verifying the Dialogbox title
		await LNCommon.verifyDialogBoxWindow(LNSessionTabs.ITEM_PURCHASE);

		await LNCommon.triggerInputField(
				await LNCommon.getTextField(Items_Lbl.PURCHASE_PRICE, Items_Id.PURCHASE_PRICE, LNSessionCodes.ITEM_PURCHASE),
				itemCnxt.itemPurchasePrice);
		await LNCommon.clickMainMenuItem(LNSessionCodes.ITEM_PURCHASE, LNMenuActions_Id.SAVE);

		// Verifying the Dialogbox title
		await LNCommon.verifyDialogBoxWindow(LNSessionTabs.ITEM_PURCHASE_TDIPU);
		await LNCommon.validateMessageAndHandlePopUp(LNPopupMsg.REPLACE_LATEST_PURCHASE_PRICE, LNCommons.YES);

		// Verifying the Dialogbox title
		await LNCommon.verifyDialogBoxWindow(LNSessionTabs.ITEM_PURCHASE_TDIPUA);
		await LNCommon.validateMessageAndHandlePopUp(LNPopupMsg.REPLACE_AVERAGE_PURCHASE_PRICE_ACTUAL_PRICE, LNCommons.YES);

		await LNCommon.clickMainMenuItem(LNSessionCodes.ITEM_PURCHASE, LNMenuActions_Id.SAVE_AND_EXIT);

		// Verify Session Tab
		await LNCommon.verifySessionTab(LNSessionTabs.ITEM);

		await LNCommon.selectGridTab(LNTabs.ENTERPRISE_UNITS, LNSessionCodes.ITEM);
		await LNCommon.filterRequiredRecord(Items_Lbl.ENTERPRISE_UNIT_GRID, Items_Id.ENTERPRISE_UNIT_GRID,
				LNSessionCodes.ITEM_COSTING, itemCnxt.enterpriseUnits[0]);
		await LNCommon.drilldownRequiredRecord(LNSessionCodes.ITEM_COSTING, LNCommons.FIRST_RECORD);

		// Verify Session Tab
		await LNCommon.verifySessionTab(LNSessionTabs.ITEM_COSTING);

		await LNCommon.navigateToLNActions(LNSessionCodes.ITEM_COSTING,
				LNMenuActions_Lbl.CALCULATE_AND_ACTUALIZE_STANDARD_COSTS);

		// Verifying the Costs
		expect(await LNCommon
						.getTextField(Items_Lbl.MATERIAL_COSTS, Items_Id.MATERIAL_COSTS, LNSessionCodes.ITEM_COSTING)
						.getAttribute(ElementAttributes.INNER_TEXT)).toBe(itemCnxt.itemPurchasePrice);

		await LNCommon.clickMainMenuItem(LNSessionCodes.ITEM_COSTING, LNMenuActions_Id.SAVE_AND_EXIT);

		// Verify Session Tab
		await LNCommon.verifySessionTab(LNSessionTabs.ITEM);

		await LNCommon.filterRequiredRecord(Items_Lbl.ENTERPRISE_UNIT_GRID, Items_Id.ENTERPRISE_UNIT_GRID,
				LNSessionCodes.ITEM_COSTING, itemCnxt.enterpriseUnits[1]);
		await LNCommon.drilldownRequiredRecord(LNSessionCodes.ITEM_COSTING, LNCommons.FIRST_RECORD);

		// Verify Session Tab
		await LNCommon.verifySessionTab(LNSessionTabs.ITEM_COSTING);

		await LNCommon.navigateToLNActions(LNSessionCodes.ITEM_COSTING,
				LNMenuActions_Lbl.CALCULATE_AND_ACTUALIZE_STANDARD_COSTS);
				
		// Verifying the Material Cost
		expect(await LNCommon
						.getTextField(Items_Lbl.MATERIAL_COSTS, Items_Id.MATERIAL_COSTS, LNSessionCodes.ITEM_COSTING)
						.getAttribute(ElementAttributes.INNER_TEXT))
				.toBe(itemCnxt.itemPurchasePrice);

		// Verifying the Total Cost
		expect(await LNCommon.getTextField(Items_Lbl.TOTAL_COSTS, Items_Id.TOTAL_COSTS, LNSessionCodes.ITEM_COSTING)
								.getAttribute(ElementAttributes.INNER_TEXT)).toBeGreaterThan(itemCnxt.itemPurchasePrice);

		await LNCommon.clickMainMenuItem(LNSessionCodes.ITEM_COSTING, LNMenuActions_Id.SAVE_AND_EXIT);

		await LNCommon.clickMainMenuItem(LNSessionCodes.ITEM, LNMenuActions_Id.SAVE_AND_EXIT);
		await LNCommon.clickMainMenuItem(LNSessionCodes.ITEMS, LNMenuActions_Id.SAVE_AND_EXIT);

		// Close all LN Modules
		await LNCommon.collapseLNModule(LNSessionTabs.MASTER_DATA);

		log().info("=========>>>>> Create a new item completed sucessfully <<<<<=========");
	}

}

export default LNMasterData;