import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

// //Khởi tạo trạng thái đầu tiên của theme
// // Hàm trả về giá trị boolean, true nếu theme là dark
// function getInitialTheme(): boolean {
//     return localStorage.getItem("theme") === "dark"; // dọc giá trị khởi tạo theme trên máy người dùng, tức là cái biến theme này nó chẳng liên quan gì , để thành cứt cũng được, mục đích là để đọc giá trị
// }
const Navbar = () => {
    // // set trạng thái
    // const [isDark, setIsDark] = useState(getInitialTheme); // sẽ lấy luôn giá trị khởi tạo của theme trước đó
    // // nối isDark với class .dark trên html
    // useEffect(() => {
    //     document.documentElement.classList.toggle("dark", isDark); // nếu có isDark thì thêm class dark vào nếu không thì gỡ class dark ra
    //     localStorage.setItem("theme", isDark ? "dark" : "light"); // set giá trị thằng theme này vào biến nhớ tạm thời với cặp giá trị key là theme, còn value là dark hoặc light
    // }, [isDark]);
    const { isDark, toggleTheme } = useTheme();
    return (
        <header className="h-16 border-b border-line bg-surface">
            <div className="flex mx-auto items-center h-full max-w-7xl px-4">
                <div className="text-lg font-bold text-ink">
                    ESHOP<span className="text-signal">.</span>
                </div>

                <div className="relative flex-1 px-6">
                    <input
                        placeholder="Tìm sản phẩm..."
                        className="h-10 border w-full rounded-full px-4 max-w-md border-line bg-paper text-sm text-ink outline-none placeholder:text-ink-none-muted"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => toggleTheme()}
                    >
                        {isDark ? <Moon size={18} /> : <Sun size={18} />}
                    </Button>
                    <Button variant="outline" size="icon">
                        <ShoppingBag size={18}></ShoppingBag>
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
