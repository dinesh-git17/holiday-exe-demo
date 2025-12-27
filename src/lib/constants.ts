// Matrix rain configuration
export const MATRIX_CHARS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";

export const MATRIX_CONFIG = {
  FONT_SIZE: 16,
  FALL_SPEED: 0.6,
  TRAIL_OPACITY: 0.05,
  RESET_PROBABILITY: 0.975,
} as const;

// Asset paths
export const ASSETS = {
  IPHONE_FRAME: "/assets/iphone.png",
  SPLASH_SCREEN: "/assets/splash.jpg",
  DINN_HEART: "/assets/characters/dinn_heart.png",
  DINN_WAVE: "/assets/characters/dinn_wave.png",
  REVEAL_HUG: "/assets/ui/reveal_hug.png",
} as const;

// Video paths (web-optimized versions for smooth playback)
export const VIDEOS = {
  PHASE_5_GAME: "/videos/phase_5_game_web.mp4",
  PHASE_6_ROOM: "/videos/phase_6_room_web.mp4",
  PHASE_6B_MEMORY: "/videos/phase_6b_memory_web.mp4",
} as const;

// Phone sizing for different breakpoints
export const PHONE_SCALE = {
  MOBILE: 1,
  DESKTOP: 1.2,
} as const;

// Z-index scale for layering
export const Z_INDEX = {
  MATRIX_RAIN: 0,
  PHONE_CONTENT: 10,
  PHONE_FRAME: 20,
  UI_OVERLAY: 30,
  PHASE_NAVIGATOR: 35,
  MODAL: 40,
} as const;

// Boot sequence configuration (matching christmas-gift)
export const BOOT_SEQUENCE_MESSAGES = [
  "> ESTABLISHING SECURE CONNECTION...",
  "> LOCATING SUBJECT: CAROLINA...",
  "> TARGET ACQUIRED.",
] as const;

export const TYPEWRITER_CHAR_DELAY_MS = 50;
export const BOOT_MESSAGE_DELAY_MS = 800;
export const BOOT_COMPLETE_DELAY_MS = 1500;

// Fingerprint scanner configuration (matching christmas-gift)
export const SCAN_DURATION_MS = 2000;
export const HAPTIC_DURATION_MS = 200;

// Countdown configuration (matching christmas-gift)
export const COUNTDOWN_STEPS = ["3", "2", "1", "LINK!"] as const;
export const COUNTDOWN_INTERVAL_MS = 750;

// Act 1 phase definitions
export interface Phase {
  id: string;
  title: string;
  description: string;
}

export const ACT_1_PHASES: readonly Phase[] = [
  {
    id: "boot-sequence",
    title: "System Boot",
    description: "Initializing secure connection to the North Pole network...",
  },
  {
    id: "fingerprint",
    title: "Biometric Authentication",
    description: "Verify your identity to access classified mission data.",
  },
  {
    id: "mission-briefing",
    title: "Mission Briefing",
    description: "Review your objectives before entering the field.",
  },
  {
    id: "countdown",
    title: "Sequence Initiation",
    description: "Prepare for deployment in 3... 2... 1...",
  },
] as const;

// Act 2: The Mission - Game phase definitions
export const ACT_2_PHASES: readonly Phase[] = [
  {
    id: "game-intro",
    title: "Mission Parameters",
    description:
      "Your objective: Collect hearts while avoiding glitch obstacles. Each heart brings you closer to your target.",
  },
  {
    id: "gameplay",
    title: "Active Mission",
    description:
      "Watch the operative navigate through the field, collecting tokens and evading hazards.",
  },
] as const;

// Game configuration
export const GAME_CONFIG = {
  HEART_ICON: "/assets/game/token_heart.png",
  GLITCH_ICON: "/assets/game/obstacle_glitch.png",
} as const;
