import BaseClass from "../../testBase/BaseClass";


class FSMCommonPage extends BaseClass {

     constructor(page) {
        super(page);
        this.page = page;
    }

    iframe = async () => {
        return this.page.frameLocator("//iframe[contains(@name,'fsm_')]");
    };

    btnToggleMenu = async () => {
        return await (await this.iframe()).locator("//button[@id='app-menu-trigger']");
    };

    drpApplicationSwitcher = async () => {
        return await (await this.iframe()).locator("//div[@data-automation-id='custom-automation-dropdown-id']");
    };

    txtApplicationSwitcher = async () => {
        return await (await this.iframe()).locator("//div[@data-automation-id='custom-automation-dropdown-id']/span/span");
    };

    roleSwitcherOptions = async (option) => {
        return await (await this.iframe()).locator(`//ul[@id='listbox']//a[normalize-space()="${option}"]`);
    };

    lnkMenuOptions = async (text, idPart) => {
        return await (await this.iframe()).locator(`//span[text()='${text}']/parent::a/parent::div[contains(@id,'${idPart}')][not(contains(@menuindex,'.'))]`);
    };

    lnkMenuSubOptions = async (text, idPart, equalPart) => {
        return await (await this.iframe()).locator(`//span[text()='${text}']/parent::a/parent::div[contains(@id,'appmenu')][contains(@menuindex,'${idPart}')][not(@menuindex='${equalPart}')]`);
    };

    lnkMoreTabs = async (tab) => {
        return await (await this.iframe()).locator(`//a[contains(@role,'menuitem')][normalize-space()="${tab}"] | //a[contains(@role,'tab')][normalize-space()='${tab}']`);
    };

    getRequiredRow = async (id, value) => {
        return await (await this.iframe()).locator(`//td[@aria-describedby='${id}']/div[text()='${value}']/ancestor::tr`);
    };

    getReqRowPartial = async (id, value) => {
        return await (await this.iframe()).locator(`//td[@aria-describedby='${id}']/div[contains(text(),'${value}')]`);
    };

    lnkTabs = async (tab) => {
        return await (await this.iframe()).locator(`//li[not(contains(@class,'hidden'))]//a[@role='tab'][normalize-space()='${tab}']`);
    };

    btnClose = async () => {
        return await (await this.iframe()).locator("//button[contains(@class,'btn-close')]");
    };

    dropdownValues = async (value) => {
        return await (await this.iframe()).locator(`//a[starts-with(normalize-space(),'${value}')][@role='option']`);
    };

    popUpMessages = async () => {
        return await (await this.iframe()).locator(`//div[@id='message-text']`);
    };

    popUpButtons = async (idPart) => {
        return await (await this.iframe()).locator(`//div[@aria-describedby='message-text']//button[contains(@id,'${idPart}')]`);
    };

    cnfMsgActionCompleted = async () => {
        return await (await this.iframe()).locator("//div[@toast-message-result='ActionCompleted']");
    };

    btnOk = async () => {
        return await (await this.iframe()).locator("//span[text()='Ok']/parent::button");
    };

    btnSubmit = async () => {
        return await (await this.iframe()).locator("//span[text()='Submit']/parent::button | //span[text()='Submit']/ancestor::button");
    };

    btnDoneEditing = async () => {
        return await (await this.iframe()).locator("//button[contains(@id,'DoneEditing')]");
    };

    errorsExistMsg = async () => {
        return await (await this.iframe()).locator("//span[contains(@id,'ErrorsExistMsg')]");
    };

    checkboxes = async (idPart) => {
        return await (await this.iframe()).locator(`//input[@type='checkbox'][contains(@id,'${idPart}')]`);
    };

    employeeName = async () => {
        return await (await this.iframe()).locator("//h2[@class='actor-name']");
    };

    linkByID = async (idPart) => {
        return await (await this.iframe()).locator(`//a[contains(@id,'${idPart}')]`);
    };

    alreadyExistsErrorMsg = async () => {
        return await (await this.iframe()).locator("//div[@class='error-message'][contains(@data-rule-id,'Already Exists')] | //div[@class='error-message'][contains(@data-rule-id,'Name')]");
    };

    actionMenuOptions = async (text) => {
        return await (await this.iframe()).locator(`//ul[contains(@class,'is-open')]//li[not(contains(@class,'hidden'))]//a[@role='menuitem'][normalize-space()="${text}"]`);
    };

    actionMenuBtn = async (text) => {
        return await (await this.iframe()).locator(`//button[normalize-space()='${text}']`);
    };

    btnAction = async (idPart) => {
        return await (await this.iframe()).locator(`//button[contains(@class,'btn-actions')]/parent::*[contains(@id,'${idPart}')]/button`);
    };

    popupButtons = async (text) => {
        return await (await this.iframe()).locator(`//span[text()='${text}']/parent::button`);
    };

    chkSelectAll = async (idPart) => {
        return await (await this.iframe()).locator(`//th[contains(@id,'${idPart}')]/div[contains(@class,'checkbox')]/span[contains(@class,'checkbox')]`);
    };

