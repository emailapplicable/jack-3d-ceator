import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

export interface SmartImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackLabel?: string;
  fallbackClassName?: string;
}

export function SmartImage({
  src,
  alt = '',
  className = '',
  fallbackLabel,
  fallbackClassName = '',
  ...rest
}: SmartImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt || fallbackLabel || '3D artwork preview'}
        className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#17191E] via-[#101114] to-[#0C0C0C] border border-[#D7E2EA]/15 text-[#D7E2EA]/60 select-none ${className} ${fallbackClassName}`}
      >
        <ImageOff className="w-6 h-6 opacity-50" strokeWidth={1.5} />
        {(fallbackLabel || alt) && (
          <span className="text-xs uppercase tracking-widest px-4 text-center line-clamp-2">
            {fallbackLabel || alt}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      {...rest}
    />
  );
}
