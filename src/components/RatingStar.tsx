// sử dung kĩ thuật xếp đè 2 lớp lên nhau, lớp vàng năm trên được bọc bởi 1 div có overflow là hidden và tỉ lệ with đúng bằng % đánh giá (đã quy ở phần const percentage)
import { Star } from "lucide-react";
// đây là hàm chỉ chịu trách nghiệm vẽ, không nhận dữ liệu, phần dữ liệu sẽ truyền vào bởi 1 thằng khác, vì trong hệ thống càng phân chia rõ ràng tránh lấy api nhiêu thì càng tốt
export const RatingStar = ({ rating }: { rating: number }) => {
    //tính phần trăm vd quy 3.6 => 72%
    const percentage = (rating / 5) * 100;

    return (
        <div className="flex items-center gap-1.5 text-sm text-ink-muted">
            <div className="relative inline-flex">
                <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="fill-gray-100" /> //Star xám rỗng
                    ))}
                </div>
                <div
                    className="absolute top-0 left-0 h-full overflow-hidden"
                    style={{ width: `${percentage}%` }} // Rộng theo %
                >
                    <div className="flex min-w-max gap-0.5 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={14}
                                className="fill-amber-300"
                            /> // Tô màu star trong với fill-amber
                        ))}
                    </div>
                </div>
            </div>
            <span className="font-medium">{rating.toFixed(1)}</span>
        </div>
    );
};
