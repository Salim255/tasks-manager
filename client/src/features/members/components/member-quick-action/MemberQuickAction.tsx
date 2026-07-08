import "./_member-quick-action.scss";

export const MemberQuickAction = () => {
  return (
    <div className="member-quick-action">
      <form className="member-quick-action__form">
        <section className="member-quick-action__section">
          <div className="member-quick-action__section-header">
            <div>
              <h3 className="member-quick-action__section-title">
                Invite a teammate
              </h3>

              <p className="member-quick-action__section-description">
                Add one or more collaborators to this project with the right
                access level and a short invitation note if needed.
              </p>
            </div>
          </div>

          <div className="member-quick-action__grid">
            <div className="member-quick-action__group member-quick-action__group--full">
              <label
                htmlFor="memberEmails"
                className="member-quick-action__label"
              >
                Team members
              </label>

              <textarea
                id="memberEmails"
                className="member-quick-action__textarea"
                placeholder="name@company.com, another@company.com"
              />

              <p className="member-quick-action__hint">
                Separate multiple email addresses with a comma or one email per
                line.
              </p>
            </div>

            <div className="member-quick-action__group">
              <label
                htmlFor="memberRole"
                className="member-quick-action__label"
              >
                Role
              </label>

              <select
                id="memberRole"
                className="member-quick-action__select"
                defaultValue="member"
              >
                <option value="member">Member</option>
                <option value="admin">Project admin</option>
                <option value="viewer">Viewer</option>
              </select>

              <p className="member-quick-action__hint">
                Choose the default role for the invited members.
              </p>
            </div>

            <div className="member-quick-action__group">
              <label
                htmlFor="memberTeam"
                className="member-quick-action__label"
              >
                Team / squad
              </label>

              <input
                id="memberTeam"
                type="text"
                className="member-quick-action__input"
                placeholder="Frontend squad"
              />

              <p className="member-quick-action__hint">
                Optional grouping to keep members organised inside the project.
              </p>
            </div>
          </div>
        </section>

        <section className="member-quick-action__section">
          <div className="member-quick-action__section-header">
            <div>
              <h3 className="member-quick-action__section-title">
                Invitation details
              </h3>

              <p className="member-quick-action__section-description">
                Personalise the invitation and set expectations before they join
                the workspace.
              </p>
            </div>
          </div>

          <div className="member-quick-action__grid">
            <div className="member-quick-action__group member-quick-action__group--full">
              <label
                htmlFor="memberMessage"
                className="member-quick-action__label"
              >
                Invitation message
              </label>

              <textarea
                id="memberMessage"
                className="member-quick-action__textarea member-quick-action__textarea--message"
                placeholder="Hi team, I’m inviting you to collaborate on the project. You’ll have access to the board, sprint planning and task discussions."
              />

              <p className="member-quick-action__hint">
                This note can be included in the invite email or internal
                notification.
              </p>
            </div>
          </div>
        </section>

        <section className="member-quick-action__section">
          <div className="member-quick-action__section-header">
            <div>
              <h3 className="member-quick-action__section-title">
                Pending invites
              </h3>

              <p className="member-quick-action__section-description">
                Review who will be added before sending the invitations.
              </p>
            </div>
          </div>

          <div className="member-quick-action__members">
            <div className="member-quick-action__member-card">
              <div className="member-quick-action__member-avatar">SA</div>

              <div className="member-quick-action__member-content">
                <p className="member-quick-action__member-name">
                  salim@example.com
                </p>

                <p className="member-quick-action__member-meta">
                  Project admin • Frontend squad
                </p>
              </div>

              <button
                type="button"
                className="member-quick-action__member-remove"
              >
                Remove
              </button>
            </div>

            <div className="member-quick-action__member-card">
              <div className="member-quick-action__member-avatar">AM</div>

              <div className="member-quick-action__member-content">
                <p className="member-quick-action__member-name">
                  ahmed@example.com
                </p>

                <p className="member-quick-action__member-meta">
                  Member • Product squad
                </p>
              </div>

              <button
                type="button"
                className="member-quick-action__member-remove"
              >
                Remove
              </button>
            </div>
          </div>
        </section>

        <footer className="member-quick-action__footer">
          <button
            type="button"
            className="member-quick-action__button member-quick-action__button--ghost"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="member-quick-action__button member-quick-action__button--primary"
          >
            Send invitations
          </button>
        </footer>
      </form>
    </div>
  );
};