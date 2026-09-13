import type { Product } from "@/types/product";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useMemo, useState } from "react";

//useMemo trả về 1 giá trị để dùng trong lúc render
// // nhận 1 product thông qua props, không tự gọi useProduct() bên trong nó. Hero chỉ hiện thị không quan tâm dữ liệu tới từ đâu (cố định 5 sản phẩm rating cao nhất)
const Hero = ({ products }: { products: Product[] }) => {
    // chỉ tính lại giá trị này khi dependence thay đổi, các lần render sau dùng lại kết quả đã tính trước đó
    // LƯU Ý : Không thực hiện các hành động như gọi API, thay đổi DOM trong useMemo vì nó chạy ngay trong lúc render rồi
    const topRated = useMemo(() => {
        return [...products].sort((a, b) => b.rating - a.rating).slice(0, 5); // tạo ra mảng bản sao rồi mới sort vì sort sẽ sửa trực tiếp mảng gốc , xếp theo rating cao nhất , cắt ra 5 sản phẩm !không dùng splice vì nó cũng sửa trực tiếp vào mảng
    }, [products]);

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }); // emblaRef gần giống như useRef ở phần search:căn đúng thẻ bọc ngoài các slide như <div ref={useRef}>,
    //  còn emblaApi là object chứa các hàm điều khiển carosel như scrollTo() scrollNext()
    const [selected, setSelected] = useState(0);

    // hàm theo dõi slide hiện tại và cập nhật selected, react sẽ không tạo lại function này mỗi lần render trừ khi emblaApi thay đổi
    const onSelect = useCallback(() => {
        if (!emblaApi) return; // kiểm tra embla đã được khỏi tạo chưa
        setSelected(emblaApi.selectedScrollSnap()); //emblaApi.selectedScrollSnap() hàm đọc chỉ số index của slide đang hiển thị hiện tại (0,1,2,..) dùng để cập nhật selected từ đó feature = topRated[selectec] sẽ đổi đúng ảnh và chư đang hiển thị trong carosel
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return; // kiểm tra embla đã khởi tạo chưa
        emblaApi.on("select", onSelect); // cú pháp select là sự kiện của Embla tự bắn ra slide mỗi khi slide đang hiển thị thay đổi(kéo vuốt,...)
        return () => {
            emblaApi.off("select", onSelect); // on off cũng giống như addEventListener và removeEL đều là đăng kí sự kiện và dọn dẹp tránh bị listener chồng chất lên nhau
        };
    }, [emblaApi, onSelect]);
    //tính năng trượt tự động
    useEffect(() => {
        if (!emblaApi) return;
        //setInterval là hàm có sẵn của JS nhận vào 1 hàm và 1 khoảng thời gian rồi lặp lại việc đó mỗi khi hết thời gian
        const intervalId = setInterval(() => {
            emblaApi.scrollNext();
        }, 3500);
        return () => clearInterval(intervalId);
    }, [emblaApi]);

    if (topRated.length === 0) return null;

    const feature = topRated[selected];

    return (
        // <div>
        //     <h1>{feature.title}</h1>
        //     <img src={feature.thumbnail} alt="" />
        // </div>
        <section className="border-b border-line bg-paper-dim">
            <div className="mx-auto items-center justify-center grid max-w-7xl grid-cols-1 gap-10 px-4 py-16 md:grid-cols-2">
                <div>
                    <h1 className="text-4xl font-bold text-ink">
                        {feature.title}
                    </h1>
                    <p className="mt-4 text-sm text-ink-muted">
                        {feature.description}
                    </p>
                    <p className="mt-4 text-lg font-semibold text-signal">
                        ${feature.price}
                    </p>
                </div>
                <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
                    <div className="flex">
                        {topRated.map((product) => (
                            <img
                                key={product.id}
                                src={product.thumbnail}
                                alt={product.title}
                                className="aspect-square w-full min-w-0 flex-[0_0_100%] rounded-3xl object-cover" //min-w-0 flex-[0_0_100%]: min cho phép phần tử co về đúng flex-basic đã khai, không ép nội dung rộng thêm, flex làm cho các ảnh ko co không giãn, chièu rộng 100% của khung chứa, khiến cho ảnh chiếm trọn khung carosel mà không bị lấn sang ảnh khác
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
