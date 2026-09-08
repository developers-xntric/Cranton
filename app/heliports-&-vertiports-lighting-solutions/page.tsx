/* eslint-disable @typescript-eslint/no-explicit-any */
import DynamicHero from "@/components/dynamic-hero"
import Faqs from "@/components/faqs"
import HvGrey from "@/components/hv-grey"
import HvLeftRight from "@/components/hv-left-right"
import ITValueCard from "@/components/it-value-card"
import ThreeCards from "@/components/three-cards"
import Urban from "@/components/urban"
import { getLightingSolutionsPage } from "@/sanity/lib/content"
import { heliportsVertiportsLightingSolutionsDefaults as defaults } from "@/sanity/lib/lighting-solutions-defaults"

type AnyRecord = Record<string, any>
type RenderSplit = { title: string; subtitle: string; paragraphs: string[]; points: Array<{ title: string; description?: string }>; image: string; imageAlt: string; keyTitle?: string; whyItMattersTitle?: string; whyItMattersDescription?: string; keytitle?: string; greytitle?: string; greypara?: string; reverse?: boolean }
const mergeDefaults = (fallback: any, cms: any): any => {
  if (cms === undefined || cms === null) return fallback
  if (Array.isArray(fallback)) return Array.isArray(cms) && cms.length ? cms : fallback
  if (fallback && typeof fallback === "object" && cms && typeof cms === "object") return Object.fromEntries(Object.keys(fallback).map((key) => [key, mergeDefaults(fallback[key], cms[key])]))
  return cms
}
const imageUrl = (image: { src: string; alt: string }, cmsImage?: { url?: string; alt?: string }) => cmsImage?.url || image.src
const imageAlt = (image: { src: string; alt: string }, cmsImage?: { url?: string; alt?: string }) => cmsImage?.alt || image.alt
const splitProps = (section: AnyRecord): RenderSplit => ({ ...section, image: imageUrl(section.image, section.image), imageAlt: imageAlt(section.image, section.image), points: section.points.map((point: AnyRecord) => ({ ...point })) } as RenderSplit)
const pageData = async () => mergeDefaults(defaults, await getLightingSolutionsPage())

export default async function HeliportsLightingSolutions() {
  const data: AnyRecord = await pageData()
  const overview = data.overview
  const ecosystem = splitProps(data.ecosystem)
  const flushMounted = splitProps(data.flushMounted)
  const floodlights = splitProps(data.floodlights)
  const windIndicator = splitProps(data.windIndicator)
  return <div>
    <DynamicHero title={data.hero.title || data.title} breadcrumbs={[{ label: data.hero.homeLabel, href: data.hero.homeHref }, { label: data.hero.title }]} backgroundImage={imageUrl(defaults.hero.image, data.hero.image)} />
    <ITValueCard btn={overview.buttonText} title={overview.title} subtitle={overview.subtitle} description1={overview.paragraphs[0]} description2={overview.paragraphs[1]} image1={imageUrl(defaults.overview.imageOne, overview.imageOne)} image2={imageUrl(defaults.overview.imageTwo, overview.imageTwo)} />
    <HvGrey sections={[{ title: ecosystem.title, subtitle: ecosystem.subtitle, image: ecosystem.image, imageAlt: ecosystem.imageAlt, points: ecosystem.points, paragraphs: ecosystem.paragraphs }]} />
    <ThreeCards isBlack heading={data.reliability.title} para={data.reliability.description} features={data.reliability.features.map((feature: AnyRecord, index: number) => ({ title: feature.title || defaults.reliability.features[index].title, desc: feature.description || defaults.reliability.features[index].description, icon: feature.image?.url || defaults.reliability.features[index].image.src }))} />
    <HvLeftRight sections={[{ ...flushMounted, keytitle: flushMounted.keyTitle, greytitle: flushMounted.whyItMattersTitle, greypara: flushMounted.whyItMattersDescription }]} />
    <HvLeftRight sections={[{ ...floodlights, keytitle: floodlights.keyTitle, greytitle: floodlights.whyItMattersTitle, greypara: floodlights.whyItMattersDescription }]} />
    <HvLeftRight isBlack sections={[{ ...windIndicator, keytitle: windIndicator.keyTitle, greytitle: windIndicator.whyItMattersTitle, greypara: windIndicator.whyItMattersDescription }]} />
    <Urban btn={data.urbanMobility.buttonText} title={data.urbanMobility.title} subtitle={data.urbanMobility.subtitle} description1={data.urbanMobility.paragraphs[0]} description2={data.urbanMobility.paragraphs[1]} solutions={data.urbanMobility.solutions} image1={imageUrl(defaults.urbanMobility.imageOne, data.urbanMobility.imageOne)} image2={imageUrl(defaults.urbanMobility.imageTwo, data.urbanMobility.imageTwo)} />
    <Faqs heading={data.faqs.heading} description={data.faqs.description} faqs={data.faqs.items} showNumbers={data.faqs.showNumbers} assistanceHeading={data.faqs.assistanceHeading} assistanceDescription={data.faqs.assistanceDescription} contactPhone={data.faqs.contactPhone} contactEmail={data.faqs.contactEmail} image={imageUrl(defaults.faqs.image, data.faqs.image)} />
  </div>
}