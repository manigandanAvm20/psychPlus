import { expect } from '@playwright/test';
export class LandingPage {

    constructor(page) {
        this.page = page;
        this.searchBox = page.getByRole('textbox', { name: 'Search for ... (e.g. "Orion")' });
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.spinner = page.locator('xpath=//div[@class="search-preloader"]');
        this.imagesFilter = page.locator('xpath=//button[contains(@class,"mdc-evolution-chip")]//span[text()="Images"]');
        this.videosFilter = page.locator('xpath=//button[contains(@class,"mdc-evolution-chip")]//span[text()="Videos"]');
        this.audioFilter = page.locator('xpath=//button[contains(@class,"mdc-evolution-chip")]//span[text()="Audio"]');
        this.updateResultsButton = page.getByRole('button', { name: 'Update Results' });
        this.updateButton = page.getByRole('button', { name: 'Update' });
        this.imageLocator = page.locator('xpath=//div[@id="search-results_container"]//div[contains(@class,"image-asset")]');
        this.imageTitleLocator = page.locator('#details-info > div.details-title.notEmpty.ng-star-inserted');
        this.nasaIdLocator = page.locator('#details-nasa-id > span');
    }

    // Method to navigate to the NASA APOD page
    async navigateToUrl() {
        await this.page.goto('https://images.nasa.gov');
    }

    // Method to perform a search for a specific media type
    async SearchForMedia(mediaType) {
        await this.navigateToUrl();
        await this.searchBox.click();
        await this.searchBox.fill(mediaType);
        await this.submitButton.click();
        await this.handleSpinner();
    }

    // Method to select the media type and click on the update results button
    async selectMediaTypeAndClickUpdate(mediaType) {
        //Selecting the media type as Images and clicking on update results button
        if (mediaType === 'Images') {
            await this.videosFilter.click();
            await this.audioFilter.click();
        }
        else if (mediaType === 'Videos') {
            await this.imagesFilter.click();
            await this.audioFilter.click();
        }
        else if (mediaType === 'Audio') {
            await this.imagesFilter.click();
            await this.videosFilter.click();
        }

        const updateResultsButton = this.updateResultsButton;
        const updateButton = this.updateButton;
        if (await updateResultsButton.isVisible()) {
            await updateResultsButton.click();
        } else if (await updateButton.isVisible()) {
            console.log('Update Results button is not present');
            await this.updateButton.click();
        }
    }

    // Method to handle the spinner after performing an action
    async handleSpinner() {
        const spinner = this.spinner;
        if (await spinner.isVisible()) {
            console.log('Spinner is visible, waiting for it to disappear...');
            await expect(spinner).toBeHidden();
            console.log('Spinner is not visible anymore.');
        } else {
            console.log('Spinner was not visible, nothing to wait for.');
        }
    }

}