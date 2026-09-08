import { defineField, defineType } from "sanity"

const image = (name: string, title: string) => defineField({
  name, title, type: "image", options: { hotspot: true },
  fields: [defineField({ name: "alt", title: "Alternative text", type: "string" })],
})
const pointFields = [
  defineField({ name: "title", title: "Feature point", type: "string" }),
  defineField({ name: "description", title: "Feature description", type: "text" }),
]
const objectOptions = { collapsible: true, collapsed: false }

export const heliportsSolutionsType = defineType({
  name: "heliportsSolutionsPage",
  title: "Heliports & Vertiports Solutions",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Page title", type: "string" }),
    defineField({ name: "slug", title: "Route path", type: "string", readOnly: true }),
    defineField({ name: "hero", title: "Hero banner", type: "object", options: objectOptions, fields: [
      defineField({ name: "title", title: "Hero heading", type: "string" }),
      defineField({ name: "homeLabel", title: "Breadcrumb home label", type: "string" }),
      defineField({ name: "homeHref", title: "Breadcrumb home link", type: "string" }),
      image("image", "Hero background image"),
    ] }),
    defineField({ name: "introduction", title: "Introduction and platform overview", type: "object", options: objectOptions, fields: [
      defineField({ name: "heading", title: "Introduction heading", type: "string" }),
      defineField({ name: "description", title: "Introduction description", type: "text" }),
      defineField({ name: "headingTwo", title: "Platform heading", type: "string" }),
      defineField({ name: "descriptionTwo", title: "Platform description", type: "text" }),
      defineField({ name: "titles", title: "Feature card titles", type: "array", of: [{ type: "string" }] }),
      defineField({ name: "paragraphs", title: "Feature card paragraphs", type: "array", of: [{ type: "text" }] }),
      image("image", "Platform image"),
    ] }),
    defineField({ name: "performance", title: "Engineered for performance", type: "object", options: objectOptions, fields: [
      defineField({ name: "heading", title: "Section heading", type: "string" }),
      defineField({ name: "description", title: "Section description", type: "text" }),
      defineField({ name: "features", title: "Performance cards", type: "array", of: [{
        type: "object", options: objectOptions, fields: [
          defineField({ name: "title", title: "Card title", type: "string" }),
          defineField({ name: "description", title: "Card description", type: "text" }),
          image("image", "Card icon"),
        ],
      }] }),
    ] }),
    defineField({ name: "environments", title: "Demanding aviation environments", type: "object", options: objectOptions, fields: [
      defineField({ name: "heading", title: "Section heading", type: "string" }),
      defineField({ name: "paragraphs", title: "Section paragraphs", type: "array", of: [{ type: "text" }] }),
      defineField({ name: "points", title: "Feature points", type: "array", of: [{ type: "object", options: objectOptions, fields: pointFields }] }),
      image("image", "Section image"),
    ] }),
    defineField({ name: "industries", title: "Where it's used", type: "object", options: objectOptions, fields: [
      defineField({ name: "badge", title: "Badge", type: "string" }),
      defineField({ name: "heading", title: "Section heading", type: "string" }),
      defineField({ name: "items", title: "Industries", type: "array", of: [{ type: "object", options: objectOptions, fields: [
        defineField({ name: "name", title: "Industry name", type: "string" }),
        image("image", "Industry image"),
      ] }] }),
    ] }),
    defineField({ name: "faqs", title: "Frequently asked questions", type: "object", options: objectOptions, fields: [
      defineField({ name: "heading", title: "FAQ heading", type: "string" }),
      defineField({ name: "description", title: "FAQ description", type: "text" }),
      defineField({ name: "showNumbers", title: "Show question numbers", type: "boolean" }),
      defineField({ name: "assistanceHeading", title: "Support heading", type: "string" }),
      defineField({ name: "assistanceDescription", title: "Support description", type: "text" }),
      defineField({ name: "phone", title: "Support phone", type: "string" }),
      defineField({ name: "email", title: "Support email", type: "string" }),
      image("image", "FAQ image"),
      defineField({ name: "items", title: "Questions and answers", type: "array", of: [{ type: "object", options: objectOptions, fields: [
        defineField({ name: "question", title: "Question", type: "string" }),
        defineField({ name: "answer", title: "Answer", type: "text" }),
      ] }] }),
    ] }),
    defineField({ name: "cta", title: "Final call to action", type: "object", options: objectOptions, fields: [
      defineField({ name: "heading", title: "CTA heading", type: "string" }),
      defineField({ name: "description", title: "CTA description", type: "text" }),
      defineField({ name: "buttonText", title: "Button text", type: "string" }),
      defineField({ name: "buttonHref", title: "Button link", type: "string" }),
    ] }),
    defineField({ name: "seoTitle", title: "SEO title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO description", type: "text" }),
  ],
})