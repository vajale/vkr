import {styled} from "@mui/material";
import {IExtendedThemeProps} from "@/themes/types";

export const StyledCommonBar = styled("div")(({theme}: IExtendedThemeProps) => ({
    display: "flex",
    flexDirection: "column",
    height: "6%",
    padding: "20px 20px",
    maxHeight: "100%",
    maxWidth: "100%",
    justifyContent: "space-between ",
    backgroundColor: theme?.menuBackground,
}));
