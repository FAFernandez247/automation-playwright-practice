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
    public readonly searchBox: Locator;
    public readonly searchButton: Locator;
    public readonly searchedProdsText: Locator;
    public readonly searchedProductItem: Locator;
    public readonly productToAdd: Locator;
    public readonly addToCartButton: Locator;
    public readonly modal: Locator;
    public readonly continueShoppingButton: Locator;
    public readonly viewCartButton: Locator;

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
        this.productDetailImage = page.locator('.view-product');
        this.searchBox = page.locator('#search_product');
        this.searchButton = page.locator('#submit_search');
        this.searchedProdsText = page.getByText('Searched Products');
        // Searched product item can also be used as all products container
        this.searchedProductItem = page.locator('.features_items .product-image-wrapper');
        // this.productToAdd = this.searchedProductItem.nth(0);
        // this.addToCartButton = page.locator('.product-overlay .add-to-cart');
        this.modal = page.locator("#cartModal");
        this.continueShoppingButton = page.locator('button', { hasText: "Continue Shopping" });
        this.viewCartButton = page.locator('a', { hasText: "View Cart" });

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
     * @param productName The name of the product to search for.
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

    async searchProduct(productName: string): Promise<void> {
        await this.searchBox.fill(productName);
        await this.searchButton.click();
    }

    async verifySearchedProducts(){
        await expect(this.searchedProdsText).toBeVisible();
        await expect(this.searchedProdsText).toHaveText('Searched Products');
    }

    async verifySearchedProductListVisible() {
        const count = await this.searchedProductItem.count();
        expect(count).toBeGreaterThan(0); // at least one product shows up
        for (let i = 0; i < count; i++) {
            await expect(this.searchedProductItem.nth(i)).toBeVisible();
        }
    }

    async addProductToCart(productId: number): Promise<void> {
        const productCard = this.page.locator(`.product-image-wrapper:has(a[data-product-id="${productId}"])`);
        // Hover over the product card
        await productCard.hover();

        // Click the Add to Cart button inside that card (use first() to pick visible one)
        await productCard.locator(`a[data-product-id="${productId}"]`).first().click();
        await expect(this.modal).toBeVisible();
    }

    // async hoverOverProduct(index: number = 0): Promise<void> {
    //     await this.searchedProductItem.nth(index).hover();
    //     await this.searchedProductItem.nth(index).locator(this.addToCartButton).click();
    //     await expect(this.modal).toBeVisible();
    // }

    async clickContinueShoppingButton() {
        await this.continueShoppingButton.click();
        await expect(this.modal).toBeHidden();
    }

    async clickViewCartButton() {
        await this.viewCartButton.click();
        await expect(this.modal).toBeHidden();
    }
}