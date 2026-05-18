"use client";

import { useEffect } from "react";

export function useScrollReveal(selector = ".fade-in") {
  useEffect(() => {
    document.documentElement.classList.add("js-scroll-reveal");

    const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));

    if (!elements.length) return;

    // Fallback: if page is short / user is already near the footer,
    // IntersectionObserver may not fire in time (especially on touch devices).
    // Mark as visible when element is already in viewport.
    const markVisibleIfInView = () => {
      const vh = window.innerHeight || 0;
      for (const el of elements) {
        const rect = el.getBoundingClientRect();
        // Basic viewport intersection check
        if (rect.bottom > 0 && rect.top < vh * 0.95) {
          el.classList.add("is-visible");
        }
      }
    };

    markVisibleIfInView();

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    elements.forEach((element) => observer.observe(element));

    // Fallback: never leave interactive content invisible.
    const revealTimeout = window.setTimeout(() => {
      elements.forEach((element) => element.classList.add("is-visible"));
    }, 1400);

    return () => {
      window.clearTimeout(revealTimeout);
      observer.disconnect();
    };
  }, [selector]);
}
