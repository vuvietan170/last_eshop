import type { CartItem } from "@/types/cart";
import type { Order } from "@/types/order";
import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

type OrderContextValue = {
    orders: Order[]; // một mảng chứa nhiều order
    addOrder: (items: CartItem[], total: number) => void;
};

const OrdersContext = createContext<OrderContextValue | null>(null);

// lấy danh sách đơn hàng đã lưu trong localStorage khi app khởi động
function getInitalOrders(): Order[] {
    try {
        const saved = localStorage.getItem("orders"); // lấy dữ liệu có key là orders
        return saved ? JSON.parse(saved) : []; // nếu có nó chuyên string Json thành JS object
    } catch {
        return [];
    }
}
export function OrdersProvider({ children }: { children: ReactNode }) {
    const [orders, setOrders] = useState<Order[]>(getInitalOrders);

    useEffect(() => {
        localStorage.setItem("orders", JSON.stringify(orders)); // chuyển string về object
    }, [orders]);
    function addOrder(items: CartItem[], total: number) {
        //tạo 1 order mới : 1 obj có có kiểu dữ liệu như trong ngoặc {}
        const newOrder: Order = {
            id: crypto.randomUUID(), // tạo ra 1 id ngẫu nhiên gần như không thể trùng lặp
            items,
            total,
            createdAt: new Date().toISOString(), // tạo ra thời điểm hiện tại. tostring đổi thành 1 chuỗi vì localStorage không lưu được object Data trực tiếp
        };
        setOrders((prev) => [newOrder, ...prev]); // nhét cái order mới lên đầu
    }
    return (
        <OrdersContext.Provider value={{ orders, addOrder }}>
            {children}
        </OrdersContext.Provider>
    );
}
export function useOrders() {
    const context = useContext(OrdersContext);
    if (!context) {
        throw new Error("useOrders phải được bọc trong OrdersProvider");
    }
    return context;
}
