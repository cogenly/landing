"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

const HeaderActionsContext = createContext<{
  actions: ReactNode;
  setActions: (node: ReactNode) => void;
} | null>(null);

export function HeaderActionsProvider({ children }: { children: ReactNode }) {
  const [actions, setActions] = useState<ReactNode>(null);
  return (
    <HeaderActionsContext.Provider value={{ actions, setActions }}>
      {children}
    </HeaderActionsContext.Provider>
  );
}

export function HeaderActionsSlot() {
  const ctx = useContext(HeaderActionsContext);
  if (!ctx?.actions) return null;
  return <>{ctx.actions}</>;
}

export function HeaderActions({ children }: { children: ReactNode }) {
  const ctx = useContext(HeaderActionsContext);
  if (!ctx) throw new Error("HeaderActions must be used within HeaderActionsProvider");
  const { setActions } = ctx;

  useEffect(() => {
    setActions(children);
    return () => setActions(null);
  }, [setActions, children]);

  return null;
}
