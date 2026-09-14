import "./_project-identity.scss";
export const ProjectIdentity = ({
  projectKey,
  projectName
}: {
  projectKey?: string;
  projectName?: string;
}) => (
  <div className="project-identity">
    <h2 className="project-identity__title">
      {projectName ?? "Project workspace"}
    </h2>

    <span className="project-identity__eyebrow">
      {projectKey}
    </span>
  </div>
);