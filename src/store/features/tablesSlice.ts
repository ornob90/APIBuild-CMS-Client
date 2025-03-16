import { ApiStatus } from "@/types/globals.types";
import { Table } from "@/types/tables.types";
import { createSlice } from "@reduxjs/toolkit";

interface TablesSlice {
  fetchStatus: ApiStatus;
  tables: Table[];
}

const initialState: TablesSlice = {
  fetchStatus: ApiStatus.IDLE,
  tables: [],
};

export const tableSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {
    addTables: (state, { payload }) => {
      state.tables = payload;
    },
    setTopRowValueOfTable: (state, { payload }) => {
      return {
        ...state,
        ...payload,
      };
    },
  },
});

export const {
    addTables,
    setTopRowValueOfTable,
} = tableSlice.actions;

export default tableSlice.reducer;
