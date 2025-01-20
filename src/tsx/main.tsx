import '../css/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root, { loader as rootLoader } from './routes/root';
import ErrorPage from './routes/errorPage';
import CategoryPage, { loader as categoryLoader } from './routes/categoryPage';
import ProductDetail from './routes/productDetail';

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
        loader: categoryLoader,
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
