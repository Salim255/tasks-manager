import { CreateTaskForm } from "./components/CreateTaskForm";

export const CreateTask = () => {
    return (
        <CreateTaskForm  onCreateTask={(task) => console.log(task)} />
    )
}