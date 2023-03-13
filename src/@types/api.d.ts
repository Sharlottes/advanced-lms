interface CrawlResponse {
  content: string;
}
interface GetTodoListResponse {
  content: TODOData[];
}

interface TODOData {
  classId: string;
  todoId: string;
  todoType: "report" | "project"; //TODO: todoType 더 채우기
  title: string;
  subject: string;
  dday: string;
  date: string;
}
