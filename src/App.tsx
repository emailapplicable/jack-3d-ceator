import React, { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactModal } from './components/ContactModal';
import { ProjectModal } from './components/ProjectModal';
import { ProjectItem } from './data/portfolioData';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );

  return (
    <main
      className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA]"
      style={{
        overflowX: 'clip',
        fontFamily: "'Kanit', sans-serif",
      }}
    >
      <HeroSection onOpenContact={() => setIsContactOpen(true)} />
      <MarqueeSection />
      <AboutSection onOpenContact={() => setIsContactOpen(true)} />
      <ServicesSection />
      <ProjectsSection onSelectProject={setSelectedProject} />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenContact={() => setIsContactOpen(true)}
      />
    </main>
  );
}
