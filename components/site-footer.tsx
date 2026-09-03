"use client"
import { usePathname } from "next/navigation"
import Footer from "@/components/footer"
export default function SiteFooter() {
  const pathname = usePathname()
  if (pathname === "/studio" || pathname.startsWith("/studio/")) return null
  return <Footer />
}
