import { describe, it, vi, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { makeFetchUrl } from '../useFetch.tsx';

describe('makeFetchUrl:', () => {
    it('returns a string', () => {
        const data = makeFetchUrl('test');
        expect(typeof data === 'string').toBe(true);
    });
    // it('If no parameter is given, it returns an array of categories');
});
