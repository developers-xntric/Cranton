import Link from "next/link"
import Image from "next/image"
import type { SiteFooter } from "@/sanity/lib/content"

const FacebookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
)
const InstagramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
)
const LinkedinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
)
const YoutubeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 2-2 61.76 61.76 0 0 1 15 0 2 2 0 0 1 2 2 24.12 24.12 0 0 1 0 10 2 2 0 0 1-2 2 61.76 61.76 0 0 1-15 0 2 2 0 0 1-2-2z" /><path d="m10 15 5-3-5-3z" /></svg>
)
const TwitterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
)

export default function Footer({ footer }: { footer?: SiteFooter | null }) {
    const socialLinks = footer?.socialLinks?.length ? footer.socialLinks : [{ label: "LinkedIn", href: "https://www.linkedin.com/company/cranton-electrical-limited-uk/", newTab: true }]
    const copyrightText = (footer?.copyrightText || "Copyright Â© {year} All Rights Reserved.").replace("{year}", String(new Date().getFullYear()))
    return (
        <footer className="bg-black text-white pt-10 pb-5">
            <div className="2xl:max-w-360 w-[90%] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 lg:gap-8 mb-6">
                    {/* Column 1: Brand */}
                    <div className="flex flex-col gap-6">
                        <Link href="/" className="relative h-28 w-48">
                            <Image
                                src={footer?.logo?.url || "/footer-logo.png"}
                                alt={footer?.logo?.alt || "Cranton"}
                                fill
                                className="object-contain object-left"
                            />
                        </Link>
                        <p className="font-onest text-[#FFF] font-normal text-sm md:text-[14px] leading-relaxed max-w-70">
                            {footer?.description || "From precision-engineered deck platforms to advanced fixed and portable lighting systems, Cranton delivers aviation, vertiport, and heliport solutions built for safety, compliance, and long-term operational reliability."}
                        </p>
                    </div>

                    {/* Column 2: Office */}
                    <div className="flex flex-col gap-6">
                        <h4 className="font-rethink text-lg font-bold">Office</h4>
                        <div className="font-onest text-[#B8BCC4] text-sm space-y-4">
                            <Link
                                href={footer?.addressHref || "https://www.google.com/maps/search/?api=1&query=Office+11A+Design+Works+William+Street+Felling+NE10+0JP+United+Kingdom"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block leading-relaxed hover:text-white transition-colors"
                            >
                                {footer?.address || "Office 11A, Design Works, William Street, Felling, NE10 0JP, United Kingdom."}
                            </Link>
                            <div className="space-y-4">
                                <Link href={footer?.emailHref || "mailto:info@crantonelectric.com"} className="hover:text-white transition-colors block border-b border-[#B8BCC4] pb-1 w-fit">
                                    {footer?.email || "info@crantonelectric.com"}
                                </Link>
                            </div>
                            <Link href={footer?.phoneHref || "tel:+441916407503"} className=" text-white text-base pt-2">
                                {footer?.phone || "+44 191 640 75 03"}
                            </Link>
                        </div>
                    </div>

                    {/* Column 3: Links */}
                    <div className="flex flex-col gap-6">
                        <h4 className="font-rethink text-lg font-bold">Links</h4>
                        <ul className="font-onest text-[#B8BCC4] text-sm space-y-4">
                            {(footer?.links?.length ? footer.links : [{ label: "Home", href: "/" }, { label: "About Us", href: "/about" }, { label: "E-Brochure", href: "/Cranton-E-Brochure.pdf" }, { label: "Contact Us", href: "/contact" }]).map((link) => link.label && link.href && <li key={link.label}><Link href={link.href} target={link.newTab ? "_blank" : undefined} className="hover:text-white transition-colors">{link.label}</Link></li>)}
                            {/* CMS footer links render above. */}

                            {/* <li><Link href="/solutions" className="hover:text-white transition-colors">Solutions</Link></li> */}


                        </ul>
                    </div>

                    {/* Column 4: Social */}
                    <div className="flex flex-col gap-3">
                        <h4 className="font-rethink text-lg font-bold">Get In Touch</h4>
                        <div className="flex flex-wrap gap-1 w-fit">
                        </div>
                            {socialLinks.map((social, idx) => (
                                <Link key={(social.label || "social") + "-" + idx} href={social.href || "#"} target={social.newTab ? "_blank" : undefined} rel={social.newTab ? "noopener noreferrer" : undefined} className="flex w-fit items-center gap-2 px-4 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300 group">
                                    <LinkedinIcon />
                                    <span className="text-[12px] font-medium leading-none">{social.label}</span>
                                </Link>
                            ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-5 border-t border-white/10 text-center">
                    <p className="font-onest text-[13px] text-[#ACAFB2]">
                        {copyrightText}
                    </p>
                </div>
            </div>
        </footer>
    )
}
