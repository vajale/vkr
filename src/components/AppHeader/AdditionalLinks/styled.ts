import { styled } from "@mui/material";
import { IExtendedThemeProps } from "@/themes/types";

export const StyledAdditionalLinks = styled("nav")(({ theme }: IExtendedThemeProps) => ({
   ul: {
      padding: 0,
      display: "flex",
      listStyleType: "none",
      gap: theme?.spaceSize.spaceM,
   },
   a: {
      textDecoration: "none",
      "&:visited": {
         color: theme?.palette?.text?.primary,
      },
   },
}));
