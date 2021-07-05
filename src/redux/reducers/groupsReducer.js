import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchGroups } from "../../services/GroupService";

const initialState = {
  items: [],
};

export const fetch = createAsyncThunk(
  "groups/fetch",
  async (_params, thunkAPI) => {
    try {
      const result = await fetchGroups();
      return result.data;
    } catch (e) {
      switch (e.response.status) {
        case 401:
        case 404:
          return thunkAPI.rejectWithValue("Incorrect username or password.");
        default:
          return thunkAPI.rejectWithValue(e.response.data.error);
      }
    }
  }
);
const groupsSlice = createSlice({
  name: "groups",
  initialState,
  extraReducers: {
    [fetch.fulfilled]: (state, action) => {
      state.items = action.payload;
    },
    [fetch.rejected]: (state, action) => {},
  },
});

export default groupsSlice.reducer;
