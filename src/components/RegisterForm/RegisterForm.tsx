import {type SubmitHandler, useForm} from "react-hook-form";
import {
    Button,
    FormControl, IconButton,
    Input,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Paper, Stack,
    TextField,
    Typography
} from "@mui/material";
import React, {useState} from "react";
import {useFirebaseAuth} from "@/components/FireBase";
import {IRegisterForm} from "@/components/RegisterForm/types";
import {Visibility, VisibilityOff} from "@material-ui/icons";

interface FormProps {
    onAuthClick: () => void,
    onRegister: () => void
}

const RegisterForm = (props: FormProps) => {
    const {onAuthClick, onRegister} = props

    const [showPassword, setShowPassword] = React.useState(false);

    const {handleSubmit, register, reset, formState: {isValid}} = useForm<IRegisterForm>({mode: "onChange"});

    const {createUser} = useFirebaseAuth();
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const onSubmit: SubmitHandler<IRegisterForm> = async (data) => {
        const {password, email} = data
        await createUser(email, password)

        reset()
        onRegister()
    };

    return (
        <Paper color={"whitesmoke"} style={{position: 'absolute', padding: 14, borderRadius: 7}}>
            {/*{errors?.email && <Typography color={"red"}>{errors?.email}</Typography>}*/}
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography variant={"h4"}>Регистрация</Typography>
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
                        onAuthClick()
                    }} type="button">Войти</Button>
                    <Button fullWidth disabled={!isValid} variant={'outlined'} type="submit">Регистрация</Button>
                </Stack>
            </form>
        </Paper>
    );
};

export default RegisterForm;
