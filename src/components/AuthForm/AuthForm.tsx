import {type SubmitHandler, useForm} from "react-hook-form";
import {type IAuthForm} from "./types";
import {
    Button,
    FormControl, IconButton,
    Input, InputAdornment,
    InputLabel,
    OutlinedInput,
    Paper,
    Portal, Stack,
    TextField,
    Typography
} from "@mui/material";
import React, {useState} from "react";
import {useFirebaseAuth} from "@/components/FireBase";
import {Visibility, VisibilityOff} from "@material-ui/icons";

interface AuthProps {
    onRegisterClick: () => void
    onAuth: () => void
}

const AuthForm = (props: AuthProps) => {
    const {onRegisterClick, onAuth} = props

    const {handleSubmit, register, reset, formState: {isValid}} = useForm<IAuthForm>({mode: "onChange"});
    const {signInUser} = useFirebaseAuth();

    const onSubmit: SubmitHandler<IAuthForm> = async (data) => {
        const {password, email} = data
        await signInUser(email, password)

        reset()
        onAuth()
    };

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <Paper color={"whitesmoke"} style={{position: 'absolute', padding: 14, borderRadius: 7}}>
            {/*{errors?.email && <Typography color={"red"}>{errors?.email}</Typography>}*/}
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography variant={"h4"}>Авторизация</Typography>
                <InputLabel htmlFor="outlined-adornment-password">EMAIL</InputLabel>
                <TextField
                    {...register("email", {
                        required: "email is required", minLength: {
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
                    {...register("password", {required: "password is required"})}
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
                <Stack sx={{mt: 7, display: 'flex', alignItems: "flexEnd", flexDirection: 'row'}}>
                    <Button size={'small'} fullWidth onClick={() => {
                        onRegisterClick()
                    }} type="button">Регистрация</Button>
                    <Button fullWidth disabled={!isValid} variant={'outlined'} type="submit">Войти</Button>
                </Stack>
            </form>
        </Paper>
    );
};

export default AuthForm;