    gridFilterValues = async (text) => {
        return await (await this.iframe()).locator(`(//span[text()='${text}']//parent::a[contains(@role,'menuitem')])[last()]`);
    };

    pageTitle = async () => {
        return await (await this.iframe()).locator("//span[contains(@class,'page-title')]");
    };

    toolbarIcons = async (lowerText, idPart) => {
        return await (await this.iframe()).locator(`//button[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${lowerText}'][contains(@id,'${idPart}')]`);
    };

    activeTab = async () => {
        return await (await this.iframe()).locator("//li[not(contains(@class,'hidden'))][@role='tab'][contains(@class,'is-selected')]");
    };

    tableTitle = async (tableId, title) => {
        return await (await this.iframe()).locator(`//span[contains(@id,'toolbar_title')][contains(@id,'${tableId}')][normalize-space()='${title}']`);
    };

    thColumn = async (colName, tableId) => {
        return await (await this.iframe()).locator(`//span[normalize-space()='${colName}']/ancestor::th[contains(@id,'${tableId}')][not(contains(@class,'is-hidden'))][not(contains(@id,'group'))]`);
    };

    row = async (colId, value) => {
        return await (await this.iframe()).locator(`//td[@aria-describedby='${colId}']/div[normalize-space()='${value}']/ancestor::tr`);
    };

    btnNextWithId = async (idPart) => {
        return await (await this.iframe()).locator(`//button[contains(@id,'btn-next')][contains(@id,'${idPart}')]/parent::li`);
    };

    rowLink = async (colId, value) => {
        return await (await this.iframe()).locator(`//td[@aria-describedby='${colId}']//a[normalize-space()='${value}']`);
    };

    filter = async (colName, tableId) => {
        return await (await this.iframe()).locator(`//span[text()='${colName}']/ancestor::th[contains(@id,'${tableId}')][not(contains(@class,'is-hidden'))]//input`);
    };

    userAccountBtns = async (text) => {
        return await (await this.iframe()).locator(`//a[normalize-space()='${text}']`);
    };

    datagrid = async (idPart) => {
        return await (await this.iframe()).locator(`//div[contains(@id,'${idPart}')][contains(@class,'grid')][not(contains(@class,'is-hidden'))]`);
    };

    businessEntity = async (id) => {
        return await (await this.iframe()).locator(`//p[@aria-label='Business Entity'][contains(@id,'${id}')]`);
    };

    txtBusinessEntity = async (id) => {
        return await (await this.iframe()).locator(`//input[@aria-label='Business Entity'][contains(@id,'${id}')]`);
    };

    costCenter = async (id) => {
        return await (await this.iframe()).locator(`//p[@aria-label='Cost Center'][contains(@id,'${id}')]`);
    };

    txtCostCenter = async (id) => {
        return await (await this.iframe()).locator(`//input[@aria-label='Cost Center'][contains(@id,'${id}')]`);
    };

    account = async (id) => {
        return await (await this.iframe()).locator(`//p[@aria-label='Account'][contains(@id,'${id}')]`);
    };

    txtAccount = async (id) => {
        return await (await this.iframe()).locator(`//input[@aria-label='Account'][contains(@id,'${id}')]`);
    };

    dlgBoxTableTitle = async (text) => {
        return await (await this.iframe()).locator(`//span[contains(@id,'toolbar_title')][text()='${text}']`);
    };

    gridCellClick = async (row, colId) => {
        return await (await this.iframe()).locator(`//tr[@aria-rowindex='${row}']/td[@aria-describedby='${colId}']//div`);
    };

    gridCellType = async (row, colId) => {
        return await (await this.iframe()).locator(`//tr[@aria-rowindex='${row}']/td[@aria-describedby='${colId}']//input`);
    };

    selectRow = async (row, idPart) => {
        return await (await this.iframe()).locator(`//tr[@aria-rowindex='${row}']/td[@aria-colindex='1'][contains(@aria-describedby,'${idPart}')]//span[contains(@class,'datagrid-selection-checkbox')]`);
    };

    getCellValue = async (row, colId) => {
        return await (await this.iframe()).locator(`//tr[@aria-rowindex='${row}']/td[@aria-describedby='${colId}']`);
    };

    firstRecord = async () => {
        return await (await this.iframe()).locator("(//tr[@aria-rowindex='1']//span[@role='checkbox'])[last()]");
    };

    searchFieldInMenu = async () => {
        return await (await this.iframe()).locator("//input[contains(@id,'searchfield')]");
    };

    close = async () => {
        return await (await this.iframe()).locator("//span[text()='Close']/parent::button");
    };

    btnMoreHeaderTabs = async () => {
        return await (await this.iframe()).locator("//div[contains(@class,'header-tabs')][not(contains(@class,'detail'))]//div[contains(@class,'tab-more')][contains(@data-automation-id,'more')]");
    };

    toExpandRow = async (colId, text) => {
        return await (await this.iframe()).locator(`//td[contains(@aria-describedby,'${colId}')]//span[normalize-space()='${text}']//preceding-sibling::button`);
    };

    lnkTabsPartial = async (tab) => {
        return await (await this.iframe()).locator(`//li[not(contains(@class,'hidden'))]//a[@role='tab'][contains(normalize-space(),'${tab}')]`);
    };

