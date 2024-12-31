import { describe, it, vi, expect, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useFetch } from '../useFetch.tsx';
import { makeFetchUrl } from '../../fetcher.ts';
import { ProductData } from '../../types/global';
import {
    mockedItemsData,
    mockedCategoriesData,
    commonFetchErrors,
} from '../../__tests__/mockData.ts';

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

        if (!result.current.data) {
            expect(result.current.data).toBeDefined();
            return;
        }

        for (const element of result.current.data) {
            for (const key of cardKeys) {
                expect(key in (element as ProductData)).toBe(true);
            }
        }
    });
});
