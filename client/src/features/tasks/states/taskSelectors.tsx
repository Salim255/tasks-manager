import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";

/* ============================================
   TASK SELECTORS
============================================ */

const selectTasks = (state: RootState) =>
  state.taskReducer.tasks;

const selectTaskLoading = (state: RootState) =>
  state.taskReducer.isLoading;

const selectTaskCreating = (state: RootState) =>
  state.taskReducer.isCreating;

const selectTaskUpdating = (state: RootState) =>
  state.taskReducer.isUpdating;

const selectTaskModalOpen = (state: RootState) =>
  state.taskReducer.isOpenTaskModal;

const selectOpenTaskViewer = (state: RootState) => 
  state.taskReducer.isOpenViewTask;


const selectSelectedTask = (state: RootState) => 
  state.taskReducer.task;

/* ============================================
   TASK HOOKS
============================================ */

export const useTasks = () =>
  useSelector(selectTasks);

export const useTaskLoading = () =>
  useSelector(selectTaskLoading);

export const useTaskCreating = () =>
  useSelector(selectTaskCreating);

export const useTaskUpdating = () =>
  useSelector(selectTaskUpdating);

export const useTaskModalOpen = () =>
  useSelector(selectTaskModalOpen);

export const useSelectedTask = () =>
  useSelector(selectSelectedTask);

export const useTaskViewerOpen = () => 
  useSelector(selectOpenTaskViewer);