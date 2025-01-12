import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root';
import ErrorPage from './routes/errorPage';
import CategoryPage, { categoryLoader } from './routes/categoryPage';
import ProductDetail from './routes/productDetail';
import { Store } from './store';

async function storeLoader() {
  const store = await Store.create();
  return { store };
}

const route = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: storeLoader,
    hydrateFallbackElement: <h1>cargandooooo</h1>,

    children: [
      {
        path: '/:categoryName',
        element: <CategoryPage />,
        loader: storeLoader,
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