    drpFilter = async (colName, tableId) => {
        return await (await this.iframe()).locator(`//span[text()='${colName}']/ancestor::th[contains(@id,'${tableId}')][not(contains(@class,'is-hidden'))]//div[@class='dropdown']`);
    };

    project = async (id) => {
        return await (await this.iframe()).locator(`//p[@aria-label='Project'][contains(@id,'${id}')]`);
    };

    txtProject = async (id) => {
        return await (await this.iframe()).locator(`//input[@aria-label='Project'][contains(@id,'${id}')]`);
    };

    drpValueToSelectAll = async () => {
        return await (await this.iframe()).locator("//a[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='select all'][@role='option']");
    };

    toBusinessEntity = async (id) => {
        return await (await this.iframe()).locator(`//p[@aria-label='To Business Entity'][contains(@id,'${id}')]`);
    };

    txtToBusinessEntity = async (id) => {
        return await (await this.iframe()).locator(`//input[@aria-label='To Business Entity'][contains(@id,'${id}')]`);
    };

    ledger = async (id) => {
        return await (await this.iframe()).locator(`//p[@aria-label='Ledger'][contains(@id,'${id}')]`);
    };

    txtLedger = async (id) => {
        return await (await this.iframe()).locator(`//input[@aria-label='Ledger'][contains(@id,'${id}')]`);
    };

    rowBtn = async (row, colId, value) => {
        return await (await this.iframe()).locator(`//tr[@aria-rowindex='${row}']/td[@aria-describedby='${colId}']/div[contains(normalize-space(),'${value}')]/button`);
    };

    pageSizeBtn = async (idPart) => {
        return await (await this.iframe()).locator(`//button[contains(@id,'pagesize')][contains(@id,'${idPart}')]`);
    };

    recordsPerPg = async (value) => {
        return await (await this.iframe()).locator(`//ul[contains(@class,'is-open')]//a[normalize-space()='${value}']`);
    };

    lookupBtn = async (row, colId) => {
        return await (await this.iframe()).locator(`//tr[@aria-rowindex='${row}']/td[@aria-describedby='${colId}']//input/following-sibling::button`);
    };

    // lookupBtn -- Dynamic button
    lookupBtn = async (row, colId) => {
        return await (await this.iframe()).locator(`//tr[@aria-rowindex='${row}']/td[@aria-describedby='${colId}']//input/following-sibling::button`);
    };

    // Item Field in lookup -- Input
    itemInLookup = async () => {
        return await (await this.iframe()).locator("//input[@id='ItemSearchForm_Item']");
    };

    // modalTitle -- Assert
    modalTitle = async () => {
        return await (await this.iframe()).locator("//h1[contains(@class,'modal-title')]|//div[contains(@class,'tooltip-title')]");
    };

    // drpUpdateFilter -- Dynamic element based on column name and table id
    drpUpdateFilter = async (colName, tableId) => {
        return await (await this.iframe()).locator(`//span[text()='${colName}']/ancestor::th[contains(@id,'${tableId}')]//button[contains(@class,'filter')]`);
    };

    // textbox -- Dynamic input
    textbox = async (labelText, inputId) => {
        return await (await this.iframe()).locator(`//label[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${labelText}']/following-sibling::div//input[@id='${inputId}']` +
            ` | ` +
            `//label[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${labelText}']/following-sibling::span//input[@id='${inputId}']` +
            ` | ` +
            `//label[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${labelText}']/following-sibling::input[@id='${inputId}']` +
            ` | ` +
            `//label[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${labelText}']/following-sibling::input[@data-automation-id='${inputId}']` +
            ` | ` +
            `//label[translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${labelText}']/following-sibling::div//input[@id='${inputId}']` +
            ` | ` +
            `//label[translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${labelText}']/following-sibling::span//input[@id='${inputId}']` +
            ` | ` +
            `//label[translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${labelText}']/following-sibling::input[@id='${inputId}']` +
            ` | ` +
            `//label[translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${labelText}']/following-sibling::input[@data-automation-id='${inputId}']` +
            ` | ` +
            `//th[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${labelText}']//following-sibling::td//input[@id='${inputId}']` +
            ` | ` +
            `//label[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${labelText}']/following-sibling::div/span//input[@id='${inputId}']` +
            ` | ` +
            `//h2[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${labelText}']/following::input[@id='${inputId}']` +
            ` | ` +
            `//h5[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${labelText}']/ancestor::div/following-sibling::div//span/input[@id='${inputId}']` +
            ` | ` +
            `//p[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${labelText}']/ancestor::div//input[@id='${inputId}']` +
            ` | ` +
            `//label[contains(translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'${labelText}')]/following-sibling::*//input[@id='${inputId}']` +
            ` | ` +
            `//label[contains(translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'${labelText}')]/following-sibling::*//input[@id='${inputId}']` +
            ` | ` +
            `//label[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${labelText}']/following-sibling::div//p[@id='${inputId}']` +
            ` | ` +
            `//label[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${labelText}']/following-sibling::div//span[@id='${inputId}']` +
            ` | ` +
            `//h3[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${labelText}']/ancestor::*//input[@id='${inputId}']` +
            ` | ` +
            `//h4[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${labelText}']/ancestor::div/following-sibling::div//span/input[@id='${inputId}']`
        );
    };

