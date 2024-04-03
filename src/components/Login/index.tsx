import React, {useMemo, useState} from "react";
import {NotLoggedUser} from "./NotLoggedUser";
import {useFirebaseAuth} from "@/components/FireBase";
import AuthForm from "@/components/AuthForm/AuthForm";
import RegisterForm from "@/components/RegisterForm/RegisterForm";
import {Skeleton} from "@mui/material";

const Login: React.FC = () => {

    const [loginState, setLoginState] = useState(() => ({
        isModalOpen: false,
        modalType: "auth"
    }))

    const {authState: [user, loading, error]} = useFirebaseAuth()

    const handleLoggedButtonClick = () => {
        setLoginState(prevState => ({isModalOpen: true, modalType: prevState.modalType}))
    };

    const handleRegisterClick = () => {
        setLoginState(prevState => ({isModalOpen: prevState.isModalOpen, modalType: 'register'}))
    };

    const handleAuthClick = () => {
        setLoginState(prevState => ({isModalOpen: prevState.isModalOpen, modalType: 'auth'}))
    };

    const handleModelClose = () => {
        setLoginState(prevState => ({isModalOpen: false, modalType: 'auth'}))
    }

    if(loading) {
        return <Skeleton width={140} height={30}/>
    }

    return (
        <div>
            <NotLoggedUser onClick={handleLoggedButtonClick}/>
            {loginState.isModalOpen && (loginState.modalType == 'auth' ?
                <AuthForm onAuth={handleModelClose} onRegisterClick={handleRegisterClick}/> : <RegisterForm onRegister={handleModelClose} onAuthClick={handleAuthClick}/>)}
        </div>
    );
};

export default Login;
