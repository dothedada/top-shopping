import { useOutletContext, useParams } from 'react-router-dom';
import { Store } from '../store';
import { useEffect, useState } from 'react';
import { ProductData } from '../types/global';
import { Cart } from '../cart';
import { fetcher, makeFetchItemUrl } from '../dataFetcher';

export default function ProductDetail() {
  const { store, cart, setItemsInCart } = useOutletContext<{
    store: Store;
    cart: Cart;
    setItemsInCart: (amount: number) => void;
  }>();
  const { id } = useParams();
  const [item, setItem] = useState<ProductData | undefined>(undefined);

  useEffect(() => {
    if (id !== undefined && store !== undefined) {
      if (store.hasItem(+id)) {
        setItem(() => store.getItem(+id));
      } else {
        const controller = new AbortController();
        fetcher(makeFetchItemUrl(+id), controller).then((fetchObject) => {
          if (
            !fetchObject.data ||
            (fetchObject.data as ProductData).id !== +id
          ) {
            throw new Error(`Cannot find item id: ${id} in database`);
          } else {
            setItem(() => fetchObject.data as ProductData);
          }
        });
      }
    }
  }, [id, store]);

  const addItem = () => {
    if (!id) {
      return;
    }
    cart.addItem(+id);
    setItemsInCart(cart.totalItems);
  };

  const removeItem = () => {
    if (!id) {
      return;
    }
    cart.deleteItem(+id);
    setItemsInCart(cart.totalItems);
  };
  return (
    <>
      <h2>{item?.title}</h2>
      <p>{item?.description}</p>
      <button type="button" onPointerDown={addItem}>
        Añadir al carrito
      </button>
      <button type="button" onPointerDown={removeItem}>
        quitar del carrito
      </button>
    </>
  );
}
