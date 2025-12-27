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
  {
    id: "room-scene",
    title: "The Reunion",
    description:
      "Mission complete. Watch as the operative reaches the final destination for a cinematic reunion.",
  },
  {
    id: "memory-game",
    title: "Memory Protocol",
    description:
      "A cognitive challenge awaits. Match the patterns to unlock the next sequence.",
  },
] as const;

// Game configuration
export const GAME_CONFIG = {
  HEART_ICON: "/assets/game/token_heart.png",
  GLITCH_ICON: "/assets/game/obstacle_glitch.png",
} as const;

// Act 3: The Revelation - Finale phase definitions
export const ACT_3_PHASES: readonly Phase[] = [
  {
    id: "intel-briefing",
    title: "Intel Briefing",
    description:
      "Classified data incoming. Watch as encrypted transmissions reveal critical intelligence.",
  },
  {
    id: "cipher-game",
    title: "Cipher Protocol",
    description:
      "Decode the hidden message. Each letter brings you closer to the truth.",
  },
  {
    id: "proposal-reveal",
    title: "The Revelation",
    description:
      "Mission complete. The final message has been decrypted. Certificate of authenticity enclosed.",
  },
] as const;

// Intel briefing configuration (matching christmas-gift)
export const INTEL_BRIEFING = {
  HEADER: "CRITICAL INTELLIGENCE GATHERED",
  BODY: `INTERCEPT REPORT: A high-density encrypted signal has been detected from a remote timeline.

Our cryptography agents have worked tirelessly to decrypt this payload. It contains vital data regarding Subject: Dinn.

WARNING: Content exhibits extreme emotional resonance. Proceed with urgency.`,
} as const;

export const INTEL_BOOT_SEQUENCE = [
  "booting connection...",
  "syncing hearts...",
  "latency: irrelevant",
  "status: locked on you",
] as const;

export const INTEL_BOOT_TIMING = {
  DECRYPT_DURATION_MS: 2500,
  FINAL_HOLD_MS: 1500,
  DECRYPT_INTERVAL_MS: 50,
} as const;

// Cipher game configuration (matching christmas-gift)
export interface CipherLevel {
  word: string;
  hints: readonly string[];
}

export const CIPHER_LEVELS: readonly CipherLevel[] = [
  {
    word: "YOURS",
    hints: ["Something I am...", "Starts with Y, ends with S."],
  },
  {
    word: "LOVER",
    hints: ["What you are to me.", "Starts with L, ends with R."],
  },
  {
    word: "ADORE",
    hints: ["What I do endlessly.", "Starts with A, ends with E."],
  },
] as const;

export const CIPHER_CONFIG = {
  WORD_LENGTH: 5,
  MAX_GUESSES: 4,
  TILE_FLIP_DELAY_MS: 100,
  TILE_FLIP_DURATION_MS: 400,
} as const;

export const CIPHER_SUCCESS_MESSAGES = [
  "You know me so well...",
  "My heart is yours.",
  "Forever and always.",
] as const;

// Proposal configuration (matching christmas-gift)
export const PROPOSAL_APPRECIATION = {
  HEADER: "Agent Carolina,",
  LINES: [
    "You have navigated every glitch, bypassed every firewall, and decrypted the truth.",
    "This mission was never just about code. It was about finding the one person who makes the system worth saving.",
    "The target is secured. He is waiting for you.",
  ],
} as const;

export const PROPOSAL_CERTIFICATE = {
  HEADER: "MISSION ACCOMPLISHED",
  QUESTION: "Will you be mine forever and always?",
  FOOTER: "Certificate of Eternal Connection",
} as const;
