import useFetchTodoItemDetail from "@/hooks/useFetchTodoItemDetail";
import { useSnackbar } from "notistack";
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
  const { enqueueSnackbar } = useSnackbar();
  const { data } = useFetchTodoItemDetail(todoId, classId, type, () => {
    enqueueSnackbar({
      key: "todo_detail_too_long",
      variant: "warning",
      message: (
        <div style={{ textAlign: "left" }}>
          <strong>로딩이 생각보다 오래 걸립니다!</strong>
          <br />
          네트워크 상태가 좋지 않거나 비밀번호가 알맞지 않으면 데이터를 불러올
          수 없습니다.
          <br />
          해당 사항을 점검하고 재시도해보십시오.
        </div>
      ),
    });
  });

  return (
    <>
      {data.map((data, i) => (
        <div key={i}>{data}</div>
      ))}
    </>
  );
};

export default TodoItemDetail;
