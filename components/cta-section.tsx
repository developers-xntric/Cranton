import Button from "./ui/grad-button";


export interface CTASectionProps {
    
    heading?: string;
    description?: any[] | string;
    buttonText?: string;
    buttonHref?: string;
}

export default function CTASection({
    
    heading = "Let's Talk About Your Goals",
    description,
    buttonText = "Request a Quote",
    buttonHref = "/contact"
}: CTASectionProps) {
    // Default description if not provided
    const defaultDescription = "From line automation to digital transformation, we help light industry clients move faster, smarter, and safer. Let's make your facility more connected and productive.";

    // Extract text from PortableText or use string/default
    const displayDescription = Array.isArray(description)
        ? description.map((block: any) => block.children?.map((child: any) => child.text).join('')).join(' ')
        : (description || defaultDescription);

    return (
        <section className="w-full bg-[#111111] py-10 lg:py-20">
            <div className="2xl:max-w-350 w-[90%] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-10 lg:gap-12">
                {/* Left Side Content */}
                <div className="flex flex-col gap-4 max-w-[800px]">
                    

                    {/* Heading */}
                    <h2 className="text-[20px] md:text-3xl lg:text-[40px] font-Regular leading-[1.2] text-[#ffffff]">
                        {heading}
                    </h2>

                    {/* Paragraph */}
                    <p className="text-[#ffffff] text-[16px]  leading-relaxed pr-6">
                        {displayDescription}
                    </p>
                </div>

                {/* Right Side CTA */}
                <div className="flex flex-col md:items-center gap-3 shrink-0 w-fit">
                    <Button href={buttonHref} className="px-6 py-3">
                        {buttonText}
                    </Button>
                </div>
            </div>
        </section>
    );
}
