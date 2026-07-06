import "./_create-project-form.scss";
import { useEffect, type ChangeEvent } from "react";
import { useProjectForm } from "../../forms-builders/projectFormBuilder"
import { useDispatch } from "react-redux";
import { createProjectHttp, fetchSingleProjectHttp, type CreateProjectPayload} from "../../http/project.http";
import { type AppDispatch } from "../../../../redux/store";
import { useNavigate } from "react-router-dom";
import { validateProjectForm } from "../../../../shared/utils/forms-validator";
import { FaInfoCircle } from "react-icons/fa";

export const CreateProjectForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { state, setField, setError } = useProjectForm();

  const handleInput = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
      const { name, value } = e.target;
      setField(
        name as 'name' | 'description' | 'key',
        name === 'key' ? value.toUpperCase() : value
      );
  }

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      const errors = validateProjectForm(state);
      if (Object.values(errors).some(Boolean)) {
          // push errors into reducer
          Object.entries(errors).forEach(([field, message]) => {
              if (message) setError(field as "name" | "description" | "key" , message);
          });
          return;
      }
      const payload: CreateProjectPayload =
          { 
              name: state.name,
              description: state.description,
              key: state.key,
          }
  
      const result = await dispatch(createProjectHttp(payload));
      
      if (createProjectHttp.fulfilled.match(result)) { 
          const project = result.payload.data.project;
          navigate(`/dashboard/projects/${project.id}/board`);
          dispatch(fetchSingleProjectHttp({projectId: project.id}));
      }
  }

  useEffect(() => {
  }, [state])

  return (

    <section className="project-create">
      <header className="project-create__hero">
        <div className="project-create__hero-copy">
          <span className="project-create__eyebrow">New workspace</span>

          <h1 className="project-create__title">
            Create a project space for your team
          </h1>

          <p className="project-create__subtitle">
            Set up a workspace for tasks, sprint planning, and day-to-day
            collaboration. Start with the basics — you can always refine it
            later.
          </p>
        </div>

        <div className="project-create__hero-note">
          <span className="project-create__required-dot" />
          <p>Required fields are marked with an asterisk *</p>
        </div>
      </header>

      <section className="project-create__card">
        <div className="project-create__intro">
          <div className="project-create__intro-block">
            <span className="project-create__intro-label">
              Workspace details
            </span>

            <h2 className="project-create__section-title">
              Basic project information
            </h2>

            <p className="project-create__section-text">
              Choose a clear project name and a short key. The key is used in
              task references like <strong>FLOW-1</strong>,{" "}
              <strong>FLOW-2</strong>, and sprint naming across the workspace.
            </p>
          </div>

          <div className="project-create__tip">
            <div className="project-create__tip-icon">
              <FaInfoCircle />
            </div>

            <div className="project-create__tip-content">
              <h3>About the project key</h3>
              <p>
                Use a short uppercase identifier, for example{" "}
                <strong>FLOW</strong>, <strong>CRM</strong>, or{" "}
                <strong>MOBILE</strong>. This helps keep tasks easy to scan.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="project-create__form form">
          <div className="form__group">
            <label htmlFor="project-name" className="form__label">
              Name <span className="form__label-required">*</span>
            </label>

            <input
              id="project-name"
              className="form__input"
              name="name"
              value={state.name}
              onChange={handleInput}
              placeholder="FlowBoard Mobile App"
            />

            <p className="form__hint">
              Use a clear, recognizable name for the workspace.
            </p>

            {state.errors.name && (
              <p className="form__error">{state.errors.name}</p>
            )}
          </div>

          <div className="form__group">
            <label htmlFor="project-key" className="form__label">
              Key <span className="form__label-required">*</span>
            </label>

            <div className="project-create__key-field">
              <input
                id="project-key"
                className="form__input project-create__input-key"
                name="key"
                value={state.key}
                onChange={handleInput}
                placeholder="FLOW"
              />

              <div className="project-create__key-preview">
                <span className="project-create__key-preview-label">
                  Preview
                </span>
                <span className="project-create__key-preview-value">
                  {(state.key || "KEY").toUpperCase()}-1
                </span>
              </div>
            </div>

            <p className="form__hint">
              Uppercase, short, and unique. Example: FLOW, CRM, MOBILE.
            </p>

            {state.errors.key && (
              <p className="form__error">{state.errors.key}</p>
            )}
          </div>

          <div className="form__group">
            <label htmlFor="project-description" className="form__label">
              Description
            </label>

            <textarea
              id="project-description"
              className="form__textarea"
              value={state.description}
              onChange={handleInput}
              name="description"
              placeholder="What is this project about?"
            />

            <p className="form__hint">
              Add a short summary to help your team understand the purpose of
              the workspace.
            </p>

            {state.errors.description && (
              <p className="form__error">{state.errors.description}</p>
            )}
          </div>

          <div className="project-create__actions">
            <button type="submit" className="btn btn--primary">
              Create project
            </button>
          </div>
        </form>
      </section>
    </section>

    );
} 