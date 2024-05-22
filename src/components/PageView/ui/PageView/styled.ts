import { Button, Stack, styled } from "@mui/material";
import { type IExtendedThemeProps } from "@/themes/types";

export const StyledPageView = styled(Stack)(({ theme }: IExtendedThemeProps) => ({
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-start",
	borderRadius: "14px 14px 0 0",
	backgroundColor: 'white',
	overflowY: 'auto',
	overflowX: 'hidden',
	maxHeight: 700,
	minHeight: 700,
	maxWidth: 1270,
	// ".page-title": {
	// 	// fontSize: theme?.textSize.sizeText24,
	// },
	// ".page-view-paper": {
	// 	// width: 1200,
	// 	// height: 800,
	// 	// borderRadius: 3,
	// 	// marginLeft: 77
	// 	// display: "flex",
	// 	// flexDirection: "column",
	// 	// alignItems: "center",
	// }
}));

export const StyledPageWrapper = styled(Stack)(({ theme }: IExtendedThemeProps) => ({
	display: "flex",
	margin: '0px 15px'
}));

export const StyledButtonsContainer = styled(Stack)(({ theme }: IExtendedThemeProps) => ({
}));

export const StyledButton = styled(Button)(({ theme }: IExtendedThemeProps) => ({
	minWidth: 14,
	borderRadius: 4,
}));
