import { ModalOverlay } from "../../components/modal-overlay/ModalOverlay";
import { ModalMotion } from "../../motion/ModalMotion";

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
      onClick: () => void;
    };
  };

  children: React.ReactNode;
};


export const QuickActions = ({
  title,
  description,
  onClose,
  actions,
  children
}:  Props) => {


    return (
        <ModalOverlay onClose={onClose}>
            <ModalMotion>
                <div data-modal-body className="quick-action-modal">hell world</div>
            </ModalMotion>
        </ModalOverlay>
    )
}