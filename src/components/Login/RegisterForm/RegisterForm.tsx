import { type SubmitHandler, useForm } from "react-hook-form";
import {
    Box, Button, FormControl,
    IconButton,
    Input,
    InputAdornment,
    OutlinedInput, Stack,
    TextField,
    Typography
} from "@mui/material";
import React from "react";
import { useFirebaseAuth } from "@/components/FireBase";
import { type IRegisterForm } from "@/components/Login/RegisterForm/types";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { StyledLoginButton } from "@/components/Login/AuthForm/styled";

interface FormProps {
    onAuthFormClick: () => void,
    onRegisterFormClick: () => void,
}

const RegisterForm = (props: FormProps) => {
    const { onAuthFormClick, onRegisterFormClick } = props;

    const [showPassword, setShowPassword] = React.useState(false);

    const { handleSubmit, register, reset, formState: { isValid } } = useForm<IRegisterForm>({ mode: "onChange" });

    const { createUser } = useFirebaseAuth();
    const handleClickShowPassword = () => {
        setShowPassword((show) => !show);
    };

    const onSubmit: SubmitHandler<IRegisterForm> = async (data) => {
        const { password, email } = data;
        await createUser(email, password);

        reset();
        onRegisterFormClick();
    };

    return (
        <FormControl variant={'standard'} onSubmit={handleSubmit(onSubmit)}>
            <Typography variant={'h4'} fontWeight={'700'} justifyContent={'center'} mt={7}>Регистрация</Typography>
            <Box mt={4}>
                <Stack gap={1}>
                    <TextField
                        error={!isValid}
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
                        variant={'standard'}
                        placeholder="Почта"
                        helperText={'Неверный вид почты'}
                    />
                    <Input
                        error={!isValid}
                        fullWidth
                        {...register("password", { required: "password is required" })}
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Пароль"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>}
                    />
                    <TextField
                        fullWidth
                        variant={'standard'}
                        label="Имя"
                        placeholder="Имя"
                    />
                    <TextField
                        fullWidth
                        variant={'standard'}
                        label="Фамиля"
                        placeholder="Фамиля"
                    />
                    <TextField
                        fullWidth
                        variant={'standard'}
                        label="Телефон"
                        placeholder="Телефон"
                    />
                </Stack>
            </Box>
            <StyledLoginButton type={'submit'} sx={{ mt: 3 }} fullWidth>
                <Typography color={'white'}>
                    Зарегистрироваться
                </Typography>
            </StyledLoginButton>
            <Stack mt={2} flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
                <Button variant={'outlined'} sx={{ border: 'none' }} onClick={onAuthFormClick}>
                    <Typography>Войти</Typography>
                </Button>
            </Stack>
            {/* <SwitchButton onClick={onAuthClick} isValid={isValid} formType={ButtonType.register}/> */}
        </FormControl>);
};

export default RegisterForm;
