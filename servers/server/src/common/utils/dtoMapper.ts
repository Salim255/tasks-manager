import { TaskReporterDto } from "src/modules/task/dto/task.dto";
import { Task } from "src/modules/task/entity/task.entity";
import { User } from "src/modules/user/entity/user.entity";

export class DtoMapper {

    static projectTaskMapper = (task: Task) => {
        const reporter = task.reporter;

        return {
            ...task,
            reporter: reporter ? this.taskReporterMapper(reporter) : null
        }
    }

    static taskReporterMapper = (reporter: User): TaskReporterDto | null => {
        const profile = reporter.profile;
        return{
            id: reporter.id,
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