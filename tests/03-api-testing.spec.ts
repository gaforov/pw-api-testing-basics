import { test, expect } from '@playwright/test';

let userAccessToken: string;
let articleSlug: string;

test.describe.serial('Article Management', () => {
  // Setup before all tests in the group
  // test.beforeAll(async ({ request }) => {
  //   const loginResponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
  //     data: {
  //       user: { email: 'pw-test-said@test.com', password: 'Welcome123' }
  //     }
  //   });
  //   const loginResponseBody = await loginResponse.json();
  //   userAccessToken = loginResponseBody.user.token; // Store the user access token globally
  // });

  test('create an article', async ({ request }) => {
    const createArticleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles', {
      data: {
        article: {
          title: 'Dynamic Test Title',
          description: 'This is a dynamically generated test description.',
          body: 'This is a test body dynamically generated.',
          tagList: ['Test', 'dynamic']
        }
      }
    });

    const createResponseBody = await createArticleResponse.json();
    articleSlug = createResponseBody.article.slug; // Store the generated article slug
    expect(createArticleResponse.status()).toBe(201); // Validate the article was successfully created
  });

  test('delete the created article', async ({ request }) => {
    // Explanation: This test depends on the `create an article` test to provide the `articleSlug`.
    // The `articleSlug` is dynamically generated during the creation process and must be shared
    // between tests within the same test group. Running this test independently will fail because
    // `articleSlug` will not have been assigned.
    const deleteResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${articleSlug}`);
    expect(deleteResponse.status()).toBe(204); // Validate the article was successfully deleted
  });

});

test('delete independently', async ({ page }) => {
  await page.goto('https://conduit.bondaracademy.com/');

  // Login to the application  [These steps (login to app) moved to auth.setup.ts]
  // await page.getByText('Sign in').click();
  // await page.getByRole('textbox', { name: "Email" }).fill('pw-test-said@test.com');
  // await page.getByRole('textbox', { name: 'Password' }).fill('Welcome123');
  // await page.getByRole('button').click();

  // Create a new article
  const articleTitle = 'Playwright Automation Title';
  await page.waitForTimeout(500);
  await page.getByText('New Article').click();
  await page.getByPlaceholder('Article Title').fill(articleTitle);
  await page.getByPlaceholder("What's this article about?").fill('About the Playwright and Automation')
  await page.getByPlaceholder("Write your article (in markdown)").fill('This blog is about Playwright and Test Automation')
  await page.getByPlaceholder('Enter tags').fill('pw-test, testing, automation');
  await page.getByRole('button', { name: 'Publish Article' }).click();
  await page.waitForTimeout(500);

  await page.locator('.navbar-brand').click(); // Navigate to the home page

  // Navigate to the Global Feed page and delete the article
  await page.getByText('Global Feed').click();
  await page.getByText(articleTitle).click();
  await page.getByRole('button', { name: "Delete Article" }).first().click();

  await expect(page.locator('app-article-list h1').first()).not.toContainText('Dynamic Test Title');
});
