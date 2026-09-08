import { portableHelipadsVertipadsFaqs } from "@/lib/solution-faqs"

export const portableHelipadsVertipadsDefaults = {
  title: "Portable Helipads & Vertipads",
  slug: "/portable-helipads-and-vertipads",
  hero: { title: "Portable Helipads & Vertipads", homeLabel: "Home", homeHref: "/", image: { src: "/ph.png", alt: "Portable helipads and vertipads" } },
  introduction: {
    heading: "Portable Helipads & Vertipads <br/> for Rapid Deployment",
    description: "Engineered for speed, safety, and reliability, our modular landing systems enable secure helicopter operations in temporary, remote, and high-demand environments.",
    buttonText: "Inquire Now", buttonHref: "/contact",
    headingTwo: "Built for Critical Operations",
    descriptionTwo: "Catobo’s portable helipad and vertipad solutions are designed to deliver stable and compliant landing platforms where permanent infrastructure is not feasible. Using modular, high-strength systems, these platforms can be deployed quickly with minimal site preparation. <br/> <br/> Whether for emergency response, construction sites, or remote operations, our solutions ensure consistent performance and operational safety.",
    titles: ["Enables rapid aviation access anywhere", "Reduces infrastructure cost and time", "Ensures safe operations in temporary setups", "Supports mission-critical deployments"],
    paragraphs: ["Deploy landing platforms quickly in remote or temporary locations, ensuring immediate access for helicopters.", "Eliminates the need for complex civil works, significantly lowering installation costs while accelerating project timelines.", "Provides stable, anti-slip, and load-tested surfaces that maintain safety standards even in non-permanent environments.", "Designed for high-pressure scenarios such as emergency response and defense operations where reliability and speed are essential."],
    image: { src: "/ps1.png", alt: "Portable helipad platform" },
  },
  performance: {
    heading: "Engineered for Performance", description: "",
    features: [
      { title: "Modular & Scalable Design", description: "Flexible interlocking systems that adapt to different site sizes and operational requirements.", image: { src: "/22.png", alt: "Modular and scalable design" } },
      { title: "High Load-Bearing Strength", description: "Built to support heavy helicopter operations with structural stability.", image: { src: "/33.png", alt: "High load-bearing strength" } },
      { title: "Slip-Resistant & Durable", description: "Durable surface ensures safe operations in all environmental conditions.", image: { src: "/44.png", alt: "Slip-resistant and durable surface" } },
      { title: "Rapid Installation", description: "Quick assembly and dismantling for time-critical deployments.", image: { src: "/55.png", alt: "Rapid installation" } },
    ],
  },
  environments: {
    heading: "Designed for Demanding Environments",
    paragraphs: ["Our systems are engineered to deliver consistent performance under demanding conditions, combining strength, durability, and operational efficiency."],
    points: [{ title: "High-strength modular materials" }, { title: "Optimized load distribution" }, { title: "Long operational lifespan" }, { title: "Minimal maintenance requirements" }],
    image: { src: "/pb.png", alt: "Engineering Precision" },
  },
  industries: { badge: "", heading: "Where It's Used", items: [
    { name: "Emergency & Medical Operations", image: { src: "/w1.png", alt: "Emergency and medical operations" } },
    { name: "Remote & Off-Grid Locations", image: { src: "/w2.png", alt: "Remote and off-grid locations" } },
    { name: "Construction & Infrastructure Projects", image: { src: "/w3.png", alt: "Construction and infrastructure projects" } },
    { name: "Temporary Aviation Facilities", image: { src: "/w4.png", alt: "Temporary aviation facilities" } },
    { name: "Defense & Rapid Response", image: { src: "/w5.png", alt: "Defense and rapid response" } },
  ] },
  faqs: { heading: "Frequently Asked Questions", description: "", showNumbers: true, assistanceHeading: "Need Help ?", assistanceDescription: "Our lighting specialists are ready to help you select the perfect obstruction lighting solution for your operational needs.", phone: "+44 191 640 75 03", email: "info@crantonelectric.com", image: { src: "/faqs/2.png", alt: "Portable helipad support" }, items: portableHelipadsVertipadsFaqs },
  cta: { heading: "Need a Portable Helipad Solution?", description: "Tell us about your project requirements and our experts will help you design the right solution for your operational needs.", buttonText: "Request a quote", buttonHref: "/contact" },
} as const
