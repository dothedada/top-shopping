import { useOutletContext } from 'react-router-dom';
import { Cart } from '../cart';
import { ItemList, EmptyCart } from '../components/itemsInCart';
import { RelatedItems } from '../components/itemsInDisplay';

export default function MyCart() {
  const { cart } = useOutletContext<{ cart: Cart }>();

  if (cart === null) {
    return (
      <EmptyCart message="No se pudo cargar el carrito de compras, intentalo de nuevo más tarde" />
    );
  }

  const presentCategories = cart.getItems.reduce<Set<string>>(
    (present, current) => {
      present.add(current.category);
      return present;
    },
    new Set(),
  );

  return (
    <>
      <h2>Tu carrito</h2>
      {cart.isNotEmpty ? (
        cart.getItems.map((item) => <ItemList key={item.id} item={item} />)
      ) : (
        <EmptyCart message="Está vacío" />
      )}
      {cart.isNotEmpty && (
        <>
          <p>
            <strong>Total:</strong>
            {cart.totalCost.pay}
            <strong>Ahorraste:</strong>
            {cart.totalCost.savings}
          </p>
          <button type="button">Pagar</button>
        </>
      )}
      <RelatedItems presentCategories={[...presentCategories]} />
    </>
  );
}
