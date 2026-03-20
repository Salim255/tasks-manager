import "./_create-project-form.scss";
import { useEffect, type ChangeEvent } from "react";
import { useProjectForm } from "../../forms-builders/projectFormBuilder"
import { useDispatch } from "react-redux";
import { createProjectHttp, type CreateProjectPayload } from "../../http/project.http";
import { type AppDispatch } from "../../../../redux/store";

export const CreateProjectForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { state, setField } = useProjectForm();
    
    const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setField(e.target.name as 'name' | 'description', e.target.value);
    }

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload: CreateProjectPayload =
            { 
                name: state.name,
                description: state.description,
            }
        if (!payload.description || !payload.name) return
        dispatch(createProjectHttp(payload));
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