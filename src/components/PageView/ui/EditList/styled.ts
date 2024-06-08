import { Box, Button, Stack, styled } from "@mui/material";
import { type IExtendedThemeProps } from "@/themes/types";
import { MotionBox } from "@/components/framer/Box";

export const StyledEditBox = styled(MotionBox)((theme: IExtendedThemeProps) => ({
   backgroundColor: theme.theme?.menuBackground.primary,
   borderRadius: '7px',
   zIndex: 100,
   position: 'absolute',
   padding: 7,
   overflowX: 'none',
   overflowY: 'auto',
}));

export const StyledList = styled(Stack)((theme: IExtendedThemeProps) => ({
   backgroundColor: theme.theme?.menuBackground.secondary,
   gap: 3
}));

export const StyledListButton = styled(Button)(() => ({
   border: "none",
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
}));
