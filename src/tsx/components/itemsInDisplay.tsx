import { Link, useOutletContext } from 'react-router-dom';
import { ProductData } from '../types/global';
import { Store } from '../store';
import { ItemInCartOperations, Price } from './buttons';
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
        <h3 className="card__title">{itemName}</h3>
      </Link>
      <ItemInCartOperations
        item={item}
        amount={cart.getItemAmount(item.id) ?? 0}
      />
    </div>
  );
}

export function ItemInDetail({ item, id }: { item: ProductData; id: number }) {
  const { cart } = useOutletContext<{ cart: Cart }>();
  return (
    <>
      {!id || !item ? (
        <h1>Paila</h1>
      ) : (
        <div className="item__detail">
          <img src={item.image} alt="" />
          <div className="item__data">
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <Price item={item} />
            <ItemInCartOperations
              item={item}
              amount={cart.getItemAmount(+id) || 0}
            />
          </div>
        </div>
      )}
      <RelatedItems
        presentCategories={item ? [item.category] : []}
        id={item?.id}
      />
    </>
  );
}

export function ItemInHome({ item }: { item: ProductData }) {
  const { cart } = useOutletContext<{ cart: Cart }>();
  return (
    <div className="home__card">
      <img src={item.image} alt={item.title} />
      <div className="data">
        <Link to={`/item/${item.id}`}>
          <h3>{item.title}</h3>
          <Price className="price home" item={item} />
        </Link>
        <ItemInCartOperations
          item={item}
          amount={cart.getItemAmount(item.id) ?? 0}
        />
      </div>
    </div>
  );
}

export function ItemInSearch({ item }: { item: ProductData }) {
  const itemName = item.title.slice(
    0,
    item.title.length > 25 ? 25 : item.title.length,
  );
  return (
    <Link to={`/item/${item.id}`}>
      <p>
        {itemName}... in {item.category} // view more
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
    <div className="related">
      <h3>You may also like... </h3>
      <div className="related__cards">
        {randomItemsRef.current.map((itemId) => {
          const item = store.getItem(itemId) as ProductData;
          return <ItemRelated key={itemId} item={item} />;
        })}
      </div>
    </div>
  );
}
export function ItemRelated({ item }: { item: ProductData }) {
  if (!item) {
    throw new Error(`No item data for: ${item}`);
  }
  const itemName =
    item.title.slice(0, item.title.length > 20 ? 20 : item.title.length) +
    '...';

  return (
    <div className="related__card">
      <Link to={`/item/${item.id}`}>
        <img src={item.image} alt={item.title} />
        <h3 className="card__title">{itemName}</h3>
      </Link>
    </div>
  );
}
