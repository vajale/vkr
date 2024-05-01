import { Stack, styled } from "@mui/material";
import { type IExtendedThemeProps } from "@/themes/types";

interface IProps extends IExtendedThemeProps {
	isAuthorization: boolean
}

export const StyledSwitchButton = styled(Stack)(({ theme, isAuthorization }: IProps) => {
	return ({
		border: "solid 1px",
		borderRadius: "5px",
		display: "flex",
		flexDirection: isAuthorization ? "row" : "row-reverse",
		width: "fit-content",
		button: {
			width: "fit-content",
			color: theme?.palette.text.primary,
		},

		".divider": {
			backgroundColor: "black",
			width: "1px",
		},
		menuBackground: 'whitesmoke'
	});
});
