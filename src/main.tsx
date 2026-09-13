import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./hooks/useTheme.tsx";
import { ProductsProvider } from "./hooks/useProducts.tsx";
import { RouterProvider } from "./router/router.tsx";
import { CartProvider } from "./hooks/useCart.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider>
            <ThemeProvider>
                <ProductsProvider>
                    <CartProvider>
                        <App />
                    </CartProvider>
                </ProductsProvider>
            </ThemeProvider>
        </RouterProvider>
    </StrictMode>,
);
