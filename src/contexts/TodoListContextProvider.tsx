import React from "react";
import TodoListContext from "./TodoListContext";

const TodoListContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [todoList, setTodoList] = React.useState<TODOData[]>([]);

  const fetchTodoList = async (id: string, password: string) => {
    const res: GetTodoListResponse = await fetch(
      `/api/getTodoList?id=${id}&password=${password}`
    )
      .then((res) => res.json())
      .catch(() => undefined);
    if (!res) return;
    setTodoList(res.content);
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
