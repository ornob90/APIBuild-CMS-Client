import { configureStore } from '@reduxjs/toolkit'
import projectSlice from "@/store/features/projectsSlice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      project: projectSlice 
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']