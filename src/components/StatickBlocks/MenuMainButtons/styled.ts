import { styled } from "@mui/material";
import { IExtendedThemeProps } from "../../../themes/types";

export const StyledMainButtons = styled("nav")(({ theme }: IExtendedThemeProps) => ({
    display: "flex",
    flexDirection: "row",
    gap: theme?.spaceSize.spaceXS,
}));
