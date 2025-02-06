import { Link, useOutletContext } from 'react-router-dom';
import { ProductData } from '../types/global';
import { Store } from '../store';
import { ItemInCartOperations } from './buttons';
import { useRef } from 'react';
import { Cart } from '../cart';

export function ItemCard({ item }: { item: ProductData }) {
  const { cart } = useOutletContext<{ cart: Cart }>();
  if (!item) {
    throw new Error(`No item data for: ${item}`);
  }
  const itemName =
    item.title.slice(0, item.title.length > 20 ? 20 : item.title.length) +
    '...';

  return (
    <div className="deck__card">
      <Link to={`/item/${item.id}`}>
        <img src={item.image} alt={item.title} />
        <h3>{itemName}</h3>
      </Link>
      <ItemInCartOperations
        item={item}
        amount={cart.getItemAmount(item.id) ?? 0}
      />
    </div>
  );
}

export function ItemInDetail({ item }: { item: ProductData }) {
  return;
}

export function ItemInHome({ item }: { item: ProductData }) {
  const { cart } = useOutletContext<{ cart: Cart }>();
  return (
    <div className="deck__card">
      <img src={item.image} alt={item.title} />
      <h3>{item.title}</h3>
      <Link to={`/item/${item.id}`}>Ver más</Link>
      <ItemInCartOperations
        item={item}
        amount={cart.getItemAmount(item.id) ?? 0}
      />
    </div>
  );
}

export function ItemInSearch({ item }: { item: ProductData }) {
  const itemName =
    item.title.slice(0, item.title.length > 25 ? 25 : item.title.length) +
    '... View more';
  return (
    <Link to={`/item/${item.id}`}>
      <p>
        <strong>{itemName}</strong>
      </p>
    </Link>
  );
}

export function RelatedItems({
  presentCategories,
  id = undefined,
}: {
  presentCategories: string[];
  id: number | undefined;
}) {
  const { store } = useOutletContext<{ store: Store }>();

  const randomItemsRef = useRef<number[] | null>(null);
  if (!randomItemsRef.current) {
    randomItemsRef.current = store.getRandomItemsIds(
      5,
      [...presentCategories],
      id ?? -1,
    );
  }
  return (
    <>
      <h3>You may also like... </h3>
      {randomItemsRef.current.map((itemId) => {
        const item = store.getItem(itemId) as ProductData;
        return <ItemCard key={itemId} item={item} />;
      })}
    </>
  );
}
