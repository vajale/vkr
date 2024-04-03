import { type SubmitHandler, useForm } from "react-hook-form";
import {
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography
} from "@mui/material";
import React from "react";
import { useFirebaseAuth } from "@/components/FireBase";
import { type IRegisterForm } from "@/components/Login/RegisterForm/types";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { ButtonType } from "@/components/Login/enums";
import SwitchButton from "@/components/Login/SwitchButton";
import { StyledInputsWrapper } from "@/components/Login/styled";
interface FormProps {
    onAuthClick: () => void,
    onRegister: () => void,
}

const RegisterForm = (props: FormProps) => {
    const { onAuthClick, onRegister } = props;

    const [showPassword, setShowPassword] = React.useState(false);

    const { handleSubmit, register, reset, formState: { isValid } } = useForm<IRegisterForm>({ mode: "onChange" });

    const { createUser } = useFirebaseAuth();
    const handleClickShowPassword = () => { setShowPassword((show) => !show); };

    const onSubmit: SubmitHandler<IRegisterForm> = async (data) => {
        const { password, email } = data;
        await createUser(email, password);

        reset();
        onRegister();
    };

    return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography className={"login-title"}>Регистрация</Typography>
                <StyledInputsWrapper>
                    <InputLabel htmlFor="outlined-adornment-password">EMAIL</InputLabel>
                    <TextField
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
                        label="Password"
                    />
                </StyledInputsWrapper>
                <SwitchButton onClick={onAuthClick} isValid={isValid} formType={ButtonType.register}/>
            </form>);
};

export default RegisterForm;
