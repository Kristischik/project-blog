import { all, takeLatest, call } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse } from "apisauce";

import {activateUser, signUpUser} from "src/redux/reducers/authSlice";
import {ActivateUserPayload, SignUpResponseData, SignUpUserPayload} from "src/redux/@types";
import API from "src/utils/api";

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

export default function* authSagaWatcher() {
  yield all([
    takeLatest(signUpUser, sighUpUserWorker),
    takeLatest(activateUser, activateUserWorker),
  ]);
}