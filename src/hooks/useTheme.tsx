// nâng darkMode nên thành context ThemeProvider + useTheme

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

// useContext được hiểu đơn giản như là cục phát wifi dữ liệu, nó giúp cho component ở bất cứ tầng nào cũng có thể bắt sóng(nhận được dữ liệu mà không cần phải truyền qua từng tầng khác nhau)
// createContext là tạo ra 1 kênh dùng chung dữ liệu (const ThemeContext = createContext(false)),
//  Provider để bọc và gửi giá trị đi <ThemeContext.Provider value={isDark}> <Page/> </ThemeContext.Provider> toàn bộ các thứ bên trong đều sẽ nhận được dữ liệu
// const isDark = useContext(ThemeContext) để dùng bắt sóng dữ liệu

//Hầu hết các hook này dược dùng cho dữ liệu mang tính toàn cục mà nhiều nơi trong ứng dụng cần truy cập

type ThemeContextValue = {
    isDark: boolean;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue>({
    isDark: false,
    toggleTheme: () => {},
});

function getInitialTheme() {
    return localStorage.getItem("theme") === "dark"; //đọc giá trị từ value của theme xem có phải là dark không
}

// children là kiểu dữ liệu bất kì
export function ThemeProvider({ children }: { children: ReactNode }) {
    const [isDark, setIsDark] = useState(getInitialTheme);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDark); // true thì thêm class dark, không thì bỏ ra
        localStorage.setItem("theme", isDark ? "dark" : "light"); //set cặp key-val ,theme và dark hoặc light
    }, [isDark]);

    //hàm toggletTheme (chuyển đổi)
    // Bất cứ hàm nào giá trị State mới phụ thuộc vào giá trị state cũ (tăng giảm, true flase, thêm vào mảng) thì nên dùng callback
    const toggleTheme = () => {
        setIsDark((previous) => !previous);
    };

    // bọc để gửi object dữ liệu đi, hàm truyền đi isDark và toggleTheme, chilren đại diện cho tất cả những gì bọc trong provider (thuòng sẽ dùng trong file app.tsx)
    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

//custom hook giúp lấy dữ liệu giao diện
export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme phải được dùng bên trong ThemmeProvider");
    }
    return context;
}

// bọc quanh app (đây là lớp ngoài cùng ) trong main.tsx
