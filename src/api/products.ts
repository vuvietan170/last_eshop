import axios from "axios"
import type { Product } from "@/types/products"
// ham tra ve 1 promise, khi promise hoan thanh se tra ve mang 
export async function fetchAllProducts(): Promise<Product[]> {
    const reponse = await axios.get("https://dummyjson.com/products")
    return reponse.data.products;
}