interface TodoListResponse {
  content: TODOData[];
}

interface TodoDetailResponse {
  content: [DetailType, string][];
}

interface TODOData {
  classId: string;
  todoId: string;
  todoType: "report" | "project" | "test" | "survey"; //TODO: todoType 더 채우기
  title: string;
  subject: string;
  dday: string;
  date: string;
  link: string;
}
