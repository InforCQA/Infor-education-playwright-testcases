import path from "path";
import Homepages from "../../commons/pages/CommonPage";
import BaseClass from "../../testBase/BaseClass";
import DocumentManagement_Id from "../constants/elementIds/DocumentManagement_Id";
import ElementAttributes from "../../commons/constants/ElementAttributes";
import Homepages_Lbl from "../constants/elementLbls/Homepages_Lbl";
import {expect} from '@playwright/test';

class BookMarks extends BaseClass {

    static async importBookmarks(docCxt) {

        // Intializing the pages
        const homePg = new Homepages();
        
        await homePg.menuBar().click();
        await (await this.getLocator(homePg.manageBookMarks)).click();
        await (await this.getLocator(homePg.ellipseIcon)).click();
        await (await this.getLocator(homePg.importBookMark)).click();
        await (await this.getLocator(homePg.fileUpload)).setInputFiles(path.join(docCxt.documentInfo.bookMarkPath));

        const uploadFile= await this.getDynamicElement(homePg.textFld, DocumentManagement_Id.FILE);
        expect(uploadFile).toHaveValue(docCxt.documentInfo.bookMark);
        
        await (await this.getLocator(homePg.okBtn)).click();
        await (await this.getDynamicElement(homePg.smartPanel, Homepages_Lbl.BACK)).click();
        await (await this.getLocator(homePg.appMenuV2)).click();
    }
}

export default BookMarks;