import AirCraftWarningLights from "@/components/activities-aircraft/aircraft-warning-lights";
import GraySplitSection from "@/components/activities-aircraft/graysplitssection";
import SplitSection from "@/components/activities-aircraft/splitsection";
import SplitSectionHelideck from "@/components/activities-helideck/splitsection-helideck";
import DynamicHero from "@/components/dynamic-hero";
import HvGrey from "@/components/hv-grey";
import HvLeftRight from "@/components/hv-left-right";
import ITValueCard from "@/components/it-value-card";
import ThreeCards from "@/components/three-cards";


const HeliportsLightingSolutions = () => {
    return (
        <div>
            <DynamicHero
                title={"Heliports & Vertiports Lighting Solutions"}
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Heliports & Vertiports Lighting Solutions" },
                ]}
                backgroundImage={"/activities-aircraft/herobanner.png"}
            />
            <ITValueCard
       btn="Inquire Now"
        title={
          
          "Heliports & Vertiports Lighting Solutions"
        }
        subtitle={
          "Smart, Safe & Future-Ready Air Mobility Infrastructure"
        }
        description1={
        
          "Americana Computers provides enterprise IT infrastructure solutions and cloud solutions across the United Arab Emirates. We help organizations design, deploy, and operate secure digital infrastructure environments that are critical to business continuity, operational efficiency, and future readiness.\nHere are some of the cloud service solutions we implement:"
        }
        description2={
        
          "Our team of certified professionals ensures that your lighting systems meet the highest standards of safety and performance."
        }
        image1={ "/hv1.png"}
        image2={ "/hv2.png"}
        
      />
      <HvGrey
                      sections={[
                          {
                              title: "Complete Lighting Ecosystem",
                              subtitle: "End-to-End Airside Visibility.",
                              image: "/heliport-mounting/specification.png",
                              imageAlt: "Engineering Precision",
                              
                              points: [
                                  { title: "Service Type: Platform Mounting" },
                                  { title: "Process: Site Analysis & Engineering" },
                                  { title: "Compliance: Aviation Standards" },
                                  { title: "Outcome: Stable & Secure Infrastructure" },
                              ],
                              paragraphs: [
                                  "Each component is engineered to integrate seamlessly, delivering consistent performance and unified control.",
                                  
                              ],
                              
                          },
                          
                      ]}
                  />
                 <ThreeCards
                                 isBlack={true}
                                 heading="Engineered for Reliability, Efficiency & Safety"
                                 para=""
                                 features={[
                                     {
                                         icon: "/helideck-lighting/1.png",
                                         title: "High-Performance LED Technology",
                                         desc: "Up to 100,000-hour lifespan with consistent brightness",
                                     },
                                     {
                                         icon: "/helideck-lighting/2.png",
                                         title: "Energy Efficiency",
                                         desc: "Low power consumption reduces operational costs",
                                     },
                                     {
                                         icon: "/helideck-lighting/3.png",
                                         title: "Rugged Construction",
                                         desc: "Corrosion-resistant materials designed for demanding environments",
                                     },
                                     {
                                         icon: "/helideck-lighting/4.png",
                                         title: "Environmental Protection",
                                         desc: "IP-rated systems for resistance against dust and water ingress",
                                     },
                                     {
                                         icon: "/helideck-lighting/4.png",
                                         title: "Flexible Control Options",
                                         desc: "Adjustable light intensity for different operational requirements",
                                     },
                                     {
                                         icon: "/helideck-lighting/4.png",
                                         title: "Pilot-Centric Design",
                                         desc: "Glare reduction and NVG compatibility for enhanced safety",
                                     },
                                 ]}
                             />
                 <HvLeftRight 
                  sections={[
                          {
                              title: "Hooded LED Floodlights",
                              subtitle: "High-Performance Surface Illumination",
                              paragraphs: [
                                  "Crantron’s hooded LED floodlights are engineered to illuminate landing zones, surrounding terrain, and potential obstacles, providing pilots with enhanced situational awareness during approach and landing.",
                                  "The integrated hood minimizes glare, ensuring visibility without compromising pilot comfort or safety."
                                  
                              ],
                              image: "/heliport-mounting/specification.png",
                              imageAlt: "Engineering Precision",
                              keytitle: "Key Features:",
                              points: [
                                  { title: "Service Type: Platform Mounting" },
                                  { title: "Process: Site Analysis & Engineering" },
                                  { title: "Compliance: Aviation Standards" },
                                  { title: "Outcome: Stable & Secure Infrastructure" },
                              ],
                              greytitle: "Why It Matters",
                              greypara: "Improves landing accuracy by giving pilots a clear, well-lit view of terrain conditions and potential hazards",
                              
                              
                          },
                           {
                            reverse: true,
                              title: "Hooded LED Floodlights",
                              subtitle: "High-Performance Surface Illumination",
                              paragraphs: [
                                  "Crantron’s hooded LED floodlights are engineered to illuminate landing zones, surrounding terrain, and potential obstacles, providing pilots with enhanced situational awareness during approach and landing.",
                                  "The integrated hood minimizes glare, ensuring visibility without compromising pilot comfort or safety."
                                  
                              ],
                              image: "/heliport-mounting/specification.png",
                              imageAlt: "Engineering Precision",
                              keytitle: "Key Features:",
                              points: [
                                  { title: "Service Type: Platform Mounting" },
                                  { title: "Process: Site Analysis & Engineering" },
                                  { title: "Compliance: Aviation Standards" },
                                  { title: "Outcome: Stable & Secure Infrastructure" },
                              ],
                              greytitle: "Why It Matters",
                              greypara: "Improves landing accuracy by giving pilots a clear, well-lit view of terrain conditions and potential hazards",
                              
                              
                          },
                          
                      ]} />
                      <HvLeftRight 
                     isBlack={true}
                  sections={[
                            
                          {
                              title: "Hooded LED Floodlights",
                              subtitle: "High-Performance Surface Illumination",
                              paragraphs: [
                                  "Crantron’s hooded LED floodlights are engineered to illuminate landing zones, surrounding terrain, and potential obstacles, providing pilots with enhanced situational awareness during approach and landing.",
                                  "The integrated hood minimizes glare, ensuring visibility without compromising pilot comfort or safety."
                                  
                              ],
                              image: "/heliport-mounting/specification.png",
                              imageAlt: "Engineering Precision",
                              keytitle: "Key Features:",
                              points: [
                                  { title: "Service Type: Platform Mounting" },
                                  { title: "Process: Site Analysis & Engineering" },
                                  { title: "Compliance: Aviation Standards" },
                                  { title: "Outcome: Stable & Secure Infrastructure" },
                              ],
                              greytitle: "Why It Matters",
                              greypara: "Improves landing accuracy by giving pilots a clear, well-lit view of terrain conditions and potential hazards",
                              
                              
                          },
                           
                          
                      ]} />
            
        </div>
    )
}

export default HeliportsLightingSolutions;
