class PortalPage {

    // To verify navigate menu -- Button
    expandPanel = "//*[@color-variant='app-menu']//*[local-name()='ids-text'][translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']";

    // Import Icon
    toolBar = "//*[local-name()='ids-button'][contains(@id,'%s')]";

    // Confirmation message
    actionMsg = "//*[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s'][contains(@class,'button')]";

    // Check Box button
    checkbox = "//label[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']/preceding-sibling::input[contains(@id,'%s')]";

    // Search Data
    textBox = "//*[local-name()='ids-search-field'][@id='%s']";

    // Search Btn
    searchBtn = "//*[local-name()='ids-icon'][@icon='search']";

    // Text Field
    textField = "//label[contains(translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'%s')]/following-sibling::*[contains(@id,'%s')]";

    // Dropdown
    dropdownClick = "//div[contains(@class,'dropdown')][contains(@id,'%s')]";

    dropdown = "//*[contains(@id,'%s')]";

    // Drop down value
    dropdownValue = "//*[contains(@tabindex,'0')]//*[local-name()='ids-list-box-option'][translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']";

    // Property field
    propertyField = "//input[contains(@id,'role-search')]";

    // Last property field
    lastPropertyField = "//*[contains(local-name(),'ids-input')][@label-state='collapsed']";

    // Shadow Root element
    static shadowRoot = "[id='%s']";

    // Grid rows selection in shadow root
    static gridRow = "[class='ids-data-grid-row']";

    // Checkbox selection in shadow root
    static rowCheckBox = "[class='ids-data-grid-checkbox']";

    // Grid selection in shadow root
    static rowIndex = "[aria-rowindex='%s']";

    // Add Icon
    addIcon = "//*[normalize-space()='%s']/parent::*//button[@icon='add']";

    // Popup Message
    popupMsg = "//*[@class='toast-title']";

    // Select Toolbar in dialog box
    dialogToolbar = "//*[@id='%s']";

    // Caret Icon
    caretIcon = "//button[contains(@name,'%s')]//*[local-name()='use'][contains(@href,'icon-caret-down')]";

    // Add Component Popup Message
    addComponent = "//*[@class='component-info']//*[normalize-space()='%s']";

    // Setting Icon
    settingIcon = "//div[contains(@name,'%s')]/following-sibling::div//*[normalize-space()='%s']/following-sibling::*[normalize-space()='%s']/following-sibling::button//*[local-name()='use'][contains(@href,'icon-settings')]";

    // Component Caret Icon
    componentCaretIcon = "//*[normalize-space()='%s']/parent::*/following-sibling::button//*[local-name()='use'][contains(@href,'icon-caret-down')]";

    // Panel Icon
    panelIcons = "//*[normalize-space()='%s']/following-sibling::div//span[normalize-space()='%s']";

    // Selected Policies
    selectedPolices = "//*[@aria-label='Selected']//p[normalize-space()='%s']";

    // List Items
    listItems = "//*[@class='card-header']/following-sibling::*//*[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']";

    // Add Toolbar
    addToolBar = "//*[normalize-space()='%s']/ancestor::div/following-sibling::div//span[normalize-space()='%s']";

    // Catalog Button
    menuItems = "//*[local-name()='ids-text'][translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']";

    // Radio Button
    radioBtn = "//*[local-name()='ids-radio'][translate(@label,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s'][@id='%s']";

    // Background Image
    backgroundImage = "//div[normalize-space()='%s']//*[contains(@style,'background-image')]";

    // Toolbar Title
    toolBarTitle = "//*[contains(@id,'%s')][normalize-space()='%s']";

    // Component Caret
    componentCaret = "//button[contains(@name,'%s')]//*[contains(@href,'icon-caret-down')]";

    // Modal Title
    modalTitle = "//*[@class='modal-title'][normalize-space()='%s']";

    // Continue Button
    modalBtn = "//*[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']/parent::button[@id='%s']";

    // Confirmation message
    dialogToolBar = "//span[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']";

    // Select Dropdown
    menuDropdown = "//*[local-name()='ids-menu-button'][@id='%s']";

    // Select Dropdown Values
    menuValue = "//*[local-name()='ids-menu-item'][translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']";

    // Import Icon
    addBtn = "//span[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']/parent::*[local-name()='ids-button'][@id='%s']";

    // Select Radio Button
    radioBtnField = "//label[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']/preceding-sibling::input[contains(@id,'%s')]";

    // Column Name - Grid column label
    columnNameInDlgBox = "//div[contains(@class,'is-visible')]//span[normalize-space()='%s']/ancestor::th[@role='columnheader']";

    // Grid Cell Based on Row Number and Column ID
    cellValueInDlgBox = "//div[contains(@class,'is-visible')]//tr[@aria-rowindex='%s']//td[@aria-describedby='%s']";

    // Grid Row Based on Row Number
    gridRowInDlgBox = "//div[contains(@class,'is-visible')]//tr[@aria-rowindex='%s'][string-length(normalize-space()) >0]";

    // Select Next Button
    btnNext = "//span[normalize-space()='%s']/parent::a";

    // Edit Settings
    editSetting = "//span[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']/parent::button[@icon='edit']";

    // Text Area Data
    textArea = "//*[@label='%s']/following-sibling::*/*/following-sibling::div//*[local-name()='ids-textarea']";

    // Calendar Icon
    calenderIcon = "//label[contains(normalize-space(),'%s')]/following-sibling::*//*[local-name()='use'][contains(@href,'icon-calendar')]";

    // Month Pick
    monthPick = "//a[@data-month='%s']";

    // Year Pick
    yearPick = "//a[@data-year='%s']";

    // Date Pick
    datePick = "//td[contains(@data-key,'%s')]//span[normalize-space()='%s']";

    // Row Check Button
    rowCheckbox = "//tr[@aria-rowindex='%s']//td[contains(@class,'selectioncheckbox')]";

    // Clear Button in Shadow Root
    static clearBtn = "[class='btn-clear']";

    // Text Data
    title = "//*[@id='%s']";

    // Edit Icon in Shadow Root
    static editIcon = "[class='ids-data-grid-cell align-right formatter-button']";

    // Grid Toolbar Button
    gridToolbar = "//span[contains(translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'%s')]";

    // Grid Header Column Selection in Shadow Root
    static gridHeader = "[class='ids-data-grid-header']";

    // Grid Rows Selection in Shadow Root
    static checkboxHeader = "[class='ids-data-grid-checkbox-container']";

    // Text Field
    textFld = "//input[contains(@id,'%s')]";

    // Selected Data
    selectedData = "//*[@aria-label='Selected']";

    // Disabled Data
    disabledData = "//*[@class='is-disabled']";

    // To Select Options
    selectedOptions = "//*[@aria-label='Selected']//*[@role='option'][contains(@id,'%s')]";

    // Disabled Data
    subTab = "//ids-tab[contains(@role,'tab')][translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']";

    // Expand Panel
    expandedPanel = "//*[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s'][@aria-expanded='true']";

    // Slider Element in Shadow Root
    static slider = "[class='slider']";

    // Disabled Data
    dataPicker = "//td[not(contains(@class, 'is-disabled'))]//span[text()='%s']";

    // Toolbar Button
    toolbarBtn = "//*[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']/parent::*[@id='%s']";

    // Type Input Data
    inputField = "//*[translate(@label,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s'][contains(@id,'%s')]";

    /* ok button  */
	okBtn = "//button[@id='osp-upload-ok']";

    fileUpload = "//input[@id='%s']";
}

export default PortalPage;