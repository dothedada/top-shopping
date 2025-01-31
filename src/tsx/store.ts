import { ProductData, FetchCategories, Categories } from './types/global';

export class Store {
  private items: ProductData[] = [];
  private categories!: Categories;
  private itemsIds: Set<number> = new Set();
  private static instance: Store | null = null;

  constructor() {
    if (Store.instance) {
      return Store.instance;
    }
    Store.instance = this;
    this.items = [];
    this.categories = new Set();
  }

  addCategories(categories: FetchCategories) {
    for (const category of categories) {
      this.categories.add(category);
    }
  }

  get allCategories() {
    return [...this.categories];
  }

  addItems(newItems: ProductData[]) {
    newItems.forEach((item) => {
      if (!this.itemsIds.has(item.id)) {
        this.itemsIds.add(item.id);
        this.items.push(item);
      }
    });
  }

  itemsFrom(category: string): ProductData[] {
    return this.items.filter((item) => item.category === category);
  }

  getRandomItemsIds(
    amount: number,
    categories: string[] = [],
    exclude: number = -1,
  ): number[] {
    let itemsPool: number[];
    const randomItems = new Set<number>();

    if (categories.length) {
      itemsPool = this.items.reduce<number[]>((items, current) => {
        for (const category of categories) {
          if (current.category !== category) {
            continue;
          }
          items.push(current.id);
        }
        return items;
      }, []);
    } else {
      itemsPool = this.items.map((item) => item.id);
    }

    while (amount > randomItems.size) {
      const randomIndex = Math.floor(Math.random() * itemsPool.length);
      if (randomIndex === exclude) {
        continue;
      }
      randomItems.add(itemsPool[randomIndex]);
    }

    if (!randomItems.size) {
      throw new Error('No items available');
    }

    if (randomItems.size < amount) {
      console.error('Not enough items to fulfill the requirement');
    }

    return [...randomItems];
  }

  getItem(id: number): ProductData | undefined {
    return this.items.find((item) => item.id === +id);
  }

  hasItem(id: number): boolean {
    return this.items.some((e) => e.id === id);
  }

  get allItems() {
    return this.items;
  }

  lookFor(input: string, coincidences: number = 5): ProductData[] {
    const regex = new RegExp(input, 'gi');
    return this.items
      .filter((item) => regex.test(item.title))
      .slice(0, coincidences);
  }

  reset() {
    this.items.length = 0;
    this.categories = new Set();
    this.itemsIds = new Set();
  }
}
