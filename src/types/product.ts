//khai bao mo to san pham co nhung truong du lieu gi

// type Product
// type ProductDetailPage = Exclude<Product>
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
    reviews: ProductReview[];
};

// Tách ra để lấy dữ liệu mà không cần đào sâu vào thằng Product
export type ProductReview = {
    rating: number;
    comment: string;
    reviewerName: string;
}