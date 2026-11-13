import React from 'react';
import { FadeIn } from './FadeIn';
import { Magnet } from './Magnet';
import { ContactButton } from './ContactButton';
import { SmartImage } from './SmartImage';
import { HERO_PORTRAIT_URL } from '../data/portfolioData';

export interface HeroSectionProps {
  onOpenContact: () => void;
}

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Price', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact', isContact: true },
];

export function HeroSection({ onOpenContact }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative h-screen min-h-[620px] flex flex-col justify-between bg-[#0C0C0C]"
      style={{ overflowX: 'clip' }}
    >
      <FadeIn as="nav" delay={0} y={-20} className="relative z-20 w-full">
        <div className="flex items-center justify-between w-full px-6 md:px-10 pt-6 md:pt-8">
          {NAV_ITEMS.map((item) =>
            item.isContact ? (
              <button
                key={item.label}
                type="button"
                onClick={onOpenContact}
                className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200 whitespace-nowrap shrink-0 cursor-pointer bg-transparent border-0 p-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D7E2EA]"
              >
                {item.label}
              </button>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D7E2EA]"
              >
                {item.label}
              </a>
            )
          )}
        </div>
      </FadeIn>

      <div className="overflow-hidden w-full relative z-0">
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[13vw] sm:text-[14vw] md:text-[15vw] lg:text-[16.5vw] mt-6 sm:mt-4 md:-mt-5 text-center select-none">
            Hi, i&apos;m arian
          </h1>
        </FadeIn>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-none sm:pointer-events-auto">
        <FadeIn delay={0.6} y={30}>
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
            <SmartImage
              src={HERO_PORTRAIT_URL}
              alt="Arian Full-Stack Developer portrait"
              fallbackLabel="Arian — Full-Stack Developer"
              className="w-full h-auto object-contain block select-none rounded-2xl"
              draggable={false}
            />
          </Magnet>
        </FadeIn>
      </div>

      <div className="relative z-20 flex justify-between items-end w-full px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 mt-auto">
        <FadeIn delay={0.35} y={20}>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[180px] sm:max-w-[240px] md:max-w-[290px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            Focus on your business; I&apos;ll handle the tech! Full-Stack Developer
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton onClick={onOpenContact} />
        </FadeIn>
      </div>
    </section>
  );
}
