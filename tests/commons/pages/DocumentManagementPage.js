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

   searchDrp="//div[@id='search-dropdown']";
   advancedSearch= "//button[contains(@class,'advanced-search')]";
   documentTypeDrp="//label[normalize-space()='Document Type']/following-sibling::select";
   searchBtn="//button[@id='searchButton']";
   openDocumentDetails="//a[@queryparamshandling='merge']";
   download  = "//span[normalize-space()='Download']";
   tabList ="//a[contains(text(),'%s')]";
}

export default DocumentManagementPage;