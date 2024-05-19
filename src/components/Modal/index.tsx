import React from "react";

import { Modal } from "@mui/material";

import { StyledLoginWrapper } from "@/components/Modal/styled";

interface ModalProps {
    onModalClose: () => void;
    modalOpen: boolean;
    children: React.ReactNode;
    width?: string;
    height?: string;
    minHeight?: string;
}

const ModalComponent = (props: ModalProps) => {
    const { onModalClose, modalOpen, children } = props;
    return (
        <Modal open={modalOpen} onClose={onModalClose}>
            <StyledLoginWrapper
                width={props.width}
                height={props.height}
                minHeight={props.minHeight}>
                {children}
            </StyledLoginWrapper>
        </Modal>
    );
};

export default ModalComponent;
