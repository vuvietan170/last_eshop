//Roll của khách hàng với người bán
export type UserRole = "client" | "seller";

export type User = {
    name: string;
    role: UserRole;
    id: number;
    email: string;
};
