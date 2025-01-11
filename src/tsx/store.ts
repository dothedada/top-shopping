import { fetcher, makeFetchUrl } from './dataFetcher';
import { ProductData, ProductCategories } from './types/global';

export class Store {
    private items: ProductData[] = [];
    private categories: ProductCategories = [];
    private static instance: Store | null = null;

    static async create() {
        if (Store.instance) {
            return Store.instance;
        }
        const store = new Store();
        await store.updateCategories();
        await store.populateStore();
        Store.instance = store;
        return store;
    }

    private async populateStore() {
        try {
            const controller = new AbortController();
            const { data, onError } = await fetcher(
                makeFetchUrl('', 5),
                controller,
            );
            if (onError?.[0]) {
                throw onError[1];
            }
            this.items = data as ProductData[];
        } catch (err) {
            alert(err);
        }
    }

    async updateCategories() {
        try {
            const controller = new AbortController();
            const { data, onError } = await fetcher(makeFetchUrl(), controller);
            if (onError?.[0] === true) {
                throw onError[1];
            }
            this.categories = data as ProductCategories;
        } catch (err) {
            console.log('123error');
            alert(err);
        }
    }

    async loadNewItems(category: string, amount: number) {
        try {
            const controller = new AbortController();
            const { data, onError } = await fetcher(
                makeFetchUrl(category, amount),
                controller,
            );
            if (onError?.[0]) {
                throw onError[1];
            }
            this.items = data as ProductData[];
        } catch (err) {
            alert(err);
        }
    }

    async resetStore() {
        this.items.length = 0;
        this.categories.length = 0;
        await this.updateCategories();
        await this.populateStore();
    }

    itemsFrom(category: string): ProductData[] {
        return this.items.filter((item) => item.category === category);
    }

    get allCategories() {
        return this.categories;
    }

    get allItems() {
        return this.items;
    }
}
