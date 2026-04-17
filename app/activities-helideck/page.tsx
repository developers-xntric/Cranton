import AirCraftWarningLights from "@/components/activities-aircraft/aircraft-warning-lights";
import GraySplitSection from "@/components/activities-aircraft/graysplitssection";
import SplitSection from "@/components/activities-aircraft/splitsection";
import DynamicHero from "@/components/dynamic-hero";
import ActivitiesAircraft from "../activities-aircraft/page";
import ImageContentSection from "@/components/activities-helideck/image-content-section";
import SplitSectionHelideck from "@/components/activities-helideck/splitsection-helideck";

const ActivitiesHelideck = () => {
    return (
        <div>
            <DynamicHero
                title={"Activities"}
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Activities" }, 
                ]}
                backgroundImage={"/activities-helideck/hero.png"}
            />
            <ImageContentSection />
            <SplitSectionHelideck  />
               
        </div>
    )
}

export default ActivitiesHelideck;
