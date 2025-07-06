import BaseClass from "../../testBase/BaseClass";
import Homepages from "../../commons/pages/CommonPage";
import workSpacePage from "../../commons/pages/WorkSpacePage";
import WorkSpaces_Lbl from "../constants/elementLbls/WorkSpaces_Lbl";
import WorkSpaces_Id from "../constants/elementIds/WorkSpaces_Id";
import InforOsCommon from "./InforOsCommon";
import OSConfirmationMessages from "../constants/OSConfirmationMessages";
import { setBrowserZoom } from 'playwright-zoom';
import DocumentManagementPage from "../../commons/pages/DocumentManagementPage";

class AddWorkSpaces extends BaseClass{

    static async createWorkSpace(flag, ...parameters) {

        console.log(`=========>>>>> Create a work space Started <<<<<=========`);
        const homePg = new Homepages();
        const workSpacePg = new workSpacePage();

        await this.pause(9);
        await homePg.menuBar().click();

        await (await this.getLocator(homePg.addWorkSpace)).click();
        await this.pause(1);
        await (await this.getDynamicElement(workSpacePg.catalog, WorkSpaces_Lbl.NEW_WORKSPACE.toLowerCase(), WorkSpaces_Id.NEW_WORKSPACE)).click();
        await (await this.getDynamicElement(workSpacePg.toolbarBtn, WorkSpaces_Lbl.CONTINUE.toLowerCase(), WorkSpaces_Id.CONTINUE_WORKPSPACE)).click();

        const workspaceName = parameters[0].replace('%s', "03");
        await this.type(await this.getDynamicElement(workSpacePg.inputValues, WorkSpaces_Lbl.NAME_YOUR_WORKSPACE.toLowerCase(), WorkSpaces_Id.NAME_WORKSPACE), workspaceName);
        await (await this.getDynamicElement(workSpacePg.labelField, parameters[1].toLowerCase(), parameters[2])).click();
        await (await this.getDynamicElement(workSpacePg.toolbarBtn, WorkSpaces_Lbl.CONTINUE.toLowerCase(), WorkSpaces_Id.CONTINUE)).click();
        await (await this.getLocator(workSpacePg.workspaceIcons)).nth(3).click();
        await (await this.getDynamicElement(workSpacePg.toolbarBtn, WorkSpaces_Lbl.CREATE.toLowerCase(), WorkSpaces_Id.CREATE)).click();
        await InforOsCommon.validateConfirmationMessage(await this.getLocator(workSpacePg.popupMsg), await this.getLocator(workSpacePg.btnClose), OSConfirmationMessages.CREATED_WORKSPACE.replace('%s', workspaceName));
    
        console.log(`=========>>>>> Create a work space completed <<<<<=========`);
    }

    static async addBanner(flag, widgets) {
 
        const workSpacePg = new workSpacePage();
 
        await setBrowserZoom(this.page, 50);
 await this.pause(3);
        if (flag ==0) {
            await (await this.getDynamicElement(workSpacePg.widgetBtn, WorkSpaces_Lbl.ADD_BANNER_WIDGET)).click({ force: true });
 
        } else {
            await (await this.getDynamicElement(workSpacePg.toolbarIcons, WorkSpaces_Lbl.ADD_WIDGET.toLowerCase(), WorkSpaces_Id.ADD_WIDGET)).click();
        }
 
        for (let i = 0; i < widgets.length; i++) {
            await InforOsCommon.addWidgetsInOS(widgets[i]);
        }
 
        if (flag ==1) {
            await (await this.getDynamicElement(workSpacePg.closeBtn, WorkSpaces_Lbl.CLOSE_WIDGET_CATALOG)).click();
            await InforOsCommon.toolbarIcons(await this.getDynamicElement(workSpacePg.toolbarIcons, WorkSpaces_Lbl.SAVE.toLowerCase(), WorkSpaces_Id.SAVE_WIDGET));
        }
    }

    static async configureAlertListWidgets(workspaceCxt, widgetName) {

        const workSpacePg = new workSpacePage();
        for (let i = 1; i <= 3; i++) {
            
            await (await this.getDynamicElement(workSpacePg.widgetTitle, widgetName)).hover();
            await (await this.getDynamicElement(workSpacePg.ellipseIcon, widgetName.toLowerCase(), WorkSpaces_Id.ELLIPSE)).click();
            await (await this.getDynamicElement(workSpacePg.ellipseOptions, WorkSpaces_Id.CONFIGURE, WorkSpaces_Lbl.CONFIGURE)).click();
            await (await this.getLocator(workSpacePg.lockIcon)).click();
            await this.type(await this.getDynamicElement(workSpacePg.inputData, WorkSpaces_Lbl.TITLE.toLowerCase()), workspaceCxt.widgetTitles[i]);

            if (i != 1) {
                await this.type(await this.getDynamicElement(workSpacePg.inputField, WorkSpaces_Lbl.CATERGORY), workspaceCxt.catergory[i]);
            }

            await (await this.getDynamicElement(workSpacePg.button, WorkSpaces_Lbl.SAVE.toLowerCase())).click();
        }
    }

