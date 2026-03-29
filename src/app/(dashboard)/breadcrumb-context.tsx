"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

type BreadcrumbMap = Record<string, string>;

const BreadcrumbContext = createContext<{
  labels: BreadcrumbMap;
  setLabel: (segment: string, label: string) => void;
}>({ labels: {}, setLabel: () => {} });

export function BreadcrumbProvider({ children }: { children: React.ReactNode }) {
  const [labels, setLabels] = useState<BreadcrumbMap>({});

  const setLabel = useCallback((segment: string, label: string) => {
    setLabels((prev) => (prev[segment] === label ? prev : { ...prev, [segment]: label }));
  }, []);

  return (
    <BreadcrumbContext value={{ labels, setLabel }}>
      {children}
    </BreadcrumbContext>
  );
}

export function useBreadcrumbLabels() {
  return useContext(BreadcrumbContext);
}

/** Drop this in any page/layout to register a human-readable label for a URL segment.
 *  Sets the label during render (not in an effect) so the breadcrumb never flashes a fallback. */
export function SetBreadcrumb({
  segment,
  label,
}: {
  segment: string;
  label: string;
}) {
  const { setLabel, labels } = useBreadcrumbLabels();
  // Set during render so the breadcrumb has the label before first paint.
  // React will re-render the provider with the new state before committing.
  if (labels[segment] !== label) {
    setLabel(segment, label);
  }
  return null;
}
