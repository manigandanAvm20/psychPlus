import { test, expect } from '@playwright/test';
import { LandingPage } from '../../pages/Assignment01/nasa_landingPage';
import { DynamicLocators } from '../../pages/Assignment01/dynamicLocators';
import { apiHelper } from '../../Helper/apiHelper';

// Test case to validate NASA Images REST API - Search and fetch asset details
test('Integrated - API to UI consistency', async ({ request, page, context }) => {

    const helper = new apiHelper(request);
    const landingPage = new LandingPage(page);
    const dynamicLocators = new DynamicLocators(page);
    const urlResult = await helper.searchAndFetchResults('TERM', 'image', 1, 200);

    // Assert the response body contains expected data
    const urlResponseBody = await urlResult.json();
    const itemsCount = urlResponseBody.collection.items.length;
    console.log('Number of items in the response collection:', itemsCount);
    expect(itemsCount).toBeGreaterThan(5);

    // Extract Title and NASA ID details from the response
    const mediaTitle = urlResponseBody.collection.items[0].data[0].title;
    console.log('Media Title:', mediaTitle);
    const mediaNasaId = urlResponseBody.collection.items[0].data[0].nasa_id;
    console.log('Media NASA ID:', mediaNasaId);

    // Start tracing to capture screenshots, snapshots, and sources during the UI interactions(Optional)
        await context.tracing.start({
        screenshots: true,
        snapshots: true,
        sources: true
    });

    // Navigate to the NASA APOD page
    await landingPage.navigateToUrl();

    //Performing search for the media type
    await landingPage.SearchForMedia(mediaNasaId);

    //Selecting the image from the search results and verifying the details page 
    await dynamicLocators.hoverAndClickOnImageToBeSelected(1);
    await landingPage.handleSpinner();

    //Verifying the Image title and NASA ID on the details page
    await expect(landingPage.imageTitleLocator).toBeVisible();
    if (landingPage.imageTitleLocator.isVisible()) {
        console.log('Image title is visible');
    }
    const uiImageTitle = await landingPage.imageTitleLocator.textContent();
    await expect(landingPage.nasaIdLocator).toBeVisible();
    const uiNasaTitle = await landingPage.nasaIdLocator.textContent();

    //verifying the API response details with the UI details
    expect(uiImageTitle.trim()).toStrictEqual(mediaTitle.trim());
    expect(uiNasaTitle.trim()).toStrictEqual(mediaNasaId.trim());
    console.log('API and UI details are consistent for the selected media item');

    // Capture screenshot of the details page
    await page.screenshot({ path: 'UI_API_Validation.png', fullPage: true });

    // Stop tracing and save the trace file
    await context.tracing.stop({ path: 'UI_Api_Trace.zip' });

});