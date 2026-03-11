import reducer from "../features/dashboard/states/dashboardSlice";
import taskReducer from "../features/projects/states/taskSlice";
import sprintReducer from "../features/projects/states/sprintSlice";
import projectReducer from "../features/projects/states/projectSlice";
import authReducer from "../features/auth/states/authSlice";

const reducers = {
    authReducer: authReducer,
    projectReducer: projectReducer,
    sprintReducer: sprintReducer,
    taskSlice: taskReducer,
    dashboard: reducer 
}
  
export default reducers;