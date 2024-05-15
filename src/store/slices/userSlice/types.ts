export interface User {
    id: string;
    username?: string;
    avatar?: string;
    pages?: string[]
}

export interface IUserSchema {
    user?: User
}
