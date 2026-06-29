import Link from "next/link";
import Image from "next/image";

const LinkedinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

type FooterSettings = {
  logo: string;
  description: string;
  addressLabel: string;
  addressUrl: string;
  contactEmail: string;
  contactPhone: string;
  links: Array<{ label: string; href: string; download?: boolean }>;
  socialLinks: Array<{ name: string; href: string }>;
  copyrightLabel: string;
};

export default function Footer({ settings }: { settings: FooterSettings }) {
  return (
    <footer className="bg-black text-white pt-10 pb-5">
      <div className="max-w-[1440px] w-[90%] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 lg:gap-8 mb-6">
          <div className="flex flex-col gap-6">
            <Link href="/" className="relative h-28 w-48">
              <Image
                src={settings.logo}
                alt="Cranton"
                fill
                className="object-contain object-left"
              />
            </Link>
            <p className="font-onest text-[#FFF] font-normal text-sm md:text-[14px] leading-relaxed max-w-[280px]">
              {settings.description}
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="font-rethink text-lg font-bold">Office</h4>
            <div className="font-onest text-[#B8BCC4] text-sm space-y-4">
              <Link
                href={settings.addressUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block leading-relaxed hover:text-white transition-colors"
              >
                {settings.addressLabel}
              </Link>
              <div className="space-y-4">
                <Link
                  href={`mailto:${settings.contactEmail}`}
                  className="hover:text-white transition-colors block border-b border-[#B8BCC4] pb-1 w-fit"
                >
                  {settings.contactEmail}
                </Link>
              </div>
              <Link
                href={`tel:${settings.contactPhone.replace(/\s+/g, "")}`}
                className=" text-white text-base pt-2"
              >
                {settings.contactPhone}
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="font-rethink text-lg font-bold">Links</h4>
            <ul className="font-onest text-[#B8BCC4] text-sm space-y-4">
              {settings.links.map((link) => (
                <li key={link.href}>
                  {link.download ? (
                    <a
                      href={link.href}
                      download
                      className="hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="font-rethink text-lg font-bold">Get In Touch</h4>
            <div className="flex flex-wrap gap-1">
              {settings.socialLinks.map((social, idx) => (
                <Link
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300 group"
                >
                  <LinkedinIcon />
                  <span className="text-[12px] font-medium leading-none">
                    {social.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-5 border-t border-white/10 text-center">
          <p className="font-onest text-[13px] text-[#ACAFB2]">
            {settings.copyrightLabel.replace(
              "{year}",
              String(new Date().getFullYear())
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
