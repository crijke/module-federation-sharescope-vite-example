import { createRemoteComponent } from "@module-federation/bridge-react";
import { init, loadRemote } from '@module-federation/enhanced/runtime';
import {
  createBrowserRouter,
  Navigate,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import Shell from "./Shell";

init({
    name: 'shell',
    remotes: [
        {
            name: 'app1',
            alias: 'app1',
            entry: 'http://localhost:5174/remoteEntry.js',
            shareScope: "react@18.3.0"
        },
        {
            name: 'app2',
            alias: 'app2',
            entry: 'http://localhost:5175/remoteEntry.js',
            shareScope: "react@18.3.0"
        },
        {
            name: 'app3',
            alias: 'app3',
            entry: 'http://localhost:5176/remoteEntry.js',
            shareScope: "react@18.3.1"
        },
    ],
});


const App1Component = createRemoteComponent({
  // @ts-ignore
  loader: () => loadRemote("app1/export-app"),
  loading: <h1>app-1 loading</h1>,
  fallback: () => <h1>app-1 error</h1>,
});

const App2Component = createRemoteComponent({
  // @ts-ignore
  loader: ()=> loadRemote("app2/export-app"),
  loading: <h1>app-2 loading</h1>,
  fallback: () => <h1>app-2 error</h1>,
});

const App3Component = createRemoteComponent({
  // @ts-ignore
  loader:() => loadRemote("app3/export-app"),
  loading: <h1>app-3 loading</h1>,
  fallback: () => <h1>app-3 error</h1>,
});

const appRoutes: RouteObject[] = [
  {
    element: <Shell />,
    id: "shell",
    children: [
      {
        path: "/",
        element: <Navigate to="/app-1" />,
      },
      {
        path: "/app-1/*",
        // @ts-ignore
        element: <App1Component />,
      },
      {
        path: "/app-2/*",
        // @ts-ignore
        element: <App2Component />,
      },
      {
        path: "/app-3/*",
        // @ts-ignore
        element: <App3Component />,
      },
      { path: "*", element: <div>404</div> },
    ],
  },
];

const router = createBrowserRouter(appRoutes);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
