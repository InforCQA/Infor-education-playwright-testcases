import BaseClass from '../../testBase/BaseClass.js';

class DocumentManagementPage extends BaseClass
{
    constructor() {
    super();
    this.page = BaseClass.page;
  }
   iframe=() => {
    const frame1 = this.page.frameLocator("//iframe[contains(@name,'daf')]");
    const frame2 = frame1.frameLocator("//iframe[@id='clientFrame']");
    return frame2;
   }

    /* My Documents - button */
    myDocuments= "//div[@id='sidebar-shortcuts-menu']//a[normalize-space()='My Documents']";

    /* Sort Results - button */
    sortResults= "//button[text()=' Sort Results ']";

    /* Created Date - button */
    createdDateSort= "//a[text()=' Created Date ']";

    /* Sort Order Switch - button */
    sortOrderSwitch= "//button[@id='sortOrderSwitch']";

    /* Open Document Details - list of buttons */
    openDocumentDetails= "//a[@queryparamshandling='merge']";

    /* File Name - label */
    fileName= "//div[contains(@data-e2e-id,'filename')]";

    /* Created Date - label */
    createdDate= "//div[contains(@data-e2e-id,'created-date')]";

    /* Created By - label */
    createdBy= "//div[contains(@data-e2e-id,'created-by')]";

    /* Close - button */
    close= "//button[contains(@data-e2e-id,'close')]";

    /* Tab - button */
    selectTab= "//span[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']/ancestor::li[contains(@class,'tab')]";

    /* Purchase Order Number - label */
    purchaseOrderNo= "//span[text()='Purchase order number']/parent::label/following-sibling::div/span";

    /* Document Number - Input */
    documentNumber= "//input[@id='W1DONR']";

    /* Document Name - Input */
    documentName= "//input[@id='WWDESC']";

    /* Tabs - button */
    tabsButton= "//span[text()='%s']";

    /* Tab List - button */
    tabList= "//a[contains(text(),'%s')]";

    /* Name - Input */
    name= "//div[contains(@class,'visible-tab-host')]//input[@id='WRTXDE']";

    /* Finish Date - Input */
    finishDate= "//div[contains(@class,'visible-tab-host')]//input[@id='WRENDT']";

    /* Recently Modified - button */
    recentlyModified= "//div[@id='sidebar-shortcuts-menu']//a/span[text()='Recently Modified']";

    /* Title Hyperlink - button */
    titleHyperLink= "//div[contains(text(),'%s')]/ancestor::div/following-sibling::div//div[contains(text(),'%s')]/ancestor::div/div/div/h4/a[normalize-space()='%s']";

    /* Document Type - label */
    documentType= "//div[text()='Document Type'][contains(@class,'label')]/following-sibling::div[contains(@class,'tab-panel-property-value')]";

    /* Attribute Field Value - label */
    attributeFieldValue= "//span[text()='%s']/parent::label/following-sibling::div/span";

    /* Image - button */
    imageBtn= "//img[@alt='%s'][@class='preview']";

    /* Image Window - button */
    imageWindow= "//div[contains(@class,'preview-modal')]";

    /* Close Preview Window - button */
    closePreviewWindow= "//button[contains(@class,'close-modal')]";

    /* Save Search - button */
    saveSearch= "//button[normalize-space()='Save Search']";

    /* Save Search Window - Heading */
    saveSearchWindow= "//h1[normalize-space()='Save Search']";

    /* Name Field - Input */
    nameFiel= "//label[normalize-space()='Name']/parent::div//input[contains(@id,'name')]";

    /* OK Button */
    okBtn= "//button[normalize-space()='OK'][contains(@class,'modal-success')]";

    /* Shortcuts - Links */
    shortcuts= "//a[normalize-space()='%s']";

    /* Advanced Search - Button */
    advancedSearch= "//button[contains(@class,'advanced-search')]";

    /* Search Dropdown */
    searchDrp= "//div[@id='search-dropdown']";

    /* Document Type Dropdown */
    documentTypeDrp= "//label[normalize-space()='Document Type']/following-sibling::select";

    /* Property or Attribute Dropdown */
    propertyOrAttributeDrp= "//label[normalize-space()='Property or Attribute']/following-sibling::select";

