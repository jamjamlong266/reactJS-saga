import { takeLatest, call, all, fork, put } from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";

import { store } from "store/index";

function* getAll() {
  let token = store.getState().PROFILE.userSession.data;
  // let token = Actions.user(store).data;
  const headers = { Authorization: `Bearer ${token}` };

  // console.log("token is: ", token);

  const { response, error } = yield call(api.getAll, headers);
  console.log(response, error);
  if (response && response.data.status === "success") {
    yield put(Actions.getAllSuccess(response.data));
  }
  if (error) {
    yield put(Actions.getAllFail(error.response));
  }
}

function* watchGetAll() {
  yield takeLatest(Actions.GET_ALL, getAll);
}

export default function* submit() {
  yield all([fork(watchGetAll)]);
}
