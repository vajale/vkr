import React from "react";
import { useGetActiveUsersQuery } from "@/features/usersService/usersService";
import { Avatar, Box, Button, Stack } from "@mui/material";
import { MaterialIcon } from "@/assets/Icon";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/slices/userSlice";

const Users = () => {
    const { data, isLoading, isError } = useGetActiveUsersQuery(321);
    const user = useAppSelector(selectUser);

    if (isError && isLoading) {
        return <div></div>;
    }

    if (data == null) {
        return null;
    }

    return (
        <Stack gap={2} flexDirection={'row'}>
            <Button>
                {data.map(item => <Avatar sx={{ width: 24, height: 24, mr: 1 }} key={item.id}/>)}
            </Button>
        </Stack>
    );
};

export default Users;
