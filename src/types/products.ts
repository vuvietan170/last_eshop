//khai bao mo to san pham co nhung truong du lieu gi
export type Product = {
    id: number;
    title: string;
    description: string;
    images: string[];
    thumbnail: string;
    price: number;
    discountPercentage: number;
    rating: number;
    category: string;
};
// Tách ra để lấy dữ liệu mà không cần đào sâu vào thằng Product
export type ProductDetailPage = {
    rating: number;
    comment: string;
    reviewerName: string;
};
