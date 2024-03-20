import { Button, styled } from "@mui/material";
import { IExtendedThemeProps } from "../../../themes/types";

export const StyledButtonWithIcon = styled(Button)(({ theme }: IExtendedThemeProps) => ({
   display: "flex",
   flexDirection: "row",
   gap: theme?.spaceSize.spaceXS,
}));
