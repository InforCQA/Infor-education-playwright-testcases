import { defaultMaxListeners } from "events";
import BaseClass from "../../testBase/BaseClass";
import { assert } from "console";
import LNCustomActions from "./LNCustomActions";

class LNPage extends LNCustomActions{


    constructor(page) {
        super(page);
        this.page = page;
    }

    // Iframe for LN
    iframe = async() =>{ return await this.page.frameLocator("//iframe[contains(@name,'LN_')]")};

    /* processIndicator -- Text */
    processIndicator = () =>
        this.iframe().locator(`//div[@class='ProgressIndicator']`);

    /* optionsCaret - WebElement */
    optionsCaret = async() =>{
        return await (await this.iframe()).locator(
            `//label[text()='Options']//parent::div/following-sibling::div//*[local-name()='svg']`
        )};

    /* selectedCompany - WebElement */
    selectedCompany = () =>
        this.iframe()
            .locator(
                `//input[contains(@id,'ttdsk2003m000')][contains(@id,'comp-n1')][contains(@id,'lookup-widget')]` +
                ` | ` +
                `//input[contains(@id,'ttdsk2003m000')][contains(@id,'comp-1')][contains(@id,'lookup-widget')]`
            );

    /* logisticCompany - WebElement */
    logisticCompany = () =>
        this.iframe()
            .locator(
                `//input[contains(@id,'ttdsk2003m000')][contains(@id,'comp-n3')][contains(@id,'lookup-widget')]` +
                ` | ` +
                `//input[contains(@id,'ttdsk2003m000')][contains(@id,'comp-3')][contains(@id,'lookup-widget')]`
            );

    /* selectedLogisticCompany - WebElement */
    selectedLogisticCompany = () =>
        this.iframe()
            .locator(
                `//input[contains(@id,'ttdsk2003m000')][contains(@id,'comp-n3')][contains(@id,'lookup-widget')]` +
                ` | ` +
                `//input[contains(@id,'ttdsk2003m000')][contains(@id,'comp-3')][contains(@id,'lookup-widget')]`
            );

    /* selectedFinancialCompany - WebElement */
    selectedFinancialCompany = () =>
        this.iframe()
            .locator(
                `//input[contains(@id,'ttdsk2003m000')][contains(@id,'comp-n5')][contains(@id,'lookup-widget')]` +
                ` | ` +
                `//input[contains(@id,'ttdsk2003m000')][contains(@id,'comp-5')][contains(@id,'lookup-widget')]`
            );

    /* financialCompany - Button */
    financialCompany = () =>
        this.iframe()
            .locator(
                `//input[contains(@id,'ttdsk2003m000')][contains(@id,'comp-n5')][contains(@id,'lookup-widget')]` +
                ` | ` +
                `//input[contains(@id,'ttdsk2003m000')][contains(@id,'comp-5')][contains(@id,'lookup-widget')]`
            );

    /* lnSideNavigate */
    lnSideNavigate = async() =>{
        return await (await this.iframe()).locator(`//div[@id='side-navigation']/parent::div/parent::div`)};

    /* lnOptions */
    lnOptions = async() =>{
        return await (await this.iframe()).locator(`//label[@id='node-options-label'][text()='Options']`)};

    /* changeCompany */
    changeCompany = () =>
        this.iframe().locator(
            `//label[@id='node-change_company-label'][text()='Change Company']`
        );

    /* lnContextMenu */
    lnContextMenu = () =>
        this.iframe().locator(`//button[@id='rNavECT']/parent::li`);

    /* lnMenu */
    lnMenu = () =>
        this.iframe().locator(`//div[@id='button-menu']`);

    /* ok - Button */
    ok = () =>
        this.iframe().locator(
            `//div[contains(@id,'ttdsk2003m000') and contains(@id,'file.save_and_close')]/label`
        );

    /* companySelected - Text */
    companySelected = () =>
        this.iframe().locator(
            `//table[contains(@class,'StatusBar')]/tr/td[contains(@id,'status-td-n4')]/label`
        );

    /* inforLNSubModules - DynamicLink */
    inforLNSubModule = async(param1, param2) =>{
        return await(await this.iframe()).locator(
            `(//*[local-name()='svg'][@iconid='icon-document']/parent::div/following-sibling::label[text()='${param1}'][@aria-level='${param2}'])[last()]`
        )};

    /* inforLNSubModuleEnd - DynamicLink */
    inforLNSubModuleEnd = async(param1, param2) =>{
        return await (await this.iframe()).locator(
            `(//*[local-name()='svg'][@id='icon-launch']/parent::div/following-sibling::label[text()='${param1}'][@aria-level='${param2}'])[last()]`
        )};

    /* inforMainModules - DynamicLink */
    inforMainModules = async(param) =>{
        return await(await this.iframe()).locator(`//label[text()='${param}'][@aria-level='1']`)};

    /* inforLNSubModulesLast - DynamicLink */
    inforLNSubModulesLast = (text) =>
        this.iframe().locator(`(//label[text()='${text}'])[last()]`);

    /* collapseAll - Button */
    collapseAll = async() =>{
        return await (await this.iframe()).locator(`//label[text()='Collapse All']`)};

    /* popupOKButton - Button */
    popupOKButton = async() =>{
        return await (await this.iframe()).locator(
            `(//div[contains(@class,'DialogWindow')]//label[text()='OK'])[last()]`
        )};

    /* YesButton - Button */
    YesButton = async() =>{
        return await (await this.iframe()).locator(`(//label[text()='Yes'])[last()]`)};

    /* NoButton - Button */
    NoButton = () =>
        this.iframe().locator(`(//label[text()='No'])[last()]`);

    /* popupText - Button */
    popupText = async() =>{
        return await (await this.iframe()).locator(`//div[contains(@class,'DialogWindow')]//label/li`)};

    /* columnCells */
    columnCells = () =>
        this.iframe().locator(
            `(//div[contains(@class,'ColumnHeader')][not(contains(@class,'Row'))])[last()]`
        );

    /* requiredColumnHeader - Button 
     * %s -> Session code
     * %s -> Element ID */
    requiredColumnHeader = (id1, id2) =>
        this.iframe().locator(
            `//div[contains(@class,'ColumnHeader')][contains(@id,'${id1}')][contains(@id,'${id2}')]`
        );

    /* lnSystemMessage */
    lnSystemMessage = async() =>{
        return await (await this.iframe()).locator(`//div[@id='sysmesdialog-button-n0']`)};

    /* lnRunprogram */
    lnRunprogram = async() =>{
        return await (await this.iframe()).locator(
            `//label[@id='node-run_program-label'][text()='Run Program']`
        )};

    /* lnRestart */
    lnRestart = async() =>{
        return await (await this.iframe()).locator(
            `//label[@id='node-restart-label'][text()='Restart']`
        )};

    /* lnRunprogramInput */
    lnRunprogramInput = async() =>{
        return await (await this.iframe()).locator(
            `//input[@id='dlg-run_program-input-control-widget-label']`
        )};

    /* lnSessionInput */
    lnSessionInput = () =>
        this.iframe().locator(
            `//input[@id='dlg-run_program-input-panel-content-searchField-widget']`
        );

    /* lnRunprogramOK */
    lnRunprogramOK = async() =>{
        return await (await this.iframe()).locator(`//div[@id='dlg-run_program-button-n0']`)};

    /* lnPOSessionTab */
    lnPOSessionTab = () =>
        this.iframe().locator(
            `//label[text()='Purchase Order'][contains(@id,'session')]`
        );

    /* scrollBarParent - Button */
    scrollBarParent = () =>
        this.iframe().locator(
            `//div[contains(@class,'gwt-SplitLayoutPanel-VDragger') or contains(@class,'splitter')]/parent::div`
        );

    /* device */
    device = async() =>{
        return await (await this.iframe()).locator(
            `//div[contains(@style,'visibility: visible') and not(@aria-hidden='true')]/div[@class='DetailXForm']//label[text()='Device:']/parent::td/following-sibling::td//input[contains(@id,'ttstpsplopen') and contains(@id,'devc') and contains(@id,'lookup-widget')]`
        )};

    /* display */
    display = async() =>{
        return await (await this.iframe()).locator(
            `//label[contains(@id,'ttstpsplopen') and contains(@id,'pages-bar-page') and text()='Display']`
        )};

    /* printer */
    printer = () =>
        this.iframe().locator(
            `//label[contains(@id,'ttstpsplopen') and contains(@id,'pages-bar-page') and text()='Printer']`
        );

    /* selectDevice */
    selectDevice = () =>
        this.iframe().locator(
            `(//input[contains(@id,'ttstpsplopen') and contains(@id,'-devc') and contains(@id,'lookup')])[last()-1]`
        );

    /* continueIcon */
    continueIcon = async() =>{
        return await (await this.iframe()).locator(
            `//label[contains(@id,'ttstpsplopen') and contains(@id,'-form-exec.cont.process-label') and text()='Continue']`
        )};

