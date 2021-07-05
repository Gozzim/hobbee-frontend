import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchTags } from "../../services/TagService";

const initialState = {
  items: [],
};

export const fetch = createAsyncThunk(
  "tags/fetch",
  async (_params, thunkAPI) => {
    try {
      const result = await fetchTags();
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
const tagsSlice = createSlice({
  name: "tags",
  initialState,
  extraReducers: {
    [fetch.fulfilled]: (state, action) => {
      state.items = action.payload;
    },
    [fetch.rejected]: (state, action) => {},
  },
});

export default tagsSlice.reducer;
