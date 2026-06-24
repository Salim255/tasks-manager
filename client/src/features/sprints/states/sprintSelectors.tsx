import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";

const selectSprints = (state: RootState) =>
  state.sprintReducer.sprints;

const selectSprintLoading = (state: RootState) =>
  state.sprintReducer.isLoading;

const selectSprintCreating = (state: RootState) =>
  state.sprintReducer.isCreating;

const selectSprintUpdating = (state: RootState) =>
  state.sprintReducer.isUpdating;

const selectSprintModalOpen = (state: RootState) =>
  state.sprintReducer.isOpenModal;

const selectSelectedSprint = (state: RootState) =>
  state.sprintReducer.sprint;

export const useSprints = () => useSelector(selectSprints);

export const useSprintLoading = () =>
  useSelector(selectSprintLoading);

export const useSprintCreating = () =>
  useSelector(selectSprintCreating);

export const useSprintUpdating = () =>
  useSelector(selectSprintUpdating);

export const useSprintModalOpen = () =>
  useSelector(selectSprintModalOpen);

export const useSelectedSprint = () =>
  useSelector(selectSelectedSprint);