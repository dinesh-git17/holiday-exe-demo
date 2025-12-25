# Holiday EXE Demo - Scaffolding Plan

## Overview

This document outlines the implementation plan for the Holiday EXE Demo showcase site. The site presents the North Pole Connection iOS app through an immersive, scroll-driven experience with an iPhone 17 Pro mockup as the central visual element.

---

## Page Structure

### 1. Hero Section (100vh)

**Purpose:** First impression, draw visitors in

**Components:**

- `MatrixRain` - Animated matrix-style falling characters background
- `PhoneFrame` - iPhone 17 Pro mockup (2D) with splash screen
- Hero text: "HOLIDAY.EXE" / "North Pole Connection"
- Scroll indicator animation

**Implementation:**

```
src/components/
├── effects/
│   └── MatrixRain.tsx        # Matrix falling characters
├── showcase/
│   └── PhoneFrame.tsx        # iPhone mockup frame
└── sections/
    └── HeroSection.tsx       # Hero composition
```

**Assets Needed:**

- [ ] iPhone 17 Pro mockup PNG (transparent screen)
- [ ] Splash screen image/video

---

### 2. Act 1: Authentication (Scroll Section)

**Purpose:** Show the boot sequence and biometric auth phases

**Phases Included:**

- Phase 1: Boot Sequence (LIVE - typewriter effect)
- Phase 2: Fingerprint Scanner (LIVE - tap to scan)
- Phase 3: Mission Briefing (LIVE - card animation)
- Phase 4: Countdown (LIVE - 3-2-1 animation)

**Navigation:** Click arrows to cycle through phases within the act

**Components:**

```
src/components/
├── showcase/
│   ├── PhaseNavigator.tsx    # Arrow controls + dots
│   ├── PhaseCard.tsx         # Side panel content
│   └── ActContainer.tsx      # Scroll-triggered section
├── phases/
│   ├── BootSequence.tsx      # Phase 1 recreation
│   ├── FingerprintScanner.tsx # Phase 2 interactive
│   ├── MissionBriefing.tsx   # Phase 3 card
│   └── Countdown.tsx         # Phase 4 numbers
```

**Assets Needed:**

- [ ] Fingerprint icon SVG
- [ ] Mission briefing card assets

---

### 3. Act 2: The Mission (Scroll Section)

**Purpose:** Showcase the game and room scenes

**Phases Included:**

- Phase 5: Side-Scroller Game (VIDEO - 15-20 sec gameplay)
- Phase 6: Room Scene (VIDEO - cinematic reunion)
- Phase 6b: Memory Game (VIDEO or AUTO-SIM)

**Navigation:** Click arrows for phase-to-phase

**Components:**

```
src/components/
├── showcase/
│   └── VideoPlayer.tsx       # Video with controls/loading
├── phases/
│   ├── GameShowcase.tsx      # Phase 5 video wrapper
│   ├── RoomShowcase.tsx      # Phase 6 video wrapper
│   └── MemoryShowcase.tsx    # Phase 6b video/simulation
```

**Assets Needed:**

- [ ] Phase 5 gameplay video (iOS Simulator recording)
- [ ] Phase 6 room scene video (iOS Simulator recording)
- [ ] Phase 6b memory game video (iOS Simulator recording)

---

### 4. Act 3: The Revelation (Scroll Section)

**Purpose:** Show the emotional finale

**Phases Included:**

- Phase 7: Intel Briefing (LIVE - decrypt animation)
- Phase 8: Cipher/Wordle (AUTO-SIM - simulated typing)
- Phase 9: Proposal (LIVE - certificate reveal, phone number blurred)

**Navigation:** Click arrows for phase-to-phase

**Components:**

```
src/components/
├── phases/
│   ├── IntelBriefing.tsx     # Phase 7 decrypt effect
│   ├── CipherGame.tsx        # Phase 8 auto-simulation
│   └── ProposalReveal.tsx    # Phase 9 certificate
```

**Assets Needed:**

- [ ] Dinn character assets (if needed)
- [ ] Certificate background/decorations

---

### 5. Outro Section

**Purpose:** Wrap up and link back to portfolio

**Content:**

- "She said yes" or outcome message (optional)
- Tech stack summary with icons
- Link back to links.dineshd.dev
- GitHub repo link (optional)

**Components:**

```
src/components/
├── sections/
│   └── OutroSection.tsx      # Closing section
├── ui/
│   └── TechStackBadge.tsx    # Stack icon badges
```

---

## Scroll Animation System

### Technology

