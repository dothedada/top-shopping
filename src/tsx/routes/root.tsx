export default function Root() {
    return (
        <>
            <div id="navBar">
                <h1>sh(oooo)ping cart</h1>
                <form id="search-item" role="search">
                    <input
                        id="q"
                        aria-label="search items"
                        placeholder="search"
                        type="search"
                    />
                    <div id="spinner" aria-hidden="true" hidden="true"></div>
                    <div className="sr-only" aria-live="polite"></div>
                </form>
                <nav>
                    <ul>
                        <li>
                            <a href="/categories/1">Categoria 1</a>
                        </li>
                        <li>
                            <a href="/categories/2">Categoria 2</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div id="body"></div>
        </>
    );
}
