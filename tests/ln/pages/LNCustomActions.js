import BaseClass from "../../testBase/BaseClass";

class LNCustomActions extends BaseClass{

    async triggerInputField(inputLocator, data) {
        
        const parentLocator = await inputLocator.locator('xpath=./parent::div');

        // Wait until input is clickable and click it
        await inputLocator.waitFor({ state: 'visible', timeout: 10000 });
        await inputLocator.click();

        // Sometimes needs a second click to ensure focus
        if (!(await parentLocator.getAttribute('class')).includes('TriggerInputField-focus')) {
            await inputLocator.click();
        }

        // Wait until parent gets "focus" class
        await expect(parentLocator).toHaveClass(/.*focus/, { timeout: 60000 });

        // Clear, type and tab out
        await this.type(inputLocator, data);
        
        await this.page.keyboard.press('Tab');
    }

}

export default LNCustomActions;