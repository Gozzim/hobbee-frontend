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

export const authenticate = createAsyncThunk(
  "user/auth",
  async (_, thunkAPI) => {
    try {
      const result = await fetchUser();
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

export const logout = () => async (dispatch) => {
  const result = await logoutRequest();
  if (result.status === 200) {
    setToken(null);
    dispatch(userSlice.actions.logout());
  }
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: state => {
      state.isLoggedIn = false;
      state.user = null;
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
    [authenticate.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.error = null;
    },
    [authenticate.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      state.error = action.payload;
    },
  },
});

export default userSlice.reducer;
