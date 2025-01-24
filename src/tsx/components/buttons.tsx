import { useOutletContext } from 'react-router-dom';
import { Cart } from '../cart';
import { ProductData } from '../types/global';
import { useEffect, useRef } from 'react';

export const CartBtn = ({ itemsInCart }: { itemsInCart: number }) => {
  return (
    <div>
      <span className="sr-only">icon</span>
      <span>{itemsInCart > 0 && itemsInCart}</span>
      <span>Ir al carrito de compras</span>
    </div>
  );
};

export const ItemInCartOperations = ({
  item,
  amount,
}: {
  item: ProductData;
  amount: number;
}) => {
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
  return (
    <>
      {amount > 0 ? (
        <>
          <button onClick={addOne}>+</button>
          <input type="number" min="1" onBlur={changeAmount} ref={amountRef} />
          <button onClick={substractOne} disabled={amount <= 1}>
            -
          </button>
          <button onClick={removeItem}>Quitar del carrito</button>
        </>
      ) : (
        <button onClick={addOne}>Añadir al carrito</button>
      )}
    </>
  );
};
