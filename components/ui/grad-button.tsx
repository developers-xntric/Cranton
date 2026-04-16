import Link from "next/link";

type ButtonVariant = "gradient" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "title"> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    children?: React.ReactNode;
    href?: string;
    fullWidth?: boolean;
    title?: string;
}

const ChevronRight = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="ml-2 group-hover:translate-x-0.5 transition-transform duration-300"
    >
        <path d="m9 18 6-6-6-6" />
    </svg>
);

export default function Button({
    variant = "gradient",
    size = "md",
    children,
    title,
    href,
    fullWidth = false,
    className = "",
    ...props
}: ButtonProps) {
    const base =
        "group inline-flex items-center justify-center rounded-md transition-all duration-300 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";

    const sizeMap: Record<ButtonSize, string> = {
        sm: "px-4 py-1.5 text-sm",
        md: "px-6 py-2.5 text-sm",
        lg: "px-8 py-3.5 text-base",
    };

    const variantMap: Record<ButtonVariant, string> = {
        gradient:
            "bg-linear-to-l from-[#0F2453] to-[#168DCA] text-white border border-[#0F2453] hover:scale-105 hover:bg-none hover:text-[#168DCA] hover:border-[#168DCA] hover:shadow-xl hover:shadow-[#168DCA]/20 active:scale-95",
        outline:
            "border border-[#1A6FEB] text-[#1A6FEB] bg-transparent hover:bg-[#1A6FEB]/5 hover:text-[#168DCA] hover:border-[#168DCA] active:scale-95",
        ghost:
            "bg-transparent text-gray-200 border border-transparent hover:bg-white/5 hover:text-[#168DCA] hover:border hover:border-[#168DCA] active:scale-95",
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

    const content = (
        <>
            {title || children}
            <ChevronRight />
        </>
    );

    if (href) {
        return (
            <Link href={href} className={classes}>
                {content}
            </Link>
        );
    }

    return (
        <button className={classes} {...props}>
            {content}
        </button>
    );
}
