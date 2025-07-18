import BaseClass from "../../testBase/BaseClass";
import LNPage from "../pages/LNPage";

class LNSessionTabActions extends BaseClass{

    //To close the Tab in LN
    static async closeTab(tabName) {


        const lnPg = new LNPage(this.page);

        // Right-click on the tab
       const currentTab= await (await lnPg.currentTab(tabName));
       await(currentTab).click({ button: 'right' });

       const closeTab= await (await lnPg.closeTab());

       closeTab.waitFor({ state: 'visible', timeout: 5000 });
        // Click on the 'Close Tab' option
       await(closeTab).click({ force: true });
    }
}

export default LNSessionTabActions;