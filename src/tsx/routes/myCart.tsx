import { useOutletContext } from 'react-router-dom';
import { Cart } from '../cart';
import { ItemList } from '../components/items';

export default function MyCart() {
  const { cart } = useOutletContext<{ cart: Cart }>();

  return (
    <>
      {cart.hasItems
        ? cart.getItemsInCart.map((item) => <ItemList item={item} />)
        : 'No hay cosas en el carrito'}
    </>
  );
}
