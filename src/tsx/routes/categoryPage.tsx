import { useLoaderData, useOutletContext, useParams } from 'react-router-dom';
import { Store } from '../store';
import { useEffect, useState } from 'react';
import { ProductData } from '../types/global';
import { Cart } from '../cart';
import { fetcher, makeFetchUrl } from '../dataFetcher';
import { ItemCard } from '../components/itemsInDisplay';
import { LoaderFunctionArgs } from 'react-router-dom';

export async function loader({ params }: LoaderFunctionArgs) {
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
  const { store, cart, setItemsInCart } = useOutletContext<{
    store: Store;
    cart: Cart;
    setItemsInCart: (amount: number) => void;
  }>();
  const { data: newItems } = useLoaderData<{ data: ProductData[] }>();
  const [items, setItems] = useState<ProductData[]>([]);

  useEffect(() => {
    setItems(() => {
      store.addItems(newItems);
      return store.allItems.filter((e) => e.category === categoryName);
    });
  }, [store, categoryName, newItems]);

  if (!categoryName || !store) {
    throw new Error('Cannot load the page');
  }
  if (!store.allCategories.includes(categoryName)) {
    return <h1>La categoría {categoryName} no existe en nuestro catálogo</h1>;
  }

  const addBtn = (id: number): void => {
    cart.addItem(id);
    setItemsInCart(cart.totalItems);
  };
  return (
    <>
      <h1>{categoryName}</h1>
      <div className="deck">
        {items.map((item) => (
          <ItemCard item={item} addBtn={addBtn} key={item.id} />
        ))}
      </div>
    </>
  );
}
