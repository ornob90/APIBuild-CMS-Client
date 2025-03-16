import { ApiStatus } from "@/types/globals.types";
import { createSlice } from "@reduxjs/toolkit";

interface ProjectsState {
  fetchStatus: ApiStatus;
}

const initialState: ProjectsState = {
  fetchStatus: ApiStatus.IDLE,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setTopRowValueOfUsers: (state, { payload }) => {
      return {
        ...state,
        ...payload,
      };
    },
  },
});

export const { setTopRowValueOfUsers } = usersSlice.actions;

export default usersSlice.reducer;
