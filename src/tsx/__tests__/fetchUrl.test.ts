import { describe, it, expect } from 'vitest';
import { makeFetchUrl } from '../dataFetcher';

describe('makeFetchUrl:', () => {
  it('returns a string', () => {
    const data = makeFetchUrl();
    expect(typeof data === 'string').toBe(true);
  });

  it('returns a url with the category argument if it is passed', () => {
    const argument = 'test';
    const argumentRegex = new RegExp(argument, 'g');
    const data = makeFetchUrl(argument);

    expect(argumentRegex.test(data)).toBe(true);
  });
  it('returns a url with the category and the ammount of products', () => {
    const argument = 'test';
    const argumentRegex = new RegExp(argument, 'g');
    const ammount = '5';
    const ammountRegex = new RegExp(ammount, 'g');

    const data = makeFetchUrl('test', 5);

    expect(argumentRegex.test(data)).toBe(true);
    expect(ammountRegex.test(data)).toBe(true);
  });
  it('returns a url with the ammount of products and no type if only the ammount is passed', () => {
    const ammount = '5';
    const ammountRegex = new RegExp(ammount, 'g');

    const data = makeFetchUrl('', 5);

    expect(ammountRegex.test(data)).toBe(true);
    expect(/type/.test(data)).toBe(false);
  });
  it('returns a url with category at the end of the string if no argument is passed', () => {
    const data = makeFetchUrl();

    expect(/category$/.test(data));
  });
});
