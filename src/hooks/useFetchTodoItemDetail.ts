import useLoginContext from "@/hooks/useLoginContext";
import useSWR from "swr";

const useFetchTodoItemDetail = (
  todoId: string,
  classId: string,
  type: string
) => {
  const { id, password } = useLoginContext();

  const fetcher = (url: string) =>
    fetch(url)
      .then<TodoDetailResponse>((r) => r.json())
      .then((data) => data.content);

  return useSWR<string[]>(
    `/api/todoDetail/?id=${id}&password=${password}&todo_id=${todoId}&class_id=${classId}&type=${type}`,
    fetcher,
    {
      suspense: true,
      revalidateIfStale: false,
      revalidateOnMount: false,
      revalidateOnReconnect: false,
    }
  );
};

export default useFetchTodoItemDetail;
