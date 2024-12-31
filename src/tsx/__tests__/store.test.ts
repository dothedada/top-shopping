import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Store } from '../store';
import { mockedCategoriesData, mockedItemsData } from './mockData';

const mockFetch = vi.fn();
globalThis.fetch = mockFetch;

beforeEach(() => {
    mockFetch.mockReset();
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

describe('Store as a singleton', () => {
    it('returns the same instace from multiple calls', () => {
        const instance1 = Store.create();
        const instance2 = Store.create();

        expect(instance1).toStrictEqual(instance2);
    });
    it('populate the categories qhen created', async () => {
        const store = await Store.create();
        expect(store.allCategories).toEqual(mockedCategoriesData);
        expect(store.allItems.length).toStrictEqual(5);
    });
});
