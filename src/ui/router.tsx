import { createHashRouter, useRouteError } from 'react-router-dom';
import Overview from './modules/overview/main';
import WorkspacesOverview from './modules/workspaces/overview';
import Requirements from './modules/requirements/requirements';
import { TipManager } from './tip-manager';

export function Fallback() {
  return <p>Performing initial data "load"</p>;
}

export function RootErrorBoundary() {
  const error = useRouteError() as Error;
  return (
    <div>
      <h1>Uh oh, something went terribly wrong 😩</h1>
      <pre>{error.message || JSON.stringify(error)}</pre>
      <button onClick={() => (window.location.href = '/main_window')}>
        Click here to reload the app
      </button>
    </div>
  );
}

export const router = createHashRouter([
  {
    path: '/',
    element: <TipManager />,
    errorElement: <RootErrorBoundary />,
    children: [
      {
        path: 'workspaces',
        element: <WorkspacesOverview />,
      },
      {
        path: 'requirements',
        element: <Requirements />,
      },
      {
        path: 'modules',
        element: <Requirements />,
      },
      {
        path: 'tenants',
        element: <Requirements />,
      },
      {
        path: 'servers',
        element: <Requirements />,
      },
      {
        path: 'secrets',
        element: <Requirements />,
      },
      {
        index: true,
        element: <Overview />,
      },
    ],
  },
]);
