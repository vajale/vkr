import React, { useMemo } from "react";
import { StyledPermissionSelect } from "@/components/StatickBlocks/Members/PermissionSelect/styled";
import { MenuItem } from "@mui/material";
import { useAppDispatch } from "@/store/hooks";
import { type IPermissionSelect } from "@/components/StatickBlocks/Members/PermissionSelect/types";

export enum UserPermission {
    MODERATOR = "moderator",
    READER = "reader",
}

const MemberPermissionTitles = {
    [UserPermission.MODERATOR]: "Полный доступ",
    [UserPermission.READER]: "Только для чтения",
};

export const PermissionSelect: React.FC<IPermissionSelect> = ({ userId, userPermission }) => {
    const value = useMemo(() => userPermission, [userPermission]);
    const dispatch = useAppDispatch();

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value);
        console.log(userId);
    };

    return (
        <StyledPermissionSelect value={value} onChange={handleChange}>
            <MenuItem value={UserPermission.MODERATOR}>
                {MemberPermissionTitles[UserPermission.MODERATOR]}
            </MenuItem>
            <MenuItem value={UserPermission.READER}>
                {MemberPermissionTitles[UserPermission.READER]}
            </MenuItem>
        </StyledPermissionSelect>
    );
};
