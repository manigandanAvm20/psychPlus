import { test, expect } from '@playwright/test';
import { LibraryPage } from '../../pages/Assignment01/Assignment02/libraryPage';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../env_Variables/env_Variables.env') });

test.beforeEach(async ({ page }) => {
    // Navigate to the Open Library homepage before each test
    await page.goto(process.env.baseUrl);
});

test('UI - Search results validation', async ({ page }) => {
    
    const libraryPage = new LibraryPage(page);

    // Perform search and validate the search results
    await libraryPage.performSearch(process.env.bookTitle);
    
    // Validate that the search results returns a minimum of 5 results
    const bookResultsCount = await libraryPage.bookResults.count();
    console.log(`Total search results: ${bookResultsCount}`);
    expect(bookResultsCount).toBeGreaterThan(5);

    // Validate that the book title and author name are displayed for the first 5 search results
    await libraryPage.checkTitleAndAuthorName();
});

test('Filter check on UI', async ({ page }) => {

    const libraryPage = new LibraryPage(page);

    // Perform search and validate the search results
    await libraryPage.performSearch(process.env.bookTitle);

    // Get the initial search results count before applying any filters
    const bookResultsCount = await libraryPage.getSearchResultsCount();

    // Apply filter for author name and validate the filtered results
    await libraryPage.filterAuthorNameAndClick(process.env.authorName);
    await expect(libraryPage.filteredBanner).toHaveText(process.env.authorName);
    const filteredResultsCount = await libraryPage.getSearchResultsCount();

    // Validate that the filtered results count doesn't match the initial search results count
    expect(bookResultsCount).not.toEqual(filteredResultsCount);
    console.log('Filter Results changed as expected');

});

test.afterEach(async ({ page }) => {
    // Perform any necessary cleanup after each test
    await page.close();
});
