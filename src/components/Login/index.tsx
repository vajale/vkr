import React, { useState } from "react";
import { NotLoggedUser } from "./NotLoggedUser";
import { useFirebaseAuth } from "@/components/FireBase";
import AuthForm from "@/components/Login/AuthForm/AuthForm";
import RegisterForm from "@/components/Login/RegisterForm/RegisterForm";
import { Skeleton } from "@mui/material";
import ModalComponent from "components/Modal";
import { ButtonType } from "@/components/Login/enums";

const Login: React.FC<{ isLanding?: boolean }> = ({ isLanding }) => {
    const [loginState, setLoginState] = useState<{ isModalOpen: boolean; modalType: ButtonType }>(
        () => ({
            isModalOpen: false,
            modalType: ButtonType.login,
        }),
    );

    const {
        authState: [user, loading, error],
    } = useFirebaseAuth();

    const handleLoggedButtonClick = () => {
        setLoginState((prevState) => ({ isModalOpen: true, modalType: prevState.modalType }));
    };

    const handleRegisterClick = () => {
        setLoginState((prevState) => ({
            isModalOpen: prevState.isModalOpen,
            modalType: ButtonType.register,
        }));
    };

    const handleAuthClick = () => {
        setLoginState((prevState) => ({
            isModalOpen: prevState.isModalOpen,
            modalType: ButtonType.login,
        }));
    };

    const handleModelClose = () => {
        setLoginState((prevState) => ({ isModalOpen: false, modalType: ButtonType.login }));
    };

    if (loading) {
        return <Skeleton width={140} height={30} />;
    }

    return (
        <div>
            <NotLoggedUser onClick={handleLoggedButtonClick} isLanding={isLanding} />
            <ModalComponent onModalClose={handleModelClose} modalOpen={loginState.isModalOpen}>
                {loginState.isModalOpen &&
                    (loginState.modalType === ButtonType.login ? (
                        <AuthForm onAuth={handleModelClose} onRegisterClick={handleRegisterClick} />
                    ) : (
                        <RegisterForm
                            onRegisterFormClick={handleModelClose}
                            onAuthFormClick={handleAuthClick}
                        />
                    ))}
            </ModalComponent>
        </div>
    );
};

export default Login;
