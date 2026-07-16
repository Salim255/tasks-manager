import './_board.scss';
import { useEffect } from 'react';
import type { Task, TaskStatus } from '../../../tasks/models/task.model';
import { useSprints } from '../../../sprints/states/sprintSelectors';
import { useTasks } from '../../../tasks/states/taskSelectors';
import { updateTasHttp } from '../../../tasks/http/task.http';
import { useDispatch } from 'react-redux';
import { type AppDispatch } from '../../../../redux/store';
import { BoardColumn } from './components/board-column/BoardColumn';
import { useBoardData } from './board-hooks/boardData';
import { PageMotion } from '../../../../shared/motion/PageMotion';
import { useActiveProject } from '../../states/projectsSelectors';
import { BoardSkeleton } from '../../skeletons/BoardSkeleton';

export const Board = () => { 
    const sprints = useSprints();
    const tasks = useTasks();
    const dispatch = useDispatch<AppDispatch>();
    const boardData = useBoardData(tasks, sprints);
    const activeProject = useActiveProject();

    const onDragStart = (e: React.DragEvent<Element>, task: Task) => {
        e.dataTransfer.setData("text/plain", JSON.stringify(task)); // any payload
    }

    const onDrop = (e: React.DragEvent<Element>, type: TaskStatus) => {
        e.preventDefault();
        const data = e.dataTransfer.getData("text/plain");
        const task = JSON.parse(data);
        if (!task.id) return;
        const payload = { status: type, taskId: task.id };
        dispatch(updateTasHttp(payload))
    }

    const onDragOver = (e: React.DragEvent<Element>) => {
        e.preventDefault();
    }

    useEffect(() => {
    }, [tasks, sprints]);

 
    return (
         <PageMotion>
            {
             activeProject 
              ? (<section className="board">
                <BoardColumn 
                    title="To Do"
                    status="todo"
                    sprintsSize={boardData.sprintSize}
                    tasks={boardData.tasksByStatus.todo}
                    onDragStart={onDragStart}
                    onDrop={(e) => onDrop(e, "todo")}
                    onDragOver={onDragOver}
                />
                <BoardColumn 
                    title="In Progress"
                    status="in_progress"
                    sprintsSize={boardData.sprintSize}
                    tasks={boardData.tasksByStatus.in_progress}
                    onDragStart={onDragStart}
                    onDrop={(e) => onDrop(e, "in_progress")}
                    onDragOver={onDragOver}
                />
                <BoardColumn 
                    title="Done"
                    status="done"
                    sprintsSize={boardData.sprintSize}
                    tasks={boardData.tasksByStatus.done}
                    onDragStart={onDragStart}
                    onDrop={(e) => onDrop(e, "done")}
                    onDragOver={onDragOver}
                />
            </section>)
            :
           ( <BoardSkeleton />)
            }
         </PageMotion>  
    )
}