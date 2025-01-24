export const CartBtn = ({ itemsInCart }: { itemsInCart: number }) => {
  return (
    <div>
      <span className="sr-only">icon</span>
      <span>{itemsInCart > 0 && itemsInCart}</span>
      <span>Ir al carrito de compras</span>
    </div>
  );
};
