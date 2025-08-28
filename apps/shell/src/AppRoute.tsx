import { createRemoteComponent } from "@module-federation/bridge-react";
import {
  createBrowserRouter,
  Navigate,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import Shell from "./Shell";

// Example: dynamic runtime loading (unused in current static createRemoteComponent calls)
// import loadRemoteWithDynamicScope from './dynamicFederationLoader';
// (async () => {
//   const remoteApp = await loadRemoteWithDynamicScope({
//     name: 'app1',
//     url: 'http://localhost:5174/app-1/remoteEntry.js',
//     expose: './export-app'
//   });
//   console.log('Dynamically loaded app1 root component factory', remoteApp);
// })();

const App1Component = createRemoteComponent({
  // @ts-ignore
  loader: () => import("app1/export-app"),
  loading: <h1>app-1 loading</h1>,
  fallback: () => <h1>app-1 error</h1>,
});

const App2Component = createRemoteComponent({
  // @ts-ignore
  loader: () => import("app2/export-app"),
  loading: <h1>app-2 loading</h1>,
  fallback: () => <h1>app-2 error</h1>,
});

const App3Component = createRemoteComponent({
  // @ts-ignore
  loader: () => import("app3/export-app"),
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
