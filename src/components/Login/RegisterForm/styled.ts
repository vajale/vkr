import { Box, Paper, styled } from "@mui/material";
import type { IExtendedThemeProps } from "@/themes/types";

export const GridItem = styled(Paper)(({ theme }: IExtendedThemeProps) => ({
    textAlign: 'center',
}));
export const StyledRegisterBox = styled(Box)(({ theme }: IExtendedThemeProps) => ({
    width: 400,
    height: "100%",
}));
