import { createHashRouter, useRouteError } from 'react-router-dom';
import Modules from './modules/modules/modules';
import Overview from './modules/overview/main';
import Requirements from './modules/requirements/requirements';
import Secrets from './modules/secrets/secrets';
import Servers from './modules/servers/servers';
import Tenants from './modules/tenants/tenants';
import WorkspacesOverview from './modules/workspaces/overview';
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
        element: <Modules />,
      },
      {
        path: 'tenants',
        element: <Tenants />,
      },
      {
        path: 'servers',
        element: <Servers />,
      },
      {
        path: 'secrets',
        element: <Secrets />,
      },
      {
        index: true,
        element: <Overview />,
      },
    ],
  },
]);
