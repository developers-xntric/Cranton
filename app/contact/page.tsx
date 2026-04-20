import { ContactSection } from '@/components/contact/contact-section';
import DynamicHero from '@/components/dynamic-hero';

const Contact = () => {
    return (
        <div>
            <DynamicHero
                title={"Contact Us"}
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Contact Us" },
                ]}
                backgroundImage={"/contact/hero.png"}
            />
            <ContactSection />
        </div>
    )
}

export default Contact;
