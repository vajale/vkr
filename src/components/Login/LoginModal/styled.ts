import { Box, styled } from "@mui/material";
import type { IExtendedThemeProps } from "@/themes/types";

export const StyledLoginWrapper = styled(Box)(({ theme }: IExtendedThemeProps) => {
	return {
		width: "600px",
		height: "350px",
		minWidth: "400px",
		minHeight: "280px",
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		backgroundColor: theme?.menuBackground.secondary,
		border: '2px solid #000',
		borderRadius: "20px",

		form: {
			display: 'flex',
			flexDirection: "column",
			alignItems: "center",

			label: {
				color: theme?.palette?.primary?.main,
			},

			fieldset: {
				borderColor: theme?.palette?.borderColors.primary,
			},

			".login-title": {
				fontSize: 20,
				margin: '20px 0',
			},

		}
	};
});
