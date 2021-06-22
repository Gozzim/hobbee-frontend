import {
  loginRequest,
} from "../../services/UserService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
  error: null,
};

/*
 * TODO:
 *  - Correct error handling
 *  - Error not showing on second try
 */

export const login = createAsyncThunk(
  "user/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const result = await loginRequest(username, password);
      return result;
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.error = null;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      state.error = action.payload;
    },
  },
});

export default userSlice.reducer;
