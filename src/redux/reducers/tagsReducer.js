import { createSlice } from "@reduxjs/toolkit";
import { fetchTags } from "../../services/TagService";

const initialState = {
  items: [],
};
const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    tagsReducer: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { tagsReducer } = tagsSlice.actions;

export const fetchHobbyTags = () => async (dispatch) => {
  try {
    const result = await fetchTags();
    dispatch(tagsReducer(result.data));
  } catch (e) {
    console.log(e.message);
  }
};

export default tagsSlice.reducer;
