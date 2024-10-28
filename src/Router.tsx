import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./shadcn/theme-provider";
import { App } from "./App";

export function Router() {
  //   const [state, dispatch] = useReducer(systemReducer, initialState);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
  ]);

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      {/* <systemContext.Provider value={{ state, dispatch }}> */}
      <RouterProvider router={router} />
      {/* </systemContext.Provider> */}
    </ThemeProvider>
  );
}
