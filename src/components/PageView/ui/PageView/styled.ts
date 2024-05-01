import { Stack, styled } from "@mui/material";
import { type IExtendedThemeProps } from "@/themes/types";

export const StyledPageView = styled(Stack)(({ theme }: IExtendedThemeProps) => ({
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-start",
	width: 1200,
	height: 600,
	".page-title": {
		// fontSize: theme?.textSize.sizeText24,
	},
	".page-view-paper": {
		// display: "flex",
		// flexDirection: "column",
		// alignItems: "center",
	}
}));
