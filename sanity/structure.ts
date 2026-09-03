import type { StructureResolver } from "sanity/structure"
const pages = [
  ["Home", "page-home"], ["About Us", "page-about"], ["Contact Us", "page-contact"],
  ["Heliports & Vertiports Lighting Solutions", "page-heliports-&-vertiports-lighting-solutions"],
  ["Heliports & Vertiports Solutions", "page-heliports-&-vertiports-solutions"],
  ["Modular Floating Solutions", "page-modular-floating-solutions"],
  ["Obstruction Lighting Solutions", "page-obstruction-lighting-solutions"],
  ["Portable Helipads & Vertipads", "page-portable-helipads-and-vertipads"],
  ["Portable Lighting Solutions", "page-portable-lighting-solutions"],
] as const
const safeId = (id: string) => id.replace(/[^a-zA-Z0-9_-]/g, "-")
export const structure: StructureResolver = (S) => S.list().title("Cranton Pages").items([
  S.listItem().title("Header / Navbar").id("header-default").child(S.document().schemaType("header").documentId("header-default").title("Header / Navbar")),
  S.listItem().title("Footer").id("footer-default").child(S.document().schemaType("footer").documentId("footer-default").title("Footer")),
  S.divider(),
  S.listItem().title("Home").id("home-page").child(S.document().schemaType("homePage").documentId("home-page").title("Home Page")), S.listItem().title("About Us").id("about-page").child(S.document().schemaType("aboutPage").documentId("about-page").title("About Us Page")), S.listItem().title("Contact Us").id("contact-page").child(S.document().schemaType("contactPage").documentId("contact-page").title("Contact Us Page")), ...pages.filter(([title]) => !["Home", "About Us", "Contact Us"].includes(title)).map(([title, id]) => S.listItem().title(title).id(safeId(id)).child(S.document().schemaType("sitePage").documentId(safeId(id)).title(title))),
])
