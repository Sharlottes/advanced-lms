import React from "react";
import { Box, Button, TextField } from "@mui/material";

const LoginForm: React.FC<{ setTodos(todos: TODOData[]): void }> = ({
  setTodos,
}) => {
  const [states, setStates] = React.useState<{ id: string; password: string }>({
    id: "",
    password: "",
  });
  const makeStateSetter =
    (key: keyof typeof states) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setStates((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));
    };

  const handleClick = async () => {
    const res: GetTodoListResponse = await fetch(
      `/api/getTodoList?id=${states.id}&password=${states.password}`
    )
      .then((res) => res.json())
      .catch(() => undefined);
    if (!res) return;
    setTodos(res.content);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "20px 30%",
        gap: "10px",
      }}
    >
      <TextField
        onChange={makeStateSetter("id")}
        variant="standard"
        placeholder="id"
      />
      <TextField
        onChange={makeStateSetter("password")}
        variant="standard"
        placeholder="password"
        type="password"
      />
      <Button
        disabled={!states.id || !states.password}
        variant="contained"
        onClick={handleClick}
      >
        Submit
      </Button>
    </Box>
  );
};

export default LoginForm;
