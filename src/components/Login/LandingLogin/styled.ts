import { Button, styled } from "@mui/material";
import { type IExtendedThemeProps } from "@/themes/types";

export const StyledLandingLogin = styled(Button)(({ theme }: IExtendedThemeProps) => ({
    width: "190px",
    height: "55px",
    backgroundColor: theme?.palette.text.primaryAbsolute,
    color: "white",
    fontSize: theme?.textSize.sizeText16,
    borderRadius: 10,
    fontFamily: "Inter",
}));
