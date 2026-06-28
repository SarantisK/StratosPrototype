// Shared, ref-like scroll state so the GSAP ScrollTrigger (in React land) can
// drive the r3f camera each frame without triggering React re-renders.
export const scroll = {
  p: 0, // hero terrain pinned progress 0..1
  animate: true, // false under prefers-reduced-motion
}

// product (interceptor) cinematic, separate pinned sequence
export const product = {
  p: 0,
  animate: true,
}
