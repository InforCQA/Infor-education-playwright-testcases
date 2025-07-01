import BaseClass from '../../testBase/BaseClass.js';

class Homepages extends BaseClass {

  constructor() {
    super();
    this.page = BaseClass.page;
  }

  username = () => this.page.locator("//input[@name='username']");
  password = () => this.page.locator("//input[@name='pass']");
  submit = () =>   this.page.locator("//span[text()='Sign in']");
  menuBar = () =>  this.page.locator("//*[contains(@id,'nav-launcher')]");

  // Application name (V2) 
  appNameV2 = "//*[local-name()='ids-text'][normalize-space()='%s']";

  // 'See More' button
  seeMore = "//*[local-name()='ids-text'][normalize-space()='%s']/ancestor::*/following-sibling::div//*[local-name()='ids-text'][normalize-space()='See more']";

  // Close selected toolbar
  closeSelectedToolbar = "//*[contains(@id,'tab') and not(contains(@id,'more')) and contains(@class,'selected')]//*[contains(@data-osp-id,'close')]";

  // User icon
  userIcon = "//button[@id='rNavUsrBtn']";

  // Sign out link
  signOut = "//a[@id='usrSignOut']";

  // App menu button
  appMenu = "//*[@id='mhdrAppBtn']";

  // Application name
  appName = "//a[@title='%s']";

  // Context Apps button
  btnContextApps = "//li[@id='rNavEC']";

  // Cloud Identities button
  cloudIdentities = "//label[text()='Cloud Identities']";

  // User icon (Ln variant)
  userIconLn = "//*[@id='osp-nav-user-profile']";

  // Sign out option (Ln variant)
  signOutLn = "//*[@ygtrackclick='Sign Out']";

  // Context Apps button (V2)
  btnV2ContextApps = "//*[local-name()='ids-button'][@id='osp-ds-t-widgets']";

  // App menu (V2)
  appMenuV2 = "//*[contains(@id,'nav-launcher')]";

  // Selected toolbar
  selectedToolbar = "//li[contains(@class,'cdk-drag')]//*[local-name()='portal-tab-item' and contains(@class,'selected')]";

  // Message text
  messageText = "//div[@id='message-text']";

  // 'Don't show this message again' checkbox
  dontShowChk = "//*[local-name()='ids-checkbox'][@label=\"Don't show this message again\"]";

  // Close button
  close = "//button[contains(@class,'btn-close')]";

  // Username value
  usernameValue = "//span[@id='usrNameVal']";

  // 'Infor U' text
  inforU = "//*[local-name()='ids-text'][normalize-space()='Infor U']";

  // Toolbar dropdown
  toolBarDropDown = "//div[normalize-space()='%s']//following-sibling::button[contains(@id,'osp-tabi-menubutton-')]";

  // Toolbar options
  toolBarOptions = "//ul[contains(@class,'is-open')]//span[text()='%s']";

  // Bookmark modal title
  bookMarkTitle = "//div[contains(@class,'modal-header')]";

  // Bookmark name field
  nameFldBookmark = "//div[@id='message-text']//label[text()='Name']/following-sibling::input";

  // Save bookmark button
  saveBookMark = "//button[@id='osp-b-add-save'][normalize-space()='Save']";

  // Bookmark pages
  bookMarkPages = " //div[@id='osp-al-mgbm-list']//a//span//span[text()='%s']";

  // Manage bookmarks button
  manageBookMarks = "//*[contains(local-name(),'ids-button')][normalize-space()='Manage Bookmarks']";

  // Bookmark delete button
  bookMarkDeleteBtn = "//span[text()='%s']//ancestor::div[@id='osp-al-mgbm-list']//*[contains(@icon,'delete')]";

  // Popup message (V2)
  popUpMsgV2 = "//div[@id='message-text'][text()=\"%s\"]";

  // 'Yes' button (V2)
  yesBtnInVersion2 = "//button[contains(@id,'modal-button')]//span[text()='Yes']";

  // Bookmark
  bookMark = "//div[contains(@class,'bookmark-items')]//span[contains(@class,'bookmark-item-name')][text()='%s']";

  // Widget title (V2)
  widgetTitleV2 = "//*[contains(@class,'widget-title')][normalize-space()='%s']";

  // Popup message
  popupMsg = "//div[@aria-labelledby='message-title']//div[@class='message']";

  // 'Yes' button
  yesBtn = "//button[normalize-space()='Yes']";

  // Widget title
  widgetTitle = "//*[contains(@class,'widget-title')][normalize-space()='%s']";

  // Workspace name
  workSpaceName = "//*[local-name()='ids-layout-flex'][contains(@class,'workspace')][contains(normalize-space(),'%s')]";

  // 'Add a Workspace' button
  addAWorkspace = "//*[local-name()='ids-button'][@id='osp-al-ws-add-workspace']";

  // Workspace ellipsis button
  ellipsisWS = "//*[local-name()='ids-layout-flex'][contains(@class,'workspace')][contains(normalize-space(),'%s')]//*[local-name()='ids-menu-button'][@data-osp-id='osp-al-ws-menu-button']";

  // Home options
  homeOptions = "//*[contains(@class,'open')]//*[local-name()='ids-menu-item'][contains(@id,'osp-al-ws')][normalize-space()='%s']";

  // M3 Menu widget
  m3MenuWidget = "//div[contains(@class,'widget-title')][normalize-space()='M3 Menu']";

  // Toggle Search icon
  toggleSearchIcon = "//div[normalize-space()='M3 Menu']//parent::div[contains(@class,'widget-header-section')]//following-sibling::div[contains(@class,'widget-header-section custom')]//button[normalize-space()='Toggle Search']";

  // Search input field
  searchInput = "//div[contains(@class,'m3-menu')]//input[@placeholder='Search']";

  // Search result
  searchResult = "//a[@class='lm-cursor-pointer']";

  // Expand section button
  expandSection = "//*[local-name()='ids-text'][normalize-space()='%s']/parent::*/following-sibling::*[local-name()='ids-layout-flex-item']//*[local-name()='ids-button']";

  // Ellipse icon
  ellipseIcon = "//*[local-name()='ids-menu-button'][contains(@id,'more-btn')]";

  // Import bookmark button
  importBookMark = "//*[local-name()='ids-menu-item'][contains(@id,'import')]";

  // Folder icon
  folderIcon = "//*[contains(@href,'icon-folder')]";

  // OK button
  okBtn = "//button[@id='osp-upload-ok']";

  // Add Workspace button
  addWorkspace = "//*[local-name()='ids-button'][contains(@id,'add-workspace')]";

  // Smart panel buttons
  smartPanelBtns = "//*[contains(@id,'%s') and @icon]";

  // Page title
  pageTitle = "//portal-tab-item[contains(@id,'osp-tabh')][contains(normalize-space(),'%s')]";

  // 'Add a Workspace' button variant
  addAWorkspaces = "//*[local-name()='ids-button'][normalize-space()='Add a Workspace']";

  // Open Smart Panel button
  openSmartPanel = "//*[@tooltip='Show Smart Panel']//*";

  // Application card
  appCard = "//label[normalize-space()='%s']/ancestor::*[local-name()='ids-card']";

  // Continue button
  continueBtn = "//*[@id='osp-ws-c-continue']";

  // Body tag
  bodyTag = "//body";

  // Fileupload
  fileUpload = "//input[@id='osp-upload-file']";

  /* textFld */
	textFld= "//input[contains(@id,'%s')]";

  /* smartPanel - Button */
	smartPanel = "//*[@tooltip='%s']";
}

export default Homepages;