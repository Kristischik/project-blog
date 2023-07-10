import { all, takeLatest, call, put } from "redux-saga/effects";
import { ApiResponse } from "apisauce";
import { PostListResponseData } from "src/redux/@types";
import API from "src/utils/api";
import {
  getMyPosts,
  getPostsList,
  getSinglePost,
  setMyPosts,
  setPostsList,
  setSinglePost,
  setSinglePostLoading,
} from "src/redux/reducers/postSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { Post } from "src/@types";
import callCheckingAuth from "src/redux/sagas/helpers/callCheckingAuth";

function* postWorker() {
  yield put(setSinglePostLoading(true));
  const response: ApiResponse<PostListResponseData> = yield call(API.getPosts);
  if (response.ok && response.data) {
    yield put(setPostsList(response.data.results));
  } else {
    console.error("Sigh Up User error", response.problem);
  }
  yield put(setSinglePostLoading(false));
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

function* getMyPostsWorker() {
  const response: ApiResponse<PostListResponseData> = yield callCheckingAuth(
    API.getMyPosts
  );
  if (response.status === 404) {
    yield put(setMyPosts([]));
    console.error("404", response.problem);
  } else if (response.ok && response.data) {
    yield put(setMyPosts(response.data.results));
  } else {
    console.error("Set My Posts error", response.problem);
  }
}

export default function* postSagaWatcher() {
  yield all([
    takeLatest(getPostsList, postWorker),
    takeLatest(getSinglePost, getSinglePostWorker),
    takeLatest(getMyPosts, getMyPostsWorker),
  ]);
}
