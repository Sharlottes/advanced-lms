import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Link from "next/link";

const TodoItem: React.FC<TODOData> = ({ link, title, subject, dday }) => {
  return (
    <Link href={link}>
      <Box p="10px">
        <Typography fontWeight="bold">{title}</Typography>
        <Typography variant="body1">{subject}</Typography>
        <Typography>{`${dday}`}</Typography>
      </Box>
    </Link>
  );
};

export default TodoItem;
