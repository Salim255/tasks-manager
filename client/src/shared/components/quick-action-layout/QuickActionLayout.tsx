import { type ReactNode } from "react";
import "./_quick-action-layout.scss";

type Props = {
  children: ReactNode;
  isOpen?: boolean;
};

export const QuickActionLayout = ({
  children,
  isOpen = false,
}: Props) => {
  return (
    <aside
      className={`quick-action-layout ${isOpen ? "quick-action-layout--open" : ""}`}
      aria-hidden={!isOpen}
    >
      <div className="quick-action-layout__backdrop" />

      <div className="quick-action-layout__panel">
        <div className="quick-action-layout__children">{children}</div>
      </div>
    </aside>
  );
};