import { expect, Locator, Page } from '@playwright/test';

export class ProductPage {
    // Locators
    public readonly productsButton: Locator;
    public readonly allProdsText: Locator;
    public readonly productList: Locator;
    public readonly productItem: Locator;
    public readonly productName: Locator;
    public readonly productCategory: Locator;
    public readonly productPrice: Locator;
    public readonly productAvailability: Locator;
    public readonly productCondition: Locator;
    public readonly productBrand: Locator;
    public readonly productDetailImage: Locator;

    constructor(public readonly page: Page) {
        this.productsButton = page.locator('a[href="/products"]');
        this.allProdsText = page.getByText('All Products');
        this.productList = page.locator('.features_items');
        this.productItem = page.locator('.product-image-wrapper');
        this.productName = page.locator('.product-information h2');
        this.productCategory = page.locator('.product-information p').first();
        this.productPrice = page.locator('.product-information span span');
        this.productAvailability = page.locator('.product-information p').nth(1);
        this.productCondition = page.locator('.product-information p').nth(2);
        this.productBrand = page.locator('.product-information p').nth(3);
        this.productDetailImage = page.locator('.view-product')
    }

    async clickProductsButton() {
        await this.productsButton.click();
    }

    async verifyProductsPage() {
        await this.page.waitForURL("**/products");
        await expect(this.page).toHaveURL(/.*\/products/);
        await expect(this.allProdsText).toBeVisible();
        await expect(this.allProdsText).toHaveText('All Products');
    }

    /**
     * Click on a product by its ID.
     * @param productId The ID of the product to click on.
     * @param index The index of the product to click on (0-based).
     */

    async clickProductById(productId: number): Promise<void> {
        await this.page.locator(`a[href='/product_details/${productId}']`).click();
    }

    async clickProductByIndex(index: number): Promise<void> {
        await this.page.locator(".product-image-wrapper a[href*='product_details']").nth(index).click();
    }

    async verifyProductListVisible() {
        await expect(this.productList).toBeVisible();
        await expect(this.productItem.first()).toBeVisible();
    }

    async verifyProductDetailsPage(productId: number): Promise<void> {
        await this.page.waitForURL(`**/product_details/${productId}`);
        await expect(this.page).toHaveURL(/.*\/product_details\/.*/);
        await expect(this.productDetailImage).toBeVisible();
    }

    async verifyProductDetailsContent(): Promise<void> {
        await expect(this.productName).toBeVisible();
        await expect(this.productCategory).toBeVisible();
        await expect(this.productPrice).toBeVisible();
        await expect(this.productAvailability).toBeVisible();
        await expect(this.productCondition).toBeVisible();
        await expect(this.productBrand).toBeVisible();
    }
}