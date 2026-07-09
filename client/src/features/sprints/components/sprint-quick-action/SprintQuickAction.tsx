import "./_sprint-quick-action.scss";

export const SprintQuickAction = () => {
  return (
    <div className="sprint-quick-action">
      <form className="sprint-quick-action__form">
        <section className="sprint-quick-action__section">
          <div className="sprint-quick-action__section-header">
            <div>
              <h3 className="sprint-quick-action__section-title">
                Sprint details
              </h3>

              <p className="sprint-quick-action__section-description">
                Set the sprint name, goal and cadence so the team knows exactly
                what this iteration is focused on.
              </p>
            </div>
          </div>

          <div className="sprint-quick-action__grid">
            <div className="sprint-quick-action__group sprint-quick-action__group--full">
              <label
                htmlFor="sprintName"
                className="sprint-quick-action__label"
              >
                Sprint name
              </label>

              <input
                id="sprintName"
                type="text"
                className="sprint-quick-action__input"
                placeholder="Sprint 12 — Checkout optimisation"
              />

              <p className="sprint-quick-action__hint">
                Use a short name that’s easy to recognise in boards, reports and
                planning sessions.
              </p>
            </div>

            <div className="sprint-quick-action__group">
              <label
                htmlFor="sprintStatus"
                className="sprint-quick-action__label"
              >
                Sprint status
              </label>

              <select
                id="sprintStatus"
                className="sprint-quick-action__select"
                defaultValue="planned"
              >
                <option value="planned">Planned</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>

              <p className="sprint-quick-action__hint">
                Start as planned if the sprint is still being prepared.
              </p>
            </div>

            <div className="sprint-quick-action__group">
              <label
                htmlFor="sprintCapacity"
                className="sprint-quick-action__label"
              >
                Capacity / target points
              </label>

              <input
                id="sprintCapacity"
                type="number"
                className="sprint-quick-action__input"
                placeholder="48"
              />

              <p className="sprint-quick-action__hint">
                Optional target to help the team stay aligned on workload.
              </p>
            </div>
          </div>
        </section>

        <section className="sprint-quick-action__section">
          <div className="sprint-quick-action__section-header">
            <div>
              <h3 className="sprint-quick-action__section-title">
                Timeline & planning
              </h3>

              <p className="sprint-quick-action__section-description">
                Define the working window and planning rhythm for this sprint.
              </p>
            </div>
          </div>

          <div className="sprint-quick-action__grid">
            <div className="sprint-quick-action__group">
              <label
                htmlFor="sprintStartDate"
                className="sprint-quick-action__label"
              >
                Start date
              </label>

              <input
                id="sprintStartDate"
                type="date"
                className="sprint-quick-action__input"
              />

              <p className="sprint-quick-action__hint">
                The sprint start date usually matches planning or kickoff day.
              </p>
            </div>

            <div className="sprint-quick-action__group">
              <label
                htmlFor="sprintEndDate"
                className="sprint-quick-action__label"
              >
                End date
              </label>

              <input
                id="sprintEndDate"
                type="date"
                className="sprint-quick-action__input"
              />

              <p className="sprint-quick-action__hint">
                Keep the sprint length consistent to make reporting and velocity
                easier to track.
              </p>
            </div>

            <div className="sprint-quick-action__group">
              <label
                htmlFor="sprintReviewDate"
                className="sprint-quick-action__label"
              >
                Review / demo date
              </label>

              <input
                id="sprintReviewDate"
                type="date"
                className="sprint-quick-action__input"
              />

              <p className="sprint-quick-action__hint">
                Optional date for the sprint review, demo or stakeholder
                presentation.
              </p>
            </div>

            <div className="sprint-quick-action__group">
              <label
                htmlFor="sprintRetrospectiveDate"
                className="sprint-quick-action__label"
              >
                Retrospective date
              </label>

              <input
                id="sprintRetrospectiveDate"
                type="date"
                className="sprint-quick-action__input"
              />

              <p className="sprint-quick-action__hint">
                Set a follow-up retrospective so the team can close the sprint
                properly.
              </p>
            </div>
          </div>
        </section>

        <section className="sprint-quick-action__section">
          <div className="sprint-quick-action__section-header">
            <div>
              <h3 className="sprint-quick-action__section-title">
                Sprint goal
              </h3>

              <p className="sprint-quick-action__section-description">
                Describe the outcome the team should achieve during this sprint,
                not just the list of tasks.
              </p>
            </div>
          </div>

          <div className="sprint-quick-action__group sprint-quick-action__group--full">
            <label
              htmlFor="sprintGoal"
              className="sprint-quick-action__label"
            >
              Goal
            </label>

            <textarea
              id="sprintGoal"
              className="sprint-quick-action__textarea sprint-quick-action__textarea--goal"
              placeholder="Deliver the new checkout flow with Apple Pay support, improve payment reliability and reduce drop-off on mobile."
            />

            <p className="sprint-quick-action__hint">
              A good sprint goal gives the team a clear shared outcome and makes
              trade-offs easier during execution.
            </p>
          </div>
        </section>

        <section className="sprint-quick-action__section">
          <div className="sprint-quick-action__section-header">
            <div>
              <h3 className="sprint-quick-action__section-title">
                Planning notes
              </h3>

              <p className="sprint-quick-action__section-description">
                Add optional notes for scope, dependencies, risks or delivery
                constraints.
              </p>
            </div>
          </div>

          <div className="sprint-quick-action__grid">
            <div className="sprint-quick-action__group sprint-quick-action__group--full">
              <label
                htmlFor="sprintNotes"
                className="sprint-quick-action__label"
              >
                Notes
              </label>

              <textarea
                id="sprintNotes"
                className="sprint-quick-action__textarea"
                placeholder="Scope depends on design approval for the payment summary, API support for wallet tokens and QA coverage before release."
              />

              <p className="sprint-quick-action__hint">
                Useful for constraints, risks, rollout notes or anything the
                team should keep in mind while planning.
              </p>
            </div>
          </div>
        </section>

        <footer className="sprint-quick-action__footer">
          <button
            type="button"
            className="sprint-quick-action__button sprint-quick-action__button--ghost"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="sprint-quick-action__button sprint-quick-action__button--primary"
          >
            Create sprint
          </button>
        </footer>
      </form>
    </div>
  );
};