import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

/**
 * PageHero Component — Dynamic hero banner with breadcrumb navigation
 *
 * Props:
 * @param {string} title          - The page heading (e.g. "About Us")
 * @param {Array}  breadcrumbs    - Array of { label, href? } objects.
 *                                  Last item = current page (no link).
 * @param {string} backgroundImage - URL of the background image
 *
 * Example usage:
 * <PageHero
 *   title="About Us"
 *   breadcrumbs={[
 *     { label: "Home", href: "/" },
 *     { label: "About Us" },
 *   ]}
 *   backgroundImage="/images/about-hero.jpg"
 * />
 */
export default function DynamicHero({
    title = "About Us",
    breadcrumbs,
    backgroundImage = "/about/hero.png",
}: {
    title?: string;
    breadcrumbs?: Array<{ label: string; href?: string }>;
    backgroundImage?: string;
}) {
    const safeBreadcrumbs = breadcrumbs ?? [{ label: "Home", href: "/" }, { label: title }];

    return (
        <section
            className="relative w-full h-110 md:h-130 2xl:h-162.5 bg-cover bg-center flex items-center justify-center overflow-hidden"
            style={{
                backgroundImage: `url(${backgroundImage})`,
            }}
        >
            {/* Dark overlay */}
            {/* <div className="absolute inset-0 bg-black/60" /> */}

            {/* Centered Content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center gap-3 px-4 pt-16">
                {/* Page Title */}
                <h1
                    className="text-white text-3xl lg:text-[60px] font-light tracking-wide text-balance"
                    dangerouslySetInnerHTML={{ __html: title }}></h1>

                {/* Shadcn Breadcrumb — styled white for dark background */}
                <Breadcrumb>
                    <BreadcrumbList className="justify-center flex-wrap [&_li]:text-white [&_svg]:text-white">
                        {safeBreadcrumbs.map((crumb, index) => {
                            const isLast = index === safeBreadcrumbs.length - 1;
                            return (
                                <span key={index} className="flex items-center gap-1.5">
                                    <BreadcrumbItem>
                                        {isLast ? (
                                            <BreadcrumbPage className="text-[#168DCA] text-[13px] md:text-lg font-normal">
                                                {crumb.label}
                                            </BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink
                                                href={crumb.href || "#"}
                                                className="text-[#fff] text-[13px] md:text-lg font-normal hover:text-white transition-colors duration-200"
                                            >
                                                {crumb.label}
                                            </BreadcrumbLink>
                                        )}
                                    </BreadcrumbItem>

                                    {!isLast && (
                                        <BreadcrumbSeparator className="text-white" />
                                    )}
                                </span>
                            );
                        })}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </section>
    );
}