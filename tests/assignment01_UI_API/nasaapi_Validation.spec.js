import { test, expect } from '@playwright/test';
// import { LandingPage } from '../../pages/Assignment01/nasa_landingPage';
// import { DynamicLocators } from '../../pages/Assignment01/dynamicLocators';
import { apiHelper } from '../../Helper/apiHelper';
import { request } from 'node:http';

// Test case to validate NASA Images REST API - Search and fetch asset details
test('Scenario_01 - API - Search and fetch asset details (NASA Images REST API)', async ({ request }) => {

    const helper = new apiHelper(request);
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
});

// Test case to validate NASA Images REST API - Invalid search term and media type
test('Scenario_02 - Nasa - API Invalid response', async ({ request }) => {

    // Assert the response status code for invalid search term
    const helper = new apiHelper(request);
    const urlResult = await helper.searchAndFetchResults('INVALID_TERM', 'NAD+**', 1, 200);

    // Assert the response body contains expected data for invalid search term
    const urlResponseBody = await urlResult.json();
    const itemsCount = urlResponseBody.collection.items.length;
    expect(itemsCount).toBe(0);
    expect(urlResponseBody.collection.metadata.total_hits).toBe(0);
    console.log('Results on Invalid API call:', itemsCount);
});

// Test case to validate NASA Images REST API - Valid response using nasa_id
test('Scenario_03 - Nasa - API valid response using nasa_id', async ({ request }) => {

    // Assert the response status code for valid nasa_id
    const helper = new apiHelper(request);
    const urlResult = await helper.searchUsingAssetId('MSFC-201901185', 200);
    const urlResponseBody = await urlResult.json();

    // Assert the response body contains expected data for valid nasa_id
    const itemsCount = urlResponseBody.collection.items.length;
    console.log('No of downloadable URLs in collection_items_href:', itemsCount);
    expect(itemsCount).toBeGreaterThanOrEqual(1);

});