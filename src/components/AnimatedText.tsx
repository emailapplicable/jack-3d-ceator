import React, { useRef } from 'react';
import { motion, MotionValue, useScroll, useTransform } from 'motion/react';

interface AnimatedCharProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

function AnimatedChar({ char, progress, range }: AnimatedCharProps) {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="opacity-0 select-none" aria-hidden="true">
        {char}
      </span>
      <motion.span
        style={{ opacity }}
        className="absolute left-0 top-0"
        aria-hidden="true"
      >
        {char}
      </motion.span>
    </span>
  );
}

export interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export function AnimatedText({
  text,
  className = '',
  style,
}: AnimatedTextProps) {
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: paragraphRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');
  const totalChars = text.length;
  let runningIndex = 0;

  return (
    <p
      ref={paragraphRef}
      aria-label={text}
      className={className}
      style={style}
    >
      {words.map((word, wordIdx) => {
        const wordStart = runningIndex;
        runningIndex += word.length + (wordIdx < words.length - 1 ? 1 : 0);

        return (
          <React.Fragment key={`${word}-${wordIdx}`}>
            <span className="inline-block whitespace-nowrap">
              {word.split('').map((char, charIdx) => {
                const globalIndex = wordStart + charIdx;
                const start = globalIndex / totalChars;
                const end = (globalIndex + 1) / totalChars;
                return (
                  <AnimatedChar
                    key={`${globalIndex}-${char}`}
                    char={char}
                    progress={scrollYProgress}
                    range={[start, end]}
                  />
                );
              })}
            </span>
            {wordIdx < words.length - 1 && ' '}
          </React.Fragment>
        );
      })}
    </p>
  );
}
