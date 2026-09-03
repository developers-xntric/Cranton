import { defineField, defineType } from "sanity"
import { imageWithAlt } from "./shared"
const item = { name: "items", title: "Cards / points / FAQs / steps", type: "array", of: [{ type: "object", fields: [defineField({ name: "title", title: "Title", type: "string" }), defineField({ name: "titleSource", title: "Original title", type: "string", readOnly: true, hidden: true }), defineField({ name: "descriptionSource", title: "Original description", type: "string", readOnly: true, hidden: true }), defineField({ name: "hrefSource", title: "Original link", type: "string", readOnly: true, hidden: true }), defineField({ name: "imageSource", title: "Original image path", type: "string", readOnly: true, hidden: true }), defineField({ name: "description", title: "Description", type: "text" }), defineField({ name: "detail", title: "Additional detail", type: "text" }), imageWithAlt(), defineField({ name: "buttonText", title: "Button text", type: "string" }), defineField({ name: "buttonHref", title: "Button URL / path", type: "string" }), defineField({ name: "iconName", title: "Icon name", type: "string" })] }] } as const
export const pageType = defineType({
  name: "sitePage", title: "Page content", type: "document",
  fields: [
    defineField({ name: "title", title: "Page name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Route path", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "seoTitle", title: "SEO title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO description", type: "text" }),
    defineField({ name: "sections", title: "Page sections", type: "array", of: [{ type: "object", fields: [
      defineField({ name: "sectionName", title: "Section name", type: "string" }),
      defineField({ name: "sectionType", title: "Section type", type: "string", options: { list: ["hero", "content", "split", "cards", "steps", "faq", "cta", "image", "stats", "navigation"] } }),
      defineField({ name: "eyebrow", title: "Eyebrow / badge", type: "string" }),
      defineField({ name: "heading", title: "Heading", type: "string" }),
      defineField({ name: "subheading", title: "Subheading", type: "string" }),
      defineField({ name: "paragraph", title: "Paragraph", type: "text" }),
      defineField({ name: "secondaryParagraph", title: "Secondary paragraph", type: "text" }),
      imageWithAlt(), imageWithAlt("backgroundImage", "Background image"),
      defineField({ name: "buttonText", title: "Button text", type: "string" }),
      defineField({ name: "buttonHref", title: "Button URL / path", type: "string" }),
      defineField({ name: "secondaryButtonText", title: "Secondary button text", type: "string" }),
      defineField({ name: "secondaryButtonHref", title: "Secondary button URL / path", type: "string" }), defineField({ name: "editableFields", title: "Editable content fields", type: "array", of: [{ type: "object", fields: [defineField({ name: "key", title: "Content key", type: "string", readOnly: true, hidden: true }), defineField({ name: "label", title: "Field label", type: "string", readOnly: true }),defineField({ name: "kind", title: "Type", type: "string", options: { list: ["text", "image", "href"] }, readOnly: true, hidden: true }), defineField({ name: "source", title: "Original value", type: "text", readOnly: true, hidden: true }), defineField({ name: "value", title: "Editable text / URL", type: "text", hidden: ({ parent }) => parent?.kind === "image" }), defineField({ name: "image", title: "Editable image", type: "image", hidden: ({ parent }) => parent?.kind !== "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alternative text", type: "string" })] }), defineField({ name: "enabled", title: "Enabled", type: "boolean", initialValue: true })], preview: { select: { label: "label", kind: "kind", value: "value" }, prepare: (selection) => ({ title: selection.label || selection.value || "Editable field", subtitle: selection.kind || "Content" }) } }] }),
      item,
    ], preview: { select: { name: "sectionName", type: "sectionType" }, prepare: (selection) => ({ title: selection.name || "Page section", subtitle: selection.type || "Content" }) } },
    ] }),
  ],
})







