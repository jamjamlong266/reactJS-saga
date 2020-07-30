import { takeLatest, call, all, fork, put } from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";

import { store } from "store/index";

function* create({ data }) {
  let token = store.getState().PROFILE.userSession.data;
  const headers = { Authorization: `Bearer ${token}` };

  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("status", data.status);

  const { response, error } = yield call(api.create, formData, headers);
  console.log(response, error);
  if (response && response.data.status === "success") {
    yield put(Actions.createSuccess(response.data));
    yield put(Actions.getAll());
  }
  if (error) {
    yield put(Actions.createFail(error.response));
  }
}

function* watchCreate() {
  yield takeLatest(Actions.CREATE, create);
}

export default function* submit() {
  yield all([fork(watchCreate)]);
}
