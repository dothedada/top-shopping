import { useOutletContext } from 'react-router-dom';
import { Cart } from '../cart';
import { ItemList, EmptyCart } from '../components/itemsInCart';
import { Store } from '../store';
import { ItemCard } from '../components/itemsInDisplay';
import { ProductData } from '../types/global';

export default function MyCart() {
  const { store, cart, setItemsInCart } = useOutletContext<{
    store: Store;
    cart: Cart;
    setItemsInCart: (amount: number) => void;
  }>();

  if (cart === null) {
    return (
      <EmptyCart message="No se pudo cargar el carrito de compras, intentalo de nuevo más tarde" />
    );
  }

  const presentCategories = cart.getItemsInCart.reduce<Set<string>>(
    (present, current) => {
      present.add(current.category);
      return present;
    },
    new Set(),
  );

  const addBtn = (id: number): void => {
    cart.addItem(id);
    setItemsInCart(cart.totalItems);
  };

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
      <h3>Tal vez te pueda interezar... </h3>
      {store.similarItemsIds([...presentCategories], 5).map((itemId) => {
        const item = store.getItem(itemId) as ProductData;
        return <ItemCard key={itemId} addBtn={addBtn} item={item} />;
      })}
    </>
  );
}
