"use client"
import { usePathname } from "next/navigation"
import Navbar from "@/components/navbar"
export default function SiteChrome() {
  const pathname = usePathname()
  if (pathname === "/studio" || pathname.startsWith("/studio/")) return null
  return <Navbar />
}
