import { describe, it, vi, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { makeFetchUrl } from '../useFetch.tsx';

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
    it('returns a url without any category defined, at the end of the string, if no argument is passed', () => {
        const data = makeFetchUrl();

        expect(/category$/.test(data));
    });
});
