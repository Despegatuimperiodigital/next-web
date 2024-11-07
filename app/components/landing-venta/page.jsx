// LandingPage.jsx
import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import PainSection from './components/PainSection';
import SolutionSection from './components/SolutionSection';
import SocialProofSection from './components/SocialProofSection';
import PlansSection from './components/PlansSection';
import GuaranteesSection from './components/GuaranteesSection';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />
      <main>
        <HeroSection />
        <PainSection />
        <SolutionSection />
        <SocialProofSection />
        <PlansSection />
        <GuaranteesSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;