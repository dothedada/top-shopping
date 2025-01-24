import { useOutletContext } from 'react-router-dom';
import { Cart } from '../cart';
import { ItemList, EmptyCart } from '../components/itemsInCart';

export default function MyCart() {
  const { cart } = useOutletContext<{ cart: Cart }>();

  if (cart === null) {
    return (
      <EmptyCart message="No se pudo cargar el carrito de compras, intentalo de nuevo más tarde" />
    );
  }

  return (
    <>
      <h2>Tu carrito</h2>
      {cart.hasItems ? (
        cart.getItemsInCart.map((item) => (
          <ItemList key={item.id} item={item} />
        ))
      ) : (
        <EmptyCart message="Está vacío" />
      )}
      {cart.hasItems && (
        <p>
          <strong>Total:</strong>
          {cart.totalCost.pay}
          <strong>Ahorraste:</strong>
          {cart.totalCost.savings}
        </p>
      )}
    </>
  );
}
