import { SprintCreatorDto, SprintDto } from "src/modules/sprint/dto/sprint.dto";
import { Sprint } from "src/modules/sprint/entity/sprint.entity";
import { TaskDto, TaskUserDto } from "src/modules/task/dto/task.dto";
import { Task } from "src/modules/task/entity/task.entity";
import { User } from "src/modules/user/entity/user.entity";

export class DtoMapper {

    static projectTaskMapper = (task: Task): TaskDto => {
        return {
            id: task.id,
            title: task.title,
            description: task.description ?? null,
            taskType: task.taskType,
            status: task.status,
            priority: task.priority ?? 'medium',

            reporterId: task.reporterId,
            assigneeId: task.assigneeId ?? null,

            taskNumber: task.taskNumber,
            issueKey: task.issueKey,

            sprintId: task.sprintId ?? null,
            projectId: task.projectId,

            pointEstimate: task.pointEstimate ?? null,
            dueAt: task.dueAt ?? null,

            createdAt: task.createdAt,
            updatedAt: task.updatedAt,

            reporter: this.userMapper(task.reporter),
            assignee: task.assignee ? this.userMapper(task.assignee) : null,
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
        | TaskUserDto
        | SprintCreatorDto => {
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