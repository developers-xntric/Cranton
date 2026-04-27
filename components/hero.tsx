export default function Hero() {
    return (
        <section className="relative w-full h-150 md:h-screen md:min-h-150 overflow-hidden flex items-end">
            {/* Background Video */}
            <div className="absolute inset-0 z-0 bg-black">
                <video
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src="/home/hero-bg.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                {/* Gradient overlays to match the design's dark bottom edge for text readability */}
                <div className="absolute inset-0 bg-linear-to-t from-[#1a1a1a]/90 via-transparent to-transparent"></div>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 max-w-360 w-[90%] mx-auto pb-8 md:pb-16 ">
                <h1 className="text-white text-[2.5rem] leading-[1.1] sm:text-5xl md:text-6xl xl:text-[4.5rem] 2xl:text-[5.5rem]  tracking-tight">
                    Vertiport & Heliport
                    <br />
                    Obstruction Lighting Solutions
                </h1>
            </div>
        </section>
    );
}




