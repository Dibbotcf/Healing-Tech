---
name: Awwwards Animation Pro
description: Directives for creating fluid, dynamic, hardware-accelerated interactions within the Next.js frontend framework.
---

# Awwwards Animation Pro Skill

This skill dictates the standards for high-end UI/UX motion design matching the caliber of Awwwards sites.

## 1. Smooth Scrolling Foundation
- **Lenis** is the mandatory smooth scrolling library.
- It must wrap the core Next.js application inside `src/app/layout.tsx`.
- Disable standard browser scrollbars gracefully using a global CSS override.

## 2. Interaction Layering
- **Framer Motion**: Use exclusively for page transitions (via template.tsx or AnimatePresence) and micro-interactions (hover states, simple reveals, dialog popping).
- **GSAP**: Use specifically for complex sequencing, SVG drawing/manipulation, and ScrollTrigger events that coordinate multiple elements tied precisely to page depth.

## 3. Performance Strictness
- Only animate `transform` and `opacity`. DO NOT animate `width`, `height`, `top`, `left`, `box-shadow` or `border-radius` where layout reflow is triggered.
- Use `will-change: transform` intelligently on heavy DOM nodes.

## 4. Consistency
- The animation easing should match a premium aesthetic: typically a custom cubic-bezier (e.g., `cubic-bezier(0.76, 0, 0.24, 1)`) for snappy entrances.
- Follow the design parameters defined in `design.md` for consistent feeling.