    // dropdown -- Dynamic input
    dropdown = async (labelText, automationId) => {
        return await (await this.iframe()).locator(
            `//p[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${labelText}']/ancestor::*/following-sibling::*//div[contains(@class,'dropdown')][@data-automation-id='${automationId}']
         | (//label[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${labelText}']/following-sibling::div/div[contains(@class,'dropdown')])[last()]
         | //h2[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${labelText}']/ancestor::div//div[contains(@class,'dropdown')][@data-automation-id='${automationId}']
         | //label[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${labelText}']/following-sibling::div/div[contains(@class,'dropdown')][@data-automation-id='${automationId}'] | //label[contains(translate(normalize-space(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'),'${labelText}')]/following-sibling::div/div[contains(@class,'dropdown')][@data-automation-id='${automationId}']`
        );
    };


    // checkbox -- Dynamic input
    checkbox = async (labelText, checkboxId) => {

    return await (await this.iframe()).locator(`
        xpath=(//label[contains(translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'${labelText}')]/preceding-sibling::input[contains(x@class,'checkbox')][@id='${checkboxId}'] | //th[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${labelText}']/parent::tr//input[contains(@class,'checkbox')][@id='${checkboxId}'] |
        //p[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${labelText}']/following::input[@id='${checkboxId}'] |
        //label[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${labelText}']/following-sibling::input[contains(@class,'checkbox')][@id='${checkboxId}'] |
        //th[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${labelText}']/ancestor::thead/following-sibling::tbody//input[contains(@class,'checkbox')][@id='${checkboxId}'] |
        //p[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${labelText}']/ancestor::div//following-sibling::div//input[@id='${checkboxId}'])`);
};


    // radioButton -- Input
    radioButton = async (radioId, labelText) => {
        return await (await this.iframe()).locator(`//input[contains(@class,'radio')][@id='${radioId}']/following-sibling::label[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${labelText}']`);
    };

    // lookUpIcon -- Button
    lookUpIcon = async (labelText, inputId) => {
    return await (await this.iframe()).locator(
        `//label[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${labelText}']/following-sibling::*//input[@data-automation-id='${inputId}']/following-sibling::button
         | //label[translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${labelText}']/following-sibling::div//input[@id='${inputId}']/following-sibling::button
         | //label[translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${labelText}']/following-sibling::*//input[@data-automation-id='${inputId}']/following-sibling::button
         | //label[translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${labelText}']/following-sibling::*//input[contains(@id,'${inputId}')]/following-sibling::button
         | //h4[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${labelText}']/ancestor::div/following-sibling::div//span/input[@id='${inputId}']/following-sibling::button`
    );
};

    // textarea -- Input
    textarea = async (labelText, inputId) => {
        return await (await this.iframe()).locator(`//label[translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${labelText}']/following-sibling::div//textarea[@id='${inputId}']`);
    };

    // rowForTwoCols -- Dynamic element
    rowForTwoCols = async (col1Id, col1Value, col2Id, col2Value) => {
        return await (await this.iframe()).locator(`//td[@aria-describedby='${col1Id}'][contains(normalize-space(),'${col1Value}')]/ancestor::*//td[@aria-describedby='${col2Id}'][contains(normalize-space(),'${col2Value}')]/ancestor::tr`);
    };

    // leftPanelOption -- Dynamic
    leftPanelOption = async (value) => {
        return await (await this.iframe()).locator(`//span[contains(@class,'card-field')][(text()='${value}')]`);
    };

    // labels -- Label text
    labels = async (labelText) => {
        return await (await this.iframe()).locator(`//label[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${labelText}']`);
    };

    // btnWithId -- Dynamic button
    btnWithId = async (btnText, btnId) => {
        return await (await this.iframe()).locator(`//span[text()='${btnText}']/parent::button[contains(@id,'${btnId}')]`);
    };

    // headers -- Text assert
    headers = async (headerText) => {
        return await (await this.iframe()).locator(`//*[contains(@class,'header')][normalize-space()='${headerText}']`);
    };

    // textData -- Input
    textData = async (labelText, inputId) => {
        return await (await this.iframe()).locator(`
        //label[translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${labelText}']/following-sibling::div//p[contains(@id,'${inputId}')]
        | //label[translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${labelText}']/following-sibling::div//span//input[contains(@id,'${inputId}')]
        | //label[translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${labelText}']/following-sibling::div//input[contains(@id,'${inputId}')]
        | //label[translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${labelText}']/following-sibling::div//span[contains(@id,'${inputId}')]
        | //th[translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${labelText}']/ancestor::*//tbody//tr//td//p[contains(@id,'${inputId}')]
        | //th[translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${labelText}']/ancestor::*//tbody//tr//td//input[contains(@id,'${inputId}')]
    `);
    };

    // Normal Text box -- Click
    normalTextBox = async () => { return await (await this.iframe()).locator("//label[translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='description']/following-sibling::div//div[@id='InternalEventLinesComposite_Description']"); };

