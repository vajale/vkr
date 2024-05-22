import { Button, Stack, styled } from "@mui/material";
import type { IExtendedThemeProps } from "@/themes/types";

export const StyledEditorButtonsContainer = styled(Stack)(({ theme }: IExtendedThemeProps) => ({
    position: 'absolute',
    padding: 7,
    borderRadius: 7,
    top: -50,
    backgroundColor: theme?.menuBackground.primary
}));

export const StyledEditorButton = styled(Button)(({ theme }: IExtendedThemeProps) => ({
}));
