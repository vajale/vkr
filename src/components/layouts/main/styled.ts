import { styled } from "@mui/material";

const StyledMainLayout = styled("div")(() => ({
    display: "flex",
    flexDirection: "column",
    width: "100vw",
    height: "100vh",
    minHeight: "100vh",
    maxWidth: "100%",
}));

export { StyledMainLayout };
