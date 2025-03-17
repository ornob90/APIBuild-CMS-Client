import { Api } from "@/types/apis.types";
import { ApiStatus } from "@/types/globals.types";
import { createSlice } from "@reduxjs/toolkit";

interface ProjectsState {
  fetchStatus: ApiStatus;
  apis: Api[];
}

const initialState: ProjectsState = {
  fetchStatus: ApiStatus.IDLE,
  apis: [],
};

export const apiSlice = createSlice({
  name: "apis",
  initialState,
  reducers: {
    setTopRowValueOfApis: (state, { payload }) => {
      return {
        ...state,
        ...payload,
      };
    },
  },
});

export const { setTopRowValueOfApis } = apiSlice.actions;

export default apiSlice.reducer;
