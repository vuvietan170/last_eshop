import Hero from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { useMemo, useState } from "react";

export const HomePage = () => {
    const { products, isLoading } = useProducts();
    if (isLoading) {
        return <p> Đang tải sản phẩm...</p>;
    }

    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null,
    );

    // khi React runtime nó sẽ tạo ra một vùng nhớ tạm để lưu lại giá trị tạm thời, lưu vào để tra cứu 
    // Ghi nhớ lại category để khỏi phải tính lại, lưu dữ liệu vào trong RAM 
    const categories = useMemo(
        () => Array.from(new Set(products.map((p) => p.category))), // đưa vào new Set sẽ tự lọc lại mỗi category đúng 1 lần, Arrayform để chuyển trực tiếp mảng không dùng được map về thành mảng dùng được map ví dụ {"phone", "laptop", "tablet"} => ["phone", laptop, "tablet"] để có thể sử dựng được
        [products],
    );

    // lọc sản phẩm: nếu category có giá trị thì lọc sản phẩm , nếu không thì lấy toàn bộ ra
    const filterProducts = selectedCategory
        ? products.filter((p) => p.category === selectedCategory)
        : products;
    return (
        <>
            <Hero products={products} />
            <div className="mx-auto max-w-7xl px-4 py-10">
                <div className="mb-6 flex flex-wrap gap-2">
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className={`rounded-full border px-4 py-1.5 text-xs font-me capitalize cursor-pointer ${
                            selectedCategory === null
                                ? "border-signal bg-signal text-white "
                                : "border-line text-ink-muted hover:bg-paper-dim                        "
                        }`}
                    >
                        Tất cả
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`rounded-full border px-4 py-1.5 text-xs font-me capitalize cursor-pointer ${
                                selectedCategory === cat
                                    ? "border-signal bg-signal text-white "
                                    : "border-line text-ink-muted hover:bg-paper-dim                        "
                            }`}
                        >
                            {cat.replace(/-/g, " ")}
                        </button>
                    ))}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filterProducts.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </div>
        </>
    );
};
