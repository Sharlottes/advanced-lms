import React from "react";

const HomePage: React.FC = () => {
  const [html, setHtml] = React.useState<JSX.Element>();
  const handleClick = async () => {
    const res: GetTodoListResponse = await fetch(`/api/getTodoList`)
      .then((res) => res.json())
      .catch(() => undefined);
    if (!res) return;
    console.log(res.content);
    setHtml(
      <div
        dangerouslySetInnerHTML={{ __html: JSON.stringify(res.content) }}
      ></div>
    );
  };
  return (
    <>
      <button onClick={handleClick}>go</button>
      {html}
    </>
  );
};

export default HomePage;
