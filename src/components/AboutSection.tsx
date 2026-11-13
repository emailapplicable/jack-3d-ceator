import React from 'react';
import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';
import { ContactButton } from './ContactButton';
import { SmartImage } from './SmartImage';
import { ABOUT_CORNER_IMAGES } from '../data/portfolioData';

export interface AboutSectionProps {
  onOpenContact: () => void;
}

const ABOUT_BIO =
  "I'm Arian (arian.freelancer), a Full-Stack Developer handling small to large projects across coding, website design, and automation. Focus on your business; I'll handle the tech. DM to get started!";

export function AboutSection({ onOpenContact }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 bg-[#0C0C0C] overflow-hidden"
    >
      <div className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px] pointer-events-none select-none z-0">
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
          <SmartImage
            src={ABOUT_CORNER_IMAGES.topLeft}
            alt="3D moon sculpture"
            fallbackLabel="3D Moon"
            className="w-full h-auto object-contain rounded-2xl"
          />
        </FadeIn>
      </div>

      <div className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px] pointer-events-none select-none z-0">
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
          <SmartImage
            src={ABOUT_CORNER_IMAGES.bottomLeft}
            alt="3D geometric object"
            fallbackLabel="3D Object"
            className="w-full h-auto object-contain rounded-2xl"
          />
        </FadeIn>
      </div>

      <div className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px] pointer-events-none select-none z-0">
        <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
          <SmartImage
            src={ABOUT_CORNER_IMAGES.topRight}
            alt="3D modular block icon"
            fallbackLabel="3D Block"
            className="w-full h-auto object-contain rounded-2xl"
          />
        </FadeIn>
      </div>

      <div className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px] pointer-events-none select-none z-0">
        <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
          <SmartImage
            src={ABOUT_CORNER_IMAGES.bottomRight}
            alt="3D abstract composition"
            fallbackLabel="3D Composition"
            className="w-full h-auto object-contain rounded-2xl"
          />
        </FadeIn>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <FadeIn delay={0} y={40}>
            <h2
              className="hero-heading font-black uppercase leading-none tracking-tight text-center select-none"
              style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            >
              About me
            </h2>
          </FadeIn>

          <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
            <AnimatedText
              text={ABOUT_BIO}
              className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]"
              style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
            />

            <ContactButton onClick={onOpenContact} />
          </div>
        </div>
      </div>
    </section>
  );
}
