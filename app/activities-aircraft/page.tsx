import AirCraftWarningLights from "@/components/activities-aircraft/aircraft-warning-lights";
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
            <AirCraftWarningLights />
        </div>
    )
}

export default ActivitiesAircraft;
