import { useAuth } from "@/hooks/useAuthContext";
import { useRouter } from "@/router/router";
import React, { useState } from "react";

export function LoginPage() {
    const { login } = useAuth();
    const { navigate } = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");

        try {
            await login(email, password);
            navigate("/seller");
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Đăng nhập không thành công",
            );
        }
    }

    return (
        <div className=" flex items-center justify-center mt-80">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center items-center  space-y-8"
            >
                <input
                    className="border h-12 w-90"
                    placeholder="Nhập email..."
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="border h-12 w-90"
                    placeholder="Nhập mật khẩu..."
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p className="text-red-500">{error}</p>}

                <button
                    type="submit"
                    className="bg-green-500 border border-2xl w-full h-14 hover:bg-green-400 "
                >
                    Đăng Nhập
                </button>
            </form>
        </div>
    );
}
