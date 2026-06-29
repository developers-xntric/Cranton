import Button from "./ui/grad-button";

type HeroProps = {
    video: string;
    title: string;
    subtitle: string;
    ctaLabel: string;
    ctaHref: string;
};

export default function Hero({
    video,
    title,
    subtitle,
    ctaLabel,
    ctaHref,
}: HeroProps) {
    return (
        <section className="relative w-full h-150 md:h-screen md:min-h-150 overflow-hidden flex items-end">
            <div className="absolute inset-0 z-0 bg-black">
                <video
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-linear-to-t from-[#1a1a1a]/90 via-transparent to-transparent"></div>
            </div>

            <div className="relative z-10 max-w-360 w-[90%] mx-auto pb-8 md:pb-16 ">
                <h1 className="text-white text-[2.5rem] leading-[1.1] sm:text-5xl md:text-6xl xl:text-[4.5rem] 2xl:text-[5.5rem]  tracking-tight">
                    {title.split("\n").map((line, index) => (
                        <span key={index}>
                            {index > 0 && <br />}
                            {line}
                        </span>
                    ))}
                </h1>
                <p className="ms-1 w-full md:w-[45%] text-sm md:text-lg text-white leading-relaxed mt-3 mb-2">
                    {subtitle}
                </p>

                <Button href={ctaHref} className="px-6 py-3 mt-3">
                    {ctaLabel}
                </Button>
            </div>
        </section>
    );
}
