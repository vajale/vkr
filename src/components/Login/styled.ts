import { Stack, styled } from "@mui/material";

export const StyledInputsWrapper = styled(Stack)({
	width: "80%",
	'& > *:nth-child(even)': {
		marginBottom: '20px', // Задайте нужный вам отступ
	},
});
