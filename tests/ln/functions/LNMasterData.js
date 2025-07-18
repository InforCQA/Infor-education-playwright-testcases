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
import EnterpriseUnits_Lbl from "../../ln/constants/elementLbls/EnterpriseUnits_Lbl";
import EnterpriseUnits_Id from "../constants/elementIds/EnterpriseUnits_Id";
import LNPopupMsg from "../constants/LNPopupMsg";
import PlanningClusters_Lbl from "../constants/elementLbls/PlanningClusters_Lbl";
import PlanningClusters_Id from "../constants/elementIds/PlanningClusters_Id";
import Sites_Lbl from "../constants/elementLbls/Sites_Lbl";
import Sites_Id from "../constants/elementIds/Sites_Id";

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

    static async createAnEnterpriseUnit(structureCnxt) {
    console.log('=========>>>>> Create an enterprise unit started <<<<<=========');

    // Navigate to Enterprise Units session
    await LNCommon.navigateToLNModule( LNSessionTabs.MASTER_DATA, LNSessionTabs.ENTERPRISE_MODEL, LNSessionTabs.ENTERPRISE_STRUCTURE, LNSessionTabs.ENTERPRISE_UNITS );
    await LNCommon.verifySessionTab(LNSessionTabs.ENTERPRISE_UNITS);

    // Filter and check if already present
    await LNCommon.filterRequiredRecord(EnterpriseUnits_Lbl.ENTERPRISE_UNIT_GRID, EnterpriseUnits_Id.ENTERPRISE_UNIT_GRID, LNSessionCodes.ENTERPRISE_UNITS, structureCnxt.enterpriseUnit.replace('%s', "04"));

    const isPresent = await LNCommon.isRequiredRowPresent( LNSessionCodes.ENTERPRISE_UNITS, EnterpriseUnits_Lbl.ENTERPRISE_UNIT_GRID, EnterpriseUnits_Id.ENTERPRISE_UNIT_GRID, structureCnxt.enterpriseUnit.replace('%s', "04"));

    if (!isPresent) {
        // Click New
        await LNCommon.clickMainMenuItem(LNSessionCodes.ENTERPRISE_UNITS, LNMenuActions_Id.NEW);

        // Set Enterprise Unit
        await LNCommon.dataCellElement(await LNCommon.getDataCell(EnterpriseUnits_Lbl.ENTERPRISE_UNIT_GRID,EnterpriseUnits_Id.ENTERPRISE_UNIT_GRID,LNSessionCodes.ENTERPRISE_UNITS), 0, structureCnxt.enterpriseUnit.replace('%s', "04"));

        // Set Description
        await LNCommon.dataCellElement(await LNCommon.getDataCell( EnterpriseUnits_Lbl.DESCRIPTION_GRID,EnterpriseUnits_Id.DESCRIPTION_GRID, LNSessionCodes.ENTERPRISE_UNITS), 0,structureCnxt.enterpriseUnitDesc.replace('%s', "04") );
        // Verify Logistic Company
        const logisticCompany = await LNCommon.getRequiredValueFromTheGrid(
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
        await LNCommon.validateMessageAndHandlePopUp(LNPopupMsg.NO_BUSINESS_PARTNER_ASSIGNED_TO_ENTERPRISE_UNIT,LNCommons.OK);

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

static async createPlanningCluster(planningCluster, planningClusterDesc) {
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

    const streetName = await (await LNCommon.getTextField(Sites_Lbl.ADDRESS, Sites_Id.ADDRESS_DESCRIPTION, LNSessionCodes.SITE)).inputValue();
    expect(streetName).toBe(structureCnxt.street);

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

  const warehousingElement = await LNCommon.getDynamicElement(Sites_Lbl.WAREHOUSING_RDN,Sites_Id.WAREHOUSING_RDN,LNSessionCodes.SITE);

  const warehousingClass = await warehousingElement.getAttribute('class');

  if (!warehousingClass.includes(LNCommons.CHECKED)) {
    await warehousingElement.click();

    await LNCommon.validateMessageAndHandlePopUp(
      `Warehousing settings are not present for site ${structureCnxt.site}. Do you want to create them?`,
      LNCommons.YES
    );

    await LNCommon.verifySessionTab(LNSessionTabs.WAREHOUSING_SETTINGS_BY_SITE);
    await LNCommon.selectHeaderTab(LNTabs.GENERAL, LNSessionCodes.WAREHOUSING_SETTINGS_BY_SITE);
    await LNCommon.selectCheckbox( Sites_Lbl.USE_GLOBAL_WAREHOUSING_PARAMETERS_CHK,Sites_Id.USE_GLOBAL_WAREHOUSING_PARAMETERS_CHK );
    await LNCommon.clickMainMenuItem(LNSessionCodes.WAREHOUSING_SETTINGS_BY_SITE, LNMenuActions_Id.SAVE_AND_EXIT);
    await LNCommon.verifySessionTab(LNSessionTabs.SITE);
  }

  const classFinal = await warehousingElement.getAttribute('class');
  expect(classFinal).toContain(LNCommons.CHECKED);

  await screenshot("Create a site");
  await LNCommon.clickMainMenuItem(LNSessionCodes.SITE, LNMenuActions_Id.SAVE_AND_EXIT);
  await LNCommon.verifySessionTab(LNSessionTabs.SITES, page);
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

}

export default LNMasterData;