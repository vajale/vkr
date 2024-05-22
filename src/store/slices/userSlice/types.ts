export enum SIGN_STATS {
    pending = "pending",
    loading = "loading",
    success = "success",
    error = "error",
}

export interface User {
    id: string;
    email?: string;
    avatar?: string;
}

export interface UserFirebase {
    data: {
        firstName?: string;
        lastname?: string;
        email?: string;
        phoneNumber?: string;
    };
    username?: string;
    pages?: string[];
}

export interface IUserSchema {
    user?: UserFirebase;
    authData?: User;
    _isInitialized: boolean;
    signStatus: SIGN_STATS;
}
