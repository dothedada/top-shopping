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
      {cart.isNotEmpty ? (
        cart.getItems.map((item) => <ItemList key={item.id} item={item} />)
      ) : (
        <EmptyCart message="Your cart is empty" />
      )}
      {cart.isNotEmpty && (
        <div className="cart__total">
          <p className="cart__price">
            Total
            <strong> ${cart.totalCost.pay}</strong>
          </p>
          <p className="cart__savings">
            you will save
            <strong> ${cart.totalCost.savings}</strong>
          </p>
          <button type="button">Checkout</button>
        </div>
      )}
      <RelatedItems presentCategories={[...presentCategories]} id={-1} />
    </>
  );
}
