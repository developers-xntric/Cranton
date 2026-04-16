import Link from "next/link";

type ButtonVariant = "gradient" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    children: React.ReactNode;
    href?: string;
    fullWidth?: boolean;
}

export default function Button({
    variant = "gradient",
    size = "md",
    children,
    href,
    fullWidth = false,
    className = "",
    ...props
}: ButtonProps) {
    const base =
        "inline-flex items-center justify-center  rounded-md transition-all duration-300 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";

    const sizeMap: Record<ButtonSize, string> = {
        sm: "px-4 py-1.5 text-sm",
        md: "px-6 py-2.5 text-sm",
        lg: "px-8 py-3.5 text-base",
    };

    const variantMap: Record<ButtonVariant, string> = {
        gradient:
            "bg-linear-to-r from-[#0F2453] to-[#168DCA] text-white hover:scale-105 hover:bg-transparent hover:bg-none hover:text-[#168DCA] border border-transparent hover:border-[#168DCA] hover:shadow-xl hover:shadow-[#168DCA]/30 active:scale-95 transition-all duration-300",
        outline:
            "border border-[#1A6FEB] text-[#1A6FEB] bg-transparent hover:bg-transparent hover:text-[#168DCA] hover:border-[#168DCA] active:scale-95 transition-all duration-300",
        ghost:
            "bg-transparent text-gray-200 border border-transparent hover:bg-transparent hover:text-[#168DCA] hover:border hover:border-[#168DCA] active:scale-95 transition-all duration-300",
    };

    const classes = [
        base,
        sizeMap[size],
        variantMap[variant],
        fullWidth ? "w-full" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    if (href) {
        return (
            <Link href={href} className={classes}>
                {children}
            </Link>
        );
    }

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
}
