import React from "react";

import { Modal } from "@mui/material";

import { StyledLoginWrapper } from "@/components/Modal/styled";

interface ModalProps {
    onModalClose: () => void;
    modalOpen: boolean;
    children: React.ReactNode;
}

const ModalComponent = (props: ModalProps) => {
    const { onModalClose, modalOpen, children } = props;
    return (
        <Modal open={modalOpen} onClose={onModalClose}>
            <StyledLoginWrapper>{children}</StyledLoginWrapper>
        </Modal>
    );
};

export default ModalComponent;
