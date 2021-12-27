import * as puppeteer from "puppeteer";
jest.setTimeout(60000);

describe("Добавление товара в корзину", () => {
    let page;
    let browser;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 200,
        });
        page = await browser.newPage();
        await page.goto(
            "https://metallprofil.ru/shop/catalog/krovlya/metallocherepitsa/metallocherepitsa-mp-monterrey-pe01101404--312200/"
        );
        const productLength = await page.$('[id="product-length"]');
        await productLength.type("2");
        const productQuantity = await page.$('[id="product-quantity"]');
        await productQuantity.type("10");
        const [addToCartButton] = await page.$x('//a[contains(., "Купить")]');
        await addToCartButton.click();

        await page.goto("https://metallprofil.ru/shop/personal/cart/");
    });

    afterAll(async () => {
        await browser.close();
    });

    test("цена должна рассчитываться корректно", async () => {
        const [lengthPlusButton] = await page.$x(
            '//input[@name="length[]"]//preceding-sibling::div[1]'
        );
        await lengthPlusButton.click();
        await page.waitFor(2000);
        const valueLength = await page.$('[name="length[]"]');
        const lengthNumber = await page.evaluate(el => el.getAttribute('value'), valueLength);
        const valueQuantity = await page.$('[name="quantity[]"]');
        const quantityNumber = await page.evaluate(el => el.getAttribute('value'), valueQuantity);

        expect(Math.round(Number(lengthNumber) * 1.19 * Number(quantityNumber) * 435)).toBe(15529);
    });
});
