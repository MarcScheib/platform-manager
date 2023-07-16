import React from 'react';
import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Requirements from './modules/requirements/requirements';
import { TipManager } from './tip-manager';
import Overview from './modules/overview/main';

const router = createHashRouter([
  {
    path: '/',
    element: <TipManager />,
    errorElement: (
      <div>
        <a href="/main_window">Home</a>
      </div>
    ),
    children: [
      {
        path: 'requirements',
        element: <Requirements />,
      },
      {
        index: true,
        element: <Overview />,
      }
    ],
  },
]);

function render() {
  const container = document.getElementById('app');
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

render();
