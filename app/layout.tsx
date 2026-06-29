import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { getStoryblokContent } from "@/lib/storyblok";
import { mapSiteSettingsContent } from "@/lib/storyblok-mappers";

export const metadata: Metadata = {
  title: "Cranton",
  description: "Aviation, Vertiport & Heliport Solutions",
};

const siteSettingsFallback = {
  navbar: {
    logo: "/nav-logo.png",
    contactEmail: "info@crantonelectric.com",
    contactPhone: "+44 191 640 75 03",
    addressLabel:
      "Office 11A, Design Works, William Street, Felling, NE10 0JP, United Kingdom.",
    addressUrl:
      "https://www.google.com/maps/search/?api=1&query=Office+11A+Design+Works+William+Street+Felling+NE10+0JP+United+Kingdom",
    primaryCtaLabel: "Request a Quote",
    primaryCtaHref: "/contact",
    solutionItems: [
      {
        name: "Heliports & Vertiports Solutions",
        href: "/heliports-&-vertiports-solutions",
        hoverImage: "/home/service-4.png",
      },
      {
        name: "Portable Helipads & Vertipads",
        href: "/portable-helipads-and-vertipads",
        hoverImage: "/home/service-1.png",
      },
      {
        name: "Portable Lighting Solutions",
        href: "/portable-lighting-solutions",
        hoverImage: "/home/service-7.png",
      },
      {
        name: "Heliports & Vertiports Lighting Solutions",
        href: "/heliports-&-vertiports-lighting-solutions",
        hoverImage: "/home/service-5.png",
      },
      {
        name: "Modular Floating Solutions",
        href: "/modular-floating-solutions",
        hoverImage: "/home/service-3.png",
      },
      {
        name: "Obstruction Lighting Solutions",
        href: "/obstruction-lighting-solutions",
        hoverImage: "/obs.png",
      },
    ],
  },
  footer: {
    logo: "/footer-logo.png",
    description:
      "From precision-engineered deck platforms to advanced fixed and portable lighting systems, Cranton delivers aviation, vertiport, and heliport solutions built for safety, compliance, and long-term operational reliability.",
    addressLabel:
      "Office 11A, Design Works, William Street, Felling, NE10 0JP, United Kingdom.",
    addressUrl:
      "https://www.google.com/maps/search/?api=1&query=Office+11A+Design+Works+William+Street+Felling+NE10+0JP+United+Kingdom",
    contactEmail: "info@crantonelectric.com",
    contactPhone: "+44 191 640 75 03",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "E-Brochure", href: "/Cranton-E-Brochure.pdf", download: true },
      { label: "Contact Us", href: "/contact" },
    ],
    socialLinks: [
      {
        name: "LinkedIn",
        href: "https://www.linkedin.com/company/cranton-electrical-limited-uk/",
      },
    ],
    copyrightLabel: "Copyright © {year} All Rights Reserved.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettingsRaw = await getStoryblokContent(
    "site-settings",
    siteSettingsFallback
  );
  const siteSettings = mapSiteSettingsContent(siteSettingsRaw, siteSettingsFallback);

  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased")}
    >
      <body className="min-h-full flex flex-col">
        <Navbar settings={siteSettings.navbar} />
        <main className="grow">
          {children}
        </main>
        <Footer settings={siteSettings.footer} />
      </body>
    </html>
  );
}
