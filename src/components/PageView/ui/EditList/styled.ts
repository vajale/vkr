import { Box, Stack, styled } from "@mui/material";
import { type IExtendedThemeProps } from "@/themes/types";

export const StyledBox = styled(Box)((theme: IExtendedThemeProps) => ({
   backgroundColor: theme.theme?.menuBackground.secondary,
}));

export const StyledList = styled(Stack)((theme: IExtendedThemeProps) => ({
   backgroundColor: theme.theme?.menuBackground.secondary,
}));

export const StyledListButton = styled("button")(() => ({
   border: "none",
   padding: 7,
   hover: "opacity: 0.6",
}));
