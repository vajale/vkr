import { styled } from "@mui/material";
import type { IExtendedThemeProps } from "@/themes/types";

export const StyledCarouselContent = styled("div")(({ theme }: IExtendedThemeProps) => ({
    padding: "5px 2vw",
    height: "700px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",

    ".header-large": {
        fontSize: theme?.textSize.sizeText64,
        fontWeight: theme?.fontWeights.baldHard,
        fontFamily: "Inter, sans-serif",
        textShadow: "-6px 5px 10px rgba(0, 0, 0, 0.7)",
    },

    ".title": {
        fontSize: theme?.textSize.sizeText18,
        fontFamily: "Inter, sans-serif",
    },

    ".header": {
        fontSize: theme?.textSize.sizeText32,
        fontFamily: "Inter, sans-serif",
    },

    ".description-wrapper": {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        maxWidth: "50%",

        ".description": {
            display: "flex",
            flexDirection: "column",
            gap: "20px",
        },

        ".counter-wrapper": {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "30px",

            ".counter": {
                fontWeight: theme?.fontWeights.baldHard,
                fontFamily: "Inter, sans-serif",
                fontSize: theme?.textSize.sizeText32,
            },

            ".counter-value": {
                fontWeight: theme?.fontWeights.baldHard,
                fontFamily: "Inter, sans-serif",
                fontSize: theme?.textSize.sizeText48,
            },
        },
    },

    button: {
        borderRadius: "8px",
        width: "420px",
        height: "80px",
        backgroundColor: "#F8E480",
        fontFamily: "Inter, sans-serif",
        fontSize: theme?.textSize.sizeText20,
        fontWeight: theme?.fontWeights.baldHard,
    },
}));
