import { Store } from '../store';
import { NavLink, Outlet, useLoaderData, Link } from 'react-router-dom';
import { fetcher, makeFetchUrl } from '../dataFetcher';
import { FetchCategories, ProductData } from '../types/global';
import { useState, useEffect } from 'react';
import { Cart } from '../cart';
import { CartBtn } from '../components/buttons';

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
    store.addCategories(dataCategories as FetchCategories);
    store.addItems(items as ProductData[]);

    return { store };
  } catch (err) {
    console.log(err);
  }
}

export default function Root() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [itemsInCart, setItemsInCart] = useState(0);
  const { store } = useLoaderData<{ store: Store }>();

  useEffect(() => {
    setCart(() => new Cart(store));
  }, [store]);

  const context = { store, cart, setItemsInCart };

  return (
    <>
      <header>
        <div className="header-top">
          <Link to="/">
            <h1>
              <span className="sr-only">Shoping</span>
              <span aria-hidden="true">Sh[oooo]ping!</span>
            </h1>
          </Link>
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
                <a href={'/about/'}>Sobre nosotros</a>
              </li>
              <li>
                <Link to={'/cart/'}>
                  <CartBtn itemsInCart={itemsInCart} />
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <nav aria-label="Categorías de productos">
          <ul>
            {store.allCategories.map((category: string) => (
              <li key={category}>
                <NavLink
                  to={`/${category}`}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  {category}
                </NavLink>
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
