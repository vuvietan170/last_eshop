import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./hooks/useTheme.tsx";
import { ProductsProvider } from "./hooks/useProducts.tsx";
import { RouterProvider } from "./router/router.tsx";
import { CartProvider } from "./hooks/useCart.tsx";
import { ToastProvider } from "./hooks/useToast.tsx";
import { OrdersProvider } from "./hooks/useOrders.tsx";
import { AuthProvider } from "./hooks/useAuth.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider>
            <ThemeProvider>
                <ProductsProvider>
                    <CartProvider>
                        <OrdersProvider>
                            <ToastProvider>
                                <AuthProvider>
                                    <App />
                                </AuthProvider>
                            </ToastProvider>
                        </OrdersProvider>
                    </CartProvider>
                </ProductsProvider>
            </ThemeProvider>
        </RouterProvider>
    </StrictMode>,
);
