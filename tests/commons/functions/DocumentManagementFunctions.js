import BaseClass from '../../testBase/BaseClass.js';
import ElementAttributes from '../constants/ElementAttributes.js';
import DocumentManagementPage from '../pages/DocumentManagementPage.js';
import commons from '../constants/Commons.js';
import DocumentManagementLbl from '../constants/elementLbls/DocumentManagement_Lbl.js';
import CloudSuite from './CloudSuite.js';
import {setBrowserZoom} from 'playwright-zoom';

class DocumentManagementFunctions extends BaseClass{
  
  static async documentCourseFiles(docType, searchBy) {

    // Intializing the page
    const docPg = new DocumentManagementPage();
    const iframe = docPg.iframe();

    await setBrowserZoom(this.page, 70);

    // Click advanced search if closed
    if ((await (await this.getElementWithIframe(iframe, docPg.searchDrp)).getAttribute(ElementAttributes.CLASS))?.includes(commons.CLOSED)) {
      await (await this.getElementWithIframe(iframe, docPg.advancedSearch)).click();
    }

    // Select document type
    await this.selectFromDropdown(
      await this.getElementWithIframe(iframe, docPg.documentTypeDrp),
      docType
    );

    // Click search
    await (await this.getElementWithIframe(iframe, docPg.searchBtn)).click();
    await this.pause(1);

    // Find and click the matching document
    const documentRows = await this.getElementWithIframe(iframe, docPg.openDocumentDetails);
    for (let i = 0; i < await documentRows.count(); i++) {
      const text = (await documentRows.nth(i).textContent())?.trim();
      if (text === searchBy) {
        await documentRows.nth(i).click();
        break;
      }
    }

    // Click download and original format
    await (await this.getElementWithIframe(iframe, docPg.download)).click();
    await (await this.getDynamicElementWithIframe(iframe, docPg.tabList, DocumentManagementLbl.ORIGINAL_FORMAT)).click();

    CloudSuite.closeActiveWorkspace();
  }
}

export default DocumentManagementFunctions;