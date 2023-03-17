import React from "react";

import Button from "@mui/material/Button";

import useTodoListContext from "@/hooks/useTodoListContext";
import useLoginContext from "@/hooks/useLoginContext";

const SubmitButton: React.FC = () => {
  const { id, password } = useLoginContext();
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
