import { NavLink, useParams } from 'react-router-dom';
import './_board.scss';
import { useEffect, useMemo, useState } from 'react';
import { DiScrum } from "react-icons/di";
import type { Task, TaskStatus } from '../../models/task.model';
import { BoardTaskItem } from '../../components/board-task-item/BoardTaskItem';
import type { Sprint } from '../../models/sprint.model';
import { useSprintSelector } from '../../states/sprintSelectors';
import { useTasksSelector } from '../../states/taskSelectors';
import { updateTasHttp } from '../../http/task.http';
import { useDispatch } from 'react-redux';
import { type AppDispatch } from '../../../../redux/store';

export const Board = () => { 
    const { projectId }  = useParams<string>() 
    const { sprints } = useSprintSelector();
    const { tasks } = useTasksSelector();
    const dispatch = useDispatch<AppDispatch>();


    const activeSprintIds = useMemo(() => {
        return new Set(sprints
            .filter((sprint) => sprint.status === 'active')
            .map((sprint) => sprint.id)
        );
    }, [sprints])


    const onDragStart = (e: React.DragEvent<HTMLDivElement>, task: Task) => {
        e.dataTransfer.setData("text/plain", JSON.stringify(task)); // any payload
    }

    const onDrop = (e: React.DragEvent<HTMLDivElement>, type: TaskStatus) => {
        e.preventDefault();
        const data = e.dataTransfer.getData("text/plain");
        const task = JSON.parse(data);

        if (!task.id) return;
        const payload = { status: type, taskId: task.id };
        dispatch(updateTasHttp(payload))
    }

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }

    const countTasksByStatus = (status: TaskStatus): number | null => {
        // Get active sprints set
        const counter = tasks
            ?.filter(
                (task: Task) => 
                    task.status === status 
                    && (task.sprintId && activeSprintIds.has(task.sprintId))
            ).length || null;
        return counter ;
    }

    useEffect(() => {}, [sprints, tasks]);

    return (
        <section className="board">
            <div className="todo"
                onDrop={(e) => onDrop(e, "todo")}
                onDragOver={onDragOver}
            >
                <div className='todo__header'>
                    To Do { countTasksByStatus("todo") }
                </div>

                {
                    sprints
                    ?.filter(
                        (spt: Sprint) => spt.status === 'active'
                    )?.length 
                    ? 
                        sprints.
                        filter((sprint) => sprint.status === 'active')
                        .map((sprint) => {
                            
                            return <div key={sprint.id} className=''> 
                                {
                                    tasks.map((task: Task) => {
                                    return (
                                        (
                                            task.status === "todo" 
                                            && 
                                            task.sprintId === sprint.id
                                        ) 
                                        &&
                                        <BoardTaskItem 
                                            key={task.id} 
                                            task={task} 
                                            draggable
                                            onDragStart={(e) => onDragStart(e, task)}
                                            /> 
                                        )
                                    })
                                }
                            </div>
                        })
                    : <div className='todo__empty'>
                        <DiScrum className='icon'/>
                        <h3>
                            Get started in backlog
                        </h3>
                        <p>
                            Plan and star a sprint to see work here
                        </p>
                        <NavLink 
                            className="btn btn--primary"
                            to={`/projects/${projectId}/backlog`}>
                            Go to backlog
                        </NavLink>
                    </div>
                }
              
            </div>
            <div className="progress"
                onDrop={(e) => onDrop(e, "in_progress")}
                onDragOver={onDragOver}
            >
                <div className='progress__header'>
                    In Progress { countTasksByStatus("in_progress") }
                </div>
                {
                    sprints
                    .filter(
                        (spt: Sprint) => spt.status === 'active' 
                    )?.length 
                    ? sprints
                        .filter((sprint) => sprint.status === 'active')
                        .map((sprint) => {
                            return <div key={sprint.id} className=''>
                                {
                                    tasks.map((task: Task) => {
                                        return(
                                            (
                                                task.status === "in_progress" 
                                                && task.sprintId === sprint.id
                                            ) 
                                            &&
                                            <BoardTaskItem 
                                                task={task} 
                                                draggable
                                                onDragStart={(e) => onDragStart(e, task)}
                                                key={task.id} >
                                            </BoardTaskItem> 
                                        )
                                    })
                                }
                            </div>
                        })
                    : null
                }
            </div>
            <div className="done"
                onDrop={(e) => onDrop(e, "done")}
                onDragOver={onDragOver}
            >
               <div className='done__header'> Done { countTasksByStatus("done") } </div>
                {   sprints
                    .filter(
                        (spt: Sprint) => spt.projectId === projectId
                    )?.length 
                    ? sprints
                        .filter((sprint) => sprint.status === 'active')
                        .map((sprint) => {
                        return <div key={sprint.id} className=''>
                            {
                                tasks.map((task: Task) => {
                                    return (
                                        (
                                            task.status === "done" 
                                            && task.sprintId === sprint.id
                                        ) 
                                        &&
                                        <BoardTaskItem 
                                            task={task}
                                            draggable
                                            onDragStart={(e) => onDragStart(e, task)}
                                            key={task.id}>
                                        </BoardTaskItem> 
                                    )
                                })
                            }
                        </div>
                    })
                    : null
                }
            </div>
        </section>
    )
}