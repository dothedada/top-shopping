import { useState, useRef, ChangeEvent } from 'react';
import { ProductData } from '../types/global';
import { useLoaderData } from 'react-router-dom';
import { Store } from '../store';
import { ItemInSearch } from './itemsInDisplay';
import { debounce } from '../utils';

export function SearchBar() {
  const [searchItems, setSearchItems] = useState<ProductData[]>([]);
  const { store } = useLoaderData<{ store: Store }>();
  const searchField = useRef<HTMLInputElement>(null);

  const debounceSearch = debounce<ChangeEvent<HTMLInputElement>>(() => {
    if (!searchField.current) {
      return;
    }
    const foundItems = store.lookFor(searchField.current.value, 10);
    setSearchItems(searchField.current.value === '' ? [] : foundItems);
  }, 500);

  const cleanSearch = () => {
    if (!searchField.current) {
      return;
    }
    searchField.current.value = '';
    setSearchItems([]);
  };

  return (
    <>
      <form
        id="search-bar"
        role="search"
        aria-label="Search for products in the store"
      >
        <input
          type="search"
          id="q"
          aria-label="Search products"
          placeholder="Search"
          onChange={debounceSearch}
          ref={searchField}
        />
        <div id="search-spinner" aria-hidden="true"></div>
        <div className="sr-only" aria-live="polite"></div>
      </form>
      {searchField.current?.value &&
        (searchItems.length ? (
          <div onClick={cleanSearch}>
            {searchItems.map((item) => (
              <ItemInSearch key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <h1>Sin items</h1>
        ))}
    </>
  );
}
