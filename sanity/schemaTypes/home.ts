import { defineField, defineType } from "sanity"
import { imageWithAlt } from "./shared"

const cardFields = [
  defineField({ name: "title", title: "Title", type: "string" }),
  defineField({ name: "description", title: "Description", type: "text" }),
  defineField({ name: "imageSource", title: "Original image path", type: "string", readOnly: true, hidden: true }),
  defineField({ name: "image", title: "Image / icon", type: "image", options: { hotspot: true } }),
  defineField({ name: "hrefSource", title: "Original link", type: "string", readOnly: true, hidden: true }),
  defineField({ name: "href", title: "Link", type: "string" }),
  defineField({ name: "number", title: "Number", type: "string" }),
  defineField({ name: "label", title: "Label", type: "string" }),
  defineField({ name: "suffix", title: "Suffix", type: "string" }),
  defineField({ name: "iconName", title: "Icon name", type: "string" }),
]

const cards = (title: string) => defineField({ name: "cards", title, type: "array", of: [{ type: "object", fields: cardFields, preview: { select: { title: "title", subtitle: "description" }, prepare: (v) => ({ title: v.title || "Card", subtitle: v.description || "" }) } }] })

const copyFields = [
  defineField({ name: "heading", title: "Heading", type: "string" }),
  defineField({ name: "description", title: "Description", type: "text" }),
  defineField({ name: "buttonText", title: "Button text", type: "string" }),
  defineField({ name: "buttonHref", title: "Button link", type: "string" }),
]

export const homeType = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({ name: "heroSection", title: "Hero Section", type: "object", fields: [
      defineField({ name: "heading", title: "Main heading", type: "string" }),
      defineField({ name: "description", title: "Description", type: "text" }),
      defineField({ name: "backgroundVideo", title: "Background video", type: "file", options: { accept: "video/*" } }),
      defineField({ name: "buttonText", title: "CTA button text", type: "string" }),
      defineField({ name: "buttonHref", title: "CTA button link", type: "string" }),
    ] }),
    defineField({ name: "servicesSection", title: "Services Section", type: "object", fields: [cards("Service cards")] }),
    defineField({ name: "buildingBlocksSection", title: "Building Blocks Section", type: "object", fields: [...copyFields, cards("Building block cards")] }),
    defineField({ name: "statsSection", title: "Stats Section", type: "object", fields: [defineField({ name: "heading", title: "Heading", type: "string" }), defineField({ name: "paragraphs", title: "Paragraphs", type: "array", of: [{ type: "text" }] }), imageWithAlt("image", "Image"), defineField({ name: "buttonText", title: "Button text", type: "string" }), defineField({ name: "buttonHref", title: "Button link", type: "string" }), defineField({ name: "stats", title: "Stats", type: "array", of: [{ type: "object", fields: [cardFields[6], cardFields[7], cardFields[8]] }] })] }),
    defineField({ name: "whyChooseSection", title: "Why Choose Us Section", type: "object", fields: [...copyFields, imageWithAlt("image", "Image"), cards("Feature cards")] }),
    defineField({ name: "insightsSection", title: "Insights Section", type: "object", fields: [...copyFields.slice(0, 1), cards("Insight cards")] }),
    defineField({ name: "contactSection", title: "Contact Section", type: "object", fields: [...copyFields, imageWithAlt("image", "Image")] }),
    defineField({ name: "seoTitle", title: "SEO title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO description", type: "text" }),
  ],
})