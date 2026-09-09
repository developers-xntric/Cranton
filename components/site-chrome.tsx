"use client"
import { usePathname } from "next/navigation"
import Navbar from "@/components/navbar"
import type { SiteHeader } from "@/sanity/lib/content"
export default function SiteChrome({ header }: { header?: SiteHeader | null }) {
  const pathname = usePathname()
  if (pathname === "/studio" || pathname.startsWith("/studio/")) return null
  return <Navbar header={header} />
}