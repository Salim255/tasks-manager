import { useEffect } from 'react';
import "./_backlog.scss";
import { useDispatch } from 'react-redux';
import { type AppDispatch } from '../../../../redux/store';
import { CreateTask } from '../../../tasks/components/create-task/CreateTask';
import { TaskItem } from '../../../tasks/components/task-item/TaskItem';
import type { Task } from '../../../tasks/models/task.model';
import { SprintHeader } from '../../../sprints/components/sprint-header/SprintHeader';
import { Navigate } from 'react-router-dom';
import { useSprintModalOpen, useSprints } from '../../../sprints/states/sprintSelectors';
import { updateTaskSprintHttp } from '../../../tasks/http/task.http';
import { createSprint } from '../../../sprints/http/sprint.http';
import { EditSprintForm } from '../../../sprints/components/edit-sprint-form/EditSprintForm';
import { useTaskCreating, useTaskModalOpen, useTasks } from '../../../tasks/states/taskSelectors';
import { UpdateTask } from '../../../tasks/components/update-task/UpdateTask';
import { PageMotion } from '../../../../shared/motion/PageMotion';
import { Group, Panel, Separator  } from 'react-resizable-panels';
import { useActiveProject } from '../../states/projectsSelectors';

export const Backlog = () => {
    const dispatch = useDispatch<AppDispatch>();
    const activeProject = useActiveProject();
    const tasks = useTasks();
    const isCreating = useTaskCreating()
    const isOpenModal = useSprintModalOpen();
    const isOpenTaskModal = useTaskModalOpen();
    const sprints = useSprints();
    const  projectId  = activeProject?.id;
    
    const onDragStart = (task: Task, e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData("text/plain", JSON.stringify(task)); // Any payload
    };

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault(); // REQUIRED so onDrop can fire
    };

    const onDrop = (sprintId: string, e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
        const data = e.dataTransfer.getData("text/plain");
        const task: Task = JSON.parse(data);

        if(task.sprintId === sprintId ) return;
        dispatch(updateTaskSprintHttp({ taskId: task.id, sprintId }));
    };

    const onReverseDrop =  (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const data = e.dataTransfer.getData("text/plain");
        const task = JSON.parse(data);
        dispatch(updateTaskSprintHttp({ taskId: task.id, sprintId: null }));
    };

    const createSprintHandler = () => {
       if(!projectId) return;
       dispatch(createSprint({projectId}));
    }

    const countWorkItem = () => {
        return tasks.filter((task) => !task.sprintId).length;
    }
    
    useEffect(() => {
    }, [tasks, isCreating, sprints, projectId]);

    if (!projectId) return <Navigate to="/workspaces" replace />;

    return (
  <PageMotion>
  <section className="backlog-container scroll-bar">

    <Group orientation="vertical">
      <Separator className="backlog-container__separator" />
      {/* Sprint list */}
      <Panel>
        <section className="backlog-container__sprints">

          {sprints
            .filter((sprint) => sprint.projectId === projectId)
            .map((sprint) => (
              <section
                key={sprint.id}
                className="sprint"
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(sprint.id, e)}
              >
                <SprintHeader sprint={sprint} />

                <div className="sprint__tasks">
                  {tasks.some((task) => task.sprintId === sprint.id) ? (
                    tasks.map((task) =>
                      task.sprintId === sprint.id ? (
                        <TaskItem
                          key={task.id}
                          task={task}
                          draggable
                          onDragStart={(e) => onDragStart(task, e)}
                        />
                      ) : null
                    )
                  ) : (
                    <div className="backlog-container__empty">
                      Your sprint is empty
                    </div>
                  )}
                </div>

                <footer className="sprint__footer">
                  <CreateTask projectId={projectId} sprintId={sprint.id} />
                </footer>
              </section>
            ))}

        </section>
      </Panel>

      <Separator className="backlog-container__separator" />

      {/* Backlog */}
      <Panel defaultSize="50%"
        minSize="50%">
        <section className="backlog">

          <header className="backlog__header">

            <div className="backlog__header-left">
              <span>Backlog</span>

              <span className="backlog__count">
                {countWorkItem()}
              </span>

              <span>work items</span>
            </div>

            <button
              className="btn btn--primary"
              onClick={createSprintHandler}
            >
              Create sprint
            </button>

          </header>

          <section
            className="backlog__content"
            onDragOver={onDragOver}
            onDrop={onReverseDrop}
          >
            {tasks.some((task) => !task.sprintId) ? (
              <div className="backlog__tasks">
                { tasks
                .filter((task) => !task.sprintId)
                .map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    draggable
                    onDragStart={(e) => onDragStart(task, e)}
                  />
                ))}
              </div>
            ) : (
              <div className="backlog-container__empty">
                Your backlog is empty
              </div>
            )}
          </section>

          <footer className="backlog__footer">
            <CreateTask projectId={projectId} sprintId={null} />
          </footer>

        </section>
      </Panel>
        <Separator className="backlog-container__separator" />
    </Group>

  </section>

  {isOpenModal && <EditSprintForm />}
  {isOpenTaskModal && <UpdateTask />}
</PageMotion>
);
}


