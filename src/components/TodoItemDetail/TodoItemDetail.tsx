import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { useSnackbar } from "notistack";
import useFetchTodoItemDetail from "@/hooks/useFetchTodoItemDetail";
import {
  TodoItemDetailContainer,
  TodoItemDetailChips,
  TodoItemDetailDescription,
  TodoItemDetailSubmitDate,
} from "./TodoItemDetail.styled";

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
  const { data: rawTodoDetailData } = useFetchTodoItemDetail(
    todoId,
    classId,
    type,
    () => {
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
    }
  );

  const todoDetailData = Object.fromEntries(rawTodoDetailData) as Record<
    DetailType,
    string
  >;

  return (
    <TodoItemDetailContainer>
      <Typography variant="h5" fontWeight="bold">
        {todoDetailData.title}
      </Typography>
      <TodoItemDetailChips>
        <Chip label={`#${todoDetailData.submit_method} 제출`} size="small" />
        <Chip label={`#지각 ${todoDetailData.late_allowed}`} size="small" />
        <Chip label={`#배점 ${todoDetailData.points}`} size="small" />
        <Chip label={`#점수 ${todoDetailData.points_showed}`} size="small" />
      </TodoItemDetailChips>
      <TodoItemDetailDescription variant="body1">
        {todoDetailData.description}
      </TodoItemDetailDescription>
      <TodoItemDetailSubmitDate>
        <Chip label={todoDetailData.created_at} size="small" />
        <span>부터</span>
        <Chip label={todoDetailData.ended_at} size="small" />
        <span>
          까지
          <Chip label={`#${todoDetailData.submit_method} 제출`} size="small" />
        </span>
      </TodoItemDetailSubmitDate>
    </TodoItemDetailContainer>
  );
};

export default TodoItemDetail;
