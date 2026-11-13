import React, { useRef } from 'react';
import { motion, MotionValue, useScroll, useTransform } from 'motion/react';
import { PROJECTS, ProjectItem } from '../data/portfolioData';
import { FadeIn } from './FadeIn';
import { LiveProjectButton } from './LiveProjectButton';
import { SmartImage } from './SmartImage';

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  totalCards: number;
  progress: MotionValue<number>;
  onSelectProject: (project: ProjectItem) => void;
}

function ProjectCard({
  project,
  index,
  totalCards,
  progress,
  onSelectProject,
}: ProjectCardProps) {
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const rangeStart = index / totalCards;
  const scale = useTransform(progress, [rangeStart, 1], [1, targetScale]);

  return (
    <div className="h-[85vh] flex items-start justify-center">
      <div
        className="sticky top-24 md:top-32 w-full max-w-6xl"
        style={{ paddingTop: `${index * 28}px` }}
      >
        <motion.article
          style={{ scale, transformOrigin: 'top center' }}
          className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 sm:mb-7 px-1 sm:px-2">
            <div className="flex items-center gap-4 sm:gap-8">
              <span
                className="font-black leading-none text-[#D7E2EA] tabular-nums shrink-0"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
              >
                {project.number}
              </span>

              <div className="flex flex-col gap-1">
                <span className="text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/60 font-medium">
                  {project.category}
                </span>
                <h3
                  className="font-medium uppercase text-[#D7E2EA] leading-tight"
                  style={{ fontSize: 'clamp(1.1rem, 2.2vw, 2.1rem)' }}
                >
                  {project.name}
                </h3>
              </div>
            </div>

            <div className="self-start sm:self-center">
              <LiveProjectButton onClick={() => onSelectProject(project)} />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 sm:gap-5 items-stretch">
            <div className="w-full md:w-[40%] flex flex-col gap-4 sm:gap-5">
              <button
                type="button"
                onClick={() => onSelectProject(project)}
                aria-label={`View ${project.name} preview 1`}
                className="block w-full overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] cursor-pointer group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D7E2EA]"
                style={{ height: 'clamp(130px, 16vw, 230px)' }}
              >
                <SmartImage
                  src={project.col1Images[0]}
                  alt={`${project.name} detail render 1`}
                  fallbackLabel={project.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </button>

              <button
                type="button"
                onClick={() => onSelectProject(project)}
                aria-label={`View ${project.name} preview 2`}
                className="block w-full overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] cursor-pointer group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D7E2EA]"
                style={{ height: 'clamp(160px, 22vw, 340px)' }}
              >
                <SmartImage
                  src={project.col1Images[1]}
                  alt={`${project.name} detail render 2`}
                  fallbackLabel={project.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </button>
            </div>

            <div className="w-full md:w-[60%]">
              <button
                type="button"
                onClick={() => onSelectProject(project)}
                aria-label={`View ${project.name} main render`}
                className="block w-full h-[220px] md:h-full overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] cursor-pointer group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D7E2EA]"
              >
                <SmartImage
                  src={project.col2Image}
                  alt={`${project.name} hero render`}
                  fallbackLabel={project.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </button>
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
}

export interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="projects"
      className="relative bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-20 sm:pb-28"
    >
      <FadeIn delay={0} y={30}>
        <h2
          className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-14 sm:mb-20 select-none"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Project
        </h2>
      </FadeIn>

      <div ref={containerRef} className="relative">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            totalCards={PROJECTS.length}
            progress={scrollYProgress}
            onSelectProject={onSelectProject}
          />
        ))}
      </div>
    </section>
  );
}
