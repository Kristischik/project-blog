import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ActivateUserPayload, ResetPasswordConfirmationPayload, ResetPasswordPayload,
  SignInUserPayload,
  SignUpUserPayload,
  UserInfoPayload,
} from "src/redux/@types";
import { ACCESS_TOKEN_KEY } from "src/utils/constants";
import { RootState } from "src/redux/store";

type InitialState = {
  accessToken: string;
  userInfo: UserInfoPayload | null;
};

const initialState: InitialState = {
  accessToken: localStorage.getItem(ACCESS_TOKEN_KEY) || "",
  userInfo: null,
};

const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    signUpUser: (_, __: PayloadAction<SignUpUserPayload>) => {},

    activateUser: (_, __: PayloadAction<ActivateUserPayload>) => {},

    signInUser: (_, __: PayloadAction<SignInUserPayload>) => {},
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    getUserInfo: (_, __: PayloadAction<undefined>) => {},
    setUserInfo: (state, action: PayloadAction<UserInfoPayload | null>) => {
      state.userInfo = action.payload;
    },
    logoutUser: (_, __: PayloadAction<undefined>) => {},

    resetPassword: (_, __: PayloadAction<ResetPasswordPayload>) => {},

    resetPasswordConfirm: (_, __: PayloadAction<ResetPasswordConfirmationPayload>) => {},

  },
});

export const {
  signUpUser,
  activateUser,
  signInUser,
  setAccessToken,
  getUserInfo,
  setUserInfo,
  logoutUser,
  resetPassword,
  resetPasswordConfirm,
} = authSlice.actions;

export const AuthSelectors = {
  getLoggedIn: (state: RootState) => !!state.authReducer.accessToken,
  getUserInfo: (state: RootState) => state.authReducer.userInfo,
};

export default authSlice.reducer;
