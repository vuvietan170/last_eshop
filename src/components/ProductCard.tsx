import { useProducts } from "@/hooks/useProducts";
import { getDiscountedPrice } from "@/lib/utils";
import { useRouter } from "@/router/router";
import type { Product } from "@/types/product";
import { Button } from "./ui/button";

export const ProductCard = ({ product }: { product: Product }) => {
    const haveDisconut = product.discountPercentage > 0; //kiểm tra xem có mã giảm giá không
    const finalPrice = getDiscountedPrice(
        product.price,
        product.discountPercentage,
    ); //dùng hàm tính giá trị sau khi giảm ở util.ts
    const { navigate } = useRouter();

    return (
        <div className="overflow-hidden rounded-2xl border border-line bg-surface">
            <img
                src={product.thumbnail}
                alt={product.title}
                className="aspect-square w-full object-cover"
            />
            <div className="p-4">
                <h3 className="line-clamp-2 text-sm font-medium text-ink">
                    {product.title}
                </h3>
                <div className="mt-2 flex items-center gap-2">
                    <span className=" text-base font-semibold text-ink">
                        ${finalPrice.toFixed(2)}
                    </span>
                    {haveDisconut && (
                        <span className="text-sm line-through text-ink">
                            ${product.price.toFixed(2)}
                            {/* làm tròn 2 chữ số */}
                        </span>
                    )}
                </div>
                <Button
                    variant="outline"
                    className="mt-3 w-full"
                    onClick={() => navigate(`/product/${product.id}`)}
                >
                    Xem chi tiết
                </Button>
            </div>
        </div>
    );
};
