"use client";

type Point = {
  title: string;
};

type ImageContentSectionProps = {
  id?: string;
  image?: string;
  imageAlt?: string;
  title?: string;
  paragraphs?: string[];
  subTitle?: string;
  points?: Point[];
};

export default function ImageContentSection({
  id = "about",
  image = "/placeholder.png",
  imageAlt = "image",
  title = "",
  paragraphs = [],
  subTitle = "",
  points = [],
}: ImageContentSectionProps) {
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

  return (
    <section id={id} className="w-full bg-white pt-5 md:pt-10 pb-5 md:pb-10">

      <div className="mx-auto max-w-[1440px] w-[92%] sm:w-[90%]">

        {/* Image */}
        {image && (
          <div className="w-full mt-4 md:mt-6">
            <img
              src={image}
              alt={imageAlt}
              className="w-full h-[180px] sm:h-[220px] md:h-auto shadow-lg object-cover rounded-md"
            />
          </div>
        )}

        {/* Text Content */}
        <div className="space-y-3 md:space-y-4 w-full py-5 md:py-6">

          {/* Heading */}
          {title && (
            <h2 className="text-[20px] sm:text-[20px] md:text-3xl lg:text-[36px] font-Regular leading-[1.2]">
              {title}
            </h2>
          )}

          {/* Paragraphs */}
          <div>
            {paragraphs.map((para, index) => (
              <p
                key={index}
                className="text-[14px] md:text-[16px] leading-relaxed text-[#333333] mb-2"
              >
                {para}
              </p>
            ))}

            {/* Sub Title */}
            {subTitle && (
              <h3 className="text-[20px] sm:text-[20px] md:text-[22px] font-light leading-[1.2] pt-3">
                {subTitle}
              </h3>
            )}

            {/* Points */}
            {points.length > 0 && (
              <div className="space-y-3 py-4">
                {points.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">

                    <div className="shrink-0 mt-1 md:0">
                      <CheckIcon />
                    </div>

                    <p className="text-[14px] md:text-[17px] font-light text-[#636363]">
                      {item.title}
                    </p>

                  </div>
                ))}
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}