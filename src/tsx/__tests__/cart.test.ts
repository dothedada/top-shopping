import { describe, it, expect, beforeEach } from 'vitest';
import { Cart } from '../cart';
import { mockedItemsData } from './mockData';

describe('Cart behaviour', () => {
  let cart: Cart;
  beforeEach(() => {
    cart = new Cart(mockedItemsData);
  });

  it('Should mantain singleton instance', () => {
    const cartA = new Cart(mockedItemsData);
    const cartB = new Cart(mockedItemsData);

    expect(cartA).toEqual(cartB);
  });

  it('should return null when item is not in the cart', () => {
    expect(cart.getItemAmount('1')).toBeNull();
  });

  it('Should return correctly the number of items', () => {
    cart.addItem('1');

    expect(cart.getItemAmount('2')).toBeNull();
    expect(cart.getItemAmount('1')).toBe(1);
  });

  it('should add 1 item correctly to the specified item', () => {
    cart.addItem('1');
    cart.addItem('1');
    cart.addItem('2');
    cart.addItem('1');

    expect(cart.getItemAmount('1')).toBe(3);
    expect(cart.getItemAmount('2')).toBe(1);
    expect(cart.getItemAmount('3')).toBeNull();

    cart.addItem('2');

    expect(cart.getItemAmount('2')).toBe(2);
  });

  it('should throw error when adding products that does not exist in the inventory', () => {
    expect(() => cart.addItem('100')).toThrowError();
  });

  it('should set specific amounts', () => {
    cart.setItemAmount('3', 10);

    expect(cart.getItemAmount('3')).toBe(10);
  });

  it('should throw error when setting amounts of products that does not exist in the inventory', () => {
    expect(() => cart.setItemAmount('100', 10)).toThrowError();
  });

  it('should substract 1 item correctly to the specified item', () => {
    cart.setItemAmount('3', 10);

    expect(cart.getItemAmount('3')).toBe(10);

    cart.subItem('3');
    cart.subItem('3');
    cart.subItem('3');
    cart.subItem('3');

    expect(cart.getItemAmount('3')).toBe(6);
  });

  it('should delete from cart when substracting and item reach amount 0', () => {
    cart.setItemAmount('1', 1);

    cart.subItem('1');
    cart.subItem('1');
    expect(cart.getItemAmount('1')).toBeNull();
  });

  it('should calculate the total cost of an item correctly', () => {
    cart.setItemAmount('1', 3);

    expect(cart.itemTotalCost('1')).toBe(2319);
    expect(cart.itemTotalCost('2')).toBe(0);
  });

  it('should has a method to reset the cart', () => {
    cart.addItem('1');
    cart.addItem('1');
    cart.addItem('2');

    cart.reset();

    expect(cart.getItemAmount('1')).toBeNull();
    expect(cart.getItemAmount('2')).toBeNull();
  });

  it('should return the list of the object ids in the cart', () => {
    cart.addItem('1');
    cart.addItem('1');
    cart.addItem('2');
    cart.addItem('3');
    cart.deleteItem('3');

    expect(cart.itemsInCart()).toEqual(['1', '2']);
  });
});
