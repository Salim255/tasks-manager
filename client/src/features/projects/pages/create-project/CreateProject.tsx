import './_create-project.scss';
import { CreateProjectForm } from "../../components/create-project-form/CreateProjectForm";

export const CreateProject = () => {
    return (
        <section className="create-project">
            <CreateProjectForm/>
        </section>
    )
}