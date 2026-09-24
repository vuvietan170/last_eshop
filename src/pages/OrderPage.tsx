import { useOrders } from "@/hooks/useOrders";
import { getDiscountedPrice } from "@/lib/utils";

export function OrderPage() {
    const { orders } = useOrders();

    if (orders.length === 0) {
        return (
            // vì nếu dùng h-screen thì sẽ ra chính giữa nhưng nó tính cả navbar nên vị trí không mong muốn
            <p className="flex items-center justify-center text-lg font-semibold text-ink-muted min-h-[calc(100vh-140px)]">
                Chưa mua đơn hàng nào.
            </p>
        );
    }

    return (
        <div className="mx-auto max-w-3xl px-4 py-10">
            <h1 className="mb-6 font-bold text-xl text-ink">
                Lịch sử mua hàng
            </h1>
            <div className="space-y-4">
                {orders.map((o) => (
                    <div
                        key={o.id}
                        className="rounded-2xl border border-line p-4"
                    >
                        <div className=" flex mb-3 items-center justify-center text-xs text-ink-muted gap-2">
                            <span>
                                {new Date(o.createdAt).toLocaleString("vi-VN")}
                            </span>
                            <span className="font-semibold text-ink">
                                ${o.total.toFixed(2)}
                            </span>
                        </div>
                        <div className="space-y-2">
                            {o.items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-3"
                                >
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className="h-10 w-10 rounded-lg object-cover"
                                    />
                                    <div className="flex-1 text-sm text-ink">
                                        {item.title}
                                        <span className="text-ink-muted">
                                            {" "}
                                            ({item.quantity} × $
                                            {getDiscountedPrice(
                                                item.price,
                                                item.discountPercentage,
                                            ).toFixed(2)}
                                            )
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
