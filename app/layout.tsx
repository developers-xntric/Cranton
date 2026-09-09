import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import SiteChrome from "@/components/site-chrome";
import SiteFooter from "@/components/site-footer";
import CmsContentBridge from "@/components/cms-content-bridge";
import { getCmsEntries, getSiteChrome } from "@/sanity/lib/content";
export const metadata: Metadata = { title: "Cranton", description: "Aviation, Vertiport & Heliport Solutions" };
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cmsEntries = await getCmsEntries();
  const { header, footer } = await getSiteChrome();
  return <html lang="en" className={cn("h-full", "antialiased")}><body className="min-h-full flex flex-col"><SiteChrome header={header} /><main className="grow">{children}</main><SiteFooter footer={footer} /><CmsContentBridge entries={cmsEntries} /></body></html>;
}