    // CardField -- Dynamic element based on vendor name
    cardField = async (vendorName) => { return await (await this.iframe()).locator(`//div[contains(@class,'lm-card')]//span[contains(text(),"${vendorName}")]`); };

    // Text Assert -- Widget Title
    widgetTitle = async (title) => { return await (await this.iframe()).locator(`//*[contains(@class,'widget-title')][normalize-space()='${title}']`); };

    // Unlabeled TextField -- Input
    unlabeledTextField = async (id) => { return await (await this.iframe()).locator(`//input[@id='${id}'] | //input[@data-automation-id='${id}']`); };

    // Confirmation message text
    cnfMsgText = async () => { return await (await this.iframe()).locator("//div[@toast-message-result='ActionCompleted']//span[@class='toast-message']"); };

    // Search field
    searchFieldPristine = async () => { return await (await this.iframe()).locator("//input[contains(@class,'searchfield')][contains(@class,'ng-valid')][not(contains(@id,'menu'))]"); };

    // Link By Text
    linkByText = async (text, id) => { return await (await this.iframe()).locator(`//span[text()='${text}']/parent::a[@id='${id}']`); };

    // Attachment file upload button
    attachmentFileUpload = async () => { return await (await this.iframe()).locator("//input[contains(@id,'filename')]/parent::div/span[@class='trigger']/*[local-name()='svg']"); };

    // Description for Text Field
    descForTextField = async (label, id) => { return await (await this.iframe()).locator(`//label[text()='${label}']/ancestor::*/following-sibling::*//p[@id='${id}']`); };

    // Table Text Input
    tableText = async (header, inputId) => { return await (await this.iframe()).locator(`//th[translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${header}']/ancestor::*//following-sibling::*//td//div//input[contains(@id,'${inputId}')]`); };

    // Card Field Value
    cardFieldValue = async (label) => { return await (await this.iframe()).locator(`//label[text()='${label}']/following-sibling::span`); };

    // Field Update Filter
    fieldUpdateFilter = async (label) => { return await (await this.iframe()).locator(`//label[translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${label}']/following-sibling::*//div[@role='combobox']`); };

    // Heading
    heading = async () => { return await (await this.iframe()).locator("//div[contains(@class,'heading')]"); };

    // Create Report Menu
    createReport = async () => { return await (await this.iframe()).locator("//span[text()='Create Report']/parent::a"); };

    // Default Filter Values
    defaultFilterValues = async (value) => { return await (await this.iframe()).locator(`(//*[text()='${value}']//parent::a[contains(@role,'option')])[last()]`); };

    // Personalization Report Name
    personalizationReportName = async () => { return await (await this.iframe()).locator("//p[contains(@id,'reportName')]"); };

    // Button with Id
    buttonWithId = async (id) => { return await (await this.iframe()).locator(`//button[@id='${id}'] |//button[@data-automation-id='${id}']`); };

    // Anchor with text
    anchorWithText = async (text) => { return await (await this.iframe()).locator(`//a[text()='${text}']`); };

    // Dropdown Checkbox Option
    drpChkOptions = async (text) => { return await (await this.iframe()).locator(`//a[normalize-space()='${text}']`); };

    // Module Container
    moduleContainer = async () => { return await (await this.iframe()).locator("//button[@id='app-menu-trigger']/ancestor::*[local-name()='soho-module-nav-container']"); };

    // More Detail Tabs
    btnMoreDetailTabs = async () => { return await (await this.iframe()).locator("//div[contains(@class,'header-tabs')][contains(@class,'detail')]//div[contains(@class,'tab-more')][contains(@data-automation-id,'more')]"); };

    // Home Button
    homeBtn = async () => { return await (await this.iframe()).locator("//button[@id='module-nav-homepage-btn']"); };

    // Link
    link = async (text) => { return await (await this.iframe()).locator(`//span[text()='${text}']/parent::a`); };

    // Toolbar Icon
    toolbarIcon = async (text, id) => { return await (await this.iframe()).locator(`//button[normalize-space()='${text}'][contains(@id,'${id}')][@disabled]`); };

    // Attachment input
    attachment = async () => { return await (await this.iframe()).locator("//input[contains(@id,'filename')]"); };

    // Title input
    title = async () => { return await (await this.iframe()).locator("//input[contains(@id,'CommentCodesForm_Attachment_prd_File-filename')]"); };

    // Input in Table
    inputInTable = async (rowText, id) => { return await (await this.iframe()).locator(`//p[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${rowText}']/ancestor::tr//following-sibling::tr//input[@id='${id}'] | //p[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${rowText}']/ancestor::*/following-sibling::*//div//input[contains(@id,'${id}')]`); };

    // Next button
    nextBtn = async () => { return await (await this.iframe()).locator("//button[contains(@class,'tertiary')][normalize-space()='Next']"); };

    // Event Status in Chart
    eventStatusInChart = async (status) => { return await (await this.iframe()).locator(`//span[contains(@class,'chart-legend')]//span[contains(text(),'${status}')]`); };

    // Hyperlink
    hyperlink = async (text) => { return await (await this.iframe()).locator(`//span[text()='${text}']/parent::a[contains(@class,'hyperlink')]`); };

