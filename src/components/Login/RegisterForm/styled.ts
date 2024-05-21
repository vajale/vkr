import { Box, Paper, styled } from "@mui/material";
import type { IExtendedThemeProps } from "@/themes/types";

export const GridItem = styled(Paper)(({ theme }: IExtendedThemeProps) => ({
    textAlign: "center",
}));
export const StyledRegister = styled("form")(({ theme }: IExtendedThemeProps) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    width: "60vw",
    height: "60vh",

    ".controls": {
        width: "20%",
        marginBottom: "30px",
    },

    ".grid-container": {
        display: "grid",
        gridTemplateColumns: "repeat(2, 50%)",
        gridTemplateRows: "repeat(3, 70px)",
        gap: "10px",

        ".grid-item": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1.5rem",
            width: "90%",
        },
    },
}));
