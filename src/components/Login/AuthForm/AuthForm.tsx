import { type SubmitHandler, useForm } from "react-hook-form";
import { type IAuthForm } from "./types";
import {
    Button,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import React from "react";
import { useFirebaseAuth } from "@/components/FireBase";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { StyledAuthPaper, StyledLoginButton } from "@/components/Login/AuthForm/styled";

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
        onAuth();
        reset();
    };

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => {
        setShowPassword((show) => !show);
    };

    return (
        <StyledAuthPaper>
            <form style={{ marginTop: 10 }} onSubmit={handleSubmit(onSubmit)}>
                <Stack onSubmit={handleSubmit(onSubmit)} gap={1}>
                    <Typography variant={'h4'}
                                fontWeight={'700'}
                                justifyContent={'center'}
                                className={"login-title"} mb={7}>Вход в аккаунт</Typography>
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
                               variant={'standard'}
                               id="outlined-required"
                               fullWidth
                               placeholder="Почта"
                    />
                    <Input
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
                    <StyledLoginButton type={'submit'} sx={{ mt: 7 }} fullWidth>
                        <Typography>
                            Войти
                        </Typography>
                    </StyledLoginButton>
                    <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
                        <Button variant={'outlined'} sx={{ border: 'none' }} sx={{ mt: 7 }} onClick={onRegisterClick}>
                            <Typography>Зарегистрироваться</Typography>
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </StyledAuthPaper>
    );
};

export default AuthForm;
