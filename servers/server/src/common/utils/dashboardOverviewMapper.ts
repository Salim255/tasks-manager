import { ProjectSprintOverviewDto } from "src/modules/project/dto/dashboard-overview.dto";
import { SprintStatus } from "src/modules/sprint/dto/sprint.dto";

export class DashboardOverviewMapper {
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