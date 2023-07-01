import { all, takeLatest, call, put } from "redux-saga/effects";
import { ApiResponse } from "apisauce";
import {PostListResponseData} from "src/redux/@types";
import API from "src/utils/api";
import {getPostsList, setPostsList} from "src/redux/reducers/postSlice";

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

export default function* postSagaWatcher() {
  yield all([takeLatest(getPostsList, postWorker)]);
}