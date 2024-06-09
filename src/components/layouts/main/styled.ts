import { styled } from "@mui/material";
import { type IExtendedThemeProps } from "@/themes/types";

const StyledMainLayout = styled("div")(({ theme }: IExtendedThemeProps) => ({
    backgroundColor: theme?.menuBackground.primary,
    display: "flex",
    flexDirection: "row",
    width: "100vw",
    height: "70vh",
    minHeight: "100vh",
    maxWidth: "100%",
    overflowY: 'hidden',
    overflowX: 'hidden',
    "&:hover": {},

    ".side-menu": {
        width: "100%",
        display: "flex",
        flexDirection: "column",
    }
}));

const StyledContentWrapper = styled("div")(({ theme }: IExtendedThemeProps) => ({
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: 300,
    position: "sticky",
    paddingLeft: 28,
    ".main-button": {
        cursor: "pointer",
    },
    backgroundColor: theme?.menuBackground.secondary
}));

export { StyledMainLayout, StyledContentWrapper };
