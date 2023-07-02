import { all, takeLatest, call, put } from "redux-saga/effects";
import { ApiResponse } from "apisauce";
import {PostListResponseData} from "src/redux/@types";
import API from "src/utils/api";
import {getPostsList, getSinglePost, setPostsList, setSinglePost} from "src/redux/reducers/postSlice";
import {PayloadAction} from "@reduxjs/toolkit";
import {Post} from "src/@types";

function* postWorker() {

  const response: ApiResponse<PostListResponseData> = yield call(
    API.getPosts,
  );
  if (response.ok && response.data) {
    yield put(setPostsList(response.data.results))
  } else {
    console.error("Sigh Up User error", response.problem);
  }
}

function* getSinglePostWorker(action: PayloadAction<string>) {
  const response: ApiResponse<Post> = yield call(
    API.getSinglePost,
    action.payload
  );
  if (response.ok && response.data) {
    yield put(setSinglePost(response.data));
  } else {
    console.error("Activate User error", response.problem);
  }
}

export default function* postSagaWatcher() {
  yield all([takeLatest(getPostsList, postWorker), takeLatest(getSinglePost, getSinglePostWorker)]);
}