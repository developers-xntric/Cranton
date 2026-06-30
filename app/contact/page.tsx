import { ContactSection } from '@/components/contact/contact-section';
import DynamicHero from '@/components/dynamic-hero';
import { getStoryblokStoryContent } from '@/lib/storyblok';
import { mapStoryblokContent } from '@/lib/storyblok-mappers';

const contactFallbackContent = {
  hero: {
    title: "Contact Us",
    backgroundImage: "/contact/hero.png",
  },
  form: {
    heading: "Have Inquiries?\nReach Out Via\nMessage",
    infoCards: [
      {
        title: "Our Address",
        value: "Office 11A, Design Works, William \nStreet, Felling, NE10 0JP, United \nKingdom.",
        href: "https://www.google.com/maps/search/?api=1&query=Office+11A+Design+Works+William+Street+Felling+NE10+0JP+United+Kingdom",
        type: "address" as const,
      },
      {
        title: "Contact Info",
        value: "+44 191 640 76 03",
        href: "tel:+441916407603",
        type: "phone" as const,
      },
      {
        title: "E-mail Us",
        value: "info@crantonelectric.com",
        href: "mailto:info@crantonelectric.com",
        type: "email" as const,
      },
    ],
  },
};

const Contact = async () => {
  const rawContent = await getStoryblokStoryContent("contact");
  const content = mapStoryblokContent(rawContent, contactFallbackContent);

  return (
    <div>
      <DynamicHero
        title={content.hero.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact Us" },
        ]}
        backgroundImage={content.hero.backgroundImage}
      />
      <ContactSection heading={content.form.heading} infoCards={content.form.infoCards} />
    </div>
  );
};

export default Contact;
