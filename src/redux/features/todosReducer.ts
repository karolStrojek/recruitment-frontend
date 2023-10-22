import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { todoStatesTypes, todoType } from "../../types/common";

export interface ITodoReducer {
  todos: todoType[];
  listName: string;
}

export interface IstateChange {
  id: string;
  state: todoStatesTypes;
}

const initialState: ITodoReducer = {
  todos: JSON.parse(localStorage.getItem("todos") || "[{}]") || [],
  listName: localStorage.getItem("listName") || "",
};

export const todosSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<todoType>) => {
      state.todos.push(action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    setListName: (state, action: PayloadAction<string>) => {
      state.listName = action.payload;
      localStorage.setItem("listName", state.listName);
    },
    changeState: (state, action: PayloadAction<IstateChange>) => {
      const index = state.todos.findIndex((el) => el.id === action.payload.id);
      state.todos[index].state = action.payload.state;
      const splicedState = state.todos.splice(index, 1);

      //Make sure that it appears on end of the list
      state.todos.push(splicedState[0]);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const index = state.todos.findIndex((el) => el.id === action.payload);
      state.todos.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
  },
});

export const { addTodo, setListName, changeState, deleteTodo } =
  todosSlice.actions;

export default todosSlice.reducer;
