import React, { useEffect, useState } from "react";
import {
    useLazyGetActiveUsersSubscribeQuery
} from "@/api/usersApi/usersFirebaseService";
import { Avatar, Skeleton, Stack, Typography } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/slices/userSlice";
import UserItem from "@/components/Users/UserItem";

const Users = () => {
    const location = useParams<{ id: string }>();
    const pageId = location.id ?? "";
    const [users, setUsers] = useState<[]>([]);
    const user = useAppSelector(selectUser);

    // const browserLocation = useLocation();
    // const isPage = useMemo(() => matchPath(URL.PAGE, { path: browserLocation.pathname, end: false }), []);
    // console.log(isPage);

    const [getUsers, { data, isLoading, isError }] = useLazyGetActiveUsersSubscribeQuery();

    useEffect(() => {
        if (user != null) {
            void getUsers({ pageId });
        }

        if (data) {
            setUsers(data);
        }
    }, [pageId, user]);

    if (isLoading) {
        return <Skeleton width={140} height={24}/>;
    }

    if (users.length === 0) {
        return null;
    }

    console.log(users);

    return (
        <Stack marginRight={3} gap={2} flexDirection={'row'}>
             {/* {users?.map(item => <UserItem key={item} userId={item}/>)} */}
        </Stack>
    );
};

export default Users;
