import BaseClass from '../../testBase/BaseClass.js';

class MonitorsPage extends BaseClass {
    constructor() {
        super();
        this.page = BaseClass.page;
    }

    iframe = () => {
        const frame1 = this.page.frameLocator("//iframe[contains(@data-osp-id,'iondesk')]");
        const frame2 = frame1.frameLocator("//iframe[contains(@name,'monitoringdesk')]");
        return frame2;
    }

    // File upload icon
    fileUpload = "//input[@name='file']";

    // Transaction button (dynamic text)
    txnBtn = "//button[text()='%s']";

    // Icon buttons by title
    iconBtn = "//*[contains(@title,'%s')]";

    activateBtn= "//div[contains(@class,'monitoring')]/*[contains(@title,'%s')][contains(@class,'infor')]"

    // Confirmation popup message
    actionMsg = "//div[contains(text(),'%s')]";

    // Tile bar button
    tileBarBtn = "//div[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']/ancestor::*/preceding-sibling::*/div/button[@title='%s' and not(@disabled)]";

    // Toolbar icons by title
    toolbarIcons = "//button[@title='%s' and not(@disabled)]";

    // Last menubar icon by seleniumid
    menubarIcons = "(//button[@seleniumid='%s'])[last()]";

    // Input field by seleniumid
    inputField = "//input[@seleniumid='%s']";

    // Tab selector
    selectTab = "//div[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']/parent::div[contains(@class,'TabInner')]";

    // Radio button by label
    rdnBtn = "//label[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']/preceding-sibling::input";

    // Grid checkbox (last)
    gridCheckbox = "(//div[normalize-space()='%s']/parent::td/preceding-sibling::td[contains(@class,'dataGridFirstColumn')])[last()]";

    // Delete (Remove) icon/button
    deleteIcon = "//div[contains(normalize-space(),'Selected')]/following-sibling::button[@title='Remove']";

    // Add button
    addBtn = "//button[@seleniumid='addDistributionButton']";

    // List dropdown
    listDrp = "//div[normalize-space()='%s']/ancestor::tr/following-sibling::tr//div[@seleniumid='distributionTypeListDropDown']";

    // Dropdown value
    drpValue = "//td[normalize-space()='%s']";

    // Grid column value
    columnVal = "//td[contains(@class,'DataGrid')]//div[normalize-space()='%s']";

    // Search field in grid-like row
    searchField = "//div[normalize-space()='%s']/ancestor::tr/following-sibling::tr//input[@seleniumid='%s']";

    // Email checkbox in column
    emailChkbox = "//div[normalize-space()='%s']/parent::td/following-sibling::td//input[@seleniumid='checkboxId']";

    // Column header name
    colName = "//th[contains(@class,'ColumnHeader')]//div[normalize-space()='%s']";
}

export default MonitorsPage;