import { useEffect, type ChangeEvent } from "react";
import { useProjectForm } from "../../forms/projectFormBuilder"
import { useDispatch } from "react-redux";
import { createProject, type CreateProjectPayload } from "../../states/projectSlice";

export const CreateProjectForm = () => {
    const dispatch = useDispatch();
    const { state, setField } = useProjectForm();

    const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setField(e.target.name as 'name' | 'description', e.target.value);
    }

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(state);
        const payload: CreateProjectPayload  = { name: state.name, description: state.description, status: state.status}
        dispatch(createProject({ payload }));
    }

    useEffect(() => {
        console.log(state, "hello state")
    }, [state])
    return <form onSubmit={handleSubmit}>
        <div>
            <label>Name your project</label>
            <input 
                name="name"
                value={state.name}
                type="text" 
                onChange={handleInput}
            />
        </div>

        <div>
            <label>Describe your project</label>
            <textarea
                value={state.description}
                onChange={handleInput}
                name="description"
                />
        </div>
        <button type="submit">
            create
        </button>
    </form>
} 