    // Search Field
    searchField = async () => { return await (await this.iframe()).locator("//input[contains(@class,'searchfield')][not(contains(@id,'menu'))]"); };

     // dropdownTable -- Dropdown
    dropdownInTable = async (columnId, dataId) => { 
        return await (await this.iframe()).locator(`//th[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${columnId}']/ancestor::tr/parent::thead//following-sibling::tbody//tr//div[@data-automation-id='${dataId}']`);
    };

    // launch -- button
    launch = async (label) => { 
        return await (await this.iframe()).locator(`//label[text()='${label}']/following-sibling::div//button[@id='CompactForm']`);
    };

    // labels -- labels
    labelsWithId = async (label, id) => { 
        return await (await this.iframe()).locator(`//label[normalize-space()='${label}'][contains(@for,'${id}')]`);
    };

    // Search -- Button
    btnFilterSearch = async () => { 
        return await (await this.iframe()).locator("//button[@title='Filter Search']");
    };

    // row -- Dynamic element based on column id and cell value
    rowValue = async (colId, cellValue) => { 
        return await (await this.iframe()).locator(`//td[@aria-describedby='${colId}']/div[normalize-space()='${cellValue}']/ancestor::tr`);
    };

    // expandMenuItem -- button
    expandMenuItem = async (text, id) => { 
        return await (await this.iframe()).locator(`//span[normalize-space()='${text}']/ancestor::div[contains(@id,'${id}')]`);
    };

    // columnLayout -- button
    columnLayout = async (colName) => { 
        return await (await this.iframe()).locator(`//*[contains(@class,'lm-column-layout')]//th[text()='${colName}']`);
    };

    // partialRowLink -- Dynamic element based on column id and cell value
    partialRowLink = async (colId, cellText) => { 
        return await (await this.iframe()).locator(`//td[@aria-describedby='${colId}']//a[contains(normalize-space(),'${cellText}')]`);
    };

    // verifyQuantities -- Input
    verifyQuantities = async (label, id) => { 
        return await (await this.iframe()).locator(`//p[translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${label}']/ancestor::div/following-sibling::*//p[@id='${id}']`);
    };

    // Search by Name -- Input
    searchByName = async () => { 
        return await (await this.iframe()).locator("//input[@placeholder='Search by Name']");
    };

    // fieldButton
    fieldButton = async (label, id) => { 
        return await (await this.iframe()).locator(`//label[text()='${label}']/following-sibling::div//following-sibling::div/button[contains(@id,'${id}')]`);
    };

    // fieldOptions
    fieldOptions = async (ulId, text) => { 
        return await (await this.iframe()).locator(`//ul[@data-automation-id='${ulId}']//a[normalize-space()='${text}']`);
    };

    // fieldVerification
    fieldVerification = async (label1, label2) => { 
        return await (await this.iframe()).locator(`//label[text()='${label1}']/ancestor::*/following-sibling::tr//label[text()='${label2}']`);
    };

    // searchFilter
    searchFilter = async (ariaLabel, id) => { 
        return await (await this.iframe()).locator(`//input[contains(@aria-label,'${ariaLabel}')][contains(@id,'${id}')]`);
    };

    // unLabelDropdown
    unLabelDropdown = async (dataId) => { 
        return await (await this.iframe()).locator(`//div[@data-automation-id='${dataId}'][contains(@class,'dropdown')]`);
    };

    // gridTableText
    gridTableText = async (label, id) => { 
        return await (await this.iframe()).locator(`//*[translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${label}']/ancestor::*//following-sibling::*//p[contains(@id,'${id}')]`);
    };

    // section
    section = async (heading) => { 
        return await (await this.iframe()).locator(`//*[contains(@class,'fieldset-title')][normalize-space()='${heading}']`);
    };

    // unlabelTextData
    unlabelTextData = async (id, text) => { 
        return await (await this.iframe()).locator(`//span[contains(@id,'${id}')][contains(text(),'${text}')]`);
    };

    // clearBtn
    clearBtn = async (text, id) => { 
        return await (await this.iframe()).locator(`//span[text()='${text}']/parent::p[contains(@id,'${id}')]`);
    };

    // previousBtn
    previousBtn = async () => { 
        return await (await this.iframe()).locator("//button[contains(@class,'tertiary')][normalize-space()='Previous']");
    };

    // unlabeledDrpField
    unlabeledDrpField = async (dataId) => { 
        return await (await this.iframe()).locator(`//div[@data-automation-id='${dataId}']`);
    };

    // warningIcon
    warningIcon = async (colId, value) => { 
        return await (await this.iframe()).locator(`//td[@aria-describedby='${colId}']/div[contains(normalize-space(),'${value}')]//*[local-name()='svg'][contains(@class,'icon')]`);
    };

    // searchFieldList
    searchFieldList = async (id) => { 
        return await (await this.iframe()).locator(`//a[contains(@id,'${id}')]`);
    };

    // profileName
    profileName = async (id) => { 
        return await (await this.iframe()).locator(`//p[contains(@id,'${id}')][contains(@id,'Name_')]`);
    };

