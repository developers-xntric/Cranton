import Image from 'next/image';
import Button from './ui/grad-button';

interface HealthcareSectionProps {
    heading?: string;
    desc?: string;
    heading2?: string;
    desc2?: string;
    image?: string;
    titles: string[];
    para: string[];
}
const SecondHeli = (props: HealthcareSectionProps) => {
    return (
        <div className="pb-16">
            <div className="mx-auto 2xl:max-w-350 w-[90%]  md:px-8">
                <div className="mx-auto py-12 w-full">
                    <div className="flex flex-col md:flex-row items-center md:items-stretch gap-8 md:gap-12">

                        {/* Left Column: Heading */}
                        <div className="w-full md:w-1/2 flex items-center">
                            <h2 className="text-3xl lg:text-4xl leading-[1.3] tracking-tight" dangerouslySetInnerHTML={{ __html: props.heading || "" }}>
                            </h2>
                        </div>

                        {/* Vertical Divider (Hidden on mobile, visible on desktop) */}
                        <div className="hidden md:block w-px relative right-7 bg-gray-200 min-h-full my-2"></div>

                        {/* Right Column: Description & Button */}
                        <div className="w-full md:w-1/2 flex flex-col justify-center space-y-5 md:pl-4">
                            <p className="text-[15px] text-gray-800 leading-relaxed font-medium">
                                {props.desc}
                            </p>
                            <div>
                                {/* Gradient Button with SVG Icon */}
                                <Button>Inquire Now</Button>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-stretch">
                    {/* Left: Image */}
                    <div className="relative h-96 md:h-full overflow-hidden rounded-lg shadow-lg">
                        <Image
                            src={props.image || "/1.png"}
                            alt="Healthcare professional with stethoscope and digital network"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Right: Content */}
                    <div className="flex flex-col justify-start">
                        <h3 className="text-[20px] md:text-3xl lg:text-[36px] font-medium leading-[1.2] text-[#0a0f1e] mb-6">
                            {props.heading2 || "Trusted HIS Expertise for Healthcare Providers"}
                        </h3>
                        <p className="text-md text-black mb-8" dangerouslySetInnerHTML={{ __html: props.desc2 || "" }}>
                        </p>

                        {/* Features Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-2 gap-6">
                            {/* Feature 1 */}
                            <div className="flex flex-col gap-4">
                                <div>
                                    <h4 className="font-semibold text-foreground leading-tight mb-1">
                                        {props.titles[0]}
                                    </h4>
                                    <p className="text-[12px] leading-4 md:leading-relaxed md:text-sm text-black">
                                        {props.para[0]}
                                    </p>
                                </div>
                            </div>

                            {/* Feature 2 */}
                            <div className="flex flex-col gap-4">
                                <div>
                                    <h4 className="font-semibold text-foreground leading-tight mb-1">
                                        {props.titles[1]}
                                    </h4>
                                    <p className="text-[12px] leading-4 md:leading-relaxed md:text-sm text-black">
                                        {props.para[1]}
                                    </p>
                                </div>
                            </div>

                            {/* Feature 3 */}
                            <div className="flex flex-col gap-4">
                                <div>
                                    <h4 className="font-semibold text-foreground leading-tight mb-1">
                                        {props.titles[2]}
                                    </h4>
                                    <p className="text-[12px] leading-4 md:leading-relaxed md:text-sm text-black">
                                        {props.para[2]}
                                    </p>
                                </div>
                            </div>

                            {/* Feature 4 */}
                            <div className="flex flex-col gap-4">
                                <div>
                                    <h4 className="font-semibold text-foreground leading-tight mb-1">
                                        {props.titles[3]}
                                    </h4>
                                    <p className="text-[12px] leading-4 md:leading-relaxed md:text-sm text-black">
                                        {props.para[3]}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SecondHeli
