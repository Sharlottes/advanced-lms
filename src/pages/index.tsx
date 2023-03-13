import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import Link from "next/link";
import LoginForm from "@/components/LoginForm";
import mockData from "../../public/mock/todo_data.json";

const HomePage: React.FC = () => {
  const [todos, setTodos] = React.useState<TODOData[]>(mockData as TODOData[]);

  return (
    <>
      <LoginForm setTodos={setTodos} />
      <Divider>result</Divider>
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
