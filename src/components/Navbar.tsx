import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun, ShoppingBag } from "lucide-react";
import { useEffect, useRef, useState } from "react";
//filter và map đều là duyệt qua từng phần,filter: là lấy ra các phần tử phù hợp, map là lấy tất cả các phần tử

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

    //search query
    const { products } = useProducts(); //lấy dữ liệu products
    const [query, setQuery] = useState(""); // trạng thái query cho ô input
    //lọc tìm kiếm : tán tử 3 ngôi nếu query sau khi bỏ khoảng trống không rỗng thì ...
    const results = query.trim()
        ? products.filter((product) =>
              product.title.toLowerCase().includes(query.toLowerCase()),
          )
        : [];

    //click ra ngoài thì tự ẩn danh sách gợi ý search đi:sử dụng trạng thái isOpen và useRef
    // useRef sẽ trỏ thẳng tới đúng thẻ div trong DOM đó
    const [isOpen, setIsOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null); // HTMLDivElement cho biết ref này sẽ được gắn vào một thẻ div , useRef sẽ tạo ra 1 Object có dạng {current: null}

    useEffect(() => {
        // hàm xác định xem phần tử DOM đã tồn tại chưa và phần tử vừa click vào có nằm bên trong DOM hay không
        function handleClickOutside(e: MouseEvent) {
            // e.target as Node là type assertion(ép kiểu), nó sẽ báo cho TS là đây là kiểu dữ liệu Node mà thằng contains cần
            if (
                searchRef.current &&
                !searchRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside); // mỗi khi bấm chuột(xảy ra bất cứ ở đâu trên trang-document) thì sẽ chạy hàm clickoutside
        return () =>
            document.removeEventListener("mousedown", handleClickOutside); // sau đó xóa đi không gọi clickoutside mỗi khi bấm chuôt nữa
    }, []);

    return (
        <header className="h-16 border-b border-line bg-surface">
            <div className="flex mx-auto items-center h-full max-w-7xl px-4">
                <div className="text-lg font-bold text-ink">
                    ESHOP<span className="text-signal">.</span>
                </div>
                {/* Tham chiếu trực tiếp ref vào div. Khi React render xong searchRef.current sẽ trỏ thẳng tới đúng thẻ div trong DOM thật*/}
                <div ref={searchRef} className="relative flex-1 px-6">
                    <input
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setIsOpen(true);
                        }}
                        // value query khiên cho ô input thành controlled tức là chỉ nhận giá trị từ state query,
                        // nếu không có Onchange cập nhật lại giá trị thì thanh ipnut sẽ mãi đứng, vòng lặp sẽ liên tục cập nhật lại state mỗi khi ta gõ/xóa 1 kí tự gì đó
                       
                        onFocus={() => setIsOpen(true)} // khi người dùng click lại thì hiện lại 
                        placeholder="Tìm sản phẩm..."
                        className="h-10 border w-full rounded-full px-4 max-w-md border-line bg-paper text-sm text-ink outline-none placeholder:text-ink-muted"
                    />
                    {isOpen && results.length > 0 && (
                        <div className="absolute left-6 right-6 top-12 max-w-md overflow-hidden rounded-2xl border border-line bg-surface shadow-lg ">
                            {results.map((result) => (
                                <div
                                    key={result.id}
                                    className="flex items-center gap-3 border-b border-line p-3 text-left last:border-0 "
                                >
                                    {/* last:border-0 : phần tử cuối không có border */}
                                    <img
                                        src={result.thumbnail}
                                        className="h-10 w-10 bg-red-300 rounded-lg object-cover"
                                    />
                                    <p className="line-champ-1 text-sm text-ink">
                                        {/* line-champ-1: giới hạn chỉ ghi trên 1 dòng */}
                                        {result.title}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
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
