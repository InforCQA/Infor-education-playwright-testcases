import BaseClass from "../../../testBase/BaseClass";


class CustomGroupsPage extends BaseClass {

    constructor(page) {
        super();
        this.page = page;
    }

    // Iframes for Enterprise Model Workbench
    iframe = () => this.page.frameLocator("//iframe[contains(@name,'fsm_')]");

    /* Search -- Icon */
    conditionsSearch = async() =>{
        return await(await this.iframe()).locator(
            `(//input[@name='name']/following-sibling::button[@title='Search'])[last()]`
        )};

    /* Name -- Input */
    name = async() =>{
        return await (await this.iframe()).locator(
            `//label[text()='Name']/following-sibling::input[contains(@data-automation-id,'name')]`
        )};

    /* Table Cell -- Table Cell */
	/* Dynamic element -- based on tth id and cell value */
    getNameRow = async(value, text, textarea) =>{
        return await (await this.iframe()).locator(
            `//td[@aria-describedby='${value}']/div/span[contains(text(),'${text}')]/b[text()='${textarea}']`
        )};

    /* Name -- Table heading */
    tthName = async() =>{
        return await (await this.iframe()).locator(`//th[contains(@data-column-id,'Name')]`)};

    /* Condition -- Input */
    condition = async() =>{
        return await (await this.iframe()).locator(`(//label[normalize-space()='Condition']/following-sibling::div//div[contains(@aria-label,'Condition')])[last()]`)};

    /* Literal -- Checkbox */
    literal = async() =>{
        return await (await this.iframe()).locator(`(//label[text()='Literal']/following-sibling::input)[last()]`)};

    /* Literal Value -- Input */
    literalValue = async() =>{
        return await (await this.iframe()).locator(
            `(//label[text()='Value']/following-sibling::input[contains(@id,'literal')])[last()]`)};

    /* headerLayoutPanel - Label */
    conditions = async() =>{
        return await (await this.iframe()).locator(
            `//h3[text()='Conditions']`)};

    /* map - Map */
    option = async() =>{
        return await (await this.iframe()).locator(
            `(//label[normalize-space()='Option']/following-sibling::div//div[contains(@aria-label,'Option')])[last()]`)};
};

export default CustomGroupsPage;