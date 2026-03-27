import { expect } from '@playwright/test';
export class DynamicLocators {

    constructor(page) {
        this.page = page;
        this.imageToSelect = page.locator('xpath=//div[@id="search-results_container"]//div[contains(@class,"image-asset")]');
    }

    // Method to hover on the image to be selected based on the index
    async hoverAndClickOnImageToBeSelected(number) {
        await expect(this.imageToSelect.first()).toBeVisible();
        if (await this.imageToSelect.first().isVisible()) {
            console.log('Search results are visible, hovering on the image to be selected...');
        }
        const hoverImage = await this.imageToSelect.nth(number - 1);
        await hoverImage.hover();
        await expect(this.imageToSelect.first()).toBeVisible();
        const clickImage = this.imageToSelect.nth(number - 1)
        await clickImage.click();
    }

    // // Method to click on the image to be selected based on the index
    // async clickOnImageToBeSelected(number) {

    // }
}