- **Framer Motion** for scroll-triggered animations
- **useScroll** + **useTransform** for parallax effects
- **IntersectionObserver** for section detection

### Scroll Behavior

```typescript
// Pseudo-code for scroll structure
const sections = [
  { id: "hero", height: "100vh", triggerOnce: false },
  { id: "act-1", height: "auto", sticky: true },
  { id: "act-2", height: "auto", sticky: true },
  { id: "act-3", height: "auto", sticky: true },
  { id: "outro", height: "100vh", triggerOnce: true },
];
```

### Phase Navigation (Within Acts)

```typescript
interface PhaseNavigatorProps {
  phases: Phase[];
  currentPhase: number;
  onPrev: () => void;
  onNext: () => void;
}
```

---

## Directory Structure (Final)

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx              # Main showcase page
│   └── globals.css
├── components/
│   ├── ui/                   # Generic UI
│   │   ├── Button.tsx
│   │   └── TechStackBadge.tsx
│   ├── effects/              # Visual effects
│   │   ├── MatrixRain.tsx
│   │   └── ScrollProgress.tsx
│   ├── showcase/             # Showcase-specific
│   │   ├── PhoneFrame.tsx
│   │   ├── PhaseNavigator.tsx
│   │   ├── PhaseCard.tsx
│   │   ├── ActContainer.tsx
│   │   └── VideoPlayer.tsx
│   ├── phases/               # Individual phase recreations
│   │   ├── BootSequence.tsx
│   │   ├── FingerprintScanner.tsx
│   │   ├── MissionBriefing.tsx
│   │   ├── Countdown.tsx
│   │   ├── GameShowcase.tsx
│   │   ├── RoomShowcase.tsx
│   │   ├── MemoryShowcase.tsx
│   │   ├── IntelBriefing.tsx
│   │   ├── CipherGame.tsx
│   │   └── ProposalReveal.tsx
│   └── sections/             # Page sections
│       ├── HeroSection.tsx
│       └── OutroSection.tsx
├── lib/
│   ├── constants.ts          # Phase data, timing configs
│   └── utils.ts              # Helper functions
└── hooks/
    └── useScrollProgress.ts  # Custom scroll hooks
public/
├── assets/
│   ├── iphone-frame.png      # iPhone 17 Pro mockup
│   └── splash-screen.png     # App splash
├── videos/
│   ├── phase-5-game.mp4
│   ├── phase-6-room.mp4
│   └── phase-6b-memory.mp4
└── Showcase.md               # This file
```

---

## Asset Checklist

### iPhone Mockup

- [ ] Find/create iPhone 17 Pro mockup (2D, transparent screen)
- [ ] Ensure proper aspect ratio for content

### Screen Recordings (iOS Simulator)

- [ ] Phase 5: Side-scroller game (15-20 seconds)
- [ ] Phase 6: Room scene with Carolina walk (full sequence)
- [ ] Phase 6b: Memory game solve

### From Christmas Gift App

- [ ] Splash screen design
- [ ] Fingerprint icon
- [ ] Matrix rain component (can port)
- [ ] Boot sequence text content
- [ ] Wordle word list and hints

---

## Implementation Order

### Phase 1: Foundation

1. Set up base layout and global styles
2. Create MatrixRain background effect
3. Build PhoneFrame component
4. Implement HeroSection

### Phase 2: Scroll System

1. Set up scroll progress tracking
2. Create ActContainer with sticky behavior
3. Implement PhaseNavigator controls
4. Build PhaseCard side panel

### Phase 3: Live Phases

1. Port/recreate BootSequence
2. Build interactive FingerprintScanner
3. Create MissionBriefing card
4. Implement Countdown animation

### Phase 4: Video Phases

1. Build VideoPlayer component
2. Add video placeholders (Coming Soon)
3. Integrate actual recordings when available

### Phase 5: Simulation Phases

1. Create CipherGame auto-simulation
2. Build IntelBriefing decrypt effect
3. Implement ProposalReveal with blur

### Phase 6: Polish

1. Add OutroSection
2. Fine-tune scroll animations
3. Optimize performance
4. Mobile responsiveness pass
5. Cross-browser testing

---

## Notes

- **Video Placeholders:** Use "Coming Soon" overlays until recordings are ready
- **Performance:** Lazy load videos, use `loading="lazy"` on images
- **Accessibility:** Ensure keyboard navigation for phase controls
- **Mobile:** Consider simplified version for smaller screens
- **iPhone Mockup:** iPhone 17 Pro doesn't exist yet, use iPhone 15/16 Pro mockup

---

_Last Updated: December 25, 2025_
