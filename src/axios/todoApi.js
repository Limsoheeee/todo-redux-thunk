import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
});

export const getTodoListApi = async () => {
  const response = await instance.get("/todos");

  return response.data;
};

export const getTodoApi = async (id) => {
  const response = await instance.get(`/todos/${id}`);

  return response.data;
};

export const addTodoApi = (todo) => {
  instance.post("/todos", todo);
};

export const delTodoApi = (id) => {
  instance.delete(`/todos/${id}`);
};

export const updateTodoApi = (todo) => {
  instance.put(`/todos/${todo.id}`, todo);
};

export const getNextTodoApi = async (page) => {
  const response = await instance.get(`/todos?_page=${page}&_limit=5`);

  return response.data;
};
