import LNPage from "../pages/LNPage";

class LNSessionTabActions {

    //To close the Tab in LN
    static async closeTab(tabName) {


        const lnPg = new LNPage();

        // Right-click on the tab
        await lnPg.currentTab(tabName).click({ button: 'right' });

        // Click on the 'Close Tab' option
        await lnPg.closeTab.click({ force: true });
    }
}

export default LNSessionTabActions;