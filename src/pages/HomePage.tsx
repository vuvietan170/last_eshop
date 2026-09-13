import Hero from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";

export const HomePage = () => {
    const { products, isLoading } = useProducts();
    if (isLoading) {
        return <p> Đang tải sản phẩm...</p>;
    }
    return (
        <>
            <Hero products={products} />
            <div className="mx-auto max-w-7xl px-4 py-10">
                <h2 className="mb-6 text-xl font-bold text-ink">
                    Sản Phẩm Nổi Bật
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </div>
        </>
    );
};
