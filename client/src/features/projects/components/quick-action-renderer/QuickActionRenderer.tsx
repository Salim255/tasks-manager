import { useQuickActionType } from "../../states/quickActionsSelectors";
import { TaskQuickAction } from "../task-quick-action/TaskQuickAction";
import { SprintQuickAction } from "../sprint-quick-action/SprintQuickAction";
import { AddMemberQuickAction } from "../add-member-quick-action/AddMemberQuickAction";

export const QuickActionRenderer = () => {
  const quickActionType = useQuickActionType();

  switch (quickActionType) {
    case "createTask":
      return <TaskQuickAction />;

    case "createSprint":
      return <SprintQuickAction />;

    case "addMember":
      return <AddMemberQuickAction />;

    default:
      return null;
  }
};