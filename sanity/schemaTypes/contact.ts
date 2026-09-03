import { defineField, defineType } from "sanity"
import { imageWithAlt } from "./shared"

const text = (name: string, title: string, type: "string" | "text" = "string") => defineField({ name, title, type })

export const contactType = defineType({
  name: "contactPage",
  title: "Contact Us Page",
  type: "document",
  fields: [
    defineField({ name: "heroSection", title: "Hero Section", type: "object", fields: [text("heading", "Heading"), imageWithAlt("backgroundImage", "Background image"), text("breadcrumbHome", "Breadcrumb home label"), text("breadcrumbHomeHref", "Breadcrumb home URL")] }),
    defineField({ name: "contactInfoSection", title: "Contact Information", type: "object", fields: [text("addressHeading", "Address heading"), text("address", "Address", "text"), text("addressHref", "Address URL"), text("phoneHeading", "Phone heading"), text("phone", "Phone"), text("phoneHref", "Phone URL"), text("emailHeading", "Email heading"), text("email", "Email"), text("emailHref", "Email URL")] }),
    defineField({ name: "formSection", title: "Contact Form", type: "object", fields: [text("heading", "Heading"), text("nameLabel", "Name label"), text("namePlaceholder", "Name placeholder"), text("emailLabel", "Email label"), text("emailPlaceholder", "Email placeholder"), text("messageLabel", "Message label"), text("messagePlaceholder", "Message placeholder"), text("submitButtonText", "Submit button text"), text("loadingButtonText", "Loading button text"), text("successMessage", "Success message", "text"), text("errorMessage", "Error message", "text")] }),
    defineField({ name: "seoTitle", title: "SEO title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO description", type: "text" }),
  ],
})