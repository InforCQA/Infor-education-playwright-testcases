import BaseClass from '../../testBase/BaseClass.js';

class Homepages extends BaseClass {

   constructor() {
    super();
    this.page = BaseClass.page;
  }

  username = () => this.page.locator("//input[@name='username']");
  password = () => this.page.locator("//input[@name='pass']");
  submit = () => this.page.locator("//span[text()='Sign in']");
  menuBar = () => this.page.locator("//*[contains(@id,'nav-launcher')]");

  appNameV2 = "//*[local-name()='ids-text'][normalize-space()='%s']";

  seeMore = "//*[local-name()='ids-text'][normalize-space()='%s']/ancestor::*/following-sibling::div//*[local-name()='ids-text'][normalize-space()='See more']";

  addWorkSpace = "//*[local-name()='ids-button'][contains(@id,'add-workspace')]";
}

export default Homepages;