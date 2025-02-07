import { useOutletContext, useParams } from 'react-router-dom';
import { Store } from '../store';
import { useEffect, useState } from 'react';
import { ProductData } from '../types/global';
import { Cart } from '../cart';
import { fetcher, makeFetchItemUrl } from '../dataFetcher';
import { ItemInDetail } from '../components/itemsInDisplay';

export default function ProductDetail() {
  const { store } = useOutletContext<{ store: Store; cart: Cart }>();
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

  return !item || !id ? (
    <div>Error loading item</div>
  ) : (
    <ItemInDetail item={item} id={+id} />
  );
}
