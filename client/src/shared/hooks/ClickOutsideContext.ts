import { createContext } from "react";

export type ClickOutsideContextType = {
  register: (
    ref: React.RefObject<HTMLDivElement>,
    callback: () => void
  ) => void;

  unregister: (ref: React.RefObject<HTMLDivElement>) => void;
};

export const ClickOutsideContext =
  createContext<ClickOutsideContextType | null>(null);
