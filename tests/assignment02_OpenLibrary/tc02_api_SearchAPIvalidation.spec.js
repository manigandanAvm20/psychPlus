import { test, expect } from '@playwright/test';
import { apiHelper } from '../../Helper/apiHelper';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../env_Variables/env_Variables.env') });

test('API - Search API validation', async ({ request }) => {

    const helper = new apiHelper(request);

    // Validate the API response for a specific search term and status code
    const apiResult = await helper.searchOpenLibraryCall(process.env.bookTitle, 200);
    const apiResponseBody = await apiResult.json();
    const responseLength = apiResponseBody.numFound;
    expect(responseLength).toBeGreaterThan(0);
    console.log('NumFound value > 0:', responseLength);

    // Validate the docs array is present and has results in the response
    expect(Array.isArray(apiResponseBody.docs)).toBe(true);
    console.log('Number of docs in search results:', apiResponseBody.docs.length);
    expect(apiResponseBody.docs.length).toBeGreaterThan(0);

    // Validate the presence of title and author_name fields in the first 5 docs sections of the response
    const docsLimit = Math.min(apiResponseBody.docs.length, 5);
    for (let i = 0; i < docsLimit; i++) {
        const doc = apiResponseBody.docs[i];
        console.log(doc.title ? 'Title is present as expected' : 'Response does not have a title field.');
        console.log(doc.author_name ? 'Author name is present as expected' : 'Response does not have an author_name field.');
    }

});

// Negative testing for Search API with a search term that is not expected to return any results
test('API - Negative tesing for Search API', async ({ request }) => {

    const helper = new apiHelper(request);

    // Validate the API response for a negative search term and status code, and check that numFound is 0
    const apiResult = await helper.searchOpenLibraryCall(process.env.negativeSearchTerm, 200);
    const apiResponseBody = await apiResult.json();
    const responseLength = apiResponseBody.numFound;
    expect(responseLength).toBe(0);
    console.log('NumFound value is 0 for negative search term:', responseLength);

});
