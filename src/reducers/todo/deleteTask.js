import Actions from "../../actions";

const getDefaultState = () => ({
  isLoading: false,
  error: null,
  data: {},
});

function deleteTask(state, action) {
  if (typeof state === "undefined") {
    return getDefaultState();
  }

  switch (action.type) {
    case Actions.DELETE_TASK:
      return {
        isLoading: true,
        error: null,
        data: {},
      };
    case Actions.DELETE_TASK_SUCCESS:
      return {
        isLoading: false,
        error: null,
        data: action.data,
      };
    case Actions.DELETE_TASK_FAIL:
      return {
        isLoading: false,
        error: action.error,
        data: {},
      };
    default:
      return state;
  }
}

export default deleteTask;
