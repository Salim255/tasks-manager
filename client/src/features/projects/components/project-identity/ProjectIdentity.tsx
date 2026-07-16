export const ProjectIdentity = ({
  projectKey,
  projectName
}: {
  projectKey?: string;
  projectName?: string;
}) => (
  <div className="project-header__identity">
    <span className="project-header__eyebrow">{projectKey}</span>

    <h2 className="project-header__title u-mt-sm">
      {projectName ?? "Project workspace"}
    </h2>
  </div>
);