    // childRows
    childRows = async (colId, lineage) => { 
        return await (await this.iframe()).locator(`//td[@aria-describedby='${colId}']/parent::tr[@data-lineage='${lineage}']`);
    };

    // cardFieldWithId
    cardFieldWithId = async (dataId, text) => { 
        return await (await this.iframe()).locator(`//div[contains(@data-automation-id,'${dataId}')]//div[contains(@class,'ng-star-inserted')]/span[contains(text(),"${text}")]`);
    };

    // hyperlinks
    hyperlinks = async (label, text) => { 
        return await (await this.iframe()).locator(`//label[text()='${label}']/following-sibling::a[normalize-space()='${text}']`);
    };

    // refineBtn
    refineBtn = async () => { 
        return await (await this.iframe()).locator("//p//span[text()='Refine']");
    };

    // onlyMyReports
    onlyMyReports = async () => { 
        return await (await this.iframe()).locator("//label[normalize-space()='Only My Reports']");
    };

    // messageTitle
    messageTitle = async () => { 
        return await (await this.iframe()).locator("//*[@id='message-title']");
    };

    // dialogtextbox
    dialogtextbox = async (label, id) => { 
        return await (await this.iframe()).locator(`//label[contains(translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'${label}')]/following-sibling::div//input[@id='${id}']`);
    };

    // alertText
    alertText = async (rowIndex, colId) => { 
        return await (await this.iframe()).locator(`//tr[@aria-rowindex='${rowIndex}']/td[@aria-describedby='${colId}']//span[not(contains(@class,'alert-text'))]`);
    };

    // widgetArrow
    widgetArrow = async (text) => { 
        return await (await this.iframe()).locator(`//div[normalize-space()='${text}']/div/button[@icon='right-arrow']`);
    };

    // textInSpan
    textInSpan = async (text) => { 
        return await (await this.iframe()).locator(`//span[normalize-space()='${text}']`);
    };

    // btnInWidget
    btnInWidget = async (text) => { 
        return await (await this.iframe()).locator(`//div[contains(@id,'widget')]//button[normalize-space()='${text}']`);
    };

    // txtCostCenterLookup
    txtCostCenterLookup = async (id) => { 
        return await (await this.iframe()).locator(`//input[@aria-label='Cost Center'][contains(@id,'${id}')]/following-sibling::button`);
    };

    // txtAccountLookup
    txtAccountLookup = async (id) => { 
        return await (await this.iframe()).locator(`//input[@aria-label='Account'][contains(@id,'${id}')]/following-sibling::button`);
    };

    // txtAccountCategoryLookup
    txtAccountCategoryLookup = async (id) => { 
        return await (await this.iframe()).locator(`//input[@aria-label='Account Category'][contains(@id,'${id}')]/following-sibling::button`);
    };

    // accountCategory
    accountCategory = async (id) => { 
        return await (await this.iframe()).locator(`//p[@aria-label='Account Category'][contains(@id,'${id}')]`);
    };

    // anchorFieldRow
    anchorFieldRow = async (text) => { 
        return await (await this.iframe()).locator(`//a[normalize-space()='${text}']//parent::div`);
    };

    // requiredField
    requiredField = async (text) => { 
        return await (await this.iframe()).locator(`//div[@class='error-message']//p[text()='${text}']`);
    };

    // numOfRecords
    numOfRecords = async (colId) => { 
        return await (await this.iframe()).locator(`//td[@aria-describedby='${colId}']//ancestor::tr`);
    };

    // strikeLine
    strikeLine = async (label, id) => { 
        return await (await this.iframe()).locator(`//label[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${label}']/following-sibling::div//div[@id='${id}']/strike`);
    };

    // errorMessage
    errorMessage = async (id) => { 
        return await (await this.iframe()).locator(`//*[local-name()='lm-text'][@data-automation-id='${id}']//p`);
    };

    // lookupIconInFilterField
    lookupIconInFilterField = async (text, tableId) => { 
        return await (await this.iframe()).locator(`//span[normalize-space()='${text}']/ancestor::th[contains(@id,'${tableId}')][not(contains(@class,'is-hidden'))]//input/following-sibling::button`);
    };

    // triggerBtnInFilterField
    triggerBtnInFilterField = async (text, tableId) => { 
        return await (await this.iframe()).locator(`//span[normalize-space()='${text}']/ancestor::th[contains(@id,'${tableId}')][not(contains(@class,'is-hidden'))]//input/parent::span/following-sibling::button`);
    };

    // lastActionMenuOptions
    lastActionMenuOptions = async (menuItemText) => { 
        return await (await this.iframe()).locator(`(//ul[contains(@class,'is-open')]//li[not(contains(@class,'hidden'))]//a[@role='menuitem'][normalize-space()="${menuItemText}"])[last()]`);
    };

    // labelText
    labelText = async (text) => { 
        return await (await this.iframe()).locator(`//p[contains(text(),'${text}')]`);
    };

    // dropdownLast
    dropdownLast = async (label) => { 
        return await (await this.iframe()).locator(`(//label[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${label}']/following-sibling::div/div[contains(@class,'dropdown')])[last()]`);
    };

