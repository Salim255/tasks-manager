import {
  useEffect,
  useRef,
  type PropsWithChildren,
  type RefObject,
} from "react";
import { ClickOutsideContext } from "./ClickOutsideContext";
import { openEditSprint } from "../../features/projects/states/sprintSlice";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../../redux/store";

export type ActionType = 'edit-sprint' | 'delete-sprint' | 'edit-task' | 'delete-task';

export const ClickOutsideProvider = ({ children }: PropsWithChildren) => {
  const dispatch = useDispatch<AppDispatch>();

  const refs = useRef<Set<RefObject<HTMLDivElement>>>(new Set());
  const callbacks = useRef(
    new Map<RefObject<HTMLDivElement>, () => void>()
  );

  const updateStore = ({ type, itemId }: { type: ActionType; itemId: string }) => {

    // Update store
      switch(type){
        case 'edit-sprint':
          dispatch(openEditSprint({ sprintId: itemId}));
          return;
        case 'delete-sprint':
          return;
        case 'edit-task':
          return;
        case 'delete-task':
          return;
        default:
          return;
      }
  }

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;

      if (!target) return;

      // 1. Detect menu actions BEFORE closing
      const action: ActionType = target.dataset.action as ActionType;
      const id = target.dataset.id as string;

      if (action && id) updateStore({ type: action , itemId: id});
      console.log(target);
      //console.log(result);
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
