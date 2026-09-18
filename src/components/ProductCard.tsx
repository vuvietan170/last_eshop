import { useProducts } from "@/hooks/useProducts";
import { getDiscountedPrice } from "@/lib/utils";
import { useRouter } from "@/router/router";
import type { Product } from "@/types/product";
import { Button } from "./ui/button";
import { RatingStar } from "./RatingStar";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/useToast";
import { ShoppingBag } from "lucide-react";
import type React from "react";

export const ProductCard = ({ product }: { product: Product }) => {
    const haveDisconut = product.discountPercentage > 0; //kiểm tra xem có mã giảm giá không
    const finalPrice = getDiscountedPrice(
        product.price,
        product.discountPercentage,
    ); //dùng hàm tính giá trị sau khi giảm ở util.ts
    const { navigate } = useRouter();

    //thêm nút mua trên giỏ hàng, thôg báo
    const { addItem, openCart } = useCart(); // khi add item thi open cart
    const { showToast } = useToast();

    const handleBuy = (e: React.MouseEvent) => {
        e.preventDefault();
        addItem(product);
        openCart();
        showToast(`Đã thêm ${product.title} vào giỏ hàng`); // thật ra có thể bỏ đi và thay bằng "đã thêm vào gio hàng" cx đc nhưng cái này thì biết chính xác sp nào hơn
    };
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
                        <span className="text-sm line-through text-ink-muted">
                            ${product.price.toFixed(2)}
                            {/* làm tròn 2 chữ số */}
                        </span>
                    )}
                </div>
                <div>
                    <RatingStar rating={product.rating} />
                </div>
                <div className="mt-3 flex items-center gap-2">
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => navigate(`/product/${product.id}`)}
                    >
                        Xem chi tiết
                    </Button>
                    <Button
                        type="button"
                        variant="primary"
                        size="icon"
                        onClick={handleBuy}
                    >
                        <ShoppingBag size={16} />
                    </Button>
                </div>
            </div>
        </div>
    );
};
