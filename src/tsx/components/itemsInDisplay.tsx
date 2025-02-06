import { Link, useOutletContext } from 'react-router-dom';
import { ProductData } from '../types/global';
import { Store } from '../store';
import { ItemInCartOperations } from './buttons';
import { useMemo, useRef } from 'react';
import { Cart } from '../cart';

export function ItemCard({ item }: { item: ProductData }) {
  if (!item) {
    return <div>No se pudo obtener la informacion</div>;
  }

  return (
    <div className="deck__card">
      <img src={item.image} alt={item.title} />
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <Link to={`/item/${item.id}`}>Ver más</Link>
      <ItemInCartOperations item={item} amount={0} />
    </div>
  );
}

export function ItemInHome({ item }: { item: ProductData }) {
  const { cart } = useOutletContext<{ cart: Cart }>();
  return (
    <div className="deck__card">
      <img src={item.image} alt={item.title} />
      <h3>{item.title}</h3>
      <Link to={`/item/${item.id}`}>Ver más</Link>
      <ItemInCartOperations item={item} amount={cart.getItemAmount(item.id)} />
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
      <h3>Tal vez te pueda interezar... </h3>
      {randomItemsRef.current.map((itemId) => {
        const item = store.getItem(itemId) as ProductData;
        return <ItemCard key={itemId} item={item} />;
      })}
    </>
  );
}