    /* closeProcess */
    closeProcess = async() =>{
        return await (await this.iframe()).locator(
            `//label[@class='Label' and text()='Close'][contains(@id,'tsspc2201m000')]`
        )};

    /* currentTab */
    currentTab = async(name) =>{
        return await(await this.iframe()).locator(
            `(//label[contains(@id,'session') and text()='${name}'])[last()]`
        );
    };

    /* closeTab */
    closeTab = async() =>{
        return await(await this.iframe()).locator(`(//label[contains(text(),'Close session')])[1]`)};

    /* closeAllSessions */
    closeAllSessions = () =>
        this.iframe().locator(`//label[text()='Close all sessions']`);

    /* appLaunchMenu */
    appLaunchMenu = () =>
        this.page.locator(
            `//div[@data-ng-show='showAppLaunchMenu' and not(contains(@class,'icon-page-container ng-scope ng-hide'))]`
        );

    /* appLaunchMenuInRTM */
    appLaunchMenuInRTM = () =>
        this.page.locator(`//infor-page-and-sort-abs[@hidden='']`);

    /* productButton */
    productButton = (title) =>
        this.page.locator(`//a[@title='${title}']`);

    /* appTitle */
    appTitle = () =>
        this.page.locator(`//button[@title='App Menu']/following-sibling::span`);

    /* isappTitle */
    isappTitle = (title) =>
        this.page.locator(
            `//button[@title='App Menu']/following-sibling::span[contains(@title,'${title}')]`
        );

    /* sessionName */
    sessionName = () =>
        this.page.locator(`//span[@id='mhdrSite']`);

    /* removeUserDefaults */
    removeUserDefaults = () =>
        this.iframe().locator(
            `//label[contains(@id,'ttstpdeldeflt') and contains(@id,'exec.cont.process')]`
        );

    /* closeUserDefaults */
    closeUserDefaults = () =>
        this.iframe().locator(
            `//label[contains(@id,'ttstpdeldeflt') and contains(@id,'std-file.close')]`
        );

    /* subTab */
    subTab = (text) =>
        this.iframe().locator(`//label[text()='${text}'][contains(@id,'satellites')]`);

    /* contextPane */
    contextPane = () =>
        this.page.locator(`//li[contains(@class,'m-nav-rt-pnl-mn-item')]`);

    /* contextPaneExpanded */
    contextPaneExpanded = () =>
        this.page.locator(
            `//li[@class='m-nav-rt-pnl-mn-item ctxt-pane-expanded']/button`
        );

    /* options */
    options = () =>
        this.iframe().locator(`#node-options-label`);

    /* options_runProgram */
    options_runProgram = () =>
        this.iframe().locator(`#node-run_program-label`);

    /* openInNewWindow */
    openInNewWindow = async() =>{
        return await (await this.iframe()).locator(
            `//div[contains(@class,'Checkbox')][contains(@id,'run_program')]`
        )};

    /* sessionCode */
    sessionCode = async() =>{
        return await (await this.iframe()).locator(
            `//input[contains(@id,'dlg-run_program')][contains(@id,'control-widget')]`
        )};

    /* runProgram_OK */
    runProgram_OK = () =>
        this.iframe().locator(
            `//input[@id='dlg-run_program-input-control-widget-label']`
        );

    /* dlgrunprograminputcontrolwidgetlabel */
    dlgrunprograminputcontrolwidgetlabel = () =>
        this.iframe().locator(`#dlg-run_program-input-control-widget-label`);

    /* loading */
    loading = () =>
        this.iframe().locator(
            `//div[contains(text(),'Loading')] | //div[@class='LoadingIndicator'] | //div[@class='Inner']//label[contains(.,'Processing')]`
        );

    /* loadingPage */
    loadingPage = () =>
        this.iframe().locator(`//div[contains(text(),'Loading')]`);

    /* menuPane */
    menuPane = () =>
        this.iframe().locator(`//div[@class='SideApplicationNav']/parent::div`);

    /* menuIcon */
    menuIcon = () =>
        this.iframe().locator(`//*[local-name()='svg'][@iconid='icon-menu']`);

    /* frequentlyUsed */
    frequentlyUsed = () =>
        this.iframe().locator(
            `//label[text()='Frequently Used'][contains(@id,'history-label')]/parent::div`
        );

    /* usedSessionOne */
    usedSessionOne = () =>
        this.iframe().locator(
            `//div[contains(@id,'history-panel-item-n0') and contains(@class,'Item')]`
        );

    /* usedSessionTwo */
    usedSessionTwo = () =>
        this.iframe().locator(
            `//div[contains(@id,'history-panel-item-n3') and contains(@class,'Item')]`
        );

    /* usedSessionTwoTab */
    usedSessionTwoTab = () =>
        this.iframe().locator(`//div[contains(@id,'session-n2')]/label`);

    /* usedSessionOneTab */
    usedSessionOneTab = () =>
        this.iframe().locator(`//div[contains(@id,'session-n1')]/label`);

    /* verifyFirstTab */
    verifyFirstTab = () =>
        this.iframe().locator(`//div[contains(@id,'session-n1')]`);

    /* verifySecondTab */
    verifySecondTab = () =>
        this.iframe().locator(`//div[contains(@id,'session-n2')]`);

    /* productButtonBookmark */
    productButtonBookmark = () =>
        this.page.locator(`//a[@title='Bookmark this page']`);

    /* bomQuantity */
    bomQuantity = () =>
        this.iframe().locator(
            `//label[contains(@for,'tiedm1110m000') and contains(@for,'tiedm100.unom')]`
        );

    /* bomItem */
    bomItem = () =>
        this.iframe().locator(
            `//input[contains(@id,'tiedm1110m000') and contains(@id,'tiedm110.eitm.segment.2') and contains(@id,'lookup-widget')]`
        );

    /* nextViewButton */
    nextViewButton = () =>
        this.iframe().locator(
            `//div[contains(@id,'std-group.next')][contains(@id,'tiedm1110m000')]//*[local-name()='svg'][@iconid='icon-next-group']`
        );

    /* element */
    element = (id1, id2) =>
        this.iframe().locator(
            `//div[contains(@id,'${id1}')][contains(@id,'${id2}')][contains(@class,'TriggerInputField')]`
        );

    /* zoomButton */
    zoomButton = (id1, id2) =>
        this.iframe().locator(
            `(//input[contains(@id,'${id1}') and contains(@id,'${id2}')]/parent::div/div)[last()]`
        );

    /* searchRecord */
    searchRecord = (id1, id2) =>
        this.iframe().locator(
            `(//input[contains(@id,'${id1}') and contains(@id,'${id2}')])[last()]`
        );

    /* selectOk */
    selectOk = (id) =>
        this.iframe().locator(
            `(//div[contains(@id,'${id}') and contains(@id,'std-file.save_and_close')])[last()]`
        );

    /* selectTab */
    selectTab = (tab) =>
        this.iframe().locator(`(//div[@class='Tab']/div//label[text()='${tab}'])[last()]`);

    /* verifySelectedTab */
    verifySelectedTab = (tab) =>
        this.iframe().locator(
            `(//label[text()='${tab}']/parent::div/parent::div[@class='Tab'])[last()]`
        );

    /* selectCheckbox */
    selectCheckbox = async(id) =>{
        return await (await this.iframe()).locator(
            `(//div[contains(@class,'Checkbox')][contains(@id,'${id}')])[last()]`
        )};

    /* selectRadioButton */
    selectRadioButton = (id) =>
        this.iframe().locator(
            `//div[contains(@class,'RadioButton')][contains(@id,'${id}')]`
        );

    /* selectRequiredRecord */
    selectRequiredRecord = async(id1, id2) =>{
        return await(await this.iframe()).locator(
            `(//div[contains(@class,'Checkbox')][contains(@id,'${id1}')][contains(@id,'select-n${id2}')])[last()]`
        )};

    /* drilldownRequiredRecord */
    drilldownRequiredRecord = async(id1, id2) =>{
        return await (await this.iframe()).locator(
            `//div[contains(@style,'visibility: visible') and not(@aria-hidden='true')]//div[contains(@id,'${id1}')][contains(@id,'drilldown-n${id2}')]`
        )};

    /* selectGridCheckbox */
    selectGridCheckbox = (lbl, id1, id2) =>
        this.iframe().locator(
            `//label[text()='${lbl}']//ancestor::div[contains(@class,'Row')]/div/div/div[contains(@id,'${id1}') and contains(@id,'${id2}') and contains(@id,'widget')]`
        );

    /* firstColumnHeader */
    firstColumnHeader = (id) =>
        this.iframe().locator(
            `(//div[contains(@class,'ColumnHeader')][not(contains(@class,'Row'))]` +
            `[contains(@id,'${id}')])[1]`
        );

    /* dropdownValue */
    dropdownValue = (id) =>
        this.iframe().locator(
            `(//label[contains(@class,'Label')][contains(@id,'${id}') and not(contains(@id,'filter-value')) and not(contains(@id,'grid'))])[last()]`
        );

