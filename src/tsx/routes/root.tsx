import { useEffect, useState } from 'react';
import { Store } from '../store';

export default function Root() {
    const [store, setStore] = useState<Store | null>(null);

    useEffect(() => {
        Store.create().then((store) => setStore(store));
    }, []);

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
                                    <span className="sr-only">
                                        Ver el carrito de compras
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>

                <nav aria-label="Categorías de productos">
                    <ul>
                        {store?.allCategories.map((category, index) => (
                            <li key={index}>
                                <a href={`${category}/`}>{category}</a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </header>
            <main id="content"></main>
        </>
    );
}
