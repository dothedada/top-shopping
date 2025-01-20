import { createBrowserRouter } from 'react-router-dom';
import Root, { loader as rootLoader } from './root';
import CategoryPage, { loader as categoryLoader } from './categoryPage';
import ErrorPage from './errorPage';
import ProductDetail from './productDetail';

export const route = createBrowserRouter([
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
        loader: categoryLoader,
      },
      {
        path: '/item/:id',
        element: <ProductDetail />,
      },
    ],
  },
  {
    path: '/myCart',
  },
]);
