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

    "&:hover": {}
}));

const StyledContentWrapper = styled("div")(({ theme }: IExtendedThemeProps) => ({
    backgroundColor: theme?.menuBackground.secondary,
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "flex-start",
}));

export { StyledMainLayout, StyledContentWrapper };
