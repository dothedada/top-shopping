import { useOutletContext, useParams } from 'react-router-dom';
import { Store } from '../store';
import { useEffect, useState } from 'react';
import { ProductData } from '../types/global';

export default function ProductDetail() {
  const { store } = useOutletContext<{ store: Store }>();
  const { id } = useParams();
  const [item, setItem] = useState<ProductData | undefined>(undefined);

  useEffect(() => {
    if (id !== undefined && store !== undefined) {
      setItem(() => store.getItem(id));
    }
  }, [id, store]);
  return (
    <>
      <h2>{id}</h2>
      <h2>{item?.title}</h2>
      <p>{item?.description}</p>
    </>
  );
}
