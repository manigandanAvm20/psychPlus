import { expect } from '@playwright/test';
export class apiHelper {
    constructor(request) {
        this.request = request;
    }

    async searchAndFetchResults(term, mediaType = 'image', page, code) {
        const baseUrl = 'https://images-api.nasa.gov';
        const url = await this.request.get(`${baseUrl}/search?q=${term}&media_type=${mediaType}&page=${page}`);
        expect(url.status()).toBe(code);
        return url;
    }

    async searchUsingAssetId(nasaId, code) {
        const baseUrl = 'https://images-api.nasa.gov';
        const url = await this.request.get(`${baseUrl}/asset/${nasaId}`);
        expect(url.status()).toBe(code);
        return url;
    }
}
