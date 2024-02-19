import { styled } from "@mui/material";
import { IExtendedThemeProps } from "../../../themes/types";

export const StyledMainButtons = styled("div")(({ theme }: IExtendedThemeProps) => ({
   display: "flex",
   flexDirection: "column",
   gap: theme?.spaceSize.spaceXS,
}));
