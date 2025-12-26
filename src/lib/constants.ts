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

// Video paths
export const VIDEOS = {
  PHASE_5_GAME: "/videos/phase_5_game.mp4",
  PHASE_6_ROOM: "/videos/phase_6_room.mp4",
  PHASE_6B_MEMORY: "/videos/phase_6b_memory.mp4",
} as const;

// Z-index scale for layering
export const Z_INDEX = {
  MATRIX_RAIN: 0,
  PHONE_CONTENT: 10,
  PHONE_FRAME: 20,
  UI_OVERLAY: 30,
  MODAL: 40,
} as const;
