
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
export type AppDispatch = typeof store.dispatch;

// Add this line — the missing piece
export const dispatch = store.dispatch;

export default store;