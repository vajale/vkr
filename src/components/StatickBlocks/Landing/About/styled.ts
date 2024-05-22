import { styled } from "@mui/material";

export const StyledAbout = styled("div")(() => ({
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    width: "80%",
    fontSize: "32px",
    fontFamily: "Inter, sans-serif",
    overflow: "auto",
    ul: {
        margin: 0,
    },
    ".wrapper": {
        display: "flex",
        flexDirection: "column",
    },
    ".common": {},
    ".bald": {
        fontWeight: "900",
    },
}));
