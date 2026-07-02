import { Project } from "src/modules/project/entity/project.entity";
import { FindOptionsRelations } from "typeorm";

export class TableRelationBuilder {
    static projectRelationsBuilder(relations: string[]): FindOptionsRelations<Project> {
        const projectRelations: FindOptionsRelations<Project> = {};

        if (relations.includes('owner')) {
            projectRelations.owner = {
                profile: true,
            };
        }

        if (relations.includes('tasks')) {
            projectRelations.tasks = {
                reporter: {
                profile: true
                },
                assignee: {
                profile: true
                },
            };
        }

        if (relations.includes('sprints')) {
            projectRelations.sprints =  {
                creator: {
                profile: true
                },
            };
        }

        if (relations.includes('members')) {
            projectRelations.members =  {
                user: {
                profile: true
                },
            };
        }
    
        return projectRelations;
    }
}