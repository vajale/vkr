import { type SubmitHandler, useForm } from "react-hook-form";
import { type IAuthForm } from "./types";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { Button, FormControl, InputLabel, Paper, Typography } from "@mui/material";
import React from "react";

const AuthForm = () => {
    const { handleSubmit, register, reset } = useForm<IAuthForm>({
        mode: "onChange",
    });

    const { mutate } = useMutation({
        mutationKey: ["auth"],
        mutationFn: (data: IAuthForm) => {},
        onSuccess() {
            toast.success("nigga u gay");
            reset();
        },
    });

    const onSubmit: SubmitHandler<IAuthForm> = (data) => {
        mutate(data);
    };

    return (
        <Paper color={"black"}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography variant={"h1"}>Авторизация</Typography>
                <InputLabel
                    id={"email"}
                    aria-label={"email"}
                    aria-placeholder={"enter email...."}
                    {...register("email", { required: "email is required" })}
                />
                <InputLabel
                    id={"password"}
                    aria-label={"password"}
                    aria-placeholder={"enter password...."}
                    {...register("password", { required: "password is required" })}
                />
                <div>
                    <Button>Auth</Button>
                    <Button>register</Button>
                </div>
            </form>
        </Paper>
    );
};

export default AuthForm;
