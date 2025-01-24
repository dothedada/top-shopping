import { Link, useOutletContext } from 'react-router-dom';
import { ProductData } from '../types/global';
import { Store } from '../store';
import { ItemInCartOperations } from './buttons';

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

export const RelatedItems = ({
  presentCategories,
}: {
  presentCategories: string[];
}) => {
  const { store } = useOutletContext<{ store: Store }>();
  return (
    <>
      <h3>Tal vez te pueda interezar... </h3>
      {store.similarItemsIds([...presentCategories], 5).map((itemId) => {
        const item = store.getItem(itemId) as ProductData;
        return <ItemCard key={itemId} item={item} />;
      })}
    </>
  );
};
