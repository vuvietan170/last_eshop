import type { User } from "@/types/user";
import React, {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

// Trạng thái user, login logout
type AuthContextValue = {
    user: User | null;
    login: (email: string, password: string) => Promise<void>; //trả về promise()
    logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState(() => {
        // đọc dữ liệu đã được lưu trong user, nếu dữ liệu tồn tại thì chuyển chuỗi JSON trả về 1 object
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    async function login(email: string, password: string) {
        //cơ chế hoạt động: hàm login sẽ thực hiện yêu cầu gửi request đi và thằng backend nhận và xử lý thông tin xác thực đăng nhập(tức là tôi ở đây sẽ là 1 hành động Post đúng không nhề?) thằng post gửi dữ liệu vào thân(Body resquest), thằng get thì làm lộ thông tin ngay trên dường dẫn url
        if (email === "seller@gmail.com" && password === "123456789") {
            const seller: User = {
                id: 1,
                email,
                role: "seller",
                name: "Seller",
            };

            // set vào localStorage (Thằng local nhận dữ liệu dưới 1 dạng key : value kiểu dữ liệu là JSON nên đưa 1 obj vào local thì phải convert nó sang JSON)
            localStorage.setItem("user", JSON.stringify(seller));
            setUser(seller);
            return;
        }
        throw new Error("Sai thông tin đăng nhập");
    }

    // xóa thằng user ra khỏi local rồi set trạng thái null
    function logout() {
        localStorage.removeItem("user");
        setUser(null);
    }
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth phải được dùng bên trong AuthProvier");
    }
    return ctx;
}
