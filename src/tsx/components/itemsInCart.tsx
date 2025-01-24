import { useOutletContext } from 'react-router-dom';
import { ProductData } from '../types/global';
import { useEffect, useRef } from 'react';
import { Cart } from '../cart';

export const ItemList = ({ item }: { item: ProductData }) => {
  const amountRef = useRef<HTMLInputElement>(null);
  const { cart, setItemsInCart } = useOutletContext<{
    cart: Cart;
    setItemsInCart: (amount: number) => void;
  }>();
  const amount = cart.getAmount(item.id) || 0;

  const addOne = () => {
    cart.addItem(item.id);
    setItemsInCart(cart.totalItems);
  };

  const changeAmount = () => {
    cart.setAmount(item.id, +(amountRef.current?.value ?? 0));
    setItemsInCart(cart.totalItems);
  };

  const substractOne = () => {
    cart.subItem(item.id);
    setItemsInCart(cart.totalItems);
  };

  const removeItem = () => {
    cart.deleteItem(item.id);
    setItemsInCart(cart.totalItems);
  };

  useEffect(() => {
    if (amountRef.current) {
      amountRef.current.value = amount.toString();
    }
  }, [amount]);

  const discountPrice = Math.floor(item.price * (100 - item.discount) * 0.01);
  const itemSubtotal = cart.itemSubTotal(item.id).discount;

  return (
    <>
      <div>{item.brand}</div>
      <div>{amount}</div>
      <div>
        Antes: <del>{item.price}</del> Ahora: {discountPrice}
      </div>
      <div>{item.discount}%</div>
      <div>{item.category}</div>
      <button onPointerDown={addOne}>+</button>
      <input type="number" onBlur={changeAmount} ref={amountRef} />
      <button onPointerDown={substractOne}>-</button>
      <button onPointerDown={removeItem}>Quitar del carrito</button>

      <p>
        <strong>Subtotal: {itemSubtotal}</strong>
      </p>
    </>
  );
};

export const EmptyCart = ({ message }: { message: string }) => {
  return <div>{message}</div>;
};
