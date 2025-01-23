import { Link } from 'react-router-dom';
import { ProductData } from '../types/global';
import { useRef } from 'react';

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

export const ItemList = ({
  item,
  addOne,
  substractOne,
  remove,
}: {
  item: ProductData;
  addOne: (id: number) => void;
  // changeQuantity: (id: number, amount: number) => void;
  substractOne: (id: number) => void;
  remove: (id: number) => void;
}) => {
  const amountRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div>{item.brand}</div>
      <div>{item.price}</div>
      <div>{item.discount}</div>
      <div>{item.category}</div>
      <button onPointerDown={addOne(item.id)}>Añadir</button>
      <input type="number" ref={amountRef} defaultValue={0} />
      <button onPointerDown={() => substractOne(item.id)}>quitar uno</button>
      <button onPointerDown={() => remove(item.id)}>quitar</button>
    </>
  );
};
