import React from "react";
import { LandingLayout } from "@/components/layouts/landing";
import ModalComponent from "@/components/Modal";

export const InvitePage = () => {
    const onClose = () => {
        console.log("onClose");
    };

    return (
        <LandingLayout disableAlarm={true}>
            <ModalComponent onModalClose={onClose} modalOpen={true}>
                <p>huilo </p>
            </ModalComponent>
        </LandingLayout>
    );
};
