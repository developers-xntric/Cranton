import Image from "next/image"

const HomeValue = ({
    image,
    title,
    paragraphs,
    reverse = false,
}: {
    image: string
    title: string
    paragraphs: string[]
    reverse?: boolean
}) => {
    const textContent = (
        <div className="flex flex-col gap-4">
            <h2 className={`text-3xl md:text-3xl lg:text-[40px] font-normal leading-[1.2] ${reverse ? "xl:w-full" : "xl:w-[90%]"}`}>
                {title}
            </h2>
            <div className="flex flex-col gap-4 mt-4">
                {paragraphs.map((para, i) => (
                    <p key={i} className="text-[14px] md:text-[16px] 2xl:text-[18px] leading-relaxed text-[#7C7E86]">
                        {para}
                    </p>
                ))}
            </div>
        </div>
    )

    const imageContent = (
        <div className="relative rounded-lg overflow-hidden shadow-lg w-full h-full min-h-[300px]">
            <Image
                fill
                src={image}
                alt={title}
                className="object-cover"
            />
        </div>
    )

    return (
        <section className="w-full py-3 md:py-8 ">
            <div className="2xl:max-w-350 w-[90%] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-6 items-stretch">
                    {reverse ? (
                        <>
                            <div className="hidden md:flex">{imageContent}</div>
                            {textContent}
                            <div className="md:hidden min-h-[300px] relative rounded-lg overflow-hidden shadow-lg">
                                <Image fill src={image} alt={title} className="object-cover" />
                            </div>
                        </>
                    ) : (
                        <>
                            {textContent}
                            <div className="flex">{imageContent}</div>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}

export default HomeValue
