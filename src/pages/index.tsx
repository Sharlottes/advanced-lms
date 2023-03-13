import React from "react";
import mockData from "../../public/mock/todo_data.json";
import { Box, Divider, Stack, Typography } from "@mui/material";
import Link from "next/link";

const queryData: Record<TODOData["todoType"], string> = {
  project: "PROJECT",
  report: "RT",
};
const getLink = (type: TODOData["todoType"], id: TODOData["todoId"]) =>
  `https://cyber.kyungnam.ac.kr/ilos/st/course/${type}_view_form.acl?${queryData[type]}=${id}`;
const HomePage: React.FC = () => {
  const [todos, setTodos] = React.useState<TODOData[]>(mockData as TODOData[]);

  const handleClick = async () => {
    const res: GetTodoListResponse = await fetch(`/api/getTodoList`)
      .then((res) => res.json())
      .catch(() => undefined);
    if (!res) return;
  };
  return (
    <>
      <button onClick={handleClick}>go</button>
      <Stack divider={<Divider />}>
        {todos.map((todo, i) => (
          <Link href={getLink(todo.todoType, todo.todoId)} key={i}>
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
