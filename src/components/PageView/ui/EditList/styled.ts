import { Box, Stack, styled } from "@mui/material";
import { type IExtendedThemeProps } from "@/themes/types";

export const StyledBox = styled(Box)((theme: IExtendedThemeProps) => ({
   backgroundColor: theme.theme?.menuBackground.secondary,
   padding: '14px',
   borderRadius: '7px',
   zIndex: 999
}));

export const StyledList = styled(Stack)((theme: IExtendedThemeProps) => ({
   backgroundColor: theme.theme?.menuBackground.secondary,
   gap: 3
}));

export const StyledListButton = styled("button")(() => ({
   border: "none",
   padding: 7,
   hover: "opacity: 0.6",
}));
