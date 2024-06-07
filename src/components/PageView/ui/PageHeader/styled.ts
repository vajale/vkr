import { styled } from "@mui/material";

export const StyledPageHeader = styled("div")(() => ({
    width: "100%",
    ".background": {
        display: "flex",
        flexDirection: "row",
        justifyContent: "end",
    },
    ".grade-wrapper": {
        width: "fit-content",
        height: "fit-content",
        margin: 20,
        cursor: "pointer",
        position: "relative",
    },
    ".grade-background": {
        position: "absolute",
        top: "13%",
        left: "16%",
        width: "70%",
        height: "60%",
        backgroundColor: "red",
        borderRadius: "20%",
        zIndex: 1,
    },
    ".favorite": {
        width: "50px",
        height: "50px",
        transition: "color 0.3s ease-in-out",
    },
    ".favorite--active": {
        width: "50px",
        height: "50px",
        color: "red",
        transition: "color 0.3s",
    },
}));
