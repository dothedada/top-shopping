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

  async resetStore() {
    this.items.length = 0;
    this.categories = new Set();
    this.itemsIds = new Set();
  }

  itemsFrom(category: string): ProductData[] {
    return this.items.filter((item) => item.category === category);
  }

  get allCategories() {
    return [...this.categories];
  }

  addCategories(categories: FetchCategories) {
    for (const category of categories) {
      this.categories.add(category);
    }
  }

  addItems(newItems: ProductData[]) {
    newItems.forEach((item) => {
      if (!this.itemsIds.has(item.id)) {
        this.itemsIds.add(item.id);
        this.items.push(item);
      }
    });
  }

  similarItemsIds(categories: string[], amount: number): number[] {
    const itemsAvailable = this.items.reduce<number[]>((items, current) => {
      for (const category of categories) {
        if (current.category !== category) {
          continue;
        }
        items.push(current.id);
      }
      return items;
    }, []);

    const itemsList =
      itemsAvailable.length > amount
        ? itemsAvailable
        : this.allItems.map((item) => item.id);

    while (itemsList.length > amount) {
      const remove = Math.floor(Math.random() * itemsList.length);
      itemsList.splice(remove, 1);
    }

    return itemsList;
  }

  get allItems() {
    return this.items;
  }

  getItem(id: number): ProductData | undefined {
    return this.items.find((item) => item.id === +id);
  }

  hasItem(id: number): boolean {
    return this.items.some((e) => e.id === id);
  }
}
