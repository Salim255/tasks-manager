export const StatCard = ({ label, value, meta }) => (
  <article className="projects-home__stat-card">
    <span className="projects-home__stat-label">{label}</span>
    <strong className="projects-home__stat-value">{value}</strong>
    <span className="projects-home__stat-meta">{meta}</span>
  </article>
);