    /* clickDropdown */
    clickDropdown = (id) =>
        this.iframe().locator(
            `(//div[contains(@class,'TriggerButton') and not(contains(@class,'disabled'))]` +
            `[contains(@id,'${id}') and not(contains(@id,'filter-value')) and not(contains(@class,'readonly'))]/div/*[local-name()='svg'][@iconid='icon-dropdown'])[last()]`
        );

    /* dropdownStatus */
    dropdownStatus = (id) =>
        this.iframe().locator(
            `(//div[contains(@class,'DropdownListbox')][contains(@id,'${id}') and not(contains(@id,'filter-value'))])[last()]`
        );

    /* dropdownSts */
    dropdownSts = (id) =>
        this.iframe().locator(
            `(//div[contains(@class,'TriggerInputField') and not(contains(@class,'ListOutput'))]` +
            `[contains(@id,'${id}') and contains(@id,'control')])[last()]`
        );

    /* selectListItem */
    selectListItem = async(text) =>{
        return await (await this.iframe()).locator(
            `(//div[contains(@class,'ListItem')]//label[normalize-space()='${text}'])[last()]`
        )};

    /* dropdownValueGrid */
    dropdownValueGrid = (id) =>
        this.iframe().locator(
            `(//label[contains(@class,'Label')][contains(@id,'${id}') and not(contains(@id,'filter-value'))])[last()]`
        );

    /* dropdownValueGridFilter */
    dropdownValueGridFilter = (id) =>
        this.iframe().locator(
            `(//label[contains(@class,'Label')][contains(@id,'${id}') and contains(@id,'filter-value')])[last()]`
        );

    /* clickDropdownFilter */
    clickDropdownFilter = (id) =>
        this.iframe().locator(
            `(//div[contains(@class,'TriggerButton') and not(contains(@class,'disabled'))]` +
            `[contains(@id,'${id}') and contains(@id,'filter-value') and not(contains(@class,'readonly'))]/div/*[local-name()='svg'][@iconid='icon-dropdown'])[last()]`
        );

    /* menuItem */
    menuItem = async(id1, id2) =>{
        return await (await this.iframe()).locator(
            `(//div[contains(@id,'${id1}') and contains(@id,'${id2}')])[last()]`
        )};

    /* textMenuItem */
    textMenuItem = (id1, id2) =>
        this.iframe().locator(
            `(//div[contains(@class,'Button')][contains(@id,'${id1}') and contains(@id,'${id2}')])[last()]`
        );

    /* filterTextInput */
    filterTextInput = (id) =>
        this.iframe().locator(
            `(//div[contains(@class,'GridMenuButton') and contains(@id,'${id}')]/following-sibling::input[contains(@id,'filter-value')])[last()]`
        );

    /* moreButton */
    moreButton = async(id) =>{
        return await (await this.iframe()).locator(
            `//div[contains(@style,'visibility: visible') and not(@aria-hidden='true')]//div[contains(@id,'${id}') and contains(@class,'ToolbarOverflowButton')][contains(@id,'left') and contains(@id,'REGULAR')]`
        )};

    /* referencesMenuItem */
    referencesMenuItem = async(id) =>{
        return await (await this.iframe()).locator(
            `(//label[contains(@id,'${id}') and contains(@id,'std:reference-label')])[last()]`
        )};

    /* referencesMenuOption */
    referencesMenuOption = (id1, id2) =>
        this.iframe().locator(
            `//label[contains(@id,'${id1}') and contains(@id,'std:reference') and contains(@id,'${id2}') and contains(@id,'label')]`
        );

    /* actionsMenuItem */
    actionsMenuItem = async(id) =>{
        return await (await this.iframe()).locator(
            `(//label[contains(@id,'${id}') and contains(@id,'std:action-label')])[last()]`
        )};

    /* actionsMenuOption */
    actionsMenuOption =async (id1, id2) =>{
        return await (await this.iframe()).locator(
            `//label[contains(@id,'${id1}') and contains(@id,'std:action') and contains(@id,'${id2}') and contains(@id,'label')]`
        )};

    /* viewsMenuItem */
    viewsMenuItem = (id) =>
        this.iframe().locator(
            `//label[contains(@id,'${id}') and contains(@id,'std:view-label')]`
        );

    /* viewsMenuOption */
    viewsMenuOption = (id1, id2) =>
        this.iframe().locator(
            `//label[contains(@id,'${id1}') and contains(@id,'std:view') and contains(@id,'${id2}') and contains(@id,'label')]`
        );

    /* filterTriggerInput */
    filterTriggerInput = (id1) =>
        this.iframe().locator(
            `(//div[contains(@class,'GridMenuButton') and contains(@id,'${id1}')]/following-sibling::div//input` +
            `[contains(@id,'filter-value')])[last()]`
        );

    /* resize */
    resize = () =>
        this.iframe().locator(
            `(//div[contains(@class,'gwt-SplitLayoutPanel-VDragger') or contains(@class,'splitter')]/parent::div)[last()]`
        );

    /* gridMenuButton */
    gridMenuButton = (id1, id2) =>
        this.iframe().locator(
            `//div[contains(@class,'SmallMenuButton') and contains(@id,'${id1}') and contains(@id,'${id2}') and contains(@id,'select-header')]`
        );

    /* selectAndDeselectAllRecords */
    selectAndDeselectAllRecords = (id) =>
        this.iframe().locator(
            `//label[contains(@class,'Label') and contains(@id,'std-edit.${id}')]`
        );

    /* btnMore */
    btnMore = () =>
        this.iframe().locator(
            `//div[contains(@class,'FramedWindow') and not(@aria-hidden='true')]` +
            `//div[contains(@class,'TextButton')][contains(@id,'bar-overflow') and not(@aria-hidden)]`
        );

    /* selectTabInMore */
    selectTabInMore = (text) =>
        this.iframe().locator(
            `//div[contains(@style,'visibility: visible') and not(@aria-hidden='true')]` +
            `//tr[contains(@class,'MenuItem')]/td//label[text()='${text}']`
        );

    /* selectRadioBtn */
    selectRadioBtn = async(lbl, id) =>{
        return await (await this.iframe()).locator(
            `//label[text()='${lbl}']/parent::div[contains(@id,'${id}')]`
        )};

    /* filterLabelValue */
    filterLabelValue = async(id1, id2) =>{
        return await (await this.iframe()).locator(
            `(//label[contains(@id,'${id1}') and contains(@id,'${id2}')])[last()]`
        )};

    /* filterInputValue */
    filterInputValue = async(id1, id2) =>{
        return await (await this.iframe()).locator(
            `(//input[contains(@id,'${id1}') and contains(@id,'${id2}')][not(contains(@id,'filter'))])[last()]`
        )};

    /* gridMenuBtn */
    gridMenuBtn = async(id1, id2) =>{
        return await (await this.iframe()).locator(
            `//div[contains(@class,'GridMenuButton')][contains(@id,'${id1}') and contains(@id,'${id2}')]`
        )};

    /* filterOperator */
    filterOperator = async(text) =>{
        return await (await this.iframe()).locator(`//label[contains(@id,'filterOperatorMenu')][text()='${text}']`)};

    /* menu */
    menu = () =>
        this.iframe().locator(`//div[@class='SideApplicationNavHeader']//div[contains(@id,'menu')]`);

    /* contextApp */
    contextApp = () =>
        this.page.locator(`//li[@id='rNavEC']`);

    /* filterInput */
    filterInput = async(id1, id2) =>{
        return await (await this.iframe()).locator(
            `(//div[contains(@class,'GridMenuButton') and contains(@id,'${id1}') and contains(@id,'${id2}')]/following-sibling::input[contains(@id,'filter-value')])[last()]`)};

    /* personalizationPopup */
    personalizationPopup = () =>
        this.iframe().locator(
            `//label[contains(@class,'multiline')][contains(@id,'ttstppersxi')]`
        );

    /* hiddenTab */
    hiddenTab = () =>
        this.iframe().locator(`//label[text()='Hidden']`);

    /* hiddenFilter */
    hiddenFilter = () =>
        this.iframe().locator(`//input[contains(@id,'Hidden-name-filter')]`);

    /* firstRecord */
    firstRecord = () =>
        this.iframe().locator(`//div[contains(@id,'Hidden-header-n0')]`);

    /* hiddenCheckbox */
    hiddenCheckbox = () =>
        this.iframe().locator(`//div[contains(@class,'Checkbox')][contains(@id,'hidden')]`);

    /* personalizationSave */
    personalizationSave = () =>
        this.iframe().locator(`//div[contains(@id,'button-SAVE_AND_CLOSE')]`);

    /* popupBtn */
    popupBtn = async(txt) =>{
        return await (await this.iframe()).locator(`(//label[text()='${txt}'])[last()]`)};

    /* orderGroupFrom */
    orderGroupFrom = () =>
        this.iframe().locator(
            `//input[contains(@class,'TriggerInputField')][contains(@id,'tisfc0408m000')][contains(@id,'grid.f')]`
        );

