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
import { useCreateUserMutation } from "@/api/usersApi/usersFirebaseService";

interface FormProps {
    onAuthFormClick: () => void,
    onRegisterFormClick: () => void,
}

const RegisterForm = (props: FormProps) => {
    const { onAuthFormClick, onRegisterFormClick } = props;

    const [showPassword, setShowPassword] = React.useState(false);

    const { handleSubmit, register, reset, formState: { errors, isValid } } = useForm<IRegisterForm>({ mode: "onChange" });
    const { createUser } = useFirebaseAuth();

    const handleClickShowPassword = () => {
        setShowPassword((show) => !show);
    };

    const onSubmit: SubmitHandler<IRegisterForm> = async (data) => {
        const { password, email } = data;

        await createUser(email, password, data).then(() => {
            reset();
            onRegisterFormClick();
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant={'h4'} fontWeight={'700'} justifyContent={'center'} mt={7}>Регистрация</Typography>
            <Box mt={4}>
                <Stack gap={1}>
                    <TextField
                        error={!!errors.email}
                        {...register("email", {
                            required: "Email is required",
                            minLength: {
                                value: 5,
                                message: "Минимум 5 букв"
                            }
                        })}
                        required
                        fullWidth
                        variant={'standard'}
                        placeholder="Почта"
                        helperText={errors.email?.message}
                    />
                    <Input
                        error={!!errors.password}
                        fullWidth
                        {...register("password", { required: "Password is required" })}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Пароль"
                        size={'small'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                >
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>}
                        helperText={errors.password?.message}
                    />
                    <TextField
                        {...register("firstName", { required: "First name is required" })}
                        fullWidth
                        variant={'standard'}
                        label="Имя"
                        placeholder="Имя"
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                    />
                    <TextField
                        {...register("lastname", { required: "Last name is required" })}
                        fullWidth
                        variant={'standard'}
                        label="Фамиля"
                        placeholder="Фамиля"
                        error={!!errors.lastname}
                        helperText={errors.lastname?.message}
                    />
                    <TextField
                        {...register("phone", { required: "Phone is required" })}
                        fullWidth
                        variant={'standard'}
                        label="Телефон"
                        placeholder="Телефон"
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                    />
                </Stack>
            </Box>
            <StyledLoginButton type={'submit'} sx={{ mt: 3 }} fullWidth>
                <Typography>Зарегистрироваться</Typography>
            </StyledLoginButton>
            <Stack mt={2} flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
                <Button variant={'outlined'} sx={{ border: 'none' }} onClick={onAuthFormClick}>
                    <Typography>Войти</Typography>
                </Button>
            </Stack>
        </form>
    );
};

export default RegisterForm;
