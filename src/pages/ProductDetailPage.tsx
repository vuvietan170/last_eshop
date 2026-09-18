import { fetchProductById } from "@/api/products";
import { ImageCarousel } from "@/components/ImageCarousel";
import { getDiscountedPrice } from "@/lib/utils";
import type { Product } from "@/types/product";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/ProductCard";
import { useRouter } from "@/router/router";
import { RatingStar } from "@/components/RatingStar";
import { useToast } from "@/hooks/useToast";

// nhận vào 1 prop id: number để cần biết chính xác sản phẩm nào vì mỗi sản phẩm chỉ có 1 di duy nhất
export const ProductDetailPage = ({ id }: { id: number }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState<Product | null>(null);

    //sản phẩm liên quan
    const { products: allProducts } = useProducts();
    const related = allProducts
        .filter((p) => p.category === product?.category && p.id !== product.id)
        .slice(0, 4);

    const { addItem, totalItems, isCartOpen, openCart, closeCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    const { showToast } = useToast();

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

    const { navigate } = useRouter();
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
                        {/* <Star
                            size={14}
                            className="text-amber-500 fill-amber-500" // text: là tô viền , fill là tô trong
                        />
                        {product.rating.toFixed(1)} */}
                        <RatingStar
                            rating={Number(product.rating.toFixed(2))}
                        />
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

                    {/* them sua xoa setquantity cho gio hang */}
                    <div className="mt-6 flex items-center gap-3">
                        <div className="flex items-center  ">
                            <button
                                onClick={() =>
                                    setQuantity((q) => Math.max(1, q - 1))
                                }
                                className="flex items-center h-11 w-11 justify-center text-lg text-ink-muted border border-line rounded-full hover:bg-signal hover:text-paper cursor-pointer"
                            >
                                -
                            </button>
                            <span className="w-9 text-center text-md text-ink font-semibold">
                                {quantity}
                            </span>

                            <button
                                onClick={() =>
                                    setQuantity((q) => Math.max(q + 1))
                                }
                                className="flex items-center h-11 w-11 justify-center text-lg text-ink-muted border border-line rounded-full hover:bg-signal hover:text-paper cursor-pointer"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
                {/* button */}
                <Button
                    variant="primary"
                    className="mt-6 w-full"
                    onClick={() => {
                        addItem(product, quantity);
                        openCart();
                        showToast(`Đã thêm vào giỏ hàng`);
                    }}
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
                                {/* <<Star
                                    size={13}
                                    className="text-amber-500 fill-amber-500"
                                />> */}
                                <RatingStar rating={review.rating} />
                            </div>
                            <p className="mt-2 text-sm text-ink">
                                {review.comment}
                            </p>
                            <p className="mt-2 text-xs text-ink-muted">
                                {review.reviewerName}
                            </p>
                            {/* <Button
                                variant="outline"
                                className="mt-3 w-full"
                                onClick={() =>
                                    navigate(`/product/${product.id}`)
                                }
                            >
                                Xem chi tiết
                            </Button> */}
                        </div>
                    ))}
                </div>
            </div>

            {related.length > 0 && (
                <div className="mt-14 border-t border-line pt-8   ">
                    <h1 className="text-lg font-bold text-ink mb-4 ">
                        Các sản phẩm liên quan
                    </h1>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {related.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
