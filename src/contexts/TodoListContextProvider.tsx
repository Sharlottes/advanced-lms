import React from "react";
import TodoListContext from "./TodoListContext";

const TodoListContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [todoList, setTodoList] = React.useState<TODOData[]>([]);

  const fetchTodoList = async (id: string, password: string) => {
    const res = await fetch(`/api/todoList?id=${id}&password=${password}`);
    if (!res.ok) throw new Error(res.statusText);
    const data: TodoListResponse = await res.json();
    setTodoList(data.content);
  };

  return (
    <TodoListContext.Provider
      value={{
        todoList,
        fetchTodoList,
      }}
    >
      {children}
    </TodoListContext.Provider>
  );
};

export default TodoListContextProvider;
