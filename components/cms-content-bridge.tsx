"use client"
import { useEffect } from "react"
import { usePathname } from "next/navigation"
import type { CmsEntry } from "@/sanity/lib/content"

function replaceText(entry: CmsEntry) { if (entry.key === "home-hero-heading" && entry.value) { const heroHeading = document.querySelector("main > section h1"); if (heroHeading) heroHeading.textContent = entry.value; return } if (entry.key === "about-cta-heading" && entry.value) { const headings = document.querySelectorAll("main section h2"); const heading = headings[headings.length - 1]; if (heading) heading.textContent = entry.value; return } if (entry.key === "contact-form-heading" && entry.value) { const heading = document.querySelector("main h2"); if (heading) heading.textContent = entry.value; return } if (entry.value && entry.key === "contact-hero-heading") { const element = document.querySelector("main h1"); if (element) element.textContent = entry.value; return } const contactHeadingIndexes: Record<string, number> = { "contact-address-heading": 0, "contact-phone-heading": 1, "contact-email-heading": 2 }; if (entry.value && entry.key in contactHeadingIndexes) { const element = document.querySelectorAll("main > div > section:nth-of-type(2) h3")[contactHeadingIndexes[entry.key]]; if (element) element.textContent = entry.value; return } const contactLinkIndexes: Record<string, number> = { "contact-address": 0, "contact-phone": 1, "contact-email": 2 }; if (entry.value && entry.key in contactLinkIndexes) { const element = document.querySelectorAll("main > div > section:nth-of-type(2) a")[contactLinkIndexes[entry.key]]; if (element) element.textContent = entry.value; return }
  if (!entry.value || entry.value === entry.source) return
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  const nodes: Text[] = []
  let node: Node | null
  while ((node = walker.nextNode())) nodes.push(node as Text)
  for (const text of nodes) if (text.nodeValue?.includes(entry.source)) text.nodeValue = text.nodeValue.split(entry.source).join(entry.value)
}
function replaceAttributes(entry: CmsEntry) { if (entry.value && entry.key === "contact-name-placeholder") document.querySelector<HTMLInputElement>("input[name=name]")?.setAttribute("placeholder", entry.value); if (entry.value && entry.key === "contact-email-placeholder") document.querySelector<HTMLInputElement>("input[name=email]")?.setAttribute("placeholder", entry.value); if (entry.value && entry.key === "contact-message-placeholder") document.querySelector<HTMLTextAreaElement>("textarea[name=message]")?.setAttribute("placeholder", entry.value);
  if (!entry.value || entry.value === entry.source) return
  document.querySelectorAll<HTMLElement>("a[href], area[href]").forEach((el) => { if (el.getAttribute("href") === entry.source) el.setAttribute("href", entry.value!) })
  document.querySelectorAll<HTMLImageElement>("img").forEach((el) => { const src = el.getAttribute("src") || ""; if (src === entry.source || src.includes(encodeURIComponent(entry.source))) el.setAttribute("src", entry.value!) })
}
function replaceImage(entry: CmsEntry) {
  const url = entry.image?.url
  if (!url) return
  document.querySelectorAll<HTMLImageElement>("img").forEach((el) => { const src = el.getAttribute("src") || ""; if (src === entry.source || src.includes(encodeURIComponent(entry.source))) el.setAttribute("src", url) })
}
export default function CmsContentBridge({ entries }: { entries: CmsEntry[] }) {
  const pathname = usePathname()
  useEffect(() => {
    const currentEntries = entries.filter((entry) => !entry.pageSlug || entry.pageSlug === pathname)
    if (!currentEntries.length) return
    for (const entry of currentEntries) { if (entry.enabled === false) continue; if (entry.kind === "text") replaceText(entry); else if (entry.kind === "href") replaceAttributes(entry); else replaceImage(entry) }
  }, [entries, pathname])
  return null
}
