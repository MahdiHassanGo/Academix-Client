import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app.css";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient();
import { RouterProvider } from "react-router-dom";


import AuthProvider from "./provider/AuthProvider.jsx";
import router from "./routes/router.jsx";
import ThemeProvider from "./provider/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
    <ThemeProvider>  <RouterProvider router={router} /></ThemeProvider>
  
    </QueryClientProvider>
    
    </AuthProvider>
  </StrictMode>
);
