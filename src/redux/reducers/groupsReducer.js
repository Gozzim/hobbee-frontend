import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchGroups as fetchGroupsFromBackend,
  fetchMyGroups,
  fetchRecommendedGroups,
} from "../../services/GroupService";
import { tagsReducer } from "./tagsReducer";

const initialState = {
  data: {},
  mine: [],
  recommended: [],
};

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    allGroups: (state, action) => {
      for (let i = 0; i < action.payload.length; i++) {
        const group = action.payload[i];
        state.data[group._id] = group;
      }
    },
    myGroups: (state, action) => {
      for (let i = 0; i < action.payload.length; i++) {
        const group = action.payload[i];
        state.data[group._id] = group;
      }
      state.mine = action.payload.map((group) => group._id);
    },
    recommendedGroups: (state, action) => {
      for (let i = 0; i < action.payload.length; i++) {
        const group = action.payload[i];
        state.data[group._id] = group;
      }
      state.recommended = action.payload.map((group) => group._id);
    },
  },
});

const { allGroups, myGroups, recommendedGroups } = groupsSlice.actions;

export const getGroups = () => async (dispatch) => {
  try {
    const result = await fetchGroupsFromBackend();
    dispatch(allGroups(result.data));
  } catch (e) {
    console.log(e.message);
  }
};

export const getMyGroups = () => async (dispatch) => {
  try {
    const result = await fetchMyGroups();
    dispatch(myGroups(result.data));
  } catch (e) {
    console.log(e.message);
  }
};

export const getRecommendedGroups = () => async (dispatch) => {
  try {
    const result = await fetchRecommendedGroups();
    dispatch(recommendedGroups(result.data));
  } catch (e) {
    console.log(e.message);
  }
};

export default groupsSlice.reducer;
