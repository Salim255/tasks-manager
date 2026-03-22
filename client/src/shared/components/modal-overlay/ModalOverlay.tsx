import { useRef, type ReactNode } from "react";

export function ModalOverlay({ children }:{children: ReactNode; }) {
  const ref = useRef(null);

  //useModalOverlay(ref, onClose); // your clickOutside logic

  return (
    <section ref={ref} className="modal-overlay">
      {children}
    </section>
  );
}
