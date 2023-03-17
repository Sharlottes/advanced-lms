import React from "react";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

import useTodoListContext from "@/hooks/useTodoListContext";
import TodoItem from "./TodoItem";

const TodoList: React.FC = () => {
  const { todoList } = useTodoListContext();

  return (
    <Stack divider={<Divider />}>
      {todoList.map((todo, i) => (
        <TodoItem {...todo} key={i} />
      ))}
    </Stack>
  );
};

export default TodoList;
