import { Store } from '../store';
import { NavLink, Outlet, useLoaderData, Link } from 'react-router-dom';
import { useState } from 'react';
import { Cart } from '../cart';
import { CartBtn } from '../components/buttons';
import { SearchBar } from '../components/searchBar';

export default function Root() {
  const [itemsInCart, setItemsInCart] = useState(0);
  const { store, cart } = useLoaderData<{ store: Store; cart: Cart }>();

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
          <nav className="main-nav" aria-label="Main menu">
            <ul>
              <li className="main-search">
                <SearchBar />
              </li>
              <li>
                <Link to={'/about/'}>About us</Link>
              </li>
              <li>
                <CartBtn itemsInCart={itemsInCart} />
              </li>
            </ul>
          </nav>
        </div>

        <nav className="category-nav" aria-label="Categorías de productos">
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
