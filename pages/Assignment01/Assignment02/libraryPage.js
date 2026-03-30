import { expect } from '@playwright/test';

export class LibraryPage {
    constructor(page) {
        this.page = page;
        this.searchBox = page.getByRole('textbox', { name: 'Search' });
        this.searchButton = page.getByRole('button', { name: 'Search submit' });
        this.totalResultsBanner = page.locator('xpath=//div[@class="search-results-stats" and contains(text()," hits")]');
        this.resultsBanner = page.getByText('hits');
        this.bookResults = page.locator('xpath=//li[@class="searchResultItem sri--w-main"]');
        this.filterLoading = page.getByText('Loading...').first();
        this.filteredBanner = page.locator('#contentBody > div.section > span > div > ol-chip');
        this.uiBookTitle = page.locator('#searchResults > ul > li > div > div.details > div > h3 > a');
    }

    // Method to get the book title from the search results based on the index
    getBookTitle(index) {
        const bookTitle = this.page.locator(`#searchResults > ul > li:nth-child(${index}) > div > div.details > div > h3 > a`);
        return bookTitle.textContent();
    }

    // Method to get the author name from the search results based on the index
    getAuthorName(index) {
        const authorName = this.page.locator(`#searchResults > ul > li:nth-child(${index}) > div > div.details > span.bookauthor > a:nth-child(1)`);
        return authorName.textContent();
    }

    // Method to filter search results by author name and click on the filter
    async filterAuthorNameAndClick(authorName) {
        await this.page.locator(`xpath=//div//ol-chip[@title="Filter results for ${authorName}"]`).click();
        // await this.page.getByRole('link', { name: `${authorName}` }).click();
    }

    //
    async filterPublishYearAndClick(year) {
        await this.page.locator(`xpath=//div//ol-chip[@title="Filter results for ${year}"]`).click();
    }

    // Method to filter search results by subject and click on the filter
    async filterSubjectAndClick(subject) {
        await this.page.getByRole('link', { name: `'${subject}'` }).click();
    }

    // Method to check and print the book title and author name for the first 5 search results
    async checkTitleAndAuthorName() {
        for (let i = 1; i <= 5; i++) {
            const bookTitle = await this.getBookTitle(i);
            const authorName = await this.getAuthorName(i);
            console.log(await bookTitle ? `BookResult Title ${i}: ${bookTitle}` : 'Book title is empty');
            console.log(await authorName ? `BookResult Author ${i}: ${authorName}` : 'Author name is empty');
        }
    }

    // Method to get the count of search results from the total results banner
    async getSearchResultsCount() {
        await expect(this.totalResultsBanner).toBeVisible();
        const result = await this.totalResultsBanner.textContent();
        const split = result.split(' ');
        const bookResultsCount = split[6];
        return bookResultsCount;
    }

    // Method to perform search for a book title and wait for the results to load
    async performSearch(bookTitle) {
        await this.searchBox.click();
        await this.searchBox.fill(bookTitle);
        await this.searchButton.click();
        await expect(this.filterLoading).toBeHidden();
        await expect(this.totalResultsBanner).toBeVisible();
    }
}