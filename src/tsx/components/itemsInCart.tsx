import { useOutletContext } from 'react-router-dom';
import { ProductData } from '../types/global';
import { Cart } from '../cart';
import { ItemInCartOperations } from './buttons';

export function ItemList({ item }: { item: ProductData }) {
  const { cart } = useOutletContext<{ cart: Cart }>();
  const amount = cart.getItemAmount(item.id) || 0;

  const discountPrice = Math.floor(item.price * (100 - item.discount) * 0.01);
  const itemSubtotal = cart.itemTotalCost(item.id).discount;

  return (
    <>
      <div>{item.brand}</div>
      <div>{amount}</div>
      <div>
        Antes: <del>{item.price}</del> Ahora: {discountPrice}
      </div>
      <div>{item.discount}%</div>
      <div>{item.category}</div>
      <ItemInCartOperations item={item} amount={amount} />
      <p>
        <strong>Subtotal: {itemSubtotal}</strong>
      </p>
    </>
  );
}

export const EmptyCart = ({ message }: { message: string }) => {
  return <div>{message}</div>;
};
