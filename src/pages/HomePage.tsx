import Hero from "@/components/Hero";
import { useProducts } from "@/hooks/useProducts";

const HomePage = () => {
    const { products, isLoading } = useProducts();
    if (isLoading) {
        return <p> Đang tải sản phẩm</p>;
    }
    return <Hero products={products} />;
};
export default HomePage;
