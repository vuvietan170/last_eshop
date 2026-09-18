import { useCart } from "@/hooks/useCart";
import { getDiscountedPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/router/router";
import { ArrowLeft } from "lucide-react";
import { useOrders } from "@/hooks/useOrders";
export function CheckoutPage() {
    const { items, totalPrice, clearCart } = useCart();

    const { addOrder } = useOrders();
    function handlePlaceOrder() {
        addOrder(items, totalPrice);
        clearCart();
        navigate(`/orders`);
    }

    const { navigate } = useRouter();

    if (items.length === 0) {
        return (
            <p className="p-8 text-center text-ink-muted">
                Chưa có mặt hàng nào để tiến hành thanh toán
            </p>
        );
    }
    return (
        <div className="mx-auto max-w-2xl px-4 py-10">
            <div className="mb-8  ">
                <button
                    onClick={() => window.history.go(-1)}
                    className="flex items-center gap-2 hover:text-signal cursor-pointer text-md font-semibold"
                >
                    <ArrowLeft size={14} /> <span>Quay lại</span>
                </button>
            </div>
            <h1 className="text-xl font-bold text-ink mb-6">Thanh Toán</h1>

            <div className="space-y-3">
                {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                        <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="h-14 w-14 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                            <p className="text-sm text-ink">{item.title}</p>
                            <p className="text-xs text-ink-muted">
                                {item.quantity} × $
                                {getDiscountedPrice(
                                    item.price,
                                    item.discountPercentage,
                                ).toFixed(2)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-base font-semibold text-ink">
                <span>Tổng cộng:</span>
                <span>${totalPrice.toFixed(2)}</span>
            </div>
            <Button
                variant="primary"
                onClick={handlePlaceOrder}
                className="mt-6 w-full"
            >
                Đặt hàng
            </Button>
        </div>
    );
}
