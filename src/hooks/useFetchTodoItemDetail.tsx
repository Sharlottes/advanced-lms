import useLoginContext from "@/hooks/useLoginContext";
import { useSnackbar } from "notistack";
import useSWR from "swr";

const useFetchTodoItemDetail = (
  todoId: string,
  classId: string,
  type: string
) => {
  const { enqueueSnackbar } = useSnackbar();
  const { id, password } = useLoginContext();

  const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(res.statusText);
    const data: TodoDetailResponse = await res.json();
    return Object.fromEntries(data.content) as Record<DetailType, string>;
  };

  const result = useSWR<Record<DetailType, string>>(
    `/api/todoDetail/?id=${id}&password=${password}&todo_id=${todoId}&class_id=${classId}&type=${type}`,
    fetcher,
    {
      suspense: true,
      revalidateIfStale: false,
      revalidateOnMount: false,
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
      loadingTimeout: 5 * 1000,
      onLoadingSlow: () => {
        enqueueSnackbar({
          key: "todo_detail_too_long",
          variant: "warning",
          message: (
            <div style={{ textAlign: "left" }}>
              <strong>로딩이 생각보다 오래 걸립니다!</strong>
              <br />
              네트워크 상태가 좋지 않거나 비밀번호가 알맞지 않으면 데이터를
              불러올 수 없습니다.
              <br />
              해당 사항을 점검하고 재시도해보십시오.
            </div>
          ),
        });
      },
    }
  );

  return result;
};

export default useFetchTodoItemDetail;
