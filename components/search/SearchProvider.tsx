"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

interface SearchContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const SearchContext = createContext<SearchContextValue | null>(null);

function isTypingInOtherInput(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  const isFormField = tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable;
  // our own search input carries this so Cmd+K can still close the palette while it's focused
  const isSearchInput = target.dataset.searchInput === "true";
  return isFormField && !isSearchInput;
}

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      if (!isCmdK) return;
      if (!isOpen && isTypingInOtherInput(e.target)) return;

      e.preventDefault();
      setIsOpen((prev) => !prev);
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return <SearchContext.Provider value={{ isOpen, open, close }}>{children}</SearchContext.Provider>;
}

export function useSearch(): SearchContextValue {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used within a SearchProvider");
  return ctx;
}
