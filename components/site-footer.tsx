"use client"
import { usePathname } from "next/navigation"
import Footer from "@/components/footer"
import type { SiteFooter } from "@/sanity/lib/content"
export default function SiteFooter({ footer }: { footer?: SiteFooter | null }) {
  const pathname = usePathname()
  if (pathname === "/studio" || pathname.startsWith("/studio/")) return null
  return <Footer footer={footer} />
}