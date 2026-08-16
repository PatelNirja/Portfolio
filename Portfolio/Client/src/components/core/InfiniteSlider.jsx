import React, { useState } from 'react';

/**
 * InfiniteSlider — CSS-only GPU-accelerated marquee.
 * Multiplies track copies to guarantee full-width coverage even with small skill sets.
 */
export function InfiniteSlider({
  children,
  gap = 20,
  reverse = false,
  duration = 30,
  pauseOnHover = true,
}) {
  const [paused, setPaused] = useState(false);
  const animationName = reverse ? 'marquee-reverse' : 'marquee-forward';

  return (
    <div
      className="relative w-full overflow-hidden flex justify-center py-1"
      style={{
        maskImage:
          'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
      }}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      <div
        className="flex w-max items-center justify-center"
        style={{
          gap,
          animation: `${animationName} ${duration}s linear infinite`,
          animationPlayState: paused ? 'paused' : 'running',
          willChange: 'transform',
        }}
      >
        {/* Repeat 4 times to fill screen seamlessly regardless of item count */}
        <div className="flex shrink-0 items-center justify-center" style={{ gap }}>
          {children}
        </div>
        <div className="flex shrink-0 items-center justify-center" style={{ gap }} aria-hidden="true">
          {children}
        </div>
        <div className="flex shrink-0 items-center justify-center" style={{ gap }} aria-hidden="true">
          {children}
        </div>
        <div className="flex shrink-0 items-center justify-center" style={{ gap }} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
