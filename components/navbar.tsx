"use client"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Mail, Phone, MapPin, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"


const defaultSolutionImage = "/navbar/helideck-vertiport.png"

const solutionItems = [
    { name: "Helideck and Vertiport Platform Solutions", href: "/helideck-platform-solutions", hoverImage: "/navbar/helideck-vertiport.png" },
    { name: "Portable Helipads & Vertipads", href: "/portable-helipads-and-vertipads", hoverImage: "/navbar/portable-helipads.png" },
    { name: "Portable Lighting Solutions", href: "/portable-lighting-solutions", hoverImage: "/navbar/portable-lighting.png" },
    { name: "Heliports & Vertiports Lighting Solutions", href: "/heliports-&-vertiports-lighting-solutions", hoverImage: "/navbar/heliport-vertiport.png" },
    { name: "Moduler Floating Solutions", href: "/modular-floating-solutions", hoverImage: "/navbar/moduler-floating.png" },
    { name: "Obstructions Lights", href: "/obstruction-lighting-solutions", hoverImage: "/navbar/obstruction-lighting.png" },
]

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isSolutionsOpen, setIsSolutionsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [dropdownImage, setDropdownImage] = useState(defaultSolutionImage)
    const solutionsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (solutionsRef.current && !solutionsRef.current.contains(e.target as Node)) {
                setIsSolutionsOpen(false)
                setDropdownImage(defaultSolutionImage)
            }
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <nav className={cn(
            "fixed top-0 left-0 w-full z-50 transition-all duration-300",
            isMenuOpen ? "bg-[#0A0A0A]" : (isScrolled ? "bg-[#0A0A0A] lg:bg-black/20 lg:backdrop-blur-md" : "bg-black/20 backdrop-blur-md")
        )}>
            {/* Top Bar */}
            <div className=" text-white py-2.5 hidden md:block">
                <div className="max-w-[1440px] w-[90%] mx-auto flex justify-between items-center text-[12px] font-onest border-b pb-2">
                    <Link
                        href="https://www.google.com/maps/search/?api=1&query=Office+11A+Design+Works+William+Street+Felling+NE10+0JP+United+Kingdom"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[#fff] hover:text-[#168DCA] transition-colors"
                    >
                        <MapPin size={14} />
                        Office 11A, Design Works, William Street, Felling, NE10 0JP, United Kingdom.
                    </Link>
                    <div className="flex items-center gap-3">
                        <Link href="mailto:info@crantonelectric.com" className="flex items-center gap-2 text-[#FFF]">
                            <Mail size={14} />
                            info@crantonelectric.com
                        </Link>
                        <div className="h-4 w-px bg-white/20" />
                        <Link href="tel:+441916407503" className="flex items-center gap-2 text-[#FFF]">
                            <Phone size={14} />
                            +44 191 640 75 03
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <div className=" text-white py-2 ">
                <div className="max-w-[1440px] w-[90%] mx-auto  flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="relative h-10 md:h-12 w-48">
                        <Image
                            src="/nav-logo.png"
                            alt="Cranton"
                            fill
                            className="object-contain object-left"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-10 font-onest text-[15px]">
                        <Link href="/" className="hover:text-[#168DCA] transition-colors">Home</Link>
                        <Link href="/about" className="hover:text-[#168DCA] transition-colors">About Us</Link>

                        <div className="relative" ref={solutionsRef}>
                            <button
                                onClick={() => setIsSolutionsOpen(o => !o)}
                                className="flex items-center gap-1 hover:text-[#168DCA] transition-all duration-300 "
                            >
                                Solutions <ChevronDown size={14} className={cn("transition-transform duration-300", isSolutionsOpen && "rotate-180")} />
                            </button>

                            {/* Dropdown Menu */}
                            <AnimatePresence>
                                {isSolutionsOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute top-[140%] -left-16 w-[500px] bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xl"
                                    >
                                        <div className="flex">
                                            {/* Image Panel */}
                                            <div className="relative w-44 shrink-0">
                                                <Image
                                                    src={dropdownImage}
                                                    alt="Solutions"
                                                    fill
                                                    className="object-cover transition-all duration-500 ease-in-out"
                                                    sizes="176px"
                                                />
                                            </div>

                                            {/* Links Panel */}
                                            <div className="flex-1 p-5">
                                                <ul className="space-y-3">
                                                    {solutionItems.map((item, i) => (
                                                        <li key={i}>
                                                            <Link
                                                                href={item.href}
                                                                onClick={() => setIsSolutionsOpen(false)}
                                                                onMouseEnter={() => setDropdownImage(item.hoverImage)}
                                                                className="text-[13px] text-gray-600 hover:text-[#168DCA] transition-colors flex items-center gap-3 relative group/link"
                                                            >
                                                                <div className="w-0.85 h-[0.85px] rounded-full bg-gray-400 transition-all duration-300 group-hover/link:bg-[#168DCA]" />
                                                                {item.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link href="/contact" className="hover:text-[#168DCA] transition-colors">Contact Us</Link>
                    </div>

                    {/* Right Action */}
                    <div className="hidden lg:block">
                        <Link
                            href="/contact"
                            className="bg-white text-black px-5 py-2 rounded-md font-onest text-[13px] hover:bg-[#1681bc] hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300 active:scale-95 block"
                        >
                            Request a Quote
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button className="lg:hidden p-2 text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={isMenuOpen ? "close" : "open"}
                                initial={{ opacity: 0, rotate: -90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: 90 }}
                                transition={{ duration: 0.2 }}
                            >
                                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                            </motion.div>
                        </AnimatePresence>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 bg-[#0A0A0A] z-100 font-onest overflow-y-auto"
                    >
                        <div className="flex flex-col h-full p-6 pt-10">
                            <div className="flex justify-between items-center mb-12">
                                <div className="relative h-10 w-40">
                                    <Image src="/nav-logo.png" alt="Cranton" fill className="object-contain object-left" />
                                </div>
                                <button onClick={() => setIsMenuOpen(false)} className="p-3 border border-white/10 rounded-full hover:bg-white/5 transition-colors text-white">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex flex-col gap-6 text-xl font-medium text-white">
                                <Link href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-[#168DCA] transition-colors">Home</Link>
                                <Link href="/about" onClick={() => setIsMenuOpen(false)} className="hover:text-[#168DCA] transition-colors">About Us</Link>

                                <div className="space-y-4">
                                    <div className="hover:text-[#168DCA] transition-colors">Solutions</div>
                                    <div className="pl-4 flex flex-col gap-4 text-[16px] text-gray-400 border-l border-[#168DCA]/30">
                                        {solutionItems.map((item, i) => (
                                            <Link key={i} href={item.href} onClick={() => setIsMenuOpen(false)} className="hover:text-white transition-colors">{item.name}</Link>
                                        ))}
                                    </div>
                                </div>

                                <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-[#168DCA] transition-colors text-white">Contact Us</Link>
                            </div>

                            <div className="mt-auto pt-10 border-t border-white/10 space-y-8 pb-10">
                                <div className="flex flex-col gap-5 text-sm text-white/70">
                                    <div className="flex items-center gap-4 group"><div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#168DCA]/10 transition-colors"><Mail size={18} className="text-[#168DCA]" /></div> info@crantonelectric.com</div>
                                    <div className="flex items-center gap-4 group"><div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#168DCA]/10 transition-colors"><Phone size={18} className="text-[#168DCA]" /></div> +44 191 640 75 03</div>
                                </div>
                                <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="bg-white text-black w-full py-3 rounded-xl text-center font-bold block hover:bg-gray-200 transition-colors shadow-xl">
                                    Request a quote
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