    /* Operation Dropdown */
    operationDrp= "//label[normalize-space()='Operation']/following-sibling::select";

    /* Search - Input */
    search= "//input[@placeholder='Search']";

    /* Search - Button */
    searchBtn= "//button[@id='searchButton']";

    /* Select Document - checkbox */
    selectDocument= "//a[@queryparamshandling='merge']/ancestor::div[contains(@class,'content')]/preceding-sibling::div[contains(@class,'icons')]//input[@type='checkbox']";

    /* Download - Button */
    download= "//button[normalize-space()='Download']";

    /* Original Format - Link */
    originalFormat= "//a[normalize-space()='Original format']";

    /* Search Document - Field */
    searchDocument= "//input[@data-e2e-id='quick-search-input']";

    /* Select All Documents - Input */
    selectAllDocuments= "//input[@data-e2e-id='search-result-select-all']";

    /* Header Title - div */
    headerTitle= "//div[contains(@class,'modal-content-header')]";

    /* Select a Document Based on Document Type - div */
    documentRow= "//div[text()='%s']/following-sibling::div[text()='%s']";

    /* Select a Document Based on Order Number - a */
    orderNoRow= "//a[@queryparamshandling='merge'][normalize-space()='%s']/ancestor::div[contains(@class,'content')]/preceding-sibling::div[contains(@class,'icons')]//input[@type='checkbox']";

    /* Header Button - button */
    textBtn= "//button[normalize-space()='%s'][contains(@class,'modal')]";

    /* Tool Bar Icons - button */
    menuItems= "//button[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s'][@data-e2e-id='%s']";

    /* Dropdown with Label */
    drpWithLabel= "//label[normalize-space()='%s']/following-sibling::*[@id='%s']";

    /* Dropdown Value */
    dropdownValue= "//*[@id='%s']//*[normalize-space()='%s']";

    /* Text Buttons - Ok, Close, Create, etc. */
    textBtns= "//button[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']";

    /* Upload File Button */
    uploadFile= "//input[@class='upload']";

    /* Attachment File Upload to Verify */
    inputFile= "//div[contains(@class,'filename')]";

    /* Text Field */
    textField= "//span[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']//parent::label/following-sibling::div//input[@id='%s']";

    /* Control Center Button */
    controlCenterBtn= "//button[@data-e2e-id='controlCenterButton']";

    /* Document Type Values List */
    documentTypeValuesList= "//label[normalize-space()='Document Type']/following-sibling::select/*";

    /* Reset - Button */
    resetBtn= "//button[@id='resetButton']";

    /* Input Field */
    inputField= "//input[@id='%s']";

    /* Radio Button */
    radioBtn= "//label[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']/preceding-sibling::input[@id='%s']";

    /* Text Area */
    textArea= "//textarea[@id='%s']";

    /* Calendar Button */
    calendarBtn= "//button[contains(@class,'calendar-button')]";

    /* Search Results */
    searchResults= "//div[normalize-space()='0 matching documents'][contains(@class,'search-result')]";

    /* Version */
    version= "(//th[normalize-space()='Version']/ancestor::*/following-sibling::*//tr//td[2])[last()]";

    /* More Button */
    moreBtn= "//button[@data-e2e-id='more-actions-button']";

    /* Text With Label */
    textWithLbl= "//label[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s:']/following-sibling::div/input[@id='%s']";

    /* Checkbox */
    checkbox= "//label[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']/preceding-sibling::input[@id='%s']";

    /* Archive Dropdown */
    archiveDrp= "//select[@id='selectedItemState']";

    /* Popup Message */
    popupMsg= "//div[@class='action-modal-text']";

    /* Text Area with Label */
    textAreaWithLbl= "//label[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s:']/following-sibling::*[@id='%s']";

    /* Close Tab */
    closeTab= "//div[@class='action-modal-text']";

    /* Status Dropdown */
    statusDrpdown= "//*[@id='%s']/following-sibling::*//span[normalize-space()='%s']";

    /* Search Field */
    searchField= "//input[@data-e2e-id='%s']";

    /* Dropdown Value */
    drpValue= "//span[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']";
}

export default DocumentManagementPage;