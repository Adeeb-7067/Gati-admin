/** Normalize and validate hex color input */
export function normalizeHex(hex: string): string {
  let h = hex.trim();
  if (!h.startsWith("#")) h = `#${h}`;
  if (/^#[0-9A-Fa-f]{3}$/.test(h)) {
    h = `#${h[1]}${h[1]}${h[2]}${h[2]}${h[3]}${h[3]}`;
  }
  if (!/^#[0-9A-Fa-f]{6}$/.test(h)) return "#6C63FF";
  return h.toUpperCase();
}

export interface ColorTokens {
  primary: string;
  swatch: string;
  soft: string;
  accent: string;
  accentFg: string;
}

export function buildCustomColorTokens(hex: string): ColorTokens {
  const primary = normalizeHex(hex);
  return {
    primary,
    swatch: primary,
    soft: `color-mix(in srgb, ${primary} 14%, white)`,
    accent: `color-mix(in srgb, ${primary} 11%, white)`,
    accentFg: `color-mix(in srgb, ${primary} 55%, black)`,
  };
}

export function applyColorTokens(root: HTMLElement, tokens: ColorTokens) {
  root.style.setProperty("--primary", tokens.primary);
  root.style.setProperty("--ring", tokens.primary);
  root.style.setProperty("--primary-soft", tokens.soft);
  root.style.setProperty("--accent", tokens.accent);
  root.style.setProperty("--accent-foreground", tokens.accentFg);
  root.style.setProperty("--sidebar-active", tokens.primary);
}
