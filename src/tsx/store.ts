import { ProductData, ProductCategories } from './types/global';

export class Store {
  private items: ProductData[] = [];
  private categories: ProductCategories = [];
  private itemsIds: Set<number> = new Set();
  private static instance: Store | null = null;

  constructor() {
    if (Store.instance) {
      return Store.instance;
    }
    Store.instance = this;
    this.items = [];
    this.categories = [];
  }

  async resetStore() {
    this.items.length = 0;
    this.categories.length = 0;
    this.itemsIds = new Set();
  }

  itemsFrom(category: string): ProductData[] {
    return this.items.filter((item) => item.category === category);
  }

  get allCategories() {
    return this.categories;
  }

  addCategories(categories: ProductCategories) {
    this.categories.push(...categories);
  }
  addItems(newItems: ProductData[]) {
    newItems.forEach((item) => {
      if (!this.itemsIds.has(item.id)) {
        this.itemsIds.add(item.id);
        this.items.push(item);
      }
    });
  }

  get allItems() {
    return this.items;
  }

  getItem(id: string): ProductData | undefined {
    return this.items.find((item) => item.id === +id);
  }

  hasItem(id: string): boolean {
    return this.items.some((e) => e.id === id);
  }
}
