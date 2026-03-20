import { useContext } from "react";
import { ClickOutsideContext } from "./ClickOutsideContext";

export const useClickOutside = () => {
  const ctx = useContext(ClickOutsideContext);
  if (!ctx) {
    throw new Error("useClickOutside must be used inside ClickOutsideProvider");
  }
  return ctx;
};
