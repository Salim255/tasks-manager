import { Project } from "src/modules/project/entity/project.entity";
import { Sprint } from "src/modules/sprint/entity/sprint.entity";
import { Task } from "src/modules/task/entity/task.entity";

export const sortByDate = (list: Sprint[] | Task[] | Project[] ) => {
    return [...list.sort(
        (
            a:Sprint | Task | Project, 
            b:Sprint | Task | Project
        ) => (new Date(b.createdAt).getTime()) - new Date(a.createdAt).getTime())
    ]
}