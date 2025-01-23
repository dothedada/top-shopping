import { useOutletContext } from 'react-router-dom';
import { Cart } from '../cart';
import { ItemList } from '../components/items';

export default function MyCart() {
  const { cart, setItemsInCart } = useOutletContext<{
    cart: Cart;
    setItemsInCart: (amount: number) => void;
  }>();

  const addOne = (id: number) => () => {
    cart.addItem(id);
    setItemsInCart(cart.getAmount(id) || 0);
  };

  return (
    <>
      {cart.hasItems
        ? cart.getItemsInCart.map((item) => (
            <ItemList
              key={item.id}
              item={item}
              addOne={addOne}
              substractOne={cart.subItem}
              remove={cart.deleteItem}
            />
          ))
        : 'No hay cosas en el carrito'}
    </>
  );
}
