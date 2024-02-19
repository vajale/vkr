import { styled } from "@mui/material";

const StyledMainLayout = styled("div")(() => ({
  display: "flex",
  flexDirection: "row",
  width: "100vh",
  height: "100vw",
  minHeight: "100vh",
  maxWidth: "100%",
}));

export { StyledMainLayout };
