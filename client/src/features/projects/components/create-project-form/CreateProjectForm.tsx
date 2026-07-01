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

  const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setField(e.target.name as 'name' | 'description', e.target.value);
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
          
          <header className="project-create__header">

            <h1 className="project-create__title heading-primary">
              Name your workspace
            </h1>

            <div>
              <p className="project-create__subtitle">
                Create a workspace for your team, tasks and sprint planning.
              </p>
              <p>Required fields are marked with an asterisk *</p>
            </div>
          </header>

          <section className="project-create__card">

            <div className="project-create__section">

              <h2 className="heading-secondary">
                Workspace Details
              </h2>

              <p>
                Basic information about your workspace.
              </p>
            </div>
            <form
                onSubmit={handleSubmit}
                className="project-create__form form"
              >
                <div className="form__group">
                  <label className="form__label">
                   Name <span className="form__label-required">*</span>
                  </label>

                  <input
                    className="form__input"
                    name="name"
                    value={state.name}
                    onChange={handleInput}
                    placeholder="FlowBoard Mobile App"
                  />

                  {state.errors.name && (
                    <p className="form__error">
                      {state.errors.name}
                    </p>
                  )}
                </div>

                <div className="form__group">
                  <label className="form__label"> Key <span className="form__label-required">*</span> <span className="form__label-subtitle"> <FaInfoCircle /> </span>  </label>
                  <input
                    className="form__input"
                    name="key"
                    value={state.key}
                    onChange={handleInput}
                    placeholder="PROJECT-KEY"
                  />
                  {state.errors.key && (
                    <p className="form__error">
                      {state.errors.key}
                    </p>
                  )}
                </div>
                <div className="form__group">
                  <label className="form__label">
                    Description
                  </label>

                  <textarea
                    className="form__textarea"
                    value={state.description}
                    onChange={handleInput}
                    name="description"
                    placeholder="What is this project about?"
                  />

                  {state.errors.description && (
                    <p className="form__error">
                      {state.errors.description}
                    </p>
                  )}
                </div>

                <div className="form__actions">
                  <button
                    type="submit"
                    className="btn btn--primary"
                  >
                    Create
                  </button>
                </div>
              </form>
            </section>
      </section>
    );
} 