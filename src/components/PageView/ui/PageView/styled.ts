import { Button, Stack, styled } from "@mui/material";
import { type IExtendedThemeProps } from "@/themes/types";

export const StyledPageView = styled(Stack)(({ theme }: IExtendedThemeProps) => ({
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-start",
	borderRadius: "14px 14px 0 0",
	backgroundColor: theme?.menuBackground.third,
	overflowY: 'auto',
	overflowX: 'hidden',
	maxHeight: '700px',
	minHeight: 700,
	width: '100%',
}));

export const StyledPageWrapper = styled(Stack)(({ theme }: IExtendedThemeProps) => ({
	display: "flex",
	margin: '0px 15px'
}));

export const StyledButtonsContainer = styled(Stack)(({ theme }: IExtendedThemeProps) => ({
	display: "flex",
	alignItems: 'center',
	flexDirection: 'row'
}));

export const StyledButton = styled(Button)(({ theme }: IExtendedThemeProps) => ({
	minWidth: 14,
	borderRadius: 4,
}));
