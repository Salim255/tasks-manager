import { useQuickActionType } from "../../../../shared/modals/states/quickActionsSelectors";
import { TaskQuickAction } from "../../../tasks/components/task-quick-action/TaskQuickAction";
import { SprintQuickAction } from "../../../sprints/components/sprint-quick-action/SprintQuickAction"; 
import { MemberQuickAction } from "../../../members/components/member-quick-action/MemberQuickAction";

export const QuickActionRenderer = () => {
  const quickActionType = useQuickActionType();

  switch (quickActionType) {
    case "createTask":
      return <TaskQuickAction />;

    case "createSprint":
      return <SprintQuickAction />;

    case "addMember":
      return < MemberQuickAction />;

    default:
      return null;
  }
};