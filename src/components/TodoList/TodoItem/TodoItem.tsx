import React from "react";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import TodoItemDetail from "./TodoItemDetail/TodoItemDetail";

const TodoItem: React.FC<TODOData> = ({
  classId,
  todoId,
  todoType,
  title,
  subject,
  dday,
  date,
}) => {
  const [openDetail, setOpenDetail] = React.useState(false);

  const handleClick = () => setOpenDetail((prev) => !prev);

  return (
    <Box p="10px 10%">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        onClick={handleClick}
      >
        <Box>
          <Typography fontWeight="bold">{title}</Typography>
          <Typography variant="body1">{subject}</Typography>
          <Typography display="inline" fontWeight="bold">
            {dday}
          </Typography>{" "}
          {" | "}
          <Typography display="inline">{date}</Typography>
        </Box>
        <IconButton
          onClick={handleClick}
          sx={{
            height: "fit-content",
            transition: "all 300ms",
            transform: openDetail ? "rotate(0.5turn)" : "rotate(0)",
          }}
        >
          <KeyboardArrowDownIcon />
        </IconButton>
      </Box>
      <Collapse in={openDetail} mountOnEnter>
        <>
          <Divider sx={{ margin: "5px 0" }} />
          <React.Suspense fallback={<CircularProgress />}>
            <TodoItemDetail todoId={todoId} classId={classId} type={todoType} />
          </React.Suspense>
        </>
      </Collapse>
    </Box>
  );
};

export default TodoItem;
