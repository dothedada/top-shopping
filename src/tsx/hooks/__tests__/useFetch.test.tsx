import { describe, it, vi, expect, expectTypeOf } from 'vitest';
import { renderHook } from '@testing-library/react';
import { makeFetchUrl, useFetch } from '../useFetch.tsx';

const mockFetch = vi.fn();
globalThis.fetch = mockFetch;

describe('makeFetchUrl:', () => {
    it('returns a string', () => {
        const data = makeFetchUrl();

        expect(typeof data === 'string').toBe(true);
    });

    it('returns a url with the category param if an argument is passed to it', () => {
        const argument = 'test';
        const argumentRegex = new RegExp(argument, 'g');
        const data = makeFetchUrl(argument);

        expect(argumentRegex.test(data)).toBe(true);
    });
    it('returns a url with category at the end of the string if no argument is passed', () => {
        const data = makeFetchUrl();

        expect(/category$/.test(data));
    });
});

describe('useFetch:', () => {
    const mockedItemData = {
        id: '1',
        title: 'Sony WH-1000XM3 Bluetooth Wireless Over Ear Headphones with Mic (Silver)',
        image: 'https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692947383286-714WUJlhbLS._SL1500_.jpg',
        price: 773,
        description: 'Digital noise cancelling : Industry leading Active',
        brand: 'Sony',
        Color: 'silver',
        Category: 'audio',
        discount: 0,
    };

    const mockedCategoriesData = [
        'electronics',
        'jewelery',
        "men's clothing",
        "women's clothing",
    ];

    it('Takes a string and returns an object with onLoad, onError and data keys', () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockedItemData,
        });

        const data = useFetch(makeFetchUrl());
        const fetchResponse = ['data', 'onLoad', 'onError'];

        for (const key of fetchResponse) {
            expect(key in data).toBe(true);
        }
    });

    it('sets the value of onLoad from false to true once the fetch is done', () => {
        //
    });
});
