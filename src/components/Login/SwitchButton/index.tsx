import { Button } from "@mui/material";
import React from "react";

import { type IButtonProps, type ISwitchButtonProps } from "./types";
import { StyledSwitchButton } from "@/components/Login/SwitchButton/styled";
import { ButtonType } from "../enums";

const Titles = {
	[ButtonType.login]: "Войти",
	[ButtonType.register]: "Зарегестрироваться"
};

const UnActiveTitles = {
	[ButtonType.login]: "Авторизация",
	[ButtonType.register]: "Регистрация"
};

const SwitchButton: React.FC<ISwitchButtonProps> = ({ onClick, isValid, formType }) => {
	const getButton = ({ buttonType }: IButtonProps) => {
		const title = Titles[buttonType];
		const unActiveTitle = UnActiveTitles[buttonType];
		const isSelected = formType === buttonType;

		if (isSelected) {
			return <Button disabled={!isValid} onClick={onClick} type={"submit"}>{title}</Button>;
		}

		return <Button onClick={onClick} type={"button"}>{unActiveTitle}</Button>;
	};

	return (
		<StyledSwitchButton isAuthorization={formType === ButtonType.login}>
			{getButton({ buttonType: ButtonType.register })}
			<div className={"divider"}></div>
			{getButton({ buttonType: ButtonType.login })}
		</StyledSwitchButton>
	);
};

export default SwitchButton;
