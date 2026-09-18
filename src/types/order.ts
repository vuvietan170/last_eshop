import type { CartItem } from "./cart";

export type Order = {
    id: string;
    total: number;
    creatAt: string;
    items: CartItem[];
};
