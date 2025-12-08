import BaseClass from '../../testBase/BaseClass.js';

class WorkflowsPage extends BaseClass {
    constructor() {
        super();
        this.page = BaseClass.page;
    }

    iframe = () => {
        const frame = this.page.frameLocator("//iframe[contains(@name,'iondesk')]");
        return frame;
    }

  // Toggle menu button
  toggleMenuBtn = "//button[contains(@class,'menuIcon')]";

  // Toggle menu panel (ensure it's visible)
  toggleMenu = "//div[contains(@class,'NavigationComponent') and contains(@class,'westPanel')]/parent::div[not(contains(@style,'width: 0px'))]";

  // Navigation menu folder
  menuFolders = "//div[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s' and contains(@class,'textLabel')]";

  // Collapse folder icon/button
  menuFolder = "//div[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']/preceding-sibling::div//*[local-name()='svg' and contains(@class,'expandIcon')]/parent::button[@aria-hidden='true']";

  // Toolbar icons
  toolbarIcons = "//button[@title='%s' and not(@disabled)]";

  // Generic text input field
  txtField = "//div[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']/ancestor::tr/following-sibling::tr//input[@seleniumid='%s']";

  // Text area field
  txtArea = "//div[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']/ancestor::tr/following-sibling::tr//textarea[@seleniumid='%s']";

  // Grid row
  gridRow = "//div[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']//ancestor::tr[contains(@class,'Grid')]";

  // Generic input field by seleniumid
  inputField = "//input[@seleniumid='%s']";

  // Tab inner button
  selectTab = "//div[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']/parent::div[contains(@class,'TabInner')]";

  // Last toolbar icon
  menubarIcons = "(//button[@seleniumid='%s' and not(@disabled)])[last()]";

  // Dropdown for "Type"
  typeDrp = "//div[normalize-space()='Type']//ancestor::tr/following-sibling::tr//div[@seleniumid='parameterTypeList']";

  // Dropdown value selector
  drpValue = "//td[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s' and contains(@class,'inforComboboxItem')]";

  // Checkbox
  checkbox = "//div[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']/ancestor::tr//button[@seleniumid='%s']";

  // Popup text buttons
  textButtons = "//button[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']";

  // Class-based text field
  textField = "//div[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']/ancestor::tr/following-sibling::tr//input[contains(@class,'%s')]";

  // Listbox-style dropdown
  dropdown = "//div[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']/ancestor::tr/following-sibling::tr//div[contains(@class,'listBox')]";

  // Radio button span
  radioBtn = "//td[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s']//span[contains(@class,'%s')]";

  // Drill-back dropdown button
  drillBacksDrp = "//div[normalize-space()='%s']/ancestor::td/following-sibling::td//div[contains(@class,'inforComboboxButton')]";

  // Widget element by title
  widgets = "//div[@title='%s']";

  // Canvas task container
  taskCanvas = "//div[contains(@class,'leftMargin20')]";

  // Decision input by index
  decision = "//div[contains(@class,'draggable dragdrop-handle')]/input[%s]";

  // Selenium-id text element
  text = "//*[translate(normalize-space(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='%s' and @seleniumid='%s']";
}

export default WorkflowsPage;