import React from "react";

import Button from "@mui/material/Button";

import useTodoListContext from "@/hooks/useTodoListContext";

const SubmitButton: React.FC<LoginState> = ({ id, password }) => {
  const { fetchTodoList } = useTodoListContext();

  const handleSubmit = () => fetchTodoList(id, password);

  return (
    <Button
      disabled={!id || !password}
      variant="contained"
      onClick={handleSubmit}
      sx={{ marginTop: "10px" }}
    >
      Submit
    </Button>
  );
};

export default SubmitButton;
