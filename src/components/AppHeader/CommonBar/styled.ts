import { styled } from "@mui/material";
import { type IExtendedThemeProps } from "@/themes/types";

export const StyledCommonBar = styled("div")(({ theme }: IExtendedThemeProps) => ({
   display: "flex",
   flexDirection: "column",
   height: "10%",
   padding: "20px 20px",
   maxHeight: "100%",
   maxWidth: "100%",
   justifyContent: "space-between ",
   backgroundColor: theme?.menuBackground.primary,
}));
