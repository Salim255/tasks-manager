import {
  useEffect,
  useRef,
  type PropsWithChildren,
  type RefObject,
} from "react";
import { ClickOutsideContext } from "./ClickOutsideContext";

export const ClickOutsideProvider = ({ children }: PropsWithChildren) => {
  const refs = useRef<Set<RefObject<HTMLDivElement>>>(new Set());
  const callbacks = useRef(
    new Map<RefObject<HTMLDivElement>, () => void>()
  );

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!(e.target instanceof Node)) return;

      refs.current.forEach((ref) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          const cb = callbacks.current.get(ref);
          if (cb) cb();
        }
      });
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const register = (ref: RefObject<HTMLDivElement>, callback: () => void) => {
    console.log(ref);
    refs.current.add(ref);
    callbacks.current.set(ref, callback);
  };

  const unregister = (ref: RefObject<HTMLDivElement>) => {
    refs.current.delete(ref);
    callbacks.current.delete(ref);
  };

  return (
    <ClickOutsideContext.Provider value={{ register, unregister }}>
      {children}
    </ClickOutsideContext.Provider>
  );
};
