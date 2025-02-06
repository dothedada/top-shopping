import { useOutletContext, useParams } from 'react-router-dom';
import { Store } from '../store';
import { useEffect, useState } from 'react';
import { ProductData } from '../types/global';
import { ItemCard } from '../components/itemsInDisplay';

export default function CategoryPage() {
  const { categoryName } = useParams();
  const { store } = useOutletContext<{ store: Store }>();
  const [items, setItems] = useState<ProductData[]>([]);

  useEffect(() => {
    if (categoryName) {
      setItems(() => store.itemsFrom(categoryName));
    }
  }, [store, categoryName]);

  if (!categoryName || !store) {
    throw new Error('Cannot load the page');
  }
  if (!store.allCategories.includes(categoryName)) {
    return <h1>La categoría {categoryName} no existe en nuestro catálogo</h1>;
  }

  return (
    <>
      {items.length ? (
        <div className="deck">
          {items.map((item) => (
            <ItemCard item={item} key={item.id} />
          ))}
        </div>
      ) : (
        <h2 className="warn">
          Sorry, there is no {categoryName} items available
        </h2>
      )}
    </>
  );
}
