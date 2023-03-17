import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import Link from "next/link";

import useTodoListContext from "@/hooks/useTodoListContext";

const TodoList: React.FC = () => {
  const { todoList } = useTodoListContext();

  return (
    <Stack divider={<Divider />}>
      {todoList.map((todo, i) => (
        <Link href={todo.link} key={i}>
          <Box p="10px">
            <Typography fontWeight="bold">{todo.title}</Typography>
            <Typography variant="body1">{todo.subject}</Typography>
            <Typography>{`${todo.dday}`}</Typography>
          </Box>
        </Link>
      ))}
    </Stack>
  );
};

export default TodoList;
