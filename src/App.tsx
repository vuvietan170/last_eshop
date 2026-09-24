import { Navbar } from "./components/Navbar";
import { matchRoute, useRouter } from "./router/router";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { HomePage } from "./pages/HomePage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { SearchResultPage } from "./pages/SearchResultPage";
import { OrderPage } from "./pages/OrderPage";
import { LoginPage } from "./pages/LoginPage";
import { useAuth } from "./hooks/useAuthContext";
import { SellerPage } from "./pages/SellerPage";
function App() {
    const { path, navigate } = useRouter();
    const { user } = useAuth();
    const productMatch = matchRoute("/product/:id", path);
    const searchMatch = matchRoute("/search/:query", path);

    // phân quyền
    if (path === "/seller") {
        if (!user) {
            navigate("/login");
            return null;
        }
        if (user.role !== "seller") {
            return <p>Bạn không có quyền truy cập trang này</p>;
        }
        return <SellerPage />;
    }
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
                ) : path === "/login" ? (
                    <LoginPage />
                ) : path === "/checkout" ? (
                    <CheckoutPage />
                ) : path === "/orders" ? (
                    <OrderPage />
                ) : (
                    <HomePage />
                )}
            </div>
        </>
    );
}

export default App;
