import { test, expect } from '@playwright/test';
import { apiHelper } from '../../Helper/apiHelper';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../env_Variables/env_Variables.env') });

test('API - Filter or sort check validation', async ({ request }) => {

    const helper = new apiHelper(request);

    // Validate the API response for a specific search term and status code
    const apiSearchResult = await helper.searchOpenLibraryCall(process.env.bookTitle, 200);
    const apiSearchResponse = await apiSearchResult.json();
    const apiActualResponseLimit = apiSearchResponse.docs.length;
    expect(apiActualResponseLimit).toBeGreaterThan(0);

    // Validate the API response for the specific book title, author key, author name, and year
    const apiFilteredResult = await helper.apiToUiValidation(process.env.bookTitle, process.env.authorKey, process.env.authorName, process.env.year, 200);
    const apiResponseBody = await apiFilteredResult.json();
    const apiFilteredResponseLimit = apiResponseBody.docs.length;

    // Validate that the response limit for the filtered API response is different from the actual API response
    expect(apiActualResponseLimit).not.toEqual(apiFilteredResponseLimit);

});
