import useLoginContext from "@/hooks/useLoginContext";
import useSWR from "swr";

const useFetchTodoItemDetail = (classId: string, link: string) => {
  const { id, password } = useLoginContext();

  const fetcher = (url: string) =>
    fetch(url)
      .then<GetTodoDetailResponse>((r) => r.json())
      .then((data) => data.content);

  return useSWR<string[]>(
    `/api/getTodoDetail/?id=${id}&password=${password}&class_id=${classId}&link=${link}`,
    fetcher,
    { suspense: true }
  );
};

export default useFetchTodoItemDetail;
