import { Button, styled } from "@mui/material";

export const StyledAccountButton = styled(Button)(() => ({
    display: "flex",
    justifyContent: "start",
    gap: "8px",
    width: "fit-content",
    height: "fit-content",

    svg: {
        width: "30px",
        height: "30px",
    },

    img: {
        borderRadius: "20%",
        border: "solid 3px black",
        width: "30px",
        height: "30px",
    },
}));
