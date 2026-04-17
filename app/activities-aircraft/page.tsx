import AirCraftWarningLights from "@/components/activities-aircraft/aircraft-warning-lights";
import GraySplitSection from "@/components/activities-aircraft/graysplitssection";
import SplitSection from "@/components/activities-aircraft/splitsection";
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
            <SplitSection />
            <GraySplitSection />
        </div>
    )
}

export default ActivitiesAircraft;
