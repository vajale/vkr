import React, { useEffect, useState } from "react";
import { useGetActiveUsersQuery } from "@/api/usersApi/usersFirebaseEndpoints";
import { Avatar, Skeleton, Stack, Typography } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/slices/userSlice";
import UserItem from "@/components/Users/UserItem";

const Users = () => {
    const location = useParams<{ id: string }>();
    const pageId = location.id ?? "";
    const user = useAppSelector(selectUser);

    // const browserLocation = useLocation();
    // const isPage = useMemo(() => matchPath(URL.PAGE, { path: browserLocation.pathname, end: false }), []);
    // console.log(isPage);

    // @ts-expect-error
    const { data, isLoading, isError } = useGetActiveUsersQuery({ pageId });

    if (data === undefined) {
        return null;
    }

    if (data === null) {
        return null;
    }

    if (data.length === 0) {
        return null;
    }

    if (isLoading) {
        return <Skeleton width={140} height={24}/>;
    }

    try {
        return (
            <Stack marginRight={3} gap={2} flexDirection={'row'}>
                {data?.map((item, key) => <UserItem key={key} user={item}/>)}
            </Stack>
        );
    } catch (e) {
        return null;
    }
};

export default Users;
