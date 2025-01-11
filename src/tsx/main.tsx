import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const route = createBrowserRouter([
    {
        path: '/',
        element: <h1>Test</h1>,
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={route} />
    </StrictMode>,
);
