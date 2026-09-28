import { fetchAllProducts } from "@/api/products";
import type { Product } from "@/types/product";
import {
    createContext,
    useEffect,
    useState,
    useContext,
    type ReactNode,
} from "react";
//Tạo 1 hook để fetch dữ liệu , dùng được cho nhiều component , néu để mỗi component tự fetch riêng thì sẽ có 3-4 lần gọi APT giống hệt nhau
// một chút khác với phân trước là đây là hàm bát đồng bộ thay vì đồng bộ (dọc localStorage ngay lập tức)

// trường: mảng producct , isLoading, error
type ProductsContextValue = {
    products: Product[];
    isLoading: boolean;
    error: string | null;
    addProduct: (product: Omit<Product, "id" | "rating" | "reviews">) => void; // Omit để tạo 1 kiểu mới từ Product , bỏ một sô thuộc tính
    updateProduct: (product: Product) => void;
    deleteProduct: (id: number) => void;
};

const ProductsContext = createContext<ProductsContextValue | null>(null);

export function ProductsProvider({ children }: { children: ReactNode }) {
    // Khởi tạo các trạng thái
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true); // ngay khi component vừa xuát hiện thì việc fetch dữ liệu cũng bắt đầu chạy nên trạng thái đúng nhất lúc khởi tạo là true
    const [error, setError] = useState<string | null>(null);

    // thêm sản phẩm mới và set nó vào local
    function saveProduct(nextProduct: Product[]) {
        setProducts(nextProduct);
        localStorage.setItem("products", JSON.stringify(nextProduct));
    }
    //useEffect để thực hiện fetchdata
    useEffect(() => {
        fetchAllProducts()
            .then((data) => {
                const saveProduct = localStorage.getItem("products"); // lấy giá trị products
                setProducts(saveProduct ? JSON.parse(saveProduct) : data);
            }) // chạy khi Api tải thành công, lưu dữ liệu vào state
            .catch(() => setError("Không thể tải sản phẩm")) // lỗi sever, mất mạng... thì trả về
            .finally(() => setIsLoading(false)); //mặc định luôn chạy kể cả lỗi hay không (đang tải mà )
    }, []);

    function addProduct(product: Omit<Product, "id" | "rating" | "reviews">) {
        const nextId =
            //Khi thêm sp mới, tìm ra id lớn nhất, rồi +1 để ra id tiếp theo
            products.reduce(
                (lagerstId, currentProduct) =>
                    Math.max(lagerstId, currentProduct.id),
                0,
            ) + 1;
        saveProduct([
            ...products,
            {
                ...product,
                id: nextId,
                rating: 0,
                reviews: [],
            },
        ]);
    }

    function updateProduct(product: Product) {
        const nextProducts = products.map((currentProduct) =>
            currentProduct.id === product.id ? product : currentProduct,
        );
        saveProduct(nextProducts);
    }

    function deleteProduct(id: number) {
        const nextProducts = products.filter((product) => product.id !== id);
        saveProduct(nextProducts);
    }
    return (
        <ProductsContext.Provider
            value={{
                products,
                isLoading,
                error,
                addProduct,
                updateProduct,
                deleteProduct,
            }}
        >
            {children}
        </ProductsContext.Provider>
    );
}
export function useProducts() {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error("useProducts phải được dùng trong ProductsProvider!");
    }
    return context;
}
// bọc provider quanh app trong main.tsx
