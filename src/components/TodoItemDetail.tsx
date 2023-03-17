import useLoginContext from "@/hooks/useLoginContext";
import React from "react";
import useSWR from "swr";

const TodoItemDetail: React.FC = () => {
  const { id, password } = useLoginContext();

  const {
    data: { content },
    error,
  } = useSWR<{ content: string[] }>(
    `/api/getTodoDetail/?id=${id}&password=${password}`,
    null,
    { suspense: true }
  );

  return (
    <>
      {content.map((data, i) => (
        <div key={i}>{data}</div>
      ))}
    </>
  );
};

export default TodoItemDetail;
