/* eslint-disable @typescript-eslint/no-explicit-any */
import DynamicHero from "@/components/dynamic-hero"
import ReliableSurveillance from "@/components/reliable-surveillance"
import FourCards from "@/components/about/four-cards"
import BlackSplitSection from "@/components/activities-aircraft/black-split-section"
import SingleSplitSection from "@/components/activities-aircraft/single-split-section"
import InstallationProcess from "@/components/installation-process"
import IndustriesServe from "@/components/industries-serve"
import Faqs from "@/components/faqs"
import CTASection from "@/components/cta-section"
import { getObstructionLightingPage } from "@/sanity/lib/content"
import { obstructionLightingDefaults as defaults } from "@/sanity/lib/obstruction-lighting-defaults"

const merge = (fallback: any, cms: any): any => {
  if (cms === undefined || cms === null) return fallback
  if (Array.isArray(fallback)) return Array.isArray(cms) && cms.length ? cms : fallback

  if (cms && typeof cms === "object" && typeof cms.url === "string") return { ...fallback, ...cms }
  if (fallback && typeof fallback === "object" && cms && typeof cms === "object") return Object.fromEntries(Object.keys(fallback).map((key) => [key, merge(fallback[key], cms[key])]))
  return cms
}
const imageUrl = (fallback: any, cms: any) => cms?.url || fallback.src
const sections = (group: any) => group.sections.map((section: any, index: number) => ({ ...section, image: imageUrl(group.sections[index].image, section.image), imageAlt: section.imageAlt || group.sections[index].image.alt }))
const dataForPage = async () => merge(defaults, await getObstructionLightingPage())

export default async function ObstructionLightingSolutions() {
  const data = await dataForPage()
  return <div>
    <DynamicHero title={data.hero.title || data.title} breadcrumbs={[{ label: data.hero.homeLabel, href: data.hero.homeHref }, { label: data.hero.title || data.title }]} backgroundImage={imageUrl(defaults.hero.image, data.hero.image)} />
    <ReliableSurveillance title={data.overview.title} description={data.overview.description} image={imageUrl(defaults.overview.image, data.overview.image)} buttonText={data.overview.buttonText} buttonHref={data.overview.buttonHref} />
    <FourCards isBlack heading={data.performance.heading} para={data.performance.description} features={data.performance.features.map((feature: any, index: number) => ({ title: feature.title || defaults.performance.features[index].title, desc: feature.description || defaults.performance.features[index].description, icon: imageUrl(defaults.performance.features[index].image, feature.image) }))} />
    <BlackSplitSection isBlack={data.lowMedium.background === "dark"} sections={sections(data.lowMedium)} />
    <BlackSplitSection isBlack={data.highSolar.background === "dark"} sections={sections(data.highSolar)} />
    <SingleSplitSection isBlack={false} title={data.led.title} model={data.led.model} description={data.led.description} features={data.led.features} image={imageUrl(defaults.led.image, data.led.image)} imageAlt={data.led.imageAlt || defaults.led.image.alt} />
    <InstallationProcess title={data.installation.title} description={data.installation.description} steps={data.installation.steps.map((step: any, index: number) => ({ id: step.id || defaults.installation.steps[index].id, title: step.title || defaults.installation.steps[index].title, desc: step.description || defaults.installation.steps[index].description, image: imageUrl(defaults.installation.steps[index].image, step.image) }))} />
    <IndustriesServe badge={data.industries.badge} heading={data.industries.heading} industries={data.industries.items.map((item: any, index: number) => ({ name: item.name || defaults.industries.items[index].name, image: imageUrl(defaults.industries.items[index].image, item.image) }))} />
    <Faqs heading={data.faqs.heading} description={data.faqs.description} faqs={data.faqs.items} showNumbers={data.faqs.showNumbers} assistanceHeading={data.faqs.assistanceHeading} assistanceDescription={data.faqs.assistanceDescription} contactPhone={data.faqs.phone} contactEmail={data.faqs.email} image={data.faqs.image?.url || defaults.faqs.image.src} />
    <CTASection heading={data.cta.heading} description={data.cta.description} buttonText={data.cta.buttonText} buttonHref={data.cta.buttonHref} />
  </div>
}
