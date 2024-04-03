import React from "react";

import { Modal } from "@mui/material";

import { StyledLoginWrapper } from "@/components/Login/LoginModal/styled";

interface ModalProps {
	onModalClose: () => void
	modalOpen: boolean,
	children: React.ReactNode,
}

const LoginModal = (props: ModalProps) => {
	const { onModalClose, modalOpen, children } = props;
	return (
		<Modal open={modalOpen} onClose={onModalClose} >
			<StyledLoginWrapper className="auth-form">
				{children}
			</StyledLoginWrapper>
		</Modal>
	);
};

export default LoginModal;
