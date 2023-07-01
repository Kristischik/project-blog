import { all, takeLatest, call } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse } from "apisauce";

import { signUpUser } from "src/redux/reducers/authSlice";
import { SignUpResponseData, SignUpUserPayload } from "src/redux/@types";
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

export default function* authSagaWatcher() {
  yield all([takeLatest(signUpUser, sighUpUserWorker)]);
}