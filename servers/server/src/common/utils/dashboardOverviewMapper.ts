import { ProjectSprintOverviewDto, ProjectTasksOverviewDto } from "src/modules/project/dto/dashboard-overview.dto";
import { SprintStatus } from "src/modules/sprint/dto/sprint.dto";

export class DashboardOverviewMapper {
    static projectTasksOverviewDto(
        userId: string,
        tasks: {
                projectId: string;
                status: string;
                count: string;
                assigneeId: string | null
            } []
        ) {
            
        return tasks
            .reduce<ProjectTasksOverviewDto>(
            (
                acc: ProjectTasksOverviewDto,
                task: {
                    projectId: string;
                    status: string;
                    count: string;
                    assigneeId: string | null;
                }
            ) => {
                const count = Number(task.count);
                acc.assignedToMeCount += (task.assigneeId === userId ? 1 : 0);
            
                acc.total += count;
    
                switch(task.status){
                case 'done':
                    acc.done += count;
                    break;
                case 'in_progress':
                    acc.inProgress += count;
                    break;
                case 'todo':
                    acc.todo += count;
                    break;
                };
                return acc;
              }, {
                total: 0,
                todo: 0,
                inProgress: 0,
                done: 0,
                assignedToMeCount: 0,
              }
            )
    }

    static projectSprintOverviewDto(
        sprints: {
            status: SprintStatus;
            projectId: string;
            count: string
        }[]): ProjectSprintOverviewDto {
        return sprints
        .reduce<ProjectSprintOverviewDto>(
        (
            acc: ProjectSprintOverviewDto,
            sprint: {
                status: SprintStatus;
                projectId: string;
                count: string
            }
        ) => {
                const count = Number(sprint.count);
                acc.total += count;
    
                switch(sprint.status){
                case 'active':
                    acc.active += count;
                    break;
                case 'completed':
                    acc.completed += count;
                    break;
                case 'planned':
                    acc.planned += count;
                    break;
                case 'upcoming':
                    acc.upcoming += count;
                    break;
                }
    
                return acc;
            }, {
                total: 0,
                active: 0,
                completed: 0,
                planned: 0,
                upcoming: 0
              }
        ) 
    }
}