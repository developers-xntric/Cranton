/* eslint-disable @typescript-eslint/no-explicit-any */
import FourCards from "@/components/about/four-cards"
import SplitSectionHelideck from "@/components/activities-helideck/splitsection-helideck"
import CTASection from "@/components/cta-section"
import DynamicHero from "@/components/dynamic-hero"
import Faqs from "@/components/faqs"
import IndustriesServe from "@/components/industries-serve"
import SecondHeli from "@/components/second-heli"
import { getPortableHelipadsVertipadsPage } from "@/sanity/lib/content"
import { portableHelipadsVertipadsDefaults as defaults } from "@/sanity/lib/portable-helipads-vertipads-defaults"

const merge = (fallback: any, cms: any): any => { if (cms === undefined || cms === null) return fallback; if (Array.isArray(fallback)) return Array.isArray(cms) && cms.length ? cms : fallback; if (fallback && typeof fallback === "object" && cms && typeof cms === "object") return Object.fromEntries(Object.keys(fallback).map((key) => [key, merge(fallback[key], cms[key])])); return cms }
const imageUrl = (fallback: any, cms: any) => cms?.url || fallback.src
const imageAlt = (fallback: any, cms: any) => cms?.alt || fallback.alt

export default async function PortableHelipadsAndVertipads() {
  const data = merge(defaults, await getPortableHelipadsVertipadsPage())
  return <div>
    <DynamicHero title={data.hero.title || data.title} breadcrumbs={[{ label: data.hero.homeLabel, href: data.hero.homeHref }, { label: data.hero.title || data.title }]} backgroundImage={imageUrl(defaults.hero.image, data.hero.image)} />
    <SecondHeli heading={data.introduction.heading} desc={data.introduction.description} buttonText={data.introduction.buttonText} buttonHref={data.introduction.buttonHref} image={imageUrl(defaults.introduction.image, data.introduction.image)} imageAlt={imageAlt(defaults.introduction.image, data.introduction.image)} heading2={data.introduction.headingTwo} desc2={data.introduction.descriptionTwo} titles={data.introduction.titles} para={data.introduction.paragraphs} />
    <FourCards isBlack heading={data.performance.heading} para={data.performance.description} features={data.performance.features.map((feature: any, index: number) => ({ title: feature.title || defaults.performance.features[index].title, desc: feature.description || defaults.performance.features[index].description, icon: imageUrl(defaults.performance.features[index].image, feature.image) }))} />
    <SplitSectionHelideck sections={[{ title: data.environments.heading, image: imageUrl(defaults.environments.image, data.environments.image), imageAlt: imageAlt(defaults.environments.image, data.environments.image), paragraphs: data.environments.paragraphs, points: data.environments.points }]} />
    <IndustriesServe badge={data.industries.badge} heading={data.industries.heading} industries={data.industries.items.map((item: any, index: number) => ({ name: item.name || defaults.industries.items[index].name, image: imageUrl(defaults.industries.items[index].image, item.image) }))} className="md:py-0! md:pb-10!" />
    <Faqs heading={data.faqs.heading} description={data.faqs.description} faqs={data.faqs.items} showNumbers={data.faqs.showNumbers} assistanceHeading={data.faqs.assistanceHeading} assistanceDescription={data.faqs.assistanceDescription} contactPhone={data.faqs.phone} contactEmail={data.faqs.email} image={imageUrl(defaults.faqs.image, data.faqs.image)} />
    <CTASection heading={data.cta.heading} description={data.cta.description} buttonText={data.cta.buttonText} buttonHref={data.cta.buttonHref} />
  </div>
}