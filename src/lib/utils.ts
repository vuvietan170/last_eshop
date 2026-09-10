import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getDiscountedPrice(price: number, discountPercentage: number) {
    return price * (1 - discountPercentage / 100);
}
