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
import Addresses_Lbl from "../../ln/constants/elementLbls/Addresses_Lbl";
import Addresses_Id from "../../ln/constants/elementIds/Addresses_Id";
import LNMenuActions_Id from "../../ln/constants/elementIds/LNMenuActions_Id";
import LNMenuActions_Lbl from "../../ln/constants/elementLbls/LNMenuActions_Lbl";

class LNMasterData extends BaseClass {

    static async reviewEnterpriseModelInInforLN(enterpriseMdlCnxt) {

        // Intializing the page
        const emwPg = new EnterpriseModelWorkbenchPage();

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
        await this.page.waitForTimeout(1000);

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
        const lnPg = new LNPage();
        const emwPg = new EnterpriseModelWorkbenchPage();

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

        const departments = await lnPg.gridCell(
            LNSessionCodes.DEPARTMENTS_SITE,
            EnterpriseModelWorkbench_Id.DEPARTMENT_TYPE_DRP_GRID
        ).count();
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
                await LNCommon.getTextField(Addresses_Lbl.NAME, Addresses_Id.NAME, LNSessionCodes.ADDRESSES), structureCnxt.name );

            await LNCommon.triggerInputField(
                await LNCommon.getTextField(Addresses_Lbl.COUNTRY, Addresses_Id.COUNTRY, LNSessionCodes.ADDRESSES),structureCnxt.country );

            await LNCommon.getTextboxLookUpIcon( Addresses_Lbl.CITY, Addresses_Id.CITY,LNSessionCodes.ADDRESSES ).click();

            await LNCommon.verifyDialogBoxWindow(LNSessionTabs.CITIES_BY_COUNTRY);

            await LNCommon.filterAndSelectFirstRecord( Addresses_Lbl.CITY_ZOOM_GRID, Addresses_Id.CITY_ZOOM_GRID,structureCnxt.city,LNSessionCodes.CITIES_BY_COUNTRY);

            await LNCommon.clickTextMenuItem( LNSessionCodes.CITIES_BY_COUNTRY, LNMenuActions_Id.OK, LNMenuActions_Lbl.OK);

            await LNCommon.verifySessionTab(LNSessionTabs.ADDRESSES);

            await LNCommon.triggerInputField(await LNCommon.getTextField(Addresses_Lbl.STREET, Addresses_Id.STREET, LNSessionCodes.ADDRESSES),structureCnxt.street);

            await LNCommon.triggerInputField(await LNCommon.getTextField(Addresses_Lbl.HOUSE_NUMBER, Addresses_Id.HOUSE_NUMBER, LNSessionCodes.ADDRESSES),structureCnxt.houseNum );

            await LNCommon.triggerInputField(await LNCommon.getTextField(Addresses_Lbl.GPS_LATITUDE, Addresses_Id.GPS_LATITUDE, LNSessionCodes.ADDRESSES),structureCnxt.latitude );

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

}

export default LNMasterData;