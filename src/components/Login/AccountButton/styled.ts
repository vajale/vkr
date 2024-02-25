import {Button, styled} from "@mui/material";

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
        width: "30px",
        height: "30px",
    },
}));
