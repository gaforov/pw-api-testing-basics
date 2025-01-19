import { test, expect } from '@playwright/test';

test('create an article', async ({ page, request }) => {
    await page.goto('https://conduit.bondaracademy.com/');

    const articleTitle = 'Playwright Automation Title';

    // Login to the application [These steps moved to auth.setup.ts]
    // await page.getByText('Sign in').click();
    // await page.getByRole('textbox', { name: "Email" }).fill('pw-test-said@test.com');
    // await page.getByRole('textbox', { name: 'Password' }).fill('Welcome123');
    // await page.getByRole('button').click();

    // Create a new article
    await page.getByText('New Article').click();
    await page.getByPlaceholder('Article Title').fill(articleTitle);
    await page.getByPlaceholder("What's this article about?").fill('About the Playwright and Automation')
    await page.getByPlaceholder("Write your article (in markdown)").fill('This blog is about Playwright and Test Automation')
    await page.getByPlaceholder('Enter tags').fill('pw-test, testing, automation');
    await page.getByRole('button', { name: 'Publish Article' }).click();

    // Retrieve slug (unique identifier) from the newly created article
    const createArticleResponse = await page.waitForResponse('https://conduit-api.bondaracademy.com/api/articles/');
    const createResponseBody = await createArticleResponse.json();
    const articleSlug = createResponseBody.article.slug;

    await expect(page.locator('.banner h1')).toHaveText(articleTitle);  // Validate the article was successfully created

    
    // Delete the newly created article
    const deleteResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${articleSlug}`);

    expect(deleteResponse.status()).toBe(204); // Validate the article was successfully deleted

});
