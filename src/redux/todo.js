import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addTodoApi,
  getTodoListApi,
  delTodoApi,
  updateTodoApi,
  getTodoApi,
  getNextTodoApi,
} from "../axios/todoApi";

export const __getNextTodo = createAsyncThunk(
  "getNextTodo",
  async (_, thunkAPI) => {
    const { page } = thunkAPI.getState().todo;

    try {
      const response = await getNextTodoApi(page);

      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

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
  page: 1,
  isNext: true,
  isLoaded: false,
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
  extraReducers: {
    [__getNextTodo.pending]: (state) => {
      state.isLoaded = true;
    },
    [__getNextTodo.fulfilled]: (state, action) => {
      state.todos.push(...action.payload);
      state.page += 1;

      if (action.payload < 5) {
        state.isNext = false;
      }

      state.isLoaded = false;
    },
    [__getNextTodo.rejected]: (_, action) => {
      console.log(action.payload);
    },
  },
});

export const { delTodo, addTodo, getTodo, getTodoList, updateTodo } =
  todo.actions;
export default todo.reducer;
