import { useLoaderData, useParams } from 'react-router-dom';
import { Store } from '../store';
import { useEffect, useState } from 'react';
import { ProductData } from '../types/global';

export default function CategoryPage() {
  const { categoryName } = useParams();
  const { store } = useLoaderData<{ store: Store }>();
  const [items, setItems] = useState<ProductData[]>([]);

  useEffect(() => {
    if (!categoryName) {
      throw new Error('Cannot load the page');
    }
    store.loadNewItems(categoryName).then((bla) => {
      console.log(bla);
      if (!bla) return;
      setItems(bla);
      console.log(bla);
    });
  }, [categoryName, store]);

  if (!categoryName || !store) {
    throw new Error('Cannot load the page');
  }
  if (!store.allCategories.includes(categoryName)) {
    return <h1>La categoría {categoryName} no existe en nuestro catálogo</h1>;
  }
  return (
    <>
      <h1>{categoryName}</h1>
      {items && items.map((item) => <div>{item.title}</div>)}
    </>
  );
}
