import React, { useEffect, useMemo } from "react";
import {
    useGetActiveUsersSubscribeQuery,
    useLazyGetActiveUsersQuery,
    useLazyGetActiveUsersSubscribeQuery
} from "@/api/usersApi/usersService";
import { Avatar, Skeleton, Stack, Typography } from "@mui/material";
import { matchPath, useLocation, useParams } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/slices/userSlice";
import { URL } from "@/constants/navigation";

const Users = () => {
    const location = useParams<{ id: string }>();
    const pageId = location.id ?? "";
    const browserLocation = useLocation();

    const user = useAppSelector(selectUser);
    // const isPage = useMemo(() => matchPath(URL.PAGE, { path: browserLocation.pathname, end: false }), []);
    // console.log(isPage);

    const [getUsers, { data, isLoading, isError }] = useLazyGetActiveUsersSubscribeQuery();

    useEffect(() => {
        if (user != null) {
            getUsers({ pageId });
        }
    }, [pageId, user]);

    if (isLoading) {
        return <Skeleton width={140} height={24}/>;
    }

    if (isError && user != undefined) {
        const username = user?.username ? user?.username[0] : '';

        return <Stack marginRight={3} gap={2} flexDirection={'row'}>
            <Avatar sx={{ width: 24, height: 24 }}>
                <Typography>
                {username}
            </Typography>
            </Avatar>
        </Stack>;
    }

    if (data === undefined) {
        return null;
    }

    console.log(data);

    return (
        <Stack marginRight={3} gap={2} flexDirection={'row'}>
              {/* {data?.map(item => { */}
              {/*  const username = item?.username ? item?.username[0] : ''; */}

              {/*  return (<Avatar sx={{ width: 24, height: 24 }} key={item.id}> */}
              {/*      <Typography> */}
              {/*          {username} */}
              {/*      </Typography> */}
              {/*  </Avatar>); */}
              {/* })} */}
        </Stack>
    );
};

export default Users;
