import { Button, styled } from "@mui/material";
import { MotionBox } from "@/components/framer/Box";
import type { IExtendedThemeProps } from "@/themes/types";

export const StyledEditColorBox = styled(MotionBox)((theme: IExtendedThemeProps) => ({
    position: 'absolute',
    backgroundColor: theme.theme?.menuBackground.primary,
    borderRadius: '7px',
    zIndex: 999,
    padding: 7,
    maxHeight: 350,
    width: 170,
    overflowY: 'auto',
}));

export const StyledListButton = styled(Button)(() => ({
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
}));
