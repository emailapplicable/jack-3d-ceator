import React, { useEffect, useRef } from 'react';
import { MARQUEE_GIFS } from '../data/portfolioData';
import { SmartImage } from './SmartImage';

const ROW_1_ITEMS = MARQUEE_GIFS.slice(0, 11);
const ROW_2_ITEMS = MARQUEE_GIFS.slice(11);

const ROW_1_TRIPLED = [...ROW_1_ITEMS, ...ROW_1_ITEMS, ...ROW_1_ITEMS];
const ROW_2_TRIPLED = [...ROW_2_ITEMS, ...ROW_2_ITEMS, ...ROW_2_ITEMS];

const TILE_STEP_PX = 432; // 420px tile width + 12px (gap-3)
const ROW_1_CYCLE = ROW_1_ITEMS.length * TILE_STEP_PX;
const ROW_2_CYCLE = ROW_2_ITEMS.length * TILE_STEP_PX;

export function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number | null = null;

    const updateTransforms = () => {
      rafId = null;
      const section = sectionRef.current;
      if (!section) return;

      const sectionTop = section.offsetTop;
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;

      const shift = offset - 200;
      const row1Mod =
        (((shift % ROW_1_CYCLE) + ROW_1_CYCLE) % ROW_1_CYCLE) - ROW_1_CYCLE;
      const row2Mod =
        (((-shift % ROW_2_CYCLE) + ROW_2_CYCLE) % ROW_2_CYCLE) - ROW_2_CYCLE;

      if (row1Ref.current) {
        row1Ref.current.style.transform = `translate3d(${row1Mod}px, 0, 0)`;
      }
      if (row2Ref.current) {
        row2Ref.current.style.transform = `translate3d(${row2Mod}px, 0, 0)`;
      }
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateTransforms);
      }
    };

    updateTransforms();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Motion reel showcase"
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden"
    >
      <div className="flex flex-col gap-3">
        <div
          ref={row1Ref}
          className="flex gap-3 w-max"
          style={{ willChange: 'transform' }}
        >
          {ROW_1_TRIPLED.map((src, idx) => (
            <div
              key={`row1-${idx}`}
              className="w-[420px] h-[270px] shrink-0 rounded-2xl overflow-hidden bg-[#141518]"
            >
              <SmartImage
                src={src}
                alt={`3D motion showcase ${(idx % ROW_1_ITEMS.length) + 1}`}
                fallbackLabel={`Showcase ${(idx % ROW_1_ITEMS.length) + 1}`}
                loading="lazy"
                className="w-[420px] h-[270px] rounded-2xl object-cover block"
              />
            </div>
          ))}
        </div>

        <div
          ref={row2Ref}
          className="flex gap-3 w-max"
          style={{ willChange: 'transform' }}
        >
          {ROW_2_TRIPLED.map((src, idx) => (
            <div
              key={`row2-${idx}`}
              className="w-[420px] h-[270px] shrink-0 rounded-2xl overflow-hidden bg-[#141518]"
            >
              <SmartImage
                src={src}
                alt={`3D motion showcase ${12 + (idx % ROW_2_ITEMS.length)}`}
                fallbackLabel={`Showcase ${12 + (idx % ROW_2_ITEMS.length)}`}
                loading="lazy"
                className="w-[420px] h-[270px] rounded-2xl object-cover block"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
