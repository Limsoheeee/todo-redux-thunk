import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addTodoApi,
  getTodoListApi,
  delTodoApi,
  updateTodoApi,
  getTodoApi,
} from "../axios/todoApi";

export const __addTodo = createAsyncThunk("addTodo", (todo, thunkAPI) => {
  addTodoApi(todo);

  thunkAPI.dispatch(addTodo(todo));
});

export const __getTodo = createAsyncThunk("getTodo", async (id, thunkAPI) => {
  const todo = await getTodoApi(id);

  thunkAPI.dispatch(getTodo(todo));
});

export const __getTodoList = createAsyncThunk(
  "getTodoList",
  async (_, thunkAPI) => {
    const todoList = await getTodoListApi();

    thunkAPI.dispatch(getTodoList(todoList));
  }
);

export const __delTodo = createAsyncThunk("delTodo", (id, thunkAPI) => {
  delTodoApi(id);

  thunkAPI.dispatch(delTodo(id));
});

export const __updateTodo = createAsyncThunk(
  "updateTodo",
  async (todo, thunkAPI) => {
    updateTodoApi(todo);

    thunkAPI.dispatch(updateTodo(todo));
  }
);

const initialState = {
  todos: [],
};

const todo = createSlice({
  name: "todo",
  initialState,
  reducers: {
    getTodoList: (state, action) => {
      state.todos = action.payload;
    },
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    delTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      state.todos = state.todos.map((todo) => {
        return todo.id === action.payload.id ? action.payload : todo;
      });
    },
  },
});

export const { delTodo, addTodo, getTodo, getTodoList, updateTodo } =
  todo.actions;
export default todo.reducer;
