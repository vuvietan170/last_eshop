import { fetchProductById } from "@/api/products";
import { ImageCarousel } from "@/components/ImageCarousel";
import { getDiscountedPrice } from "@/lib/utils";
import type { Product } from "@/types/product";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";

// nhận vào 1 prop id: number để cần biết chính xác sản phẩm nào vì mỗi sản phẩm chỉ có 1 di duy nhất
export const ProductDetailPage = ({ id }: { id: number }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState<Product | null>(null);

    const { addItem } = useCart();

    useEffect(() => {
        setIsLoading(true); // phải set lại vì lúc lần 1 state sẽ là true nhưng khi đến lần 2 thì state sẽ là false, màn hình sẽ giữ nguyên dữ liệu cũ
        fetchProductById(id)
            .then((data) => setProduct(data))
            .finally(() => setIsLoading(false));
    }, [id]);

    if (isLoading) {
        return <div className="p-8 text-center text-ink">Đang tải...</div>;
    }
    if (!product) {
        return (
            <div className="p-8 text-center text-signal">
                Không tìm thấy sản phẩm
            </div>
        );
    }

    const finalPrice = getDiscountedPrice(
        product.price,
        product.discountPercentage,
    );

    return (
        <div className="mx-auto max-w-6xl px-4 py-10">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                {/* images carousel */}
                <ImageCarousel images={product.images} alt={product.title} />
                {/* title , rating, description,price */}
                <div>
                    <h1 className="text-2xl font-bold text-ink">
                        {product.title}
                    </h1>
                    <div className="mt-2 flex items-center gap-1 text-sm text-ink-muted">
                        <Star
                            size={14}
                            className="text-amber-500 fill-amber-500" // text: là tô viền , fill là tô trong
                        />
                        {product.rating.toFixed(1)}
                    </div>

                    <p className="mt-4 text-sm  leading-relaxed text-ink-muted">
                        {product.description}
                    </p>

                    <div className="mt-5 flex items-center gap-2">
                        <span className="text-2xl font-semibold text-ink">
                            ${finalPrice.toFixed(2)}
                        </span>
                        {product.discountPercentage > 0 && (
                            <span className="text-sm line-through text-ink-muted">
                                ${product.price.toFixed(2)}
                            </span>
                        )}
                    </div>
                </div>
                {/* button */}
                <Button
                    variant="primary"
                    className="mt-6 w-full"
                    onClick={() => addItem(product)}
                >
                    Mua ngay
                </Button>
            </div>

            {/* reviews,rating,comment,reviewerName */}
            <div className="mt-14 border-t border-line pt-8">
                <h2 className="mb-4 text-lg font-bold text-ink">Đánh giá</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                    {product.reviews.map((review, index) => (
                        <div
                            key={index}
                            className="border border-line rounded-3xl p-4"
                        >
                            <div className="flex items-center gap-1 text-sm text-ink-muted">
                                <Star
                                    size={13}
                                    className="text-amber-500 fill-amber-500"
                                />
                                {review.rating}
                            </div>
                            <p className="mt-2 text-sm text-ink">
                                {review.comment}
                            </p>
                            <p className="mt-2 text-xs text-ink-muted">
                                {review.reviewerName}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
