import React, { useRef, useState } from 'react';

/**
 * InfiniteSlider — CSS-only GPU-accelerated marquee.
 *
 * The inner track contains TWO copies of children (not eight).
 * We animate from 0 → -50% (forward) or -50% → 0 (reverse).
 * Because both copies are identical and sit side-by-side,
 * the loop is perfectly seamless with no visible jump.
 *
 * Hover over the ROW pauses ONLY that row.
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
      className="relative w-full overflow-hidden"
      style={{
        maskImage:
          'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
      }}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      <div
        className="flex w-max"
        style={{
          gap,
          animation: `${animationName} ${duration}s linear infinite`,
          animationPlayState: paused ? 'paused' : 'running',
          willChange: 'transform',
        }}
      >
        {/* First copy */}
        <div className="flex shrink-0 items-center" style={{ gap }}>
          {children}
        </div>
        {/* Duplicate — required for seamless loop */}
        <div className="flex shrink-0 items-center" style={{ gap }} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
