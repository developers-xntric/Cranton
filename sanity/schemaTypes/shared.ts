import { defineField, defineType } from "sanity"
export const imageWithAlt = (name = "image", title = "Image") => defineField({ name, title, type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alternative text", type: "string" })] })
export const linkType = defineType({ name: "link", title: "Link", type: "object", fields: [defineField({ name: "label", title: "Label", type: "string" }), defineField({ name: "href", title: "URL / path", type: "string" }), defineField({ name: "newTab", title: "Open in new tab", type: "boolean", initialValue: false })] })
