import { Button } from "./components/ui/button";
import { Navbar } from "./components/Navbar";
import { matchRoute, useRouter } from "./router/router";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { HomePage } from "./pages/HomePage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { SearchResultPage } from "./pages/SearchResultPage";
function App() {
    const { path } = useRouter();
    const productMatch = matchRoute("/product/:id", path);
    const searchMatch = matchRoute("/search/:query", path);
    return (
        <>
            <div className="min-h-screen bg-paper text-ink ">
                <Navbar />
                {productMatch ? (
                    <ProductDetailPage id={Number(productMatch.id)} />
                ) : searchMatch ? (
                    <SearchResultPage
                        query={decodeURIComponent(searchMatch.query)}
                        // Hàm decode này dùng để giải mã ngược lại về chữ gốc khi nó bị mã hóa
                    />
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
