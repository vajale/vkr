import { styled } from "@mui/material";

export const StyledPageHeader = styled("div")(() => ({
    ".background": {
        display: "flex",
        flexDirection: "row",
        justifyContent: "end",
    },
    ".grade-wrapper": {
        margin: 20,
        cursor: "pointer",
    },
    ".favorite": {
        width: "50px",
        height: "50px",
    },
}));
