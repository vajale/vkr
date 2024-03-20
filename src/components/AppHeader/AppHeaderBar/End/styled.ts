import { styled } from "@mui/material";
import { IExtendedThemeProps } from "@/themes/types";

export const StyledHeaderEnd = styled("div")(({ theme }: IExtendedThemeProps) => ({
   display: "flex",
   flexDirection: "row",
   alignItems: "center",
   gap: theme?.spaceSize.space3XL,
}));
