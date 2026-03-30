import { test, expect } from '@playwright/test';
import { apiHelper } from '../../Helper/apiHelper';
import { LibraryPage } from '../../pages/Assignment01/Assignment02/libraryPage';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../env_Variables/env_Variables.env') });

test('API - API to UI validation', async ({ request, page }) => {

    const helper = new apiHelper(request);
    const libraryPage = new LibraryPage(page);

    // Validate the API response for the specific book title, author key, author name, and year
    const apiResult = await helper.apiToUiValidation(process.env.bookTitle, process.env.authorKey, process.env.authorName, process.env.year, 200);
    const apiResponseBody = await apiResult.json();
    const matchTitleAPI = apiResponseBody.docs[0].title;
    const apiResponseLength = apiResponseBody.docs.length;
    expect(apiResponseLength).toBe(1);

    //UI validation
    await page.goto(process.env.baseUrl);

    // Perform search and filter results based on the API response values
    await libraryPage.performSearch(process.env.bookTitle);
    await libraryPage.filterAuthorNameAndClick(process.env.filterAuthorName);
    await libraryPage.filterPublishYearAndClick(process.env.year);

    // Validate that the search results count is greater than 0 after applying filters
    const bookResultsCount = await libraryPage.bookResults.count();
    expect(bookResultsCount).toBeGreaterThan(0);
    const matchTitleUI = await libraryPage.uiBookTitle.textContent();

    // Validate that the book title and search results count from the UI matches with the API response
    expect(matchTitleUI.trim()).toEqual(matchTitleAPI.trim());
    expect(apiResponseLength).toEqual(bookResultsCount);

});