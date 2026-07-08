import { HiOutlineXMark } from "react-icons/hi2";
import "./_quick-action-header.scss";

type QuickActionHeaderProps = {
  title: string;
  description?: string;
  onClose: () => void;
};

export const QuickActionHeader = ({
  title,
  description,
  onClose,
}: QuickActionHeaderProps) => {
  return (
    <header className="quick-action-header">
      <div className="quick-action-header__copy">
        <h2 className="quick-action-header__title">{title}</h2>

        {description && (
          <p className="quick-action-header__description">
            {description}
          </p>
        )}
      </div>

      <button
        type="button"
        className="quick-action-header__close"
        onClick={onClose}
        aria-label="Close panel"
      >
        <HiOutlineXMark />
      </button>
    </header>
  );
};