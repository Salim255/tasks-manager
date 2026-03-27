import "./_aside-popup.scss";
import type { ReactNode } from "react";

export  const AsidePopup = ({ children }: { children: ReactNode }) => {
    return <div className="aside-popup">
        { children }
    </div>
}