import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import App from "./App";

const appRoutes: RouteObject[] = [
  {
    element: <App />,
    path: "/",
  },
];

const router = createBrowserRouter(appRoutes, {
  basename: "/app-2",
});

export function AppRouter() {
  return <RouterProvider router={router} />;
}