    /* orderGroupTo */
    orderGroupTo = () =>
        this.iframe().locator(
            `//input[contains(@class,'TriggerInputField')][contains(@id,'tisfc0408m000')][contains(@id,'grid.t')]`
        );

    /* dropdownValueLabel */
    dropdownValueLabel = async(lbl, id) =>{
        return await (await this.iframe()).locator(
            `//div[contains(@class,'FramedWindow') and not(@aria-hidden='true')]//label[normalize-space()='${lbl}:']/parent::td/following-sibling::td//label[contains(@class,'Label')][contains(@id,'${id}') and not(contains(@id,'filter-value')) and not(contains(@id,'grid'))] | //label[normalize-space()='${lbl}']/parent::td/following-sibling::td//label[contains(@class,'Label')][contains(@id,'${id}') and not(contains(@id,'filter-value')) and not(contains(@id,'grid'))] | //div[contains(@class,'FramedWindow') and not(@aria-hidden='true')]//label[normalize-space()='${lbl}:']//parent::div/child::div//label[contains(@class,'Label')][contains(@id,'${id}') and not(contains(@id,'filter-value')) and not(contains(@id,'grid'))] | //div[contains(@class,'FramedWindow') and not(@aria-hidden='true')]//label[normalize-space()='${lbl}']/ancestor::tr/following-sibling::tr//label[contains(@class,'Label')]`
        )};

    /* clickDropdownLabel */
    clickDropdownLabel = async(lbl, id) =>{
       return await (await this.iframe()).locator(
            `//div[contains(@class,'FramedWindow') and not(@aria-hidden='true')]//label[normalize-space()='${lbl}:']/parent::td/following-sibling::td//div/following-sibling::div[contains(@class,'TriggerButton') and not(contains(@class,'disabled'))][contains(@id,'${id}') and not(contains(@id,'filter-value')) and not(contains(@class,'readonly'))]/div/*[local-name()='svg'][@iconid='icon-dropdown'] | //label[normalize-space()='${lbl}']/parent::td/following-sibling::td//div/following-sibling::div[contains(@class,'Button TriggerButton') and not(contains(@class,'disabled'))][contains(@id,'${id}') and not(contains(@id,'filter-value')) and not(contains(@class,'readonly'))]/div/*[local-name()='svg'][@iconid='icon-dropdown'] | //div[contains(@class,'FramedWindow') and not(@aria-hidden='true')]//label[normalize-space()='${lbl}:']/parent::div/div[contains(@class,'Dropdown') and contains(@id,'${id}')]//*[local-name()='svg'][@iconid='icon-dropdown'] | //div[contains(@class,'FramedWindow') and not(@aria-hidden='true')]//label[normalize-space()='${lbl}']/parent::td/following-sibling::td//div/following-sibling::div[contains(@class,'TriggerButton') and not(contains(@class,'disabled'))][contains(@id,'${id}') and not(contains(@id,'filter-value')) and not(contains(@class,'readonly'))]/div/*[local-name()='svg'][@iconid='icon-dropdown']`
        )};

    /* textLabel - Button */
    textLabel = async (p1, p2, p3) => {
        return await (await this.iframe()).locator(
            `//label[normalize-space()="${p1}:"]/parent::td/following-sibling::td//input[contains(@id,'${p2}') and contains(@id,'${p3}')]` +
            ` | ` +
            `//label[normalize-space()="${p1}:"]/parent::td/preceding-sibling::td//input[contains(@id,'${p2}') and contains(@id,'${p3}')]` +
            ` | ` +
            `//label[normalize-space()="${p1}:"]/ancestor::td[contains(@style,'vertical-align')]/following-sibling::td//input[contains(@id,'${p2}') and contains(@id,'${p3}')]` +
            ` | ` +
            `//label[normalize-space()="${p1}"]/parent::td/following-sibling::td//input[contains(@id,'${p2}') and contains(@id,'${p3}')]` +
            ` | ` +
            `//label[normalize-space()="${p1}:"]/parent::td/following-sibling::td//label[contains(@id,'${p2}') and contains(@id,'${p3}')]` +
            ` | ` +
            `//label[normalize-space()="${p1}"]/ancestor::td/following-sibling::td//label[contains(@id,'${p2}') and contains(@id,'${p3}')]` +
            ` | ` +
            `//label[normalize-space()="${p1}"]/ancestor::tr/following-sibling::tr//input[contains(@id,'${p2}') and contains(@id,'${p3}')]` +
            ` | ` +
            `//label[normalize-space()="${p1}:"]/parent::div//input[contains(@id,'${p2}') and contains(@id,'${p3}')]` +
            ` | ` +
            `//label[normalize-space()="${p1}"]/ancestor::td/following-sibling::td//input[contains(@id,'${p2}') and contains(@id,'${p3}')]`
        );
    };

    /* selectCheckbox - Button */
    selectCheckboxLabel = async(
        p1, p2
    ) =>{
      return await(await this.iframe())
            .locator(
                `//div[contains(@class,'FramedWindow') and not(@aria-hidden='true')]//label[normalize-space()="${p1}"]/ancestor::td//div[contains(@class,'Checkbox')][contains(@id,'${p2}')]` +
                ` | ` +
                `//div[contains(@class,'FramedWindow') and not(@aria-hidden='true')]//label[normalize-space()="${p1}"]/ancestor::div[contains(@class,'Checkbox')][contains(@id,'${p2}')]` +
                ` | ` +
                `//div[contains(@class,'FramedWindow') and not(@aria-hidden='true')]//label[normalize-space()="${p1}"]/ancestor::div/div[contains(@class,'Checkbox')][contains(@id,'${p2}')]`
    )};

    /* columnName - Button */
    columnName = (p1) =>
        this.iframe().locator(`(//*[text()='${p1}']/ancestor::div[@class='ColumnHeader'])[last()]`);

    /* cellValue - Button */
    cellValue = (p1, p2) =>
        this.iframe().locator(
            `//input[contains(@id,'${p1}') and contains(@id,'n${p2}')][not(contains(@id,'filter'))]`
        );

    /* textForDataCell - Button */
    textForDataCell = async(p1, p2) =>{
        return await(await this.iframe()).locator(
            `(//div[contains(@class,'DataCell')][contains(@id,'${p1}')][contains(@id,'${p2}')])[last()]`
        )};

    /* filterTextInput -- Button */
    filterInputLabel = (p1, p2, p3) =>
        this.iframe().locator(
            `//label[normalize-space()='${p1}']/ancestor::div/following-sibling::div[@class='Row FilterHeaderRow']//child::div[contains(@class,'GridMenuButton') and contains(@id,'${p2}') and contains(@id,'${p3}')]/following-sibling::input[contains(@id,'filter-value')]`
        );

    /* popupButton - Button */
    popupButton = (p1) =>
        this.iframe().locator(`(//label[text()='${p1}'])[last()]`);

    /* drpValueGrid - Dropdown */
    drpValueGrid = (p1, p2) =>
        this.iframe().locator(
            `//label[normalize-space()='${p1}']/ancestor::div//following-sibling::div//label[contains(@class,'Label')][contains(@id,'${p2}') and not(contains(@id,'filter-value'))]`
        );

    /* textMenuOverflow - Button */
    textMenuOverflow = async(p1, p2, p3) =>{
        return await (await this.iframe()).locator(
            `//div[contains(@class,'Button')][contains(@id,'${p1}') and contains(@id,'${p2}')]//label[text()='${p3}']`
        )};

    /* textMenu - Button */
    textMenu = async(p1, p2, p3) =>{
        return await (await this.iframe()).locator(
            `//div[contains(@class,'FramedWindow') and not(@aria-hidden='true')]//div[contains(@class,'Button')][contains(@id,'${p1}') and contains(@id,'${p2}')]//label[text()='${p3}']`
        )};

    /* drpValueGridFilter - Dropdown */
    drpValueGridFilter = async(p1) =>
       await (await this.iframe()).locator(
            `(//div[contains(@class,'TriggerButton') and not(contains(@class,'disabled'))][contains(@id,'${p1}') and contains(@id,'filter-value') and not(contains(@class,'readonly'))]/div/*[local-name()='svg'][@iconid='icon-dropdown'])[last()]`
        );

    /* dropdownStsValue - Button */
    dropdownStsValue = async(p1) =>{
        return await (await this.iframe()).locator(
            `(//div[contains(@id,'${p1}') and contains(@id,'filter')][contains(@class,'Trigger') and not(contains(@class,'Button')) and not(contains(@class,'Widget')) and not(contains(@class,'search'))])[last()]`
        )};

    /* fltrTriggerInput - Text */
    fltrTriggerInput = (p1, p2) =>
        this.iframe().locator(
            `//div[contains(@class,'GridMenuButton') and contains(@id,'${p1}') and contains(@id,'${p2}')]/following-sibling::div//input[contains(@id,'filter-value')]`
        );

