/* eslint-disable @typescript-eslint/no-explicit-any */
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createContext, useReducer } from "react";
import { ThemeProvider } from "./shadcn/theme-provider";
import { App } from "./App";

import { systemReducer, initialState } from "./reducer/systemReducer";

export const systemContext = createContext<any>(null);
export function Router() {
  const [state, dispatch] = useReducer(systemReducer, initialState);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
  ]);

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <systemContext.Provider value={{ state, dispatch }}>
        <RouterProvider router={router} />
      </systemContext.Provider>
    </ThemeProvider>
  );
}