    static async configureIDMWidget(workspaceCxt, flag, val) {

        //Intializing the pages
        const workSpacePg = new workSpacePage();
        const docPg = new DocumentManagementPage();

        await (await this.getDynamicElement(workSpacePg.configBtn, workspaceCxt.widgets[0].toLowerCase(), WorkSpaces_Lbl.WIDGET_SETTINGS)).click();
        await (await this.getDynamicElement(workSpacePg.textBtn,  WorkSpaces_Lbl.CREATE_NEW)).click();
        await( await this.getDynamicElement(workSpacePg.hyperText, WorkSpaces_Lbl.SELECT_DOCUMENT_TYPE_DRP.toLowerCase(),WorkSpaces_Lbl.ADVANCED)).click();
        await( await this.getDynamicElement(workSpacePg.hyperLink, WorkSpaces_Lbl.IDM_CLIENT_LINK.toLowerCase())).click();
    
            await InforOsCommon.addWidgetsInOS(widgets[i]);
        
 
        if (flag == 1) {
            await (await this.getDynamicElement(workSpacePg.closeBtn, WorkSpaces_Lbl.CLOSE_WIDGET_CATALOG)).click();
            await (await this.getDynamicElement(workSpacePg.toolbarIcons, WorkSpaces_Lbl.SAVE.toLowerCase(), WorkSpaces_Id.SAVE_WIDGET)).click();
        }
    }

    static async configureBannerWidgets(workspaceContext,widget, configWidget, widgetName, flag) {
         const workSpacePg = new workSpacePage();

        console.log(`=========>>>>> Configure the Banner Widgets Started <<<<<=========`);

        await this.pause(2);

        // Click the "Configure Widget" icon for the provided widget
         await (await this.getDynamicElement(workSpacePg.configBtn, widget.toLowerCase(), configWidget)).click();

        if (flag === 0) {
             await this.pause(3);
             await (await this.getDynamicElement(workSpacePg.dropdown, WorkSpaces_Lbl.TIME_PERIOD_DRP)).click();
             await (await this.getDynamicElement(workSpacePg.selectValue, workspaceContext.timePeriod)).click();

             await (await this.getDynamicElement(workSpacePg.dropdown, WorkSpaces_Lbl.SUITE_NAME_DRP)).click();
             await (await this.getDynamicElement(workSpacePg.selectValue, workspaceContext.suiteName)).scrollIntoViewIfNeeded();
             await (await this.getDynamicElement(workSpacePg.selectValue, workspaceContext.suiteName)).click();

        } else {
             await (await this.getDynamicElement(workSpacePg.dropdown, WorkSpaces_Lbl.ALIGNMENT_DRP)).click();
             await this.pause(1);
             await (await this.getDynamicElement(workSpacePg.selectValue, workspaceContext.alignment)).click();

         await this.type(
             await this.getDynamicElement(workSpacePg.inputData, WorkSpaces_Lbl.IMAGE_URL.toLowerCase()),
             workspaceContext.imageURL[0]);
        
         await (await this.getDynamicElement(workSpacePg.workspace, WorkSpaces_Id.SAVE_SETTING)).click();

         await this.configureWebWidget(workspaceContext.widgetTitles[0],workspaceContext.imageURL[1],workspaceContext.launchURL);
		 }
   await this.pause(2);
  // Conditional Save check
  if (await this.isDynamicElementPresent(workSpacePg.actionMsg, WorkSpaces_Lbl.SAVE.toLowerCase())) {
    
    await (await this.getDynamicElement(workSpacePg.actionMsg, WorkSpaces_Lbl.SAVE.toLowerCase())).click();
  }

  console.log(`=========>>>>> Configure the Banner Widgets completed <<<<<=========`);
}

static async configureWebWidget(title, imageURL, launchUrl) {
  console.log("=========>>>>> Configure Web Widgets Started <<<<<=========");
  // initialize the page object
  const workSpacePg = new workSpacePage(); 

  // Click "Configure Widget" icon
  await (await this.getDynamicElement( workSpacePg.configBtn,WorkSpaces_Lbl.WEB_CONFIGURED.toLowerCase(),WorkSpaces_Lbl.CONFIGURE_WIDGET )).click();

  // Click the lock icon
  await (await this.getLocator(workSpacePg.lockIcon)).click();

  // Type into fields
  await this.type(await this.getDynamicElement(workSpacePg.inputData, WorkSpaces_Lbl.TITLE.toLowerCase()), title);
  
  await this.type( await this.getDynamicElement(workSpacePg.inputData, WorkSpaces_Lbl.URL.toLowerCase()),imageURL );

  await this.type( await this.getDynamicElement(workSpacePg.inputData, WorkSpaces_Lbl.LAUNCH_URL.toLowerCase()), launchUrl );

  // Click Save
  await (await this.getDynamicElement(workSpacePg.button, WorkSpaces_Lbl.SAVE.toLowerCase())).click();

  console.log("=========>>>>> Configure Web Widgets completed <<<<<=========");
}

}

export default AddWorkSpaces;