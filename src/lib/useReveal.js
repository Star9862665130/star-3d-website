import { useLayoutEffect } from 'react';
import { gsap, ScrollTrigger } from './gsapSetup';

/**
 * Animates every [data-reveal] descendant of the ref'd element as it scrolls into view.
 * data-reveal values: "up" (default), "left", "right", "scale", "fade"
 */
export function useReveal(ref, deps = []) {
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return undefined;

    const ctx = gsap.context(() => {
      const items = root.querySelectorAll('[data-reveal]');
      items.forEach((el) => {
        const type = el.dataset.reveal || 'up';
        const delay = Number(el.dataset.revealDelay || 0);
        const from = { opacity: 0 };
        if (type === 'up') from.y = 48;
        if (type === 'left') from.x = -56;
        if (type === 'right') from.x = 56;
        if (type === 'scale') from.scale = 0.88;

        gsap.set(el, from);
        ScrollTrigger.create({
          trigger: el,
          start: 'top 88%',
          once: true,
          onEnter: () => {
            gsap.to(el, {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              duration: 1.1,
              delay,
              ease: 'power3.out',
            });
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, deps);
}