    /* columnHeader - Button */
    columnHeader = async (p1, p2) =>{
        return await (await this.iframe()).locator(
            `//div[contains(@class,'ColumnHeader')][contains(@id,'${p1}')][contains(@id,'${p2}')]`
        )};

    /* referenceMenuItem -- Button */
    referenceMenuItem = async(p1) =>{
        return await (await this.iframe()).locator(
            `//div[contains(@style,'visibility: visible') and not(@aria-hidden='true')]//label[contains(@id,'${p1}') and contains(@id,'std:reference-label') and normalize-space()='References']`
        )};

    /* referenceMenuOption -- Button */
    referenceMenuOption = async(p1, p2) =>{
        return await (await this.iframe()).locator(
            `(//label[normalize-space()='${p1}' and contains(@id,'std:reference') and contains(@id,'${p2}') and contains(@id,'label')])[last()]`
        )};

    /* actionMenuItem -- Button */
    actionMenuItem = async(p1) =>{
        return await (await this.iframe()).locator(
            `//div[contains(@style,'visibility: visible') and not(@aria-hidden='true')]//label[contains(@id,'${p1}') and contains(@id,'std:action-label') and normalize-space()='Actions']`
        )};

    /* actionMenuOption -- Button */
    actionMenuOption = async(p1, p2) =>{
        return await (await this.iframe()).locator(
            `(//label[normalize-space()='${p1}' and contains(@id,'${p2}') and contains(@id,'std:action') and contains(@id,'label')])[last()]`
        )};

    /* viewMenuItem -- Button */
    viewMenuItem = (p1) =>
        this.iframe().locator(
            `//div[contains(@style,'visibility: visible') and not(@aria-hidden='true')]//label[contains(@id,'${p1}') and contains(@id,'std:view-label') and normalize-space()='Views']`
        );

    /* viewsMenuOptions -- Button */
    viewsMenuOptions = (p1, p2) =>
        this.iframe().locator(
            `(//label[normalize-space()='${p1}' and contains(@id,'${p2}') and contains(@id,'std:view') and contains(@id,'label')])[last()]`
        );

    /* clickGridMenuBtn - button */
    clickGridMenuBtn = (p1) =>
        this.iframe().locator(`//label[contains(@class,'Label') and normalize-space()='${p1}']`);

    /* status - WebElement */
    status = async(
        p1, p2, p3
    ) =>{
        return await (await this.iframe())
            .locator(
                `//label[normalize-space()='${p1}:']/parent::td/following-sibling::td//label[contains(@id,'${p2}') and normalize-space()='${p3}']` +
                ` | ` +
                `//div[contains(@class,'FramedWindow') and not(@aria-hidden='true')]//div[@class='TabContents']//label[normalize-space()='${p1}:']/parent::td/following-sibling::td//label[contains(@id,'${p2}') and normalize-space()='${p3}']`
            )};

    /* statusField - WebElement */
    statusField = async(p1, p2, p3) =>{
        return await (await this.iframe()).locator(
            `//label[contains(@id,'${p1}') and contains(@id,'${p2}') and normalize-space()='${p3}']`
        )};

    /* gridRadioButton - WebElement */
    gridRadioButton = (p1, p2) =>
        this.iframe().locator(
            `//div[contains(@class,'Checkbox')][contains(@id,'${p1}')][contains(@id,'${p2}')]`
        );

    /* dropdownValueField - Button */
    dropdownValueField = async(p1) =>{
        return await (await this.iframe()).locator(`(//label[contains(@id,'${p1}') and contains(@id,'filter')])[last()]`)};

    /* currentActiveTab - active session tab */
    currentActiveTab = async(text) =>{
        return await(await this.iframe()).locator(
            `//div[contains(@class,'Selected')]//label[contains(@id,'session') and translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz') = '${text}']`
        )};

    /* dialogWindowTab - active dialog window tab */
    dialogWindowTab = async(p1) =>{
        return await (await this.iframe()).locator(
            `//div[contains(@class,'FramedWindow') and not(@aria-hidden='true')]//div[contains(@class,'TitleBar')]//label[normalize-space()='${p1}']`
        )};

    /* gridInputField - WebElement */
    gridInputField = (p1, p2, p3) =>
        this.iframe().locator(
            `//label[normalize-space()='${p1}']/ancestor::div/following-sibling::div[@class='Section DataSection']//child::div[contains(@class,'DataCell')][contains(@id,'${p2}')][contains(@id,'${p3}')]//input`
        );

    /* gridLabelField - WebElement */
    gridLabelField = async(p1, p2, p3) =>{
        return await (await this.iframe()).locator(
            `//label[normalize-space()='${p1}']/ancestor::div/following-sibling::div[@class='Section DataSection']//child::div[contains(@class,'DataCell')][contains(@id,'${p2}')][contains(@id,'${p3}')]//label`
        )};

    /* getValueWithLabel - WebElement */
    getValueWithLabel = (p1, p2, p3) =>
        this.iframe().locator(
            `//div[contains(@class,'FramedWindow') and not(@aria-hidden='true')]//label[normalize-space()='${p1}:']/parent::td/following-sibling::td//label[contains(@id,'${p2}') and contains(@id,'${p3}')]`
        );

    /* textArea - text */
    textArea = (p1, p2, p3) =>
        this.iframe().locator(
            `//div[contains(@class,'FramedWindow') and not(@aria-hidden='true')]//label[text()='${p1}']//ancestor::*/following-sibling::*//*[contains(@id,'${p2}') and contains(@id,'${p3}')]`
        );

    /* textRadioBtn - CheckMark */
    textRadioBtn = (p1, p2) =>
        this.iframe().locator(
            `//label[text()='${p1}']/ancestor::td//div[contains(@id,'${p2}') and contains(@class,'Checkmark')]`
        );

    /* bottomText - text */
    bottomText = (p1, p2) =>
        this.iframe().locator(
            `//td[contains(@id,'text')][contains(@id,'${p1}')]/label[normalize-space()='${p2}']`
        );

    /* textButton - text */
    textButton = (p1, p2) =>
        this.iframe().locator(
            `//div[contains(@class,'TabContents')]//div[contains(@class,'Button')][contains(@id,'${p1}')]//label[(text()='${p2}')]`
        );

    /* activityStatus - WebElement */
    activityStatus = (p1, p2, p3) =>
        this.iframe().locator(
            `//label[normalize-space()='${p1}']/parent::td/following-sibling::td//label[contains(@id,'${p2}') and normalize-space()='${p3}']`
        );

    /* textEditor - Text */
    textEditor = (p1, p2) =>
        this.iframe().locator(
            `//label[text()='${p1}']//ancestor::*/following-sibling::*//*[contains(@id,'${p2}')]`
        );

    /* textEditorSaveBtn - Button */
    textEditorSaveBtn = () =>
        this.iframe().locator(
            `//div[contains(@class,'Button')][contains(@id,'std-txt.saveexit')]`
        );

    /* verifyHeader - WebElement */
    verifyHeader = async(p1) =>{
        return await (await this.iframe()).locator(
            `(//div[contains(@class,'FramedWindow') and not(@aria-hidden='true')]//label[normalize-space()='${p1}'][contains(@id,'header')])[last()]`
        )};

    /* actionOverflow -- Button */
    actionOverflow = async(p1) =>{
        return await (await this.iframe()).locator(
            `(//label[contains(@id,'${p1}') and contains(@id,'std:action-label') and normalize-space()='Actions'])[last()]`
        )};

    /* referenceOverflow -- Button */
    referenceOverflow = async(p1) =>{
        return await (await this.iframe()).locator(
            `(//label[contains(@id,'${p1}') and contains(@id,'reference') and normalize-space()='References'])[last()]`
        )};

    /* viewOverflow -- Button */
    viewOverflow = async(p1) =>{
        await this.iframe().locator(
            `(//label[contains(@id,'${p1}') and contains(@id,'std:view-label') and normalize-space()='Views'])[last()]`
        )};

    /* selectHeaderTab - Button */
    selectHeaderTab = async(p1, p2) =>{
        return await (await this.iframe()).locator(
            `//div[contains(@class,'FramedWindow') and not(@aria-hidden='true')]//div[@class='Tab']/div//label[text()='${p1}' and contains(@id,'${p2}-pages')]`
        );
    };
    /* moreHeaderBtn - Button */
    moreHeaderBtn = (p1) =>
        this.iframe().locator(
            `//div[contains(@class,'FramedWindow') and not(@aria-hidden='true')]//div[contains(@class,'TextButton')][contains(@id,'bar-overflow') and contains(@id,'${p1}-pages')]`
        );

    /* selectFooterTab - Button */
    selectFooterTab = async(p1, p2) =>{
        return await (await this.iframe()).locator(
            `//div[contains(@class,'FramedWindow') and not(@aria-hidden='true')]//div[@class='Tab']/div//label[text()='${p1}' and contains(@id,'${p2}-satellites')]`
        )};

    /* moreGridBtn - Button */
    moreGridBtn = (p1) =>
        this.iframe().locator(
            `//div[contains(@class,'FramedWindow') and not(@aria-hidden='true')]//div[contains(@class,'TextButton')][contains(@id,'bar-overflow') and contains(@id,'${p1}-satellites')]`
        );

