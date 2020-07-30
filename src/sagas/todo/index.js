import { all, fork } from "redux-saga/effects";
import getAll from "./getAll";
import create from "./create";
import deleteTask from "./deleteTask";

export default function* home() {
  yield all([fork(getAll), fork(create), fork(deleteTask)]);
}
