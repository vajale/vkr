import { type SubmitHandler, useForm } from "react-hook-form";
import { type IAuthForm } from "./types";
import {
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
} from "@mui/material";
import React from "react";
import { useFirebaseAuth } from "@/components/FireBase";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { StyledInputsWrapper } from "@/components/Login/styled";
import { Typography } from "@/components/common/CustomTypography";
import SwitchButton from "@/components/Login/SwitchButton";
import { ButtonType } from "@/components/Login/enums";

interface AuthProps {
    onRegisterClick: () => void
    onAuth: () => void
}

const AuthForm = (props: AuthProps) => {
    const { onRegisterClick, onAuth } = props;
    const { handleSubmit, register, reset, formState: { isValid } } = useForm<IAuthForm>({ mode: "onChange" });
    const { signInUser } = useFirebaseAuth();

    const onSubmit: SubmitHandler<IAuthForm> = async (data) => {
        const { password, email } = data;
        await signInUser(email, password);

        reset();
        onAuth();
    };

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => { setShowPassword((show) => !show); };

    return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography className={"login-title"}>Авторизация</Typography>
                <StyledInputsWrapper>
                    <InputLabel htmlFor="outlined-adornment-password">EMAIL</InputLabel>
                    <TextField
                        className={"input"}
                        {...register("email", {
                            required: "email is required",
                            minLength: {
                                value: 5,
                                message: "Минимум 5 букв"
                            }
                        })}
                        required
                        id="outlined-required"
                        fullWidth
                        placeholder="Почта"
                    />
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        className={"input"}
                        fullWidth
                        {...register("password", { required: "password is required" })}
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </StyledInputsWrapper>
                <SwitchButton onClick={onRegisterClick} isValid={isValid} formType={ButtonType.login}/>
            </form>);
};

export default AuthForm;
