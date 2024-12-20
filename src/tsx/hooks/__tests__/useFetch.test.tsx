import { describe, it, vi, expect, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
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
    beforeEach(() => {
        mockFetch.mockReset();
    });

    const mockedItemsData = [
        {
            id: '1',
            title: 'Sony WH-1000XM3 Bluetooth Wireless Over Ear Headphones with Mic (Silver)',
            image: 'https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692947383286-714WUJlhbLS._SL1500_.jpg',
            price: 773,
            description: 'Digital noise cancelling : Industry leading Active',
            brand: 'Sony',
            Color: 'silver',
            Category: 'audio',
            discount: 0,
        },
        {
            id: '2',
            title: 'Bose QuietComfort 35 II Wireless Bluetooth Headphones with Mic (Black)',
            image: 'https://example.com/bose-quietcomfort.jpg',
            price: 349,
            description:
                'Noise-cancelling Bluetooth headphones with up to 20 hours of battery life',
            brand: 'Bose',
            Color: 'black',
            Category: 'audio',
            discount: 10,
        },
        {
            id: '3',
            title: 'Sennheiser Momentum 3 Wireless Noise Cancelling Headphones (Silver)',
            image: 'https://example.com/sennheiser-momentum.jpg',
            price: 399,
            description:
                'Premium sound and noise-cancelling technology with 17-hour battery life',
            brand: 'Sennheiser',
            Color: 'silver',
            Category: 'audio',
            discount: 5,
        },
    ];

    const mockedCategoriesData = [
        'electronics',
        'jewelery',
        "men's clothing",
        "women's clothing",
    ];

    it('Takes a string and returns an object with onLoad, onError and data keys', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockedItemsData,
        });

        const { result } = renderHook(() => useFetch(makeFetchUrl()));
        const fetchResponse = ['data', 'loaded', 'onError'];

        for (const key of fetchResponse) {
            await waitFor(() => {
                expect(key in result.current).toBe(true);
            });
        }
    });

    it('sends a request with AbortController enabled', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockedItemsData,
        });
        const { result } = renderHook(() => useFetch(makeFetchUrl()));

        await waitFor(() => {
            expect(result.current.loaded).toBe(true);
        });

        expect(mockFetch).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({
                signal: expect.any(AbortSignal),
            }),
        );
    });

    it('sends a request with CORS enabled', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockedItemsData,
        });
        const { result } = renderHook(() => useFetch(makeFetchUrl()));

        await waitFor(() => {
            expect(result.current.loaded).toBe(true);
        });

        expect(mockFetch).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({
                mode: 'cors',
            }),
        );
    });

    it('change the value of onLoad from false to true once the fetch is done', async () => {
        for (let i = 0; i < 5; i++) {
            mockFetch.mockResolvedValueOnce({
                ok: Boolean(Math.floor(Math.random() * 2)),
                json: async () => ({}),
            });

            const { result } = renderHook(() => useFetch(makeFetchUrl()));
            expect(result.current.loaded).toBe(false);

            await waitFor(() => {
                expect(result.current.loaded).toBe(true);
            });
        }
    });

    it('returns onError = [true, "Error <code>: <message>"] if response not ok', async () => {
        const commonFetchErrors = [
            [400, 'Bad Request...'],
            [401, 'Unauthorized...'],
            [403, 'Forbidden...'],
            [404, 'Not Found...'],
            [500, 'Internal Server Error...'],
        ];

        for (const [errorCode, errorMsg] of commonFetchErrors) {
            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: errorCode,
                json: async () => ({ errors: errorMsg }),
            });

            const { result } = renderHook(() => useFetch(makeFetchUrl()));

            expect(result.current.onError).toBe(null);

            await waitFor(() => {
                expect(result.current.onError).not.toBe(null);
            });

            if (result.current.onError) {
                const [isError, message] = result.current.onError;
                expect(isError).toBe(true);
                const messageRegex = new RegExp(
                    `Error ${errorCode}: ${errorMsg}`,
                    'g',
                );
                expect(messageRegex.test(message)).toBe(true);
            }
        }
    });

    it('returns an array if useFetcher is 200 and has no arrguments', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockedCategoriesData,
        });
        const { result } = renderHook(() => useFetch(makeFetchUrl()));

        expect(result.current.data).toBe(null);

        await waitFor(() => {
            expect(result.current.data).not.toBe(null);
        });

        expect(result.current.data).toStrictEqual(mockedCategoriesData);
    });

    it('returns an array of product objects if useFetcher is 200 and has arguments', async () => {
        const cardKeys = [
            'id',
            'title',
            'price',
            'description',
            'image',
            'category',
        ];

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockedItemsData,
        });

        const { result } = renderHook(() => useFetch(makeFetchUrl('mobile')));
        expect(result.current.data).toBe(null);

        await waitFor(() => {
            expect(result.current.data).not.toBe(null);
        });

        for (const key of cardKeys) {
            expect(key in result.current.data[0]).toBe(true);
        }
    });
});
