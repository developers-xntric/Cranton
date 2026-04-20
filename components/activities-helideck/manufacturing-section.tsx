"use client";
import Image from "next/image";

type ListItem = {
    title: string;
};

type ListBlockProps = {
    title: string;
    description?: string;
    items: ListItem[];
};

const CheckIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="21"
        viewBox="0 0 21 21"
        fill="none"
        className="shrink-0 mt-0.5"
    >
        <path
            d="M8.73935 14.4795L4.72754 10.4668L6.06449 9.12981L8.73935 11.8037L14.0872 6.45496L15.4251 7.79286L8.73935 14.4795Z"
            fill="#1475AF"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 10.4006C0 4.65665 4.65665 0 10.4006 0C16.1446 0 20.8013 4.65665 20.8013 10.4006C20.8013 16.1446 16.1446 20.8013 10.4006 20.8013C4.65665 20.8013 0 16.1446 0 10.4006ZM10.4006 18.9102C9.28314 18.9102 8.17658 18.6901 7.14415 18.2625C6.11171 17.8348 5.17362 17.208 4.38343 16.4178C3.59324 15.6276 2.96643 14.6896 2.53878 13.6571C2.11113 12.6247 1.89102 11.5181 1.89102 10.4006C1.89102 9.28314 2.11113 8.17658 2.53878 7.14415C2.96643 6.11171 3.59324 5.17362 4.38343 4.38343C5.17362 3.59324 6.11171 2.96643 7.14415 2.53878C8.17658 2.11113 9.28314 1.89102 10.4006 1.89102C12.6575 1.89102 14.822 2.78757 16.4178 4.38343C18.0137 5.97929 18.9102 8.14375 18.9102 10.4006C18.9102 12.6575 18.0137 14.822 16.4178 16.4178C14.822 18.0137 12.6575 18.9102 10.4006 18.9102Z"
            fill="#1475AF"
        />
    </svg>
);

const ListBlock = ({ title, description, items }: ListBlockProps) => (
    <div className="bg-[#f2f2f2] rounded-[15px] p-8 mb-6">
        <h3 className="text-[20px] mb-4 text-[#000]">{title}</h3>
        {description && (
            <p className="text-[14px] text-[#636363] mb-4 leading-relaxed font-light">
                {description}
            </p>
        )}
        <div className="space-y-3">
            {items.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                    <CheckIcon />
                    <p className="text-[14px] font-light text-[#636363] leading-tight">
                        {item.title}
                    </p>
                </div>
            ))}
        </div>
    </div>
);

export default function ManufacturingSection() {
    return (
        <section className="w-full bg-white py-16">
            <div className="mx-auto max-w-[1440px] w-[90%]">
                {/* Images Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <div className="relative aspect-16/10 rounded-[20px] overflow-hidden shadow-lg">
                        <Image
                            src="/helideck-manufacturing/left.png"
                            alt="Helideck Construction"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="relative aspect-16/10 rounded-[20px] overflow-hidden shadow-lg">
                        <Image
                            src="/helideck-manufacturing/right.png"
                            alt="Offshore Helideck"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Text Content */}
                <div className="mb-12">
                    <h2 className="text-[32px] md:text-[40px] font-medium text-[#333] mb-6 font-rethink">
                        Manufacturing & Construction Of Helidecks
                    </h2>
                    <div className="space-y-6 text-[15px] leading-relaxed text-[#333] font-onest">
                        <p>
                            Based on the field survey or preliminary analysis of your existing helideck by our expert team, we decide if repair, refurbishing, and modernization of your existing helideck might require refurbishing for your existing helideck. In addition to our design and construction expertise, we offer a complete range of repair, refurbishing and modernization services for existing helidecks.
                            Cranton Electrical has designed more ground, rooftop and offshore helideck manufacturers than anyone else in the world. Unlike most of our competitors, Cranton Electrical Heliports manufacturers has an extensive in-house engineering staff with the capability to design everything for a complete helipad installation. Cranton Electrical Helideck manufacturers will design the support structure, fire suppression equipment, snow melting system, and lighting package as needed for your specific project. We are staffed to handle multiple helidecks projects and still give your project the first-class attention it deserves.
                        </p>
                       
                        
                    </div>
                </div>

                {/* List Blocks */}
                <div className="space-y-6">
                    <ListBlock
                        title="The Following is A List Of Some Of The Services Offered By Cranton Electrical"
                        description="Cranton Electrical is prepared to perform the following services for our clients to meet their specific project requirements. With long experience and our attention to details. The results speak for safety performance and reliability."
                        items={[
                            { title: "Preparation of primary layout design for new helidecks." },
                            { title: "Reconstruction of existing helidecks." },
                            { title: "Condition assessment, maintenance and performance inspection reports." },
                            { title: "Budgetary planning." },
                            { title: "Design developed with regards to load, wind and infrastructure that fits the helideck." },
                            { title: "Final construction plan of the global helideck installations." },
                            { title: "Installation supervision and technical support services for any types of helideck installation." },
                            { title: "Complete line of helideck accessories." },
                        ]}
                    />

                    <ListBlock
                        title="Benefits For Operator"
                        items={[
                            { title: "Reduce risk of accident / incident during critical takeoff and landing phases of the flight." },
                            { title: "Increase the overall safe service of the helideck." },
                            { title: "Ensures accurate assessment of the helideck condition and performance, providing a clear footprint to the client." },
                            { title: "Helps the client to avoid structural and maintenance issues during the initial phase of refurbishing." },
                            { title: "Reduces project risk and budget." },
                            { title: "Elimination of installation and restoration issues on existing structure of the helideck." },
                            { title: "Increased safety and performance for both pilot and crew." },
                            { title: "Compliance with all regulatory requirements." },
                        ]}
                    />
                </div>
            </div>
        </section>
    );
}
