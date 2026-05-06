import DynamicHero from '@/components/dynamic-hero';

const PortableHelipadsAndVertipads = () => {
    return (
        <div>
            <DynamicHero
                title={"Portable Helipads & Vertipads"}
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Portable Helipads & Vertipads" },
                ]}
                backgroundImage={"/heli.png"}
            />
        </div>
    )
}

export default PortableHelipadsAndVertipads
