// Hiển thị thông báo đã thêm vào giỏ hàng ở bất kì đâu trên trang web, Tạo Toast -> hiển thị -> tự động xóa sau 2 giây

import { createContext, useContext, useState, type ReactNode } from "react";

type ToastItem = { id: number; message: string };
type ToastContextValue = {
    showToast: (message: string) => void;
};

// create context
const ToastContext = createContext<ToastContextValue | null>(null);

let nextId = 1; // đây là id riêng cho mỗi toast, mỗi toast sẽ có 1 id riêng để cho biết toast nào cần xóa
export function ToastProvider({ children }: { children: ReactNode }) {
    const [toast, setToast] = useState<ToastItem[]>([]);

    // Vd: showToast("hello")-> tạo id =1 -> thêm {id : 1, message:Hello} -> Render Toast trong 2.5s-> filter(t=> t.id !== id) -> xóa id có phần tử là 1 -> render lại (toast biên mất)
    function showToast(message: string) {
        const id = nextId++; // tạo id cho mỗi toast tránh trùng lặp , mỗi toast có timer riêng nếu bị gọi lệch thời gian
        setToast((prev) => [...prev, { id, message }]); // thêm toast(id và message) vào mảng
        setTimeout(() => {
            setToast((prev) => prev.filter((t) => t.id !== id)); // filter tạo mảng mới
        }, 2000); // xóa toast sau 2.5s, nếu id trùng v
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed h-30 right-4 bottom-20 z-[100] flex flex-col gap-2">
                {toast.map((t) => (
                    <div
                        key={t.id}
                        className="animate-in fade-in slide-in-from-right-4 rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink shadow-lg"
                    >
                        {t.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast phải được dùng bên trong ToastProvider");
    }
    return context;
}
