import { useClickOutside } from "../../hooks/useClickOutside";
import "./_modal-overlay.scss";
import { useEffect, useRef, type ReactNode } from "react";

export function ModalOverlay({ children,  onClose }:{children: ReactNode;  onClose: () => void }) {
    const ref = useRef(null!);
    const { register, unregister } = useClickOutside();
  
    useEffect(() => {
        if (ref.current) {
            register(ref, onClose);
        }
        return () => unregister(ref);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [register, unregister]);
    return (
        <section ref={ref} className="modal-overlay">
        {children}
        </section>
    );
}
