import { useOutletContext } from 'react-router-dom';
import { ProductData } from '../types/global';
import { Cart } from '../cart';
import { ItemInCartOperations } from './buttons';

export function ItemList({ item }: { item: ProductData }) {
  const { cart } = useOutletContext<{ cart: Cart }>();
  const amount = cart.getItemAmount(item.id) || 0;

  const itemSubtotal = cart.itemTotalCost(item.id).discount;

  const title =
    item.title.slice(0, item.title.length > 30 ? 30 : item.title.length) +
    '...';

  const unitPrice =
    item.discount > 5
      ? Math.floor(item.price * (100 - item.discount) * 0.01)
      : item.price;

  return (
    <div className="cart__items">
      <div>{title}</div>
      <div>${unitPrice}</div>
      {item.discount > 5 && <div>{item.discount}% OFF</div>}
      <div>
        {amount} unit{amount > 1 ? 's' : ''}
      </div>
      <ItemInCartOperations item={item} amount={amount} />
      <p>
        <strong>${itemSubtotal}</strong>
      </p>
    </div>
  );
}

export const EmptyCart = ({ message }: { message: string }) => {
  return <div>{message}</div>;
};
