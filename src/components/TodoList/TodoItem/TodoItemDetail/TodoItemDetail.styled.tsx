import styled from "@mui/system/styled";
import Typography from "@mui/material/Typography";

export const TodoItemDetailContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

export const TodoItemDetailChips = styled("div")({
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  alignItems: "center",
});

export const TodoItemDetailDescription = styled(Typography)({
  maxWidth: "768px",
  margin: "10px 0",
});

export const TodoItemDetailSubmitDate = styled("div")({
  display: "flex",
  gap: "5px",
  flexWrap: "wrap",
  alignItems: "center",
});
