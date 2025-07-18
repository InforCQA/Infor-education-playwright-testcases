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
import LNMenuActions_Lbl from "../constants/elementLbls/LNMenuActions_Lbl";
import { setTimeout } from 'node:timers/promises';

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

}

export default LNMasterData;