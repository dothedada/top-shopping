import { useOutletContext } from 'react-router-dom';
import { Store } from '../store';
import { ItemCard } from '../components/itemsInDisplay';

export default function Home() {
  const { store } = useOutletContext<{ store: Store }>();

  return (
    <>
      <h1>carajo</h1>
      <p>123</p>
      {store.allItems.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </>
  );
}
