import React from "react";
import TodoListContext from "@/contexts/TodoListContext";

const useTodoListContext = () => React.useContext(TodoListContext);
export default useTodoListContext;
