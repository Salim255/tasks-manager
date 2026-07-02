import { TaskAssignerDto, TaskDto, TaskReporterDto } from "src/modules/task/dto/task.dto";
import { Task } from "src/modules/task/entity/task.entity";
import { User } from "src/modules/user/entity/user.entity";

export class DtoMapper {

    static projectTaskMapper = (task: Task): TaskDto => {
        const reporter = task.reporter;
        const assignee = task.assignee;

        return {
            ...task,
            reporter: reporter ? this.taskUserMapper(reporter) : null,
            assignee:  assignee ? this.taskUserMapper(assignee) : null,
        }
    }

    static taskUserMapper = (user: User): TaskReporterDto | TaskAssignerDto | null => {
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