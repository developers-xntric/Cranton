interface SectionHeadingProps {
    title: string;
    className?: string;
}

export default function SectionHeading({ title, className }: SectionHeadingProps) {
    // If className is provided, we use it; otherwise, we use the default styles requested.
    const styles = className ?? "text-3xl md:text-4xl font-medium text-white text-center mb-6";

    return (
        <h2 className={`${styles} font-rethink`}>
            {title}
        </h2>
    );
}
