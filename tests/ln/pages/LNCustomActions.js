import ElementAttributes from "../../commons/constants/ElementAttributes";
import BaseClass from "../../testBase/BaseClass";
import { expect } from "@playwright/test";

class LNCustomActions extends BaseClass{

    async triggerInputField(inputLocator, data) {
        
        const parentLocator = await inputLocator.locator('xpath=./parent::div');

        // Sometimes needs a second click to ensure focus
        await expect(async () => {
            if (!(await parentLocator.getAttribute(ElementAttributes.CLASS)).includes('TriggerInputField-focus')) {
            
            await inputLocator.waitFor({ state: 'visible', timeout: 10000 });
             await this.page.waitForTimeout(2000);
            await parentLocator.click({ force: true});
        }
        }).toPass({ timeout: 10000 });
       
        // Wait until parent gets "focus" class
        await expect(async () => {
            await expect(parentLocator).toHaveClass(/.*focus/, { timeout: 3000 });
        }).toPass({ timeout: 10000 });
        

        // Clear, type and tab out
        await inputLocator.type(data);
        
        await this.page.keyboard.press('Tab');
    }

}

export default LNCustomActions;