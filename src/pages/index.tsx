import React from "react";

const HomePage: React.FC = () => {
  React.useEffect(() => {
    fetch("/api/crawel")
      .then((res) => res.json())
      .then(console.log);
  }, []);
  return <></>;
};

export default HomePage;
