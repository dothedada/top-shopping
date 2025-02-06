import { useOutletContext, useParams } from 'react-router-dom';
import { Store } from '../store';
import { useEffect, useState } from 'react';
import { ProductData } from '../types/global';
import { Cart } from '../cart';
import { ItemInCartOperations } from '../components/buttons';
import { fetcher, makeFetchItemUrl } from '../dataFetcher';
import { ItemInDetail, RelatedItems } from '../components/itemsInDisplay';

export default function ProductDetail() {
  const { store, cart } = useOutletContext<{ store: Store; cart: Cart }>();
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

  return <ItemInDetail item={item} id={id} />;
}
