import { takeLatest, call, all, fork, put } from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";

import { encode } from "../../services/encryption";

function* register({ data }) {
  console.log("register saga");

  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("password_confirmation", data.password_confirmation);

  const { response, error } = yield call(api.register, formData);
  console.log(response, error);

  //if response status is sucess then we will update the reducer
  if (response && response.data.status === "success") {
    yield put(Actions.registerSuccess(response.data));
  }
  if (error) {
    console.log(error);
    yield put(Actions.registerFail(error));
  }
  //if error then update fail reducer
}

function* watchRegister() {
  yield takeLatest(Actions.REGISTER, register);
}

export default function* submit() {
  yield all([fork(watchRegister)]);
}
