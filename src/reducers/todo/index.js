import { combineReducers } from "redux";

import getAll from "./getAll";
import create from "./create";
import deleteTask from "./deleteTask";

export default combineReducers({
  getAll,
  create,
  deleteTask,
});
