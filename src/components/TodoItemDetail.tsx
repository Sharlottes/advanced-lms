import useFetchTodoItemDetail from "@/hooks/useFetchTodoItemDetail";
import React from "react";

export interface TodoItemDetailProps {
  todoId: string;
  classId: string;
  type: string;
}

const TodoItemDetail: React.FC<TodoItemDetailProps> = ({
  todoId,
  classId,
  type,
}) => {
  const { data } = useFetchTodoItemDetail(todoId, classId, type);

  return (
    <>
      {data.map((data, i) => (
        <div key={i}>{data}</div>
      ))}
    </>
  );
};

export default TodoItemDetail;
