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
        return window.removeEventListener("popstate", handlePopState);
    }, []);
    // gửi chuỗi đi
    function navigate(to: string) {
        window.history.pushState({}, "", to); // thêm url mới mà không reload lại trang
        setPath(to); //
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
