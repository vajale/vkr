import { styled } from "@mui/material";

export const StyledList = styled("div")(() => ({
   display: "flex",
   position: "fixed",
   flexDirection: "column",
   backgroundColor: "white",
   width: 140,
   padding: 7,
   overflow: "auto",
}));

export const StyledListButton = styled("button")(() => ({
   border: "none",
   padding: 7,
   hover: "opacity: 0.6",
}));
