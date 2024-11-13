// LandingPage.jsx
import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import PainSection from './components/PainSection';
import SolutionSection from './components/SolutionSection';
import SocialProofSection from './components/SocialProofSection';
import PlansSection from './components/PlansSection';


const LandingPageVenta = () => {
  return (
    <div className="landing-page">
      <Header />
      <main>
        <HeroSection />
        <PainSection />
        <SolutionSection />
        <SocialProofSection />
        <PlansSection />
      
      </main>
      
    </div>
  );
};

export default LandingPageVenta;