'use client'

type CardItem = {
  id: number;
  title: string;
  icon: string;
};

interface AircraftWarningLightsProps {
  title?: string;
  paragraphs?: string[];
  cards?: CardItem[];
  image?: string;
  imageAlt?: string;
}

const defaultCards: CardItem[] = [
  { id: 1, title: "High-Visibility LED Technology", icon: "light" },
  { id: 2, title: "Engineered for Compliance", icon: "link" },
];

function CardIcon({ icon }: { icon: string }) {
  if (icon === "link") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 41 41" fill="none">
        <path d="M37.5325 3.12101C33.3711 -1.04042 26.523 -1.04026 22.3616 3.12101L16.1126 9.36998C14.9033 10.5793 14.0444 12.0082 13.5344 13.5292C11.9728 14.0544 10.5437 14.9389 9.37004 16.1125L3.12107 22.3615C-1.04036 26.5228 -1.04036 33.3709 3.12107 37.5324C7.28226 41.6936 14.1304 41.694 18.292 37.5324L24.5409 31.2834C25.7503 30.0741 26.6092 28.6454 27.1192 27.1242C28.6808 26.599 30.1099 25.7145 31.2835 24.5409L37.5325 18.2919C41.694 14.1306 41.694 7.28252 37.5325 3.12101Z" fill="url(#paint0_linear_791_50164)"/>
        <defs>
          <linearGradient id="paint0_linear_791_50164" x1="0" y1="3.38778" x2="41.7551" y2="5.68361" gradientUnits="userSpaceOnUse">
            <stop stopColor="#22A1D8"/>
            <stop offset="1" stopColor="#025094"/>
          </linearGradient>
        </defs>
      </svg>
    );
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 48 46" fill="none">
      <path d="M35.8164 31.5184H34.3837V22.9225C34.3837 16.6028 29.2421 11.4612 22.9225 11.4612C16.6028 11.4612 11.4612 16.6029 11.4612 22.9225V31.5184H10.0285C9.23668 31.5184 8.59586 32.1591 8.59586 32.9511C8.59586 33.743 9.23668 34.3838 10.0285 34.3838H14.3265V44.4123C14.3265 45.2042 14.9673 45.845 15.7592 45.845C16.5511 45.845 17.1919 45.2042 17.1919 44.4123V34.3837H28.6531V44.4122C28.6531 45.2041 29.2939 45.8449 30.0858 45.8449C30.8778 45.8449 31.5185 45.2041 31.5185 44.4122V34.3837H35.8165C36.6083 34.3837 37.2492 33.743 37.2492 32.951C37.2492 32.1591 36.6083 31.5184 35.8164 31.5184Z" fill="url(#paint0_linear_791_50163)"/>
      <defs>
        <linearGradient id="paint0_linear_791_50163" x1="0" y1="3.82042" x2="48.3191" y2="6.54708" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22A1D8"/>
          <stop offset="1" stopColor="#025094"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function AirCraftWarningLights({
  title = "Aircraft Warning Lights",
  paragraphs = [
    "Cranton provides high-performance aircraft warning lights designed to enhance aviation safety by ensuring clear visibility of tall structures and potential obstacles. Our solutions are engineered to meet aviation compliance requirements while delivering reliable performance in demanding environments.",
    "Built with advanced technology and durable materials, these systems offer long operational life, energy efficiency, and minimal maintenance. By ensuring consistent visibility and dependable operation, Cranton's aircraft warning lights help safeguard airspace while supporting the safe development of modern infrastructure.",
  ],
  cards = defaultCards,
  image = "/activities-aircraft/aircraft-warning-lights.png",
  imageAlt = "Aircraft warning lights",
}: AircraftWarningLightsProps) {
  return (
    <section id="about" className="w-full bg-white py-10 md:py-12">
      <div className="mx-auto max-w-360 w-[90%]">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex flex-col justify-between w-full lg:w-[40%]">
            <h2 className="text-[18px] md:text-3xl lg:text-[36px] font-medium leading-[1.2]">
              {title}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-4 lg:mt-0">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="flex flex-row sm:flex-col items-center sm:items-start gap-3 px-3 py-3 bg-white rounded-[8px] border border-[#bdbdbd]"
                >
                  <div>
                    <CardIcon icon={card.icon} />
                  </div>
                  <h3 className="text-[14px] md:text-sm font-medium">{card.title}</h3>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-[60%] space-y-3 text-[14px] md:text-[15px] text-[#333333]">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="w-full mt-6">
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-56 md:h-auto rounded-lg shadow-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
}
