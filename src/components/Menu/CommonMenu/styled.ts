import { styled } from "@mui/material";
import { IExtendedThemeProps } from "../../../themes/types";

export const StyledCommonMenu = styled("div")(({ theme }: IExtendedThemeProps) => ({
    display: "flex",
    flexDirection: "column",
    gap: theme?.spaceSize.space3XL,
    height: "100%",
    width: "20%",
    padding: "20px 30px",
    backgroundColor: theme?.menuBackground,
}));
