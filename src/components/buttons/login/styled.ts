import { styled } from "@mui/material";
import { type IExtendedThemeProps } from "@/themes/types";

export const StyledLoginButton = styled("button")(({ theme }: IExtendedThemeProps) => ({
    width: "190px",
    height: "55px",
    backgroundColor: theme?.palette.text.primaryAbsolute,
    color: "white",
    fontSize: theme?.textSize.sizeText24,
    borderRadius: 10,
}));
