import {
  fetchMe,
  loginRequest,
  logoutRequest,
  registrationRequest, resetPasswordRequest, updateMeRequest,
} from "../../services/UserService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setToken } from "../../services/HttpService";

const initialState = {
  isLoggedIn: false,
  user: null,
  error: null,
  authReady: false,
};

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
          return thunkAPI.rejectWithValue("Incorrect username or password."); //TODO: not necessary anymore
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
      state.authReady = true;
    },
    updateUserReducer: (state, action) => {
      state.user = action.payload;
    },
    setAuthError: (state, action) => {
      state.error = action.payload;
    },
    authReady: (state) => {
      state.authReady = true;
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

export const { logoutReducer, authUserReducer, updateUserReducer, setAuthError, authReady } =
  userSlice.actions;

export const logout = () => async (dispatch) => {
  await logoutRequest();
  setToken(null);
  dispatch(logoutReducer());
};

export const authUser = () => async (dispatch) => {
  try {
    const result = await fetchMe();
    dispatch(authUserReducer(result.data));
  } catch (e) {
    // Token invalid or expired
    setToken(null);
  }
};

export const register = (userdata) => async (dispatch) => {
  try {
    const result = await registrationRequest(userdata);
    dispatch(authUserReducer(result.data));
  } catch (e) {
    dispatch(setAuthError(e.message));
    setToken(null);
  }
};

export const resetPassword = (user, token, password) => async (dispatch) => {
  try {
    const result = await resetPasswordRequest(user, token, password);
    dispatch(authUserReducer(result.data));
  } catch (e) {
    setToken(null);
  }
};

export const updateUser = (data) => async (dispatch) => {
  try {
    const result = await updateMeRequest(data);
    dispatch(updateUserReducer(result.data));
  } catch (e) {}
}

export default userSlice.reducer;
