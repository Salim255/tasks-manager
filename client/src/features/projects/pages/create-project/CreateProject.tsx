import './_create-project.scss';
import { CreateProjectForm } from "../../components/create-project-form/CreateProjectForm";
import { PageMotion } from '../../../../shared/motion/PageMotion';

export const CreateProject = () => {
    return (
        <PageMotion>
            <section className="create-project scroll-bar">
                <CreateProjectForm/>
            </section>
        </PageMotion>
    )
}