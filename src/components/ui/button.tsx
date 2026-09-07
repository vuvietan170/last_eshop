import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
// hàm cva nhận 2 tham số 
// cách cấu hình button hay
const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors ",
    {
        variants: {
            variant: {
                primary: "bg-signal text-white hover:bg-signal/90",
                outline: "border border-line text-ink hover:bg-paper",
            },
            size: {
                md: "h-10 px-5",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    },
);
// ButtonHTMLAttributes<HTMLButtonElement> : mô tả thuộc tính hợp lệ mà 1 thẻ button<html> có thể nhận
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & 
    VariantProps<typeof buttonVariants>; //lấy ra chính xác kiểu của hàm buttonVariant: variant và size
// trạng thái mặc định của button sẽ là primary(nếu không có variant thì sẽ trả mặc định primary)
//...props rất quan trọng vì nó có vai trò dùng để trải mọi thuộc tính (như onclick, onchange,....)
export function Button({
    className,
    variant,
    size,
    ...props
}: ButtonProps) {
    return (
        <button
            // cn để ngoài là cấu hình chung của button , và dưới có các variant tương ứng
            className={cn(buttonVariants({ variant, size }), className)}
            {...props}
        />
    );
}
