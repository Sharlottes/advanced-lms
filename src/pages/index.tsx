import React from "react";
import mockData from "../../public/mock/todo_data.json";
import { Box, Divider, Stack, Typography } from "@mui/material";
import Link from "next/link";

const HomePage: React.FC = () => {
  const [todos, setTodos] = React.useState<TODOData[]>(mockData as TODOData[]);

  const handleClick = async () => {
    const res: GetTodoListResponse = await fetch(
      `/api/getTodoDetail/?classId=${todos[0].classId}&link=${todos[0].link}`
    )
      .then((res) => res.json())
      .catch(() => undefined);
    if (!res) return;
    console.log(res.content);
  };
  return (
    <>
      <button onClick={handleClick}>go</button>
      <Stack divider={<Divider />}>
        {todos.map((todo, i) => (
          <Link href={todo.link} key={i}>
            <Box p="10px">
              <Typography fontWeight="bold">{todo.title}</Typography>
              <Typography variant="body1">{todo.subject}</Typography>
              <Typography>{`${todo.dday}`}</Typography>
            </Box>
          </Link>
        ))}
      </Stack>
    </>
  );
};

export default HomePage;
