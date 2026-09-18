import type { CartItem } from "./cart";

export type Order = {
    id: string;
    total: number;
    createdAt: string;
    items: CartItem[];
};
