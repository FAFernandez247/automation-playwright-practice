import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
    // Locators
    public readonly cartTable: Locator;
    public readonly cartRow: Locator;
    public readonly cartProductName: Locator;
    public readonly cartProductPrice: Locator;
    public readonly cartProductQuantity: Locator;
    public readonly cartProductTotal: Locator;

    constructor(public readonly page: Page) {
        this.cartTable = page.locator('#cart_info');
        this.cartRow = page.locator('#cart_info tbody tr');
        this.cartProductName = page.locator('.cart_product');
        this.cartProductPrice = page.locator('.cart_price');
        this.cartProductQuantity = page.locator('.cart_quantity');
        this.cartProductTotal = page.locator('.cart_total');
    }

    getProductRow(productId: number): Locator {
         return this.page.locator(`#product-${productId}`);
    }

    async verifyProductsAddedToCart(productId: number) {
        await expect(this.cartTable).toBeVisible();
        const row = this.getProductRow(productId);
        const productCount = await row.count();
        expect(productCount).toBeGreaterThan(0);
        await expect(row.locator('.cart_product')).toBeVisible();
        await expect(row.locator('.cart_price')).toBeVisible();
        await expect(row.locator('.cart_quantity')).toBeVisible();
        await expect(row.locator('.cart_total')).toBeVisible();
    }

    async verifyPriceQuantityTotal(productId: number) {
        const row = this.getProductRow(productId);

        // Get values
        const priceText = (await row.locator('.cart_price').innerText()).trim();
        const quantityText = (await row.locator('.cart_quantity').innerText()).trim();
        const totalText = (await row.locator('.cart_total').innerText()).trim();

        // Remove whitespace and text formatting
        const price = parseFloat(priceText.replace(/[^0-9.-]+/g, ""));
        const quantity = parseInt(quantityText.replace(/\D/g, ''), 10);
        const total = parseFloat(totalText.replace(/[^0-9.-]+/g, ""));

        await expect(row.locator('.cart_price')).toHaveText(priceText);
        await expect(row.locator('.cart_quantity')).toHaveText(quantityText);
        await expect(row.locator('.cart_total')).toHaveText(totalText);

        // Check
        expect(price).toBeGreaterThan(0);
        expect(quantity).toBeGreaterThan(0);
        expect(total).toBe(price * quantity);
    }
}