    /* textWithoutLabel - text */
    textWithoutLabel = (p1, p2) =>
        this.iframe().locator(
            `//input[contains(@id,'${p1}') and contains(@id,'${p2}')]`
        );

    /* hyperlinkText - text */
    hyperlinkText = async(p1, p2, p3) =>{
        return await(await this.iframe()).locator(
            `//a[normalize-space()='${p1}' and contains(@id,'${p2}') and contains(@id,'${p3}')]`
        )};

    /* searchInputField - Button */
    searchInputField = (p1, p2, p3) =>
        this.iframe().locator(
            `//label[normalize-space()='${p1}:']/parent::div/child::div//input[contains(@id,'${p2}') and contains(@id,'${p3}')]`
        );

    /* activitiesQty - text */
    activitiesQty = (p1, p2, p3) =>
        this.iframe().locator(
            `//label[normalize-space()='${p1}']/parent::td/following-sibling::td//label[contains(@id,'${p2}') and contains(@id,'${p3}')]`
        );

    /* activityTxtFields - text */
    activityTxtFields = (p1, p2) =>
        this.iframe().locator(
            `//label[text()='${p1}']/parent::div/parent::div/following-sibling::div//input[contains(@id,'${p2}')]`
        );

    /* gridHeader - Header */
    gridHeader = async(p1) =>{
       return await (await this.iframe()).locator(
            `//div[contains(@class,'ColumnHeader')][contains(@id,'${p1}')]/div[contains(@class,'ERPColumnHeader')]/label`
        )};

    /* personalizationBtn - Button */
    personalizationBtn = (p1) =>
        this.iframe().locator(
            `//div[contains(@id,'${p1}') and contains(@id,'std:personalize')]`
        );

    /* verifyLabel - Text */
    verifyLabel = (p1, p2, p3) =>
        this.iframe().locator(
            `//input[contains(@id,'${p1}') and contains(@id,'${p2}')]//ancestor::td//label[normalize-space()='${p3}:']`
        );

    /* activeTab - active session tab */
    activeTab = () =>
        this.iframe().locator(
            `//div[contains(@class,'Tab Selected')]//label[contains(@id,'session')]`
        );

    /* gridlabelLastRecord - WebElement */
    gridlabelLastRecord = (p1, p2, p3) =>
        this.iframe().locator(
            `(//label[normalize-space()='${p1}']/ancestor::div/following-sibling::div[@class='Section DataSection']//child::div[contains(@class,'DataCell')][contains(@id,'${p2}')][contains(@id,'${p3}')]//label)[last()]`
        );

    /* gridInputLastRecord - WebElement */
    gridInputLastRecord = (p1, p2, p3) =>
        this.iframe().locator(
            `(//label[normalize-space()='${p1}']/ancestor::div/following-sibling::div[@class='Section DataSection']//child::div[contains(@class,'DataCell')][contains(@id,'${p2}')][contains(@id,'${p3}')]//input)[last()]`
        );

    /* gridInputValue - WebElement */
    gridInputValue = (p1, p2) =>
        this.iframe().locator(
            `//div[contains(@class,'DataCell')][contains(@id,'${p1}')][contains(@id,'${p2}')]//input`
        );

    /* gridLabelValue - WebElement */
    gridLabelValue = (p1, p2) =>
        this.iframe().locator(
            `//div[contains(@class,'DataCell')][contains(@id,'${p1}')][contains(@id,'${p2}')]//label`
        );

    /* lookupBtn - LookupBtn */
    lookupBtn = async (p1, p2, p3) => {
        return await (await this.iframe())
            .locator(
                `//label[normalize-space()="${p1}:"]/parent::td/following-sibling::td//div[contains(@id,"${p2}")][contains(@id,"${p3}")][contains(@id,"lookup-trigger-button")]` +
                ` | //label[normalize-space()="${p1}"]/ancestor::tr/following-sibling::tr//td//div[contains(@id,"${p2}")][contains(@id,"${p3}")][contains(@id,"lookup-trigger-button")]` +
                ` | //label[normalize-space()="${p1}"]/parent::td/following-sibling::td//div[contains(@id,"${p2}")][contains(@id,"${p3}")][contains(@id,"lookup-trigger-button")]` +
                ` | //label[normalize-space()="${p1}"]/ancestor::*//div[contains(@id,"${p2}")][contains(@id,"${p3}")][contains(@id,"lookup-trigger-button")]` +
                ` | //label[normalize-space()="${p1}:"]/ancestor::*//div[contains(@id,"${p2}")][contains(@id,"${p3}")][contains(@id,"lookup-trigger-button")]` +
                ` | //label[normalize-space()="${p1}:"]/following-sibling::div//following-sibling::div[contains(@id,"${p2}")][contains(@id,"${p3}")][contains(@id,"lookup-trigger-button")]`
            );
    };

    /* dataCellLookupBtn - LookupBtn */
    dataCellLookupBtn = (p1, p2) =>
        this.iframe().locator(
            `//label[normalize-space()='${p1}']/ancestor::div/following-sibling::div//div[contains(@id,'${p2}')][contains(@id,'trigger-button')]`
        );

    /* gridLookupBtn - LookupBtn */
    gridLookupBtn = (p1, p2) =>
        this.iframe().locator(
            `//div[contains(@id,'${p1}')][contains(@id,'${p2}')][contains(@id,'trigger-button')]`
        );

    /* fieldCellInHeader - text */
    fieldCellInHeader = (p1, p2) =>
        this.iframe().locator(
            `//label[text()='${p1}']/ancestor::tr/following-sibling::tr//input[contains(@id,'${p2}')]`
        );

    /* textBtn - text */
    textBtn = (p1, p2) =>
        this.iframe().locator(
            `//div[contains(@class,'FramedWindow') and not(@aria-hidden='true')]//div[contains(@class,'Button')][contains(@id,'${p1}')]//label[(text()='${p2}')]`
        );

    /* verifyLblWithoutValue - Label */
    verifyLblWithoutValue = (p1, p2) =>
        this.iframe().locator(
            `//label[normalize-space()='${p1}:']/parent::td/following-sibling::td//label[contains(@id,'${p2}')]`
        );

    /* hyperlinks - links based on session code */
    hyperlinks = (p1) =>
        this.iframe().locator(`//a[contains(@id,'${p1}')]`);

    /* gridScrollLast - Button */
    gridScrollLast = (p1) =>
        this.iframe().locator(
            `//div[contains(@class,'Button')][contains(@id,'${p1}')][contains(@id,'scroll-last')]`
        );

    /* gridCell - based on element id and session code */
    gridCell = async(p1, p2) =>{
        return await (await this.iframe())
            .locator(
                `//div[contains(@class,'FramedWindow') and not(@aria-hidden='true')]//div[contains(@class,'DataCell')][contains(@id,'${p1}')][contains(@id,'${p2}')]//input[not(@aria-hidden='true')]` +
                ` | ` +
                `//div[contains(@class,'FramedWindow') and not(@aria-hidden='true')]//div[contains(@class,'DataCell')][contains(@id,'${p1}')][contains(@id,'${p2}')]//label[not(@aria-hidden='true')]`
            )};

    /* searchInputlookupBtn - LookupBtn */
    searchInputlookupBtn = (p1, p2) =>
        this.iframe().locator(
            `//label[normalize-space()='${p1}:']/following-sibling::div//following-sibling::div[contains(@id,'${p2}')][contains(@id,'trigger-button')]`
        );

    /* nextActivity - WebElement */
    nextActivity = (p1, p2) =>
        this.iframe().locator(`//label[normalize-space()='${p1}'][contains(@id,'${p2}')][contains(@id,'next.step')]`);

    /* personalizeField - label */
    personalizeField = (p1) =>
        this.iframe().locator(`//div[@id='null']//child::li[contains(text(),'${p1}')]`);

    /* labelValueWithHeader - Label */
    labelValueWithHeader = (p1, p2, p3) =>
        this.iframe().locator(
            `//label[normalize-space()='${p1}']/parent::div/parent::div/following-sibling::div//label[normalize-space()='${p2}:']/parent::td/following::td//label[contains(@id,'${p3}')]`
        );

    /* editTextMenuBtn -- Button */
    editTextMenuBtn = (p1, p2, p3) =>
        this.iframe().locator(`(//label[contains(@id,'${p1}')][contains(@id,'${p2}') and normalize-space()='${p3}'])[last()]`);

    /* popupTextBtn -- Button */
    popupTextBtn = (p1) =>
        this.iframe().locator(`(//div[contains(@class,'DialogWindow')]//label[text()='${p1}'])[last()]`);

    /* textEditorTxt - Text */
    textEditorTxt = () =>
        this.iframe().locator(`//div[contains(@id,'nocode')]//textarea[contains(@id,'nocode-text')]`);

