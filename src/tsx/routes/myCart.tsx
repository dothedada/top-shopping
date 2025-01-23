import { useOutletContext } from 'react-router-dom';
import { Cart } from '../cart';
import { ItemList } from '../components/items';

export default function MyCart() {
  const { cart, setItemsInCart } = useOutletContext<{
    cart: Cart;
    setItemsInCart: (amount: number) => void;
  }>();

  const addOne = (id: number) => {
    cart.addItem(id);
    setItemsInCart(cart.totalItems);
  };

  const changeAmount = (id: number, amount: number) => {
    cart.setAmount(id, amount);
    setItemsInCart(cart.totalItems);
  };

  const substractOne = (id: number) => {
    cart.subItem(id);
    setItemsInCart(cart.totalItems);
  };

  const removeItem = (id: number) => {
    cart.deleteItem(id);
    setItemsInCart(cart.totalItems);
  };

  return (
    <>
      {cart.hasItems
        ? cart.getItemsInCart.map((item) => (
            <ItemList
              key={item.id}
              item={item}
              amount={cart.getAmount(item.id) || 0}
              addOne={addOne}
              changeAmount={changeAmount}
              substractOne={substractOne}
              removeItem={removeItem}
            />
          ))
        : 'No hay cosas en el carrito'}
    </>
  );
}
