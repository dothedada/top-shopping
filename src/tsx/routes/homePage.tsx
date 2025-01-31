import { useOutletContext } from 'react-router-dom';
import { Store } from '../store';
import { ItemInHome } from '../components/itemsInDisplay';

export default function Home() {
  const { store } = useOutletContext<{ store: Store }>();

  return (
    <>
      <h1>carajo</h1>
      <p>123</p>
      {store.getRandomItemsIds(3).map((id) => {
        const item = store.getItem(id)!;
        return <ItemInHome key={id} item={item} />;
      })}
    </>
  );
}
