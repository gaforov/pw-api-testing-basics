import {test as setup} from '@playwright/test';
import user from '../.auth/user.json';
import fs from 'fs';

const authFile = '.auth/user.json';  // path where authentication file will be saved to.

setup('Authentication', async ({page, request}) => {
    // await page.goto('https://conduit.bondaracademy.com/');
    // await page.getByText('Sign in').click();
    // await page.getByRole('textbox', { name: "Email" }).fill('pw-test-said@test.com');
    // await page.getByRole('textbox', { name: 'Password' }).fill('Welcome123');
    // await page.getByRole('button').click();
    // await page.waitForResponse('https://conduit-api.bondaracademy.com/api/tags');

    // await page.context().storageState({ path: authFile });

    // Store the user access token globally, authentication via API 
    const loginResponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: {
          user: { email: 'pw-test-said@test.com', password: 'Welcome123' }
        }
      });
      const loginResponseBody = await loginResponse.json();
      const userAccessToken = loginResponseBody.user.token;
      user.origins[0].localStorage[0].value = userAccessToken;
      fs.writeFileSync(authFile, JSON.stringify(user));

      process.env.USER_ACCESS_TOKEN = userAccessToken;
    //   process.env['USER_ACCESS_TOKEN'] = userAccessToken; // this approach works too

    /* Which syntax to use and when:
        process.env.MY-VAR = 'value'; // SyntaxError: Unexpected token '-'
        process.env['MY-VAR'] = 'value'; // Works fine
        process.env.MY_VAR = 'value'; // Works fine as well
    */
});