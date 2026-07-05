import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToTop } from '../lib/scrollToTop';

export default function ScrollToTop() {
  const { pathname, key } = useLocation();

  useLayoutEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  useLayoutEffect(() => {
    scrollToTop();

    // Lazy routes can paint after the first scroll pass — run again on the next frame.
    const frame = requestAnimationFrame(() => {
      scrollToTop();
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname, key]);

  return null;
}
