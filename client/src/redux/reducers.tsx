import reducer from "../features/dashboard/states/dashboardSlice";
import taskReducer from "../features/tasks/states/taskSlice";
import sprintReducer from "../features/tasks/states/sprintSlice";
import editSprintReducer from "../features/tasks/states/editSprintSlice";
import projectReducer from "../features/projects/states/projectSlice";

const reducers = {
    projectReducer: projectReducer,
    editSprintReducer: editSprintReducer,
    sprintReducer: sprintReducer,
    taskSlice: taskReducer,
    dashboard: reducer 
}
  
export default reducers;