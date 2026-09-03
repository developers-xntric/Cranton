import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import SiteChrome from "@/components/site-chrome";
import SiteFooter from "@/components/site-footer";
import CmsContentBridge from "@/components/cms-content-bridge";
import { getCmsEntries } from "@/sanity/lib/content";
export const metadata: Metadata = { title: "Cranton", description: "Aviation, Vertiport & Heliport Solutions" };
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cmsEntries = await getCmsEntries();
  return <html lang="en" className={cn("h-full", "antialiased")}><body className="min-h-full flex flex-col"><SiteChrome /><main className="grow">{children}</main><SiteFooter /><CmsContentBridge entries={cmsEntries} /></body></html>;
}

