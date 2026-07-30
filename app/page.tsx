import { Footer } from "@/components/Footer";
import { LandingPage } from "@/components/LandingPage";
import { Navbar } from "@/components/Navbar";
import { RegistrationBanner } from "@/components/RegistrationBanner";
import { FounderSection } from "@/components/FounderSection";

export default function Home() { return <><Navbar /><LandingPage />
<RegistrationBanner />
<FounderSection /><Footer /></>; }
