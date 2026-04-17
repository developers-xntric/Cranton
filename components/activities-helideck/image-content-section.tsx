'use client'

export default function ImageContentSection() {
  const CheckIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
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
   const points = [
    { title: "Drafting the primary plan / concept of the helideck" },
    { title: "Preparing detailed planning based on the approved concept" },
    { title: "Submission and approvals from concerned departments / officials" },
    { title: "Associating with related authorities / agencies in order to meet the applicable standards." },
  ];
  return (
    <section id="about" className="w-full bg-white py-10 md:py-16">
      <div className="mx-auto max-w-[1440px] w-[90%]">
        {/* Image */}
        <div className="w-full mt-6">
          <img
            src="/activities-aircraft/aircraft-warning-lights.png"
            alt="Advanced Oncology Center building"
            className="w-full h-56 md:h-auto shadow-lg object-cover  "
          />
        </div>
        {/* Text Content */}
        
          {/* Heading */}
          <div className="space-y-4 w-full py-6">
          
            <h2 className={`text-[20px] md:text-3xl lg:text-[36px] font-Regular leading-[1.2]  }`}>
              Helideck Consulting
            </h2>
            <div>
            <p className="text-[16px] leading-relaxed text-[#333333] mb-2">
        We are industry experts and provide you the most cost effective and up to date helideck solutions based on your requirements. We provide our clients a free primary consultation to listen to and clarify queries based on their helideck requirements
      </p>
      <p className="text-[16px] leading-relaxed text-[#333333] mb-2">
        Cranton Electrical Helideck consulting has designed more ground, rooftop and offshore helideck manufactures than anyone else in the world. Unlike most of our competitors, Cranton Electrical Heliports manufactures has an extensive in-house engineering staff with the capability to design everything for a complete helipad installation, Cranton Electrical Helideck manufactures will design the support structure, fire suppression equipment, snow melting system, and lighting package as needed for your specific project. We are staffed to handle multiple helidecks projects and still give your project the first-class attention it deserves.
      </p>
      <h3 className={`text-[22px] font-light leading-[1.2] pt-3  }`}>
              Our Consultation Consists Of
            </h3>
      <div className="space-y-3 py-4">
      {points.map((item, index) => (
        <div key={index} className="flex items-center gap-3">
          <CheckIcon />
          <p className="text-base font-light text-[#636363] text-[17px] ">{item.title}</p>
        </div>
      ))}
    </div>
            
            
          </div>


        </div>

        
        </div>
        
      
    </section>
  )
}