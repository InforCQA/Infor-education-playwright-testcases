import BaseClass from "../../../testBase/BaseClass";

class MyInvoicesPage extends BaseClass {

        constructor(page) {
        super();
        this.page = page;
    }

    // Iframes for Enterprise Model Workbench
    iframe = () => this.page.frameLocator("//iframe[contains(@name,'fsm_')]");

        /* Search -- Icon */
    autoApprove = async() =>{
        return await(await this.iframe()).locator(
            `//p[contains(@id,'RoutingInformation')][text()='Auto Approve']`
        )};

    /* Name -- Input */
    getNewProcessor = async(arialbl, text) =>{
        return await (await this.iframe()).locator(
            `//td[@aria-describedby='${arialbl}']/div[not(text()='${text}')]`
        )};

    /* Table Cell -- Table Cell */
	/* Dynamic element -- based on tth id and cell value */
    emailContents = async() =>{
        return await (await this.iframe()).locator(
            `//span[text()='Contents']/parent::div//div[contains(@id,'EmailContents')]`
        )};

    /* Name -- Table heading */
    input = async(text, id) =>{
        return await (await this.iframe()).locator(`//label[translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${text}']/following-sibling::div//input[@id='${id}']`)};

}

export default MyInvoicesPage;