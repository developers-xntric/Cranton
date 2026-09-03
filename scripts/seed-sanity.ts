import dotenv from "dotenv"
dotenv.config({ path: ".env.local" })
import fs from "node:fs"
import path from "node:path"
import { createClient } from "next-sanity"

type Kind = "text" | "image" | "href"
type Entry = { _key: string; key: string; kind: Kind; source: string; value?: string; image?: any; enabled: boolean }
type PageSection = { name: string; fields: Entry[]; items?: any[] }
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
const token = process.env.SANITY_API_TOKEN
if (!projectId || !token) throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN before seeding.")
const client = createClient({ projectId, dataset, apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01", token, useCdn: false })
const root = process.cwd()
const pages = [
  ["/", "Home"], ["/about", "About Us"], ["/contact", "Contact Us"], ["/activities-aircraft", "Activities"], ["/activities-firefighting-system", "Firefighting System"], ["/activities-helideck-consulting", "Helideck Consulting"], ["/activities-helideck-lighting", "Helideck Lighting"], ["/activities-helideck-manufacturing", "Helideck Manufacturing"], ["/activities-helideck-refurbishing", "Refurbishing Helidecks"], ["/activities-heliport-platform-mounting", "Heliport Platform Mounting"], ["/heliports-&-vertiports-lighting-solutions", "Heliports & Vertiports Lighting Solutions"], ["/heliports-&-vertiports-solutions", "Heliports & Vertiports Solutions"], ["/modular-floating-solutions", "Modular Floating Solutions"], ["/obstruction-lighting-solutions", "Obstruction Lighting Solutions"], ["/portable-helipads-and-vertipads", "Portable Helipads & Vertipads"], ["/portable-lighting-solutions", "Portable Lighting Solutions"],
] as const
const safeId = (slug: string) => `page-${(slug === "/" ? "home" : slug.slice(1)).replace(/[^a-zA-Z0-9_-]/g, "-")}`
const resolveModule = (from: string, specifier: string) => {
  const raw = specifier.startsWith("@/") ? path.join(root, specifier.slice(2)) : path.resolve(path.dirname(from), specifier)
  for (const candidate of [raw, `${raw}.tsx`, `${raw}.ts`, path.join(raw, "index.tsx"), path.join(raw, "index.ts")]) if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate
  return null
}
function dependencyGraph(entryFile: string) {
  const seen = new Set<string>(); const visit = (file: string) => { if (seen.has(file)) return; seen.add(file); const source = fs.readFileSync(file, "utf8"); for (const match of source.matchAll(/from\s+["']([^"']+)["']/g)) { const resolved = resolveModule(file, match[1]); if (resolved) visit(resolved) } }
  visit(entryFile); return [...seen]
}
function collect(files: string[]) {
  const found = new Map<string, Entry>()
  const add = (kind: Kind, source: string) => { const clean = source.replace(/\n/g, " ").replace(/\r/g, " ").trim(); if (!clean || clean.length < 2 || clean.length > 500 || clean.includes("className") || clean.includes("=>") || clean.startsWith("{") || clean.startsWith("(") || clean.includes("{") || clean.includes("}") || clean.startsWith("Your browser does not support") || clean.includes("Gradient overlays") || clean.includes("Background Video") || clean.includes("Content }))")) return; const key = `${kind}-${clean}`; if (!found.has(key)) found.set(key, { _key: key.replace(/[^a-zA-Z0-9_-]/g, "-").slice(0, 120), key, kind, source: clean, value: clean, enabled: true }) }
  for (const file of files) { const source = fs.readFileSync(file, "utf8").replace(/\{\/\*[\s\S]*?\*\/\}/g, ""); for (const m of source.matchAll(/(?:title|heading|description|paragraph|para|subtitle|badge|buttonText|label|name|address|number|text|alt)\s*=\s*\{?\s*["']([^"']+)["']/g)) add("text", m[1]); for (const m of source.matchAll(/(?:href|buttonHref)\s*=\s*\{?\s*["']([^"']+)["']/g)) add("href", m[1]); for (const m of source.matchAll(/(?:src|image|hoverImage)\s*=\s*\{?\s*["']([^"']+\.(?:png|jpe?g|webp|gif|svg|mp4|webm))["']/gi)) add("image", m[1]); for (const m of source.matchAll(/>\s*([^<>]{3,200})\s*</g)) add("text", m[1]) }
  return [...found.values()]
}
function collectHomepageItems(file: string) {
  const base = path.basename(file).replace(/.(tsx|ts)$/, "")
  const source = fs.readFileSync(file, "utf8")
  if (base === "stats-section") {
    return [...source.matchAll(/label: *"([^"]+)", *value: *([0-9]+), *suffix: *"([^"]*)"/g)].map((match, index) => ({ _key: "stat-" + index, title: match[1], detail: match[2] + match[3] }))
  }
  if (base === "why-choose-us") {
    return [...source.matchAll(/title: *"([^"]+)", *description: *"([^"]+)"/g)].map((match, index) => ({ _key: "feature-" + index, title: match[1], description: match[2], iconName: "feature-icon" }))
  }
  if (base === "building-blocks" || base === "insights-section") {
    return [...source.matchAll(/title: *"([^"]+)"[^]*?(?:description: *"([^"]+)")?[^]*?(?:image|icon): *"([^"]+)"/g)].map((match, index) => ({ _key: "card-" + index, title: match[1], titleSource: match[1], description: match[2], descriptionSource: match[2], imageSource: match[3] }))
  }
  return []
}function collectServiceItems(file: string) {
  const source = fs.readFileSync(file, "utf8").replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
  const items: any[] = []
  for (const match of source.matchAll(/\{\s*title:\s*"([^"]+)"[\s\S]*?description:\s*"([^"]+)"[\s\S]*?image:\s*(?:"([^"]+)"|null)[\s\S]*?link:\s*"([^"]+)"/g)) {
    items.push({ _key: "service-" + items.length, title: match[1], titleSource: match[1], description: match[2], descriptionSource: match[2], imageSource: match[3] || undefined, buttonHref: match[4], hrefSource: match[4] })
  }
  return items
}const sectionTitle = (file: string) => { const base = path.basename(file).replace(/\.(tsx|ts)$/, ""); if (base === "page") return "Page content"; return base.replace(/[-_]/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").replace(/\b\w/g, (letter) => letter.toUpperCase()) }
const pageEntries = new Map<string, Entry[]>()
const pageSections = new Map<string, PageSection[]>()
const prettySectionName = (name: string) => ({
  "dynamic-hero": "Hero",
  "value-card": "About Cranton",
  "four-cards": "What We Do",
  "why-choose": "Why Choose Cranton",
  "cta-section": "Call to action",
  "page": "Page content",
}[name] || name.replace(/[-_]/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase()))
const aboutSectionNames = ["Hero", "About Cranton", "Our Story", "What We Do", "Our Values", "Why Choose Cranton", "Testimonials", "Call to action"]
const aboutSectionMatchers = [
  [/^About Us$/, /^Home$/, /\/about(\/hero)?\.png$/],
  [/^About Cranton Electrical Limited$/, /global manufacturer specializing/, /extensive expertise in manufacturing/, /Working closely with industry/, /lightweight aluminium structures.*engineered/, /\/about\/1\.png$/],
  [/^Our Story$/, /was founded with a clear objective/, /We specialize in the design/, /Our team works closely/, /With a strong focus on lightweight/, /\/about\/2\.png$/],
  [/^What We Do$/, /Engineered helidecks/, /Expert Engineering Solutions/, /Uncompromised Quality/, /Reliable Long-Term Support/, /Continuous Innovation/, /\/about\/c[1-4]\.png$/],
  [/^The Values That Define Our Success$/, /Safety First$/, /Engineering Excellence/, /Quality & Durability/, /Client Commitment/, /\/about\/c[5-8]\.png$/],
  [/Why Choose Cranton/],
  [/Testimonials/],
  [/Let.?s Build Your Helideck Project/, /Get in touch with our team/]
]
const buildSections = (slug: string, routeFile: string, modules: string[]) => {
  if (slug === "/about") {
    let valueCardIndex = 0
    const componentSections = modules.map((file) => {
      const base = path.basename(file).replace(/.(tsx|ts)$/, "")
      let name = prettySectionName(base)
      if (base === "value-card") {
        name = valueCardIndex++ === 0 ? "About Cranton" : "Our Story"
      }
      return { name, fields: collect([file]) }
    }).filter((section) => section.fields.length > 0)
    return componentSections
  }
  return modules.map((file) => { const base = path.basename(file).replace(/.(tsx|ts)$/, ""); const section: PageSection = { name: prettySectionName(base), fields: collect([file]) }; if (base === "services") section.items = collectServiceItems(file); if (slug === "/" && ["building-blocks", "stats-section", "why-choose-us", "insights-section"].includes(base)) section.items = collectHomepageItems(file); return section }).filter((section) => section.fields.length > 0 || (section.items && section.items.length > 0))
}
for (const [slug] of pages) { const routeFile = slug === "/" ? path.join(root, "app", "page.tsx") : path.join(root, "app", slug.slice(1), "page.tsx"); const modules = fs.existsSync(routeFile) ? dependencyGraph(routeFile) : []; const sections = buildSections(slug, routeFile, modules); pageSections.set(slug, sections); pageEntries.set(slug, [...new Map(sections.flatMap((section) => section.fields).map((entry) => [`${entry.kind}-${entry.source}`, entry])).values()]) }
const allEntries = [...new Map([...pageEntries.values()].flat().map((entry) => [`${entry.kind}-${entry.source}`, entry])).values()]
async function main() {
  const publicRoot = path.join(root, "public"); const assets = new Map<string, any>(); const imageFiles = fs.readdirSync(publicRoot, { recursive: true }).filter((file): file is string => typeof file === "string" && /\.(png|jpe?g|webp|gif|svg)$/i.test(file))
  for (let index = 0; index < imageFiles.length; index += 8) { const batch = imageFiles.slice(index, index + 8); await Promise.all(batch.map(async (relative) => { const filename = path.basename(relative); const existing = await client.fetch(`*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id`, { filename }); const assetId = existing || (await client.assets.upload("image", fs.createReadStream(path.join(publicRoot, relative)), { filename }))._id; assets.set(`/${relative.replaceAll("\\", "/")}`, { _type: "image", asset: { _type: "reference", _ref: assetId } }) })); console.log(`Checked ${Math.min(index + batch.length, imageFiles.length)}/${imageFiles.length} assets`) }
  const withAssets = (entry: Entry) => entry.kind === "image" && assets.has(entry.source) ? { ...entry, image: assets.get(entry.source) } : entry
  const withItemAssets = (item: any) => item.imageSource && assets.has(item.imageSource) ? { ...item, image: assets.get(item.imageSource) } : item
  const homeFile = path.join(root, "app", "page.tsx")
  const homeModules = dependencyGraph(homeFile)
  const homeModule = (name: string) => homeModules.find((file) => path.basename(file).replace(/.(tsx|ts)$/, "") === name)
  const homeItems = (name: string) => { const file = homeModule(name); if (!file) return []; return (name === "services" ? collectServiceItems(file) : collectHomepageItems(file)).map(withItemAssets) }
  const homeText = (name: string, pattern: RegExp) => { const file = homeModule(name); const value = file ? collect([file]).find((entry) => pattern.test(entry.source))?.source : undefined; return value }
  const heroFile = homeModule("hero")
  const heroEntries = heroFile ? collect([heroFile]) : []
  const heroValue = (pattern: RegExp, fallback: string) => heroEntries.find((entry) => pattern.test(entry.source))?.source || fallback
  const homePage = {
    _id: "home-page", _type: "homePage", seoTitle: "Home", seoDescription: "Cranton aviation, heliport, vertiport and lighting solutions.",
    heroSection: { heading: heroValue(/Powering the Future|Vertical Aviation/, "Powering the Future of Vertical Aviation"), description: heroValue(/Heliports, Vertiports/, "Heliports, Vertiports, and Obstruction Lighting Built for Safety, Precision, and Performance"), buttonText: heroValue(/Explore Solutions/, "Explore Solutions"), buttonHref: "/about" },
    servicesSection: { cards: homeItems("services").map((item) => ({ ...item, href: item.buttonHref, buttonHref: undefined })) },
    buildingBlocksSection: { heading: homeText("building-blocks", /Building Blocks/) || "The Building Blocks of Safe & Reliable Vertiport & Heliport", description: homeText("building-blocks", /Cranton Heliport is engineered/) || "Cranton Heliport is engineered with precision, using high-performance materials and systems designed to meet demanding aviation standards.", cards: homeItems("building-blocks") },
    statsSection: { heading: homeText("stats-section", /Engineering Precision/) || "Engineering Precision. Manufacturing Excellence", paragraphs: ["Cranton is a specialist manufacturer and solutions provider for aviation and infrastructure systems, with a strong focus on helideck and helipad solutions, aviation lighting, and electrical safety equipment. We combine engineering expertise with in-house manufacturing to deliver products that meet the highest standards of safety, durability, and compliance.", "Built on a foundation of technical knowledge and practical experience, Cranton supports clients across aviation, offshore, healthcare, defense, and industrial sectors. Our products are designed to perform in demanding environments where reliability and precision are critical."], image: assets.get("/home/stats-left.png"), buttonText: "About Us", buttonHref: "/about", stats: homeItems("stats-section").map((item) => ({ number: item.detail, label: item.title, suffix: "" })) },
    whyChooseSection: { heading: "Why Industry Leaders Choose Cranton", description: "From manufacturing precision to on-site readiness, Cranton delivers aviation, Vertiport & heliport solutions engineered for performance, compliance, and long-term reliability.", image: assets.get("/home/why-choose-us.png"), buttonText: "Inquire Now", buttonHref: "/contact", cards: homeItems("why-choose-us") },
    insightsSection: { heading: homeText("insights-section", /Insights That/) || "Insights That Power Smarter Decisions", cards: homeItems("insights-section") },
    contactSection: { heading: homeText("contact-section", /Tell Us Your Requirements/) || "Tell Us Your Requirements", description: homeText("contact-section", /Please submit your requirements/) || "Please submit your requirements using the following online form. Our team will revert asap", buttonText: "Send Message", image: assets.get("/home/contact.png") },
  }
  const aboutModules = dependencyGraph(path.join(root, "app", "about", "page.tsx"))
  const aboutWhyFile = aboutModules.find((file) => path.basename(file).replace(/.(tsx|ts)$/, "") === "why-choose")
  const aboutTestimonials = aboutWhyFile ? [...fs.readFileSync(aboutWhyFile, "utf8").matchAll(/stars: ([0-9]+),[^]*?text: "([^"]+)",[^]*?name: "([^"]+)",[^]*?role: "([^"]+)"/g)].map((match, index) => ({ _key: "testimonial-" + index, stars: Number(match[1]), text: match[2], name: match[3], role: match[4], title: match[3], description: match[2], titleSource: match[3], descriptionSource: match[2] })) : []
  const aboutCard = (title: string, description: string, imageSource?: string) => ({ _key: "about-" + title.toLowerCase().replace(/[^a-z0-9]+/g, "-"), title, titleSource: title, description, descriptionSource: description, imageSource, image: imageSource ? assets.get(imageSource) : undefined })
  const aboutPage = {
    _id: "about-page", _type: "aboutPage", seoTitle: "About Us", seoDescription: "Learn about Cranton Electrical Limited and our aviation infrastructure solutions.",
    heroSection: { heading: "About Us", backgroundImage: assets.get("/about/hero.png"), breadcrumbHome: "Home", breadcrumbHomeHref: "/" },
    aboutCrantonSection: { heading: "About Cranton Electrical Limited", paragraphs: [
      "Cranton Electrical Limited is a global manufacturer specializing in aluminium helidecks, , heliport lighting systems, and obstruction lighting solutions for both offshore and land-based aviation environments. We deliver engineered solutions that enhance operational safety, regulatory compliance, and long-term reliability across heliport/vertiport and helideck infrastructure.",
      "With extensive expertise in manufacturing and heliport/vertiport systems integration, Cranton supports government organizations, private operators, offshore facilities, hospitals, industrial sites, and aviation developers worldwide. Our solutions are designed to provide safe, efficient, and clearly marked landing environments for critical aviation operations.",
      "Working closely with industry experts, engineering partners, and trusted vendors, Cranton combines technical precision with innovative aluminium fabrication capabilities to deliver high-performance helideck and platform systems tailored to demanding operational requirements.",
      "Our lightweight aluminium structures are specifically engineered for applications where weight reduction, corrosion resistance, durability, and low maintenance are essential without compromising structural strength or safety standards. From fixed helidecks and portable deck platforms to advanced fixed and portable lighting systems, Cranton delivers customized solutions designed to meet the unique needs of every project locally and internationally."
    ], image: assets.get("/about/1.png") },
    ourStorySection: { heading: "Our Story", paragraphs: [
      "Cranton Electrical Limited was founded with a clear objective — to deliver reliable, high-performance helideck and heliports/vertiports solutions for complex and demanding aviation environments. From the beginning, our focus has been on combining engineering expertise, manufacturing precision, and practical execution to meet the evolving needs of offshore, industrial, and land-based operations.Over the years, we have successfully delivered a wide range of heliport/helideck projects across multiple regions, supporting both government and private sector clients. Our commitment to quality, safety, compliance, and operational reliability has enabled us to build long-term partnerships based on trust and consistent performance",
      "We specialize in the design, manufacturing, and installation of aluminium helidecks, deck platforms, heliport lighting systems, and obstruction lighting solutions. Every system is engineered to meet specific operational and environmental requirements while maintaining the highest aviation safety standards",
      "Our team works closely with clients, consultants, vendors, and project partners throughout every stage from concept and engineering to manufacturing, installation, and commissioning ensuring smooth project execution and dependable long-term performance",
      "With a strong focus on lightweight aluminium structures, corrosion resistance, low maintenance requirements, and durable system performance, Cranton continues to deliver innovative heliport infrastructure solutions for clients locally and internationally"
    ], image: assets.get("/about/2.png") },
    whatWeDoSection: { heading: "What We Do", description: "Engineered helidecks, platforms, and lighting solutions built for safe, reliable offshore and land-based aviation operations.", cards: [
      aboutCard("Expert Engineering Solutions", "From concept to commissioning, our teams manage every stage with precision and strict compliance.", "/about/c1.png"),
      aboutCard("Uncompromised Quality", "We follow strict quality standards to ensure all systems are safe, reliable, and durable, every time.", "/about/c2.png"),
      aboutCard("Reliable Long-Term Support", "We provide ongoing support and maintenance to ensure systems perform efficiently throughout their lifecycle.", "/about/c3.png"),
      aboutCard("Continuous Innovation", "We continuously refine processes, adopt new technologies, and strengthen capabilities to meet industry demands.", "/about/c4.png"),
    ] },
    valuesSection: { heading: "The Values That Define Our Success", cards: [
      aboutCard("Safety First", "Every solution we manufacture is designed with aviation safety, operational reliability, and regulatory compliance at its core.", "/about/c5.png"),
      aboutCard("Engineering Excellence", "We combine technical expertise, precision manufacturing, and innovative design to deliver high-performance helideck and heliport solutions.", "/about/c6.png"),
      aboutCard("Quality & Durability", "Our aluminium structures and lighting systems are built for long-term strength, corrosion resistance, and low-maintenance performance in demanding environments.", "/about/c7.png"),
      aboutCard("Client Commitment", "We work closely with every client to deliver tailored solutions, dependable support, and successful project execution from start to finish.", "/about/c8.png"),
    ] },
    whyChooseSection: { heading: "Why Choose Us", paragraphs: ["We deliver lightweight, high-strength helideck and heliport/vertiport solutions engineered for durability, safety, and long-term performance. From aluminium helidecks and deck platforms to advanced lighting and obstruction systems, every solution is tailored to meet the specific operational needs of each project.", "Our experienced team combines engineering expertise, precision manufacturing, and international aviation standards to provide safe, reliable, and low-maintenance infrastructure for offshore and land-based operations.", "Trusted by government and private sector clients worldwide, Cranton is committed to delivering innovative, compliant, and cost-effective solutions that ensure operational confidence and lasting value."], description: "Cranton delivers reliable aviation infrastructure solutions through engineering expertise, quality manufacturing, and dependable support.", missionHeading: "Our Mission", missionDescription: "To provide the highest technical competence through strong collaboration and the shortest possible delivery time in the manufacturing and commissioning of helidecks.", visionHeading: "Vision", visionDescription: "To collaborate with research institutes and high-tech partners in developing advanced, innovative, and future-ready heliport solutions.", image: assets.get("/about/hero.png"), cards: [aboutCard("Engineered for Compliance & Safety", "Every solution is carefully designed to meet international aviation standards while ensuring safe, stable, and efficient helideck operations. Our systems are developed to support reliable performance while maintaining strict safety and operational compliance requirements."), aboutCard("Manufacturing-Driven Quality", "We combine durable materials, precision engineering, and detailed quality control processes to deliver systems built for long-term performance. Every component is manufactured with consistency and accuracy to ensure dependable operation across demanding project environments."), aboutCard("Proven in Real-World Installations", "Our solutions are successfully implemented across offshore platforms, rooftop helipads, and industrial aviation facilities worldwide. These completed installations demonstrate our practical experience in delivering reliable systems for complex operational environments and requirements."), aboutCard("Built to Support Your Project Goals", "From planning to installation, every solution is tailored to match your operational requirements and long-term infrastructure objectives. We work closely with clients to deliver scalable, practical, and future-ready helideck systems for every project.")] },
    testimonialsSection: { heading: "What Our Clients Say", description: "We are proud to have earned the trust of our clients worldwide. Read their feedback on how our helideck and heliport solutions deliver safety, reliability, and innovation across every project.", cards: aboutTestimonials },
    ctaSection: { heading: "Let’s Build Your Helideck Project", description: "Get in touch with our team to discuss your helideck requirements and receive a tailored solution designed for performance, safety, and long-term reliability.", buttonText: "Contact Us", buttonHref: "/contact" },
  }
  const contactPage = {
    _id: "contact-page", _type: "contactPage", seoTitle: "Contact Us", seoDescription: "Contact Cranton Electrical Limited for helideck, heliport, vertiport and lighting solutions.",
    heroSection: { heading: "Contact Us", backgroundImage: assets.get("/contact/hero.png"), breadcrumbHome: "Home", breadcrumbHomeHref: "/" },
    contactInfoSection: { addressHeading: "Our Address", address: "Office 11A, Design Works, William Street, Felling, NE10 0JP, United Kingdom.", addressHref: "https://www.google.com/maps/search/?api=1&query=Office+11A+Design+Works+William+Street+Felling+NE10+0JP+United+Kingdom", phoneHeading: "Contact Info", phone: "+44 191 640 76 03", phoneHref: "tel:+441916407603", emailHeading: "E-mail Us", email: "info@crantonelectric.com", emailHref: "mailto:info@crantonelectric.com" },
    formSection: { heading: "Have Inquiries? Reach Out Via Message", nameLabel: "Name*", namePlaceholder: "Your Name", emailLabel: "Email Address*", emailPlaceholder: "you@example.com", messageLabel: "Message*", messagePlaceholder: "Your Message", submitButtonText: "Send Message", loadingButtonText: "Sending..." },
  }
  await client.createOrReplace(contactPage)
  await client.createOrReplace(aboutPage)
  await client.createOrReplace(homePage)
  const nav = [{ label: "Home", href: "/" }, { label: "About Us", href: "/about" }, { label: "Contact Us", href: "/contact" }]
  await client.createOrReplace({ _id: "header-default", _type: "header", siteName: "Cranton", navigationItems: nav, ctaButtonText: "Request a Quote", ctaButtonHref: "/contact", logo: assets.get("/nav-logo.png"), address: "Office 11A, Design Works, William Street, Felling, NE10 0JP, United Kingdom.", addressHref: "https://www.google.com/maps/search/?api=1&query=Office+11A+Design+Works+William+Street+Felling+NE10+0JP+United+Kingdom", email: "info@crantonelectric.com", emailHref: "mailto:info@crantonelectric.com", phone: "+44 191 640 75 03", phoneHref: "tel:+441916407503" })
  await client.createOrReplace({ _id: "footer-default", _type: "footer", logo: assets.get("/footer-logo.png"), description: "From precision-engineered deck platforms to advanced fixed and portable lighting systems, Cranton delivers aviation, vertiport, and heliport solutions built for safety, compliance, and long-term operational reliability.", address: "Office 11A, Design Works, William Street, Felling, NE10 0JP, United Kingdom.", addressHref: "https://www.google.com/maps/search/?api=1&query=Office+11A+Design+Works+William+Street+Felling+NE10+0JP+United+Kingdom", email: "info@crantonelectric.com", emailHref: "mailto:info@crantonelectric.com", phone: "+44 191 640 75 03", phoneHref: "tel:+441916407503", links: [{ label: "Home", href: "/" }, { label: "About Us", href: "/about" }, { label: "E-Brochure", href: "/Cranton-E-Brochure.pdf" }, { label: "Contact Us", href: "/contact" }], socialLinks: [{ label: "LinkedIn", href: "https://www.linkedin.com/company/cranton-electrical-limited-uk/", newTab: true }], copyrightText: "Copyright Ãƒâ€šÃ‚Â© {year} All Rights Reserved." })
  for (const [slug, title] of pages) { const entries = (pageEntries.get(slug) || []).map(withAssets); const sections = (pageSections.get(slug) || []).map((section, index) => ({ _key: `${safeId(slug)}-${index}`, sectionName: section.name, sectionType: "content", editableFields: section.fields.map(withAssets), items: section.items?.map(withItemAssets) })); await client.createOrReplace({ _id: safeId(slug), _type: "sitePage", title, slug, seoTitle: title, seoDescription: title, sections }); console.log(`Seeded ${title}: ${entries.length} fields in ${sections.length} sections`) }
  await client.createOrReplace({ _id: "site-content-default", _type: "siteContent", title: "Internal content fallback", entries: allEntries.map(withAssets) })
  console.log(`Completed ${pages.length} pages, ${allEntries.length} unique values, ${imageFiles.length} assets.`)
}
main().catch((error) => { console.error(error); process.exit(1) })



