import React from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  loadingStrategy?: 'lazy' | 'eager';
}

export const OptimizedImage = ({
  src,
  alt,
  className,
  loadingStrategy = 'lazy',
  ...props
}: OptimizedImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      loading={loadingStrategy}
      className={cn('max-w-full h-auto', className)}
      decoding="async"
      {...props}
    />
  );
};