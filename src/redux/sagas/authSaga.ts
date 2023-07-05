import { all, takeLatest, call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse } from "apisauce";

import {
  activateUser,
  getUserInfo,
  setAccessToken,
  setUserInfo,
  signInUser,
  signUpUser
} from "src/redux/reducers/authSlice";
import {
  ActivateUserPayload,
  SignInUserPayload,
  SignInUserResponseData,
  SignUpResponseData,
  SignUpUserPayload, UserInfoPayload
} from "src/redux/@types";
import API from "src/utils/api";
import {ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY} from "src/utils/api/constants";

function* sighUpUserWorker(action: PayloadAction<SignUpUserPayload>) {
  const { data, callback } = action.payload;
  const response: ApiResponse<SignUpResponseData> = yield call(
    API.signUpUser,
    data
  );
  if (response.ok && response.data) {
    callback();
  } else {
    console.error("Sigh Up User error", response.problem);
  }
}

function* activateUserWorker(action: PayloadAction<ActivateUserPayload>) {
  const { data, callback } = action.payload;
  const response: ApiResponse<undefined> = yield call(API.activateUser, data);
  if (response.ok) {
    callback();
  } else {
    console.error("Activate User error", response.problem);
  }
}

function* signInUserWorker(action: PayloadAction<SignInUserPayload>) {
  const { data, callback } = action.payload;

  const response:ApiResponse<SignInUserResponseData> = yield call(API.createToken, data);

  if (response.ok && response.data) {
    yield put(setAccessToken(response.data.access))
    localStorage.setItem(ACCESS_TOKEN_KEY, response.data.access)
    localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refresh)
    callback(); // в этом случае делаем callback
  } else {
    console.error("Sigh In User error", response.problem);
  }
}

function* userInfoWorker() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

  if (accessToken) {
    const response: ApiResponse<UserInfoPayload> = yield call(
      API.getUserInfo,
      accessToken
    );
    if (response.ok && response.data) {
      yield put(setUserInfo(response.data));
    } else {
      console.error("Get User Info error", response.problem);
    }
  }
}

export default function* authSagaWatcher() {
  yield all([
    takeLatest(signUpUser, sighUpUserWorker),
    takeLatest(activateUser, activateUserWorker),
    takeLatest(signInUser, signInUserWorker),
    takeLatest(getUserInfo, userInfoWorker),
  ]);
}