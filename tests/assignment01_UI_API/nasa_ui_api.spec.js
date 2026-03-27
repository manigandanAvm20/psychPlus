import { test, expect } from '@playwright/test';
import { LandingPage } from '../../pages/Assignment01/nasa_landingPage';
import { DynamicLocators } from '../../pages/Assignment01/dynamicLocators';

test('NASA - UI & API Validation', async ({ page, context }) => {

    const landingPage = new LandingPage(page);
    const dynamicLocators = new DynamicLocators(page);

    await context.tracing.start({
        screenshots: true,
        snapshots: true,
        sources: true
    });

    // Navigate to the NASA APOD page
    await landingPage.navigateToUrl();
    //Performing search for the media type
    await landingPage.SearchForMedia('Moon');
    // await landingPage.searchBox.click();
    // await landingPage.searchBox.fill('Moon');
    // await landingPage.submitButton.click();
    // await landingPage.handleSpinner();

    //Selecting the media type as Images and clicking on update results button
    await landingPage.selectMediaTypeAndClickUpdate('Images');

    //Verifying the search results are displayed and the count of images is greater than 5
    await expect(landingPage.imageLocator.nth(0)).toBeVisible();
    const imageCount = await landingPage.imageLocator.count();
    console.log('Number of images found:', imageCount);
    expect(await imageCount).toBeGreaterThan(5);

    //Selecting the image from the search results and verifying the details page 
    await dynamicLocators.hoverAndClickOnImageToBeSelected(1);
    // await dynamicLocators.clickOnImageToBeSelected(1);
    await landingPage.handleSpinner();
    // await page.pause();
    //Verifying the Image title and NASA ID on the details page
    await expect(landingPage.imageTitleLocator).toBeVisible();
    if(landingPage.imageTitleLocator.isVisible()) {
        console.log('Image title is visible');
    }
    const imageTitle = await landingPage.imageTitleLocator.textContent();
    console.log('Image Title:', imageTitle);
    await expect(landingPage.nasaIdLocator).toBeVisible();
    const nasaTitle = await landingPage.nasaIdLocator.textContent();
    console.log('NASA ID:', nasaTitle);

    await context.tracing.stop({ path: 'test-trace.zip' });



});