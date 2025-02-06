import { useOutletContext } from 'react-router-dom';
import { Store } from '../store';
import { ItemInHome } from '../components/itemsInDisplay';
import { useRef } from 'react';

export default function Home() {
  const { store } = useOutletContext<{ store: Store }>();

  const randomItemsRef = useRef<number[] | null>(null);
  if (!randomItemsRef.current) {
    randomItemsRef.current = store.getRandomItemsIds(3);
  }
  return (
    <>
      {randomItemsRef.current.map((id) => {
        const item = store.getItem(id)!;
        return <ItemInHome key={id} item={item} />;
      })}
    </>
  );
}
