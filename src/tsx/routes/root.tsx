import { Store } from '../store';
import { NavLink, Outlet, useLoaderData } from 'react-router-dom';
import { fetcher, makeFetchUrl } from '../dataFetcher';
import { ProductCategories, ProductData } from '../types/global';
import { useState, useEffect } from 'react';
import { Cart } from '../cart';

export async function loader() {
  try {
    const store = new Store();
    const controllerCategories = new AbortController();
    const { data: dataCategories, onError: onErrorCategories } = await fetcher(
      makeFetchUrl(),
      controllerCategories,
    );

    if (onErrorCategories && onErrorCategories[0]) {
      throw new Error(
        `error while loading categories: ${onErrorCategories[1]}`,
      );
    }

    const controllerItems = new AbortController();

    const { data: items, onError: onErrorItems } = await fetcher(
      makeFetchUrl('', 5),
      controllerItems,
    );

    if (onErrorItems && onErrorItems[0]) {
      throw new Error(`error while loading items: ${onErrorItems[1]}`);
    }
    store.addCategories(dataCategories as ProductCategories);
    store.addItems(items as ProductData[]);
    return { store };
  } catch (err) {
    console.log(err);
  }
}

export default function Root() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [itemsInCart, setItemsInCart] = useState(0);
  const { store } = useLoaderData();

  useEffect(() => {
    setCart(() => new Cart(store));
  }, [store]);

  const context = { store, cart };

  return (
    <>
      <header>
        <div className="header-top">
          <a href="/">
            <h1>
              <span className="sr-hidden">Shooooping</span>
              <span aria-hidden="true">Sh[oooo]ping!</span>
            </h1>
          </a>
          <form
            id="search-bar"
            role="search"
            aria-label="Buscar productos en la tienda"
          >
            <input
              type="search"
              id="q"
              aria-label="Buscar productos"
              placeholder="Buscar"
              name="q"
            />
            <div id="search-spinner" aria-hidden="true"></div>
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <nav className="main-nav" aria-label="Navegación principal">
            <ul>
              <li>
                <a href={'about/'}>Sobre nosotros</a>
              </li>
              <li>
                <a href={'cart/'}>
                  <CartBtn itemsInCart={itemsInCart} />
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <nav aria-label="Categorías de productos">
          <ul>
            {store?.allCategories.map((category: string, index: number) => (
              <li key={index}>
                <NavLink to={`/${category}`}>{category}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main id="content">
        <Outlet context={context} />
      </main>
    </>
  );
}

const CartBtn = ({ itemsInCart }: { itemsInCart: number }) => {
  return (
    <div>
      <span>icon</span>
      <span>{itemsInCart > 0 && itemsInCart}</span>
      <span>Ir al carrito de compras</span>
    </div>
  );
};
