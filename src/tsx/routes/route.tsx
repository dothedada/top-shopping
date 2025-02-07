import { createBrowserRouter } from 'react-router-dom';
import Root from './root';
import CategoryPage from './categoryPage';
import ErrorPage from './errorPage';
import ProductDetail from './productPage';
import MyCart from './myCart';
import Home from './homePage';
import { loader as rootLoader } from '../dataFetcher';

export const route = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    hydrateFallbackElement: <h1>cargandooooo</h1>,

    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/category/:categoryName',
        element: <CategoryPage />,
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
