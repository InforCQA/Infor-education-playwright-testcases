import BaseClass from '../../testBase/BaseClass.js';

class DocumentMangement extends BaseClass {

        constructor() {
                super();
                this.page = BaseClass.page;
        }
        iframe = () => {
                const frame1 = this.page.frameLocator("//iframe[contains(@name,'daf')]");
                const frame2 = frame1.frameLocator("//iframe[@id='clientFrame']");
                return frame2;
        }

        /* To click toggle menu button */
        toggleMenuBtn = "//button[contains(@data-e2e-id,'control-center-menu')]";

        /* To verify toggle menu expanded */
        toggleMenu = "//button[contains(@data-e2e-id,'control-center-menu')]//ancestor::div//preceding-sibling::*[contains(@class,'control')]//*[normalize-space()='Control Center']";

        /* To click navigation menu folders */
        menuFolders = "//a[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']//parent::li[not(@role) and not(contains(@class,'infor'))]";

        /* To click open menu folder */
        menuFolder = "//li[contains(@class,'open')]//a[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']";

        /* To click specific text menu item */
        textMenuItem = "//button[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s'][@data-e2e-id='%s']";

        /* To click generic text button */
        textBtn = "//button[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']";

        /* Dropdown next to label */
        dropdownWithLbl = "//label[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']//following-sibling::*[@id='%s']";

        /* Dropdown menu item by value */
        dropdownValue = "//*[@id='%s']//*[normalize-space()='%s']";

        /* Hyperlink or text with link */
        textWithLink = "//a[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']";

        /* Input field identified by data-e2e-id */
        textSearch = "//input[@data-e2e-id='%s']";

        /* Tab selector */
        selectTab = "//li[contains(@class,'tab')][not(@style)]//a[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']";

        /* Simple textbox */
        textbox = "//label[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']/following-sibling::input[@id='%s']";

        /* Text input with label inside div */
        textWithLabel = "//label[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']/following-sibling::div//input[@id='%s']";

        /* Textbox inside a dropdown-like container */
        textWithDrp = "//label[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']/following-sibling::*//*[@id='%s']";

        /* Specific grid row */
        gridRow = "(//*[normalize-space()='%s']/ancestor::*/following-sibling::*/tr/td[normalize-space()='%s'])[last()]";

        /* Action message banner */
        actionMsg = "//div[contains(@class,'fadeInOutWithScaleAnimation')]";

        /* Close button */
        btnClose = "//button[contains(@infor-icon,'close')]";

        /* Wizard step label */
        wizardLabel = "//p[normalize-space()='%s']//ancestor::a[contains(@class,'filled')]";

        /* Header section */
        header = "//div[normalize-space()='%s'][contains(@class,'header')]";

        /* Toolbar icons */
        toolbarIcons = "//button[@id='%s']";

        /* Radio button by label and id */
        radioBtn = "//label[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']//preceding-sibling::input[@id='%s']";

        /* Checkbox by label and id */
        checkbox = "//label[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']//preceding-sibling::input[@id='%s']";

        /* Value to verify inside a list item */
        valueToVerify = "//a[normalize-space()='%s']//parent::li";

        /* Button without label but with data-e2e-id */
        btnWithoutLbl = "//button[contains(@data-e2e-id,'%s')]";

        /* Grid row checkbox span */
        gridRowCheckMark = "//td[normalize-space()='%s']//preceding-sibling::td/span";

        /* Textbox with label inside div */
        textWithLbl = "//label[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s:']/following-sibling::div//input[@id='%s']";

        /* Textarea input */
        textArea = "//label[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s:']/following-sibling::div//textarea[@id='%s']";

        /* Generic dropdown input */
        dropdown = "//*[contains(@data-e2e-id,'%s')]";

        /* Dropdown value link */
        drpValue = "//a[normalize-space()='%s']";

        /* Row checkbox by span and id */
        rowChkbox = "//span[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']/ancestor::div//following-sibling::*//input[@id='%s']";

        /* SVG icon for file upload */
        attachmentFileUpload = "//input[@id='file-name']";

        /* File input parent */
        inputFile = "//span[contains(@class,'filename')]//parent::div";

        /* Expand button link next to label */
        expandBtn = "//label[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']/parent::div/following-sibling::div//a[contains(@data-e2e-id,'expand-button')]";

        /* Verify expanded list item */
        verifyExpandBtn = "//label[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']/ancestor::li";

        /* Input field by type */
        txtSearch = "//input[@type='%s']";

        /* Filter enable switch when unchecked */
        enableFilter = "//input[@name='enable-filter-switch'][not(@checked)]";

        /* Document types selector */
        documentTypes = "//*[normalize-space()='%s']/following-sibling::*//a[normalize-space()='%s']";

        /* Icon buttons in toolbar */
        iconBtns = "//button[contains(@class,'%s')]";

        /* Query information container */
        queryInfo = "//div[contains(@class,'search-stack-data')]";

        /* Generic text field by id */
        txtField = "//input[@id='%s']";

        /* Attributes selection nav item */
        attributes = "//a[normalize-space()='%s']//parent::li/preceding-sibling::li/a[normalize-space()='%s']";

        /* Icon button by infor-icon attribute */
        iconBtn = "//button[contains(@infor-icon,'%s')]";

        /* Text menu icon button */
        textMenuIcon = "//button[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s'][@infor-icon='%s']";

        /* Textarea inside dialog */
        textAreaInDlg = "//label[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']/following-sibling::textarea[@id='%s']";

        /* Active slider checkbox in grid */
        activeSlider = "(//td[normalize-space()='%s']/preceding-sibling::td//input[@type='checkbox'][not(@checked)])[last()]";

        /* Click last row button by text */
        clickLastRowBtns = "(//button[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s'])[last()]";

        /* Textarea inside dialog with sibling div */
        txtAreaInDlg = "//label[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']/parent::div//following-sibling::div//textarea[@id='%s']";

        /* Checkbox sliders in grid */
        gridSliders = "//td[normalize-space()='%s']//following-sibling::td//input[not(@checked)][contains(@id,'%s')]/following-sibling::label";

        /* Checkbox slider verify present */
        gridSlidersVerify = "//td[normalize-space()='%s']//following-sibling::td//input[contains(@id,'%s')]";

        /* Dropdown inside div with label */
        drpdWithLbl = "//label[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']//following-sibling::div/*[@id='%s']";

        /* Generic textarea by label and id */
        txtArea = "//*[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']/parent::div//following-sibling::div/textarea[@id='%s']";

        /* sub header title */
        subHeader = "//div[@class='idm-subheader']//h1";
}

export default DocumentMangement;