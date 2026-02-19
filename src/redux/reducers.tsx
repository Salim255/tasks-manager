import reducer from "../features/dashboard/states/dashboardSlice";
import taskReducer from "../features/tasks/states/taskSlice";

const reducers = {  
    taskSlice: taskReducer,
    dashboard: reducer 
}
  
export default reducers;