import { ApiStatus } from "@/types/globals.types";
import { Project } from "@/types/projects.types";
import { createSlice } from "@reduxjs/toolkit";

interface ProjectsState {
  fetchStatus: ApiStatus;
  projects: Project[];
}

const initialState: ProjectsState = {
  fetchStatus: ApiStatus.IDLE,
  projects: [],
};

export const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProjects: (state, { payload }) => {
      state.projects = payload;
    },
    
    setTopRowValueOfProjects: (state, { payload }) => {
      return {
        ...state,
        ...payload,
      };
    },
  },
});

export const { addProjects, setTopRowValueOfProjects } = projectSlice.actions;

export default projectSlice.reducer;
