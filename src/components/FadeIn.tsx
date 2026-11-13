import React from 'react';
import { motion } from 'motion/react';

type SupportedElement = 'div' | 'section' | 'header' | 'nav' | 'h1' | 'h2' | 'p' | 'span' | 'article' | 'li';

const motionElementCache = {
  div: motion.create('div'),
  section: motion.create('section'),
  header: motion.create('header'),
  nav: motion.create('nav'),
  h1: motion.create('h1'),
  h2: motion.create('h2'),
  p: motion.create('p'),
  span: motion.create('span'),
  article: motion.create('article'),
  li: motion.create('li'),
} as const;

export interface FadeInProps {
  children: React.ReactNode;
  as?: SupportedElement;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function FadeIn({
  children,
  as = 'div',
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = '',
  style,
}: FadeInProps) {
  const MotionTag = motionElementCache[as];

  return (
    <MotionTag
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
      style={style}
    >
      {children}
    </MotionTag>
  );
}
