import { useTheme } from "@/hooks/useTheme";
import {
    createContext,
    use,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

type RouterContextValue = {
    path: string;
    navigate: (to: string) => void;
};

const RouterContext = createContext<RouterContextValue | null>(null);

export function RouterProvider({ children }: { children: ReactNode }) {
    const [path, setPath] = useState(window.location.pathname); //lấy đường dẫn hiện tại

    useEffect(() => {
        function handlePopState() {
            setPath(window.location.pathname);
        }
        window.addEventListener("popstate", handlePopState); // popstate là trạng thái khi back và foward
        return () => window.removeEventListener("popstate", handlePopState);
    }, []);
    // gửi chuỗi đi
    function navigate(to: string) {
        window.history.pushState({}, "", to); // thêm url mới mà không reload lại trang
        setPath(to); // lý do phải setPath là pushState chỉ thay đổi url trên trình duyệt chứ không làm react render lại, nên lúc copy sẽ có thể bị lỗi lúc chia sẻ đường dẫn
    }
    return (
        <RouterContext.Provider value={{ path, navigate }}>
            {children}
        </RouterContext.Provider>
    );
}
export function useRouter() {
    const context = useContext(RouterContext);
    if (!context) {
        throw new Error("useRouter phải được dùng bên trong RouterPorvider");
    }
    return context;
}

//Hàm khớp router dạng pattern: /product/:id và path: /product/5 cần nhận ra đây là khớp và trả ra id là 5
export function matchRoute(
    pattern: string,
    path: string,
): Record<string, string> | null {
    // Record được hiểu là kiểu dứ liệu sẽ trả về 1 object dang [key: string] string ví dụ id: "123"
    const patternParts = pattern.split("/").filter(Boolean); // tách chuỗi theo dấu /, và filter(Boolean) để loại bỏ khoảng trắng
    const pathParts = path.split("/").filter(Boolean);

    if (patternParts.length !== pathParts.length) return null; // kiểm tra xem số phần tử có bằng nhau không patternParts = ["users", ":id"]; pathParts = ["users", "123"]
    // mô tả theo dạng param vì không biết trước route sẽ có bao nhiêu tham số động , tên gì
    const params: Record<string, string> | null = {};

    for (let i = 0; i < patternParts.length; i++) {
        const part = patternParts[i];
        const value = pathParts[i];

        if (part.startsWith(":")) {
            params[part.slice(1)] = value; //cắt đi kí tự : chỉ giữu lại id và gán nó bằng với 1 string value
        } else if (part !== value) {
            return null;
        }
    }
    return params;
}
