"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
} from "react";
import type { StyleTabId } from "@/data/content";

type StyleTabContextValue = {
  styleTab: StyleTabId;
  setStyleTab: (id: StyleTabId) => void;
};

const StyleTabContext = createContext<StyleTabContextValue | null>(null);
const STORAGE_KEY = "qa-style-tab";
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function readTab(): StyleTabId {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "gridly" || saved === "velixo" || saved === "benbox") {
    return saved;
  }
  return "gridly";
}

export function StyleTabProvider({ children }: { children: React.ReactNode }) {
  const styleTab = useSyncExternalStore<StyleTabId>(
    subscribe,
    readTab,
    () => "gridly" as const,
  );

  const setStyleTab = useCallback((id: StyleTabId) => {
    window.localStorage.setItem(STORAGE_KEY, id);
    emit();
  }, []);

  return (
    <StyleTabContext.Provider value={{ styleTab, setStyleTab }}>
      {children}
    </StyleTabContext.Provider>
  );
}

export function useStyleTab() {
  const ctx = useContext(StyleTabContext);
  if (!ctx) throw new Error("useStyleTab must be used within StyleTabProvider");
  return ctx;
}
