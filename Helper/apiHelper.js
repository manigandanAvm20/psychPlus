import { expect } from '@playwright/test';
export class apiHelper {
    constructor(request) {
        this.request = request;
    }

    // Method to perform a search API call with the specified term, media type, page number, and expected status code
    async searchAndFetchResults(term, mediaType = 'image', page, code) {
        const baseUrl = 'https://images-api.nasa.gov';
        const url = await this.request.get(`${baseUrl}/search?q=${term}&media_type=${mediaType}&page=${page}`);
        expect(url.status()).toBe(code);
        return url;
    }

    // Method to perform a search API call with the specified term and expected status code
    async searchUsingAssetId(nasaId, code) {
        const baseUrl = 'https://images-api.nasa.gov';
        const url = await this.request.get(`${baseUrl}/asset/${nasaId}`);
        expect(url.status()).toBe(code);
        return url;
    }

    // Method to perform a search API call with the specified term and expected status code
    async searchOpenLibraryCall(bookTitle, code) {
        const url = await this.request.get(`https://openlibrary.org/search.json?q=${bookTitle}`);
        expect(url.status()).toBe(code);
        return url;
    }

    // Method to perform a search API call with the specified book title, author key, author name, year, and expected status code
    async apiToUiValidation(bookTitle, authorKey, authorName, year, code) {
        const filterUrl = await this.request.get(`https://openlibrary.org/search.json?q=${bookTitle}&author_key=${authorKey}&author_name=${authorName}&first_publish_year=${year}`);
        expect(filterUrl.status()).toBe(code);
        return filterUrl;
    }

}
