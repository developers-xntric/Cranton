export type LightingImage = { src: string; alt: string }
export type LightingPoint = { title: string; description?: string }
export type LightingSplit = {
  title: string
  subtitle: string
  paragraphs: string[]
  points: LightingPoint[]
  image: LightingImage
  keyTitle?: string
  whyItMattersTitle?: string
  whyItMattersDescription?: string
  reverse?: boolean
}
export type LightingFaq = { question: string; answer: string }

export const heliportsVertiportsLightingSolutionsDefaults = {
  slug: "/heliports-&-vertiports-lighting-solutions",
  title: "Heliports & Vertiports Lighting Solutions",
  hero: {
    title: "Heliports & Vertiports Lighting Solutions",
    homeLabel: "Home",
    homeHref: "/",
    image: { src: "/heliport-vertiports/hero.png", alt: "Heliports and vertiports lighting solutions" },
  },
  overview: {
    title: "Heliports & Vertiports Lighting Solutions",
    subtitle: "Smart, Safe & Future-Ready Air Mobility Infrastructure",
    paragraphs: [
      "Crantron delivers advanced lighting systems engineered for modern heliports and next-generation vertiports. Designed to meet international aviation standards, our solutions ensure maximum visibility, operational safety, and energy efficiency across all landing environments—day or night.",
      "From precision landing guidance to environmental awareness, our lighting portfolio supports safe aircraft operations in even the most demanding conditions.",
    ],
    buttonText: "Inquire Now",
    buttonHref: "/contact",
    imageOne: { src: "/heliport-vertiports/newleft.png", alt: "Heliport lighting system" },
    imageTwo: { src: "/heliport-vertiports/right1.jpg", alt: "Vertiport lighting system" },
  },
  ecosystem: {
    title: "Complete Lighting Ecosystem",
    subtitle: "End-to-End Airside Visibility.",
    paragraphs: [""],
    image: { src: "/heliport-vertiports/ecosystem.png", alt: "Complete heliport lighting ecosystem" },
    points: [
      { title: "LED Perimeter Lights (Surface Mounted)", description: "Elevated lighting systems designed to clearly define helideck and landing area boundaries for safe operations." },
      { title: "LED Perimeter Lights (Flush Mounted)", description: "Low-profile inset lighting solutions that provide clear visual guidance while maintaining a smooth deck surface." },
      { title: "LED Wind Direction Indicator", description: "Illuminated wind indication systems that provide pilots with clear wind direction visibility in all operating conditions." },
      { title: "LED Wind Direction Indicator", description: "Illuminated wind indication systems that provide pilots with clear wind direction visibility in all operating conditions." },
      { title: "LED H and Circle Lights", description: "Aviation beacons designed to improve site identification and visibility from long operational distances." },
      { title: "LED Low Intensity Obstruction Lights", description: "Reliable obstruction warning lights developed to improve visibility and enhance aviation safety around structures and elevated areas." },
    ],
  },
  reliability: {
    title: "Engineered for Reliability, Efficiency & Safety",
    description: "",
    features: [
      { title: "High-Performance LED Technology", description: "Up to 100,000-hour lifespan with consistent brightness", image: { src: "/heliport-vertiports/1.png", alt: "High-performance LED technology" } },
      { title: "Energy Efficiency", description: "Low power consumption reduces operational costs", image: { src: "/heliport-vertiports/2.png", alt: "Energy efficiency" } },
      { title: "Rugged Construction", description: "Corrosion-resistant materials designed for demanding environments", image: { src: "/heliport-vertiports/3.png", alt: "Rugged construction" } },
      { title: "Environmental Protection", description: "IP-rated systems for resistance against dust and water ingress", image: { src: "/heliport-vertiports/4.png", alt: "Environmental protection" } },
      { title: "Flexible Control Options", description: "Adjustable light intensity for different operational requirements", image: { src: "/heliport-vertiports/5.png", alt: "Flexible control options" } },
      { title: "Pilot-Centric Design", description: "Glare reduction and NVG compatibility for enhanced safety", image: { src: "/heliport-vertiports/6.png", alt: "Pilot-centric design" } },
    ],
  },
  flushMounted: {
    title: "FATO / TLOF Flush Mounted Helipad Lights", subtitle: "Precision Guidance Without Obstruction",
    paragraphs: ["Crantron’s flush mounted helipad lights are designed for seamless integration into landing surfaces, providing clear visual guidance without creating physical obstacles for aircraft or ground operations.", "Ideal for Final Approach and Take-Off (FATO) and Touchdown and Lift-Off (TLOF) areas, these lights deliver dependable performance in both day and night operations."],
    keyTitle: "Key Features:",
    points: ["Omnidirectional light output for uniform visibility", "Low power consumption (approximately 15W)", "Long-life integrated LED (up to 100,000 hours)", "IP67-rated for dust and water protection", "High-strength cast aluminium construction", "Night Vision Goggle (NVG) compatibility with optional IR LED", "Designed to withstand extreme temperatures (-40°C to +60°C)"].map((title) => ({ title })),
    whyItMattersTitle: "Why It Matters", whyItMattersDescription: "Flush-mounted lighting eliminates surface obstructions while maintaining optimal visibility making it ideal for high-traffic or space-constrained heliports and vertiports.",
    image: { src: "/heliport-vertiports/fato.png", alt: "FATO and TLOF flush mounted helipad lights" },
  },
  floodlights: {
    title: "Hooded LED Floodlights", subtitle: "High-Performance Surface Illumination",
    paragraphs: ["Crantron’s hooded LED floodlights are engineered to illuminate landing zones, surrounding terrain, and potential obstacles, providing pilots with enhanced situational awareness during approach and landing.", "The integrated hood minimizes glare, ensuring visibility without compromising pilot comfort or safety."],
    keyTitle: "Key Features:",
    points: ["High-intensity LED lighting with up to 100,000-hour lifespan", "Anti-glare hood design for pilot-friendly operation", "IP65-rated for outdoor durability", "High-efficiency optical system with minimal light spill", "Designed for operation in harsh environments (-30°C to +70°C)", "Stable performance in high wind conditions", "Adjustable light intensity options"].map((title) => ({ title })),
    whyItMattersTitle: "Why It Matters", whyItMattersDescription: "Improves landing accuracy by giving pilots a clear, well-lit view of terrain conditions and potential hazards",
    image: { src: "/heliport-vertiports/hooded.png", alt: "Hooded LED floodlights" }, reverse: true,
  },
  windIndicator: {
    title: "Illuminated Wind Direction Indicator (Windcone)", subtitle: "Accurate Wind Visibility for Safer Landings",
    paragraphs: ["Wind awareness is critical for safe helicopter and eVTOL operations. Crantron’s illuminated wind direction indicators provide clear, real-time wind visibility—even in low-light and challenging weather conditions.", "Fully aligned with aviation requirements, these systems ensure pilots can easily interpret wind conditions from a distance."],
    keyTitle: "Key Features:",
    points: ["Clearly visible from long distances (up to 200 meters)", "Available in internally and externally illuminated configurations", "Constructed with stainless steel or marine-grade coated poles", "Designed to withstand extreme wind speeds", "Smooth 360° rotation for accurate wind indication", "Multiple windsock sizes available", "Optional tiltable pole for simplified maintenance"].map((title) => ({ title })),
    whyItMattersTitle: "Why It Matters", whyItMattersDescription: "Provides essential environmental information, enabling safer, more controlled landing and take-off operations.",
    image: { src: "/heliport-vertiports/wind.png", alt: "Illuminated wind direction indicator" },
  },
  urbanMobility: {
    title: "Built for the Future of Urban Air Mobility", subtitle: "Supporting Next-Generation Aviation",
    paragraphs: ["Crantron’s lighting solutions are designed to support the growth of Urban Air Mobility (UAM) and electric aviation infrastructure.", ""],
    buttonText: "Inquire Now", buttonHref: "/contact",
    solutions: ["Compatible with modern eVTOL platforms", "Designed for high-frequency operations", "Scalable for future expansion", "Low maintenance with long operational life", "Proven performance in critical aviation environments"],
    imageOne: { src: "/hv1.png", alt: "Urban air mobility infrastructure" }, imageTwo: { src: "/hv2.png", alt: "Future-ready aviation lighting" },
  },
  faqs: {
    heading: "Frequently Asked Questions", description: "", showNumbers: true,
    assistanceHeading: "Need Help ?", assistanceDescription: "Need reliable solutions or urgent support? Get in touch with our expert team today.", contactPhone: "+44 191 640 75 03", contactEmail: "info@crantonelectric.com",
    image: { src: "/faqs/6.png", alt: "Heliport lighting support" },
    items: [
      ["Why are Cranton lights used in demanding environments?", "Because they are built specifically for aviation operations. Every fixture is engineered to withstand vibration, extreme temperatures, moisture, and corrosion."],
      ["How often do the lights need maintenance?", "Very little. Our LED technology is designed for long service life, helping operators reduce maintenance visits and operational costs."],
      ["Can your lighting be installed on an existing heliport?", "Absolutely. Many of our projects involve upgrading older lighting systems without major modifications to the existing facility."],
      ["What happens if a light fails?", "Our systems are designed with reliability in mind. Individual units can typically be replaced quickly without affecting the entire lighting network."],
      ["Can lighting brightness be adjusted?", "Yes. Depending on the system, multiple intensity levels can be provided to suit changing weather conditions and operational requirements."],
      ["Our existing lights are constantly failing. Can you help?", "Yes. Many clients come to us for exactly that reason. We can recommend modern LED alternatives that are more reliable and easier to maintain."],
      ["What makes a heliport light different from a normal outdoor light?", "A heliport light is designed specifically keeping in mind the pilots, not pedestrians. The colour, beam pattern, intensity, brightness, and visibility are all carefully controlled."],
      ["Can you match an existing lighting system?", "In many cases, yes. If you're upgrading an existing heliport, we'll help identify the most suitable replacement solution."],
      ["How long do your LED lights last?", "Our products are designed for long operational life, helping operators reduce maintenance visits and replacement costs."],
      ["What if I only need a few replacement fittings?", "That's not a problem. Whether you need a single light or a complete system, we're happy to help."],
    ].map(([question, answer]) => ({ question, answer })),
  },
} as const
