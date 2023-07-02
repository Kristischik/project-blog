import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ActivateUserPayload,
  SignInUserPayload,
  SignUpUserPayload,
} from "src/redux/@types";
import {ACCESS_TOKEN_KEY} from "src/utils/api/constants";
import {RootState} from "src/redux/store";

type InitialState = {
  accessToken: string,
}

const initialState: InitialState = {
  accessToken: localStorage.getItem(ACCESS_TOKEN_KEY) || ''
};

const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    signUpUser: (_, __: PayloadAction<SignUpUserPayload>) => {},

    activateUser: (_, __: PayloadAction<ActivateUserPayload>) => {},

    signInUser: (state, action: PayloadAction<SignInUserPayload>) => {},
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
});

export const { signUpUser, activateUser, signInUser, setAccessToken } =
  authSlice.actions;

export const AuthSelectors = {
  getLoggedIn: (state: RootState) => !!state.authReducer.accessToken,
};

export default authSlice.reducer;
