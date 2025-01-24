import { Link } from 'react-router-dom';
import { ProductData } from '../types/global';

export function ItemCard({
  addBtn,
  item,
}: {
  addBtn: (id: number) => void;
  item: ProductData;
}) {
  if (!item) {
    return <div>No se pudo obtener la informacion</div>;
  }
  return (
    <div className="deck__card">
      <img src={item.image} alt={item.title} />
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <Link to={`/item/${item.id}`}>Ver más</Link>
      <button type="button" onPointerDown={() => addBtn(item.id)}>
        Añadir al carrito
      </button>
    </div>
  );
}
