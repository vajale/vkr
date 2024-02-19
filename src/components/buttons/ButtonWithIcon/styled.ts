import { styled } from "@mui/material";
import { IExtendedThemeProps } from "../../../themes/types";

export const StyledButtonWithIcon = styled("div")(({ theme }: IExtendedThemeProps) => ({
   display: "flex",
   flexDirection: "row",
   gap: theme?.spaceSize.spaceXS,
}));
