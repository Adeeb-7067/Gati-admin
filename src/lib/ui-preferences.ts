import { buildCustomColorTokens, applyColorTokens, type ColorTokens } from "./color-utils";

export type TextSize = "sm" | "md" | "lg";
export type PrimaryColorPreset = "violet" | "blue" | "teal" | "green" | "orange" | "rose";
export type PrimaryColor = PrimaryColorPreset | "custom";
export type RadiusStyle = "compact" | "default" | "rounded";
export type LayoutDensity = "comfortable" | "compact";
export type ThemeMode = "light" | "dark" | "system";

export interface UiPreferences {
  textSize: TextSize;
  primaryColor: PrimaryColor;
  customPrimaryHex: string;
  radius: RadiusStyle;
  density: LayoutDensity;
  theme: ThemeMode;
  sidebarCompact: boolean;
  reducedMotion: boolean;
}

export const DEFAULT_UI_PREFERENCES: UiPreferences = {
  textSize: "md",
  primaryColor: "violet",
  customPrimaryHex: "#6C63FF",
  radius: "default",
  density: "comfortable",
  theme: "light",
  sidebarCompact: false,
  reducedMotion: false,
};

export const UI_PREFERENCES_KEY = "gati-ui-preferences";

export const PRIMARY_COLOR_OPTIONS: (ColorTokens & { id: PrimaryColorPreset; label: string })[] = [
  {
    id: "violet",
    label: "Violet",
    swatch: "oklch(0.56 0.24 285)",
    primary: "oklch(0.56 0.24 285)",
    soft: "oklch(0.955 0.04 285)",
    accent: "oklch(0.955 0.045 285)",
    accentFg: "oklch(0.28 0.18 285)",
  },
  {
    id: "blue",
    label: "Blue",
    swatch: "oklch(0.55 0.20 250)",
    primary: "oklch(0.55 0.20 250)",
    soft: "oklch(0.955 0.04 250)",
    accent: "oklch(0.955 0.04 250)",
    accentFg: "oklch(0.28 0.16 250)",
  },
  {
    id: "teal",
    label: "Teal",
    swatch: "oklch(0.58 0.14 185)",
    primary: "oklch(0.58 0.14 185)",
    soft: "oklch(0.955 0.04 185)",
    accent: "oklch(0.955 0.04 185)",
    accentFg: "oklch(0.28 0.12 185)",
  },
  {
    id: "green",
    label: "Green",
    swatch: "oklch(0.58 0.17 152)",
    primary: "oklch(0.58 0.17 152)",
    soft: "oklch(0.955 0.04 152)",
    accent: "oklch(0.955 0.04 152)",
    accentFg: "oklch(0.28 0.14 152)",
  },
  {
    id: "orange",
    label: "Orange",
    swatch: "oklch(0.68 0.18 55)",
    primary: "oklch(0.68 0.18 55)",
    soft: "oklch(0.955 0.04 55)",
    accent: "oklch(0.955 0.04 55)",
    accentFg: "oklch(0.35 0.14 55)",
  },
  {
    id: "rose",
    label: "Rose",
    swatch: "oklch(0.58 0.22 15)",
    primary: "oklch(0.58 0.22 15)",
    soft: "oklch(0.955 0.04 15)",
    accent: "oklch(0.955 0.04 15)",
    accentFg: "oklch(0.32 0.18 15)",
  },
];

export function getPrimaryColorTokens(prefs: UiPreferences): ColorTokens {
  if (prefs.primaryColor === "custom") {
    return buildCustomColorTokens(prefs.customPrimaryHex);
  }
  return PRIMARY_COLOR_OPTIONS.find((c) => c.id === prefs.primaryColor) ?? PRIMARY_COLOR_OPTIONS[0];
}

export function loadUiPreferences(): UiPreferences {
  if (typeof window === "undefined") return DEFAULT_UI_PREFERENCES;
  try {
    const raw = localStorage.getItem(UI_PREFERENCES_KEY);
    if (!raw) return DEFAULT_UI_PREFERENCES;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_UI_PREFERENCES,
      ...parsed,
      customPrimaryHex: parsed.customPrimaryHex ?? DEFAULT_UI_PREFERENCES.customPrimaryHex,
    };
  } catch {
    return DEFAULT_UI_PREFERENCES;
  }
}

export function saveUiPreferences(prefs: UiPreferences) {
  localStorage.setItem(UI_PREFERENCES_KEY, JSON.stringify(prefs));
}

function resolveTheme(theme: ThemeMode): "light" | "dark" {
  if (theme === "dark") return "dark";
  if (theme === "light") return "light";
  if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

export function applyUiPreferences(prefs: UiPreferences) {
  const root = document.documentElement;
  const color = getPrimaryColorTokens(prefs);

  root.dataset.textSize = prefs.textSize;
  root.dataset.radius = prefs.radius;
  root.dataset.density = prefs.density;
  root.dataset.sidebarCompact = prefs.sidebarCompact ? "true" : "false";
  root.dataset.reducedMotion = prefs.reducedMotion ? "true" : "false";
  root.style.setProperty("--sidebar-width", prefs.sidebarCompact ? "76px" : "252px");

  applyColorTokens(root, color);

  const resolved = resolveTheme(prefs.theme);
  root.classList.toggle("dark", resolved === "dark");
  root.dataset.theme = prefs.theme;
}
