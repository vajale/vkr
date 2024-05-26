import { styled } from "@mui/material";

export const StyledEditList = styled("div")(() => ({
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
   borderRadius: 7,
   padding: 7,
   hover: "opacity: 0.6",
}));
