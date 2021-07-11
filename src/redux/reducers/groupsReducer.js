import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchGroups as fetchGroupsFromBackend } from "../../services/GroupService";
import { tagsReducer } from "./tagsReducer";

const initialState = {
  items: [],
};

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    groupsReducer: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { groupsReducer } = groupsSlice.actions;

export const fetchGroups = () => async (dispatch) => {
  try {
    const result = await fetchGroupsFromBackend();
    dispatch(groupsReducer(result.data));
  } catch (e) {
    console.log(e.message);
  }
};

export default groupsSlice.reducer;
