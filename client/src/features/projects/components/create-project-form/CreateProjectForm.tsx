import "./_create-project-form.scss";
import { useEffect, type ChangeEvent } from "react";
import { useProjectForm } from "../../forms-builders/projectFormBuilder"
import { useDispatch } from "react-redux";
import { createProjectHttp, fetchSingleProjectHttp, type CreateProjectPayload} from "../../http/project.http";
import { type AppDispatch } from "../../../../redux/store";
import { useNavigate } from "react-router-dom";
import { validateProjectForm } from "../../../../shared/utils/forms-validator";
import { motion } from "motion/react";

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
              if (message) setError(field as "name" | "description", message);
          });
          return;
      }
      const payload: CreateProjectPayload =
          { 
              name: state.name,
              description: state.description,
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
    < motion.section 
      
          initial= {{
    opacity: 0,
    y: 8,
    scale: 0.995,
  }}

  animate= {{
    opacity: 1,
    y: 0,
    scale: 1,
  }
}
  exit= {{
    opacity: 0,
    y: -8,
    scale: 0.995,
  }}

  transition= {{
    duration: 0.22,
    ease: [0.22, 1, 0.36, 1], // Premium ease-out curve
  }
        }
    className="project-create">
     
  <header className="project-create__header">

    <h1 className="project-create__title heading-primary">
      New Project
    </h1>

    <p className="project-create__subtitle">
      Create a workspace for your team, tasks and sprint planning.
    </p>

  </header>

  <section className="project-create__card">

    <div className="project-create__section">

      <h2 className="heading-secondary">
        Project details
      </h2>

      <p>
        Basic information about your project.
      </p>

    </div>

      <form
        onSubmit={handleSubmit}
        className="project-create__form form"
      >
        <div className="form__group">
          <label className="form__label">
            Project name
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
        </div>

        <div className="form__actions">
          <button
            type="submit"
            className="btn btn--primary"
          >
            Create Project
          </button>
        </div>
      </form>
        </section>
    </  motion.section>
    );
} 