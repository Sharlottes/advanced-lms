import React from "react";
import Divider from "@mui/material/Divider";

import LoginForm from "@/components/LoginForm";
import TodoList from "@/components/TodoList/TodoList";

const HomePage: React.FC = () => {
  return (
    <>
      <LoginForm />
      <Divider>result</Divider>
      <TodoList />
    </>
  );
};

export default HomePage;
