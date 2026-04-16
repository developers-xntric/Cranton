import DynamicHero from "@/components/dynamic-hero";

const ActivitiesAircraft = () => {
    return (
        <div>
            <DynamicHero
                title={"Activities"}
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Activities" },
                ]}
                backgroundImage={"/activities-aircraft/herobanner.png"}
            />
        </div>
    )
}

export default ActivitiesAircraft;
