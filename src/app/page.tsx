import { HomeCarRecomendation } from "./(client)/home/car-recomendation";
import { ContactUs } from "./(client)/home/contact-us";
import { HomeHeroBanner } from "./(client)/home/hero-banner";
import { OurLocation } from "./(client)/home/our-location";
import { TrustedBy } from "./(client)/home/our-partners";
import { HomeWhyChooseUs } from "./(client)/home/why-chooseus";

export default async function Home() {

  return (
    <>
        <HomeHeroBanner />
        <TrustedBy />
        <HomeWhyChooseUs />
        <HomeCarRecomendation />
        <OurLocation />
        <ContactUs />
      </>
  );
}