import { createBrowserRouter } from 'react-router-dom';
import Root, { loader as rootLoader } from './root';
import CategoryPage, { loader as categoryLoader } from './categoryPage';
import ErrorPage from './errorPage';
import ProductDetail from './productDetail';
import MyCart from './myCart';

export const route = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    hydrateFallbackElement: <h1>cargandooooo</h1>,

    children: [
      {
        path: '/category/:categoryName',
        element: <CategoryPage />,
        loader: categoryLoader,
      },
      {
        path: '/item/:id',
        element: <ProductDetail />,
      },
      {
        path: '/cart',
        element: <MyCart />,
      },
    ],
  },
]);
