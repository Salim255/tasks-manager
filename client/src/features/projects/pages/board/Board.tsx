import './_board.scss';
import { useEffect } from 'react';
import type { Task, TaskStatus } from '../../models/task.model';
import { useSprintSelector } from '../../states/sprintSelectors';
import { useTasksSelector } from '../../states/taskSelectors';
import { updateTasHttp } from '../../http/task.http';
import { useDispatch } from 'react-redux';
import { type AppDispatch } from '../../../../redux/store';
import { BoardColumn } from './components/board-column/BoardColumn';
import { useBoardData } from './board-hooks/boardData';
import { fetchSingleProjectHttp } from '../../http/project.http';
import { useParams } from 'react-router-dom';

export const Board = () => { 
    const { sprints } = useSprintSelector();
    const { tasks } = useTasksSelector();
    const dispatch = useDispatch<AppDispatch>();
     const { projectId } = useParams();
    const boardData = useBoardData(tasks, sprints);

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
        if (projectId) {
            dispatch(fetchSingleProjectHttp({ projectId }))
        }
       
    }, [projectId, dispatch]);

    return (
        <section className="board">
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
        </section>
    )
}