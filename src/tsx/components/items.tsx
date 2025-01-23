import { Link } from 'react-router-dom';
import { ProductData } from '../types/global';
import { useEffect, useRef } from 'react';

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
  amount,
  addOne,
  changeAmount,
  substractOne,
  removeItem,
}: {
  item: ProductData;
  amount: number;
  addOne: (id: number) => void;
  changeAmount: (id: number, amount: number) => void;
  substractOne: (id: number) => void;
  removeItem: (id: number) => void;
}) => {
  const amountRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (amountRef.current) {
      amountRef.current.value = amount.toString();
    }
  }, [amount]);

  return (
    <>
      <div>{item.brand}</div>
      <div>{amount}</div>
      <div>{item.price}</div>
      <div>{item.discount}</div>
      <div>{item.category}</div>
      <button onPointerDown={() => addOne(item.id)}>+</button>
      <input
        type="number"
        onBlur={() => changeAmount(item.id, +(amountRef.current?.value ?? 0))}
        ref={amountRef}
      />
      <button onPointerDown={() => substractOne(item.id)}>-</button>
      <button onPointerDown={() => removeItem(item.id)}>
        Quitar del carrito
      </button>
    </>
  );
};
