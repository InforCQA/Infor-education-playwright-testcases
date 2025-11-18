import BaseClass from "../../testBase/BaseClass";

class EnterpriseModelWorkbenchPage extends BaseClass {

    constructor(page) {
        super();
        this.page = page;
    }

    // Iframes for Enterprise Model Workbench
    iframe = () => this.page.frameLocator("//iframe[contains(@name,'LN_')]").frameLocator("//iframe[contains(@id,'workbench-frame')]");

    /* expandSite - Button */
    expandSite = (labelText) =>
        this.iframe().locator(
            `//label[contains(normalize-space(),'${labelText}')]/parent::div//div[@class='SvgIconDiv']`
        );

    /* expandButton - Button */
    expandButton = (labelText) =>
        this.iframe().locator(
            `//label[contains(normalize-space(),'${labelText}')]/parent::div/preceding-sibling::div//div[@class='SvgIconDiv']`
        );

    /* pushPins - Assert */
    pushPins = () =>
        this.iframe().locator(`//*[local-name()='circle'][contains(@id,'OpenLayers_Geometry_Point_')]`);

    /* paneOptionLabel - Assert */
    paneOptionLabel = (labelText) =>
        this.iframe().locator(`//label[normalize-space()='${labelText}']/parent::td`);

    /* offices - Assert */
    offices = (labelText) =>
        this.iframe().locator(`//label[normalize-space()='${labelText}']/parent::div`);

    /* address - Assert */
    address = (labelText) =>
        this.iframe().locator(`//label[contains(normalize-space(),'${labelText}')]`);

    /* bostonDrilldown - Button */
    bostonDrilldown = async() =>{
        return await this.iframe().locator(
            `((//label[contains(normalize-space(),'BOSTON')]/ancestor::div[contains(@class,'DataGrid')]//div[contains(@class,'DataSection')])[2]//*[local-name()='svg'][@iconid='icon-drilldown'])[1]`
        )};

    /* headerLayoutPanel - Label */
    headerLayoutPanel = (labelText) =>
        this.iframe().locator(
            `//div[contains(@class,'HeaderLayoutPanel')]//label[normalize-space()='${labelText}']`
        );

    /* map - Map */
    map = () =>
        this.iframe().locator(
            `//*[local-name()='svg'][contains(@id,'OpenLayers_Layer_Vector_RootContainer')]`
        );

    /* zoomIn - Button */
    zoomIn = () =>
        this.iframe().locator(`//*[local-name()='svg'][@iconid='icon-zoom-in']`);

    /* siteFilter - Input */
    siteFilter = async(labelText) =>{
        return await this.iframe().locator(`(//label[normalize-space()='${labelText}']/ancestor::*[@class='Row ColumnHeaderRow']/following-sibling::*//input[contains(@class,'TextInputField')])[1]`);
}};

export default EnterpriseModelWorkbenchPage;