import useEmblaCarousel from "embla-carousel-react";
import { use, useEffect } from "react";

const ImageCarousel = ({ images, alt }: { images: string[]; alt: string }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }); //emblaRef căn thẻ bọc ngoài, emblaApi là đối tượng chứa các hàm điều khiển

    useEffect(() => {
        if (!emblaApi || images.length <= 1) {
            return;
        }
        const intervalId = setInterval(() => {
            emblaApi.scrollNext();
        }, 3500);
        return () => clearInterval(intervalId); // dừng autoplay khi không còn cần nữa
    }, [emblaApi, images.length]);
    return (
        <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
            <div className="flex">
                {/* vì các ảnh ở đây không có id nên các sẽ lấy các src khác nhau để làm key chỉ cầ src khác thì key vẫn đảm bảo tính duy nhất */}
                {images.map((src, index) => (
                    <img
                        key={src}
                        src={src}
                        alt={`${alt} ${index + 1}`}
                        className="aspect-square w-full min-w-0 flex-[0_0_100%] object-cover"
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageCarousel;
