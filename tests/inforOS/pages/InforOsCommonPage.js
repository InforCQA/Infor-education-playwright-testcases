class InforOSCommonPage {

    // To select tab in OS -- Button
    selectTab = "//*[contains(@role,'tab')][normalize-space()='%s']";

    // To click more button -- Button
    btnMore = "//div[contains(@class,'tab-more')]";

    // To click an item in the “more” menu
    selectTabInMore = "//a[normalize-space()='%s' and contains(@role,'menuitem')]";

    // To click on the <body> tag
    bodyTag = "//body";

    // To click the continue button
    continueBtn = "//*[@id='osp-ws-c-continue']";

    // To select an application card (wrapped in ids-card)
    appCard = "//label[normalize-space()='%s']/ancestor::*[local-name()='ids-card']";

    // Toggle menu (first variant)
    toggleMenu = "//div[not(contains(@style,'width: 0px'))] /following-sibling::*//*[local-name()='ids-button'][@id='%s']";

    // Toggle menu (second variant)
    menuItem = "//*[local-name()='ids-button'][@id='%s']";

    // To select main tabs in OS
    selectMainTab = "//*[local-name()='ids-text'][normalize-space()='%s']/parent::*[contains(@data-osp-id,'app')]";

    // OS tab
    osTab = "//*[normalize-space()='OS']/parent::*[contains(@id,'tab') and not(contains(@id,'more'))]";

    // Active tab validator
    activeTab = "//*[normalize-space()='%s']/parent::*[contains(@id,'tab') and not(contains(@id,'more')) and contains(@class,'selected')]";

    // Page title for OS
    pageOSTitle = "//portal-tab-item[contains(@id,'osp-tabh')][contains(normalize-space(),'OS')]";

    // Currently active tab (OS)
    currentTab = "//portal-tab-item[contains(@id,'osp-tabh')][contains(normalize-space(),'%s')][contains(@class,'selected')]";
}
