import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  applyUiPreferences,
  DEFAULT_UI_PREFERENCES,
  loadUiPreferences,
  saveUiPreferences,
  type UiPreferences,
} from "@/lib/ui-preferences";

interface UiPreferencesContextValue {
  preferences: UiPreferences;
  setPreference: <K extends keyof UiPreferences>(key: K, value: UiPreferences[K]) => void;
  updatePreferences: (patch: Partial<UiPreferences>) => void;
  resetPreferences: () => void;
}

const UiPreferencesContext = createContext<UiPreferencesContextValue | null>(null);

export function UiPreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<UiPreferences>(() => loadUiPreferences());

  useLayoutEffect(() => {
    applyUiPreferences(preferences);
  }, [preferences]);

  useEffect(() => {
    if (preferences.theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyUiPreferences(preferences);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [preferences]);

  const persist = useCallback((next: UiPreferences | ((prev: UiPreferences) => UiPreferences)) => {
    setPreferences((prev) => {
      const resolved = typeof next === "function" ? next(prev) : next;
      saveUiPreferences(resolved);
      return resolved;
    });
  }, []);

  const setPreference = useCallback(
    <K extends keyof UiPreferences>(key: K, value: UiPreferences[K]) => {
      persist((prev) => ({ ...prev, [key]: value }));
    },
    [persist],
  );

  const updatePreferences = useCallback(
    (patch: Partial<UiPreferences>) => {
      persist((prev) => ({ ...prev, ...patch }));
    },
    [persist],
  );

  const resetPreferences = useCallback(() => {
    persist(DEFAULT_UI_PREFERENCES);
  }, [persist]);

  const value = useMemo(
    () => ({ preferences, setPreference, updatePreferences, resetPreferences }),
    [preferences, setPreference, updatePreferences, resetPreferences],
  );

  return <UiPreferencesContext.Provider value={value}>{children}</UiPreferencesContext.Provider>;
}

export function useUiPreferences() {
  const ctx = useContext(UiPreferencesContext);
  if (!ctx) throw new Error("useUiPreferences must be used within UiPreferencesProvider");
  return ctx;
}
