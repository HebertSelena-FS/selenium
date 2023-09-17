const { Builder, By, Key, until } = require('selenium-webdriver');
require('dotenv').config();

describe('', () => {
    let driver;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();
    });

    afterAll(async () => {
        await driver.quit();
    });

    const setDelay = async () => {
        await driver.sleep(2000);
    };

    it('As a user I want to open localhost:3000', async () => {
        await driver.get(process.env.url);
        await driver.getTitle().then((title) => {
            expect(title).toEqual('Home');
        });
        await setDelay();
    });

    it('As a user I want to open the contact page', async () => {
        await driver.get(`${process.env.url}/contact`); // Assuming your contact page URL is '/contact'
        await driver.getTitle().then((title) => {
            expect(title).toEqual('Contact Us');
        });
        await setDelay();
    });

    it('As a user I want to navigate to the contact page when I click the link', async () => {
        await driver.get(process.env.url);
        await driver.findElement(By.id('contactLink')).click();
        await driver.getTitle().then((title) => {
        expect(title).toEqual('Contact Us');
        });
        await setDelay();
    });

    it('As a user I want to get more info by adding my name and clicking the button', async () => {
        await driver.get(`${process.env.url}/contact`);
      
        const nameInput = await driver.findElement(By.id('formInput'));
        const submitButton = await driver.findElement(By.id('formSubmit'));
      
        const testName = 'Selena Hebert';
        await nameInput.sendKeys(testName);
        await submitButton.click();
      
        const formMessage = await driver.findElement(By.id('formMessage'));
        const messageText = await formMessage.getText();
      
        // Verify the message content
        const expectedMessage = `More info coming to ${testName}`;
        expect(messageText).toEqual(expectedMessage);
      
        await setDelay();
      });
});
