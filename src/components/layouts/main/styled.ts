import { styled } from "@mui/material";
import { type IExtendedThemeProps } from "@/themes/types";

const StyledMainLayout = styled("div")(() => ({
    display: "flex",
    flexDirection: "column",
    width: "100vw",
    height: "100vh",
    minHeight: "100vh",
    maxWidth: "100%",

    "&:hover": {}
}));

const StyledContentWrapper = styled("div")(({ theme }: IExtendedThemeProps) => ({
    height: "100%",
    backgroundColor: theme?.menuBackground.third,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
}));

export { StyledMainLayout, StyledContentWrapper };
