import { type ButtonType } from "@/components/Login/enums";

export interface ISwitchButtonProps {
	onClick: () => void;
	isValid: boolean;
	formType: ButtonType;
}

export interface IButtonProps {
	buttonType: ButtonType;
}
