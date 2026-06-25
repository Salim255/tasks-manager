import { ModalOverlay } from "../../../shared/components/modal-overlay/ModalOverlay";
import { IoMdClose } from "react-icons/io";

type Props = {
  title: string;
  description?: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export const EntityModal = ({
  title,
  description,
  onClose,
  children,
  footer,
}: Props) => {
  return (
    <ModalOverlay onClose={onClose}>
      <div data-modal-body className="entity-modal">

        {/* HEADER */}
        <div className="entity-modal__header">
          <div>
            <h2 className="entity-modal__title">{title}</h2>

            {description && (
              <p className="entity-modal__description">
                {description}
              </p>
            )}
          </div>

          <button
            type="button"
            className="entity-modal__close"
            onClick={onClose}
          >
            <IoMdClose />
          </button>
        </div>

        {/* BODY (FORM CONTENT) */}
        <div className="entity-modal__body">
          {children}
        </div>

        {/* FOOTER (ACTIONS) */}
        {footer && (
          <div className="entity-modal__footer">
            {footer}
          </div>
        )}

      </div>
    </ModalOverlay>
  );
};