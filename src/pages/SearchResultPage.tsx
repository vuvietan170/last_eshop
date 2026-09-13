import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";

export const SearchResultPage = ({ query }: { query: string }) => {
    const { products, isLoading } = useProducts();

    if (isLoading) {
        return <p className="p-8 text-center text-ink-muted"> </p>;
    }
    const result = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase()),
    );

    return (
        <div className="mx-auto max-w-7xl px-4 py-10">
            <h1 className="mb-6 text-xl font-bold text-ink">
                Kết quả cho "{query}" ({result.length} kết quả)
            </h1>
            {result.length === 0 ? (
                <p className="text-ink-muted"> Không tìm thấy kết quả nào</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                    {result.map((item) => (
                        <ProductCard key={item.id} product={item} />
                    ))}
                </div>
            )}
        </div>
    );
};
