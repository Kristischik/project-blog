import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SignUpUserPayload } from "src/redux/@types";

type InitialState = {};

const initialState: InitialState = {};

const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    signUpUser: (_, __: PayloadAction<SignUpUserPayload>) => {},
  },
});

export const { signUpUser } = authSlice.actions;

export const AuthSelectors = {};

export default authSlice.reducer;