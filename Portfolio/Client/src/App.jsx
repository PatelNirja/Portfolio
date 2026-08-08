import React from "react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import ErrorBoundary from "./components/common/ErrorBoundary";
import AppRouter from "./router/AppRouter";

export default function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider>
          <AuthProvider>
            <BrowserRouter>
              <AppRouter />
            </BrowserRouter>
          </AuthProvider>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}
