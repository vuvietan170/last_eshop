import axios from "axios";
import type { Product } from "@/types/products";
// ham tra ve 1 promise, khi promise hoan thanh se tra ve mang
// thằng promise sẽ khẳng định mảng lấy từ API về sẽ có cấu trúc khớp với khuân mẫu Product, nếu sever trả về dữ liệu bị thiếu trường hoặc sai định dạng , js vẫn sẽ nhận nguyên văn dữ liệu đó chứ không điều chỉnh lại cho đúng mẫu Product
export async function fetchAllProducts(): Promise<Product[]> {
    await new Promise((resolve) => setTimeout(resolve, 1000)); //settimeout cho gia giong du lieu thuc
    const response = await axios.get("https://dummyjson.com/products"); // get request gửi yêu cầu lấy dữ liệu, hàm await sẽ chờ cho đến khi dữ liệu được lấy xong
    return response.data.products; // Axios tự động gom dữ liệu nhận được vào thuộc tính data, Dummy json trả về 1 object dạng {products: [] ,total:100,...}
    //đây là thao tác truy cập vào thuộc tính products bên trong object data để rút ra đúng mảng chứa danh sách sản phẩm
}
