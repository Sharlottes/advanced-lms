import React from "react";

export interface TodoListContext {
  todoList: TODOData[];
  fetchTodoList(id: string, pw: string): Promise<void>;
}

const TodoListContext = React.createContext<TodoListContext>({
  todoList: [],
  fetchTodoList(id, pw) {
    throw new Error("this context is not subscribed");
  },
});

export default TodoListContext;
