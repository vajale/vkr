import { styled } from "@mui/material";

export const StyledPaper = styled("div")(() => ({
    width: "370px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
}));

export const StyledFileBtn = styled("div")(() => ({
    display: "flex",
    flexDirection: "row",

    ".upload-icon": {
        width: "fit-content",
        height: "fit-content",
        svg: {
            width: "40px",
            height: "40px",
        },
    },
    ".input-file-text": {
        padding: "0 10px",
        lineHeight: "40px",
        textAlign: "left",
        height: "40px",
        display: "block",
        float: "left",
        boxSizing: "border-box",
        width: "200px",
        borderRadius: "6px 0px 0 6px",
        border: "1px solid #ddd",
    },

    input: {
        visibility: "hidden",
        maxHeight: "0px",
        maxWidth: "0px",
    },

    ".input-file-btn": {
        position: "relative",
        display: "inline-block",
        cursor: "pointer",
        outline: "none",
        textDecoration: "none",
        fontSize: "14px",
        verticalAlign: "middle",
        color: "rgb(255, 255, 255)",
        textAlign: "center",
        borderRadius: "0 4px 4px 0",
        backgroundColor: "#419152",
        lineHeight: "22px",
        height: "40px",
        padding: "10px 20px",
        boxSizing: "border-box",
        border: "none",
        margin: "0",
        transition: "background-color 0.2s",
        "&:hover": {
            backgroundColor: "#367a43",
        },
    },
}));
