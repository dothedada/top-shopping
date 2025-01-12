import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root';
import ErrorPage from './routes/errorPage';
import CategoryPage, { categoryLoader } from './routes/categoryPage';
import ProductDetail from './routes/productDetail';
import { Store } from './store';
import { fetcher, makeFetchUrl } from './dataFetcher';
import { ProductCategories, ProductData } from './types/global';

async function storeLoader() {
  const store = await Store.create();
  console.log('asd', store.allItems);
  return { store };
}

// private async populateStore() {
//   try {
//     const controller = new AbortController();
//     const { data, onError } = await fetcher(makeFetchUrl('', 5), controller);
//     if (onError?.[0]) {
//       throw onError[1];
//     }
//     this.items = data as ProductData[];
//   } catch (err) {
//     alert(err);
//   }
// }
//
// async updateCategories() {
//   try {
//     const controller = new AbortController();
//     const { data, onError } = await fetcher(makeFetchUrl(), controller);
//     if (onError?.[0] === true) {
//       throw onError[1];
//     }
//     this.categories = data as ProductCategories;
//   } catch (err) {
//     console.log('123error');
//     alert(err);
//   }
// }
//
// async loadNewItems(category: string) {
//   try {
//     const controller = new AbortController();
//     const { data, onError } = await fetcher(
//       makeFetchUrl(category, amount),
//       controller,
//     );
//     if (onError?.[0]) {
//       throw onError[1];
//     }
//     this.items = data as ProductData[];
//   } catch (err) {
//     alert(err);
//   }
// }
async function rootLoader() {
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

const route = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    hydrateFallbackElement: <h1>cargandooooo</h1>,

    children: [
      {
        path: '/:categoryName',
        element: <CategoryPage />,
      },
      { path: '/item/:id', element: <ProductDetail /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={route} />
  </StrictMode>,
);
