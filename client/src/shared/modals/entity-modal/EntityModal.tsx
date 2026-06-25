import { ModalOverlay } from "../../../shared/components/modal-overlay/ModalOverlay";
import { IoMdClose } from "react-icons/io";
import "./_entity-modal.scss";

type Props = {
  title: string;
  description?: string;
  onClose: () => void;

  actions?: {
    cancel?: {
      label?: string;
      onClick: () => void;
    };

    submit?: {
      label?: string;
      type?: "button" | "submit";
      loading?: boolean;
    };
  };

  children: React.ReactNode;
};

export const EntityModal = ({
  title,
  description,
  onClose,
  actions,
  children
}: Props) => {
  return (
    <ModalOverlay onClose={onClose}>
  <div data-modal-body className="entity-modal">

    {/* ============================================
        HEADER (SYSTEM STYLE: SAME AS UPDATE TASK)
    ============================================ */}
    <div className="entity-modal__header">

      <div className="entity-modal__header-content">
        <h2>{title}</h2>

        {description && (
          <p>{description}</p>
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

    {/* ============================================
        BODY (SCROLLABLE FORM AREA)
    ============================================ */}
    <div className="entity-modal__body">
      {children}
    </div>

    {/* ============================================
        FOOTER (FIXED ACTION ZONE)
    ============================================ */}
    {
        actions 
        && (
        <div className="entity-modal__footer">

            {
                actions.cancel && (
                <button
                    type="button"
                    className="btn btn--secondary entity-modal__cancel"
                    onClick={actions.cancel.onClick}
                >
                    {actions.cancel.label ?? "Cancel"}
                </button>
                )}

                {actions.submit && (
                <button
                    type={actions.submit.type ?? "submit"}
                    className="btn btn-hero entity-modal__submit"
                >
                    {actions.submit.label ?? "Save"}
                </button>)
            }

        </div>
    )}
  </div>
</ModalOverlay>
  );
};