// https://github.com/kurmasz-SampleCode/CIS371-SampleCode/blob/master/react-blog-complete/features/support/steps.js
const { When, Then, AfterAll } = require('cucumber');
const { Builder, By } = require('selenium-webdriver');
const expect = require('expect');

let driver = new Builder().forBrowser('chrome').build();

When('I visit the home page', () => {
    return driver.get('http://localhost:3000/');
});

Then('I should see home page text', async() => {
    return driver.findElements(By.className('home-page-text')).then(async (elements) => {
        expect(elements.length).toBe(1);

        expect(await elements[0].getText()).toEqual('Hey there! Log in or sign up using the buttons in the top nav bar.');
    });
});

When('I visit the about page', () => {
    return driver.get('http://localhost:3000/about');
});

Then('I should see about page text', async() => {
    return driver.findElements(By.className('about-page-text')).then(async (elements) => {
        expect(elements.length).toBe(1);
    });
});

AfterAll(() => {
    if (driver !== null) {
      return driver.quit()
    }
});