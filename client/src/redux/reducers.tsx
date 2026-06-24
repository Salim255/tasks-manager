import reducer from "../features/dashboard/states/dashboardSlice";
import taskReducer from "../features/tasks/states/taskSlice";
import sprintReducer from "../features/sprints/states/sprintSlice";
import projectReducer from "../features/projects/states/projectSlice";
import authReducer from "../features/auth/states/authSlice";
import profileReducer from "../features/profile/states/profileSlice";
import memberReducer from "../features/members/states/memberSlice";

const reducers = {
    memberReducer: memberReducer,
    profileReducer: profileReducer,
    authReducer: authReducer,
    projectReducer: projectReducer,
    sprintReducer: sprintReducer,
    taskReducer: taskReducer,
    dashboard: reducer,
}
  
export default reducers;