    /* textEditorReferencesBtn - Button */
    textEditorReferencesBtn = () =>
        this.iframe().locator(`//label[contains(@id,'nocode-button') and contains(@id,'txt:reference-label')]`);

    /* textEditorRefMenuItem - Link */
    textEditorRefMenuItem = (p1, p2) =>
        this.iframe().locator(
            `(//label[normalize-space()='${p1}' and contains(@id,'nocode-menu-txt:reference') and contains(@id,'${p2}') and contains(@id,'label')])[last()]`
        );

    /* textRadioButton - CheckMark */
    textRadioButton = (p1, p2) =>
        this.iframe().locator(`//label[text()='${p1}']/ancestor::td//div[contains(@id,'${p2}')]`);

    /* calendarLookupBtn - Calendar Lookup Btn */
    calendarLookupBtn = (p1, p2) =>
        this.iframe().locator(
            `//label[normalize-space()='${p1}:']/parent::td/following-sibling::td//div[contains(@id,'${p2}')][contains(@id,'trigger-button')]`
        );

    /* showSelectionBtn - Button */
    showSelectionBtn = () =>
        this.iframe().locator(`//div[@id='show-months-years']`);

    /* monthPanel - Month Panel */
    monthPanel = (p1) =>
        this.iframe().locator(`//div[@class='MonthPanel']//label[text()='${p1}']`);

    /* yearPanel - Year Panel */
    yearPanel = (p1) =>
        this.iframe().locator(`//div[@class='YearPanel']//label[text()='${p1}']`);

    /* dayPanel - Day Panel */
    dayPanel = (p1) =>
        this.iframe().locator(`//div[@class='MonthView']//td[not(@class='OtherMonth')]/label[text()='${p1}']`);

    /* okButtton - OK Button */
    okButtton = () =>
        this.iframe().locator(`//label[text()='Ok'][contains(@id,'popup-monthyear-accept')]`);

    /* popupTxt - Label */
    popupTxt = (p1) =>
        this.iframe().locator(`//label[contains(@id,'${p1}') and contains(@class,'multiline')]`);

    /* gridScrollFirst - Button */
    gridScrollFirst = (p1) =>
        this.iframe().locator(`//div[contains(@class,'Button')][contains(@id,'${p1}')][contains(@id,'scroll-first')]`);

    /* gridMnuBtn - button */
    gridMnuBtn = (p1) =>
        this.iframe().locator(`//div[contains(@id,'${p1}') and contains(@id,'select-header')]/div[contains(@class,'Checkbox')]`);

    /* gridDatacellRecord */
    gridDatacellRecord = (p1, p2) =>
        this.iframe().locator(`//div[contains(@class,'DataCell')][contains(@id,'${p1}')][contains(@id,'${p2}')]`);

    /* gridLookupBtnLastRec - LookupBtn */
    gridLookupBtnLastRec = async(p1, p2) =>{
        return await (await this.iframe()).locator(`(//div[contains(@id,'${p1}')][contains(@id,'${p2}')][contains(@id,'trigger-button')])[last()]`)};

    /* drilldownLastRecord - button */
    drilldownLastRecord = (p1) =>
        this.iframe().locator(`(//div[contains(@id,'${p1}') and contains(@id,'grid') and contains(@id,'drilldown')])[last()]`);

    /* saveDefaults - Button */
    saveDefaults = (p1) =>
        this.iframe().locator(`//label[contains(@id,'${p1}') and contains(@id,'save_defaults')]`);

    /* grid - Button */
    grid = (p1) =>
        this.iframe().locator(`//div[contains(@id,'${p1}')][contains(@id,'scrollable')]/parent::div[@class='RowContainer']`);

    /* personalizationsActions - Button */
    personalizationsActions = () =>
        this.iframe().locator(`(//label[contains(@id,'menu-button-actions')])[last()]`);

    /* displayHiddenItems - Button */
    displayHiddenItems = () =>
        this.iframe().locator(`//label[text()='Display Hidden Objects']//ancestor::tr[@id='-menuitem-DISPLAY_HIDDEN']`);

    /* roughEstimCap - Button */
    roughEstimCap = (p1) =>
        this.iframe().locator(`//div[@id='null']//child::li[contains(text(),'${p1}')]`);

    /* allFilter - label */
    allFilter = () =>
        this.iframe().locator(`(//div[contains(@class,'FramedWindow') and not(@aria-hidden='true')]//input[contains(@id,'All-name-filter')])[last()]`);

    /* allTab - Tab */
    allTab = () =>
        this.iframe().locator(`(//label[text()='All'][not(contains(@id,'field'))]/ancestor::div[@class='Tab'])[last()]`);

    /* allCheckBox - label */
    allCheckBox = () =>
        this.iframe().locator(`(//div[contains(@id,'All-header-n0')])[last()]`);

    /* hiddenCheckBox - Button */
    hiddenCheckBox = () =>
        this.iframe().locator(`(//div[contains(@id,'Hidden-header-n0')])[last()]`);

    /* upArrow - Button */
    upArrow = () =>
        this.iframe().locator(`(//div[contains(@id,'button-move-up')])[last()]`);

    /* personalizationSaveAndExit - Button */
    personalizationSaveAndExit = () =>
        this.iframe().locator(`//div[contains(@id,'button-SAVE_AND_CLOSE')]`);

    /* closeButton - Button */
    closeButton = async(p1) =>{
        return await (await this.iframe()).locator(`(//div[contains(@class,'Button')][contains(@id,'${p1}')][contains(@id,'close')])[1]`)};

    /* textMenuWithoutLabel -- Button */
    textMenuWithoutLabel = (p1, p2) =>
        this.iframe().locator(
            `//div[contains(@class,'FramedWindow') and not(@aria-hidden='true')]//div[contains(@class,'Button')][contains(@id,'${p1}') and contains(@id,'${p2}')]`
        );

    /* gridRadioBtnLast - WebElement */
    gridRadioBtnLast = (p1, p2) =>
        this.iframe().locator(`(//div[contains(@class,'Checkbox')][contains(@id,'${p1}')][contains(@id,'${p2}')])[last()]`);

    /* getNoOfGridRecords - Button */
    getNoOfGridRecords = (p1) =>
        this.iframe().locator(
            `//*[local-name()='svg'][@iconid='icon-checkbox-ln']//ancestor::div[contains(@id,'${p1}') and contains(@id,'select')]`
        );

    /* frequentlyUsedSession - Button */
    frequentlyUsedSession = (p1) =>
        this.iframe().locator(
            `(//div[contains(@class,'SessionHistoryPanel')]//descendant::label[contains(@class,'Label-multiline')]/li[text()='${p1}'])[last()]`
        );

    /* personalizationOptions - Button */
    personalizationOptions = (p1, p2) =>
        this.iframe().locator(`//label[contains(@id,'${p1}')][normalize-space()='${p2}']`);

    /* selectCheckboxHeader - Button */
    selectCheckboxHeader = (p1, p2) =>
        this.iframe().locator(
            `//label[normalize-space()='${p1}']/ancestor::div//div[contains(@class,'Checkbox')][contains(@id,'${p2}')]`
        );

    /* multiLevelViewRow - Button */
    multiLevelViewRow = (p1, p2) =>
        this.iframe().locator(
            `//div[contains(@class,'GBFRow')][contains(@id,'${p1}')][contains(@id,'${p2}')]`
        );

    /* labelPanel - Button */
    labelPanel = (p1, p2, p3) =>
        this.iframe().locator(
            `//div[contains(@class,'LabelPanel')][contains(@id,'${p1}')][contains(@id,'${p2}')]//label[contains(@id,'${p3}')]`
        );

    /* multilevelPositionExpand - Button */
    multilevelPositionExpand = (p1, p2) =>
        this.iframe().locator(
            `//div[contains(@class,'Arrow Arrow-transparent')][contains(@id,'${p1}')][contains(@id,'${p2}')]`
        );

    /* drilldownBtn - Button */
    drilldownBtn = (p1, p2, p3) =>
        this.iframe().locator(
            `//label[normalize-space()='${p1}:']/parent::td/following-sibling::td//div[contains(@class,'Button')][contains(@id,'${p2}')][contains(@id,'${p3}')]`
        );

    /* getTotalRecords - Button */
    getTotalRecords = (p1, p2) =>
        this.iframe().locator(
            `//*[local-name()='svg'][@id='icon-checkbox-ln']//ancestor::div[contains(@id,'${p1}') and contains(@id,'${p2}-select') and not(contains(@id,'header'))]`
        );

    /* multilinePopupText - Button */
    multilinePopupText = () =>
        this.iframe().locator(`//div[contains(@class,'DialogWindow')]//label//li/parent::label`);

    /* labels - Button */
    labels = (p1, p2) =>
        this.iframe().locator(`//label[text()='${p1}:'] | //label[text()='${p2}']`);

    /* nextPageButton - Button */
    nextPageButton = (p1) =>
        this.iframe().locator(
            `//div[contains(@id,'shift.later')][contains(@id,'${p1}')]//*[local-name()='svg'][@iconid='icon-next-page']`
        );

