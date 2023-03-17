import useFetchTodoItemDetail from "@/hooks/useFetchTodoItemDetail";
import React from "react";

export interface TodoItemDetailProps {
  classId: string;
  link: string;
}

const TodoItemDetail: React.FC<TodoItemDetailProps> = ({ classId, link }) => {
  const { data } = useFetchTodoItemDetail(classId, link);

  return (
    <>
      {data.map((data, i) => (
        <div key={i}>{data}</div>
      ))}
    </>
  );
};

export default TodoItemDetail;
