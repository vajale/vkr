import { Avatar, Typography } from "@mui/material";
import React from "react";
import { useGetUserByIdQuery } from "@/api/usersApi/usersService";

interface ItemProps {
    userId: string;
}

const UserItem = (props: ItemProps) => {
    const { userId } = props;

    const { data, isLoading } = useGetUserByIdQuery({ userId });

    if (data === undefined) {
        return null;
    }

    const username = data?.username ? data?.username[0] : "";

    return (
        <Avatar sx={{ width: 24, height: 24 }}>
            <Typography>{username}</Typography>
        </Avatar>
    );
};
