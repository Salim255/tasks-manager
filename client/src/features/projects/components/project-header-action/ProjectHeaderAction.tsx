import { AddMemberForm } from "../../../members/components/add-member-form/AddMemberForm";

export const ProjectActions = ({ projectId }: { projectId?: string }) => (
  <div className="project-header__actions">
    {projectId && <AddMemberForm projectId={projectId} />}
  </div>
);
