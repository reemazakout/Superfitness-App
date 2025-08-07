import bgHero from "../../assets/images/hero-bg.png";
import AboutUs from "./components/about-us/about-us";
import ChatAi from "./components/ChatAi";
import HeroSection from "./components/hero-section/hero";
import MealsSection from "./components/meals-section/meals";
import WhyUs from "./components/why-us/why-us";
import WorkoutSection from "./components/workout/workout";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative pt-1">
        {/* 🔥 Background Layer */}
        <div
          className="absolute inset-0 -z-10 w-full h-full bg-cover bg-center bg-no-repeat bg-fixed "
          style={{
            backgroundImage: `url(${bgHero})`,
          }}
        >
          <div className="w-full h-full bg-[#FFFFFF99] dark:bg-[#24242499] backdrop-blur-[35.1px]" />
        </div>
        <div className="pt-24 md:pt-0 w-full">
          <HeroSection />
        </div>
      </div>

      {/* HomePage Content */}
      <div className="bg-surface">
        {/* About Us */}
        <AboutUs />

        {/* Workout Section */}
        <WorkoutSection />

        {/* Why Us */}
        <WhyUs />
      </div>
      <MealsSection />
      <ChatAi />
    </div>
  );
}
