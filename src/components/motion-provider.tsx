'use client';

import {useEffect, useRef} from 'react';

export function MotionProvider({children}: {children: React.ReactNode}) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let disposed = false;
    let cleanUp: (() => void) | undefined;
    const loadMotion = () => Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{gsap}, {ScrollTrigger}]) => {
      if (disposed || !root.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const context = gsap.context(() => {
          gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
            gsap.from(element, {
              y: 38, duration: 0.9, ease: 'power3.out',
              scrollTrigger: {trigger: element, start: 'top 94%', once: true}
            });
          });
          gsap.utils.toArray<HTMLElement>('[data-image-reveal]').forEach((element) => {
            gsap.fromTo(element, {clipPath: 'inset(8% 0 8% 0)'}, {
              clipPath: 'inset(0% 0 0% 0)', ease: 'none',
              scrollTrigger: {trigger: element, start: 'top bottom', end: 'center center', scrub: 0.8}
            });
          });
          if (root.current?.querySelector('.hero-background')) {
            gsap.to('.hero-background', {
              yPercent: 12, ease: 'none',
              scrollTrigger: {trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true}
            });
          }
        }, root);
        return () => context.revert();
      });
      cleanUp = () => media.revert();
    }).catch((error: unknown) => {
      console.error('Walter motion enhancement could not load; static content remains available.', error);
    });
    if (window.scrollY > 0) loadMotion();
    else window.addEventListener('scroll', loadMotion, {once: true, passive: true});
    return () => {
      disposed = true;
      window.removeEventListener('scroll', loadMotion);
      cleanUp?.();
    };
  }, []);
  return <div ref={root}>{children}</div>;
}
