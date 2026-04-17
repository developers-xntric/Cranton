"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Mail, Phone, MapPin, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

const solutions = [
    {
        id: "heliport",
        title: "Heliport and vertiport",
        items: [
            "Helideck Consulting",
            "Refurbishing Helidecks",
            "Helideck Manufacturing",
            "Platform Mounting Helideck",
            "Fire Fighting System",
            "Helideck Lighting",
        ]
    },
    {
        id: "lighting",
        title: "Aircraft Obstructions Lights",
        items: [
            "Low Intensity Lights",
            "Medium Intensity Lights",
            "High Intensity Lights",
            "Dual Lighting Systems",
            "Solar Obstruction Lights",
        ]
    }
]

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isSolutionsOpen, setIsSolutionsOpen] = useState(false)
    const [activeCategory, setActiveCategory] = useState<string | null>("heliport")

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-md">
            {/* Top Bar */}
            <div className=" text-white py-2.5 hidden md:block">
                <div className="max-w-[1440px] w-[90%] mx-auto flex justify-between items-center text-[12px] font-onest border-b pb-2">
                    <div className="flex items-center gap-2 text-[#fff]">
                        <MapPin size={14} />
                        Office 11A, Design Works, William Street, Felling, NE10 0JP, United Kingdom.
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="mailto:[EMAIL_ADDRESS]" className="flex items-center gap-2 text-[#FFF]">
                            <Mail size={14}  />
                            info@crantonelectric.com
                        </Link>
                        <div className="h-4 w-px bg-white/20" />
                        <Link href="tel:+441916407503" className="flex items-center gap-2 text-[#FFF]">
                            <Phone size={14}  />
                            +44 191 640 75 03
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <div className=" text-white py-2 ">
                <div className="max-w-[1440px] w-[90%] mx-auto  flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="relative h-12 w-48">
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

                        <div className="relative" onMouseEnter={() => setIsSolutionsOpen(true)} onMouseLeave={() => setIsSolutionsOpen(false)}>
                            <button
                                className="flex items-center gap-1 hover:text-[#168DCA] transition-all duration-300 "
                            >
                                Solutions <ChevronDown size={14} className={cn("transition-transform duration-300", isSolutionsOpen && "rotate-180")} />
                            </button>

                            {/* Dropdown Menu (Accordion Style) */}
                            <AnimatePresence>
                                {isSolutionsOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute top-[80%] left-0 w-[350px] bg-[#0A0A0A]/95 backdrop-blur-3xl border border-white/10 rounded-2xl p-5 shadow-2xl overflow-hidden"
                                    >
                                        <div className="space-y-3">
                                            {solutions.map((category) => (
                                                <div key={category.id} className="overflow-hidden">
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setActiveCategory(activeCategory === category.id ? null : category.id);
                                                        }}
                                                        className={cn(
                                                            "w-full flex justify-between items-center p-3 rounded-xl text-[14px] font-medium transition-all duration-300",
                                                            activeCategory === category.id ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
                                                        )}
                                                    >
                                                        {category.title}
                                                        <ChevronDown size={14} className={cn("transition-transform duration-300", activeCategory === category.id && "rotate-180")} />
                                                    </button>
                                                    <AnimatePresence>
                                                        {activeCategory === category.id && category.items.length > 0 && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: "auto", opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                className="overflow-hidden"
                                                            >
                                                                <ul className="px-5 py-3 space-y-3 mt-1">
                                                                    {category.items.map((item, i) => (
                                                                        <li key={i}>
                                                                            <Link
                                                                                href="#"
                                                                                className="text-[13px] text-gray-400 hover:text-[#168DCA] transition-colors flex items-center gap-3 relative group/link"
                                                                            >
                                                                                <div className="w-1.5 h-[2px] rounded-full bg-gray-600 transition-all duration-300 group-hover/link:bg-[#168DCA] group-hover/link:w-3" />
                                                                                {item}
                                                                            </Link>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            ))}
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
                            href="/quote"
                            className="bg-white text-black px-7 py-2.5 rounded-md font-onest text-[14px] hover:bg-[#1681bc] hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300 active:scale-95 block"
                        >
                            Request A Quote
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
                        className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-100 font-onest"
                    >
                        <div className="flex flex-col h-full p-6 pt-10">
                            <div className="flex justify-between items-center mb-12">
                                <div className="relative h-10 w-40">
                                    <Image src="/nav-logo.png" alt="Cranton" fill className="object-contain object-left" />
                                </div>
                                <button onClick={() => setIsMenuOpen(false)} className="p-3 border border-white/10 rounded-full hover:bg-white/5 transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex flex-col gap-6 text-xl font-medium">
                                <Link href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-[#168DCA] transition-colors">Home</Link>
                                <Link href="/about" onClick={() => setIsMenuOpen(false)} className="hover:text-[#168DCA] transition-colors">About Us</Link>

                                <div className="space-y-4">
                                    <div className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] pl-1">Solutions</div>
                                    <div className="flex flex-col gap-5">
                                        {solutions.map((cat) => (
                                            <div key={cat.id} className="space-y-4">
                                                <button
                                                    onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                                                    className="flex items-center gap-2 w-full justify-between active:text-[#168DCA]"
                                                >
                                                    <span className={cn("text-lg transition-colors", activeCategory === cat.id && "text-[#168DCA]")}>{cat.title}</span>
                                                    <ChevronDown size={20} className={cn("transition-transform duration-300", activeCategory === cat.id && "rotate-180 text-[#168DCA]")} />
                                                </button>
                                                <AnimatePresence>
                                                    {activeCategory === cat.id && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            className="overflow-hidden pl-4 flex flex-col gap-4 text-[16px] text-gray-400 border-l border-[#168DCA]/30"
                                                        >
                                                            {cat.items.map((item, i) => (
                                                                <Link key={i} href="#" onClick={() => setIsMenuOpen(false)} className="hover:text-white transition-colors">{item}</Link>
                                                            ))}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-[#168DCA] transition-colors">Contact Us</Link>
                            </div>

                            <div className="mt-auto pt-10 border-t border-white/10 space-y-8 pb-10">
                                <div className="flex flex-col gap-5 text-sm text-gray-400">
                                    <div className="flex items-center gap-4 group"><div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#168DCA]/10 transition-colors"><Mail size={18} className="text-[#168DCA]" /></div> info@crantonelectric.com</div>
                                    <div className="flex items-center gap-4 group"><div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#168DCA]/10 transition-colors"><Phone size={18} className="text-[#168DCA]" /></div> +44 191 640 75 03</div>
                                </div>
                                <Link href="/quote" onClick={() => setIsMenuOpen(false)} className="bg-white text-black w-full py-4 rounded-xl text-center font-bold block hover:bg-gray-200 transition-colors shadow-xl">
                                    Request A Quote
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
