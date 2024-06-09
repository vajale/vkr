import { Avatar, Typography } from "@mui/material";
import React from "react";
import { useGetUserByIdQuery } from "@/api/usersApi/usersFirebaseEndpoints";
import { type UserFirebase } from "@/store/slices/userSlice/types";
import { stringAvatar } from "@/utils/helper/helpers";

interface ItemProps {
    userId?: string;
    user: UserFirebase
}

const UserItem = (props: ItemProps) => {
    const { userId, user } = props;

    const username = user.data.username ?? '';

    if (username == undefined) return null;
    if (username == undefined) return null;
    if (username == '') return null;

    return (
        <Avatar {...stringAvatar(username)} sx={{ width: 24, height: 24 }}>
            <Typography>{username[0]}</Typography>
        </Avatar>
    );
};

export default UserItem;
