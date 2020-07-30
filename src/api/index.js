import fetchApi from "./helper";

export const login = (data) => {
  return fetchApi("post", "api/auth/login", data);
};

//register
export const register = (data) => {
  return fetchApi("post", "api/auth/register", data);
};

//get all
export const getAll = (headers) => {
  return fetchApi("get", "api/all", null, headers);
};

//create
export const create = (data, headers) => {
  return fetchApi("post", "api/new", data, headers);
};

//delete task
export const deleteTask = (data, headers) => {
  return fetchApi("post", `api/delete`, data, headers);
};
