import { Button } from "./components/ui/button";
import { Navbar } from "./components/Navbar";
import { matchRoute, useRouter } from "./router/router";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { HomePage } from "./pages/HomePage";
import { CheckoutPage } from "./pages/CheckoutPage";
function App() {
    const { path } = useRouter();
    const productMatch = matchRoute("/product/:id", path);
    return (
        <>
            <div className="min-h-screen bg-paper text-ink ">
                <Navbar />
                {productMatch ? (
                    <ProductDetailPage id={Number(productMatch.id)} />
                ) : path === "/checkout" ? (
                    <CheckoutPage />
                ) : (
                    <HomePage />
                )}
            </div>
        </>
    );
}

export default App;
