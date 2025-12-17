const { default: BaseClass } = require("../../testBase/BaseClass");

class FSMCommonPageWithOutFrame extends BaseClass {

    constructor(page) {
        super();
        this.page = page;
    }

    cnfMsgActionCompleted = async () => {
        return await this.page.locator("//div[@toast-message-result='ActionCompleted']");
    };

    btnClose = async () => {
        return await this.page.locator("//button[contains(@class,'btn-close')]");
    };

    dropdownValues = async (text) => {
        return await this.page.locator(`//a[starts-with(text(),'${text}')]`);
    };

    dialogBtns = async (label) => {
        return await this.page.locator(`//span[text()='${label}']/parent::button`);
    };

    toolbarIcons = async (text, id) => {
        return await this.page.locator(`//button[normalize-space()='${text}'][contains(@id,'${id}')]`);
    };

    pageTitle = async () => {
        return await this.page.locator("//span[contains(@class,'page-title')]");
    };

    activeTab = async () => {
        return await this.page.locator("//li[not(contains(@class,'hidden'))][@role='tab'][contains(@class,'is-selected')]");
    };

    tableTitle = async (toolbar, name) => {
        return await this.page.locator(`//span[contains(@id,'toolbar_title')][contains(@id,'${toolbar}')][text()='${name}']`);
    };

    gridTitle = async (id) => {
        return await this.page.locator(`//div[@id='${id}']`);
    };

    thColumn = async (col, id) => {
        return await this.page.locator(`//span[text()='${col}']/ancestor::th[contains(@id,'${id}')][not(contains(@class,'is-hidden'))][not(contains(@id,'group'))]`);
    };

    row = async (colId, value) => {
        return await this.page.locator(`//td[@aria-describedby='${colId}']/div[contains(normalize-space(),'${value}')]/ancestor::tr`);
    };

    btnNextWithId = async (id) => {
        return await this.page.locator(`//button[contains(@id,'btn-next')][contains(@id,'${id}')]/parent::li`);
    };

    selectRow = async (row, id) => {
        return await this.page.locator(`//tr[@aria-rowindex='${row}']/td[@aria-colindex='1'][contains(@aria-describedby,'${id}')]//span[contains(@class,'datagrid-selection-checkbox')]`);
    };

    gridCellType = async (row, id) => {
        return await this.page.locator(`//tr[@aria-rowindex='${row}']/td[@aria-describedby='${id}']//input`);
    };

    popUpMessages = async () => {
        return await this.page.locator("//div[@id='message-text']");
    };

    lnkTabs = async (name) => {
        return await this.page.locator(`//li[not(contains(@class,'hidden'))]//a[@role='tab'][normalize-space()='${name}']`);
    };

    btnMoreTabs = async () => {
        return await this.page.locator("//div[contains(@class,'tab-more')]");
    };

    lnkMoreTabs = async (name) => {
        return await this.page.locator(`//a[@role='menuitem'][normalize-space()='${name}'] | //a[@role='tab'][normalize-space()='${name}']`);
    };

    btnSubmit = async () => {
        return await this.page.locator("//button[normalize-space()='Submit']");
    };

    datagrid = async (id) => {
        return await this.page.locator(`//div[contains(@id,'${id}')][contains(@class,'grid')][not(contains(@class,'is-hidden'))]`);
    };

    filter = async (col, id) => {
        return await this.page.locator(`//span[normalize-space()='${col}']/ancestor::th[contains(@id,'${id}')][not(contains(@class,'is-hidden'))]//input`);
    };

    rowForTwoCols = async (col1, val1, col2, val2) => {
        return await this.page.locator(
            `//td[@aria-describedby='${col1}'][contains(normalize-space(),'${val1}')]/following-sibling::td[@aria-describedby='${col2}'][contains(normalize-space(),'${val2}')]/ancestor::tr 
            | //td[@aria-describedby='${col1}'][contains(normalize-space(),'${val1}')]/preceding-sibling::td[@aria-describedby='${col2}'][contains(normalize-space(),'${val2}')]/ancestor::tr`
        );
    };

    checkbox = async (label, id) => {
        return await this.page.locator(
            `//label[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${label}']/preceding-sibling::input[contains(@class,'checkbox')][@id='${id}'] 
            | //th[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${label}']/parent::tr//input[contains(@class,'checkbox')][@id='${id}'] 
            | //p[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${label}']/following::input[@id='${id}']`
        );
    };

    textbox = async (label, id) => {
        return await this.page.locator(
            `//label[translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${label}']/following-sibling::div//input[@id='${id}'] 
            | //label[translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${label}']/following-sibling::span//input[@id='${id}'] 
            | //label[translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${label}']/following-sibling::input[@id='${id}']`
        );
    };

    dropdown = async (label, id) => {
        return await this.page.locator(
            `//label[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${label}']/following-sibling::div/div[contains(@class,'dropdown')][@data-automation-id='${id}'] 
            | //label[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${label}']/following-sibling::div/div[contains(@class,'dropdown')]`
        );
    };

    textarea = async (label, id) => {
        return await this.page.locator(
            `//label[translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${label}']/following-sibling::div//textarea[@id='${id}']`
        );
    };

    radioButton = async (label, id) => {
        return await this.page.locator(`//label[normalize-space()='${label}']/preceding-sibling::input[contains(@class,'radio')][@id='${id}']`);
    };

    lnkMenuOptions = async (name, id) => {
        return await this.page.locator(`//span[text()='${name}']/parent::a/parent::div[contains(@id,'${id}')][not(contains(@menuindex,'.'))]`);
    };

    lnkMenuSubOptions = async (name, id) => {
        return await this.page.locator(`//span[text()='${name}']/parent::a/parent::div[contains(@id,'appmenu')][contains(@menuindex,'${id}')][not(@menuindex='${id}')]`);
    };

    btnToggleMenu = async () => {
        return await this.page.locator("//button[@id='app-menu-trigger']");
    };

    actionMenuBtn = async (label) => {
        return await this.page.locator(`//button[normalize-space()='${label}']`);
    };

    btnAction = async (id) => {
        return await this.page.locator(`//button[contains(@class,'btn-actions')]/parent::*[contains(@id,'${id}')]/button`);
    };

    actionMenuOptions = async (name) => {
        return await this.page.locator(`//ul[contains(@class,'is-open')]//li[not(contains(@class,'hidden'))]//a[@role='menuitem'][normalize-space()='${name}']`);
    };

    popupButtons = async (name, id) => {
        return await this.page.locator(`//span[text()='${name}']/parent::button | //button[@id='${id}'] | //button[normalize-space()='${name}']`);
    };

    gridCellClick = async (row, id) => {
        return await this.page.locator(`//tr[@aria-rowindex='${row}']/td[@aria-describedby='${id}']//div`);
    };

    heading = async () => {
        return await this.page.locator("//div[contains(@class,'heading')]//div");
    };

    dlgBoxTableTitle = async (name) => {
        return await this.page.locator(`//span[contains(@id,'toolbar_title')][text()='${name}']`);
    };

    captcha = async () => {
        return await this.page.locator("//input[@class='ng-untouched ng-pristine ng-valid']");
    };

    nextBtn = async () => {
        return await this.page.locator("//button[contains(@class,'tertiary')][normalize-space()='Next']");
    };

    unlabeledTextField = async (id) => {
        return await this.page.locator(`//input[@id='${id}'`);
    };

    modalTitle = async () => {
        return await this.page.locator("//h1[contains(@class,'modal-title')]");
    };
}
export default FSMCommonPageWithOutFrame;
