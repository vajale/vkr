import { Stack, styled } from "@mui/material";

export const StyledInputsWrapper = styled(Stack)({
	'& > *:nth-child(even)': {
		marginBottom: '20px', // Задайте нужный вам отступ
	},
});
