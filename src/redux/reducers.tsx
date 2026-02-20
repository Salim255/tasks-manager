import reducer from "../features/dashboard/states/dashboardSlice";
import taskReducer from "../features/tasks/states/taskSlice";
import sprintReducer from "../features/tasks/states/sprintSlice";

const reducers = {  
    sprintReducer: sprintReducer,
    taskSlice: taskReducer,
    dashboard: reducer 
}
  
export default reducers;