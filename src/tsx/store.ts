import { ProductData, ProductCategories } from './types/global';

export class Store {
    private items: ProductData[];
    private categories: ProductCategories;

    constructor() {
        this.items = [];
        this.categories = [];
    }

    get allCategories() {
        return this.categories;
    }
    get allItems() {
        return this.items;
    }
}
