# Healing Technology Design Language

This document serves as the single source of truth for the design tokens, colors, and typography extracted from the original Figma design. It will be used to style the Next.js application using Awwwards-standard CSS architecture.

## Typography
- **Primary Font**: `Arimo`
  - Import: `https://fonts.googleapis.com/css2?family=Arimo:ital,wght@0,400..700;1,400..700&display=swap`
  - Weights: Regular (400), Medium (500), Bold (700)
- **Base Font Size**: `16px`
- **Border Radius Standard**: `0.625rem` (10px base)

## Color Palette (Light Theme)
- **Background**: `#ffffff`
- **Foreground (Text)**: `oklch(0.145 0 0)` (near black)
- **Primary**: `#030213` (deep dark blue/black)
- **Primary Foreground**: `oklch(1 0 0)` (white)
- **Secondary**: `oklch(0.95 0.0058 264.53)` (light pastel blue/grey)
- **Secondary Foreground**: `#030213`
- **Muted**: `#ececf0`
- **Muted Foreground**: `#717182`
- **Accent**: `#e9ebef`
- **Accent Foreground**: `#030213`
- **Destructive**: `#d4183d`

## Color Palette (Dark Theme)
- **Background**: `oklch(0.145 0 0)`
- **Foreground**: `oklch(0.985 0 0)`
- **Primary**: `oklch(0.985 0 0)`
- **Primary Foreground**: `oklch(0.205 0 0)`

## Implementation Notes
These tokens will be integrated into the new Next.js CSS Modules architecture to ensure the exact visual parity while supporting rich framer-motion/GSAP animations.