    /* previousPageButton - Button */
    previousPageButton = (p1) =>
        this.iframe().locator(
            `//div[contains(@id,'shift.earlier')][contains(@id,'${p1}')]//*[local-name()='svg'][@iconid='icon-previous-page']`
        );

    /* expandBtn - Button */
    expandBtn = (p1, p2) =>
        this.iframe().locator(
            `//div[contains(@id,'${p1}')][contains(@id,'tree-root')][contains(normalize-space(),'${p2}')]//div[@class='SvgIconDiv']`
        );

    /* linkWithText - Link */
    linkWithText = (p1) =>
        this.iframe().locator(`//a[normalize-space()='${p1}']`);

    /* textBox - Input */
    textBox = (p1, p2, p3, p4, p5, p6) =>
        this.iframe().locator(
            `//label[normalize-space()='${p1}:']/parent::td/following-sibling::td//textarea[contains(@id,'${p2}') and contains(@id,'${p3}')]` +
            ` | ` +
            `//label[normalize-space()='${p4}']/ancestor::div//textarea[contains(@id,'${p5}') and contains(@id,'${p6}')]`
        );

    /* linkText - text */
    linkText = (p1, p2) =>
        this.iframe().locator(
            `//div[contains(@class,'FramedWindow') and not(@aria-hidden='true')]//div[contains(@class,'FieldSetContent')]//a[contains(@id,'${p1}')][normalize-space()='${p2}']`
        );

    /* dropdownLabel - Text */
    dropdownLabel = (p1, p2) =>
        this.iframe().locator(
            `//div[contains(@class,'FramedWindow') and not(@aria-hidden='true')]//label[normalize-space()='${p1}']//parent::div//parent::div/following-sibling::div//label[contains(@class,'Label')][contains(@id,'${p2}') and not(contains(@id,'filter-value')) and not(contains(@id,'grid'))]`
        );

    /* dropdownIcon - Text */
    dropdownIcon = (p1, p2) =>
        this.iframe().locator(
            `//div[contains(@class,'FramedWindow') and not(@aria-hidden='true')]//label[normalize-space()='${p1}']//parent::div//parent::div/following-sibling::div//div/following-sibling::div[contains(@class,'TriggerButton') and not(contains(@class,'disabled'))][contains(@id,'${p2}') and not(contains(@id,'filter-value')) and not(contains(@class,'readonly'))]/div/*[local-name()='svg'][@iconid='icon-dropdown']`
        );

    /* listItem - Button */
    listItem = (p1) =>
        this.iframe().locator(`(//div[contains(@class,'ListOutputField')]//label[normalize-space()='${p1}'])[last()]`);

    /* textMenuLast - Button */
    textMenuLast = (p1, p2, p3) =>
        this.iframe().locator(`(//div[contains(@class,'Button')][contains(@id,'${p1}') and contains(@id,'${p2}')]//label[text()='${p3}'])[last()]`);

    /* btnText - Input */
    btnText = (p1, p2) =>
        this.iframe().locator(`//div[contains(@id,'${p1}')][normalize-space()='${p2}']`);

    /* gridLabelLastValue - WebElement */
    gridLabelLastValue = (p1, p2) =>
        this.iframe().locator(`//div[contains(@class,'DataCell')][contains(@id,'${p1}')][contains(@id,'${p2}')]//label)[last()]`);

    /* statFieldButton - Buttons */
    statFieldButton = async(p1, p2) =>{
        return await (await this.iframe()).locator(`//div[contains(@class,'StatField')][contains(@id,'${p1}')]//div[normalize-space()='${p2}']/parent::div`)};

    /* valueInTabular - Assert */
    valueInTabular = async(p1, p2, p3) =>{
        return await (await this.iframe()).locator(
            `//label[normalize-space()='${p1}']/ancestor::tr/following-sibling::tr//label[contains(@id,'${p2}')][contains(@id,'${p3}')]`
        )};

    /* closeOtherSessions - Text */
    closeOtherSessions = () =>
        this.iframe().locator(`//label[text()='Close other sessions']`);

    /* dialogHeader - active dialog window tab */
    dialogHeader = (p1) =>
        this.iframe().locator(
            `//div[contains(@class,'FramedWindow') and not(@aria-hidden='true')]//div[contains(@class,'TitleBar')]//label[contains(text(),'${p1}')]`
        );

    /* fieldSetContent - label */
    fieldSetContent = (p1, p2) =>
        this.iframe().locator(
            `//div[@class='FieldSetContent']//div[text()='${p1}']/parent::div[contains(@id,'${p2}')]//label[@class='Label Value']`
        );

    /* fieldSetCheckBox - div */
    fieldSetCheckBox = (p1, p2) =>
        this.iframe().locator(
            `//div[@class='FieldSetContent']//div[text()='${p1}']/parent::div[contains(@id,'${p2}')]/div[@class='KPI']/div`
        );

    /* tabActive - tab */
    tabActive = (p1) =>
        this.iframe().locator(
            `//label[contains(@id,'session') and translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz') = '${p1}']/parent::div`
        );

    /* cascadeBtn - Button */
    cascadeBtn = () =>
        this.iframe().locator(`//div[contains(@class,'Button ')]//*[local-name()='svg'][contains(@iconid,'icon-cascade')]`);

    /* getNoOfRecords - Button */
    getNoOfRecords = (p1, p2) =>
        this.iframe().locator(
            `//*[local-name()='svg'][@id='icon-checkbox-ln']//ancestor::div[contains(@id,'${p1}') and contains(@id,'${p2}-select') and not(contains(@id,'header'))]`
        );

    /* visibletextLabel - Button */
    visibletextLabel = (p1, p2, p3) =>
        this.iframe().locator(
            `//div[contains(@class,'FramedWindow') and not(@aria-hidden='true')]//div[@aria-hidden='false']//label[normalize-space()="${p1}:"]/parent::td/following-sibling::td//input[contains(@id,'${p2}') and contains(@id,'${p3}')]`
        );

    /* expandButton - button */
    expandButton = () =>
        this.iframe().locator(
            `//div[contains(@class,'Button')][contains(@id,'button-expand-collapse')]`
        );

    /* displayHiddenItemsCheck - Button */
    displayHiddenItemsCheck = () =>
        this.page.locator(
            `//label[text()='Display Hidden Objects']//ancestor::tr[contains(@id,'-DISPLAY_HIDDEN')]/td/div/*[local-name()='svg'][@iconid='icon-check']`
        );

    /* activitiesWithLabel - Button */
    activitiesWithLabel = (p1, p2, p3) =>
        this.iframe().locator(
            `//label[normalize-space()="${p1}" and contains(@id,'${p2}')]//parent::td//parent::tr//preceding::tr//label[normalize-space()="${p3}"]`
        );

    /* lastGridMenuBtn - Button */
    lastGridMenuBtn = (p1, p2) =>
        this.iframe().locator(
            `(//div[contains(@class,'GridMenuButton')][contains(@id,'${p1}') and contains(@id,'${p2}')])[last()]`
        );

    /* asterisk - star */
    asterisk = (p1) =>
        this.iframe().locator(
            `//*[local-name()='svg'][@iconid='icon-star-filled']//ancestor::td/preceding-sibling::td//label[normalize-space()='${p1}:']`
        );

    /* lastColumnHeader - Button */
    lastColumnHeader = (p1, p2) =>
        this.iframe().locator(
            `(//div[contains(@class,'ColumnHeader')][contains(@id,'${p1}')][contains(@id,'${p2}')])[last()]`
        );

    /* allTabFilter - Input Field */
    allTabFilter = () =>
        this.iframe().locator(
            `//input[contains(@id,'All-tab-filter')]`
        );

    /* activitiesList - label */
    activitiesList = (p1, p2) =>
        this.iframe().locator(
            `//label[text()='${p1}']/ancestor::div//label[contains(@id,'${p2}')][string-length(text())>0]`
        );

    /* activityTxtZoomBtn - Button */
    activityTxtZoomBtn = (p1, p2) =>
        this.iframe().locator(
            `//label[text()='${p1}']/ancestor::div/following-sibling::div//input[contains(@id,'${p2}')]/following-sibling::div`
        );

    /* activityField - text */
    activityField = (p1, p2) =>
        this.iframe().locator(
            `//label[text()='${p1}']/parent::div/parent::div/following-sibling::div//label[contains(@id,'${p2}')]`
        );

    /* checkmarkInViews - label */
    checkmarkInViews = (p1, p2) =>
        this.iframe().locator(
            `//tr[contains(@id,'${p1}') and contains(@id,'${p2}')]//div`
        );

    /* widgetTitle - label */
    widgetTitle = (p1) =>
        this.iframe().locator(
            `//label[text()='${p1}']`
        );

    /* selectLastRadioBtn - RadioButton */
    selectLastRadioBtn = (p1, p2) =>
        this.iframe().locator(
            `(//label[text()='${p1}']/parent::div[contains(@id,'${p2}')])[last()]`
        );
}

export default LNPage;