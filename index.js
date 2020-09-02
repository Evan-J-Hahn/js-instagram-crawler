require('dotenv').config();
const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	await page.goto('https://www.instagram.com');

	await page.waitForSelector('input');

	const inputs = await page.$$('input');
	await inputs[0].type(process.env.INSTA_USERNAME);
	await inputs[1].type(process.env.INSTA_PW);

	const loginButton = (await page.$$('button'))[1];
	loginButton.click();

	// xpath variation
	// const loginButton = await page.$x('//*[@id="loginForm"]/div/div[3]/button');
	// await loginButton[0].click();

	await page.waitForNavigation();
	const notNowButton = (await page.$$('button'))[1];
	notNowButton.click();

	await page.waitForNavigation();
	const notNow2 = await page.$x(
		'/html/body/div[4]/div/div/div/div[3]/button[2]'
	);
	await notNow2[0].click();

	const USERNAME = 'snkhunt';
	await page.goto(`https://www.instagram.com/${USERNAME}`);

	await (await page.$('article a')).click();
	await page.waitFor(1000);
	await (await page.$$('button'))[5].click();

	// await browser.close();
})();