    // iconSymbol
    iconSymbol = async (rowIndex, colId) => { 
        return await (await this.iframe()).locator(`//tr[@aria-rowindex='${rowIndex}']/td[@aria-describedby='${colId}']//span//*[local-name()='svg']`);
    };

    // iconSymbolMessage
    iconSymbolMessage = async (rowIndex, colId) => { 
        return await (await this.iframe()).locator(`//tr[@aria-rowindex='${rowIndex}']/td[@aria-describedby='${colId}']//span//*[local-name()='svg']//parent::span`);
    };

    // gridCell
    gridCell = async (colId, cellText) => { 
        return await (await this.iframe()).locator(`//td[@aria-describedby='${colId}']/div[contains(normalize-space(),"${cellText}")]`);
    };

    // emptyGrid
    emptyGrid = async (text) => { 
        return await (await this.iframe()).locator(`//div[contains(@class,'empty-message')]//div[text()='${text}']`);
    };

    // subHeader
    subHeader = async (text) => { 
        return await (await this.iframe()).locator(`//*[contains(@class,'tooltip')][normalize-space()='${text}']`);
    };

    // printFileLink
    printFileLink = async (text) => { 
        return await (await this.iframe()).locator(`(//button[contains(@class,'hyperlink')][contains(text(),'${text}')])[last()]`);
    };

    // selectRowValue
    selectRowValue = async (text) => { 
        return await (await this.iframe()).locator(`//div[text()='${text}']`);
    };

    // plusIcon
    plusIcon = async (heading, text) => { 
        return await (await this.iframe()).locator(`//h2[normalize-space()='${heading}']/following-sibling::div/button[normalize-space()='${text}']`);
    };

    // enableSearchFilter
    enableSearchFilter = async (id) => { 
        return await (await this.iframe()).locator(`//button[contains(@id,'${id}')]`);
    };

    // createBtn
    createBtn = async (text) => { 
        return await (await this.iframe()).locator(`//div[@class='empty-actions']/button[normalize-space()='${text}']`);
    };

    // bodyTag
    bodyTag = async () => { 
        return await (await this.iframe()).locator("//body");
    };

    // pdfLink
    pdfLink = async (text) => { 
        return await (await this.iframe()).locator(`//span[contains(text(),'${text}')]/parent::a[contains(@class,'hyperlink')]`);
    };

    // requistionHyperLink
    requistionHyperLink = async () => { 
        return await (await this.iframe()).locator("//button[contains(@class,'hyperlink')]");
    };

    // downArrowExpand
    downArrowExpand = async (heading, id) => { 
        return await (await this.iframe()).locator(`//h1[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${heading}']/ancestor::div//div[contains(@class,'expandable')]//div[contains(@id,'${id}')]`);
    };

    // tableHeading
    tableHeading = async (widgetId, text) => { 
        return await (await this.iframe()).locator(`//h2[contains(@id,'widget_title')][contains(@id,'${widgetId}')][normalize-space()='${text}']`);
    };

    // menuWithIndex
    menuWithIndex = async (text, id) => { 
        return await (await this.iframe()).locator(`//span[text()='${text}']/parent::a/parent::div[contains(@id,'${id}')]`);
    };

    // menuItem
    menuItem = async () => { 
        return await (await this.iframe()).locator("//a[contains(@data-automation-id,'menuitem')]");
    };

    // sectionRightArrow
    sectionRightArrow = async (heading) => { 
        return await (await this.iframe()).locator(`//h2[normalize-space()='${heading}']/parent::div[@class='card-header']//button[@icon='right-arrow']`);
    };

    // widgetOption
    widgetOption = async (widgetId, text) => { 
        return await (await this.iframe()).locator(`//*[contains(translate(@data-automation-id, ' ', ''), translate('${widgetId}', ' ', ''))]/following::span[normalize-space()='${text}']`);
    };

    // breadCrumbTrail
    breadCrumbTrail = async (text) => { 
        return await (await this.iframe()).locator(`//*[normalize-space()='${text}'][@color-variant='breadcrumb'][@text-decoration!='none']`);
    };

    // reportsSelectAllDrp
    reportsSelectAllDrp = async (label) => { 
        return await (await this.iframe()).locator(`//label[text()='${label}']/ancestor::a[contains(@id,'all-list')]/input`);
    };

    // reportDrpValues
    reportDrpValues = async (label, dataId) => { 
        return await (await this.iframe()).locator(`//label[text()='${label}'][contains(@data-automation-id,'${dataId}')]`);
    };

    // reportHyperLink
    reportHyperLink = async (text) => { 
        return await (await this.iframe()).locator(`//a[contains(@class,'hyperlink')][text()='${text}']`);
    };

    // reportsDrp
    reportsDrp = async (label) => { 
        return await (await this.iframe()).locator(`//a[contains(@id,'collapsible-btn')]//label[text()='${label}']/following-sibling::span[not(contains(@class,'is-hidden'))][contains(@class,'reports')]`);
    };

    // itemCardField
    itemCardField = async (text) => { 
        return await (await this.iframe()).locator(`//span[contains(@class,'lm-card-field')][contains(normalize-space(),'${text}')]`)
        }
}

export default FSMCommonPage;
