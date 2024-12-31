import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Store } from '../store';
import { mockedCategoriesData, mockedItemsData } from './mockData';

const mockFetch = vi.fn();
const mockAlert = vi.fn();
globalThis.fetch = mockFetch;
globalThis.alert = mockAlert;

describe('Store', () => {
    let store: Store;

    beforeEach(() => {
        mockFetch.mockReset();
        mockAlert.mockReset();

        mockFetch.mockImplementation(async (url: string) => {
            if (url.includes('?type') || /[0-9]$/.test(url)) {
                const match = url.match(/[0-9]+/);
                const amount = match ? +match[0] : mockedItemsData.length;
                return {
                    ok: true,
                    json: async () => mockedItemsData.slice(0, amount),
                };
            } else if (/category$/.test(url)) {
                return {
                    ok: true,
                    json: async () => mockedCategoriesData,
                };
            }
        });
    });

    describe('Singleton Pattern', () => {
        it('returns the same instance from multiple calls', async () => {
            const instance1 = await Store.create();
            const instance2 = await Store.create();
            expect(instance1).toBe(instance2);
        });

        it('initializes with categories and items on creation', async () => {
            store = await Store.create();
            expect(store.allCategories).toEqual(mockedCategoriesData);
            expect(store.allItems.length).toBe(5);
        });
    });

    describe('Store Operations', () => {
        beforeEach(async () => {
            store = await Store.create();
        });

        it('loads new items by category', async () => {
            await store.loadNewItems('electronics', 3);
            expect(store.allItems.length).toBe(3);
            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining('electronics'),
                expect.any(Object),
            );
        });

        it('filters items by category', async () => {
            const category = mockedItemsData[0].category;
            const itemsInCategory = store.itemsFrom(category);
            expect(
                itemsInCategory.every((item) => item.category === category),
            ).toBe(true);
        });

        it('resets store state', async () => {
            await store.resetStore();
            expect(mockFetch).toHaveBeenCalledTimes(2); // Categories and items
            expect(store.allCategories).toEqual(mockedCategoriesData);
            expect(store.allItems.length).toBe(5);
        });
    });

    describe('AbortController', () => {
        it('aborts fetch requests when controller signals', async () => {
            mockFetch.mockImplementationOnce(
                async (url: string, options: RequestInit) => {
                    options.signal?.addEventListener('abort', () => {
                        throw new Error('AbortError');
                    });
                    options.signal?.dispatchEvent(new Event('abort'));
                    return {};
                },
            );

            await store.loadNewItems('electronics', 3);
            expect(mockAlert).toHaveBeenCalled();
        });
    });

    describe('Data Consistency', () => {
        it('maintains data types for categories', async () => {
            store = await Store.create();
            expect(Array.isArray(store.allCategories)).toBe(true);
            store.allCategories.forEach((category) => {
                expect(typeof category).toBe('string');
            });
        });

        it('maintains data types for items', async () => {
            store = await Store.create();
            expect(Array.isArray(store.allItems)).toBe(true);
            store.allItems.forEach((item) => {
                expect(item).toHaveProperty('id');
                expect(item).toHaveProperty('category');
                expect(item).toHaveProperty('title');
                expect(item).toHaveProperty('price');
            });
        });
    });
});
