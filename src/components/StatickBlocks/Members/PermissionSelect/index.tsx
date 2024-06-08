import React, { useMemo, useState } from "react";
import { StyledPermissionSelect } from "@/components/StatickBlocks/Members/PermissionSelect/styled";
import { MenuItem } from "@mui/material";
import { useAppDispatch } from "@/store/hooks";
import { type IPermissionSelect } from "@/components/StatickBlocks/Members/PermissionSelect/types";
import { useUpdateUserPermissionMutation } from "@/api/firebasePageAPI/pagesEndpoins";

export enum UserPermission {
    MODERATOR = "moderator",
    READER = "reader",
    CREATOR = "creator",
}

const MemberPermissionTitles = {
    [UserPermission.MODERATOR]: "Полный доступ",
    [UserPermission.READER]: "Только для чтения",
    [UserPermission.CREATOR]: "Создатель",
};

export const PermissionSelect: React.FC<IPermissionSelect> = ({ userId, userPermission, pageId }) => {
    const [value, setValue] = useState(() => userPermission);

    const [updatePermission] = useUpdateUserPermissionMutation();

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const permission = (event.target.value as UserPermission);

        void updatePermission({ pageId, userId, newPermission: permission });
        setValue(permission);
    };

    return (
        <StyledPermissionSelect disabled={userPermission === UserPermission.CREATOR} value={value} onChange={handleChange}>
            <MenuItem value={UserPermission.MODERATOR}>
                {MemberPermissionTitles[UserPermission.MODERATOR]}
            </MenuItem>
            <MenuItem value={UserPermission.READER}>
                {MemberPermissionTitles[UserPermission.READER]}
            </MenuItem>
            <MenuItem disabled value={UserPermission.CREATOR}>
                {MemberPermissionTitles[UserPermission.CREATOR]}
            </MenuItem>
        </StyledPermissionSelect>
    );
};
