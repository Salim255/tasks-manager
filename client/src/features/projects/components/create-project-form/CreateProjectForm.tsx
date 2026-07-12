import "./_create-project-form.scss";
import { useEffect, type ChangeEvent } from "react";
import { useProjectForm } from "../../forms-builders/projectFormBuilder"
import { useDispatch } from "react-redux";
import { createProjectHttp, fetchSingleProjectHttp, type CreateProjectPayload} from "../../http/project.http";
import { type AppDispatch } from "../../../../redux/store";
import { useNavigate } from "react-router-dom";
import { validateProjectForm } from "../../../../shared/utils/forms-validator";

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
          if (!project) return;
          dispatch(fetchSingleProjectHttp({projectId: project.id}));
          navigate(`/workspaces/${project?.key}/board`);
         
      }
  }

  useEffect(() => {
  }, [state])

  return (

  <section className="project-create">

  <header className="project-create__hero">

    <div className="project-create__hero-copy">

      <h1 className="project-create__title">
        Create a new project
      </h1>

      <p className="project-create__subtitle">
        Set up your workspace and start organizing your tasks.
      </p>

    </div>
  </header>


  <section className="project-create__card">

    <form 
      onSubmit={handleSubmit}
      className="project-create__form form"
    >


      {/* NAME */}

      <div className="form__group">

        <div className="form__field-header">

          <label
            htmlFor="project-name"
            className="form__label"
          >
            Project name
            <span className="form__label-required">
              *
            </span>
          </label>


          <p className="form__hint">
            Choose a clear name that your team will recognize.
          </p>

        </div>


        <input
          id="project-name"
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





      {/* KEY */}

      <div className="form__group">

        <div className="form__field-header">

          <label
            htmlFor="project-key"
            className="form__label"
          >
            Project key
            <span className="form__label-required">
              *
            </span>
          </label>


          <p className="form__hint">
            A short uppercase identifier used in task references, like FLOW-1.
          </p>

        </div>



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



        {state.errors.key && (
          <p className="form__error">
            {state.errors.key}
          </p>
        )}

      </div>






      {/* DESCRIPTION */}

      <div className="form__group">

        <div className="form__field-header">

          <label
            htmlFor="project-description"
            className="form__label"
          >
            Description
          </label>


          <p className="form__hint">
            Add a short summary to give your team context.
          </p>

        </div>



        <textarea
          id="project-description"
          className="form__textarea"
          value={state.description}
          onChange={handleInput}
          name="description"
          placeholder="Describe your project..."
        />



        {state.errors.description && (
          <p className="form__error">
            {state.errors.description}
          </p>
        )}

      </div>





      <div className="project-create__actions">

        <button
          type="submit"
          className="btn btn--primary"
        >
          Create project
        </button>

      </div>


    </form>

  </section>

</section>

    );
} 