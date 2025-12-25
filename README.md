# Holiday EXE Demo

Interactive showcase of the **North Pole Connection** iOS app - a scroll-driven portfolio piece demonstrating the 9-phase experience.

## Overview

This site presents the North Pole Connection app through an immersive, scroll-driven experience. Visitors can explore each phase of the app within an iPhone mockup, with a mix of live interactive components and captured video footage.

## Features

- **Scroll-Driven Navigation** - Apple-style chapter transitions
- **iPhone 17 Pro Mockup** - Authentic device frame presentation
- **Live Interactions** - Fingerprint scanner, keypad, and more
- **Video Showcases** - High-quality screen recordings from iOS Simulator
- **Matrix Aesthetic** - Consistent visual language with the app

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript** (strict mode)
- **Tailwind CSS 4**
- **Framer Motion** (scroll animations)

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run type checking
npm run type-check

# Run linting
npm run lint

# Format code
npm run format
```

## Project Structure

```
app/           # Next.js App Router
components/    # React components
  ui/          # Generic UI components
  showcase/    # Showcase-specific components
  effects/     # Visual effects (MatrixRain, etc.)
lib/           # Utilities, constants
public/        # Static assets
  assets/      # iPhone mockup, backgrounds
  videos/      # Phase walkthrough videos
```

## License

Private - Portfolio project
