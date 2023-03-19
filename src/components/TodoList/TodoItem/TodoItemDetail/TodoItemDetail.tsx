import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
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
  const { data: todoDetailData } = useFetchTodoItemDetail(
    todoId,
    classId,
    type
  );

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
