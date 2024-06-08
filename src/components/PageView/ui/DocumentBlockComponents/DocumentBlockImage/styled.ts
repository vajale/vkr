import { styled } from "@mui/material";

export const StyledDocumentBlockImage = styled("div")(
    ({ width = "200", height = "200" }: { width?: string; height?: string }) => ({
        minHeight: "10px",
        minWidth: "10px",

        ".resizable-box": {
            position: "relative",
            backgroundColor: "lightblue",
            overflow: "hidden",
            minWidth: "70px",
            minHeight: "70px",
        },
        ".handle": {
            position: "absolute",
            width: "10px",
            height: "10px",
            backgroundColor: "gray",
            borderRadius: 7
        },

        ".right": {
            bottom: "0px",
            right: "0px",
            transform: "translateX(-50%)",
            cursor: "nwse-resize",
        },

        ".file-input": {
            visibility: "hidden",
            maxHeight: "0",
            maxWidth: "0",
        },

        ".img-button": {
            backgroundColor: "#419152",
            color: "white",

            "&:hover": {
                backgroundColor: "#367a43",
            },
        },

        ".image": {
            width: "100%",
            height: "100%",
            minWidth: "70px",
            minHeight: "70px",
            userSelect: "none",
            cursor: "pointer",
        },
    }),
);
