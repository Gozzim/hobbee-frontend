import {
  fetchUser,
  loginRequest,
  logoutRequest,
} from "../../services/UserService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setToken } from "../../services/HttpService";

const initialState = {
  isLoggedIn: false,
  user: null,
  error: null,
};

/*
 * TODO:
 *  - Error not showing on second try
 */

export const login = createAsyncThunk(
  "user/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const result = await loginRequest(username, password);
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutReducer: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.error = null;
    },
    authUserReducer: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.error = null;
    },
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

export const { logoutReducer, authUserReducer } = userSlice.actions;

export const logout = () => async (dispatch) => {
  await logoutRequest();
  setToken(null);
  dispatch(logoutReducer());
};

export const authUser = () => async (dispatch) => {
  try {
    const result = await fetchUser();
    dispatch(authUserReducer(result.data));
  } catch (e) {
    setToken(null);
  }
};

export default userSlice.reducer;
