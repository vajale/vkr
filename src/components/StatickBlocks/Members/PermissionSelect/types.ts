import { type UserPermission } from "@/components/StatickBlocks/Members/PermissionSelect/index";

export interface IPermissionSelect {
    userPermission: UserPermission;
    userId: string;
    pageId: string
}
