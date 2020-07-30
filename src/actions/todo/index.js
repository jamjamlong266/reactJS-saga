import * as getAll from "./getAll";
import * as create from "./create";
import * as deleteTask from "./deleteTask";

export default {
  ...getAll,
  ...create,
  ...deleteTask,
};
