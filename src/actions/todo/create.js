export const NAME = "TODO"; //folder name

//TYPE NAME
export const CREATE = `${NAME}/CREATE`;
export const CREATE_SUCCESS = `${NAME}/CREATE_SUCCESS`;
export const CREATE_FAIL = `${NAME}/CREATE_FAIL`;

export const getCreateData = (store) => store[NAME].create;

//create action function
export const create = (data) => ({
  type: CREATE,
  data: data,
});

export const createSuccess = (data) => ({
  type: CREATE_SUCCESS,
  data,
});

export const createFail = (error) => ({
  type: CREATE_FAIL,
  error: error,
});
