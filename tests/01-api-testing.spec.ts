import { test, expect } from '@playwright/test';
import tags from '../test-data/tags.json';

test.beforeEach(async ({ page }) => {
  await page.route('*/**/api/tags', async route => {
    route.fulfill({
      status: 200,
      body: JSON.stringify(tags),
    });
  });

    await page.route('*/**/api/articles*', async route => {
    const response = await route.fetch();
    const responseBody = await response.json();
    responseBody.articles[1].title = 'Welcome to Playwright';       // Assigning this title to the second article
    responseBody.articles[1].description = 'Playwright Automation';
    
    await route.fulfill({
      status: 200,
      body: JSON.stringify(responseBody)
    });
  });

  await page.goto('https://conduit.bondaracademy.com/');
  await page.waitForTimeout(500);  // Need to wait for mock api response in the browser


});


test('get started link', async ({ page }) => {
  await expect(page.locator('.navbar-brand')).toHaveText('conduit');
  await expect(page.locator('app-article-list h1').nth(1)).toContainText('Welcome to Playwright');
  await expect(page.locator('app-article-list p').nth(1)).toContainText('Playwright Automation');
});
