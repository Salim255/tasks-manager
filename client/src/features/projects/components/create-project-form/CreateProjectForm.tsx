import "./_create-project-form.scss";
import { useEffect, type ChangeEvent } from "react";
import { useProjectForm } from "../../forms-builders/projectFormBuilder"
import { useDispatch } from "react-redux";
import { createProjectHttp, type CreateProjectPayload, type ProjectResponseDto } from "../../http/project.http";
import { type AppDispatch } from "../../../../redux/store";
import { useNavigate } from "react-router-dom";

export const CreateProjectForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { state, setField } = useProjectForm();

    const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setField(e.target.name as 'name' | 'description', e.target.value);
    }

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload: CreateProjectPayload =
            { 
                name: state.name,
                description: state.description,
            }
        if (!payload.name) return
        const result = await dispatch(createProjectHttp(payload));
       
        if (createProjectHttp.fulfilled.match(result)) { 
            const project = result.payload.data.project;
            navigate(`/projects/${project.id}/board`)
        }
    }

    useEffect(() => {
    }, [state])

    return (
        <form onSubmit={handleSubmit} className="form">
            <div className="form-row">
                <label className="form-label">Name your project</label>
                <input 
                    className="form-input"
                    name="name"
                    value={state.name}
                    type="text" 
                    onChange={handleInput}
                    placeholder="project name"
                />
            </div>

            <div className="form-row">
                <label className="form-label">Describe your project</label>
                <textarea
                    className="form-textarea"
                    value={state.description}
                    onChange={handleInput}
                    name="description"
                    placeholder="project description"
                    />
            </div>
            <button type="submit" className="btn btn-hero form-row">
                create
            </button>
        </form>
    )
} 