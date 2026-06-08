import { toast } from "sonner";
import type { ReactNode } from "react";
import { Icons } from "@/components/admin/icon";
import { useUiPreferences } from "@/contexts/ui-preferences-context";
import { normalizeHex } from "@/lib/color-utils";
import {
  PRIMARY_COLOR_OPTIONS,
  type LayoutDensity,
  type PrimaryColor,
  type PrimaryColorPreset,
  type RadiusStyle,
  type TextSize,
  type ThemeMode,
} from "@/lib/ui-preferences";

export function AppearanceSettings() {
  const { preferences, setPreference, updatePreferences, resetPreferences } = useUiPreferences();

  const handleReset = () => {
    resetPreferences();
    toast.success("Appearance reset to defaults");
  };

  return (
    <div className="admin-card overflow-hidden">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border/60 bg-muted/20 px-5 py-4">
        <div>
          <h3 className="font-display text-[15px] font-bold">Appearance & Display</h3>
          <p className="mt-0.5 text-[12px] text-muted-foreground">
            Personalize text size, colors, and layout. Changes apply instantly across the admin.
          </p>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 rounded-xl border border-border/60 bg-background/70 px-3 py-2 text-[12px] font-semibold text-muted-foreground transition-colors hover:border-primary/20 hover:text-foreground"
        >
          <Icons.wrench className="h-3.5 w-3.5" />
          Reset defaults
        </button>
      </div>

      <div className="divide-y divide-border/50">
        <SettingRow
          label="Text size"
          description="Adjust base font size for better readability"
        >
          <OptionGroup
            value={preferences.textSize}
            onChange={(v) => setPreference("textSize", v as TextSize)}
            options={[
              { value: "sm", label: "Small" },
              { value: "md", label: "Medium" },
              { value: "lg", label: "Large" },
            ]}
          />
        </SettingRow>

        <SettingRow
          label="Primary color"
          description="Pick a preset or choose your own custom accent color"
        >
          <div className="flex w-full flex-col items-end gap-3 sm:max-w-sm">
            <div className="flex flex-wrap justify-end gap-2">
              {PRIMARY_COLOR_OPTIONS.map((color) => (
                <button
                  key={color.id}
                  type="button"
                  title={color.label}
                  aria-label={color.label}
                  onClick={() => setPreference("primaryColor", color.id as PrimaryColorPreset)}
                  className={`relative h-9 w-9 rounded-full ring-2 ring-offset-2 ring-offset-card transition-transform hover:scale-110 ${
                    preferences.primaryColor === color.id ? "ring-primary scale-110" : "ring-transparent"
                  }`}
                  style={{ background: color.swatch }}
                >
                  {preferences.primaryColor === color.id && (
                    <Icons.check className="absolute inset-0 m-auto h-4 w-4 text-white drop-shadow" />
                  )}
                </button>
              ))}

              {/* Custom color */}
              <button
                type="button"
                title="Custom color"
                aria-label="Custom color"
                onClick={() => setPreference("primaryColor", "custom")}
                className={`relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full ring-2 ring-offset-2 ring-offset-card transition-transform hover:scale-110 ${
                  preferences.primaryColor === "custom" ? "ring-primary scale-110" : "ring-transparent"
                }`}
                style={{
                  background:
                    preferences.primaryColor === "custom"
                      ? preferences.customPrimaryHex
                      : "conic-gradient(from 180deg, #6C63FF, #14B8A6, #22C55E, #F59E0B, #EF4444, #6C63FF)",
                }}
              >
                {preferences.primaryColor === "custom" ? (
                  <Icons.check className="relative z-10 h-4 w-4 text-white drop-shadow" />
                ) : (
                  <Icons.palette className="relative z-10 h-4 w-4 text-white drop-shadow" />
                )}
              </button>
            </div>

            {preferences.primaryColor === "custom" && (
              <div className="flex w-full items-center gap-2 rounded-xl border border-border/60 bg-muted/20 p-2">
                <label className="relative shrink-0 cursor-pointer">
                  <input
                    type="color"
                    value={preferences.customPrimaryHex}
                    onChange={(e) => {
                      updatePreferences({
                        customPrimaryHex: normalizeHex(e.target.value),
                        primaryColor: "custom",
                      });
                    }}
                    className="h-10 w-10 cursor-pointer rounded-lg border-0 bg-transparent p-0"
                    aria-label="Pick custom color"
                  />
                </label>
                <input
                  type="text"
                  value={preferences.customPrimaryHex}
                  onChange={(e) => {
                    updatePreferences({
                      customPrimaryHex: normalizeHex(e.target.value),
                      primaryColor: "custom",
                    });
                  }}
                  className="min-w-0 flex-1 rounded-lg border border-border/60 bg-background/80 px-3 py-2 font-mono text-[13px] uppercase outline-none focus:border-primary/40"
                  placeholder="#6C63FF"
                  maxLength={7}
                />
              </div>
            )}
          </div>
        </SettingRow>

        <SettingRow label="Theme" description="Light, dark, or follow your system preference">
          <OptionGroup
            value={preferences.theme}
            onChange={(v) => setPreference("theme", v as ThemeMode)}
            options={[
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" },
              { value: "system", label: "System" },
            ]}
          />
        </SettingRow>

        <SettingRow label="Corner radius" description="Control how rounded cards and inputs look">
          <OptionGroup
            value={preferences.radius}
            onChange={(v) => setPreference("radius", v as RadiusStyle)}
            options={[
              { value: "compact", label: "Compact" },
              { value: "default", label: "Default" },
              { value: "rounded", label: "Rounded" },
            ]}
          />
        </SettingRow>

        <SettingRow label="Layout density" description="Tighter or more spacious page padding">
          <OptionGroup
            value={preferences.density}
            onChange={(v) => setPreference("density", v as LayoutDensity)}
            options={[
              { value: "comfortable", label: "Comfortable" },
              { value: "compact", label: "Compact" },
            ]}
          />
        </SettingRow>

        <SettingRow
          label="Compact sidebar"
          description="Show icon-only navigation to save horizontal space"
        >
          <ToggleSwitch
            checked={preferences.sidebarCompact}
            onChange={(v) => setPreference("sidebarCompact", v)}
          />
        </SettingRow>

        <SettingRow
          label="Reduce motion"
          description="Minimize animations for accessibility"
        >
          <ToggleSwitch
            checked={preferences.reducedMotion}
            onChange={(v) => setPreference("reducedMotion", v)}
          />
        </SettingRow>
      </div>

      {/* Live preview */}
      <div className="border-t border-border/50 bg-muted/15 px-5 py-4">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Live preview</p>
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
            Primary button
          </button>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary ring-1 ring-primary/20">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Active badge
          </span>
          <div className="admin-card flex items-center gap-2 px-3 py-2 text-sm">
            <Icons.dashboard className="h-4 w-4 text-primary" />
            Sample card
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingRow({
  label,
  description,
  children,
}: {
  label: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 sm:max-w-md">
        <div className="text-[13px] font-semibold">{label}</div>
        <div className="text-[12px] text-muted-foreground">{description}</div>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function OptionGroup({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="inline-flex rounded-xl border border-border/60 bg-muted/30 p-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-all ${
            value === opt.value
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? "bg-primary" : "bg-muted"}`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`}
      />
    </button>
  );
}
