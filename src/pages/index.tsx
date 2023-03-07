import React from "react";

const HomePage: React.FC = () => {
  const handleClick = async () => {
    const res = await fetch(`/api/getSchedule`)
    if(!res.ok) return;
  };
  return <button onClick={handleClick}>go</button>;
};

export default HomePage;
