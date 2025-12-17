import BaseClass from "../../testBase/BaseClass";

class WebMailPage extends BaseClass {

    constructor(page) {
        super();
        this.page = page;
    }

    // Iframes for homepages
    iframe = () => this.page.frameLocator("//iframe[contains(@name,'homepages')]");

    /* Useful Links Menu - Links */
    usefulLinksMenuV2 = async (menu) => {
        return await this.page.locator(
            `//div[contains(@class,'custom-menu')]//li[contains(@class,'item')][normalize-space()='${menu}']`
        )
    };

    login = async () => {
        return await this.page.locator(`//input[@name='login']`)
    };

    password = async () => {
        return await this.page.locator(`//input[@name='password']`)
    };

    signIn = async () => {
        return await this.page.locator(`//button[text()='Sign In']`)
    };

    logout = async () => {
        return await this.page.locator(`//span[contains(@class,'logout')]`)
    };

    search = async () => {
        return await this.page.locator(`//span[@class='search_block']//div[@class='field']`)
    };

    emailSubject = async (email) => {
        return await this.page.locator(`//div[contains(@class,'message_sub_list')]//div[contains(@class,'content')]//span[contains(@class,'subject')]//span[contains(normalize-space(),'${email}')]`)
    };

    
    download = async () => {
        return await this.page.locator(`//a[normalize-space()='Download']`)
    };

    usefulLinksMenu = async () => {
        return await (await this.iframe()).locator(`//a[normalize-space()='Download']`)
    };
}

export default WebMailPage