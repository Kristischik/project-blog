import { all } from "redux-saga/effects";

import authSagaWatcher from "src/redux/sagas/authSaga";
import postSagaWatcher from "src/redux/sagas/postSaga";
export default function* rootSaga() {
  yield all([authSagaWatcher(), postSagaWatcher()]);
}