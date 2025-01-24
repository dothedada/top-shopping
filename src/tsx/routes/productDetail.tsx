import { useOutletContext, useParams } from 'react-router-dom';
import { Store } from '../store';
import { useEffect, useState } from 'react';
import { ProductData } from '../types/global';
import { Cart } from '../cart';
import { ItemInCartOperations } from '../components/buttons';

export default function ProductDetail() {
  const { store, cart } = useOutletContext<{ store: Store; cart: Cart }>();
  const { id } = useParams();
  const [item, setItem] = useState<ProductData | undefined>(undefined);

  useEffect(() => {
    if (id) {
      setItem(() => store.getItem(+id));
    }
  }, [id, store]);

  if (!id || !item) {
    return <h1>BLA</h1>;
  }
  return !id || !item ? (
    <h1>Paila</h1>
  ) : (
    <>
      <h2>{item?.title}</h2>
      <p>{item?.description}</p>
      <ItemInCartOperations item={item} amount={cart.getAmount(+id) || 0} />
    </>
  );
}
