
import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";

const store = configureStore(
    {
     reducer: reducers,
     middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false
        }) 
    }
)

// Type definitions
export type RootState = ReturnType<typeof store.getState>; 
export default store;