import type { Product } from "@/types/products";
import { useMemo } from "react";

//useMemo trả về 1 giá trị để dùng trong lúc render
// // nhận 1 product thông qua props, không tự gọi useProduct() bên trong nó. Hero chỉ hiện thị không quan tâm dữ liệu tới từ đâu (cố định 5 sản phẩm rating cao nhất)
const Hero = ({ products }: { products: Product[] }) => {
    // chỉ tính lại giá trị này khi dependence thay đổi, các lần render sau dùng lại kết quả đã tính trước đó
    const topRated = useMemo(() => {
        return [...products].sort((a, b) => b.rating - a.rating).slice(0, 5); // tạo ra mảng bản sao mớirồi sort vì sort sẽ sửa trực tiếp mảng gốc , xếp theo rating cao nhất , cắt ra 5 sản phẩm !không dùng splice vì nó cũng sửa trực tiếp vào mảng
    }, [products]);
    if (topRated.length === 0) return null;

    const feature = topRated[0];
    return (
        // <div>
        //     <h1>{feature.title}</h1>
        //     <img src={feature.thumbnail} alt="" />
        // </div>
        <section className="border-b border-line bg-paper-dim">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-16 md:grid-cols-2">
                <div>
                    <h1 className="text-4xl font-bold text-ink">
                        {feature.title}
                    </h1>
                    <p className="mt-4 text-sm text-ink-muted">
                        {feature.description}
                    </p>
                    <p className="mt-4 text-lg font-semibold text-signal">
                        {feature.price}
                    </p>
                </div>
                <img
                    src={feature.thumbnail}
                    alt={feature.title}
                    className="bg-red-400 aspect-square w-full rounded-3xl object-cover"
                />
            </div>
        </section>
    );
};

export default Hero;
