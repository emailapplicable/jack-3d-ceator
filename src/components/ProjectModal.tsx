import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';
import { SmartImage } from './SmartImage';

export interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenContact: () => void;
}

export function ProjectModal({
  project,
  onClose,
  onOpenContact,
}: ProjectModalProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev + 1) % 3);
      }
      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev + 2) % 3);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  const gallery = project
    ? [project.col2Image, project.col1Images[0], project.col1Images[1]]
    : [];

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl rounded-[32px] border border-[#D7E2EA]/25 bg-[#0C0C0C] p-5 sm:p-8 text-[#D7E2EA] max-h-[92vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D7E2EA]/60">
                  <span>{project.number}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.year}</span>
                </div>
                <h2
                  id="project-modal-title"
                  className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#D7E2EA] mt-1"
                >
                  {project.name}
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close project preview"
                className="w-11 h-11 rounded-full border border-[#D7E2EA]/25 flex items-center justify-center text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative rounded-[28px] overflow-hidden bg-[#131418] aspect-[16/10] mb-4">
              <SmartImage
                src={gallery[activeIndex]}
                alt={`${project.name} gallery frame ${activeIndex + 1}`}
                fallbackLabel={project.name}
                className="w-full h-full object-cover"
              />

              <button
                type="button"
                onClick={() => setActiveIndex((prev) => (prev + 2) % 3)}
                aria-label="Previous render"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0C0C0C]/75 border border-[#D7E2EA]/30 flex items-center justify-center text-[#D7E2EA] hover:bg-[#0C0C0C] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => setActiveIndex((prev) => (prev + 1) % 3)}
                aria-label="Next render"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0C0C0C]/75 border border-[#D7E2EA]/30 flex items-center justify-center text-[#D7E2EA] hover:bg-[#0C0C0C] transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {gallery.map((imgUrl, idx) => (
                <button
                  key={imgUrl}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Select frame ${idx + 1}`}
                  className={`rounded-2xl overflow-hidden aspect-[16/9] border-2 transition-opacity cursor-pointer ${
                    activeIndex === idx
                      ? 'border-[#D7E2EA] opacity-100'
                      : 'border-transparent opacity-55 hover:opacity-85'
                  }`}
                >
                  <SmartImage
                    src={imgUrl}
                    alt={`${project.name} thumbnail ${idx + 1}`}
                    fallbackLabel={`Frame ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-t border-[#D7E2EA]/15 pt-5">
              <div className="max-w-xl">
                <p className="text-xs uppercase tracking-widest text-[#D7E2EA]/55 mb-1.5">
                  {project.deliverables}
                </p>
                <p className="text-sm sm:text-base font-light text-[#D7E2EA]/85 leading-relaxed">
                  {project.summary}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenContact();
                }}
                className="rounded-full border-2 border-[#D7E2EA] px-6 py-2.5 text-xs sm:text-sm uppercase tracking-widest font-medium text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                Inquire Similar Project
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
