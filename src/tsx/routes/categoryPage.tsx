import { useOutletContext, useParams } from 'react-router-dom';
import { Store } from '../store';
import { useEffect, useState } from 'react';
import { ProductData } from '../types/global';
import { Cart } from '../cart';

export default function CategoryPage() {
  const { categoryName } = useParams();
  const { store } = useOutletContext<{ store: Store; cart: Cart }>();
  const [items, setItems] = useState<ProductData[]>([]);

  useEffect(() => {
    setItems(() => store.allItems.filter((e) => e.category === categoryName));
  }, [store, categoryName]);

  if (!categoryName || !store) {
    throw new Error('Cannot load the page');
  }
  if (!store.allCategories.includes(categoryName)) {
    return <h1>La categoría {categoryName} no existe en nuestro catálogo</h1>;
  }
  return (
    <>
      <h1>{categoryName}</h1>
      {items && items.map((item, index) => <div key={index}>{item.title}</div>)}
    </>
  );
}
