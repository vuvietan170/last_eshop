import { getDiscountedPrice } from "@/lib/utils";
import type { CartItem } from "@/types/cart";
import type { Product } from "@/types/product";
import { createContext, useContext, useState, type ReactNode } from "react";

type CartContextValue = {
    items: CartItem[];
    addItem: (product: Product) => void;
    totalItems: number;
    totalPrice: number;
};
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    function addItem(product: Product) {
        setItems((previous) => {
            const existing = previous.find((item) => item.id === product.id); // kiểm tra xem sản phẩm có tồn tại không
            //có thì map render ra
            if (existing) {
                return previous.map(
                    (item) =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + 1 } // tạo 1 object mới từ item, tăng chỉ số quantity lên 1. cấu trúc: object mới và thông tin thêm vào
                            : item, // không trùng id thì giữ nguyên
                );
            }
            //thêm 1 sản phẩm mới vào cuối giỏ hàng
            return [
                ...previous,
                {
                    id: product.id,
                    title: product.title,
                    thumbnail: product.thumbnail,
                    price: product.price,
                    discountPercentage: product.discountPercentage,
                    quantity: 1, // sản phẩm chưa có trong giỏ hàng sẽ được thêm vào với số lượng = 1
                },
            ];
        });
    }
    // tông số Item
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0); // nó sẽ cộng tổng từng item 1 với giá trị khởi tạo là 0
    const totalPrice = items.reduce(
        (sum, item) =>
            sum +
            getDiscountedPrice(item.price, item.discountPercentage) *
                item.quantity,
        0, // tức là nó sẽ lấy 0 + với từng tổng giá của mỗi loại sản phẩm 1, xong rồi cộng chồng vào tiếp
    );
    return (
        <CartContext.Provider
            value={{ items, addItem, totalItems, totalPrice }}
        >
            {children}
        </CartContext.Provider>
    );
}
export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart phải được dùng trong useProvider");
    }
    return context;
}
