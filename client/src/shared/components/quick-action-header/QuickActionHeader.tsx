import { HiOutlineXMark } from "react-icons/hi2";
import "./_quick-action-header.scss";
import { useDispatch } from "react-redux";
import { toggleQuickAction } from "../../modals/states/quickActionsSlice";
import type { AppDispatch } from "../../../redux/store";
import { useQuickActionType } from "../../modals/states/quickActionsSelectors";


const QUICK_ACTION_CONFIG = {
  createTask: {
    title: "Create task",
    description:
      "Create a new task and assign it to the right sprint and team member.",
  },

  createSprint: {
    title: "Create sprint",
    description:
      "Plan a new sprint, define its timeline and organize upcoming work.",
  },

  addMember: {
    title: "Add member",
    description:
      "Invite a new member and manage access to this project.",
  },
} as const;

export const QuickActionHeader = () => {
  const quickActionType = useQuickActionType();

  const dispatch = useDispatch<AppDispatch>();


  const onClose = () => {
    dispatch(toggleQuickAction());
  };


  if (!quickActionType) {
    return null;
  }


  const content =
    QUICK_ACTION_CONFIG[quickActionType];

  return (
    <header className="quick-action-header">
      <div className="quick-action-header__copy">
        <h2 className="quick-action-header__title">
             {content.title}
        </h2>

 
        <p className="quick-action-header__description">
            {content.description}
        </p>
        
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