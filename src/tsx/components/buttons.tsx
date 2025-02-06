import { useOutletContext } from 'react-router-dom';
import { Cart } from '../cart';
import { ProductData } from '../types/global';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export function CartBtn({ itemsInCart }: { itemsInCart: number }) {
  return (
    <Link to={'/cart/'}>
      <span className="sr-only">Go to cart</span>
      <span className="material-symbols-outlined" aria-hidden="true">
        shopping_cart
      </span>
      {itemsInCart > 0 && (
        <>
          {itemsInCart}
          <span className="sr-only">Items in cart</span>
        </>
      )}
    </Link>
  );
}

export function Price({
  item,
  className = '',
}: {
  item: ProductData;
  className: string;
}) {
  const discountPrice = Math.floor(item.price * (100 - item.discount) * 0.01);
  return (
    <div className={className}>
      {item.discount > 0 ? (
        <>
          <del>${item.price}</del>
          <br />
          {item.discount}% OFF
          <br />
          <span className="price">${discountPrice}</span>
        </>
      ) : (
        <span className="price">${item.price}</span>
      )}
    </div>
  );
}

export function ItemInCartOperations({
  item,
  amount = 0,
}: {
  item: ProductData;
  amount: number;
}) {
  const amountRef = useRef<HTMLInputElement>(null);
  const { cart, setItemsInCart } = useOutletContext<{
    cart: Cart;
    setItemsInCart: (amount: number) => void;
  }>();

  useEffect(() => {
    if (amountRef.current) {
      amountRef.current.value = amount.toString();
    }
  }, [amount]);

  const addOne = () => {
    cart.addItem(item.id);
    setItemsInCart(cart.totalItems);
  };

  const changeAmount = () => {
    cart.setItemAmount(item.id, +(amountRef.current?.value ?? 0));
    setItemsInCart(cart.totalItems);
  };

  const substractOne = () => {
    cart.substractItem(item.id);
    setItemsInCart(cart.totalItems);
  };

  const removeItem = () => {
    cart.deleteItem(item.id);
    setItemsInCart(cart.totalItems);
  };

  return (
    <>
      {amount > 0 ? (
        <>
          <button className="buy__edit" onClick={addOne}>
            <span className="sr-only">add one to my cart</span>
            <span aria-hidden="true">+</span>
          </button>
          <input
            className="buy__input"
            type="number"
            min="1"
            max="20"
            onBlur={changeAmount}
            ref={amountRef}
          />
          {amount === 1 ? (
            <button className="buy__edit" onClick={removeItem}>
              Remove from cart
            </button>
          ) : (
            <button className="buy__edit" onClick={substractOne}>
              <span className="sr-only">remove one from my cart</span>
              <span aria-hidden="true">-</span>
            </button>
          )}
        </>
      ) : (
        <button className="buy" onClick={addOne}>
          add to cart
        </button>
      )}
    </>
  );
}
