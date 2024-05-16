import { styled } from "@mui/material";
// Нужен пакет типов yarn add -D @types/react-slick`
import Slider from "react-slick";

export const StyledCarouselSlick = styled(Slider)({
    ".slick-list": {
        margin: "0 calc(-1 * var(--space-xs))",
    },

    ".slick-track": {
        display: "flex",

        ".slick-slide": {
            display: "flex",
            height: "auto",
            flexGrow: 1,

            "& > div": {
                width: "100%",
            },
        },
    },

    ".carousel-slick__button": {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        padding: "1.5rem 1rem",
        borderRadius: "var(--size-radius-s)",
        zIndex: 3,
        display: "flex",
        width: "30px",
        height: "100%",
        minHeight: "100px",
        cursor: "pointer",
        background: "var(--color-grey--transparent)",
        border: "1px solid var(--border)",
        backdropFilter: "blur(var(--size-blur--ultra-light))",

        "&:hover": {
            backdropFilter: "blur(var(--size-blur--light))",
        },

        "&--left": {
            img: { transform: "rotate(180deg)" },
            left: "-1.5rem",
        },

        "&--right": {
            right: "-1.5rem",
        },
    },

    ".slick-disabled": {
        opacity: 0,
    },
});
