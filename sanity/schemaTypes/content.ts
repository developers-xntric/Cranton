import { defineField, defineType } from "sanity"
export const contentType = defineType({
  name: "siteContent", title: "Site content", type: "document",
  fields: [
    defineField({ name: "title", title: "Content set name", type: "string", initialValue: "Cranton website content" }),
    defineField({ name: "entries", title: "Editable content", type: "array", of: [{ type: "object", fields: [
      defineField({ name: "key", title: "Key", type: "string", readOnly: true }),
      defineField({ name: "kind", title: "Type", type: "string", options: { list: ["text", "image", "href"] }, readOnly: true }),
      defineField({ name: "source", title: "Original value", type: "text", readOnly: true }),
      defineField({ name: "value", title: "Editable text / URL", type: "text" }),
      defineField({ name: "image", title: "Editable image", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alternative text", type: "string" })] }),
      defineField({ name: "enabled", title: "Enabled", type: "boolean", initialValue: true }),
    ] }] }),
  ],
})
