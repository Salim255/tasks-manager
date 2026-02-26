import type { RootState } from "../../../redux/store";

export const selectSprints = (state: RootState) =>
    state.sprintReducer.sprints;

export const selectActiveSprint = (state: RootState) => {
   const sprints =  selectSprints(state).find(
        sprint => sprint.status === "active"
    );
    return sprints ? [sprints] : [];
}
    