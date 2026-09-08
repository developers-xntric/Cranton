/* eslint-disable @typescript-eslint/no-explicit-any */
import FourCards from "@/components/about/four-cards"
import SplitSectionHelideck from "@/components/activities-helideck/splitsection-helideck"
import CTASection from "@/components/cta-section"
import DynamicHero from "@/components/dynamic-hero"
import Faqs from "@/components/faqs"
import IndustriesServe from "@/components/industries-serve"
import SecondHeli from "@/components/second-heli"
import { getHeliportsSolutionsPage } from "@/sanity/lib/content"
import { heliportsSolutionsDefaults as defaults } from "@/sanity/lib/heliports-solutions-defaults"

const merge = (fallback: any, cms: any): any => {
  if (cms === undefined || cms === null) return fallback
  if (Array.isArray(fallback)) return Array.isArray(cms) && cms.length ? cms : fallback
  if (fallback && typeof fallback === "object" && cms && typeof cms === "object") return Object.fromEntries(Object.keys(fallback).map((key) => [key, merge(fallback[key], cms[key])]))
  return cms
}
const imageUrl = (fallback: any, cms: any) => cms?.url || fallback.src
const dataForPage = async () => merge(defaults, await getHeliportsSolutionsPage())

export default async function HeliportsVertiportsSolutions() {
  const data = await dataForPage()
  const intro = data.introduction
  return <div>
    <DynamicHero title={data.hero.title || data.title} breadcrumbs={[{ label: data.hero.homeLabel, href: data.hero.homeHref }, { label: data.hero.title || data.title }]} backgroundImage={imageUrl(defaults.hero.image, data.hero.image)} />
    <SecondHeli heading={intro.heading} desc={intro.description} heading2={intro.headingTwo} desc2={intro.descriptionTwo} titles={intro.titles} para={intro.paragraphs} image={imageUrl(defaults.introduction.image, intro.image)} />
    <FourCards heading={data.performance.heading} para={data.performance.description} isBlack features={data.performance.features.map((feature: any, index: number) => ({ title: feature.title || defaults.performance.features[index].title, desc: feature.description || defaults.performance.features[index].description, icon: imageUrl(defaults.performance.features[index].image, feature.image) }))} />
    <SplitSectionHelideck sections={[{ title: data.environments.heading, image: imageUrl(defaults.environments.image, data.environments.image), imageAlt: data.environments.image?.alt || defaults.environments.image.alt, paragraphs: data.environments.paragraphs, points: data.environments.points }]} />
    <IndustriesServe badge={data.industries.badge} heading={data.industries.heading} industries={data.industries.items.map((item: any, index: number) => ({ name: item.name || defaults.industries.items[index].name, image: imageUrl(defaults.industries.items[index].image, item.image) }))} className="md:py-0! md:pb-10!" />
    <Faqs heading={data.faqs.heading} description={data.faqs.description} image={imageUrl(defaults.faqs.image, data.faqs.image)} faqs={data.faqs.items} showNumbers={data.faqs.showNumbers} assistanceHeading={data.faqs.assistanceHeading} assistanceDescription={data.faqs.assistanceDescription} contactPhone={data.faqs.phone} contactEmail={data.faqs.email} />
    <CTASection heading={data.cta.heading} description={data.cta.description} buttonText={data.cta.buttonText} buttonHref={data.cta.buttonHref} />
  </div>
}
