import { useLoaderData, useOutletContext, useParams } from 'react-router-dom';
import { Store } from '../store';
import { useEffect, useState } from 'react';
import { ProductData } from '../types/global';
import { Cart } from '../cart';
import { fetcher, makeFetchUrl } from '../dataFetcher';

export async function loader({ params }) {
  try {
    const { categoryName } = params;
    const controller = new AbortController();
    const { data, onError } = await fetcher(
      makeFetchUrl(categoryName),
      controller,
    );
    if (onError && onError[0]) {
      throw new Error(`Error while loadin items from category ${categoryName}`);
    }
    return { data };
  } catch (err) {
    console.log(err);
  }
}

export default function CategoryPage() {
  const { categoryName } = useParams();
  const { store } = useOutletContext<{ store: Store; cart: Cart }>();
  const { data: newItems } = useLoaderData<{ data: ProductData[] }>();
  const [items, setItems] = useState<ProductData[]>([]);

  useEffect(() => {
    console.log(newItems);
    setItems(() => store.allItems.filter((e) => e.category === categoryName));
  }, [store, categoryName, newItems]);

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
