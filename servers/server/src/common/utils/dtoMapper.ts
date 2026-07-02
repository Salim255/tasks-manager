import { SprintCreatorDto, SprintDto } from "src/modules/sprint/dto/sprint.dto";
import { Sprint } from "src/modules/sprint/entity/sprint.entity";
import { TaskAssignerDto, TaskDto, TaskReporterDto } from "src/modules/task/dto/task.dto";
import { Task } from "src/modules/task/entity/task.entity";
import { User } from "src/modules/user/entity/user.entity";

export class DtoMapper {

    static projectTaskMapper = (task: Task): TaskDto => {
        const reporter = task.reporter;
        const assignee = task.assignee;

        return {
            ...task,
            reporter: reporter ? this.userMapper(reporter) : null,
            assignee:  assignee ? this.userMapper(assignee) : null,
        }
    }

    static projectSprintMapper = (sprint: Sprint): SprintDto => {
        const creator = sprint.creator;

        return {
            ...sprint,
            creator: creator ? this.userMapper(creator): null
        }
    } 
    
    static userMapper = (user: User): 
        TaskReporterDto 
        | TaskAssignerDto 
        | SprintCreatorDto 
        | null => {
        const profile = user.profile;
        return{
            id: user.id,
            profile: profile ?  {
                id: profile?.id ,
                firstName: profile?.firstName || '',
                lastName: profile?.lastName || '',
                avatarUrl: profile?.avatarUrl || '',
                bio: profile?.bio || '',
            }: null
        }
    }
}