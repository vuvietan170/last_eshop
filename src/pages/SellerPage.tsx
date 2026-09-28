import { useAuth } from "@/hooks/useAuth";
import { useProducts } from "@/hooks/useProducts";
import { useRouter } from "@/router/router";
import type { Product } from "@/types/product";
import { useState, type FormEvent } from "react";

// them san pham theo 1 form
type ProductForm = {
    title: string;
    price: string;
    category: string;
    description: string;
    thumbnail: string;
};

const emptyForm: ProductForm = {
    title: "",
    price: "",
    category: "",
    description: "",
    thumbnail: "",
};

function getFormValues(product: Product): ProductForm {
    return {
        title: product.title,
        price: String(product.price),
        category: product.category,
        description: product.description,
        thumbnail: product.thumbnail,
    };
}

export function SellerPage() {
    const { user, logout } = useAuth();

    const { navigate } = useRouter();

    const {
        products,
        isLoading,
        error,
        updateProduct,
        addProduct,
        deleteProduct,
    } = useProducts();

    const [form, setForm] = useState<ProductForm>(emptyForm);
    const [editingId, setEditingId] = useState<number | null>(null);

    function resetForm() {
        setForm(emptyForm);
        setEditingId(null);
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const title = form.title.trim();
        const category = form.category.trim();
        const description = form.description.trim();
        const thumbnail = form.thumbnail.trim();
        const price = Number(form.price);

        if (!title || !category || !description || !thumbnail || price <= 0) {
            return;
        }
        const productData = {
            title,
            price,
            category,
            description,
            thumbnail,
            images: [thumbnail],
            discountPercentage: 0,
        };

        if (editingId === null) {
            addProduct(productData);
        } else {
            const currentProduct = products.find((p) => p.id === editingId);
            if (currentProduct) {
                updateProduct({ ...currentProduct, ...productData });
            }
        }

        resetForm();
    }

    function startEditing(product: Product) {
        setEditingId(product.id);
        setForm(getFormValues(product));

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    function handleDelete(product: Product) {
        const confirm = window.confirm(
            `Bạn có chắc muốn xóa ${product.title} không? `,
        );
        if (confirm) {
            deleteProduct(product.id);
        }
    }
    return (
        <div className="min-h-screen bg-paper px-4 py-8 text-ink-muted sm:px-8">
            <div className="mx-auto max-w-7xl">
                <header className="mb-8">
                    <div className="mt-4 flex gap-3 mb-4">
                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="rounded-lg border border-line px-4 py-2 hover:bg-paper-dim"
                        >
                            Quay lại
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                logout();
                                navigate("/login");
                            }}
                            className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                        >
                            Đăng xuất
                        </button>
                    </div>

                    <p className="text-sm text-ink-muted">Seller DashBoard</p>
                    <h1 className="text-3xl font-bold">Quản lý sản phẩm</h1>
                    <p className="mt-2 text-ink-muted">
                        {user?.name}. Email: {user?.email}
                    </p>
                </header>
                {/* Cột 1 chứa 360px cột còn lại chiếm tất cả */}
                <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
                    <form
                        onSubmit={handleSubmit}
                        //h-fit cho chieu cao vua voi noi dung ben trong
                        className="h-fit space-y-4 rounded-2xl border border-line bg-surface p-5"
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold">
                                {editingId === null
                                    ? "Thêm sản phẩm"
                                    : "Sửa sản phẩm"}
                            </h2>
                            {editingId !== null && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="text-sm text-signal"
                                >
                                    Hủy sửa
                                </button>
                            )}
                        </div>
                        <input
                            required
                            value={form.title}
                            onChange={(e) =>
                                setForm({ ...form, title: e.target.value })
                            }
                            placeholder="Nhập tên sản phẩm..."
                            className="h-11 w-full rounded-lg border border-line bg-paper p-3"
                        />

                        <input
                            required
                            type="number"
                            min="0.01"
                            step="0.01"
                            value={form.price}
                            onChange={(e) =>
                                setForm({ ...form, price: e.target.value })
                            }
                            placeholder="Nhập giá"
                            className="h-11 w-full rounded-lg border border-line bg-paper p-3"
                        />

                        <input
                            required
                            value={form.category}
                            onChange={(e) =>
                                setForm({ ...form, category: e.target.value })
                            }
                            placeholder="Danh mục..."
                            className="h-11 w-full rounded-lg border border-line bg-paper p-3"
                        />

                        <input
                            required
                            value={form.thumbnail}
                            type="url"
                            onChange={(e) =>
                                setForm({ ...form, thumbnail: e.target.value })
                            }
                            placeholder="Link ảnh..."
                            className="h-11 w-full rounded-lg border border-line bg-paper p-3"
                        />

                        <textarea
                            required
                            value={form.description}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    description: e.target.value,
                                })
                            }
                            // chieu cao ma moi dong hien thi
                            rows={5}
                            placeholder="Mô tả sản phẩm"
                            className="w-full rounded-lg border border-line bg-paper px-3 py-2"
                        />
                        <button
                            type="submit"
                            className="h-11 w-full rounded-lg bg-signal text-white hover:opacity-90"
                        >
                            {editingId === null
                                ? "Thêm sản phẩm"
                                : "Lưu thay đổi"}
                        </button>
                    </form>
                    <section>
                        <h2 className="mb-4 text-xl font-semibold">
                            {" "}
                            Danh sách sản phẩm ({products.length})
                        </h2>
                        {isLoading && (
                            <p className="text-ink-muted">
                                Đang tải sản phẩm...
                            </p>
                        )}
                        {error && <p className="text-red-500">{error}</p>}

                        {!isLoading && !error && (
                            <div className="overflow-hidden rounded-2xl border border-line bg-surface ">
                                {products.map((product) => (
                                    <article
                                        key={product.id}
                                        className="flex flex-col gap-4 border-b border-line p-4 last:border-0 sm:flex-row sm:items-center"
                                    >
                                        <img
                                            src={product.thumbnail}
                                            alt={product.title}
                                            className="h-20 w-20 rounded-lg object-cover"
                                        />
                                        <div className="min-w-0 flex-1">
                                            {/* cat chu neu noi dung qua dai */}
                                            <h3 className="truncate font-semibold">
                                                {product.title}
                                            </h3>
                                            <p className="text-sm text-ink-muted">
                                                {product.category} · $
                                                {product.price.toFixed(2)}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    startEditing(product)
                                                }
                                                className="rounded-lg border border-line px-3 py-2 text-sm hover:bg-paper-dim"
                                            >
                                                Sửa
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDelete(product)
                                                }
                                                className="rounded-lg text-white bg-red-500 px-3 py-2 text-sm hover:bg-red-600"
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
}
